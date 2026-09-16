# website-template

Diese Datei ist für Claude Code verbindlich. Jede Regel MUSS ausnahmslos
eingehalten werden. Bei Unsicherheit, ob eine Regel greift oder wie sie
umzusetzen ist, MUSS beim Nutzer nachgefragt werden — nie eigenständig
annehmen oder entscheiden.

## Sprache

Claude antwortet und kommentiert im Chat immer auf Deutsch, unabhängig von
der Sprache des Codes oder der Dateien.

## Stack-Wahl

Next.js ist der feste Standard-Stack für alle Projekte — ausnahmslos, auch
bei 3D-Websites (z. B. mit Three.js/React Three Fiber). Keine
Stack-Entscheidung pro Projekt nötig.

## Kein vorschneller Codestart

Bei einem neuen Projekt (Website von Null) NIE mit der Umsetzung/Codierung
beginnen, solange Details zu Aufbau, Design oder Inhalt noch offen sind oder
nicht ausdrücklich mit dem Nutzer abgestimmt wurden. Erst wenn alle
relevanten Punkte besprochen und vom Nutzer bestätigt sind, beginnt die
Umsetzung.

## SEO-Plugin: claude-seo (AgriciDaniel)

Dieses Repo installiert `claude-seo@agricidaniel-claude-seo` als
Claude-Code-Plugin (Marketplace-Quelle und Enabled-Flag stehen in
`.claude/settings.json`, jede frische Session/jeder Klon installiert es
automatisch mit).

Die `claude-seo`-Skills (`seo`, `seo-audit`, `seo-technical`, …) dürfen
automatisch ausgelöst werden, wenn eine Anweisung im Prompt oder in dieser
Datei dazu passt — nicht nur manuell per `/seo <command> …`.

**Ankündigungspflicht:** Bevor ein automatisch ausgelöster (nicht per
`/seo …` angeforderter) `claude-seo`-Skill zu laufen beginnt — insbesondere
jeder Skill mit mehrseitigem Crawl und/oder mehreren parallelen Subagents,
wie `seo-audit` — MUSS Claude Code das dem Nutzer vorher kurz ankündigen,
z. B.:

> „Starte jetzt automatisch einen vollständigen SEO-Audit mit bis zu 15
> Agents über bis zu 500 Seiten."

Knapp halten (ein Satz, Umfang nennen), aber IMMER vor dem Start, nie danach
oder gar nicht.

`claude-seo` läuft außerdem am Ende jedes Projekts automatisch einmal
vollständig durch — weiterhin mit Pflicht-Vorab-Ankündigung.

## Google Fonts / DSGVO-Sicherheitsnetz

Google Fonts NIEMALS live von Google-Servern laden (DSGVO-Risiko durch
IP-Übertragung). Immer `next/font/google` verwenden, damit Fonts beim Build
selbst gehostet werden und keine Laufzeit-Anfragen an Google entstehen.

## Keine eigenmächtigen Qualitäts-Downgrades

Build-Warnungen (Bundle-Größe, Chunk-Size, Performance-Hinweise) dürfen
NIEMALS dazu führen, dass eine Animation, ein 3D-Effekt oder ein visuelles
Feature entfernt, vereinfacht oder durch eine geringerwertige Alternative
ersetzt wird — ohne das vorher explizit mit dem Nutzer abzustimmen.

Stattdessen gilt: Erst Lösungen suchen, die die Qualität erhalten (z. B.
Lazy-Loading, Code-Splitting, dynamischer Import nur auf der betroffenen
Seite/Komponente, statt komplettem Entfernen).

Falls wirklich keine Lösung ohne Qualitätsverlust möglich ist: Die
Kompromisse dem Nutzer konkret vorlegen und auf eine Entscheidung warten —
nicht einfach die einfachste/kleinste Variante eigenständig wählen und als
erledigt melden.

