import { createContext, useState, useMemo, useContext } from "react";

const Context = createContext();

function FormProvider({ children }) {
  const [isValid, setValid] = useState(false);
  const validate = (fields) => {
    let errors = [];
    Object.entries(fields).map(([key, value]) => {
      if (!value) {
        errors.push(key);
      }
    });
    return setValid(!errors.length);
  };
  const value = useMemo(() => {
    return {
      validate,
      isValid,
    };
  }, [isValid]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useFormValidation() {
  return useContext(Context);
}

export default FormProvider;
