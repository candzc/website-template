# Abarbeitungsplan SEO

Abhaklisten für alle SEO-Arbeiten. Gliedert sich in fünf Teile, je nach Zeitpunkt.

| Teil | Wann | Gilt für |
|---|---|---|
| 0 | Vor jeder Optimierung | Bestandsseiten und SEO-Retainer |
| 1 | Beim Bau | jedes Website-Projekt |
| 2 | Beim Livegang | jedes Website-Projekt |
| 3 | Bei jeder Änderung an Seiten | jedes Projekt, dauerhaft |
| 4 | Monatlich | nur SEO-Retainer |
| 5 | Laufend | nur SEO-Retainer |

**Verhältnis zum SEO-Workflow-Dokument:** Dieser Plan ist die Abhakliste für die Ausführung. Das SEO-Workflow-Dokument bleibt daneben gültig — es regelt Vertrag, Onboarding, Freigabe-Gates, Reporting-Struktur und Kundenkommunikation. Dieser Plan ersetzt es nicht.

---

## Teil 0 — Baseline sichern, vor jeder Optimierung

Ohne Ausgangswerte lässt sich später kein Erfolg nachweisen. Alle Exporte datiert ablegen.

- [ ] Aktuelle Rankings für alle Ziel-Keywords
- [ ] Organischer Traffic aus GA4, letzte 12 Monate inklusive Saisonalität
- [ ] Top-Seiten nach Traffic und nach Conversions
- [ ] Search Console: Klicks, Impressionen, CTR, Position — 16 Monate exportiert
- [ ] Backlink-Profil gesichert
- [ ] Core Web Vitals aus Felddaten
- [ ] Indexierte Seiten, Crawl-Fehler, Abdeckungsbericht
- [ ] Vollständiger Crawl durchgeführt
- [ ] Wettbewerber identifiziert, die auf dieselben Keywords ranken

**Zusätzlich als Grundlage der Planung:**

- [ ] Keyword-Recherche: Suchvolumen, erreichbare Schwierigkeit, Suchintention
- [ ] Keyword-Map erstellt — eine URL = ein Fokus-Keyword
- [ ] Chancen auf Position 11–20 identifiziert
- [ ] Maßnahmen nach Wirkung und Aufwand priorisiert
- [ ] 30-60-90-Tage-Plan aufgestellt

▸ **Gate:** Baseline gesichert und Roadmap freigegeben

---

## Teil 1 — Basis-SEO beim Bau

Läuft bei **jedem** Produkt mit, auch bei Landingpage und Standard-Website. Der Grund: Nachträglich einbauen heißt Überschriften, URLs und Texte anfassen — also die halbe Seite umbauen.

### Struktur

- [ ] Genau eine H1 pro Seite, Fokus-Keyword im ersten Drittel
- [ ] Überschriftenhierarchie ohne Sprünge (H1 → H2 → H3)
- [ ] H3 nur, wenn eine H2 mindestens zwei gleichrangige Unterpunkte hat
- [ ] Erster Satz unter jeder H2 beantwortet die H2 direkt (Direct Answer)
- [ ] Semantisches HTML5: `main`, `article`, `section`, `nav`
- [ ] Breadcrumb ab der zweiten Ebene

### Seitenkennzeichnung

- [ ] Title je Seite: 50–60 Zeichen, Keyword vorne, Marke hinten, kein Duplikat
- [ ] Meta Description je Seite: Kernbotschaft in den ersten 105 Zeichen, klare Handlungsaufforderung
- [ ] Ein Fokus-Keyword je URL — keine Überschneidung zwischen Seiten (Kannibalisierung)
- [ ] **URL-Benennung geprüft:** kurz, sprechend, kleingeschrieben, Bindestriche, keine Umlaute, keine Wortwiederholung, kein Datum

### Bilder und Medien

- [ ] Alt-Texte 80–125 Zeichen, bildbezogen; leer bei rein dekorativen Bildern
- [ ] Sprechende Dateinamen statt IMG_1234
- [ ] WebP oder AVIF, `width` und `height` gesetzt
- [ ] Lazy Loading nur unterhalb des sichtbaren Bereichs — LCP-Bild nie lazy

### Verlinkung

- [ ] 3–5 interne Links im Fließtext je Seite (Navigation und Footer zählen nicht)
- [ ] Beschreibende Ankertexte, kein „hier klicken"
- [ ] Keine verwaiste Seite ohne eingehenden internen Link
- [ ] Jede wichtige Seite maximal drei Klicks von der Startseite entfernt

### Technik