## Pflicht-Selbstcheck vor jeder Überschriften-Outline

Bevor eine H1–H4-Outline zur Freigabe vorgelegt wird, MUSS jede einzelne
Überschrift gegen folgende zwei Punkte geprüft werden:

1. **Echter Wortlaut statt Slot-Name.** Ist es der tatsächlich geplante
   Wortlaut der Überschrift — NICHT eine Funktionsbeschreibung, ein
   Architektur-Slot-Name oder ein Platzhalter-Label? "Kurzvorstellung +
   Kontakt-Kurzhinweis" ist KEIN gültiger Vorschlag, "Friseur & Barber in
   Regensburg" ist einer.
2. **Vollständigkeit fester Mengen.** Wenn eine Section mehrere gleichartige
   Elemente auflistet, die eine feste, bereits bekannte Gesamtmenge bilden
   (z. B. alle Leistungskategorien, alle Standorte, alle
   Teammitglieder-Rollen): sind ALLE Elemente konsistent vertreten? Fehlt
   eines ohne explizite, vorab begründete Entscheidung, ist das ein Fehler —
   nachbessern, bevor die Outline abgegeben wird.

Beide Checks MÜSSEN in jeder Outline-Abgabe kurz explizit bestätigt werden.

## Branches

Vor dem Start neuer Arbeit immer zuerst main aktuell holen
(`git pull origin main`).

Nur bei Experimenten/Redesigns mit unsicherem Ausgang (nicht bei normalen
Fixes oder klar umrissenen Features) vorher einen neuen Branch anlegen
(`git checkout -b <name>`), damit main sauber bleibt, falls das Experiment
verworfen wird. Bei sicheren, klar definierten Änderungen ist direktes
Arbeiten auf main in Ordnung.

## Content- und Build-Regeln (Struktur & Technik)

Wenn Claude selbst Texte/Überschriften für ein Projekt verfasst (nicht
nötig, wenn der Kunde bereits fertige Texte liefert), gelten zusätzlich die
Schreibregeln im Skill `content-regeln`
(`.claude/skills/content-regeln/SKILL.md`) — dieser wird manuell aktiviert.
Diese Datei hier regelt ausschließlich Struktur und Technik.

### SEO-Überschriften

Genau eine H1 pro Seite — keine Ausnahme, keine zweite H1.

### Cookie-Banner

Muss Tracking technisch blockieren, bis die Einwilligung erteilt ist — nicht
nur optisch vorhanden sein.

Kategorien Notwendig, Statistik und Marketing werden grundsätzlich alle als
eigene, einzeln auswählbare Kategorie angelegt — auch wenn eine Kategorie im
aktuellen Projekt (noch) leer ist. Ablehnen genauso einfach erreichbar wie
Zustimmen — ein Klick, kein Dark Pattern.

### Performance

Core-Web-Vitals-Zielwerte: LCP ≤ 2,5s, INP ≤ 200ms, CLS ≤ 0,1. Das erste
Bild oberhalb des sichtbaren Bereichs (meist LCP-Element) nie lazy laden.

### Motion

Jede Animation braucht einen Fallback für prefers-reduced-motion.

### Vor Livegang

Kein Platzhaltertext (Lorem Ipsum), keine Test-Einträge oder Dummy-Daten
dürfen live gehen. Eigene 404-Seite mit Navigation, Favicon generiert,
Open-Graph-/Twitter-Card-Bild gesetzt, kein Mixed Content.

### Formulare

Formulare zeigen dem Nutzer nach dem Absenden immer ein klares Feedback: bei
Erfolg eine Bestätigung (Weiterleitung zur Danke-Seite), bei Fehler (z. B.
Pflichtfeld fehlt, ungültiges Format) eine konkrete, verständliche
Fehlermeldung direkt am betroffenen Feld — nie ein stilles Fehlschlagen ohne
Rückmeldung.

