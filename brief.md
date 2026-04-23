# Design Brief — BAVOC-I-3768 v1

## What problem is this prototype trying to solve?

Air-to-air refueling missions involve coordinating tankers and multiple receiver aircraft across complex routes, often involving multiple nations and contingency-heavy planning. Today, this workflow is split across Excel spreadsheets, email threads, and disconnected flight plans — with roughly **70% of planning time spent on coordination rather than flight calculations** (synthesis-04, synthesis-05).

ForeFlight Dispatch is already in use for initial planning, but it lacks a mission-level concept: planners must create individual flights and then tag them post-hoc to indicate they belong together (synthesis-06). The prototype tests whether a **mission-first entry point** — where a planner starts with a named mission and then assigns aircraft to it — better fits the mental model operators actually use.

The secondary problem is that current interfaces are tanker-centric; the **receiver/fighter perspective** (fuel-on-arrival, refueling sequence, diversion scenarios) is poorly represented (synthesis-03, synthesis-07). This prototype makes the fighter perspective a first-class citizen.

---

## The 3–5 key design decisions in this version

**1. Missions toggle sits inside Dispatch, not in a new menu item (synthesis-06)**  
Feedback from stakeholder sessions was explicit: the module should live within the existing Dispatch area as a toggle between "Flights" and "Missions" views — not as a separate left-nav item. This prototype implements exactly that: a toggle above the sidebar list, so the context stays familiar and the learning curve is minimal.

**2. Two courses of action — Primary + Contingency — not three or four (synthesis-01, synthesis-02)**  
Early technical architecture work explored generating 3–4 scenarios per AR event (earliest contact, latest contact, mid-point, no-contact diversion). Stakeholder sessions agreed this was over-engineering. This prototype collapses to **Primary / Contingency** — a clean binary toggle that covers the decision the planner actually makes on the ground. The divert airport only surfaces in the Contingency view, reducing cognitive load in the Primary (expected) case.

**3. Manual fuel inputs, not automated performance calculations (synthesis-05)**  
Multiple sessions flagged that automated calculations require extremely detailed aircraft performance datasets that teams currently manage in Excel outside ForeFlight. The MVP does not attempt to replace those calculations — it provides manual input fields for fuel-on-arrival and target onload figures. The value proposition in v1 is digitizing and centralizing the workflow, not automating the math. Automation is phase 2.

**4. Refueling sequence sorted by weakest fuel first, surfaced as a first-class field (synthesis-03, synthesis-05)**  
Military planning doctrine sequences receivers by fuel state (weakest/most critical aircraft refuels first). This is not currently visible anywhere in ForeFlight Dispatch. This prototype makes the sequence number explicit in the receiver table and sorts accordingly, prompting interviewees to confirm or challenge this model.

**5. "AR Event" terminology, not "AR Session" (synthesis-07)**  
A specific terminology correction emerged from the most recent discovery session: "session" is not standard Air Force vocabulary; "event" is. The prototype uses "AR Event" throughout. Similarly, "offload" is used from the tanker perspective (not "onload" or "target on load"), matching how planners actually speak.

---

## What we deliberately did NOT include in v1

- **Automated performance calculations** — requires performance dataset integration; out of scope for discovery validation (synthesis-05)
- **Diplomatic clearance / routing automation** — 95% of military AAR routes require manual routing due to diplomatic restrictions; solving this is a multi-year infrastructure problem (synthesis-04)
- **AR track waypoint auto-population** — technically complex and ITAR-adjacent; deferred (synthesis-07)
- **TACAN pairing and frequency management** — important for final product but not needed to validate the core mission-planning concept (synthesis-07)
- **Airspeed conversion (IAS/CAS)** — KC-135 vs KC-46 use different airspeed conventions; needs performance team involvement (synthesis-07)
- **Multi-tanker handoffs** — Coronet-class missions involve multiple tanker handoffs; the prototype uses one tanker per mission to keep the interaction surface manageable
- **Export / briefing generation** — the "Briefing Preview" tab is a read-only mockup; actual A5/PDF generation is phase 2 (synthesis-05)

---

## Questions this prototype is asking interviewees

1. **Does the "Mission first, flights second" entry point match how you actually start planning?** Or do you always start from a flight and add the AR context later?

2. **Is Primary / Contingency the right binary, or do you need a third course of action?** If so, what scenario does the third cover that Contingency doesn't?

3. **Is "Fuel on Arrival (estimated)" the right field for the receiver table, or do you work in a different planning metric** (fuel state at contact point, fuel required to divert, etc.)?

4. **Would you use the Briefing Preview as a starting point for the actual A5 briefing document you hand to pilots,** or is the format too different from your current templates?
