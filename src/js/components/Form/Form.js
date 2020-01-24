import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FormContext } from './FormContext';

const defaultMessages = {
  invalid: 'invalid',
  required: 'required',
};
const defaultValue = {};
const defaultErrors = {};

const Form = forwardRef(
  (
    {
      children,
      errors: errorsProp = defaultErrors,
      messages: messagesProp = defaultMessages,
      onChange,
      onReset,
      onSubmit,
      validate = 'submit',
      value: valueProp = defaultValue,
      ...rest
    },
    ref,
  ) => {
    const [value, setValue] = useState(valueProp);
    useEffect(() => {
      if (valueProp !== defaultValue) setValue(valueProp);
    }, [valueProp]);
    const [messages, setMessages] = useState(messagesProp);
    useEffect(() => setMessages(messagesProp), [messagesProp]);
    const [errors, setErrors] = useState(errorsProp || {});
    useEffect(() => setErrors(errorsProp || {}), [errorsProp]);
    const [touched, setTouched] = useState({});

    const validations = useRef({});

    useEffect(() => {
      if (onChange) onChange(value);
    }, [onChange, value]);

    useEffect(() => {}, [value, errors]);

    const update = useCallback((name, data, error) => {
      setValue(prevValue => {
        const nextValue = { ...prevValue };
        nextValue[name] = data;

        setErrors(prevErrors => {
          const nextErrors = { ...prevErrors };
          if (prevErrors[name]) {
            const nextError =
              error ||
              (validations.current[name] &&
                validations.current[name](data, nextValue));
            if (nextError) {
              nextErrors[name] = nextError;
            } else {
              delete nextErrors[name];
            }
          }
          return nextErrors;
        });

        return nextValue;
      });

      setTouched(prevTouched => {
        const nextTouched = { ...prevTouched };
        nextTouched[name] = true;
        return nextTouched;
      });
    }, []);

    return (
      <form
        ref={ref}
        {...rest}
        onReset={event => {
          setValue(defaultValue);
          setErrors({});
          setTouched({});
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
          const nextErrors = { ...errors };
          Object.keys(validations.current).forEach(name => {
            const validation = validations.current[name];
            const error = validation && validation(value[name], value);
            if (error) {
              nextErrors[name] = error;
            } else {
              delete nextErrors[name];
            }
          });
          if (Object.keys(nextErrors).length === 0 && onSubmit) {
            event.persist(); // extract from React's synthetic event pool
            const adjustedEvent = event;
            adjustedEvent.value = value;
            onSubmit(adjustedEvent);
          } else {
            setErrors(nextErrors);
          }
        }}
      >
        <FormContext.Provider
          value={{
            addValidation: (name, validation) => {
              validations.current[name] = validation;
            },
            onBlur:
              validate === 'blur'
                ? name => {
                    if (validations.current[name]) {
                      setErrors(prevErrors => {
                        const nextErrors = { ...prevErrors };
                        const error = validations.current[name](
                          value[name],
                          value,
                        );
                        if (error) {
                          nextErrors[name] = error;
                        } else {
                          delete nextErrors[name];
                        }
                        return nextErrors;
                      });
                    }
                  }
                : undefined,
            errors,
            messages,
            touched,
            update,
            value,
          }}
        >
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
