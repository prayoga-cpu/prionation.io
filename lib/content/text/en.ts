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
};
