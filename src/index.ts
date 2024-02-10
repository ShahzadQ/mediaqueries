import { defaultUnits } from "./constants";
import type {
    MediaAndOperator,
    MediaOnlyOperator,
    MediaOperators,
    MediaOrOperator,
    MediaQueries,
    MediaTypes,
} from "./types";

// type of queries that can be passed to any helper function
type Queries = (Partial<MediaQueries> & Partial<MediaTypes>) | string;
type QueriesArray = Queries[];

// type of operators that can be used to link statements together
type Link = MediaAndOperator | MediaOrOperator

// join an array of strings with a link operator
const joinWithLink = (arr: string[], link: Link) =>
    arr.join(` ${link} `);

const addBrackets = (str: string) => `(${str})`;
const removeBrackets = (str: string) => str.slice(1, -1);

const camelCaseToKebabCase = (str: string) =>
    str
        .split(/(?=[A-Z])/)
        .join("-")
        .toLowerCase();

// determine the values based on input queries - returns an array of strings
const determineValues = (queries: Queries) =>
    // if already a string just convert to a single item array and return
    typeof queries === "string"
        ? [queries]
        : Object.keys(queries).map((key) => {
            // map over keys and get value
            let value = queries[key as keyof typeof queries];
            // if no value return nothing
            if (typeof value === "undefined") return "";
            // if a type key, custom return without brackets
            if (key === "all" || key === "screen" || key === "print")
                return `${value === "only" ? `only ${key}` : value ? key : `not ${key}`
                    }`;

            // typescript not clever enough to deduce this
            value = value as Exclude<typeof value, boolean | MediaOnlyOperator>;
            // get a default unit if there is one
            const unit = defaultUnits[key as keyof Queries];
            // convert our key to a css query
            const query = camelCaseToKebabCase(key);
            // conditional return a string with brackets
            return addBrackets(
                `${query}: ${typeof value !== "string"
                    ? typeof value !== "number"
                        ? `${value.value}${value.units}`
                        : typeof unit !== "undefined"
                            ? `${value}${unit}`
                            : value
                    : value
                }`
            );
        });

// what should a helper function look like
type Helper = (...queries: QueriesArray) => string;
// general function for helper functions
const helperConstructor = (link: Link, ...queries: QueriesArray) =>
    addBrackets(
        joinWithLink(
            queries
                .map((q) => determineValues(q), link)
                .reduce((a, v) => [...a, ...v]),
            link
        )
    );

// helper functions
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

export * from "./types";
export * from "./constants";
