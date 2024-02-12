import { mq } from '.';

const expected = 'only screen and (min-width: 100px) and (max-width: 200px)';

test('basic usage', () => {
  expect(mq({ screen: 'only', minWidth: 100, maxWidth: 200 })).toBe(expected);
});

test('basic test with destructuring', () => {
  expect(mq(({ and }) => and({ screen: 'only', minWidth: 100, maxWidth: 200 }))).toBe(expected);
});