Vor Livegang sicherheitsgeprüft (Validierung, Spam-Schutz), nicht nur
funktional getestet.

### Interne Verlinkung

7 Links im Fließtext pro Seite, verteilt über die Seite. Zusätzlich zur
normalen Navigation erhält jede Unterseite eine Rückverlinkung zur
Startseite im Fließtext. Keine Orphan Pages. Jede wichtige Seite maximal 3
Klicks von der Startseite entfernt. Pillar-Pages werden häufiger von
Unterseiten verlinkt.

### Title Tag

50–60 Zeichen (bzw. ca. 580px Breite), Hauptkeyword weit vorne, Marke am
Ende, kein Duplikat zu anderen Seiten.

### Meta Description

Kernbotschaft in den ersten ca. 105 Zeichen, Hauptkeyword der Seite
enthalten.

### URL-Struktur

Kurz, sprechend, Kleinschreibung, Bindestriche als Trenner, keine
Umlaute/Sonderzeichen, keine Wortwiederholungen, keine Datumsangaben.

### Semantisches HTML5

Konsequente Nutzung von `<main>`, `<article>`, `<section>`, `<nav>` statt
gestylter `<div>`-Container; echte `<table>`, `<ul>`, `<ol>` statt
CSS-Nachbauten.

### Maschinenlesbarkeit

Hauptinhalt muss auch ohne JavaScript im HTML sichtbar sein — kein
kritischer Content, der erst nach Klick/Interaktion lädt.

### JSON-LD

Strukturierte Daten ausschließlich als JSON-LD, passendes Basis-Schema
(Organization/LocalBusiness, WebSite, BreadcrumbList) einbinden.

### NAP-Konsistenz

Name, Adresse, Telefonnummer überall auf der Website zeichengenau
identisch.

### Featured Snippets — technisch

robots-meta ohne Einschränkung setzen (kein nosnippet, kein
data-nosnippet, kein zu kurzes max-snippet — max-snippet:-1,
max-image-preview:large, max-video-preview:-1). Antworttext ohne
JavaScript im HTML sichtbar (siehe Maschinenlesbarkeit).

### H3-Regel

H3 nur verwenden, wenn eine H2 mindestens zwei gleichrangige Unterpunkte
hat — nie eine einzelne H3 unter einer H2.

### KI-Crawler und Suchmaschinen-Crawler

robots.txt erlaubt ausnahmslos allen Crawlern (GPTBot, ClaudeBot,
PerplexityBot, OAI-SearchBot, Google-Extended etc.) den Zugriff — keine
Blockierung, maximale Sichtbarkeit ist das Ziel. Kein globales
Disallow: /, CSS/JS-Dateien nie blockieren, Sitemap-Pfad referenzieren.

### Schema-Entitäten

Eindeutige @id vergeben, sameAs zu relevanten Profilen (LinkedIn,
Branchenverzeichnisse) setzen. AggregateRating nur mit echten, sichtbaren
Bewertungen. Passender LocalBusiness-Subtyp statt generischem Typ
verwenden. Service-Schema für Leistungsseiten, JobPosting für
Stellenanzeigen.

### Kein Cloaking

Nie unterschiedliche Inhalte für Bots und Nutzer ausliefern.

### Barrierefreiheit

Bei Bedarf (v. a. bei E-Commerce-Funktion) Zielstandard WCAG 2.1/2.2 AA.
Ausreichender Kontrast, Tastaturnavigation, sichtbare Fokuszustände,
ARIA-Labels wo nötig.

### Lizenzen

Bilder ausschließlich aus bekannten, kommerziell freien Quellen (Unsplash,
Pexels, Nano Banana) verwenden — deren Standardlizenz deckt kommerzielle
Nutzung ab. Bilder aus unbekannter Quelle, von Referenzseiten oder aus der
Google-Bildersuche NIE übernehmen, auch nicht übergangsweise — bei
Unsicherheit beim Nutzer nachfragen. Google Fonts sind bereits über
Self-Hosting abgedeckt (siehe Google Fonts / DSGVO-Sicherheitsnetz).