- [ ] Selbstreferenzierender Canonical auf jeder Seite
- [ ] JSON-LD: Organization oder passender LocalBusiness-Subtyp, WebSite, BreadcrumbList
- [ ] Service-Schema auf Leistungsseiten
- [ ] NAP im Schema zeichengenau identisch mit Website-Text und Google-Profil
- [ ] Kein FAQPage-Schema (seit Mai 2026 ohne Wirkung)
- [ ] Hauptinhalt ohne JavaScript im HTML sichtbar
- [ ] Core Web Vitals: LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1
- [ ] Touch-Ziele mindestens 48 × 48 px, Fließtext mindestens 16 px

---

## Teil 2 — SEO beim Livegang

Die Reihenfolge ist wichtig: Ohne Punkt 1 und 2 ist alles Weitere wirkungslos.

- [ ] **Staging-noindex entfernt** — der häufigste und teuerste Einzelfehler
- [ ] robots.txt für Produktion: kein globales `Disallow: /`, CSS und JS nicht blockiert
- [ ] Sitemap-Pfad in der robots.txt referenziert
- [ ] KI-Crawler bewusst entschieden (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended) — erlaubt oder blockiert, aber als Entscheidung
- [ ] XML-Sitemap erzeugt: nur indexierbare URLs, keine noindex-, 404- oder Redirect-URLs
- [ ] Google Search Console: Property angelegt und bestätigt
- [ ] Sitemap in der Search Console eingereicht
- [ ] **Indexierung angefordert** für Startseite und die wichtigsten Unterseiten
- [ ] Bei Relaunch: alle alten URLs per 301 weitergeleitet, Redirect-Liste dokumentiert
- [ ] Canonical-Redirect einheitlich (www oder ohne www, immer HTTPS)
- [ ] Rechtsseiten **nicht** auf noindex — Impressum ist ein Vertrauenssignal

### Nachkontrolle nach 3 und nach 14 Tagen

- [ ] Search Console, Seitenindexierung: Sind die wichtigen Seiten indexiert?
- [ ] Gibt es „Gefunden, zurzeit nicht indexiert" oder „Gecrawlt, zurzeit nicht indexiert"? → Ursache klären
- [ ] Neue 404-Fehler im Bericht?
- [ ] Sitemap-Status: erfolgreich verarbeitet, Anzahl entdeckter URLs plausibel?

---

## Teil 3 — Änderungs-Nachprüfung

**Wann anwenden:** Immer wenn sich an einer bestehenden Website etwas an der Seitenstruktur ändert — neue Unterseite, gelöschte Unterseite, geänderte URL, umbenannte Seite, umgebaute Navigation.

Dauer etwa 15 Minuten. Ohne diesen Check verliert man genau die Rankings, die vorher aufgebaut wurden.

### Bei geänderter oder gelöschter URL

- [ ] 301-Weiterleitung von alt auf neu gesetzt
- [ ] Keine Weiterleitungskette entstanden (alt → mittel → neu)
- [ ] Alte URL gibt tatsächlich 301 zurück, nicht 302 und nicht 404

### Immer prüfen

- [ ] **Sitemap** neu erzeugt und in der Search Console neu eingereicht
- [ ] **Interne Links** durchsucht: Zeigt noch irgendwo ein Link auf die alte URL?
- [ ] **Canonical** der neuen Seite zeigt auf sich selbst
- [ ] **Schema** geprüft: BreadcrumbList stimmt, `@id`-Verweise laufen nicht ins Leere
- [ ] **Navigation und Footer** aktualisiert
- [ ] **Fokus-Keyword** der neuen Seite überschneidet sich mit keiner bestehenden Seite
- [ ] Kein verwaister Zustand: Die neue Seite ist intern verlinkt
- [ ] Indexierung für die neue URL angefordert
- [ ] Search Console nach 7 Tagen: neue 404 im Abdeckungsbericht?

### Zusätzlich bei größeren Umbauten

- [ ] Vollständiger Crawl vorher und nachher, Ergebnisse vergleichen
- [ ] Core Web Vitals erneut gemessen
- [ ] Lesbarkeit und Textstruktur der geänderten Seiten erneut geprüft
- [ ] Strukturierte Daten mit dem Rich Results Test validiert

---

## Teil 4 — Monatlicher SEO-Retainer

### Search Console auswerten

- [ ] Klicks, Impressionen, CTR, durchschnittliche Position gegen Vormonat
- [ ] Seiten mit hohen Impressionen und niedriger CTR → Title und Description nachschärfen
- [ ] **Positionen 11–20 identifizieren** — dort liegt das schnellste Potenzial
- [ ] Abdeckungsbericht auf neue Fehler
- [ ] **Indexierungsstatus:** Sind alle wichtigen Seiten weiterhin drin?
- [ ] Neue Suchanfragen, die vorher nicht auftauchten

### Technik

- [ ] Crawl durchführen, neue Fehler beheben
- [ ] Core Web Vitals aus Felddaten (nicht Labordaten)
- [ ] Strukturierte Daten weiterhin fehlerfrei

### Inhalte

