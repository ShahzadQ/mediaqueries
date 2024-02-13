import type { MediaFeatures, MediaType } from '../types';

export type Queries = Partial<MediaFeatures & MediaType> | string;
export type QueriesArray = [Queries, ...Queries[]];