### URL-Kanonisierung

Einheitlicher Canonical-Redirect auf eine Variante (www oder non-www,
immer HTTPS).

### Canonical Tag

Jede Seite bekommt einen selbstreferenzierenden Canonical-Tag.

### Redirects

Bei URL-Änderungen immer saubere 301-Weiterleitung setzen, keine
Redirect-Ketten/-Loops.

### Sitemap

Nur indexierbare URLs (keine noindex-, 404- oder Redirect-URLs). Wird bei
jedem Projekt immer erstellt, vor Livegang generiert und eingereicht, und
laufend auf Aktualität geprüft (neue/entfernte Seiten werden nachgezogen).
noindex von Staging vor Produktivsetzung entfernen.

### Bildformat/-technik

WebP oder AVIF, width/height im HTML gesetzt (verhindert Layout-Sprünge),
Lazy Loading nur unterhalb des sichtbaren Bereichs.

### Mobile/Touch

Touch-Elemente mind. 48×48px, Fließtext mind. 16px, korrekter
Viewport-Meta-Tag, keine störenden Interstitials auf Mobilgeräten.

## Analytics

Cloudflare Web Analytics — Standard bei jedem Projekt, immer aktivieren (im
Cloudflare-Dashboard). Cookielos, keine Einwilligung/Cookie-Banner-Eintrag
nötig. Kein Google Analytics (GA4) mehr — Doppel-Tracking wird vermieden.

## Sprungmarken-Navigation

Bei Unterseiten mit mehreren sinnvollen Unterthemen — nur wenn es zum
Design und Seiteninhalt passt, nicht erzwingen: Übersichtsmenü direkt unter
dem Hero einbauen. Klick scrollt sanft (smooth scroll) zur passenden
Section auf derselben Seite, keine neue URL. Aktives Unterthema beim
Scrollen optisch hervorheben (Scroll-Spy).

## Seitenaufbau und Pflichtseiten

### Breadcrumb

Ab der zweiten Ebene (also ab Unterseiten, die selbst wieder Unterseiten
haben, z. B. Leistungen > Leistungsdetail) ist eine Breadcrumb-Navigation
Pflicht. Auf der Startseite und auf Seiten der ersten Ebene nicht nötig.
Technisch als BreadcrumbList (JSON-LD) UND sichtbar im HTML umsetzen, nicht
nur strukturierte Daten ohne sichtbare Breadcrumb.

### Footer — Pflichtinhalt

Navigation (Kurzlinks zu den Hauptseiten), Kontaktdaten, Social-Media-Links
(falls vorhanden), alle Rechtslinks (Impressum, Datenschutzerklärung,
Cookie-Einstellungen).

### Pflichtseiten — dürfen nie fehlen

Diese Seiten MÜSSEN in JEDEM Projekt angelegt und verlinkt werden:

| Seite | Pflichtgrund | Platzierung |
|---|---|---|
| Impressum | § 5 DDG — leicht erkennbar, unmittelbar erreichbar, ständig verfügbar | Footer, jede Seite |
| Datenschutzerklärung | Art. 13/14 DSGVO — nennt alle tatsächlich genutzten Dienste | Footer, jede Seite |
| Cookie-Einstellungen | Widerruf muss so einfach sein wie die Erteilung — dauerhafter Link nötig | Footer, jede Seite |
| 404-Seite | Pflicht in der QA | — |
| Danke-Seite | Eigene URL für Conversion-Tracking | nach Formularabsendung |

Optional je nach Geschäftsmodell zusätzlich: AGB (bei Verkauf),
Widerrufsbelehrung (bei Verbrauchern).

Rechtsseiten nicht auf noindex setzen — ein vollständiges Impressum ist ein
Vertrauenssignal.

