# ts-mq (typesafe media queries)

**Typesafe CSS media query generation.** Generate simple or complex CSS media queries using JavaScript objects and helper functions. Inspired by [json2mq](https://github.com/akiran/json2mq).

## Install

```shell
pnpm add ts-mq
```

## Basic Usage

```ts
import { mq } from 'ts-mq';

const query = mq({ type: 'only screen', maxWidth: 600 });
```

Pass an object into `mq` specifying the features you want to apply. This object is a union of all non-deprecated media types and features specified in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries). By default, `mq` will add an `and` operator between features.

### Type Property

The `type` property refers to the media type you want to apply to a query. This property is described by the `MediaType` type (see [type definition](https://github.com/shahzadq/ts-mq/blob/main/src/types.ts)).

This property can take one of the following values:

#### String

```ts
mq({ type: 'only screen', minWidth: 100 });
```

The three basic media types (`screen`, `print` and `all`) along with their `not` and `only` counterparts. The example above will generate `only screen and (min-width: 100px)`.

#### Array of Strings

```ts
mq({ type: ['screen', 'print'], minWidth: 100 });
```

The three basic media types seperated by a comma. The example above will generate `screen, print and (min-width: 100px)`.

### Width, Height and Resolution

```ts
mq({
  width: 100,
  minWidth: '100em',
  maxWidth: {
    value: 200,
    units: 'rem'
  }
});
```

The example above will generate `(width: 100px) and (min-width: 100em) and (max-width: 200rem)`.

The `width`, `height` and `resolution` properties (along with their `min` and `max` counterparts) can take one of three argument types.

1. `string` - A string argument will be returned exactly as it's provided. `mq` will assume you've added a correct unit.
2. `number` - A number argument will trigger `mq` to add a default unit to the end (see [constants](https://github.com/shahzadq/ts-mq/blob/main/src/constants.ts)).
3. `UnitInput` - A Unit Input is a custom object type which takes both a `value` and a `units` property. The `value` property requires a number, and the `units` property requires a typesafe unit.

## Helper Functions

```ts
const query = mq(({ and, or, not }) => ...)
```

For more advanced cases, you can destructure three helper functions: `and`, `or` and `not`. These helpers can take an unrestricted number of arguments.

```ts
mq(({ and, or }) => or(and({ minWidth: 100, maxWidth: 200 }), and({ minWidth: 300, maxWidth: 400 })));
```

`and`, `or` link features using the relavant operator (in CSS media queries a comma is equivalent to an or operator). The example above will generate `(((min-width: 100px) and (max-width: 200px)) or ((min-width: 300px) and (max-width: 400px)))`

```ts
mq(({ not }) => not({ minWidth: 100, maxWidth: 200 }));
```

`not` wraps its content in a not operator and by default links them using an `and` operator. The above example will generate `not ((min-width: 100px) and (max-width: 200px))`

## Other Helpers

### `executeMediaQuery`

`ts-mq` includes an `executeMediaQuery` function to test queries on the browser.

```ts
import { executeMediaQuery, mq } from 'ts-mq';

const query = mq({ type: 'only screen', minWidth: 100, maxWidth: 200 });
const executed = executeMediaQuery(query);
```

If the window object exists, `window.matchMedia` will run, otherwise a `false` is returned by default.

```ts
import { addChangeListener, executeMediaQuery, mq } from 'ts-mq';

const query = mq({ type: 'only screen', minWidth: 100, maxWidth: 200 });
const matchMedia = window.matchMedia(mq);
const executed = executeMediaQuery(matchMedia);

// you can now use the same object for event listeners
matchMedia.addEventListener('change', () => {});
// alternatively
addChangeListener(matchMedia, () => {});
```

Alternatively, you can provide a `window.matchMedia` return object as an argument to `executeMediaQuery`. This is more useful for using the same object for creating event listeners.

### Event Listeners

`ts-mq` also provides two basic event listeners to listen for changes in browser dimensions and re-test media queries.

```ts
import { addChangeListener, executeMediaQuery, mq, removeChangeListener } from 'ts-mq';

const query = mq({ type: 'only screen', minWidth: 600 });

const eventListener = () => {
  const executed = executeMediaQuery(query);
  console.log('query media match: ', executed);
};

addChangeListener(query, eventListener);
removeChangeListener(query, eventListener);
```

Both `addChangeListener` and `removeChangeListener` require two arguments: the first a query to watch, the second a listener function which takes no arguments and returns no value. The query argument, like with `executeMediaQuery` can either be a query string to execute, or a `window.matchMedia` return object.
