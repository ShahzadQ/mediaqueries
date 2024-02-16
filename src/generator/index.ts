import type { MediaOnlyOperator, MediaOperator } from '../types';
import { and, not, or } from './helpers';
import type { MediaQueries, MediaQueriesArray } from './types';

export const mq = (
  param:
    | ((helpers: Record<Exclude<MediaOperator, MediaOnlyOperator>, (...q: MediaQueriesArray) => string>) => string)
    | MediaQueries
) => {
  if (typeof param !== 'function') return and(param);
  return param({ and, or, not });
};

export * from './types';
