import { defaultUnits } from '../constants';
import type { MediaFeatures } from '../types';
import { addBrackets, addNot, arrayIncludes, camelCaseToKebabCase, generateFeature } from '../utils';
import { mediaTypes } from './constants';
import type { MediaLinkOperator, MediaQueriesArray } from './types';

// helper to join with an "and" or "or" operator
const joinWithLinkOperator = (arr: string[], operator: MediaLinkOperator) => arr.join(` ${operator} `);

// generic helper constructor for helper functions
const helperConstructor =
  // require an operator to use to join features with

    (operator: Parameters<typeof joinWithLinkOperator>[1]) =>
    // return a helper function that requires an unrestricted number of Queries type arguments
    (...queriesArray: MediaQueriesArray) => {
      // get the number of arguments provided
      const { length } = queriesArray;

      return joinWithLinkOperator(
        queriesArray.map(queries => {
          const keys = Object.keys(queries);

          const result =
            // if the queries are a string, it has already been generated so just return as it is
            typeof queries === 'string'
              ? queries
              : // otherwise generate a media query feature
                joinWithLinkOperator(
                  keys
                    .map(key => {
                      const value = queries[key as keyof typeof queries];

                      // if it is undefined, we'll filter it out later
                      if (typeof value === 'undefined') return undefined;
                      // if it is an array, return it by joining by a comma (for media type arguments)
                      else if (Array.isArray(value)) return value.join(', ');
                      // if it is a string and is in the mediaTypes array constant, just return as it is
                      else if (typeof value === 'string' && arrayIncludes(mediaTypes, value)) return value;
                      // otherwise generate
                      const units = defaultUnits[key as keyof MediaFeatures];
                      // convert the query to a media query feature key
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
                    // filter out the undefined content to not add
                    .filter(i => typeof i !== 'undefined') as string[],
                  operator
                );
          // if the length of the parent and child array are both greater than 1, add brackets
          return length > 1 && keys.length > 1 ? addBrackets(result) : result;
        }),
        operator
      );
    };

export const and = helperConstructor('and');
export const or = helperConstructor('or');
export const not = (...queries: MediaQueriesArray) => addNot(addBrackets(helperConstructor('and')(...queries)));
