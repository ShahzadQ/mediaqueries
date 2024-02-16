import type { MediaAndOperator, MediaFeatures, MediaOrOperator, MediaType } from '../types';

export type MediaQueries = Partial<MediaFeatures & Record<'type', MediaType>> | string;
export type MediaQueriesArray = [MediaQueries, ...MediaQueries[]];

export type MediaLinkOperator = MediaAndOperator | MediaOrOperator;
