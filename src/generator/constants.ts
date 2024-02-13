import type { MediaTypes } from '@/types';

export const _mediaTypes: Extract<MediaTypes['type'], string>[] = [
  'screen',
  'print',
  'all',
  'only screen',
  'only print',
  'only all',
  'not all',
  'not print',
  'not screen'
];