- [ ] Content-Update oder neuer Beitrag laut Redaktionsplan
- [ ] Bestehende Seiten auf veraltete Angaben prüfen
- [ ] Bei Aktualisierung: Änderungsdatum sichtbar setzen

### Lokal

- [ ] Google-Unternehmensprofil: Öffnungszeiten, Leistungen, Fotos aktuell
- [ ] Neue Bewertungen beantwortet
- [ ] NAP-Konsistenz stichprobenartig geprüft

### Offpage

- [ ] Backlink-Profil auf neue Links geprüft
- [ ] Auffällige oder schädliche Links notiert (Umgang siehe Teil 5)

### Report

- [ ] Kurzfassung: Erfolge, geleistete Arbeit, nächste Schritte
- [ ] Zahlen gegen Ausgangswerte
- [ ] Was nicht funktioniert hat und was geändert wird
- [ ] Planung Folgemonat

---

## Teil 5 — Offpage und Linkaufbau

### 5.1 Citations und Verzeichnisse

Für lokale Betriebe der stärkste Hebel. Vollkommen unproblematisch.

- [ ] Google-Unternehmensprofil vollständig
- [ ] Bing Places
- [ ] Handwerkskammer, Innung, IHK, Berufsverband
- [ ] Gelbe Seiten, Das Örtliche, 11880
- [ ] ProvenExpert, Yelp
- [ ] Branchenspezifische Verzeichnisse
- [ ] Lieferanten- und Partnerseiten („Autorisierter Fachbetrieb")
- [ ] Lokale Vereine und Sponsoring
- [ ] Lokale Presse und Stadtportale

**Pflichtregel:** NAP zeichengenau identisch. „Str." gegen „Straße" oder eine Telefonnummer einmal mit und einmal ohne Vorwahl reicht bereits, um die lokale Zuordnung zu schwächen.

### 5.2 Umgang mit schädlichen Backlinks — Disavow-Tool

Das Werkzeug heißt **Disavow-Tool**, in der deutschen Search Console „Tool zum Entwerten von Links". Nicht zu verwechseln mit `Disallow` in der robots.txt — das steuert das Crawlen, nicht Links.

- [ ] Backlink-Profil regelmäßig sichten
- [ ] Auffällige Muster notieren: plötzliche Linkflut, thematisch völlig fremde Seiten, immer derselbe exakte Ankertext
- [ ] Entscheidung dokumentieren: entwerten oder beobachten

**Wichtig:** Google ignoriert schlechte Links in der Regel von selbst. Das Disavow-Tool ist gedacht für zwei Fälle — eine erhaltene manuelle Maßnahme, oder ein erkennbarer Angriff. Vorsorglich zu entwerten kann eigene gute Links kappen und bringt nichts.

### 5.3 Aktiver Linkaufbau — Entscheidung je Projekt

Diese Möglichkeiten stehen zur Verfügung. Ob eingesetzt wird, entscheidest du pro Projekt und dokumentierst es hier.

| Möglichkeit | Eingesetzt | Notiz |
|---|---|---|
| Digital PR / lokale Presse | ja / nein | |
| Verbands- und Kammerprofile | ja / nein | |
| Sponsoring mit Verlinkung | ja / nein | |
| Partner- und Lieferantenseiten | ja / nein | |
| Gastbeiträge in Fachmedien | ja / nein | |
| Expired Domains | ja / nein | |
| Gekaufte Backlinks (z. B. über Fiverr) | ja / nein | |
| Google Stacking | ja / nein | |
| Citations-Dienstleister | ja / nein | |
| Standortseiten (bei mehreren Standorten) | ja / nein | Nur mit echtem eigenem Inhalt je Ort — Sections: Header/Hero mit Ort in H1, Leistungen am Standort, Ortsbezug, Anfahrt, Ansprechpartner vor Ort, Referenzen aus der Region, CTA. Warnung: ausgetauschte Ortsnamen ohne echten Inhalt sind erkennbares Spam-Muster und schaden mehr, als sie nützen. |

Zur Einordnung der unteren vier Zeilen siehe Lexikon-Einträge „Expired Domain", „Linkkauf", „Google Stacking" und „Manuelle Maßnahme".

---

## Teil 6 — Was der Kunde liefern muss

Punkte, die nicht in deinem Zugriff liegen und im Onboarding geklärt werden:

- [ ] Rechte für Search Console, Analytics und Google-Unternehmensprofil
- [ ] Freigabe für Texte, Preisangaben und rechtlich relevante Aussagen
- [ ] Echte Projektdaten und Nachweise für E-E-A-T
- [ ] Bestätigung harter Fakten (Gründungsjahr, Zertifikate, Bewertungen)
- [ ] Entscheidungen zu Seitenlöschung und Zusammenführung
- [ ] Freigabe von Referenzen und Kundennamen
