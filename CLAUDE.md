# website-template

## Sprache

Claude antwortet und kommentiert im Chat immer auf Deutsch, unabhängig von der Sprache des Codes oder der Dateien.

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

`claude-seo` soll außerdem am Ende jedes Projekts automatisch einmal
vollständig durchlaufen — weiterhin mit der oben genannten
Pflicht-Vorab-Ankündigung vor dem Start.

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

## Stack-Wahl: Astro oder Next.js

Kein festgelegter Standard-Stack. Claude entscheidet pro Projekt, ob Astro
oder Next.js besser passt, und begründet kurz die Wahl.

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

## Branches

Vor dem Start neuer Arbeit immer zuerst main aktuell holen (`git pull origin main`).

Nur bei Experimenten/Redesigns mit unsicherem Ausgang (nicht bei normalen Fixes oder klar umrissenen Features) vorher einen neuen Branch anlegen (`git checkout -b <name>`), damit main sauber bleibt, falls das Experiment verworfen wird. Bei sicheren, klar definierten Änderungen ist direktes Arbeiten auf main in Ordnung.

## Installationen

Niemals automatisch Plugins installieren oder Installer-Skripte ausführen (`curl | bash`, `/plugin marketplace add`, `uv tool install` o.ä.), ohne vorher zu fragen. Neue Skills nur als reine Datei unter `.claude/skills/<name>/SKILL.md` ablegen — keine Hooks, keine globalen Config-Änderungen ohne ausdrückliche Zustimmung.

## Content- und Build-Regeln

**Bilder:** Keine Menschen und keine sichtbaren Marken/Logos auf verwendeten Bildern (unabhängig von der Quelle). Stattdessen Texturen, Architektur, abstrakte Formen, Natur oder Stimmungsbilder passend zur Branche wählen.

**SEO-Überschriften:** Genau eine H1 pro Seite. Direct-Answer-Prinzip: Der erste Satz direkt unter jeder H2 beantwortet die H2 unmittelbar und präzise. Keine Platzhalter-Überschriften wie "Unsere Vorteile" oder "Kundennutzen" — echte, aussagekräftige Formulierungen.

**Textstil:** Durchgehend positiv formulieren, Negationen ("nicht", "kein", "ohne") vermeiden wo möglich. Kein KI-Sprech: Floskeln wie "in der heutigen digitalen Welt" oder künstliche Dreiergruppen wie "schnell, sicher und zuverlässig" sind zu vermeiden.

**Cookie-Banner:** Muss Tracking technisch blockieren, bis die Einwilligung erteilt ist — nicht nur optisch vorhanden sein.

**Alt-Texte:** 80–125 Zeichen, präzise und bildbezogen. Bei rein dekorativen Bildern leerer Alt-Text.

**Performance:** Core-Web-Vitals-Zielwerte: LCP ≤ 2,5s, INP ≤ 200ms, CLS ≤ 0,1. Das erste Bild oberhalb des sichtbaren Bereichs (meist LCP-Element) nie lazy laden.

**Motion:** Jede Animation braucht einen Fallback für prefers-reduced-motion.

**Vor Livegang:** Kein Platzhaltertext (Lorem Ipsum), keine Test-Einträge oder Dummy-Daten dürfen live gehen. Eigene 404-Seite mit Navigation, Favicon generiert, Open-Graph-/Twitter-Card-Bild gesetzt, kein Mixed Content.

**Interne Verlinkung:** 3–5 Links im Fließtext pro Seite, verteilt über die Seite. Keine generischen Ankertexte wie "hier klicken" oder "mehr erfahren" — der Linktext beschreibt, was auf der Zielseite erwartet. Keine Orphan Pages. Jede wichtige Seite maximal 3 Klicks von der Startseite entfernt. Pillar-Pages werden häufiger von Unterseiten verlinkt.

**Title Tag:** 50–60 Zeichen (bzw. ca. 580px Breite), Hauptkeyword weit vorne, Marke am Ende, kein Duplikat zu anderen Seiten.

