import { executeMediaQuery, mq } from '.';

test('basic execute media query test', () => {
  expect(executeMediaQuery(mq({ type: 'all', minWidth: 200, maxWidth: 400 }))).toBe(false);
});
