export const addBrackets = (str: string) => `(${str})`;

export const addNot = (str: string) => `not ${str}`;

export const camelCaseToKebabCase = (str: string) =>
  str
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();

export const generateFeature = (key: string, value: string) => addBrackets(`${key}: ${value}`);

// this helper just removes some typescript issue where the tbd needs to match the array content type for some reason
export const arrayIncludes = (arr: unknown[], tbd: unknown) => arr.includes(tbd);