**Meta Description:** Kernbotschaft in den ersten ~105 Zeichen, klarer Nutzen + konkrete Handlungsaufforderung (nicht "hier klicken" oder "entdecken", sondern z. B. "Jetzt Angebot anfordern").

**URL-Struktur:** kurz, sprechend, Kleinschreibung, Bindestriche als Trenner, keine Umlaute/Sonderzeichen, keine Wortwiederholungen, keine Datumsangaben.

**Semantisches HTML5:** konsequente Nutzung von `<main>`, `<article>`, `<section>`, `<nav>` statt gestylter `<div>`-Container; echte `<table>`, `<ul>`, `<ol>` statt CSS-Nachbauten.

**Maschinenlesbarkeit:** Hauptinhalt muss auch ohne JavaScript im HTML sichtbar sein — kein kritischer Content, der erst nach Klick/Interaktion lädt.

**Keine Dopplung:** kein Satz darf wortgleich oder nahezu wortgleich auf mehreren Seiten derselben Website stehen (v. a. Startseite vs. Unterseiten).

**JSON-LD:** strukturierte Daten ausschließlich als JSON-LD, passendes Basis-Schema (Organization/LocalBusiness, WebSite, BreadcrumbList) einbinden. Kein FAQPage-Schema mehr anlegen (seit Mai 2026 ohne Rich-Result-Wirkung).

**NAP-Konsistenz:** Name, Adresse, Telefonnummer überall auf der Website zeichengenau identisch.

**Snippet-fähige Struktur:** Antwortabsätze (40–60 Wörter) direkt unter der passenden Überschrift für Featured Snippets/KI-Zitate.

**H3-Regel:** H3 nur verwenden, wenn eine H2 mindestens zwei gleichrangige Unterpunkte hat — nie eine einzelne H3 unter einer H2.

**Mehrsprachigkeit (falls relevant):** hreflang mit Rückverlinkung auf alle Sprachversionen inkl. sich selbst, x-default definiert, Subdirectories (/de/, /en/) bevorzugt, jede Sprachversion eigener Canonical auf sich selbst, keine automatische IP-Weiterleitung (nur Banner/Hinweis), lokalisieren statt nur übersetzen.

**KI-Crawler:** In robots.txt gezielt steuern, welche KI-Crawler (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended) erlaubt oder blockiert werden — bewusste Entscheidung, kein Versehen.

**Schema-Entitäten:** Eindeutige @id vergeben, sameAs zu relevanten Profilen (LinkedIn, Branchenverzeichnisse) setzen. AggregateRating nur mit echten, sichtbaren Bewertungen. Passender LocalBusiness-Subtyp statt generischem Typ verwenden. Service-Schema für Leistungsseiten, JobPosting für Stellenanzeigen.

**Kein Cloaking:** Nie unterschiedliche Inhalte für Bots und Nutzer ausliefern.

**PAA-Ergänzung:** Passende "People also ask"-Fragen als zusätzliche H2/H3 in bestehende Seiten einbauen, statt neue dünne Seiten dafür anzulegen.

**Aktualität:** Veröffentlichungs-/Änderungsdatum sichtbar auf der Seite platzieren, wo relevant.

**Formulare:** Vor Livegang sicherheitsgeprüft (Validierung, Spam-Schutz), nicht nur funktional getestet.

**Domain-/DNS-Änderungen:** E-Mail-Records (MX, SPF, DKIM, DMARC) mitprüfen, nicht nur Website-Records — sonst droht E-Mail-Ausfall.

**Barrierefreiheit:** Bei Bedarf (v. a. bei E-Commerce-Funktion) Zielstandard WCAG 2.1/2.2 AA. Ausreichender Kontrast, Tastaturnavigation, sichtbare Fokuszustände, ARIA-Labels wo nötig.

**Lizenzen:** Bild- und Schriftlizenzen auf kommerzielle Nutzung geprüft und dokumentiert.

**URL-Kanonisierung:** Einheitlicher Canonical-Redirect auf eine Variante (www oder non-www, immer HTTPS).

**robots.txt:** kein globales Disallow: /, CSS/JS-Dateien nie blockieren, Sitemap-Pfad referenzieren.

