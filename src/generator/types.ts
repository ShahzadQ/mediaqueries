import type { MediaQueries, MediaType } from '../types';

export type Queries = Partial<MediaQueries & MediaType> | string;
export type QueriesArray = [Queries, ...Queries[]];
