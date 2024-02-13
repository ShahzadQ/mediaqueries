export type CSSAbsoluteLengthUnits = 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt' | 'px';
export type CSSRelativeLengthUnits =
  | 'em'
  | 'ex'
  | 'ch'
  | 'rem'
  | 'lh'
  | 'rlh'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | 'vb'
  | 'vi'
  | 'svw'
  | 'svh'
  | 'lvw'
  | 'lvh'
  | 'dvw'
  | 'dvh';
export type CSSLengthUnits = CSSAbsoluteLengthUnits | CSSRelativeLengthUnits;

export type CSSResolutionUnits = 'dpi' | 'dpcm' | 'dppx' | 'x';

type UnitInput<U extends CSSResolutionUnits | CSSLengthUnits> = string | number | { value: number; units: U };

export interface MediaFeatures {
  width: UnitInput<CSSLengthUnits>;
  minWidth: UnitInput<CSSLengthUnits>;
  maxWidth: UnitInput<CSSLengthUnits>;
  orientation: 'landscape' | 'portrait';
  anyHover: 'none' | 'hover';
  anyPointer: 'none' | 'coarse' | 'fine';
  aspectRatio: string;
  minAspectRatio: string;
  maxAspectRatio: string;
  color: number;
  minColor: number;
  maxColor: number;
  colorGamut: 'srgb' | 'p3' | 'rec2020';
  colorIndex: number;
  minColorIndex: number;
  maxColorIndex: number;
  displayMode: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser' | 'window-controls-overlay';
  dynamicRange: 'standard' | 'high';
  forcedColors: 'none' | 'active';
  grid: '0' | '1';
  height: UnitInput<CSSLengthUnits>;
  minHeight: UnitInput<CSSLengthUnits>;
  maxHeight: UnitInput<CSSLengthUnits>;
  hover: 'none' | 'hover';
  invertedColors: 'none' | 'inverted';
  monochrome: number;
  minMonochrone: number;
  maxMonochrone: number;
  overflowBlock: 'none' | 'scroll' | 'optional-paged' | 'paged';
  overflowInline: 'none' | 'scroll';
  pointer: 'none' | 'coarse' | 'fine';
  prefersColorScheme: 'light' | 'dark';
  prefersContrast: 'no-preference' | 'more' | 'less' | 'custom';
  prefersReducedMotion: 'no-preference' | 'reduce';
  resolution: UnitInput<CSSResolutionUnits>;
  minResolution: UnitInput<CSSResolutionUnits>;
  maxResolution: UnitInput<CSSResolutionUnits>;
  scan: 'interlace' | 'progressive';
  scripting: 'none' | 'initial-only' | 'enabled';
  update: 'none' | 'slow' | 'fast';
  videoDynamicRange: 'standard' | 'high';
}

export type MediaOrOperator = 'or';
export type MediaAndOperator = 'and';
export type MediaNotOperator = 'not';
export type MediaOnlyOperator = 'only';
export type MediaOperator = MediaOrOperator | MediaAndOperator | MediaNotOperator | MediaOnlyOperator;

export type MediaTypeBasicVariants = 'screen' | 'print' | 'all';
export type MediaTypeExpandedVariants =
  | MediaTypeBasicVariants
  | `only ${MediaTypeBasicVariants}`
  | `not ${MediaTypeBasicVariants}`;
export type MediaType = Record<'type', MediaTypeBasicVariants[] | MediaTypeExpandedVariants>;
