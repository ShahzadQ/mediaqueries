export const executeMediaQuery = (query: string | MediaQueryList) =>
  typeof query === 'string'
    ? typeof window !== 'undefined'
      ? window.matchMedia(query).matches
      : false
    : query.matches;

export type MediaQueryEventListener = (executed: boolean, query: string) => void;

const eventListener = (f: 'add' | 'remove') => (query: string | MediaQueryList, callback: MediaQueryEventListener) => {
  if (typeof window !== 'undefined') {
    const mediaQuery = typeof query === 'string' ? window.matchMedia(query) : query;

    mediaQuery[f === 'add' ? 'addEventListener' : 'removeEventListener']('change', () =>
      callback(executeMediaQuery(mediaQuery), mediaQuery.media)
    );
  }
};

export const addChangeListener = eventListener('add');
export const removeChangeListener = eventListener('remove');
