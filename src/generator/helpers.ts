import { defaultUnits } from '@/constants';
import type { MediaAndOperator, MediaFeatures, MediaOrOperator, MediaType } from '@/types';
import { addBrackets, addNot, arrayIncludes, camelCaseToKebabCase, generateFeature } from '@/utils';

import { _mediaTypes } from './constants';
import type { Queries, QueriesArray } from './types';

type LinkOperator = MediaAndOperator | MediaOrOperator;

const _joinWithLinkOperator = (arr: string[], operator: LinkOperator) => arr.join(` ${operator} `);

const _isMediaTypeString = (tbd: unknown): tbd is Extract<MediaType, string> =>
  typeof tbd === 'string' && arrayIncludes(_mediaTypes, tbd);

const _generateMediaFeatures = (queries: Exclude<Queries, string>, keys = Object.keys(queries)) => {
  return keys
    .map(key => {
      const value = queries[key as keyof typeof queries];

      if (typeof value === 'undefined') return undefined;
      else if (Array.isArray(value)) return value.join(', ');
      else if (_isMediaTypeString(value)) return value;

      const units = defaultUnits[key as keyof MediaFeatures];
      const query = camelCaseToKebabCase(key);

      return generateFeature(
        query,
        typeof value === 'string'
          ? value
          : typeof value === 'number'
            ? typeof units !== 'undefined'
              ? `${value}${units}`
              : value.toString()
            : `${value.value}${value.units}`
      );
    })
    .filter(i => typeof i !== 'undefined') as string[];
};

const _helperConstructor =
  (operator: Parameters<typeof _joinWithLinkOperator>[1]) =>
  (...queries: QueriesArray) => {
    const length = queries.length;
    return _joinWithLinkOperator(
      queries.map(q => {
        const keys = Object.keys(q);

        const result = typeof q === 'string' ? q : _joinWithLinkOperator(_generateMediaFeatures(q, keys), operator);

        return length > 1 && keys.length > 1 ? addBrackets(result) : result;
      }),
      operator
    );
  };

export const and = _helperConstructor('and');
export const or = _helperConstructor('or');
export const not = (...queries: QueriesArray) => addNot(addBrackets(_helperConstructor('and')(...queries)));
