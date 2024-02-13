export const addBrackets = (str: string) => `(${str})`;

export const addNot = (str: string) => `not ${str}`;

export const camelCaseToKebabCase = (str: string) =>
  str
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();

export const generateFeature = (key: string, value: string) => addBrackets(`${key}: ${value}`);
