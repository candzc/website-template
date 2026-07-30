# Emil-Kowalski-Skills (Gruppierung)

Diese fünf Top-Level-Ordner unter `.claude/skills/` stammen alle aus
[`emilkowalski/skills`](https://github.com/emilkowalski/skills):

- `animation-vocabulary`
- `improve-animations`
- `find-animation-opportunities`
- `review-animations`
- `emil-design-eng`

Sie liegen bewusst weiterhin einzeln auf oberster Ebene (nicht unter einem
gemeinsamen `emil-kowalski/`-Unterordner), weil der Skill-Loader von
Claude Code `.claude/skills/` nur eine Ebene tief scannt: Er listet die
unmittelbaren Unterordner und sucht darin direkt nach `SKILL.md`, ohne
weiter zu rekursieren. Ein verschachtelter Pfad wie
`.claude/skills/emil-kowalski/animation-vocabulary/SKILL.md` würde
dadurch beim Scannen von `emil-kowalski/` nach einer (nicht existierenden)
`.claude/skills/emil-kowalski/SKILL.md` suchen, den Fehler dabei still
verwerfen und den Skill kommentarlos aus der Liste fallen lassen.

Diese Datei ist rein organisatorisch (kein `SKILL.md`, wird vom Loader
ignoriert) und dient nur als Nachschlagehilfe für Menschen, die eine
gemeinsame Herkunft erwarten.
