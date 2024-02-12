export const addBrackets = (str: string) => `(${str})`;
export const removeOuterBrackets = (str: string) => str.slice(1, -1);

export const camelCaseToKebabCase = (str: string) =>
  str
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
