# website-template

This repository is a template. Every project created from it via "Use this
template" inherits this file, its rules, and the standing procedure below.

## Standing procedure: reference-URL website builds

Whenever a project built from this template names a **reference URL** during
a website build (e.g. "build this like example.com", "use this site as
reference"), run the following chain automatically. Do not ask the user to
re-describe it — this is the default behavior for any reference URL from now
on, in every project derived from this template.

1. **Fetch** — Use the `firecrawl-lean` skill to load the reference page
   (scrape, not just WebFetch, since these are usually JS-heavy marketing
   pages).
2. **Extract design tokens** — Use the `taste-skill` skill on the same URL to
   break the page down into concrete design tokens: colors, typography,
   spacing, radii, shadows, grid.
3. **Observe motion** — Use the Playwright MCP tools to open the same
   reference URL in a real browser. Scroll through the full page and
   interact with it (hover states, menus, load transitions) to observe
   scroll-, hover-, and load-triggered animations: what triggers them, their
   timing/easing, and their character.
4. **Hand off**:
   - Design tokens from step 2 go into Impeccable's `DESIGN.md` (via the
     `impeccable` skill's `document`/setup flow).
   - The observed movement patterns from step 3 become the motion brief for
     step 5 — timing, triggers, and character, not implementation code.
5. **Build motion** — Implement similar, not identical, movement effects,
   held to the Emil Kowalski animation philosophy used by this repo's
   `improve-animations` / `review-animations` skills: restraint by default,
   effects matched to the original's timing and character rather than
   copied wholesale or over-animated.
6. **Verify** — Use Playwright again at the end to check responsive behavior
   across breakpoints and walk the site's main click paths.

This chain applies per reference URL given, not just once per project. If a
project names a new reference mid-build, re-run the chain for that URL.
