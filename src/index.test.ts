import { mq } from '.';

const expected = {
  basic: 'only screen and (min-width: 100px) and (max-width: 200px)',
  basicDifferentUnits: 'only screen and (min-width: 100rem) and (max-width: 200rem)',
  complexAndOr:
    'screen and (((min-width: 100px) and (max-width: 200px)) or ((min-width: 300px) and (max-width: 400px)))',
  complexNot: 'not screen and (not (width: 100px))'
};

test('basic usage', () => {
  expect(mq({ screen: 'only', minWidth: 100, maxWidth: 200 })).toBe(expected.basic);
});

test('basic test with destructuring', () => {
  expect(mq(({ and }) => and({ screen: 'only', minWidth: 100, maxWidth: 200 }))).toBe(expected.basic);
});

test('basic test with destructuring and expanded number values', () => {
  expect(
    mq(({ and }) =>
      and({ screen: 'only', minWidth: { value: 100, units: 'rem' }, maxWidth: { value: 200, units: 'rem' } })
    )
  );
});

test('complex test - and / or', () => {
  expect(
    mq(({ and, or }) =>
      and({ screen: true }, or(and({ minWidth: 100, maxWidth: 200 }), and({ minWidth: 300, maxWidth: 400 })))
    )
  ).toBe(expected.complexAndOr);
});

test('complex not', () => {
  expect(mq(({ and, not }) => and({ screen: false }, not({ width: 100 }))));
});
