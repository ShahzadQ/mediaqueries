import type { XOR } from 'ts-xor';

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

type UnitInput = string | number;
type ExpandableUnitInput = UnitInput | { value: number; units: CSSLengthUnits };

export interface MediaQueries {
  width: ExpandableUnitInput;
  minWidth: ExpandableUnitInput;
  maxWidth: ExpandableUnitInput;
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
  height: ExpandableUnitInput;
  minHeight: ExpandableUnitInput;
  maxHeight: ExpandableUnitInput;
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
  resolution: UnitInput;
  minResolution: UnitInput;
  maxResolution: UnitInput;
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

export type MediaType = 'screen' | 'print' | 'all';
export type MediaTypeValue<T extends MediaType> = Record<T, MediaOnlyOperator | boolean>;
export type MediaTypes = XOR<MediaTypeValue<'all'>, MediaTypeValue<'screen'>, MediaTypeValue<'print'>>;
