import { defaultUnits } from '../constants';
import type { MediaFeatures } from '../types';
import { addBrackets, addNot, arrayIncludes, camelCaseToKebabCase, generateFeature } from '../utils';
import { mediaTypes } from './constants';
import type { MediaLinkOperator, MediaQueriesArray } from './types';

const joinWithLinkOperator = (arr: string[], operator: MediaLinkOperator) => arr.join(` ${operator} `);

const helperConstructor =
  (operator: Parameters<typeof joinWithLinkOperator>[1]) =>
  (...queriesArray: MediaQueriesArray) => {
    const { length } = queriesArray;

    return joinWithLinkOperator(
      queriesArray.map(queries => {
        const keys = Object.keys(queries);

        const result =
          typeof queries === 'string'
            ? queries
            : joinWithLinkOperator(
                keys
                  .map(key => {
                    const value = queries[key as keyof typeof queries];

                    if (typeof value === 'undefined') return undefined;
                    else if (Array.isArray(value)) return value.join(', ');
                    else if (typeof value === 'string' && arrayIncludes(mediaTypes, value)) return value;

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
                  .filter(i => typeof i !== 'undefined') as string[],
                operator
              );

        return length > 1 && keys.length > 1 ? addBrackets(result) : result;
      }),
      operator
    );
  };

export const and = helperConstructor('and');
export const or = helperConstructor('or');
export const not = (...queries: MediaQueriesArray) => addNot(addBrackets(helperConstructor('and')(...queries)));
