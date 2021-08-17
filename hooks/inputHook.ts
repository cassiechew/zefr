import { useState } from "react";

/**
 * useInput is a hook to handle form inputs
 * 
 * @param initialValue The intial value to set the form field
 * @returns An object containing values and objects to manipulate the value
 */
export const useInput = (initialValue : string) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event : any) => {
        setValue(event.target.value);
      }
    }
  };
};