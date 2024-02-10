import { defaultUnits } from "./constants";
import type {
  MediaLinkOperator,
  MediaOnlyOperator,
  MediaOperators,
  MediaQueries,
  MediaTypes,
} from "./types";

type Queries = (Partial<MediaQueries> & Partial<MediaTypes>) | string;
type QueriesArray = Queries[];

// join an array of strings with a link operator
const joinWithLink = (arr: string[], link: MediaLinkOperator) =>
  arr.join(` ${link} `);

// add brackets to outside of string
const addBrackets = (str: string) => `(${str})`;
// remove brackets from outside of string
const removeBrackets = (str: string) => str.slice(1, -1);

const camelCaseToKebabCase = (str: string) =>
  str
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();

// determine the values based on input queries - returns an array of strings
const determineValues = (queries: Queries) =>
  typeof queries === "string"
    ? [queries]
    : Object.keys(queries).map((key) => {
        let value = queries[key as keyof typeof queries];
        if (typeof value === "undefined") return "";

        if (key === "all" || key === "screen" || key === "print")
          return `${
            value === "only" ? `only ${key}` : value ? key : `not ${key}`
          }`;

        value = value as Exclude<typeof value, boolean | MediaOnlyOperator>;

        const unit = defaultUnits[key as keyof Queries];
        const query = camelCaseToKebabCase(key);

        return addBrackets(
          `${query}: ${
            typeof value !== "string"
              ? typeof value !== "number"
                ? `${value.value}${value.units}`
                : typeof unit !== "undefined"
                ? `${value}${unit}`
                : value
              : value
          }`
        );
      });

type Helper = (...queries: QueriesArray) => string;

const helperConstructor = (link: MediaLinkOperator, ...queries: QueriesArray) =>
  addBrackets(
    joinWithLink(
      queries
        .map((q) => determineValues(q), link)
        .reduce((a, v) => [...a, ...v]),
      link
    )
  );

const and: Helper = (...queries) => helperConstructor("and", ...queries);
const or: Helper = (...queries) => helperConstructor("or", ...queries);
const not: Helper = (...queries) =>
  addBrackets(`not ${helperConstructor("and", ...queries)}`);

export const mq = (
  param:
    | ((
        helpers: Record<Exclude<MediaOperators, MediaOnlyOperator>, Helper>
      ) => string)
    | Queries
) =>
  typeof param === "function"
    ? removeBrackets(param({ and, or, not }))
    : joinWithLink(determineValues(param), "and");
