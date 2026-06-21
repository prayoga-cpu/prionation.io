"use client";

import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  type CSSProperties,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { staggerFast, riseIn, fadeIn } from "@/lib/motion";

/* ── blueprint palette (design-specific decorative blues, not theme tokens) ── */
const INK = "#eaf2ff";
const ROAD = "#d6e4ff";
const HOOK = "#ffd23f";
const LINE = "rgba(150,180,255,0.18)";
const LINE_STRONG = "rgba(150,180,255,0.22)";
const SURFACE = "rgba(13,22,40,0.82)";
const SURFACE_DEEP = "rgba(7,13,24,0.85)";
const GREEN = "#58f287";

type Pt = [number, number];

/* ───────────────────────── road analogy (buildRoad) ─────────────────────────
   A single congested lane (bottleneck) that opens into a flowing multi-lane
   highway. `phase` 0 = bottleneck, 1 = flowing. */
function buildRoad(phase: number) {
  const W = 200,
    H = 150,
    stroke = ROAD;
  const laneY: Record<string, number> = { "-1": 56, "0": 72, "1": 88 };
  const cars: { lane: number; d: number; base?: number }[] = [
    { lane: 0, d: 0.06, base: 1 },
    { lane: 0, d: 0.19, base: 1 },
    { lane: 0, d: 0.33, base: 1 },
    { lane: -1, d: 0.0 },
    { lane: -1, d: 0.34 },
    { lane: -1, d: 0.68 },
    { lane: 1, d: 0.17 },
    { lane: 1, d: 0.5 },
    { lane: 1, d: 0.83 },
  ];
  const dur = phase ? 2.4 : 6.6;
  const carEls = cars.map((c, i) => {
    const y = laneY[String(c.lane)];
    const vis = c.base || phase;
    return (
      <g
        key={"car" + i}
        style={{
          animationName: "roadRun",
          animationDuration: `${dur}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDelay: `${(-(c.d * dur)).toFixed(2)}s`,
          opacity: vis ? 1 : 0,
          transition: "opacity 0.45s ease",
        }}
      >
        <rect x={0} y={y - 3.4} width={13} height={6.8} rx={1.6} fill="rgba(13,22,40,0.65)" stroke={stroke} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <rect x={3} y={y - 3.4} width={5.4} height={3} rx={0.8} fill="none" stroke={stroke} strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
        <circle cx={11.4} cy={y} r={0.9} fill={HOOK} />
      </g>
    );
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ overflow: "visible" }}>
      <g
        style={{
          transform: `scaleY(${phase ? 1 : 0.32})`,
          transformBox: "fill-box",
          transformOrigin: "center",
          transition: "transform 0.7s ease",
        }}
      >
        <line x1={0} y1={48} x2={W} y2={48} stroke={stroke} strokeWidth={1.3} vectorEffect="non-scaling-stroke" />
        <line x1={0} y1={96} x2={W} y2={96} stroke={stroke} strokeWidth={1.3} vectorEffect="non-scaling-stroke" />
        <line x1={0} y1={64} x2={W} y2={64} stroke={stroke} strokeWidth={0.7} strokeDasharray="7 7" vectorEffect="non-scaling-stroke" style={{ opacity: phase ? 0.7 : 0, transition: "opacity 0.5s ease" }} />
        <line x1={0} y1={80} x2={W} y2={80} stroke={stroke} strokeWidth={0.7} strokeDasharray="7 7" vectorEffect="non-scaling-stroke" style={{ opacity: phase ? 0.7 : 0, transition: "opacity 0.5s ease" }} />
      </g>
      <line x1={0} y1={72} x2={W} y2={72} stroke={stroke} strokeWidth={0.7} strokeDasharray="6 9" vectorEffect="non-scaling-stroke" style={{ opacity: phase ? 0 : 0.55, transition: "opacity 0.4s ease" }} />
      {carEls}
    </svg>
  );
}

/* ──────────────────── Eiffel + crane blueprint (buildBlueprint) ──────────────
   Isometric tower drawn by self-drawing strokes, plus a tower crane hoisting a
   beam. `cycle` re-keys the group to replay the draw animation. */
function buildBlueprint(cycle: number) {
  const HT = 168,
    W0 = 46,
    step = 0.13,
    dur = 0.5;
  const ix = (x: number, y: number) => (x - y) * 0.866;
  const iy = (x: number, y: number, z: number) => (x + y) * 0.5 - z;
  const P = (x: number, y: number, z: number): Pt => [ix(x, y), iy(x, y, z)];
  const segs: { x1: number; y1: number; x2: number; y2: number; order: number; w: number; op: number }[] = [];
  const dots: { cx: number; cy: number; order: number }[] = [];
  const add = (a: Pt, b: Pt, order: number, w?: number, op?: number) =>
    segs.push({ x1: a[0], y1: a[1], x2: b[0], y2: b[1], order, w: w || 0.8, op: op == null ? 0.9 : op });
  const addDot = (a: Pt, order: number) => dots.push({ cx: a[0], cy: a[1], order });
  const ordZ = (zf: number) => Math.max(1, Math.round(zf * 12) + 1);

  // Eiffel taper profile: [zFraction, halfWidth]
  const ctrl: Pt[] = [[0, 46], [0.05, 38], [0.1, 32], [0.16, 28], [0.27, 21], [0.4, 15], [0.55, 10], [0.7, 6], [0.82, 4.2], [0.92, 3], [1.0, 0.4]];
  const cs: Pt[] = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
  const pt = (c: Pt, ci: number): Pt => {
    const zf = ctrl[ci][0],
      hw = ctrl[ci][1];
    return P(c[0] * hw, c[1] * hw, zf * HT);
  };

  // ground footprint
  for (let k = 0; k < 4; k++) add(P(cs[k][0] * W0, cs[k][1] * W0, 0), P(cs[(k + 1) % 4][0] * W0, cs[(k + 1) % 4][1] * W0, 0), 0, 0.9, 0.5);
  // four curved legs
  cs.forEach((c) => {
    for (let i = 0; i < ctrl.length - 1; i++) add(pt(c, i), pt(c, i + 1), ordZ(ctrl[i][0]), i < 4 ? 1.15 : 0.85, 0.92);
  });
  // platforms (ring + overhang deck + corner bolts)
  [3, 5, 7].forEach((ci) => {
    const o = ordZ(ctrl[ci][0]),
      zf = ctrl[ci][0],
      hw = ctrl[ci][1];
    for (let k = 0; k < 4; k++) add(pt(cs[k], ci), pt(cs[(k + 1) % 4], ci), o, 1.05, 0.92);
    const ov = hw * 1.3;
    for (let k = 0; k < 4; k++) add(P(cs[k][0] * ov, cs[k][1] * ov, zf * HT), P(cs[(k + 1) % 4][0] * ov, cs[(k + 1) % 4][1] * ov, zf * HT), o, 0.7, 0.5);
    cs.forEach((c) => addDot(pt(c, ci), o));
  });
  // iconic base arches on all four faces
  for (let f = 0; f < 4; f++) {
    const cA = cs[f],
      cB = cs[(f + 1) % 4],
      o = ordZ(0.05),
      N = 9;
    let prev: Pt | null = null;
    for (let s = 0; s <= N; s++) {
      const tt = s / N,
        z = (0.04 + 0.092 * Math.sin(Math.PI * tt)) * HT;
      const x = (cA[0] + (cB[0] - cA[0]) * tt) * W0 * 0.96,
        y = (cA[1] + (cB[1] - cA[1]) * tt) * W0 * 0.96;
      const p = P(x, y, z);
      if (prev) add(prev, p, o, 0.7, 0.55);
      prev = p;
    }
  }
  // lattice cross-bracing on the two front faces
  [0, 3].forEach((f) => {
    const cA = cs[f],
      cB = cs[(f + 1) % 4];
    for (let i = 0; i < 5; i++) {
      const o = ordZ(ctrl[i][0]),
        a0 = pt(cA, i),
        a1 = pt(cA, i + 1),
        b0 = pt(cB, i),
        b1 = pt(cB, i + 1);
      add(a0, b1, o, 0.42, 0.28);
      add(b0, a1, o, 0.42, 0.28);
      add(a0, b0, o, 0.4, 0.24);
    }
  });
  // central spire + antenna
  const topP = P(0, 0, ctrl[7][0] * HT),
    tip = P(0, 0, HT * 1.06);
  add(topP, tip, ordZ(0.82), 0.95, 0.85);
  add(tip, [tip[0] + 5, tip[1] - 2], ordZ(0.92), 0.6, 0.6);
  // crane: mast + jib over the tower, hook lowering a beam
  const base: Pt = [-10, 117],
    MT = 250;
  const mTop = P(base[0], base[1], MT),
    mTop2 = P(base[0] + 9, base[1] + 9, MT);
  add(P(base[0], base[1], 0), mTop, 0, 1.1, 0.6);
  add(P(base[0] + 9, base[1] + 9, 0), mTop2, 0, 0.55, 0.4);
  for (let r = 1; r <= 9; r++) {
    const z = r * (MT / 9);
    add(P(base[0], base[1], z), P(base[0] + 9, base[1] + 9, z), 0, 0.45, 0.3);
    if (r < 9) add(P(base[0], base[1], z), P(base[0] + 9, base[1] + 9, z + MT / 9), 0, 0.4, 0.2);
  }
  const jibEnd = P(53, 53, MT),
    cjEnd = P(-30, 135, MT),
    apex = P(base[0] + 5, base[1] + 5, MT + 22);
  add(mTop, jibEnd, 0, 0.9, 0.6);
  add(mTop, cjEnd, 0, 0.7, 0.45);
  add(mTop, apex, 0, 0.5, 0.4);
  add(apex, jibEnd, 0, 0.5, 0.3);
  add(apex, cjEnd, 0, 0.5, 0.3);
  add([cjEnd[0] - 5, cjEnd[1] + 2], [cjEnd[0] + 5, cjEnd[1] + 2], 0, 2.2, 0.5);

  const lines = segs.map((s, i) => (
    <line
      key={i}
      x1={s.x1}
      y1={s.y1}
      x2={s.x2}
      y2={s.y2}
      pathLength={1}
      stroke={INK}
      strokeWidth={+(s.w * 1.5).toFixed(2)}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      style={{
        strokeDasharray: 1,
        strokeDashoffset: 1,
        opacity: Math.min(1, s.op * 1.45),
        animationName: "bpDraw",
        animationDuration: `${dur}s`,
        animationTimingFunction: "ease",
        animationFillMode: "forwards",
        animationDelay: `${s.order * step}s`,
      }}
    />
  ));
  const dotEls = dots.map((d, i) => (
    <circle key={"d" + i} cx={d.cx} cy={d.cy} r={1.5} fill={INK} style={{ opacity: 0, animationName: "bpPop", animationDuration: "0.3s", animationTimingFunction: "ease", animationFillMode: "forwards", animationDelay: `${d.order * step + 0.2}s` }} />
  ));
  const load = (
    <g key="load" style={{ animationName: "bpLift", animationDuration: "3.6s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "0.6s", opacity: 0.8 }}>
      <line x1={jibEnd[0]} y1={jibEnd[1]} x2={jibEnd[0]} y2={jibEnd[1] + 14} stroke={ROAD} strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
      <rect x={jibEnd[0] - 7} y={jibEnd[1] + 14} width={14} height={5} fill="none" stroke={HOOK} strokeWidth={0.9} vectorEffect="non-scaling-stroke" />
    </g>
  );

  // auto-bounds → centered viewBox
  let mnX = 1e9,
    mxX = -1e9,
    mnY = 1e9,
    mxY = -1e9;
  const ext = (x: number, y: number) => {
    if (x < mnX) mnX = x;
    if (x > mxX) mxX = x;
    if (y < mnY) mnY = y;
    if (y > mxY) mxY = y;
  };
  segs.forEach((s) => {
    ext(s.x1, s.y1);
    ext(s.x2, s.y2);
  });
  ext(jibEnd[0] - 7, jibEnd[1] + 50);
  const pad = 8;
  const vb = `${(mnX - pad).toFixed(1)} ${(mnY - pad).toFixed(1)} ${(mxX - mnX + 2 * pad).toFixed(1)} ${(mxY - mnY + 2 * pad).toFixed(1)}`;

  return (
    <svg viewBox={vb} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ overflow: "visible" }}>
      <g key={cycle}>
        {lines}
        {dotEls}
        {load}
      </g>
    </svg>
  );
}

type Phase = "idle" | "loading" | "done";
type Path = "intake" | "chat";
type Msg = { role: "ai" | "user"; text: string };

const eyebrowStyle: CSSProperties = { fontFamily: "var(--font-pixel)", fontSize: 8, letterSpacing: "0.12em", color: "var(--c-accent)", textTransform: "uppercase", lineHeight: 2.6 };
const bodyStyle: CSSProperties = { color: "var(--c-soft)", fontSize: 14, lineHeight: 1.7 };
const valueStyle: CSSProperties = { color: "var(--c-fg)", fontWeight: 700, fontSize: 15, lineHeight: 1.85 };
const mutedStyle: CSSProperties = { color: "var(--c-muted)", fontSize: 14, lineHeight: 1.8 };
const monoStyle: CSSProperties = { fontFamily: "var(--font-pixel)", fontSize: 7, letterSpacing: "0.03em", lineHeight: 2.0, color: "var(--c-muted)" };
const pixelLabel: CSSProperties = { fontFamily: "var(--font-pixel)", fontSize: 8, letterSpacing: "0.1em", color: "var(--c-muted)" };

/* Renders the diagnostic block inline, or — when expanded — as a portal to
   <body> so the modal escapes the hero's z-4 stacking context and lands above
   the fixed header (z-50). Also locks body scroll while open. */
function DiagShell({ modalOpen, onClose, children }: { modalOpen: boolean; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    if (!modalOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  if (modalOpen && typeof document !== "undefined") {
    return createPortal(
      <>
        <div className="pio-backdrop" onClick={onClose} />
        <div className="pio-diag is-modal" role="dialog" aria-modal="true">
          {children}
        </div>
      </>,
      document.body,
    );
  }
  return <div className="pio-diag">{children}</div>;
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* Scales its content down (never up) to fit the available width, so the badge
   and proof-stats keep their exact desktop look — just smaller — on mobile.
   Uses transform, which leaves the layout box at natural size, so nothing in the
   hero flow shifts (no CLS on the LCP headline below). */
function ScaleToFit({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useIsoLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const natural = i.offsetWidth; // layout width — unaffected by the transform
      if (natural) setScale(Math.min(1, o.clientWidth / natural));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i); // re-fit when the content reflows (e.g. web font loads)
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outer} style={{ width: "100%", display: "flex", justifyContent: "center", overflow: "hidden" }}>
      <div ref={inner} style={{ transform: `scale(${scale})`, transformOrigin: "center center", flexShrink: 0 }}>
        {children}
      </div>
    </div>
  );
}

export function Hero({ onNotify }: { onNotify?: () => void }) {
  const t = useTranslations("Hero");
  const titleLines = t.raw("title_lines") as string[];
  // isolate the "AI"/"IA" token (wherever it sits per locale) for the Saturn ring
  const shimmer = t("title_shimmer");
  const aiWord = t("title_ai");
  const aiIdx = shimmer.indexOf(aiWord);
  const shimBefore = aiIdx === -1 ? "" : shimmer.slice(0, aiIdx);
  const shimAi = aiIdx === -1 ? shimmer : aiWord;
  const shimAfter = aiIdx === -1 ? "" : shimmer.slice(aiIdx + aiWord.length);
  const industries = t.raw("industries") as string[];
  const bottlenecks = t.raw("bottlenecks") as string[][];
  const stages = t.raw("stages") as string[];
  const roi = t.raw("roi") as string[];

  const [path, setPath] = useState<Path>("intake");
  const [phase, setPhase] = useState<Phase>("idle");
  const [cycle, setCycle] = useState(0);
  const [website, setWebsite] = useState("");
  const [industryIdx, setIndustryIdx] = useState(0);
  const [stageIdx, setStageIdx] = useState(2);
  const [bottleneck, setBottleneck] = useState("");
  const [custom, setCustom] = useState("");
  const [chat, setChat] = useState<Msg[]>([{ role: "ai", text: t("chat_initial") }]);
  const [draft, setDraft] = useState("");
  const [chatStep, setChatStep] = useState(0);
  const [roadPhase, setRoadPhase] = useState(0);
  const [aiThinking, setAiThinking] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [feed, setFeed] = useState<string[]>([]);
  const [tokens, setTokens] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const transcriptRef = useRef<HTMLDivElement>(null);
  const timers = useRef<{ t?: ReturnType<typeof setTimeout>; ct?: ReturnType<typeof setTimeout> }>({});
  const genTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const genTick = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // cycle / road intervals + Escape-to-close
  useEffect(() => {
    const iv = setInterval(() => setCycle((c) => c + 1), 9500);
    const rp = setInterval(() => setRoadPhase((p) => (p ? 0 : 1)), 4200);
    const esc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", esc);
    const tm = timers.current;
    const gt = genTimers.current;
    return () => {
      clearInterval(iv);
      clearInterval(rp);
      clearTimeout(tm.t);
      clearTimeout(tm.ct);
      gt.forEach(clearTimeout);
      if (genTick.current) clearInterval(genTick.current);
      window.removeEventListener("keydown", esc);
    };
  }, []);

  // keep the chat transcript pinned to the latest message
  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat.length, aiThinking]);

  const appendAI = (text: string) => setChat((c) => [...c, { role: "ai", text }]);
  const clearGenTimers = () => {
    genTimers.current.forEach(clearTimeout);
    genTimers.current.length = 0;
    if (genTick.current) {
      clearInterval(genTick.current);
      genTick.current = undefined;
    }
  };
  // Streams a Claude-terminal-style processing log while the diagnostic "runs",
  // with a live token counter + elapsed timer, so the wait feels productive.
  const runGen = () => {
    clearGenTimers();
    setPhase("loading");
    setFeed([]);
    setTokens(0);
    setElapsed(0);
    genTick.current = setInterval(() => {
      setTokens((x) => x + 30 + Math.floor(Math.random() * 70));
      setElapsed((x) => Math.round((x + 0.1) * 10) / 10);
    }, 100);
    const raw = path === "intake" ? website.trim() || effBn : firstUser;
    const src = raw.length > 42 ? raw.slice(0, 42) + "…" : raw;
    const steps = [t("feed_scraping", { src }), ...(t.raw("load_lines") as string[])];
    steps.forEach((line, idx) => {
      genTimers.current.push(setTimeout(() => setFeed((f) => [...f, line]), 300 + idx * 520));
    });
    genTimers.current.push(
      setTimeout(
        () => {
          if (genTick.current) {
            clearInterval(genTick.current);
            genTick.current = undefined;
          }
          setPhase("done");
          setAiThinking(false);
          // diagnostic done → invite to the AI Consultation waitlist
          genTimers.current.push(setTimeout(() => onNotify?.(), 1100));
        },
        300 + steps.length * 520 + 480,
      ),
    );
  };

  const canSend = !!draft.trim() && phase !== "loading" && !aiThinking;
  const doSend = () => {
    const d = draft.trim();
    if (!d || phase === "loading" || aiThinking) return;
    const step = chatStep + 1;
    setChat((c) => [...c, { role: "user", text: d }]);
    setDraft("");
    setChatStep(step);
    setAiThinking(true);
    clearTimeout(timers.current.ct);
    timers.current.ct = setTimeout(() => {
      if (step === 1) {
        appendAI(t("chat_q1"));
        setAiThinking(false);
      } else if (step === 2) {
        appendAI(t("chat_q2"));
        setAiThinking(false);
      } else {
        appendAI(t("chat_final"));
        setTimeout(() => runGen(), 650);
      }
    }, 600);
  };
  const stopChat = () => {
    clearTimeout(timers.current.t);
    clearTimeout(timers.current.ct);
    clearGenTimers();
    setPhase("idle");
    setFeed([]);
    setAiThinking(false);
  };

  // ── derived view data ──
  const industryLabel = industries[industryIdx] || industries[industries.length - 1];
  const bnList = bottlenecks[industryIdx] || bottlenecks[bottlenecks.length - 1];
  const effBn = custom.trim() || bottleneck || t("bottleneck_fallback");
  const firstUser = chat.find((m) => m.role === "user")?.text || t("chat_fallback");
  const chatGenerating = phase === "loading" || aiThinking;

  type Line = { text: string; style: CSSProperties };
  let lines: Line[];
  if (phase === "idle") {
    const idle = t.raw("preview_idle") as string[];
    lines = [
      { text: idle[0], style: mutedStyle },
      { text: idle[1], style: { color: "rgba(150,180,255,0.35)", fontSize: 14, lineHeight: 1.8 } },
    ];
  } else if (phase === "loading") {
    lines = []; // the streamed terminal feed is rendered separately (see preview panel)
  } else if (path === "intake") {
    lines = [
      { text: `✓ ${t("feed_thought", { sec: elapsed.toFixed(1) })} · ${t("feed_tokens", { n: tokens.toLocaleString() })}`, style: { ...monoStyle, color: GREEN } },
      { text: t("result_bottleneck_label"), style: eyebrowStyle },
      { text: t("result_bottleneck_intake", { bn: effBn }), style: bodyStyle },
      { text: t("result_path_label"), style: eyebrowStyle },
      { text: t("result_path_intake", { industry: industryLabel }), style: bodyStyle },
      { text: t("result_roi_label"), style: eyebrowStyle },
      { text: roi[stageIdx] || roi[2], style: valueStyle },
    ];
  } else {
    lines = [
      { text: `✓ ${t("feed_thought", { sec: elapsed.toFixed(1) })} · ${t("feed_tokens", { n: tokens.toLocaleString() })}`, style: { ...monoStyle, color: GREEN } },
      { text: t("result_bottleneck_label"), style: eyebrowStyle },
      { text: t("result_bottleneck_chat", { q: firstUser }), style: bodyStyle },
      { text: t("result_path_label"), style: eyebrowStyle },
      { text: t("result_path_chat"), style: bodyStyle },
      { text: t("result_roi_label"), style: eyebrowStyle },
      { text: t("result_roi_chat"), style: valueStyle },
    ];
  }
  const fileName = path === "intake" ? t("file_intake") : t("file_chat");
  const statusLabel = phase === "done" ? t("status_preview") : phase === "loading" ? t("status_analyzing") : t("status_ready");

  const tabStyle = (active: boolean): CSSProperties => ({
    flex: 1,
    textAlign: "center",
    fontSize: 13,
    fontWeight: 600,
    border: "none",
    borderRadius: 9,
    padding: "9px 0",
    cursor: "pointer",
    transition: "all 120ms",
    background: active ? "var(--c-accent)" : "transparent",
    color: active ? "#fff" : "var(--c-muted)",
  });
  const chipStyle = (active: boolean): CSSProperties => ({
    fontSize: 12,
    fontWeight: 500,
    borderRadius: 9,
    padding: "7px 12px",
    cursor: "pointer",
    transition: "all 120ms",
    background: active ? "var(--c-accent)" : "rgba(7,13,24,0.8)",
    color: active ? "#fff" : "var(--c-soft)",
    border: active ? "1px solid var(--c-accent)" : "1px solid rgba(150,180,255,0.16)",
  });
  const fieldStyle: CSSProperties = {
    width: "100%",
    background: SURFACE_DEEP,
    border: `1px solid ${LINE}`,
    borderRadius: 11,
    height: 46,
    color: "var(--c-fg)",
    fontFamily: "var(--font-sans)",
    fontSize: 13.5,
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    padding: "0 28px 0 13px",
  };

  return (
    <section id="top" className="relative overflow-hidden" style={{ background: "radial-gradient(ellipse 82% 60% at 50% 18%, #101728 0%, #090d18 50%, #05070e 100%)" }}>
      {/* blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(128,158,220,0.045) 1px, transparent 1px),linear-gradient(90deg, rgba(128,158,220,0.045) 1px, transparent 1px),linear-gradient(rgba(128,158,220,0.08) 1px, transparent 1px),linear-gradient(90deg, rgba(128,158,220,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px,30px 30px,150px 150px,150px 150px",
        }}
      />
      {/* ruler-tick frame */}
      <div className="absolute pointer-events-none" style={{ inset: 16, border: "1px solid rgba(128,158,220,0.09)" }} />

      <m.main
        className="pio-hero-main relative z-[4] mx-auto flex flex-col items-center text-center"
        style={{ maxWidth: 900, padding: "120px 28px 88px" }}
        variants={staggerFast}
        initial="hidden"
        animate="visible"
      >
        {/* product badge — scales down to fit on mobile, keeping its look */}
        <ScaleToFit>
          <m.div
            variants={riseIn}
            className="inline-flex items-center mb-[30px]"
            style={{ gap: 11, background: "rgba(13,22,40,0.72)", border: `1px solid ${LINE_STRONG}`, padding: "10px 20px", borderRadius: 9999, backdropFilter: "blur(2px)" }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--c-accent)", boxShadow: "0 0 9px var(--c-accent)", flex: "none" }} />
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 10, letterSpacing: "0.17em", color: "var(--c-soft)", textTransform: "uppercase", whiteSpace: "nowrap" }}>{t("badge")}</span>
          </m.div>
        </ScaleToFit>

        {/* headline (Black Han Sans) — forced line breaks kept identical at every
            width; ScaleToFit shrinks the whole block so it never re-wraps */}
        <ScaleToFit>
          <m.h1
            variants={riseIn}
            className="font-display"
            style={{ fontWeight: 400, fontSize: "clamp(32px,6.6vw,86px)", lineHeight: 1.04, letterSpacing: "0.01em", color: "var(--c-fg)", margin: "0 0 22px", padding: "0.18em 0.5em 0.24em", whiteSpace: "nowrap" }}
          >
            {titleLines.map((line, i) => (
              <span key={i} style={{ display: "block" }}>
                {line}
              </span>
            ))}
            <span
              style={{
                display: "block",
                background: "linear-gradient(100deg,var(--c-accent) 16%,#b7c0ff 41%,#ffffff 50%,#b7c0ff 59%,var(--c-accent) 84%)",
                backgroundSize: "220% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                animationName: "aiShimmer",
                animationDuration: "3.6s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
            >
              {shimBefore}
              <span className="ai-saturn">
                <span className="ai-ring ai-ring-back" aria-hidden="true" />
                <span className="ai-text">{shimAi}</span>
                <span className="ai-ring ai-ring-front" aria-hidden="true" />
                <span className="ai-orbit" aria-hidden="true">
                  <span className="ai-orbit-spin">
                    <span className="ai-orbit-moon" />
                  </span>
                </span>
                <svg className="ai-extra-spark" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" />
                </svg>
              </span>
              {shimAfter}
            </span>
          </m.h1>
        </ScaleToFit>

        {/* subhead */}
        <m.p variants={riseIn} style={{ fontSize: "clamp(9px,2.7vw,17px)", lineHeight: 1.6, color: "var(--c-soft)", maxWidth: 600, margin: "0 0 42px" }}>
          {t("subhead")}
        </m.p>

        {/* ───── DIAGNOSTIC (input + preview), expandable to a modal ───── */}
        <DiagShell modalOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="pio-card-wrap" style={{ position: "relative", width: "100%", maxWidth: 700 }}>
            {/* road analogy (left) */}
            <div className="hero-side-ill" style={{ position: "absolute", right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: 26, width: 140, height: 118, opacity: 0.8, pointerEvents: "none" }}>
              {buildRoad(roadPhase)}
            </div>
            {/* Eiffel construction motif (right) */}
            <div className="hero-side-ill" style={{ position: "absolute", left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 26, width: 132, height: 252, opacity: 0.78, pointerEvents: "none" }}>
              <div style={{ width: "100%", height: "100%", animationName: "bpFloat", animationDuration: "9s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }}>{buildBlueprint(cycle)}</div>
            </div>

            {/* corner brackets (decorative — hidden on mobile) */}
            <div className="pio-deco">
              <div style={{ position: "absolute", top: -9, left: -9, width: 18, height: 18, borderTop: "2px solid var(--c-accent)", borderLeft: "2px solid var(--c-accent)", opacity: 0.75 }} />
              <div style={{ position: "absolute", top: -9, right: -9, width: 18, height: 18, borderTop: "2px solid var(--c-accent)", borderRight: "2px solid var(--c-accent)", opacity: 0.75 }} />
              <div style={{ position: "absolute", bottom: -9, left: -9, width: 18, height: 18, borderBottom: "2px solid var(--c-accent)", borderLeft: "2px solid var(--c-accent)", opacity: 0.75 }} />
              <div style={{ position: "absolute", bottom: -9, right: -9, width: 18, height: 18, borderBottom: "2px solid var(--c-accent)", borderRight: "2px solid var(--c-accent)", opacity: 0.75 }} />
            </div>

            {/* annotation label + expand/close */}
            <div style={{ position: "absolute", top: -28, left: 2, fontFamily: "var(--font-pixel)", fontSize: 8, letterSpacing: "0.1em", color: "var(--c-muted)" }}>{t("input_label")}</div>
            <button
              className="pio-toggle"
              onClick={() => setModalOpen((o) => !o)}
              style={{ position: "absolute", top: -38, right: 22, display: "flex", alignItems: "center", gap: 6, background: "rgba(13,22,40,0.72)", border: `1px solid ${LINE}`, color: "var(--c-soft)", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500, padding: "5px 10px", borderRadius: 8, cursor: "pointer", zIndex: 3 }}
            >
              {modalOpen ? (
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5" /></svg>
              )}
              {modalOpen ? t("close") : t("expand")}
            </button>

            {/* dimension tick + sparkles (decorative — hidden on mobile) */}
            <div className="pio-deco">
              <div style={{ position: "absolute", left: -30, top: 0, bottom: 0, width: 1, background: "rgba(150,180,255,0.25)" }} />
              <div style={{ position: "absolute", left: -34, top: -1, width: 9, height: 1, background: "rgba(150,180,255,0.4)" }} />
              <div style={{ position: "absolute", left: -34, bottom: -1, width: 9, height: 1, background: "rgba(150,180,255,0.4)" }} />
              <svg viewBox="0 0 24 24" style={{ position: "absolute", top: -22, right: -26, width: 18, height: 18, color: "var(--c-accent)", animationName: "bpStar", animationDuration: "4s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }}><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" /></svg>
              <svg viewBox="0 0 24 24" style={{ position: "absolute", bottom: 14, left: -34, width: 13, height: 13, color: "var(--c-accent)", animationName: "bpStar", animationDuration: "4.6s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "0.8s" }}><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" /></svg>
            </div>

            {/* card */}
            <div className="pio-card" style={{ background: SURFACE, border: `1px solid ${LINE_STRONG}`, borderRadius: 18, padding: 14, boxShadow: "0 24px 60px rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}>
              {/* path toggle */}
              <div style={{ display: "flex", gap: 5, background: "rgba(7,13,24,0.6)", border: "1px solid rgba(150,180,255,0.12)", padding: 5, borderRadius: 13, marginBottom: 15 }}>
                <button onClick={() => setPath("intake")} style={tabStyle(path === "intake")}>{t("tab_intake")}</button>
                <button onClick={() => setPath("chat")} style={tabStyle(path === "chat")}>{t("tab_chat")}</button>
              </div>

              {/* ── GUIDED INTAKE ── */}
              {path === "intake" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 13, textAlign: "left" }}>
                  {/* company website */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={pixelLabel}>{t("website_label")}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, background: SURFACE_DEEP, border: `1px solid ${LINE}`, borderRadius: 11, padding: "0 13px", height: 46 }}>
                      <span style={{ fontFamily: "var(--font-pixel)", fontSize: 8, color: "var(--c-muted)", flex: "none" }}>https://</span>
                      <input className="pio-input" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder={t("website_placeholder")} style={{ flex: 1, background: "transparent", border: "none", color: "var(--c-fg)", fontFamily: "var(--font-sans)", fontSize: 14, height: "100%" }} />
                      <span style={{ fontFamily: "var(--font-pixel)", fontSize: 7, letterSpacing: "0.08em", color: GREEN, flex: "none", display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, display: "inline-block" }} />
                        {t("scan")}
                      </span>
                    </div>
                    <span style={{ fontSize: 11, color: "var(--c-muted)" }}>{t("website_hint")}</span>
                  </div>

                  {/* industry + stage */}
                  <div className="pio-field-row" style={{ display: "flex", gap: 12 }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                      <span style={pixelLabel}>{t("industry_label")}</span>
                      <div style={{ position: "relative" }}>
                        <select value={industryIdx} onChange={(e) => { setIndustryIdx(+e.target.value); setBottleneck(""); setCustom(""); }} style={fieldStyle}>
                          {industries.map((opt, i) => (
                            <option key={i} value={i}>{opt}</option>
                          ))}
                        </select>
                        <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--c-muted)", fontSize: 10, pointerEvents: "none" }}>▾</span>
                      </div>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                      <span style={pixelLabel}>{t("stage_label")}</span>
                      <div style={{ position: "relative" }}>
                        <select value={stageIdx} onChange={(e) => setStageIdx(+e.target.value)} style={fieldStyle}>
                          {stages.map((st, i) => (
                            <option key={i} value={i}>{st}</option>
                          ))}
                        </select>
                        <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--c-muted)", fontSize: 10, pointerEvents: "none" }}>▾</span>
                      </div>
                    </div>
                  </div>

                  {/* bottleneck */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <span style={pixelLabel}>{t("bottleneck_label")}</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {bnList.map((label, i) => (
                        <button key={i} onClick={() => { setBottleneck(label); setCustom(""); }} style={chipStyle(bottleneck === label && !custom.trim())}>{label}</button>
                      ))}
                    </div>
                    <input className="pio-input" type="text" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder={t("bottleneck_custom_placeholder")} style={{ background: SURFACE_DEEP, border: `1px solid ${LINE}`, borderRadius: 11, padding: "0 13px", height: 42, color: "var(--c-fg)", fontFamily: "var(--font-sans)", fontSize: 14 }} />
                  </div>

                  <button onClick={runGen} style={{ height: 50, background: "var(--c-accent)", color: "#fff", border: "none", borderRadius: 12, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 2 }}>
                    {phase === "loading" ? t("analyzing") : t("generate")}
                  </button>
                </div>
              )}

              {/* ── CHAT WITH AI ── */}
              {path === "chat" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 11, textAlign: "left" }}>
                  <div ref={transcriptRef} className="pio-chat-scroll" style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 172, overflowY: "auto", padding: "4px 2px" }}>
                    {chat.map((mm, i) => {
                      const u = mm.role === "user";
                      return (
                        <div key={i} style={{ display: "flex", justifyContent: u ? "flex-end" : "flex-start" }}>
                          <div
                            style={{
                              maxWidth: "82%",
                              padding: "9px 13px",
                              borderRadius: 13,
                              fontSize: 13.5,
                              lineHeight: 1.5,
                              ...(u
                                ? { background: "var(--c-accent)", color: "#fff", borderBottomRightRadius: 4 }
                                : { background: "rgba(7,13,24,0.9)", color: "var(--c-soft)", border: "1px solid rgba(150,180,255,0.15)", borderBottomLeftRadius: 4 }),
                            }}
                          >
                            {mm.text}
                          </div>
                        </div>
                      );
                    })}
                    {aiThinking && (
                      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "3px 2px" }}>
                        <svg viewBox="0 0 24 24" width="16" height="16" style={{ color: "var(--c-accent)", overflow: "visible", transformOrigin: "center", animationName: "aiSpark", animationDuration: "2.6s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", flex: "none" }}>
                          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                            <line x1="12" y1="1.5" x2="12" y2="22.5" />
                            <line x1="1.5" y1="12" x2="22.5" y2="12" />
                            <line x1="5.2" y1="5.2" x2="18.8" y2="18.8" />
                            <line x1="18.8" y1="5.2" x2="5.2" y2="18.8" />
                          </g>
                        </svg>
                        <span style={{ fontSize: 13, color: "var(--c-soft)", fontFamily: "var(--font-sans)" }}>{phase === "loading" ? t("thinking_mapping") : t("thinking_analyzing")}</span>
                      </div>
                    )}
                  </div>

                  {/* composer */}
                  <div style={{ background: SURFACE_DEEP, border: `1px solid ${LINE}`, borderRadius: 14, padding: "13px 13px 10px" }}>
                    <input className="pio-input" type="text" value={draft} onChange={(e: ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)} onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter") { e.preventDefault(); doSend(); } }} placeholder={chatStep === 0 ? t("chat_placeholder_initial") : t("chat_placeholder_reply")} style={{ width: "100%", background: "transparent", border: "none", color: "var(--c-fg)", fontFamily: "var(--font-sans)", fontSize: 14, height: 24 }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
                      <button style={{ display: "flex", alignItems: "center", gap: 7, background: "transparent", border: "none", color: "var(--c-soft)", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, cursor: "pointer", padding: "5px 8px", borderRadius: 8, whiteSpace: "nowrap", flex: "none" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--c-accent)", boxShadow: "0 0 6px var(--c-accent)", flex: "none" }} />
                        {t("model")}
                        <span style={{ color: "var(--c-muted)", fontSize: 9 }}>▾</span>
                      </button>
                      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
                        {chatGenerating ? (
                          <button onClick={stopChat} title="Stop" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, background: "transparent", border: "1px solid var(--c-line-soft)", borderRadius: 11, color: "var(--c-soft)", cursor: "pointer" }}>
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2.5" /></svg>
                          </button>
                        ) : (
                          <button
                            onClick={doSend}
                            style={
                              canSend
                                ? { display: "flex", alignItems: "center", gap: 8, height: 42, padding: "0 17px", background: "var(--c-accent)", color: "#fff", border: "none", borderRadius: 11, cursor: "pointer", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, transition: "all 120ms" }
                                : { display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, padding: 0, background: "var(--c-accent-10)", color: "rgba(255,255,255,0.34)", border: "none", borderRadius: 11, cursor: "default", transition: "all 120ms" }
                            }
                          >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M5 3.5 L19.5 12 L5 20.5 Z" /></svg>
                            {canSend && <span>{t("send")}</span>}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* footer note */}
              <div className="pio-foot" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, padding: "0 2px" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN, display: "inline-block" }} />
                <span style={{ fontSize: 11, color: "var(--c-muted)" }}>{t("footer_note")}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--c-muted)", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", flex: "none" }}>
                  {t("powered_by")} <b style={{ color: "var(--c-soft)", fontWeight: 600, letterSpacing: "0.01em" }}>{t("powered_brand")}</b>
                </span>
              </div>
            </div>
          </div>

          {/* ───── DIAGNOSTIC PREVIEW PANEL ───── */}
          <div style={{ width: "100%", maxWidth: 700, marginTop: 18, background: SURFACE, border: "1px solid rgba(150,180,255,0.2)", borderRadius: 14, overflow: "hidden", textAlign: "left", boxShadow: "0 12px 40px rgba(0,0,0,0.4)", backdropFilter: "blur(3px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", background: "rgba(13,22,40,0.8)", borderBottom: "1px solid rgba(150,180,255,0.16)" }}>
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ed4245" }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#f7de52" }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: GREEN }} />
              <span style={{ fontFamily: "var(--font-pixel)", fontSize: 9, letterSpacing: "0.06em", color: "var(--c-muted)", marginLeft: 8 }}>{fileName}</span>
              <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: "var(--c-muted)" }}>{statusLabel}</span>
            </div>
            <div style={{ position: "relative", padding: 20, minHeight: 184 }}>
              {phase === "loading" && (
                <div style={{ position: "absolute", top: 0, left: 0, height: 2, width: "38%", background: "linear-gradient(90deg,transparent,var(--c-accent),transparent)", animationName: "scan", animationDuration: "0.9s", animationTimingFunction: "linear", animationIterationCount: "infinite" }} />
              )}
              {phase === "loading" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {feed.map((ln, i) => (
                    <div key={i} style={{ ...monoStyle, color: i === 0 ? "var(--c-accent)" : "var(--c-muted)" }}>{`> ${ln.replace(/^>\s*/, "")}`}</div>
                  ))}
                  <div style={{ ...monoStyle, color: "var(--c-soft)", display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                    <svg viewBox="0 0 24 24" width="9" height="9" style={{ color: "var(--c-accent)", overflow: "visible", transformOrigin: "center", animationName: "aiSpark", animationDuration: "2.6s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", flex: "none" }}>
                      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <line x1="12" y1="1.5" x2="12" y2="22.5" />
                        <line x1="1.5" y1="12" x2="22.5" y2="12" />
                        <line x1="5.2" y1="5.2" x2="18.8" y2="18.8" />
                        <line x1="18.8" y1="5.2" x2="5.2" y2="18.8" />
                      </g>
                    </svg>
                    <span>{t("feed_thinking")}</span>
                    <span style={{ color: "var(--c-muted)" }}>· {t("feed_tokens", { n: tokens.toLocaleString() })} · {elapsed.toFixed(1)}s</span>
                    <span className="pio-caret" style={{ color: "var(--c-accent)" }}>▍</span>
                  </div>
                </div>
              ) : (
                lines.map((ln, i) => (
                  <div key={i} style={ln.style}>{ln.text}</div>
                ))
              )}
            </div>
          </div>
        </DiagShell>

        {/* ───── PROOF STATS ───── (scales down to fit on mobile) */}
        <ScaleToFit>
        <m.div
          variants={fadeIn}
          className="pio-stats"
          style={{ marginTop: 54, display: "flex", alignItems: "stretch", border: "1px solid rgba(150,180,255,0.2)", borderRadius: 14, overflow: "hidden", background: "rgba(13,22,40,0.7)", backdropFilter: "blur(2px)" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 7, padding: "18px 30px", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 20, letterSpacing: "0.02em", color: "var(--c-accent)" }}>{t("stat_build_value")}</span>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 7, letterSpacing: "0.12em", color: "var(--c-muted)", textTransform: "uppercase" }}>{t("stat_build_label")}</span>
          </div>
          <div style={{ width: 1, background: "rgba(150,180,255,0.18)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 7, padding: "18px 30px", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 20, letterSpacing: "0.02em", color: "var(--c-fg)" }}>{t("stat_deliverable_value")}</span>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 7, letterSpacing: "0.12em", color: "var(--c-muted)", textTransform: "uppercase" }}>{t("stat_deliverable_label")}</span>
          </div>
          <div style={{ width: 1, background: "rgba(150,180,255,0.18)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 7, padding: "18px 30px", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 20, letterSpacing: "0.02em", color: "var(--c-fg)" }}>{t("stat_production_value")}</span>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 7, letterSpacing: "0.12em", color: "var(--c-muted)", textTransform: "uppercase" }}>{t("stat_production_label")}</span>
          </div>
        </m.div>
        </ScaleToFit>
      </m.main>
    </section>
  );
}
