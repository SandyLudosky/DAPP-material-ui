const logger = () => {
  return ({ getState }) => (next) => (action) => {
    console.log("%c previous state ➡️", "color: #bada55", getState());
    console.log("%c action :", "color: #bada55", action);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    console.log("%c new state after dispatch ➡️", "color: #bada55", getState());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
};
export default logger;
