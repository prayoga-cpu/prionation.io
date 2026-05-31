import type { LocalePages } from "./types";

export const pagesEn: LocalePages = {
  common: {
    backToHome: "← Back to home",
    faqTitle: "Frequently asked questions",
    ctaTitle: "Start with a Diagnostic",
    ctaBody:
      "Two weeks. €5,000. A mapped bottleneck and a production-ready plan — with no obligation to proceed to a Build.",
    ctaButton: "Start a Diagnostic",
    anchorLabel: "AI Product Engineering",
  },

  methodology: {
    "evals-before-features": {
      navLabel: "Evals before features",
      seoTitle: "Evals before features · PRIONATION.io",
      metaDescription:
        "Why PRIONATION writes the eval suite before the prompt — the engineering principle that makes fixed-price production AI honest.",
      badge: "Methodology · 01",
      tldr: "Evals before features means writing the test suite that defines 'working' before building the AI that has to pass it. It is the principle that makes a fixed price and a post-launch warranty possible: without an agreed measure of done, neither the client nor the builder can say whether the system succeeded.",
      h1: "Evals before features: the test suite before the prompt",
      intro: [
        "In conventional software, tests check that code does what it should. In AI, the equivalent — evals — do something more fundamental: they define what 'should' even means for a probabilistic system. PRIONATION writes them first, before any prompt or model is chosen.",
        "This is not a process preference. It is the mechanism that lets a fixed-scope, fixed-price engagement be honest, because the definition of success is agreed and measurable before the build begins.",
      ],
      sections: [
        {
          h2: "What this principle means",
          body: [
            "An eval is a repeatable test that scores an AI system's output against a defined standard: a set of representative inputs, an expected behaviour, and a scoring method. A suite of them turns the vague question 'is the AI good enough?' into a number everyone agreed on in advance.",
            "Writing them first inverts the usual order. Instead of building a feature and then asking whether it works, PRIONATION specifies what 'works' is — the golden dataset, the pass thresholds, the failure cases — and only then builds the system to meet it.",
          ],
        },
        {
          h2: "The anti-pattern",
          body: [
            "The common failure mode is demo-driven development: a prototype looks impressive on a few hand-picked inputs, everyone is excited, and it ships. In production it meets inputs no one tested, fails quietly, and the debate becomes subjective — 'the model is wrong' versus 'the prompt is fine' — with no shared standard to settle it.",
            "Without evals there is also no honest warranty. If 'done' was never defined, there is no way to say whether a later regression is a bug to fix for free or new work to quote. The absence of evals is what makes most AI engagements quietly open-ended.",
          ],
        },
        {
          h2: "How PRIONATION implements it",
          body: [
            "Every Build starts by constructing a golden dataset from real, representative inputs and defining the scoring rubric for each — exact-match where appropriate, model-graded where judgement is needed, with explicit thresholds. These become automated regression checks that run in CI on every change.",
            "The eval suite is specified during the two-week Diagnostic, before the Build is quoted. That is deliberate: the suite is the contract. It is what the fixed price is priced against and what the four-week post-launch warranty is measured against.",
          ],
        },
        {
          h2: "How it connects to the other three principles",
          body: [
            "Evals feed telemetry: the same scoring logic that gates the build runs against production traffic, so live performance is measured on the same yardstick as the build. They depend on owned infrastructure, because the golden dataset and the eval harness are client assets that ship with the code.",
            "And they make lean pods possible. A small team can move fast precisely because the eval suite catches regressions automatically, removing the manual QA that would otherwise slow a two-to-three-person pod to a crawl.",
          ],
        },
        {
          h2: "Why it is the structural foundation for fixed-price delivery",
          body: [
            "A fixed price is only honest if 'finished' is defined before the number is agreed. Evals are that definition. They convert an open-ended research problem into a bounded engineering one: build the system that scores above the threshold on the agreed suite.",
            "This is why PRIONATION treats the eval specification as the real deliverable of the Diagnostic. Once it exists, the Build is de-risked for both sides — the scope cannot silently expand, and the result cannot be argued about.",
          ],
        },
      ],
      faq: [
        {
          q: "What is an AI eval?",
          a: "A repeatable test that scores an AI system's output against a defined standard — a set of representative inputs, an expected behaviour, and a scoring method. Evals turn 'is the AI good enough?' into an agreed number.",
        },
        {
          q: "Why write evals before the prompt?",
          a: "Because the eval defines what 'working' means. Writing it first makes success measurable and agreed before the build, which is what allows a fixed price and a real warranty. Building first and testing later leaves 'done' undefined.",
        },
        {
          q: "How does this make a fixed price possible?",
          a: "A fixed price is only honest if the finish line is defined in advance. The eval suite is that finish line: the Build is priced and warrantied against passing it, so scope cannot silently expand.",
        },
        {
          q: "Do evals slow the build down?",
          a: "They speed it up. Automated eval checks in CI catch regressions instantly, removing manual QA cycles. That is what lets a two-to-three-person pod move quickly without breaking things.",
        },
        {
          q: "Who owns the eval suite?",
          a: "The client. The golden dataset and the eval harness ship with the code as part of owned infrastructure, so the same standard keeps running after the engagement ends.",
        },
      ],
    },

    "telemetry-from-day-one": {
      navLabel: "Telemetry from day one",
      seoTitle: "Telemetry from day one · PRIONATION.io",
      metaDescription:
        "How PRIONATION instruments production AI from the first deployment — the observability practice that ends 'the model is wrong' debates.",
      badge: "Methodology · 02",
      tldr: "Telemetry from day one means instrumenting an AI system to record what it did, on what input, and how well — from its very first production request. It turns 'the model feels off' into evidence, and it is how the retainer and every later iteration stay grounded in reality rather than opinion.",
      h1: "Telemetry from day one: production data over opinion",
      intro: [
        "Most AI systems are deployed blind. They produce outputs, those outputs reach users, and no one can say afterwards what the system actually did or why. PRIONATION instruments from the first request, so the system explains itself.",
        "Telemetry is the difference between iterating on data and iterating on anecdotes. It is also what makes the eval suite a living thing rather than a one-time gate.",
      ],
      sections: [
        {
          h2: "What this principle means",
          body: [
            "Telemetry is the structured record of an AI system in production: the input it received, the output it produced, the model and prompt version, the eval-relevant scores, latency, cost, and any human correction. It is logged from the first deployment, not bolted on after something breaks.",
            "The point is observability — being able to answer, for any production decision the system made, what happened and whether it met the standard, without re-running or guessing.",
          ],
        },
        {
          h2: "The anti-pattern",
          body: [
            "The failure mode is the untraceable complaint. A stakeholder says the AI is 'getting worse,' and with no telemetry the team cannot confirm it, locate it, or measure it. Debugging becomes archaeology, and changes are made on hunches that may make things worse.",
            "The second anti-pattern is vanity logging: capturing everything and nothing useful — raw request dumps with no scores, no versions, no link to the eval criteria — so the data exists but cannot answer the only question that matters: is it still good enough?",
          ],
        },
        {
          h2: "How PRIONATION implements it",
          body: [
            "Instrumentation is part of the build, not an afterthought. Each production interaction is logged with the input, output, model and prompt version, and the same scores the eval suite uses, so production quality is tracked on the identical yardstick as the build. Costs and latency are tracked alongside, because in production those are quality attributes too.",
            "The telemetry pipeline writes into the client's own infrastructure. Dashboards surface drift against eval thresholds, and flagged cases flow back into the golden dataset, closing the loop between production reality and the next iteration.",
          ],
        },
        {
          h2: "How it connects to the other three principles",
          body: [
            "Telemetry is the runtime half of evals: the suite defines the standard, telemetry measures it continuously against real traffic. It lives on owned infrastructure, so the operational record — often the most valuable asset a build produces — belongs to the client.",
            "It also keeps lean pods honest over time. A retainer is only worth paying for if its effect is visible; telemetry makes each iteration's impact measurable, so ongoing pod work is judged on movement in real numbers.",
          ],
        },
        {
          h2: "Why it is the structural foundation for fixed-price delivery",
          body: [
            "A four-week post-launch warranty is meaningless without telemetry. To honour 'we fix it if it falls below the eval thresholds,' you must be able to see, in production, whether it has. Telemetry is what makes the warranty a measurable commitment rather than a slogan.",
            "It also bounds the retainer. Because impact is observable, ongoing work is scoped against real signals instead of an open-ended 'keep improving it,' which is exactly the kind of variance that makes fixed, predictable pricing possible.",
          ],
        },
      ],
      faq: [
        {
          q: "What is AI telemetry?",
          a: "The structured record of a production AI system: each input, output, model and prompt version, eval-relevant score, latency and cost, plus any human correction. It makes the system's behaviour observable and measurable.",
        },
        {
          q: "Why instrument from day one instead of when something breaks?",
          a: "Because problems in AI are often silent and drift slowly. Without telemetry from the first request you cannot confirm, locate, or measure a regression — debugging becomes guesswork and fixes are made on hunches.",
        },
        {
          q: "How is telemetry different from normal application logging?",
          a: "General logging records that something happened. AI telemetry records how well it happened, scored on the same standard as the eval suite, and tied to the exact model and prompt version — so it can answer whether the system is still good enough.",
        },
        {
          q: "Where does the telemetry data live?",
          a: "In the client's own infrastructure. It is part of owned infrastructure, so the operational record stays with the client and keeps working after the engagement ends.",
        },
        {
          q: "How does telemetry support the warranty and retainer?",
          a: "The warranty promises a fix if production quality falls below the agreed eval thresholds; telemetry is how you see that it has. For the retainer, it makes each iteration's impact measurable, so ongoing work is judged on real numbers.",
        },
      ],
    },

    "owned-infrastructure": {
      navLabel: "Owned infrastructure",
      seoTitle: "Owned infrastructure · PRIONATION.io",
      metaDescription:
        "Why PRIONATION clients hold the code, hosting, data, and models at the end of every engagement — the engineering case against AI vendor lock-in.",
      badge: "Methodology · 03",
      tldr: "Owned infrastructure means the client holds the code, the hosting, the data, and the model accounts — from day one, not as an end-of-project handover. It is the engineering expression of a simple commercial stance: control over dependency. When the engagement ends, the client keeps running without PRIONATION.",
      h1: "Owned infrastructure: control over dependency",
      intro: [
        "Many AI vendors build a system, host it themselves, and rent it back. The client gets an output but never the asset, and leaving means losing everything. PRIONATION builds the opposite way: into the client's environment, with the client holding every key.",
        "This is the principle clients feel most directly, because it is the one that determines what they have left when the relationship ends.",
      ],
      sections: [
        {
          h2: "What this principle means",
          body: [
            "Owned infrastructure means that at every point — not just at the end — the production system runs on accounts and repositories the client controls: the GitHub organisation, the cloud project, the model-provider accounts, the database, and the telemetry store. PRIONATION operates inside that environment as a builder, not a landlord.",
            "The deliverable is therefore not access to a system but the system itself, with no component held hostage by the vendor.",
          ],
        },
        {
          h2: "The anti-pattern",
          body: [
            "The lock-in pattern is familiar: the vendor's name is on the cloud account, the code lives in the vendor's private repo, the API keys are the vendor's, and the data passes through the vendor's pipeline. The client's leverage erodes month by month, and the switching cost becomes a moat the vendor never has to defend on merit.",
            "The subtler version is the 'platform' that technically gives access but encodes the real logic in a proprietary layer you cannot export. You can leave — but not with anything that runs.",
          ],
        },
        {
          h2: "How PRIONATION implements it",
          body: [
            "Provisioning happens in the client's accounts on the first day of the Build. Code is committed to the client's repository; infrastructure is defined as code so it is reproducible and inspectable; secrets belong to the client from the start. A handover runbook documents every credential, service, and operational procedure.",
            "Nothing essential routes through PRIONATION-owned services. The test is simple and applied deliberately: if PRIONATION disappeared overnight, the system keeps running and the client's own team can operate it.",
          ],
        },
        {
          h2: "How it connects to the other three principles",
          body: [
            "Owned infrastructure is where evals and telemetry come to rest: the golden dataset, the eval harness, and the production telemetry are all client assets, so the standards and the operational record stay with the client. It is what makes those principles durable rather than borrowed.",
            "It also shapes the lean-pod relationship: because the client owns everything, the retainer is a genuine choice renewed on value, not a dependency they cannot exit.",
          ],
        },
        {
          h2: "Why it is the structural foundation for fixed-price delivery",
          body: [
            "Owned infrastructure aligns incentives in a way that makes fixed price coherent. A vendor who profits from lock-in is rewarded for dependency; a foundation that hands over everything is rewarded only for shipping something that works. The second is the only stance under which a fixed price and a clean exit are mutually honest.",
            "It also keeps scope concrete. Building in the client's real environment from day one surfaces integration realities early, when they can be priced, rather than late, when they become disputes.",
          ],
        },
      ],
      faq: [
        {
          q: "What does 'the client owns the infrastructure' include?",
          a: "The code repository, the cloud accounts and hosting, the model-provider accounts, the database, and the telemetry data — all on accounts the client controls from day one, plus a handover runbook documenting every credential and procedure.",
        },
        {
          q: "When does the handover happen?",
          a: "There is no migration event. PRIONATION builds inside the client's environment from the first day, so ownership is the default state throughout, not a transfer at the end.",
        },
        {
          q: "What is AI vendor lock-in, concretely?",
          a: "When the vendor holds the cloud account, the private repo, the API keys, or encodes the core logic in a proprietary layer you cannot export. You can leave, but nothing leaves with you that still runs.",
        },
        {
          q: "Can we operate the system without PRIONATION?",
          a: "Yes — that is the explicit design test. Infrastructure-as-code, a documented runbook, and client-held credentials mean your own team can run it, and an optional retainer is a choice rather than a necessity.",
        },
        {
          q: "How does ownership relate to data and compliance?",
          a: "Because the data and hosting live in your accounts, you control residency and access. Client infrastructure can remain within compliant hosting where required, without routing through a third party.",
        },
      ],
    },

    "lean-pods-fixed-clocks": {
      navLabel: "Lean pods, fixed clocks",
      seoTitle: "Lean pods, fixed clocks · PRIONATION.io",
      metaDescription:
        "How a 2–3 engineer pod and an 8-week clock make fixed-price AI delivery possible — the link between PRIONATION's methodology and its commercial model.",
      badge: "Methodology · 04",
      tldr: "Lean pods, fixed clocks means a small senior team — two to three engineers — delivering on a fixed eight-week cadence rather than an open-ended timeline. It is the commercial expression of the other three principles: only because evals, telemetry, and owned infrastructure remove variance can a fixed clock and a fixed price be promised honestly.",
      h1: "Lean pods, fixed clocks: how fixed price becomes possible",
      intro: [
        "Most AI engagements are sold by the hour or the month because the work feels unpredictable. PRIONATION sells a fixed scope on a fixed clock — and the reason it can is not optimism but method.",
        "This principle is where the engineering meets the commercial model. It explains why the Diagnostic is mandatory and why a small team is a feature, not a limitation.",
      ],
      sections: [
        {
          h2: "What this principle means",
          body: [
            "A pod is a small, senior, cross-functional team — typically two to three engineers — that owns a build end to end. A fixed clock is the eight-week delivery unit the pod commits to. The combination is deliberately constrained: small enough to move without coordination overhead, time-boxed enough to force prioritisation.",
            "The constraint is the point. A fixed clock turns 'what could we build?' into 'what is the single highest-value thing we can ship and harden in eight weeks?'",
          ],
        },
        {
          h2: "The anti-pattern",
          body: [
            "The open-ended engagement is the anti-pattern: a large team, a vague scope, and a timeline that slips because nothing forces a decision about what 'done' is. Cost scales with time, and the vendor's incentive quietly favours more time, not more value.",
            "The opposite failure is the heroic solo contractor with no method — fast until they hit the variance that evals and telemetry exist to absorb, at which point the timeline becomes unknowable.",
          ],
        },
        {
          h2: "How PRIONATION implements it",
          body: [
            "The eight weeks have a shape: roughly two weeks of architecture and eval scaffolding, four weeks of build against those evals, and two weeks of hardening and telemetry-driven tuning. The pod is small enough that everyone holds the whole system in their head, which is what keeps a fixed clock realistic.",
            "Crucially, the fixed price is only quoted after the two-week Diagnostic, because that is when scope is mapped and the eval criteria are set. PRIONATION does not quote a fixed Build price on an unmapped problem.",
          ],
        },
        {
          h2: "How it connects to the other three principles",
          body: [
            "This principle is downstream of the other three. Evals bound the work by defining done; telemetry makes iteration measurable so hardening is targeted; owned infrastructure removes the integration surprises that blow up timelines. Remove any one and the fixed clock stops being honest.",
            "In other words, lean pods on fixed clocks is not a scheduling trick — it is what becomes possible once variance has been engineered out by the first three principles.",
          ],
        },
        {
          h2: "Why it is the structural foundation for fixed-price delivery",
          body: [
            "Fixed price and fixed clock are the same promise viewed commercially and operationally. The promise is only safe to make when the methodology eats the variance — which is exactly what the Diagnostic verifies before a number is given.",
            "This is why no honest fixed price exists without the method behind it. Agencies that quote fixed price on AI work without evals, telemetry, and owned infrastructure are either absorbing hidden risk or quietly converting to time-and-materials when it bites.",
          ],
        },
      ],
      faq: [
        {
          q: "What is a PRIONATION pod?",
          a: "A small, senior team — typically two to three engineers — that owns a build end to end on a fixed eight-week clock. Small by design, so the team moves without coordination overhead and holds the whole system in mind.",
        },
        {
          q: "Why eight weeks?",
          a: "A fixed clock forces prioritisation: it turns an open question into 'what is the single highest-value thing we can ship and harden in eight weeks?' The cadence is roughly two weeks architecture, four weeks build, two weeks hardening.",
        },
        {
          q: "Why is the Diagnostic required before a fixed price?",
          a: "Because a fixed price is only honest once scope is mapped and the eval criteria are set. The two-week Diagnostic does that; PRIONATION does not quote a fixed Build price on an unmapped problem.",
        },
        {
          q: "Isn't a small team a limitation?",
          a: "It is a feature. A small senior pod avoids the coordination overhead that slows large teams, and it is viable precisely because evals and telemetry automate the checks that would otherwise need a QA layer.",
        },
        {
          q: "How can fixed price work for AI when others charge hourly?",
          a: "It works only because the other three principles remove variance. Evals define done, telemetry makes iteration measurable, and owned infrastructure prevents integration surprises. Without that method, a fixed price hides risk rather than removing it.",
        },
      ],
    },
  },

  frameworks: {
    "ai-build-vs-buy-calculator": {
      navLabel: "Build vs buy calculator",
      seoTitle: "AI build vs buy calculator · PRIONATION.io",
      metaDescription:
        "A decision framework for mid-market operators: six inputs that tell you whether to build custom AI, buy SaaS, or run a hybrid.",
      badge: "Framework · Build vs buy",
      tldr: "The build-vs-buy decision for AI comes down to six variables: how much the workflow costs you, its volume, how specific it is to your business, your data sensitivity, your existing tooling, and your time horizon. This framework turns those into a clear recommendation — build, buy, or hybrid — instead of a gut call.",
      h1: "AI build vs buy: a decision framework for mid-market operators",
      intro: [
        "Every operator facing an AI decision asks the same question: do we build something custom, buy a SaaS product, or combine both? The wrong answer is expensive in either direction — a custom build for a generic problem wastes capital; a SaaS tool for a core differentiator caps your upside.",
        "This framework reduces the decision to six inputs and a simple logic for weighing them. It is the same reasoning PRIONATION applies in a Diagnostic, made explicit.",
      ],
      sections: [
        {
          h2: "How to use this",
          body: [
            "Score your workflow against the six inputs below, honestly. The goal is not a precise number but a direction: most decisions become obvious once the variables are named. Where two inputs pull in opposite directions, the tie-breaker is almost always specificity — how unique the workflow is to how you compete.",
            "Treat the output as the start of a scoping conversation, not a verdict. A 'build' signal still needs a Diagnostic to confirm the bottleneck is real and the scope is bounded.",
          ],
        },
        {
          h2: "The six inputs",
          body: [
            "1) Annual cost of the workflow — the fully loaded cost of doing it today, including the people. 2) Monthly volume — how often it runs. 3) Specificity — how particular it is to your business versus a generic task any company has. 4) Data sensitivity — whether the data can leave your environment. 5) Existing tooling — whether a SaaS product already covers most of it. 6) Time horizon — how long you will rely on this workflow.",
            "High cost, high volume, high specificity, and high data sensitivity push toward build. Low specificity and a strong existing SaaS option push toward buy. A long time horizon raises the return on a build; a short one favours buying.",
          ],
        },
        {
          h2: "The decision logic",
          body: [
            "Buy when the workflow is generic, well-served by mature SaaS, and not a source of competitive advantage — you should not build commodity infrastructure. Build when the workflow is specific to how you compete, expensive, high-volume, or constrained by data that cannot leave your environment, and you expect to rely on it for years.",
            "Choose hybrid when the core is generic but the last mile is yours: buy the commodity layer, build the thin differentiating layer on top. Most mid-market AI wins are hybrids — the value is in the 20% that is specific to your operation.",
          ],
        },
        {
          h2: "What to do with the result",
          body: [
            "A 'buy' result means your next step is vendor selection, not an engagement with PRIONATION. We will tell you so. A 'build' or 'hybrid' result means the next step is a two-week Diagnostic to map the bottleneck, confirm the scope, and price a fixed Build.",
            "Either way, the framework has done its job if it stopped you from building something you should have bought, or buying something you should have built.",
          ],
        },
      ],
      faq: [
        {
          q: "When should we build custom AI instead of buying SaaS?",
          a: "Build when the workflow is specific to how you compete, expensive or high-volume, or constrained by data that cannot leave your environment — and you will rely on it for years. Buy when it is generic and well-served by mature SaaS.",
        },
        {
          q: "What is a hybrid AI approach?",
          a: "Buying the commodity layer and building only the thin differentiating layer on top. Most mid-market AI wins are hybrids, because the value sits in the small part of the workflow that is specific to your operation.",
        },
        {
          q: "How does data sensitivity affect the decision?",
          a: "If the data cannot leave your environment for compliance or competitive reasons, that pushes strongly toward build, because owned infrastructure keeps the data in your accounts rather than routing it through a third-party SaaS.",
        },
        {
          q: "Does a 'build' result mean we should hire engineers?",
          a: "Not necessarily. A build can be delivered by a lean pod on a fixed price and handed over for your team to own — see the pod vs hire cost model. The build decision is separate from the staffing decision.",
        },
        {
          q: "What is the next step after this framework?",
          a: "If the result is build or hybrid, a two-week Diagnostic maps the bottleneck and prices a fixed Build. If it is buy, your next step is vendor selection — and we will say so plainly.",
        },
      ],
    },

    "pod-vs-hire-cost-model": {
      navLabel: "Pod vs hire cost model",
      seoTitle: "Pod vs hire — real cost model · PRIONATION.io",
      metaDescription:
        "The full loaded cost of a lean AI pod versus an in-house AI engineer hire — salary, benefits, recruitment, ramp, and risk, compared honestly.",
      badge: "Framework · Pod vs hire",
      tldr: "Comparing a PRIONATION pod to an in-house AI hire on day rate alone is misleading. The honest comparison includes salary, benefits, recruitment, ramp time, and the risk of a bad hire. On a single eight-week build, a fixed-price pod is almost always cheaper and faster than hiring; over years, an internal team eventually wins. This model shows where the line is.",
      h1: "Pod vs hire: the real cost of building AI",
      intro: [
        "The instinct is to compare a pod's price to an engineer's salary and conclude that hiring is cheaper. That comparison ignores most of the real cost of a hire and all of the risk.",
        "This model lays out the full loaded cost of each path so the comparison is honest — and shows that the answer depends entirely on your time horizon.",
      ],
      sections: [
        {
          h2: "How to use this",
          body: [
            "Pick the scenario that matches you: a single defined build, an ongoing stream of AI work, or uncertainty about which. Then read the loaded cost of each path, not the headline number. The decision is rarely about price per day; it is about risk, speed, and how much AI work you actually have.",
            "The model assumes a mid-market context — European or US salaries, a single high-value workflow — and is meant to frame the decision, not replace a quote.",
          ],
        },
        {
          h2: "The full cost of a hire",
          body: [
            "A senior AI engineer is not their salary. Loaded cost adds employer taxes and benefits, recruitment fees or months of founder time, equipment and tooling, and the three-to-six-month ramp before they are productive. Then there is risk: a mis-hire in a scarce, hard-to-evaluate field can cost a year and leave nothing shipped.",
            "On an annual basis a single senior AI hire in the EU or US runs well into six figures fully loaded — before they have shipped anything, and assuming the hire works out.",
          ],
        },
        {
          h2: "The full cost of a pod",
          body: [
            "A PRIONATION pod is a fixed price for a defined eight-week build, with a small senior team, evals, telemetry, and a four-week warranty included. There is no recruitment, no ramp, and no hire-quality risk — the methodology and the fixed price absorb the variance.",
            "The trade-off is that a pod is priced per engagement. For a continuous, open-ended stream of AI work, the recurring cost of pods eventually exceeds the cost of an internal team that has already ramped.",
          ],
        },
        {
          h2: "Where the line falls",
          body: [
            "For one or two defined builds, the pod wins clearly: faster, cheaper once risk and ramp are counted, and you keep the code. For a permanent, high-volume AI roadmap, building an internal team eventually wins — once it is hired, ramped, and retained.",
            "The common path is sequential: use pods to ship the first builds and prove the value, then hire internally against a proven roadmap — with PRIONATION's owned-infrastructure handover meaning your new team inherits a running system, not a black box.",
          ],
        },
      ],
      faq: [
        {
          q: "Is a pod cheaper than hiring an AI engineer?",
          a: "For a defined build, almost always — once you count recruitment, benefits, the three-to-six-month ramp, and hire-quality risk, not just salary. For a permanent high-volume roadmap, an internal team eventually costs less.",
        },
        {
          q: "What is the 'loaded cost' of an AI hire?",
          a: "Salary plus employer taxes and benefits, recruitment cost or founder time, equipment, and the months of ramp before productivity — plus the risk that a mis-hire in a scarce field costs a year with nothing shipped.",
        },
        {
          q: "When does hiring internally make more sense?",
          a: "When you have a permanent, high-volume stream of AI work. Once an internal team is hired, ramped, and retained, its marginal cost per project falls below repeated engagements.",
        },
        {
          q: "Can we use pods and then hire?",
          a: "Yes, and it is the common path: ship the first builds with pods to prove value, then hire against a proven roadmap. Because the pod hands over owned infrastructure, your new team inherits a running system.",
        },
        {
          q: "Does the pod price include maintenance?",
          a: "Each Build includes a four-week post-launch warranty. Ongoing maintenance is an optional retainer, scoped against real telemetry, not an open-ended commitment.",
        },
      ],
    },

    "8-week-build-readiness-checklist": {
      navLabel: "Build readiness checklist",
      seoTitle: "8-week build readiness checklist · PRIONATION",
      metaDescription:
        "A self-assessment across data, stakeholders, success criteria, infrastructure, and commitment — find out whether your company is ready for an 8-week AI build.",
      badge: "Framework · Readiness",
      tldr: "Most AI builds that fail were not ready to start. This checklist assesses readiness across five areas — data, stakeholder alignment, success criteria, infrastructure access, and commercial commitment. If you are weak on more than one, a Diagnostic comes first; if you are strong across all five, you are ready to build.",
      h1: "Are you ready for an 8-week AI build? A readiness checklist",
      intro: [
        "An eight-week fixed-price build only works if the ground is prepared. The most common reason a build slips is not the engineering — it is that one of five preconditions was missing and nobody checked.",
        "Use this checklist before committing to a Build. It is the readiness assessment a Diagnostic performs, made into something you can run yourself.",
      ],
      sections: [
        {
          h2: "How to use this",
          body: [
            "Score yourself honestly across the five areas below. A 'no' is not a disqualification — it is a thing to fix before the clock starts. The point of the checklist is to surface the gaps now, when they are cheap to close, rather than in week three of a build, when they are expensive.",
            "Strong across all five means you are build-ready. Weak in one means close it first. Weak in two or more means start with a Diagnostic, which exists precisely to resolve these unknowns.",
          ],
        },
        {
          h2: "The five areas",
          body: [
            "1) Data readiness — does representative data exist, is it accessible, and is it good enough to build evals from? 2) Stakeholder alignment — is there one decision-maker who owns the outcome, not a committee? 3) Success criteria — can you state what 'working' means in measurable terms? 4) Infrastructure access — can a team provision in your environment without a months-long approval chain? 5) Commercial commitment — is the budget and the eight-week calendar genuinely committed?",
            "These map directly onto the four principles: data and success criteria feed evals; infrastructure access enables owned infrastructure; commitment makes the fixed clock real.",
          ],
        },
        {
          h2: "Reading your score",
          body: [
            "If you are strong on all five, a Build can start with confidence and the fixed price is low-risk. If data or success criteria are weak, those are exactly what a Diagnostic produces — it maps the bottleneck and writes the eval spec, turning a 'not yet' into a 'ready'.",
            "If stakeholder alignment or commitment is the gap, fix that before spending on engineering at all. No methodology survives a build that the organisation has not actually committed to.",
          ],
        },
        {
          h2: "What to do with the result",
          body: [
            "A strong score means your next step is a Diagnostic to lock scope and price the Build — short, because you are already prepared. A mixed score means the Diagnostic does double duty: it closes the readiness gaps and produces the build plan.",
            "Either way, the checklist has done its job if it moved a problem from week three of a build to the week before it starts.",
          ],
        },
      ],
      faq: [
        {
          q: "What makes a company ready for an AI build?",
          a: "Strength across five areas: representative accessible data, a single accountable decision-maker, measurable success criteria, fast infrastructure access in your environment, and genuine budget and calendar commitment.",
        },
        {
          q: "What if our data isn't ready?",
          a: "Then a Diagnostic comes first. Building the eval suite requires representative data; if it is missing or messy, the Diagnostic surfaces that and defines what is needed before a fixed-price Build is sensible.",
        },
        {
          q: "Do we need success metrics before starting?",
          a: "Yes — or a Diagnostic to define them. 'Working' must be measurable before a build, because the eval suite and the fixed price are written against it. Undefined success is the most common cause of open-ended AI projects.",
        },
        {
          q: "Why does stakeholder alignment matter so much?",
          a: "Because a build with a committee and no single owner stalls on decisions. One accountable decision-maker keeps an eight-week clock realistic; a build the organisation has not truly committed to will slip regardless of method.",
        },
        {
          q: "What is the next step after the checklist?",
          a: "A two-week Diagnostic — short if you scored strongly, or doing double duty to close gaps and produce the build plan if your score was mixed.",
        },
      ],
    },
  },

  guides: {
    "ai-consulting-cost-mid-market-companies": {
      navLabel: "AI consulting cost",
      seoTitle: "AI consulting cost for mid-market companies",
      metaDescription:
        "What AI engagements actually cost for €5–50M companies — Diagnostic, Build, and Retainer pricing, the three models compared, and where the hidden costs hide.",
      badge: "Guide · Pricing",
      tldr: "For a mid-market company, AI engagements typically run €5,000–7,000 for a two-week Diagnostic, €25,000–55,000 for an eight-week Build, and €4,000–9,000/month for an ongoing Retainer. The number that matters more than the headline price is the pricing model, because it determines who carries the risk when the work turns out to be harder than expected.",
      h1: "AI consulting cost for mid-market companies",
      intro: [
        "The honest answer to 'what does AI consulting cost?' for a €5–50M company is a range — and a warning that the range is the least important part. How the work is priced matters more than the number, because it decides who absorbs the inevitable variance.",
        "This guide gives the real figures, compares the three pricing models, and names the costs that vendors tend not to mention upfront.",
      ],
      sections: [
        {
          h2: "The real figures",
          body: [
            "PRIONATION's structure is fixed and public: a Diagnostic at €5,000–7,000 over two weeks maps the bottleneck and sets the scope; a Build at €25,000–55,000 over eight weeks ships the production system; a Retainer at €4,000–9,000/month keeps a pod available afterwards, with a six-month minimum. A three-page Express Site starts at €1,500.",
            "More than 60% of Diagnostics proceed to a Build — a number that only holds because the Diagnostic is scoped to qualify the work, not to sell the next stage regardless.",
          ],
        },
        {
          h2: "The three pricing models",
          body: [
            "AI work is sold three ways. Hourly or time-and-materials shifts all the risk of unpredictability onto you — the meter runs whether or not the work converges. Fixed-scope prices a defined outcome, so the vendor carries the variance. Retainer buys ongoing capacity at a predictable monthly rate.",
            "The structural point: time-and-materials rewards the vendor for the work taking longer. Fixed scope only works if the vendor has a method that removes variance — which is why fixed price and methodology are inseparable.",
          ],
        },
        {
          h2: "Where the hidden costs hide",
          body: [
            "The costs vendors underplay are ramp, integration, and lock-in. Ramp is the weeks billed while a team learns your domain. Integration is the unglamorous work of connecting to your real systems, often scoped vaguely and billed as it expands. Lock-in is the deferred cost of a system you cannot operate or leave without the vendor.",
            "A fixed-scope engagement with owned infrastructure removes all three: ramp and integration are inside the fixed price, and there is nothing to be locked into because you hold everything.",
          ],
        },
        {
          h2: "How to budget",
          body: [
            "Budget the Diagnostic first — it is small, and it is what makes the Build price reliable. Treat any vendor who quotes a fixed Build price without a scoping step as either guessing or planning to bill the difference later.",
            "For total cost of ownership, count what you keep: with owned infrastructure the Build is a capital asset your team can run, not a subscription to someone else's system.",
          ],
        },
      ],
      faq: [
        {
          q: "How much does AI consulting cost for a mid-market company?",
          a: "Typically €5,000–7,000 for a two-week Diagnostic, €25,000–55,000 for an eight-week Build, and €4,000–9,000/month for an ongoing Retainer. All fixed scope, fixed price, quoted in euros.",
        },
        {
          q: "Why is the pricing model more important than the price?",
          a: "Because it decides who carries the risk when work is harder than expected. Time-and-materials puts that risk on you and rewards the vendor for taking longer; fixed scope puts it on the vendor, but only works with a real method.",
        },
        {
          q: "What are the hidden costs in AI engagements?",
          a: "Ramp (weeks billed while a team learns your domain), integration (vaguely scoped connection work that expands), and lock-in (a system you cannot operate or leave). Fixed scope with owned infrastructure removes all three.",
        },
        {
          q: "Why start with a Diagnostic?",
          a: "Because it makes the Build price reliable. A fixed Build price quoted without a scoping step is a guess. The Diagnostic maps the bottleneck and sets the eval criteria the price is based on.",
        },
        {
          q: "What can we cancel, and what's the warranty?",
          a: "The Diagnostic carries no obligation to proceed to a Build. Each Build includes a four-week post-launch warranty against the agreed eval thresholds; the Retainer has a six-month minimum and is otherwise ongoing.",
        },
      ],
    },

    "scoping-ai-build-engagement": {
      navLabel: "Scoping an AI build",
      seoTitle: "How to scope an AI build engagement · PRIONATION",
      metaDescription:
        "The six components every AI scope document needs before you talk to a vendor — with good and bad examples — and the scoping mistakes that kill projects.",
      badge: "Guide · Scoping",
      tldr: "A good AI scope has six components: the workflow target, the success metric, a data inventory, the integration points, the constraints, and a timeline anchor. Most failed AI projects were under-scoped on one of these before the contract was signed. This guide shows what good and bad look like for each.",
      h1: "How to scope an AI build engagement",
      intro: [
        "The single biggest predictor of whether an AI build succeeds is the quality of the scope written before it starts. Vague scope is not a paperwork problem — it is the mechanism by which budgets double and timelines slip.",
        "This guide breaks scope into six components, with a good and a bad example for each, so you can pressure-test a scope before committing.",
      ],
      sections: [
        {
          h2: "Why scope decides the outcome",
          body: [
            "AI work has more inherent uncertainty than ordinary software, so loose scope compounds faster. When 'build an AI assistant' is the scope, every party fills the gaps with a different assumption, and the gap becomes a dispute the moment the bill arrives.",
            "Good scope does not eliminate uncertainty; it locates it. It says exactly what is being built, how success is measured, and what is explicitly out of bounds — so the unknowns that remain are small and named.",
          ],
        },
        {
          h2: "The six components",
          body: [
            "1) Workflow target — the specific operation being changed, not a capability. 2) Success metric — a measurable definition of done. 3) Data inventory — what data exists, where, and in what state. 4) Integration points — the exact systems to connect to. 5) Constraints — data residency, latency, budget, non-negotiables. 6) Timeline anchor — a fixed date the work is paced against.",
            "Each maps to something concrete: the success metric becomes the eval suite; the data inventory determines feasibility; the integration points are where most hidden cost lives.",
          ],
        },
        {
          h2: "Good scope vs bad scope",
          body: [
            "Bad: 'Use AI to improve customer support.' Good: 'Draft first-response replies for billing tickets, scored against a 200-ticket golden set, integrated with our help desk, with no customer data leaving our cloud, live in eight weeks.' The second is buildable and quotable; the first is an invitation to bill by the hour.",
            "The test for any scope line is whether two vendors would price it the same. If they would not, the line is too vague to commit to.",
          ],
        },
        {
          h2: "The mistakes that kill projects",
          body: [
            "The fatal scoping mistakes are: defining a capability instead of a workflow; leaving success undefined; discovering the data is unusable after signing; and treating integration as a detail. Each one converts a fixed engagement into an open-ended one.",
            "A Diagnostic exists to produce exactly this scope — but you can do much of it yourself first, and arrive at the conversation with the unknowns already narrowed.",
          ],
        },
      ],
      faq: [
        {
          q: "What should an AI scope document include?",
          a: "Six components: the workflow target, a measurable success metric, a data inventory, the integration points, the constraints (residency, latency, budget), and a timeline anchor. Each removes a class of later dispute.",
        },
        {
          q: "What does a good AI scope look like?",
          a: "Specific and testable: the exact workflow, a measurable definition of done, the systems to integrate, the data constraints, and a fixed date. The test is whether two vendors would price it identically.",
        },
        {
          q: "What's the most common scoping mistake?",
          a: "Defining a capability ('use AI for support') instead of a workflow ('draft first replies for billing tickets, scored against a golden set'). Capabilities cannot be priced or finished; workflows can.",
        },
        {
          q: "How does scope relate to the eval suite?",
          a: "The success metric in the scope becomes the eval suite. A scope with no measurable success criterion cannot produce evals, which is why such projects end up open-ended and disputed.",
        },
        {
          q: "Can the Diagnostic do the scoping for us?",
          a: "Yes — producing this scope is exactly what the two-week Diagnostic delivers. Doing the groundwork yourself first makes the Diagnostic faster and the resulting Build cheaper.",
        },
      ],
    },

    "fixed-price-vs-hourly-ai-consulting": {
      navLabel: "Fixed-price vs hourly",
      seoTitle: "Fixed-price vs hourly AI consulting · PRIONATION",
      metaDescription:
        "The four AI pricing models, the incentive each creates for the vendor, and why fixed-price AI only works when the methodology removes the variance.",
      badge: "Guide · Pricing models",
      tldr: "There are four ways to pay for AI work — hourly, fixed-scope, milestone-based, and retainer — and each creates a different incentive for the vendor. Hourly rewards slowness; fixed-scope rewards efficiency but only works with a real method. Choosing the model is really choosing whose interest is aligned with finishing.",
      h1: "Fixed-price vs hourly AI consulting: which model protects you",
      intro: [
        "Most buyers compare AI vendors on rate and capability. The more important comparison is the pricing model, because the model decides whether the vendor profits from finishing or from continuing.",
        "This guide lays out the four models, the incentive each one builds in, and why a fixed price is only trustworthy when there is a methodology behind it.",
      ],
      sections: [
        {
          h2: "The four models",
          body: [
            "Hourly / time-and-materials bills for time spent, regardless of outcome. Fixed-scope prices a defined deliverable for a set price. Milestone-based ties payment to staged deliverables. Retainer buys ongoing capacity for a flat monthly fee.",
            "Each is legitimate in the right context. The mistake is choosing a model without seeing the incentive it creates — because that incentive shapes the vendor's every decision once the work is underway.",
          ],
        },
        {
          h2: "The incentive each creates",
          body: [
            "Hourly rewards the vendor when work takes longer — not through dishonesty, but because the meter and the interest run the same direction. Fixed-scope rewards efficiency: the vendor keeps the upside of finishing fast, so their interest aligns with yours. Milestone-based aligns payment with progress but can fragment a system into demo-able pieces. Retainer rewards a steady relationship but can drift without a measure of value.",
            "The question to ask any vendor is simple: under your model, do you earn more by finishing or by continuing?",
          ],
        },
        {
          h2: "Why fixed-price AI is different",
          body: [
            "Fixed price is the model most aligned with the buyer — but it is also the one most vendors cannot honestly offer for AI, because AI work carries variance that a fixed price has to absorb. Offered without a method, a fixed price is either padded heavily or quietly abandoned the moment the work gets hard.",
            "This is why PRIONATION couples fixed price to evals, telemetry, and owned infrastructure. The methodology removes the variance that would otherwise make a fixed price reckless — and the mandatory Diagnostic is where that variance is measured before a number is given.",
          ],
        },
        {
          h2: "How to choose",
          body: [
            "Prefer fixed-scope for a defined build, and insist on seeing the method that makes it safe — a scoping step, an eval-based definition of done, and a warranty. Use a retainer for genuinely ongoing work, scoped against telemetry. Be cautious of hourly for anything that can be defined, and of a fixed price offered with no scoping step at all.",
            "The right model is the one under which the vendor only wins when you do.",
          ],
        },
      ],
      faq: [
        {
          q: "Is fixed-price or hourly better for AI work?",
          a: "Fixed-scope is more aligned with the buyer because the vendor keeps the upside of finishing fast. But it is only trustworthy with a real method behind it; without one, a fixed price is padded or quietly abandoned when the work gets hard.",
        },
        {
          q: "Why do most vendors charge hourly for AI?",
          a: "Because AI work carries variance, and hourly shifts that risk onto the client. It is the safe choice for a vendor without a methodology to remove the variance — but it rewards the vendor for taking longer.",
        },
        {
          q: "How can a fixed price be honest for unpredictable AI work?",
          a: "Only if a methodology removes the unpredictability first. Evals define done, telemetry makes iteration measurable, owned infrastructure prevents integration surprises, and a Diagnostic measures the variance before the price is set.",
        },
        {
          q: "What is milestone-based pricing good for?",
          a: "Tying payment to staged delivery on larger programmes. The risk is fragmenting a system into demo-able pieces that do not add up to a coherent production result, so milestones must be defined against real outcomes.",
        },
        {
          q: "What should I ask a vendor about pricing?",
          a: "One question: under your model, do you earn more by finishing or by continuing? Then ask to see the method — scoping step, eval-based definition of done, and warranty — that makes a fixed price safe.",
        },
      ],
    },
  },
};
