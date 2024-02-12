import { defaultUnits } from './constants';
import type {
  MediaAndOperator,
  MediaOnlyOperator,
  MediaOperators,
  MediaOrOperator,
  MediaQueries,
  MediaTypes
} from './types';
import { addBrackets, camelCaseToKebabCase, removeOuterBrackets } from './utils';

// type of queries that can be passed to any helper function
type Queries = (Partial<MediaQueries> & Partial<MediaTypes>) | string;
type QueriesArray = Queries[];

// type of operators that can be used to link statements together
type Link = MediaAndOperator | MediaOrOperator;

// join an array of strings with a link operator
const joinWithLink = (arr: string[], link: Link) => arr.join(` ${link} `);

// determine the values based on input queries - returns an array of strings
const generateMediaQueries = (queries: Queries) =>
  // if already a string just convert to a single item array and return
  typeof queries === 'string'
    ? [queries]
    : Object.keys(queries).map(key => {
        // map over keys and get value
        const value = queries[key as keyof typeof queries];
        // if no value return nothing
        if (typeof value === 'undefined') return '';
        // if a type key, custom return without brackets
        if (typeof value === 'boolean' || value === 'only')
          return `${value === 'only' ? `only ${key}` : value ? key : `not ${key}`}`;

        // get a default unit if there is one
        const unit = defaultUnits[key as keyof MediaQueries];
        // convert our key to a css query
        const query = camelCaseToKebabCase(key);
        // conditional return a string with brackets
        return addBrackets(
          `${query}: ${
            typeof value !== 'string'
              ? typeof value !== 'number'
                ? `${value.value}${value.units}`
                : typeof unit !== 'undefined'
                  ? `${value}${unit}`
                  : value
              : value
          }`
        );
      });

// general function for helper functions
const helperConstructor =
  (link: Link) =>
  (...queries: QueriesArray) =>
    addBrackets(
      joinWithLink(
        queries.map(q => generateMediaQueries(q), link).reduce((a, v) => [...a, ...v]),
        link
      )
    );

type Helper = ReturnType<typeof helperConstructor>;

export const mq = (
  param: ((helpers: Record<Exclude<MediaOperators, MediaOnlyOperator>, Helper>) => string) | Queries
) =>
  typeof param === 'function'
    ? removeOuterBrackets(
        param({
          and: helperConstructor('and'),
          or: helperConstructor('or'),
          not: (...queries) => addBrackets(`not ${helperConstructor('and')(...queries)}`)
        })
      )
    : joinWithLink(generateMediaQueries(param), 'and');

export * from './types';
export * from './constants';
