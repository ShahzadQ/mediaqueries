# ts-mq (typesafe media queries)

**Typesafe CSS media query generation.** Generate simple or complex CSS media queries using JavaScript objects and helper functions. Inspired by [json2mq](https://github.com/akiran/json2mq).

## Install

```shell
pnpm add ts-mq
```

## Basic Usage

```
import { mq } from 'ts-mq';

const query = mq({ type:'only screen', maxWidth: 600 });
```

Pass an object into `mq` specifying the features you want to apply. This object is a union of all non-deprecated media types and features specified in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries). By default, `mq` will add an `and` operator between features.

### Type Property

The `type` property refers to the media type you want to apply to a query. This property is described by the `MediaType` type (see [type definition](https://github.com/ShahzadQ/ts-mq/blob/main/src/types.ts)).

This property can take one of the following values:

#### String

```
mq({ type: 'only screen', minWidth: 100 });
```

The three basic media types (`screen`, `print` and `all`) along with their `not` and `only` counterparts. The example above will return `only screen and (min-width: 100px)`.

#### Array of Strings

```
mq({ type: ['screen', 'print'], minWidth: 100 });
```

The three basic media types seperated by a comma. The example above will return `screen, print and (min-width: 100px)`.

### Width, Height and Resolution

```
mq({
    width: 100,
    minWidth: '100em',
    maxWidth: {
        value: 200,
        units: 'rem'
    }
})
```

The example above will generate `(width: 100px) and (min-width: 100em) and (max-width: 200rem)`.

The `width`, `height` and `resolution` properties (along with their `min` and `max` counterparts) can take one of three argument types.

1. `string` - A string argument will be returned exactly as it's provided. `mq` will assume you've added a correct unit.
2. `number` - A number argument will trigger `mq` to add a default unit to the end (see [constants](https://github.com/ShahzadQ/ts-mq/blob/main/src/constants.ts)).
3. `UnitInput` - A Unit Input is a custom object type which takes both a `value` and a `units` property. The `value` property requires a number, and the `units` property requires a typesafe unit.

## Helper Functions

```
const query = mq(({ and, or, not }) => ...)
```

For more advanced cases, you can destructure three helper functions: `and`, `or` and `not`. These helpers can take an unrestricted number of arguments.

```
mq(
    ({ and, or }) =>
        or(
            and({ minWidth: 100, maxWidth: 200 }),
            and({ minWidth: 300, maxWidth: 400 })
        )
)
```

`and`, `or` link features using the relavant operator (in CSS media queries a comma is equivalent to an or operator). The example above will generate `(((min-width: 100px) and (max-width: 200px)) or ((min-width: 300px) and (max-width: 400px)))`

```
mq(({ not }) => not({ minWidth: 100, maxWidth: 200 }))
```

`not` wraps its content in a not operator and by default links them using an `and` operator. The above example will generate `not ((min-width: 100px) and (max-width: 200px))`

## Other Helpers

`ts-mq` also includes an `executeMediaQuery` function to test queries on the browser.

```
import { mq, executeMediaQuery } from 'ts-mq';

const query = mq({ type: 'only screen', minWidth: 100, maxWidth: 200 });
const executed = executeMediaQuery(query)
```

If the window object exists, `window.matchMedia` will run, otherwise a `false` is returned by default.
