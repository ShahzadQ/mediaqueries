export const executeMediaQuery = (query: string | MediaQueryList) =>
  typeof query === 'string'
    ? typeof window !== 'undefined'
      ? window.matchMedia(query).matches
      : false
    : query.matches;
