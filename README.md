# Multiple Values Input

Small and reusable component with zero dependencies which supports adding
multiple values, providing validation and light interaction API.

[Try it now](https://ivankuzyshyn.github.io/multiple-values-input/)

# Features
- [x] can be easily used in any form or independently
- [x] independent styles and zero packages dependencies
- [x] blocks creates by pressing `Enter`, `Comma`, losing focus or direct text paste
- [x] width and height relies on parent's sizes
- [x] input automatically scrolls if to much content inserted
- [x] it's possible to use many inputs fields independently
- [x] supports all latest browsers and IE 11

# Scripts

- `npm start` - runs build in dev mode with updates watcher
- `npm run build` - runs production build
- `npm test` - runs all tests
- `npm test:coverage` - run all tests and define coverage, output is
  available in terminal and in `coverage` directory in the project root
- `npm run prettier:fix` - set required formatting
- `npm run clean` - delete everything from the `dist` folder

# Usage

First step:

```html
<link rel="stylesheet" href="<path>/dist/MultipleValuesInput.css" />
```

Second step:

```html
<script src="<path>/dist/MultipleValuesInput.js"></script>
```

Once two previous steps done `MultipleValuesInput` is available globally,
so now you can easily create component instance.

```html
<div id="emails-input"></div>
<script>
  const node = document.querySelector('#emails-input')
  const input = new MultipleValuesInput(node)
</script>
```

## Arguments

```javascript
const input = new MultipleValuesInput(node, options)
```

- `node` arguments accepts any `HTMLElement` as a component mount node,
  please make sure that top root node, like `html` or node without parent
  could not be provided, component will automatically check that and throw
  an exception if it could not mount.
- `options` argument accepts an object with configuration options:

| Option      | Format                      | Default                          | Usage                                                                                                                 |
| ----------- | --------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| values      | `string[]`                  | `[]`                             | Enables to set the initial list of blocks to the input, please consider input values will be automatically validated                                                                |
| validator   | `(item: string) => boolean` | `item => item.trim().length > 0` | Enable to set items validator, can be use to create custom inputs behavior, like emails input, IP addresses input etc |
| placeholder | `string`                    | `Enter item`                     | Enables to set custom placeholder for input field                                                                     |
| onChange | `(items: Array<[string, {valid: boolean}]>) => any`                    | `() => {}`                     | Enables to changes handler which should be useful for different integrations                                                                     |

## Public API

| Method     | Arguments                   | Return value                        | Description                                                      |
| ---------- | --------------------------- | ----------------------------------- | ---------------------------------------------------------------- |
| getItems() | -                           | `Array<[string, {valid: boolean}]>` | Returns all input items with validation statuses                 |
| add()      | `value: string or string[]` | void                                | Add one or more items to the input                               |
| destroy()  | -                           | void                                | Destroy input, unbind handlers and returns initial DOM structure |
