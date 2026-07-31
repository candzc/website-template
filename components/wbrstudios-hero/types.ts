export type MaterialPreset =
  | 'liquid-ceramic'
  | 'satin-silver'
  | 'pearl-glass'
  | 'opal-iridescent'
  | 'obsidian-titanium';

export type ShapePreset =
  | 'organic-flow'
  | 'ribbon-helix'
  | 'quantum-torus'
  | 'monolith-morph'
  | 'lattice-sphere';

export type ColorPalette =
  | 'white-alabaster'
  | 'champagne-gold'
  | 'nordic-sky'
  | 'silver-titanium';

export interface HeroAnimationConfig {
  speed: number;
  roughness: number;
  metalness: number;
  wireframe: boolean;
  flowAmplitude: number;
  lightIntensity: number;
  refraction: number;
  particleDensity: number;
  showGridLines: boolean;
  showPrecisionNodes: boolean;
  colorPalette: ColorPalette;
  materialPreset: MaterialPreset;
  shapePreset: ShapePreset;
  interactiveMouseForce: number;
}
