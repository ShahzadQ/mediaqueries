export const executeMediaQuery = (query: string) =>
  typeof window !== 'undefined' ? window.matchMedia(query).matches : false;