## eRecht24-Anbindung (Impressum & Datenschutzerklärung)

Impressum und Datenschutzerklärung werden über eine automatische
eRecht24-Anbindung eingebunden, nicht manuell kopiert. Bei jedem
Projekt-Abschluss und bei jeder Änderung, die die Datenschutzerklärung
betreffen könnte (neue Dienste, neue Tracking-/Analytics-Tools, neue
Formulare, neue Drittanbieter-Einbindungen), MUSS geprüft werden, ob die
eRecht24-Inhalte noch vollständig und aktuell sind. Wird eine Lücke oder
ein Fehler festgestellt, wird der Nutzer aktiv darauf hingewiesen — nie
stillschweigend übergangen.

## Pflicht-Rückfrage bei Unsicherheit

**Rechtliche Themen** = alles, was mit Datenschutz (DSGVO/TTDSG),
Impressumspflicht, Cookie-Einwilligung, Urheberrecht/Lizenzen,
Widerrufsrecht oder AGB zu tun hat.

**Technische Themen** = alles, was die Funktionsfähigkeit, Sicherheit oder
Erreichbarkeit der Website betrifft (z. B. DNS/Domain, Formular-Sicherheit,
Hosting-Konfiguration, Datenverlust-Risiko).

Bei jedem dieser beiden Themenbereiche gilt: Ist nicht eindeutig klar, wie
korrekt vorzugehen ist, wird der Nutzer IMMER vorher gefragt — es wird nie
eigenständig geraten oder eine Annahme getroffen. Im Zweifel gilt: lieber
einmal zu oft nachfragen als zu wenig. Auch bei nur leichter Unsicherheit
wird nachgefragt, statt eigenständig zu entscheiden.

## Pflicht-Abschlussprüfung

Vor Livegang UND am Ende jedes Projekts werden alle rechtlichen und
technischen Pflichtpunkte dieser Datei vollständig durchgeprüft — keine
Ausnahme, kein Überspringen, kein "wird schon passen".

## Performance- und Darstellungsqualität

Nach jedem Build-Schritt aktiv auf folgende Probleme prüfen, nicht nur
dokumentieren, sondern beheben:

**Jank:** Ruckeln beim Scrollen oder bei Animationen, Seite läuft nicht
flüssig. Ursache meist zu teure Animationen (nicht GPU-beschleunigt) oder
blockierender JavaScript-Code während des Scrollens.

**Glitch:** Kurzer visueller Fehler oder Flackern auf dem Bildschirm.
Ursache meist Render-Konflikte oder fehlerhafte CSS-Übergänge.

## Urheberrecht und Rechtsgrundlagen — Code-relevant

### Texte und Code

Texte NIEMALS 1:1 von Referenzseiten oder Wettbewerbern übernehmen — auch
nicht als Platzhalter. Stil-Idee inspirieren lassen ist erlaubt, Kopieren
nicht. Code darf 1:1 übernommen werden (rechtlich unbedenklich, Layout ist
nicht geschützt).

### Bildquellen

Ausschließlich aus Unsplash, Pexels oder Nano Banana. Bilder von
Referenzseiten oder aus der Google-Bildersuche NIE übernehmen, auch nicht
übergangsweise.

### Cookies und Tracking

Rechtsgrundlage ist § 25 TTDSG (Einwilligungspflicht für Cookies/lokale
Speicherung) in Verbindung mit der DSGVO. Kein Tracking-Skript, kein
Drittanbieter-Request (Fonts, Maps, YouTube-Embed, Analytics,
Social-Widgets) darf laden, bevor eine aktive Einwilligung vorliegt —
technisch unterbunden, nicht nur optisch blockiert.

### Formulardaten

Nur die tatsächlich benötigten Felder abfragen (Datenminimierung), keine
Daten an Drittanbieter ohne Nennung in der Datenschutzerklärung senden.
