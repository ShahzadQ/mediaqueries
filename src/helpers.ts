export const executeMediaQuery = (query: string | MediaQueryList) =>
  typeof query === 'string'
    ? typeof window !== 'undefined'
      ? window.matchMedia(query).matches
      : false
    : query.matches;

const eventListener = (f: 'add' | 'remove') => (query: string | MediaQueryList, callback: () => void) => {
  if (typeof window !== 'undefined') {
    (typeof query === 'string' ? window.matchMedia(query) : query)[
      f === 'add' ? 'addEventListener' : 'removeEventListener'
    ]('change', callback);
  }
};

export const addChangeListener = eventListener('add');
export const removeChangeListener = eventListener('remove');
