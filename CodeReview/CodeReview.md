## Readability

- Are naming conventions consistent in terms of casing?
- Do functions and variabls describe what they do?
- Formatting (indentations, spacing)
- Are comments necessary?

## Correctness & bugs

- API call handling things correctly? Does it catch errors?
- Any error or off conditions? Unhandled edge cases?
- Does state update properly?
- Promises handled correctly?

## Maintainability

- Is the logic reusable in other areas?
- Any hard coded value that can be refactored?
- Does each function or component do one thing really well?
- Can the component be broken down?

## Performance

- Can performance be optimized? Can we use useMemo or useCallback?
- Can we avoid nested loops?
- Is direct DOM manipulation used instead of the framework? methods?

## Accessibility

- Does the HTML code use proper tags?
- ARIA labels, keyboard navigation, font sizes

## Security

- Are user inputs validated and sanitized?
- API error?

## React

- Correct types, correct usage of hooks, keys in lists, prop drilling, etc
- State management

## Git

- Detailed description of what the PR is about?
- Clear commit messages?
