# Hooks

- useEffect: Used to perform side effects. Takes in the function and dependency array as arguments. If the dependency array is empty, it runs only once upon initialization. If it doesn't exist, it executes after every render of the component.
- useLayoutEffect: This fires SYNCHRONOUSLY after all the rendering is finished but BEFORE the rendering actually gets painted. This is useful when you need to interact with the DOM (especially with measurements) after all the rendering changes have taken place.
- useMemo: Memoizes an operation. This takes in a callback function (for the operation) and dependency array.
- useRef: Remember an element to later interact with it - focus on it, change its value, etc -> can do const elementRef = useRef(null) then have attribute ref = {elementRef} in the HTML. Then you can do elementRef.current.focus().
- useCallback: Memoises callback functions. Same format as useMemo but for functions.
- useContext: export const ThemeContext = createContext(null) and wrap parent elements in <ThemeContext.Provider value={{state: state, setState: setState}}>. Then, in the child element, use it with useContext(ThemeContext)
- useReducer: takes in the reducer and the initial state. useReducer is used when the same logic is used with the same state multiple times. The main use case is when we have many states at the same level and we want to bundle them together, and set many update functions for each of them.
  function reducer(state, action) {
  switch (action.type) {
  case 'incremented_age': {
  return {
  name: state.name,
  age: state.age + 1
  };
  }
  case 'changed_name': {
  return {
  name: action.nextName,
  age: state.age
  };
  }
  }
  throw Error('Unknown action: ' + action.type);
  }

  Then calling this reducer by const [state, dispatch] = useReducer(reducer, {name: 'John', age: 24}) and dispatch({type: 'incremented_age'})

- Remember that in terms of code quality, one component should only do one thing! If there are too many states, use useContext or Redux. If there are too many repeated logic, use useReducer or custom hooks.
- When using composition, use props.children inside the child component, and in the parent component wrap code inside that child component.
- For forms, use event.target.value. You can also do sanitize(event.target.value) to prevent XSS attacks. This means that they would submit malicious JS code through user input, for example forms. Also, don't forget to event.preventDefault(). This prevents the default behaviour from happening from interacting with this element.
- Anything with useReducer can be replaced with useState. useState is just a useReducer with just 1 action of just setting the state.
