import type { MediaQueries, MediaTypes } from '../types';

export type Queries = Partial<MediaQueries & MediaTypes> | string;
export type QueriesArray = [Queries, ...Queries[]];
