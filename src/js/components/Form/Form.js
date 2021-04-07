import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { FormContext } from './FormContext';

const defaultMessages = {
  invalid: 'invalid',
  required: 'required',
};
const defaultValue = {};
const defaultTouched = {};
const defaultValidationResults = {
  errors: {},
  infos: {},
};

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
      errors: errorsProp = defaultValidationResults.errors,
      infos: infosProp = defaultValidationResults.infos,
      messages = defaultMessages,
      onChange,
      onReset,
      onSubmit,
      onValidate,
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
    const [touched, setTouched] = useState(defaultTouched);
    const [validationResults, setValidationResults] = useState(
      defaultValidationResults,
    );
    const [requiredFields, setRequiredFields] = useState([]);

    // when onBlur input validation is triggered, we need to complete any
    // potential click events before running the onBlur validation.
    // otherwise, click events like reset, etc. may not be registered.
    // for a detailed scenario/discussion,
    // see: https://github.com/grommet/grommet/issues/4863
    // the value of pendingValidation is the name of the FormField
    // awaiting validation.
    const [pendingValidation, setPendingValidation] = useState(undefined);

    useEffect(() => {
      setPendingValidation(undefined);
      setValidationResults({ errors: errorsProp, infos: infosProp });
    }, [errorsProp, infosProp]);
    const validations = useRef({});

    // Currently, onBlur validation will trigger after a timeout of 120ms.
    useEffect(() => {
      const timer = setTimeout(() => {
        if (pendingValidation) {
          // run validations on the pending one and any other touched fields
          const [validatedErrors, validatedInfos] = validate(
            Object.entries(validations.current).filter(
              ([n]) => touched[n] || pendingValidation.includes(n),
            ),
            value,
          );
          setPendingValidation(undefined);

          setValidationResults(prevValidationResults => {
            const nextErrors = {
              ...prevValidationResults.errors,
              ...validatedErrors,
            };
            const nextInfos = {
              ...prevValidationResults.infos,
              ...validatedInfos,
            };

            // Remove any errors or infos that we don't have any validations
            // for anymore. This can occur when fields are dynamically removed.
            Object.keys(nextErrors)
              .filter(
                n => !validations.current[n] || nextErrors[n] === undefined,
              )
              .map(n => delete nextErrors[n]);
            Object.keys(nextInfos)
              .filter(
                n => !validations.current[n] || nextInfos[n] === undefined,
              )
              .map(n => delete nextInfos[n]);

            let valid = false;

            valid = requiredFields
              .filter(n => Object.keys(validations.current).includes(n))
              .every(
                field =>
                  value[field] &&
                  (value[field] !== '' || value[field] !== false),
              );

            if (Object.keys(nextErrors).length > 0) valid = false;

            // keep any previous errors and infos for untouched keys,
            // these may have come from a submit
            const nextValidationResults = {
              errors: nextErrors,
              infos: nextInfos,
              valid,
            };
            if (onValidate) onValidate(nextValidationResults);
            return nextValidationResults;
          });
        }
        // a timeout is needed to ensure that a click event (like one on a reset
        // button) completes prior to running the validation. without a timeout,
        // the blur will always complete and trigger a validation prematurely
        // The following values have been empirically tested, but 120 was
        // selected because it is the largest value
        // Chrome: 100, Safari: 120, Firefox: 80
      }, 120);

      return () => clearTimeout(timer);
    }, [pendingValidation, onValidate, touched, value, requiredFields]);

    // clear any errors when value changes
    useEffect(() => {
      if (validateOn !== 'change') setPendingValidation(undefined);
      setValidationResults(prevValidationResults => {
        const [nextErrors, nextInfos] = validate(
          Object.entries(validations.current).filter(
            ([n]) =>
              prevValidationResults.errors[n] || prevValidationResults.infos[n],
          ),
          value,
        );
        return {
          errors: { ...prevValidationResults.errors, ...nextErrors },
          infos: { ...prevValidationResults.infos, ...nextInfos },
        };
      });
    }, [touched, validateOn, value]);

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
      else if (formValue === undefined && name)
        // form has reset, so reset input value as well
        useValue = initialValue;
      else useValue = inputValue;

      return [
        useValue,
        nextComponentValue => {
          if (name) {
            // we have somewhere to put this
            const nextTouched = { ...touched };
            nextTouched[name] = true;

            if (!touched[name]) {
              // don't update if not needed
              setTouched(nextTouched);
            }

            const nextValue = { ...value };
            nextValue[name] = nextComponentValue;
            setValueState(nextValue);
            if (onChange) onChange(nextValue, { touched: nextTouched });
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
      const error = errorArg || validationResults.errors[name];
      const info = infoArg || validationResults.infos[name];

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

        if (required) {
          setRequiredFields(prevValue =>
            !prevValue.includes(name) ? [...prevValue, name] : prevValue,
          );
        } else {
          setRequiredFields(prevValue => prevValue.filter(v => v !== name));
        }

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
            ? () =>
                setPendingValidation(
                  pendingValidation ? [...pendingValidation, name] : [name],
                )
            : undefined,
        onChange:
          validateOn === 'change'
            ? () =>
                setPendingValidation(
                  pendingValidation ? [...pendingValidation, name] : [name],
                )
            : undefined,
      };
    };

    return (
      <form
        ref={ref}
        {...rest}
        onReset={event => {
          setPendingValidation(undefined);
          if (!valueProp) {
            setValueState(defaultValue);
            if (onChange) onChange(defaultValue, { touched: defaultTouched });
          }
          setTouched(defaultTouched);
          setValidationResults(defaultValidationResults);

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
          setPendingValidation(undefined);
          const [nextErrors, nextInfos] = validate(
            Object.entries(validations.current),
            value,
            true,
          );

          setValidationResults(() => {
            const nextValidationResults = {
              errors: nextErrors,
              infos: nextInfos,
            };
            if (onValidate) onValidate(nextValidationResults);
            return nextValidationResults;
          });

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
