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

## SEO plugin: claude-seo (AgriciDaniel)

This repo installs `claude-seo@agricidaniel-claude-seo` as a proper Claude Code
plugin (not loose vendored skill files). Both the marketplace source and the
enabled-plugin flag are declared in `.claude/settings.json`, so any fresh
session/clone of this repo auto-fetches and installs it the same way.

All 25 of its sub-skills (`seo`, `seo-audit`, `seo-technical`, …) must carry
`disable-model-invocation: true` in their `SKILL.md` frontmatter, so the model
never auto-triggers them from a description match — they are reachable only
explicitly via `/seo <command> …`.

**Important caveat:** the upstream repo does NOT ship this flag by default.
It has to be patched into the installed plugin's `SKILL.md` files after every
`claude plugin install`/`claude plugin update` of `claude-seo`, because that
patch lives in the local plugin cache (outside this repo, outside version
control) and gets overwritten by a fresh pull from upstream. After installing
or updating this plugin, add `disable-model-invocation: true` under the
`name:` line of every `skills/*/SKILL.md` file in the installed plugin
directory before relying on it — check with:

```
grep -L "^disable-model-invocation: true" <plugin-install-path>/skills/*/SKILL.md
```

Any file listed there still needs the line added.

## Import-Regel: Google AI Studio Exporte

Wenn eine ZIP-Datei aus Google AI Studio importiert wird (Vite/React-Scaffold,
erkennbar an `metadata.json`): Font-Stack und Design-Tokens IMMER gegen das
Projekt-Standard (next/font/google-Setup, bestehende Farbwerte) abgleichen,
nicht ungeprüft übernehmen. Enthaltene Komponenten (Three.js, Framer Motion
o.ä.) dürfen übernommen werden, aber nur nach Anpassung an den bestehenden
Font/Design-Standard.

## Google Fonts / DSGVO-Sicherheitsnetz

Google Fonts NIEMALS live von Google-Servern laden (DSGVO-Risiko durch
IP-Übertragung). Immer `next/font/google` verwenden, damit Fonts beim Build
selbst gehostet werden und keine Laufzeit-Anfragen an Google entstehen.

## Platzhalterbilder: Pexels-API

Solange keine echte Foto- oder KI-Bildgenerierung für ein Projekt verfügbar
ist, dürfen Platzhalterbilder über die kostenlose Pexels-API eingebunden
werden (Key liegt als `PEXELS_API_KEY` vor).

Jedes so eingebundene Bild muss sichtbar als Platzhalter markiert sein:
- ein Kommentar direkt an der Einbindungsstelle im Code, der auf Pexels als
  Quelle und den Platzhalter-Charakter hinweist, und
- ein Dateiname-Präfix `placeholder-` für lokal gespeicherte/heruntergeladene
  Bilddateien.

Sobald echtes Bildmaterial (Fotos oder KI-Generierung) verfügbar ist, müssen
die Pexels-Platzhalter ersetzt werden — sie sind nicht für den produktiven
Einsatz gedacht.

## Keine eigenmächtigen Qualitäts-Downgrades

Build-Warnungen (Bundle-Größe, Chunk-Size, Performance-Hinweise) dürfen
NIEMALS dazu führen, dass eine Animation, ein 3D-Effekt oder ein
visuelles Feature entfernt, vereinfacht oder durch eine geringerwertige
Alternative ersetzt wird — ohne das vorher explizit mit dem Nutzer
abzustimmen.

Stattdessen gilt: Erst Lösungen suchen, die die Qualität erhalten
(z. B. Lazy-Loading, Code-Splitting, dynamischer Import nur auf der
betroffenen Seite/Komponente, statt komplettem Entfernen).

Falls wirklich keine Lösung ohne Qualitätsverlust möglich ist: Die
Kompromisse dem Nutzer konkret vorlegen und auf eine Entscheidung warten
— nicht einfach die einfachste/kleinste Variante eigenständig wählen
und als erledigt melden.
