# ts-mq (typesafe media queries)

**Typesafe CSS media query generation.** Generate simple or complex CSS media queries using JavaScript objects and helper functions. Inspired by [json2mq](https://github.com/akiran/json2mq).

## Install

```shell
pnpm add ts-mq
```

## Basic Usage

```
import { mq } from 'ts-mq';

const query = mq({ screen: 'only', minWidth: 100, maxWidth: 200 })
```

This will generate a media query reading: `only screen and (min-width: 100px) and (max-width: 200px)`. By default, connects queries with an `and` operator.

## Advanced Usage

For more advanced queries, we need to destructure some helper functions.

```
import { mq } from 'ts-mq';

const query = mq(({ and, or, not }) => and({ screen: 'only' }, or(and({ minWidth: 100, maxWidth: 200 }), and({ minWidth: 300, maxWidth: 400 }))))
```

There are three helper functions: `and`, `or` and `not`.

1. `and` - connects queries with an `and` operator (example: `and({ screen: 'only', minWidth: 100 })` generates `only screen and (min-width: 100px)`).
2. `or` - connects queries with an `or` operator (example: `or({ width: 200 }, { width: 300 })` generates `(width: 200px) or (width: 300px)`).
3. `not` - wraps queries with a `not` operator (example: `not({ minWidth: 100, maxWidth: 200 })` generates `not ((min-width: 100px) and (max-width: 200px))`). By default, connects queries with an `and` operator.

### Comma's

In CSS media queries, commas are interpreted as `or` operators, so just use our `or` helper.

### Media Type

There are three media types for CSS media queries: `screen`, `print` and `all`. In a single query not seperated by an `or` operator, only one of these can be present. Therefore, I have restricted the number of media types you can pass to only one per object. You can easily get around this by using an `and` operator, but just don't (otherwise your stuff won't work).

#### How to add

A media type can be added, by adding the type property to an object (either `screen`, `print`, or `all`), and then by adding on of the following three values:

1. `true` - just the type.
2. `false` - not the type.
3. `'only'` - only the type.

#### Examples

```
const query = mq({ screen: true })
```

The above example will generate `screen`.

```
const query = mq({ screen: 'only' })
```

The above example will generate `only screen`.

```
const query = mq({ screen: false })
```

The above example will generate `not screen`.

## Other Tools

For the `width` and `height` properties (and their `min` and `max` variants), you can define their values in one of three ways:

1. `number` - You can pass a number and by default `mq` will add some default units (for width and height these will be `px`).
2. `string` - You can pass a string and we'll assume you've added your own units correctly so nothing will change.
3. `{ value: number, units: string }` - For some properties you can access correct units by creating an object with a number value and some typesafe units.

## Types

All our object types are based on the media query specifications laid out on the [mdn docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries). You can access the various types and interfaces we use by importing them.
