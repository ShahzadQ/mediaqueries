# mq
A package for generating CSS media queries using typesafe javascript objects and helper functions.

## Import
Import the package using `import { mq } from ''`.

## Basic Usage
`const query = mq({ screen: 'only', minWidth: 600, maxWidth: 1000 })`\
In the above example, `query` will hold the value `only screen and (min-width: 600px) and (max-width: 1000px)`.\
By default, `mq` will add `and` links between your properties.

## Advanced Usage
For more advanced usage, we need to destructure some helper functions.\
`const query = mq(({ and, or, not }) => and({ screen: 'only' }, or(and({ minWidth: 100, maxWidth: 200 }), and({ minWidth: 400, maxWidth: 500 }))))`\
\
We can destructure three helper functions: `and`, `or` and `not`. In the above example, we destructure all three, but will only be using `and` and `or`.\
Looking at the function we can see:
1. Eveything is wrapper in an `and` helper.
2. The first argument to this `and` is an object with `screen: 'only'`.
3. The second argument is an `or` helper.
4. The `or` helper contains two `and` helpers, each with a `minWidth` and `maxWidth` property.
5. So all together we are trying to create a media query that is for only screens and either has a minimum width of 100px and a maximum width of 200px or a minimum width of 400px and a maximum width of 500px.
6. As a CSS media query, this will generate: `only screen and (((min-width: 100px) and (max-width: 200px)) or ((min-width: 400px) and (max-width: 500px)))`

### The `and` and `or` helpers
These helpers take in an unrestricted number of `Queries` type arguments. These arguments can either be an object containing typesafe media queries, or a string of any type.

### The `not` helper
The not helper takes in a single `and` or `or` helper function. We don't pass in objects directly to ensure we know what kind of link we are creating between our statements.\
`const query = mq(({ and, not }) => and({ screen: 'only' }, not(and({ minWidth: 0, maxWidth: 100 }))))`\
In the above statement we are using our `not` helper nesting and `and` helper to create a media query that reads `only screen and (not ((min-width: 0px) and (max-width: 100px)))`.
