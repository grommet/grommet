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

    const update = useCallback((name, data, error, initial) => {
      setValue(prevValue => {
        const nextValue = { ...prevValue };
        nextValue[name] = data;

        setErrors(prevErrors => {
          const nextErrors = { ...prevErrors };
          // re-run any validations that have errors, in case the validation
          // is checking across fields
          Object.keys(prevErrors).forEach(errName => {
            const nextError =
              (errName === name && error) ||
              (validations.current[errName] &&
                validations.current[errName](data, nextValue));
            if (nextError) {
              nextErrors[errName] = nextError;
            } else {
              delete nextErrors[errName];
            }
          });
          return nextErrors;
        });

        return nextValue;
      });

      if (!initial)
        setTouched(prevTouched => {
          const nextTouched = { ...prevTouched };
          nextTouched[name] = true;
          return nextTouched;
        });
    }, []);

    const useFormContext = (name, dataProp) => {
      const valueData = name && value[name] !== undefined ? value[name] : '';
      const [data, setData] = useState(
        dataProp !== undefined ? dataProp : valueData,
      );
      // use dataProp passed in, allowing for it to change
      useEffect(() => {
        if (dataProp !== undefined) setData(dataProp);
      }, [dataProp]);
      // update when the form value changes
      useEffect(() => {
        if (name && valueData !== data) setData(valueData);
      }, [data, name, valueData]);

      return [
        data,
        nextData => {
          if (name) update(name, nextData);
          setData(nextData);
        },
      ];
    };

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
            adjustedEvent.touched = touched;
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
            get: name => value[name],
            messages,
            set: (name, nextValue) => update(name, nextValue),
            touched,
            update,
            useFormContext,
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
