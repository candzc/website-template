# Wbr.Studios hero animation (staged, not wired in)

Extracted from `wbrstudios.zip`, a Google AI Studio Vite/React export
(`metadata.json` present → import rule in the root `CLAUDE.md` applies).
Only the animation itself was taken — the zip also contained a full
prototype app (`AppleNavbar`, `HeroContent`, `EnterpriseShowcase`, calculator
and code-export modals) that was **not** copied here.

## What's here

- `ThreeHeroCanvas.tsx` — the Three.js blob/orb hero animation, copied
  as-is from the export.
- `types.ts` — trimmed down to just `HeroAnimationConfig`, the prop type
  `ThreeHeroCanvas` needs (dropped `layoutMode` and the app-only types
  that lived in the original `types.ts` but aren't used by this
  component).

## Not done yet — needs wiring before use

- No project scaffold exists in this repo yet, so this component isn't
  imported or rendered anywhere.
- Requires the `three` package as a dependency wherever it's used.
- Per the Google AI Studio import rule: font-stack and color tokens still
  need to be checked against whatever project this lands in before
  shipping. If that project is Astro (this template's default stack),
  `ThreeHeroCanvas` is a React component and must be mounted as a
  client island (`client:only="react"` or similar), not used directly in
  `.astro` files.

## Color scheme already matches the "white blob, no blue" requirement

The component's own colors are already Apple-style grayscale, not blue —
no changes needed there:

- Default `colorPalette: 'white-alabaster'` → base color `0xffffff`
  (white), used for the main blob and both satellite orbs.
- Precision rings/nodes: `0x1D1D1F` (near-black).
- Wireframe lattice: `0x86868B` (grey).
- Particles: `0xa0a0a5` (grey).
- Scene fog / backdrop gradient: `0xFBFBFD` / off-white (from `App.tsx`,
  not copied here since it's page-level, not part of the animation).

Suggested config to pass in when wiring this up, to keep it matching the
reference (white blob, no color accents):

```ts
const heroAnimationConfig: HeroAnimationConfig = {
  speed: 0.6,
  roughness: 0.08,
  metalness: 0.05,
  wireframe: false,
  flowAmplitude: 0.4,
  lightIntensity: 1.2,
  refraction: 1.45,
  particleDensity: 0.8,
  showGridLines: true,
  showPrecisionNodes: true,
  colorPalette: 'white-alabaster',
  materialPreset: 'liquid-ceramic',
  shapePreset: 'organic-flow',
  interactiveMouseForce: 0.5,
};
```

The wordmark ("Wbr.Studios™" → solid black, no blue) and eyebrow/CTA
accent colors mentioned earlier are page-level UI, not part of this
animation component, and still need to be handled wherever the actual
site markup lives.
