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

**Entscheidung vom 2026-07-30 (bewusst vom Nutzer getroffen):** Die
`claude-seo`-Skills (`seo`, `seo-audit`, `seo-technical`, …) dürfen ab jetzt
**automatisch** von Claude Code ausgelöst werden, wenn eine Anweisung im
Prompt oder in dieser CLAUDE.md dazu passt — nicht mehr nur manuell per
`/seo <command> …`. Die vorherige Pflicht, `disable-model-invocation: true`
nach jedem `claude plugin install`/`claude plugin update` manuell in alle
`SKILL.md`-Dateien nachzutragen, **entfällt bewusst** für dieses Plugin.

**Begründung/Abwägung:** Komfort (automatisches Auslösen ohne manuellen
`/seo`-Befehl, z. B. aus einer Standing-Procedure heraus) wurde gegenüber dem
Risiko unkontrolliert startender, ressourcenintensiver Läufe (Crawls über bis
zu 500 Seiten, bis zu 15 parallele Subagents bei `seo-audit`) bewusst
priorisiert. Das Risiko wird nicht ignoriert, sondern durch die
Ankündigungspflicht im nächsten Abschnitt kompensiert.

**Sicherheitsregel — Ankündigungspflicht vor automatischem Start:** Bevor ein
automatisch ausgelöster (nicht explizit per `/seo …` angeforderter)
`claude-seo`-Skill tatsächlich zu laufen beginnt — insbesondere jeder Skill,
der einen mehrseitigen Crawl und/oder mehrere parallele Subagents startet,
wie `seo-audit` — MUSS Claude Code das dem Nutzer vorher kurz ankündigen,
z. B.:

> „Starte jetzt automatisch einen vollständigen SEO-Audit mit bis zu 15
> Agents über bis zu 500 Seiten."

Diese Ankündigung ist knapp zu halten (ein Satz, Umfang/Größenordnung der
Operation nennen), muss aber immer VOR dem eigentlichen Start erfolgen — nie
erst danach oder gar nicht. So läuft nie eine große, ressourcenintensive
Operation unbemerkt im Hintergrund los.

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

## Standard-Stack: Astro

Für neue Projekte aus diesem Template gilt **Astro** als Standard-Framework,
sofern der Kunde/Nutzer nicht ausdrücklich etwas anderes fordert. Begründung:
Astro passt am besten zu Marketing-/Unternehmens-Websites — schnell,
größtenteils statisch, SEO-stark — und nutzt für aufwändige Animationen das
Islands-Pattern als bereits bewährte Lazy-Loading-Lösung (siehe
„Keine eigenmächtigen Qualitäts-Downgrades" oben: dynamischer Import nur auf
der betroffenen Seite/Komponente, statt komplettem Entfernen).

**Ausnahme:** Braucht der Kunde etwas wirklich App-artiges — Login-Bereich,
komplexe Zustandslogik, Kundenportal — wird stattdessen **Next.js/React**
gewählt. Diese Abweichung vom Standard-Stack muss dem Nutzer gegenüber
ausdrücklich benannt werden (kurz erklären, welches App-artige Merkmal die
Abweichung auslöst), nicht stillschweigend erfolgen.

## Pflicht-Selbstcheck vor jeder Überschriften-Outline

Grund: Beide Fehler unten sind in echten Projekten bereits passiert, obwohl
die zugrundeliegenden Regeln schon im `seo-website-rework`-Skill standen —
das Problem war nicht die fehlende Regel, sondern dass sie nicht zuverlässig
angewendet wurde, bevor eine Outline rausging. Deshalb gilt dieser Check ab
sofort für JEDES Projekt aus diesem Template, automatisch, nicht nur auf
Nachfrage.

Bevor du eine H1-H4-Outline zur Freigabe vorlegst, prüfe JEDE einzelne
Überschrift gegen:

1. **Echter Wortlaut statt Slot-Name.** Ist es der tatsächlich geplante
   Wortlaut der Überschrift — NICHT eine Funktionsbeschreibung, ein
   Architektur-Slot-Name oder ein Platzhalter-Label? "Kurzvorstellung +
   Kontakt-Kurzhinweis" ist KEIN gültiger Überschriften-Vorschlag,
   "Friseur & Barber in Regensburg" ist einer. Wenn du selbst nur eine
   Funktion/einen Zweck beschreibst statt eine Formulierung, ist das ein
   Fehler — nachbessern, bevor du postest.
2. **Vollständigkeit fester Mengen.** Wenn eine Section mehrere gleichartige
   Elemente auflistet, die eine feste, bereits bekannte Gesamtmenge bilden
   (z. B. alle Leistungskategorien, alle Standorte, alle
   Teammitglieder-Rollen): sind ALLE Elemente dieser Menge konsistent
   vertreten, auch wenn einzelne davon bewusst kürzer/zurückhaltender
   behandelt werden? Fehlt eines ohne explizite, im Vorfeld begründete
   Entscheidung, ist das ein Fehler — nachbessern, bevor du postest.

Diese zwei Checks sind Teil jeder Outline-Abgabe, nicht optional und nicht
nur auf Nachfrage. Bestätige in jeder Outline-Abgabe kurz explizit, dass
beide Checks durchgeführt wurden.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
