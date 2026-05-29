"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Icon } from "../../icons";
import { Btn } from "../../ui/Atoms";

const isDev = process.env.NODE_ENV !== "production";
const securityEnabled = process.env.NEXT_PUBLIC_SECURITY_ENABLED !== "false";

export function MeetUsTab() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"calendar" | "details" | "confirmed">(
    "calendar",
  );
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [timezone, setTimezone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(!securityEnabled || isDev ? "dev-bypass" : "");
  const turnstileRef = useRef<TurnstileInstance>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+62",
    whatsapp: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Default the timezone select to the visitor's local zone after mount to avoid an SSR hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only initialization
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const dates = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let startDay = firstDayOfMonth.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push({ empty: true, date: 0, active: false });
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const d = new Date(year, month, i);
      const isPast = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;

      days.push({
        dateObj: d,
        date: i,
        active: !isPast && !isWeekend,
        empty: false,
      });
    }

    return days;
  }, [currentMonth]);

  const currentMonthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const prevMonth = () => {
    const now = new Date();
    if (
      currentMonth.getMonth() === now.getMonth() &&
      currentMonth.getFullYear() === now.getFullYear()
    )
      return;
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const timezones = [
    { label: "WIB (Jakarta), GMT+7", value: "Asia/Jakarta" },
    { label: "SGT (Singapore), GMT+8", value: "Asia/Singapore" },
    { label: "CET (Paris), GMT+1", value: "Europe/Paris" },
    { label: "GMT (London), GMT+0", value: "Europe/London" },
    { label: "EST (New York), GMT-5", value: "America/New_York" },
  ];

  const times = ["09:00 AM", "09:30 AM", "11:00 AM", "02:00 PM", "04:30 PM"];

  const validateForm = () => {
    const errs: Record<string, boolean> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) errs.fullName = true;
    if (!formData.email || !emailRegex.test(formData.email)) errs.email = true;
    if (!formData.whatsapp.trim()) errs.whatsapp = true;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const confirmBooking = async () => {
    if (!validateForm()) return;
    if (!selectedDate || !selectedTime) return;
    setApiError("");
    setLoading(true);
    try {
      // Format date as YYYY-MM-DD
      const isoDate = selectedDate.toISOString().slice(0, 10);
      // Strip non-digits from WhatsApp
      const whatsappDigits = formData.whatsapp.replace(/\D/g, "");

      const res = await fetch("/api/forms/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          fullName: formData.fullName,
          email: formData.email,
          countryCode: formData.countryCode,
          whatsapp: whatsappDigits,
          selectedDate: isoDate,
          selectedTime,
          timezone,
          turnstileToken,
          honeypot,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setApiError(data.error ?? "Submission failed. Please try again.");
        turnstileRef.current?.reset();
        setTurnstileToken(isDev ? "dev-bypass" : "");
        return;
      }

      setStep("confirmed");
    } catch {
      setApiError("Network error. Please try again.");
      turnstileRef.current?.reset();
      setTurnstileToken(isDev ? "dev-bypass" : "");
    } finally {
      setLoading(false);
    }
  };

  if (step === "confirmed") {
    return (
      <div className="max-w-[720px] mx-auto text-center py-8 relative z-20">
        <span className="inline-flex items-center justify-center w-[56px] h-[56px] rounded-full bg-accent text-white mb-6 shadow-[0_0_0_6px_var(--c-accent-10)]">
          <Icon name="check-circle" size={20} />
        </span>
        <h2 className="font-sans font-extrabold text-[clamp(28px,3.4vw,40px)] tracking-[-0.024em] leading-[1.08] text-white m-0">
          Meeting confirmed.
        </h2>
        <p className="m-[18px_auto_32px] max-w-[52ch] text-soft text-[15px] leading-[1.6]">
          A calendar invitation has been sent to your email. We look forward to
          our conversation.
        </p>
        <button
          className="bg-transparent border-0 p-0 cursor-pointer text-soft font-sans font-semibold text-[13px] inline-flex items-center gap-2 hover:text-white"
          onClick={() => {
            setStep("calendar");
            setSelectedDate(null);
            setSelectedTime(null);
            setCurrentMonth(new Date());
            setFormData({
              fullName: "",
              email: "",
              countryCode: "+62",
              whatsapp: "",
            });
            setErrors({});
            setApiError("");
          }}
        >
          Book another session{" "}
          <span aria-hidden="true" className="text-[12px] opacity-80">
            →
          </span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 relative z-20">
        <h3 className="font-sans font-extrabold text-[clamp(22px,2.8vw,32px)] tracking-[-0.02em] leading-[1.1] text-white mb-3 flex items-center gap-3">
          Book a 30-minute conversation
        </h3>
        <p className="text-soft text-[15px] leading-[1.6] max-w-[56ch]">
          No pitch. We&apos;ll listen to your bottleneck, ask two or three
          sharper questions, and tell you honestly whether a Diagnostic is the
          right next step.
        </p>
      </div>

      <div className="relative z-20 bg-card-soft border border-line-soft rounded-2xl p-6 lg:p-8">
        {step === "calendar" ? (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="font-sans font-bold text-white text-[16px] leading-none mb-1">
                    Select a Date
                  </h4>
                  <p className="font-pixel text-[8px] tracking-[0.1em] text-muted uppercase">
                    {currentMonthYear}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevMonth}
                    className="w-8 h-8 rounded-full border border-line-soft text-white flex items-center justify-center transition-colors hover:border-soft cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Icon name="chevron-left" size={16} />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="w-8 h-8 rounded-full border border-line-soft text-white flex items-center justify-center transition-colors hover:border-soft cursor-pointer"
                  >
                    <Icon name="chevron-right" size={16} />
                  </button>
                </div>
              </div>
              <div className="overflow-hidden pb-4">
                <div className="w-full">
                  <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mb-3">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => (
                        <div
                          key={day}
                          className="font-pixel text-[7px] sm:text-[8px] tracking-[0.05em] text-muted uppercase"
                        >
                          {day}
                        </div>
                      ),
                    )}
                  </div>
                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {dates.map((d, i) => {
                      if (d.empty)
                        return (
                          <div key={`empty-${i}`} className="aspect-square" />
                        );

                      const isSelected =
                        selectedDate?.toDateString() ===
                        d.dateObj?.toDateString();
                      return (
                        <button
                          key={`date-${i}`}
                          onClick={() =>
                            d.active && d.dateObj && setSelectedDate(d.dateObj)
                          }
                          disabled={!d.active}
                          className={`aspect-square rounded-lg sm:rounded-xl flex items-center justify-center font-sans text-[11px] sm:text-[13px] font-medium transition-all duration-fast ${
                            !d.active
                              ? "text-muted opacity-20 cursor-not-allowed bg-white/[0.02]"
                              : isSelected
                                ? "bg-accent text-white shadow-[0_0_15px_rgba(235,69,159,0.4)]"
                                : "text-white bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          {d.date}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-sans font-semibold text-white text-[15px] mb-6">
                {selectedDate
                  ? `Available Times (${selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })})`
                  : "Select a date first"}
              </h4>
              <div className="flex flex-col gap-2 h-[260px] overflow-y-auto pr-2 custom-scrollbar">
                {!selectedDate ? (
                  <div className="text-muted text-[13px] h-full flex items-center justify-center border border-dashed border-line-soft rounded-xl">
                    Choose a date to see times
                  </div>
                ) : (
                  times.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-3 px-4 rounded-xl border text-[14px] font-sans font-medium transition-all duration-fast text-left ${
                        selectedTime === t
                          ? "border-accent bg-accent/10 text-white"
                          : "border-line-soft bg-transparent text-soft hover:border-soft hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <Btn
                  variant="primary"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep("details")}
                >
                  Next step <span className="text-[12px] opacity-80">→</span>
                </Btn>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-[480px] mx-auto">
            <button
              onClick={() => {
                setStep("calendar");
                setErrors({});
                setApiError("");
              }}
              className="text-muted text-[13px] hover:text-white transition-colors mb-6 flex items-center gap-2"
            >
              <span className="inline-block rotate-180">→</span> Back to
              calendar
            </button>
            <h4 className="font-sans font-semibold text-white text-[20px] mb-2">
              Confirm your details
            </h4>
            <div className="text-soft text-[14px] mb-6 flex items-center gap-2">
              <Icon name="clock" size={14} className="text-accent" />
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""}{" "}
              at {selectedTime} (30 mins)
            </div>

            {/* Honeypot */}
            <input
              type="text"
              name="_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: "none" }}
            />

            <div className="flex flex-col gap-5">
              <div>
                <label className="block font-pixel text-[10px] tracking-[0.14em] text-soft mb-2 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName)
                      setErrors({ ...errors, fullName: false });
                  }}
                  placeholder="e.g. John Doe"
                  className={`w-full bg-transparent text-white font-sans text-[15px] py-3 border-0 border-b rounded-none outline-none focus:border-accent transition-colors ${errors.fullName ? "border-accent" : "border-line-soft"}`}
                />
                {errors.fullName && (
                  <div className="mt-2 font-pixel text-[9px] tracking-[0.14em] text-accent uppercase">
                    Please enter your full name.
                  </div>
                )}
              </div>
              <div>
                <label className="block font-pixel text-[10px] tracking-[0.14em] text-soft mb-2 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: false });
                  }}
                  placeholder="john@example.com"
                  className={`w-full bg-transparent text-white font-sans text-[15px] py-3 border-0 border-b rounded-none outline-none focus:border-accent transition-colors ${errors.email ? "border-accent" : "border-line-soft"}`}
                />
                {errors.email && (
                  <div className="mt-2 font-pixel text-[9px] tracking-[0.14em] text-accent uppercase">
                    Please enter a valid email address.
                  </div>
                )}
              </div>
              <div>
                <label className="block font-pixel text-[10px] tracking-[0.14em] text-soft mb-2 uppercase">
                  WhatsApp Number
                </label>
                <div className="flex items-end gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          countryCode: e.target.value,
                        })
                      }
                      className="w-16 bg-transparent text-white font-sans text-[15px] py-3 border-0 border-b border-line-soft outline-none focus:border-accent transition-colors text-center"
                    />
                  </div>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => {
                      setFormData({ ...formData, whatsapp: e.target.value });
                      if (errors.whatsapp)
                        setErrors({ ...errors, whatsapp: false });
                    }}
                    placeholder="812 3456 7890"
                    className={`flex-1 bg-transparent text-white font-sans text-[15px] py-3 border-0 border-b rounded-none outline-none focus:border-accent transition-colors ${errors.whatsapp ? "border-accent" : "border-line-soft"}`}
                  />
                </div>
                {errors.whatsapp && (
                  <div className="mt-2 font-pixel text-[9px] tracking-[0.14em] text-accent uppercase">
                    Please enter your WhatsApp number.
                  </div>
                )}
              </div>

              {apiError && (
                <div className="font-pixel text-[9px] tracking-[0.14em] text-accent uppercase">
                  {apiError}
                </div>
              )}

              <div className="mt-4 flex items-center gap-4">
                {securityEnabled && !isDev && (
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    options={{ size: "invisible" }}
                    onSuccess={(token) => setTurnstileToken(token)}
                  />
                )}
                <Btn
                  variant="primary"
                  onClick={confirmBooking}
                  disabled={loading || (securityEnabled && !isDev && !turnstileToken)}
                >
                  {loading ? "Scheduling..." : "Schedule Event"}
                </Btn>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-line-soft flex items-center justify-between">
          <div className="font-pixel text-[9px] tracking-[0.15em] text-muted flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Online
          </div>
          <div className="relative group">
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="bg-transparent text-muted text-[11px] font-sans outline-none border-0 cursor-pointer hover:text-white transition-colors"
            >
              {timezones.map((tz) => (
                <option
                  key={tz.value}
                  value={tz.value}
                  className="bg-[#08090d]"
                >
                  {tz.label}
                </option>
              ))}
              {!timezones.find((t) => t.value === timezone) && (
                <option value={timezone} className="bg-[#08090d]">
                  Local ({timezone})
                </option>
              )}
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-7 flex-wrap font-pixel text-[10px] tracking-[0.15em] text-muted mt-8 relative z-20">
        <span>
          DURATION · <b className="text-white font-normal">30 MIN</b>
        </span>
        <span>
          RESPONSE · <b className="text-white font-normal">WITHIN 24H</b>
        </span>
        <span>
          COMMITMENT · <b className="text-white font-normal">NONE</b>
        </span>
      </div>
    </div>
  );
}
