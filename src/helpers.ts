type Query = string | MediaQueryList;

const getMediaQuery = (query: Query) =>
  typeof query === 'string' ? (typeof window !== 'undefined' ? window.matchMedia(query) : undefined) : query;

export const executeMediaQuery = (query: Query) => getMediaQuery(query)?.matches ?? false;

export type MediaQueryEventListener = (executed: boolean, query: string) => void;

const eventListener = (action: 'add' | 'remove') => (query: Query, callback: MediaQueryEventListener) => {
  const mediaQuery = getMediaQuery(query);
  if (typeof mediaQuery !== 'undefined') {
    mediaQuery[action === 'add' ? 'addEventListener' : 'removeEventListener']('change', () => {
      callback(executeMediaQuery(mediaQuery), mediaQuery.media);
    });
  }
};

export const addChangeListener = eventListener('add');
export const removeChangeListener = eventListener('remove');