**Canonical Tag:** jede Seite bekommt einen selbstreferenzierenden Canonical-Tag.

**Redirects:** bei URL-Änderungen immer saubere 301-Weiterleitung setzen, keine Redirect-Ketten/-Loops.

**Sitemap:** nur indexierbare URLs (keine noindex-, 404- oder Redirect-URLs), vor Livegang generiert und eingereicht. noindex von Staging vor Produktivsetzung entfernen.

**Bildformat/-technik:** WebP oder AVIF, width/height im HTML gesetzt (verhindert Layout-Sprünge), Lazy Loading nur unterhalb des sichtbaren Bereichs.

**Mobile/Touch:** Touch-Elemente mind. 48×48px, Fließtext mind. 16px, korrekter Viewport-Meta-Tag, keine störenden Interstitials auf Mobilgeräten.

**Video:** auf YouTube hosten und einbetten statt selbst zu hosten, Untertitel ergänzen.

**Google Analytics (GA4):** Fällt unter Kategorie "Statistik" im Cookie-Banner, lädt technisch erst nach entsprechender Einwilligung — nicht nur optisch blockiert. Rechtstext dafür liefert eRecht24 (Datenschutzerklärung), die technische Ladesperre ist Aufgabe des Codes.

## Sprungmarken-Navigation

Bei Unterseiten mit mehreren sinnvollen Unterthemen — nur wenn es zum Design und Seiteninhalt passt, nicht erzwingen: Übersichtsmenü direkt unter dem Hero einbauen. Klick scrollt sanft (smooth scroll) zur passenden Section auf derselben Seite, keine neue URL. Aktives Unterthema beim Scrollen optisch hervorheben (Scroll-Spy).

## Performance- und Darstellungsqualität — immer prüfen und beheben

Nach jedem Build-Schritt aktiv auf folgende Probleme prüfen, nicht nur dokumentieren, sondern beheben:

Jank: Ruckeln beim Scrollen oder bei Animationen, Seite läuft nicht flüssig. Ursache meist zu teure Animationen (nicht GPU-beschleunigt) oder blockierender JavaScript-Code während des Scrollens.

Glitch: Kurzer visueller Fehler oder Flackern auf dem Bildschirm. Ursache meist Render-Konflikte oder fehlerhafte CSS-Übergänge.

(CLS-Zielwert ≤0,1 steht bereits weiter oben unter Performance — gilt weiterhin.)

## Urheberrecht und Rechtsgrundlagen — Code-relevant

Texte: Niemals Text, Code oder Bilder von Referenzseiten oder Wettbewerbern 1:1 übernehmen. Stil-Idee inspirieren lassen ist erlaubt, Kopieren nicht — auch nicht bei Platzhaltertexten oder Fallback-Texten (Button-Beschriftungen, Fehlermeldungen).

Bilder: Ausschließlich aus Unsplash, Pexels oder Nano Banana. Keine Bilder von Referenzseiten oder aus Google-Bildersuche übernehmen.

Cookies und Tracking: Rechtsgrundlage ist § 25 TTDSG (Einwilligungspflicht für Cookies/lokale Speicherung) in Verbindung mit der DSGVO (Rechtsgrundlage der Datenverarbeitung selbst). Kein Tracking-Skript, kein Drittanbieter-Request (Google Fonts, Maps, YouTube-Embed, Analytics, Social-Widgets) darf laden, bevor eine aktive Einwilligung vorliegt — nicht nur optisch blockiert, sondern technisch unterbunden.

Cookie-Banner: Mindestens die Kategorien Notwendig, Statistik und Marketing einzeln auswählbar (nicht nur Alles-an/Alles-aus), sofern mehr als eine Kategorie eingesetzt wird. Ablehnen genauso einfach erreichbar wie Zustimmen — ein Klick, kein Dark Pattern.

Formulardaten: Nur die tatsächlich benötigten Felder abfragen (Datenminimierung), keine Daten an Drittanbieter ohne Nennung in der Datenschutzerklärung senden.
