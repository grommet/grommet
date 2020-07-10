import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { FormContext } from './FormContext';

const defaultMessages = {
  invalid: 'invalid',
  required: 'required',
};
const defaultValue = {};
const defaultErrors = {};
const defaultInfos = {};
const defaultTouched = {};

// validations is an array from Object.entries()
const validate = (validations, value, omitValid) => {
  const nextErrors = {};
  const nextInfos = {};
  validations.forEach(([name, validation]) => {
    if (!omitValid) {
      nextErrors[name] = undefined;
      nextInfos[name] = undefined;
    }
    const result = validation(value[name], value);
    // typeof error === 'object' is implied for both cases of error with
    // a status message and for an error object that is a react node
    if (typeof result === 'object') {
      if (result.status === 'info') {
        nextInfos[name] = result.message;
      } else {
        nextErrors[name] = result.message || result; // could be a node
      }
    } else if (typeof result === 'string') {
      nextErrors[name] = result;
    }
  });
  return [nextErrors, nextInfos];
};

const Form = forwardRef(
  (
    {
      children,
      errors: errorsProp = defaultErrors,
      infos: infosProp = defaultInfos,
      messages = defaultMessages,
      onChange,
      onReset,
      onSubmit,
      validate: validateOn = 'submit',
      value: valueProp,
      ...rest
    },
    ref,
  ) => {
    const [valueState, setValueState] = useState(valueProp || defaultValue);
    const value = useMemo(() => valueProp || valueState, [
      valueProp,
      valueState,
    ]);
    const [errors, setErrors] = useState(errorsProp);
    useEffect(() => setErrors(errorsProp), [errorsProp]);
    const [infos, setInfos] = useState(infosProp);
    useEffect(() => setInfos(infosProp), [infosProp]);
    const [touched, setTouched] = useState(defaultTouched);
    const validations = useRef({});

    // clear any errors when value changes
    useEffect(() => {
      setErrors(prevErrors => {
        const [nextErrors] = validate(
          Object.entries(validations.current).filter(([n]) => prevErrors[n]),
          value,
        );
        return { ...prevErrors, ...nextErrors };
      });
    }, [touched, value]);

    // There are three basic patterns of handling form input value state:
    //
    // 1 - form controlled
    //
    // In this model, the caller sets `value` and `onChange` properties
    // on the Form component to supply the values used by the input fields.
    // In useFormContext(), componentValue would be undefined and formValue
    // is be set to whatever the form state has. Whenever the form state
    // changes, we update the contextValue so the input component will use
    // that. When the input component changes, we will call update() to
    // update the form state.
    //
    // 2 - input controlled
    //
    // In this model, the caller sets `value` and `onChange` properties
    // on the input components, like TextInput, to supply the value for it.
    // In useFormContext(), componentValue is this value and we ensure to
    // update the form state, via update(), and set the contextValue from
    // the componentValue. When the input component changes, we will
    // call update() to update the form state.
    //
    // 3 - uncontrolled
    //
    // In this model, the caller doesn't set a `value` or `onChange` property
    // at either the form or input component levels.
    // In useFormContext(), componentValue is undefined and valueProp is
    // undefined and nothing much happens here. That is, unless the
    // calling component needs to know the state in order to work, such
    // as CheckBox or Select. In this case, those components supply
    // an initialValue, which will trigger updating the contextValue so
    // they can have access to it.
    //
    const useFormInput = (name, componentValue, initialValue) => {
      const [inputValue, setInputValue] = useState(initialValue);
      const formValue = name ? value[name] : undefined;

      // This effect is for pattern #2, where the controlled input
      // component is driving the value via componentValue.
      useEffect(() => {
        if (
          name && // we have somewhere to put this
          componentValue !== undefined && // input driving
          componentValue !== formValue // don't already have it
        ) {
          setValueState(prevValue => {
            const nextValue = { ...prevValue };
            nextValue[name] = componentValue;
            return nextValue;
          });
          // don't onChange on programmatic changes
        }
      }, [componentValue, formValue, name]);

      let useValue;
      if (componentValue !== undefined)
        // input component drives, pattern #2
        useValue = componentValue;
      else if (valueProp && name && formValue !== undefined)
        // form drives, pattern #1
        useValue = formValue;
      else useValue = inputValue;

      return [
        useValue,
        nextComponentValue => {
          if (name) {
            // we have somewhere to put this
            if (!touched[name]) {
              // don't update if not needed
              setTouched(prevTouched => {
                const nextTouched = { ...prevTouched };
                nextTouched[name] = true;
                return nextTouched;
              });
            }

            const nextValue = { ...value };
            nextValue[name] = nextComponentValue;
            setValueState(nextValue);
            if (onChange) onChange(nextValue);
          }
          if (initialValue !== undefined) setInputValue(nextComponentValue);
        },
      ];
    };

    const useFormField = ({
      error: errorArg,
      info: infoArg,
      name,
      required,
      validate: validateArg,
    }) => {
      const error = errorArg || errors[name];
      const info = infoArg || infos[name];

      useEffect(() => {
        const validateSingle = (aValidate, value2, data) => {
          let result;
          if (typeof aValidate === 'function') {
            result = aValidate(value2, data);
          } else if (aValidate.regexp) {
            if (!aValidate.regexp.test(value2)) {
              result = aValidate.message || messages.invalid;
              if (aValidate.status) {
                result = { message: result, status: aValidate.status };
              }
            }
          }
          return result;
        };

        const validateField = (value2, data) => {
          let result;
          if (
            required &&
            // false is for CheckBox
            (value2 === undefined || value2 === '' || value2 === false)
          ) {
            result = messages.required;
          } else if (validateArg) {
            if (Array.isArray(validateArg)) {
              validateArg.some(aValidate => {
                result = validateSingle(aValidate, value2, data);
                return !!result;
              });
            } else {
              result = validateSingle(validateArg, value2, data);
            }
          }
          return result;
        };

        if (validateArg || required) {
          validations.current[name] = validateField;
          return () => delete validations.current[name];
        }

        return undefined;
      }, [error, name, required, validateArg]);

      return {
        error,
        info,
        inForm: true,
        onBlur:
          validateOn === 'blur'
            ? () => {
                // run validations on touched keys
                const [nextErrors, nextInfos] = validate(
                  Object.entries(validations.current).filter(
                    ([n]) => touched[n] || n === name,
                  ),
                  value,
                );
                // keep any previous errors and infos for untouched keys,
                // which probably came from a submit
                setErrors(prevErrors => ({ ...prevErrors, ...nextErrors }));
                setInfos(prevInfos => ({ ...prevInfos, ...nextInfos }));
              }
            : undefined,
      };
    };

    return (
      <form
        ref={ref}
        {...rest}
        onReset={event => {
          if (!valueProp) {
            setValueState(defaultValue);
            if (onChange) onChange(defaultValue);
          }
          setErrors(defaultErrors);
          setInfos(defaultInfos);
          setTouched(defaultTouched);

          if (onReset) {
            event.persist(); // extract from React's synthetic event pool
            const adjustedEvent = event;
            adjustedEvent.value = defaultValue;
            onReset(adjustedEvent);
          }
        }}
        onSubmit={event => {
          // Don't submit the form via browser form action. We don't want it
          // if the validation fails. And, we assume a javascript action handler
          // otherwise.
          event.preventDefault();
          const [nextErrors, nextInfos] = validate(
            Object.entries(validations.current),
            value,
            true,
          );
          setErrors(nextErrors);
          setInfos(nextInfos);

          if (Object.keys(nextErrors).length === 0 && onSubmit) {
            event.persist(); // extract from React's synthetic event pool
            const adjustedEvent = event;
            adjustedEvent.value = value;
            adjustedEvent.touched = touched;
            onSubmit(adjustedEvent);
          }
        }}
      >
        <FormContext.Provider value={{ useFormField, useFormInput }}>
          {children}
        </FormContext.Provider>
      </form>
    );
  },
);

Form.displayName = 'Form';

let FormDoc;
if (process.env.NODE_ENV !== 'production') {
  FormDoc = require('./doc').doc(Form); // eslint-disable-line global-require
}

const FormWrapper = FormDoc || Form;

export { FormWrapper as Form };
