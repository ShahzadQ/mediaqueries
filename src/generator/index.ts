import type { MediaOnlyOperator, MediaOperator } from '@/types';

import { and, not, or } from './helpers';
import type { Queries, QueriesArray } from './types';

export const mq = (
  param:
    | ((helpers: Record<Exclude<MediaOperator, MediaOnlyOperator>, (...q: QueriesArray) => string>) => string)
    | Queries
) => {
  if (typeof param !== 'function') return and(param);
  return param({ and, or, not });
};

export * from './helpers';
