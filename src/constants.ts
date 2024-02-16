import type { CSSUnits, MediaFeatures } from './types';

export const defaultUnits: Readonly<Partial<Record<keyof MediaFeatures, CSSUnits>>> = {
  width: 'px',
  minWidth: 'px',
  maxWidth: 'px',
  height: 'px',
  minHeight: 'px',
  maxHeight: 'px',
  resolution: 'dpi',
  minResolution: 'dpi',
  maxResolution: 'dpi'
};
