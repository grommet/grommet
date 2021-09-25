import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import { FormContext } from './FormContext';
import { FormPropTypes } from './propTypes';

const defaultValue = {};
const defaultTouched = {};
const defaultValidationResults = {
  errors: {},
  infos: {},
};


const stringToArray = (string) => {
  const regex = /\[[0-9]\]\./;
  if (regex.test(string)) {
    const indexOfArray = regex.exec(string)[0][1];
    const arrayValues = string.split(regex);
    const arrayName = arrayValues[0]
    const arrayObjName = arrayValues[1];
    return {
      indexOfArray,
      arrayName,
      arrayObjName
    };
  }
};

// Validating nameValues with the validator and sending correct messaging
const validate = (validator, nameValue, formValue, format, messages) => {
  let result;
  if (typeof validator === 'function') {
    result = validator(nameValue, formValue);
  } else if (validator.regexp) {
    if (!validator.regexp.test(nameValue)) {
      result = validator.message || format({ id: 'form.invalid', messages });
      if (validator.status) {
        result = { message: result, status: validator.status };
      }
    }
  }
  return result;
};

// Validates particular key in formValue
const validateName =
  (nameValidators, required) => (name, formValue, format, messages) => {
    let nameValue;
    const isArrayField = stringToArray(name);
    if (isArrayField) {
      const { indexOfArray, arrayName, arrayObjName } = isArrayField;
      nameValue = formValue[arrayName][indexOfArray][arrayObjName];
    } else {
      nameValue = formValue[name];
    }
    let result;
    // ValidateArg is something that gets passed in from a FormField component
    // See 'validate' prop in FormField
    if (
      required &&
      // false is for CheckBox
      (nameValue === undefined ||
        nameValue === '' ||
        nameValue === false ||
        (Array.isArray(nameValue) && !nameValue.length))
    ) {
      // There is no value at that name, and one is required
      result = format({ id: 'form.required', messages });
    } else if (nameValidators) {
      if (Array.isArray(nameValidators)) {
        nameValidators.some((validator) => {
          result = validate(validator, nameValue, formValue, format, messages);
          return !!result;
        });
      } else {
        result = validate(
          nameValidators,
          nameValue,
          formValue,
          format,
          messages,
        );
      }
    }
    console.log('validateName',{ nameValue, name, formValue, nameValidators, result })
    return result;
  };

// validations is an array from Object.entries()
// Validates all keys in formValue
const validateForm = (validations, formValue, format, messages, omitValid) => {
  const nextErrors = {};
  const nextInfos = {};
  validations.forEach(([name, { field, input }]) => {
    if (!omitValid) {
      nextErrors[name] = undefined;
      nextInfos[name] = undefined;
    }

    let result;
    if (input) {
      // input() are validations supplied through useFormInput()
      result = input(name, formValue, format, messages);
    }
    if (field && !result) {
      // field() are validations supplied through useFormField()
      result = field(name, formValue, format, messages);
    }
    console.log('validateForm',{name, field, input, result})
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
      messages,
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
    const { format } = useContext(MessageContext);

    const [valueState, setValueState] = useState(valueProp || defaultValue);
    const [arrayOfFormFields, setArrayOfFormFields] = useState({});
    const value = useMemo(
      () => valueProp || valueState,
      [valueProp, valueState],
    );
    // console.log({ value, valueProp, valueState })
    const [touched, setTouched] = useState(defaultTouched);
    const [validationResults, setValidationResults] = useState(
      defaultValidationResults,
    );

    useEffect(() => {
      if(Object.keys(value).length) {
        setArrayOfFormFields(value);
      }
    }, [value]);
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
    const requiredFields = useRef([]);

    const buildValid = useCallback(
      (nextErrors) => {
        let valid = false;
        console.log({ requiredFields, validations })
        valid = requiredFields.current
          .filter((n) => Object.keys(validations.current).includes(n))
          .every(
            (field) =>
              value[field] && (value[field] !== '' || value[field] !== false),
          );

        if (Object.keys(nextErrors).length > 0) valid = false;
        return valid;
      },
      [value],
    );

    // Remove any errors that we don't have any validations for anymore.
    const filterErrorValidations = (errors) => {
      console.log('filterErrorValidations called')
      const nextErrors = errors;
      return Object.keys(nextErrors)
        .filter((n) => !validations.current[n] || nextErrors[n] === undefined)
        .forEach((n) => delete nextErrors[n]);
    };

    // Remove any infos that we don't have any validations for anymore.
    const filterInfoValidations = (infos) => {
      console.log('filterInfoValidations called')
      const nextInfos = infos;
      return Object.keys(nextInfos)
        .filter((n) => !validations.current[n] || nextInfos[n] === undefined)
        .forEach((n) => delete nextInfos[n]);
    };

    // On initial mount, when validateOn is change or blur,
    // set validation results for any set fields and calculate whether
    // the form is valid overall.
    useEffect(() => {
      const validationsForSetFields = Object.entries(
        validations.current,
      ).filter(([n]) => {
        const isArrayField = stringToArray(n);
        if (isArrayField) {
          const { indexOfArray, arrayName, arrayObjName } = isArrayField;
          if (value[arrayName]) {
            return value[arrayName][indexOfArray][arrayObjName];
          }
        } else return value[n];
      });
      console.log({ validationsForSetFields,validations, value, format, messages })
      if (validationsForSetFields.length > 0 && validateOn !== 'submit') {
        const [errors, infos] = validateForm(
          validationsForSetFields,
          value,
          format,
          messages,
        );
        console.log({ errors, infos })
        filterErrorValidations(errors);
        filterInfoValidations(infos);

        const nextValidationResults = {
          errors,
          infos,
          valid: buildValid(errors),
        };
        if (onValidate) onValidate(nextValidationResults);
        setValidationResults(nextValidationResults);
      }
      // We only want to run this for the value we have on initial mount.
      // We don't want subsequent changes to the value to re-run this.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Currently, onBlur validation will trigger after a timeout of 120ms.
    useEffect(() => {
      const timer = setTimeout(() => {
        if (pendingValidation) {
          // run validations on the pending one and any other touched fields
          const [validatedErrors, validatedInfos] = validateForm(
            Object.entries(validations.current).filter(
              ([n]) => touched[n] || pendingValidation.includes(n),
            ),
            value,
            format,
            messages,
          );
          setPendingValidation(undefined);

          setValidationResults((prevValidationResults) => {
            // keep any previous errors and infos for untouched keys,
            // these may have come from a submit
            const nextErrors = {
              ...prevValidationResults.errors,
              ...validatedErrors,
            };
            const nextInfos = {
              ...prevValidationResults.infos,
              ...validatedInfos,
            };

            filterErrorValidations(nextErrors);
            filterInfoValidations(nextInfos);

            const nextValidationResults = {
              errors: nextErrors,
              infos: nextInfos,
              valid: buildValid(nextErrors),
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
    }, [
      buildValid,
      format,
      messages,
      pendingValidation,
      onValidate,
      touched,
      value,
      requiredFields,
    ]);

    // clear any errors when value changes
    useEffect(() => {
      if (validateOn !== 'change') setPendingValidation(undefined);
      setValidationResults((prevValidationResults) => {
        const [nextErrors, nextInfos] = validateForm(
          Object.entries(validations.current).filter(
            ([n]) =>
              prevValidationResults.errors[n] || prevValidationResults.infos[n],
          ),
          value,
          format,
          messages,
        );
        return {
          errors: { ...prevValidationResults.errors, ...nextErrors },
          infos: { ...prevValidationResults.infos, ...nextInfos },
        };
      });
    }, [format, messages, touched, validateOn, value]);

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
    const useFormInput = ({
      name,
      value: componentValue,
      initialValue,
      validate: validateArg,
    }) => {
      const [inputValue, setInputValue] = useState(initialValue);
      // let formValue = name ? value[name] : undefined;
      let formValue;
      if (name) {
        const isArrayField = stringToArray(name);
        if (isArrayField) {
          const { indexOfArray, arrayName, arrayObjName } = isArrayField;
          if (arrayName in value) {
            formValue = value[arrayName][indexOfArray][arrayObjName];
          }
        } else {
          formValue = value[name];
        }
      }
      // for dynamic forms, we need to track when an input has been added to
      // the form value. if the input is unmounted, we will delete its key/value
      // from the form value.
      const keyCreated = useRef(false);

      // This effect is for pattern #2, where the controlled input
      // component is driving the value via componentValue.
      useEffect(() => {
        // console.log('Before if I am called 1', 
        //   {name, componentValue, formValue}, name && componentValue !== undefined && componentValue !== formValue
        //   )
        if (
          name && // we have somewhere to put this
          componentValue !== undefined && // input driving
          componentValue !== formValue // don't already have it
        ) {
          console.log('I am called 1', 
          {name, componentValue, formValue}, name && componentValue !== undefined && componentValue !== formValue
          )
          setValueState((prevValue) => {
            const nextValue = { ...prevValue };
            const isArrayField = stringToArray(name);
            if (isArrayField) {
              const { indexOfArray, arrayName, arrayObjName } = isArrayField;
              setArrayOfFormFields((prevValue) => {
                if (!prevValue[arrayName]) {
                  prevValue[arrayName] = [];
                  prevValue[arrayName][indexOfArray] = {
                    [arrayObjName]: componentValue
                  };
                } else if (!prevValue[arrayName][indexOfArray]) {
                  prevValue[arrayName][indexOfArray] = {
                    [arrayObjName]: componentValue
                  }
                } else {
                  prevValue[arrayName][indexOfArray][arrayObjName] = componentValue;
                }
                nextValue[arrayName] = prevValue[arrayName];
                return prevValue;
              })
            } else {
              nextValue[name] = componentValue;
            }
            return nextValue;
          });
          // don't onChange on programmatic changes
        }
      }, [componentValue, formValue, name]);

      // on unmount, if the form is uncontrolled, remove the key/value
      // from the form value
      useEffect(
        () => () => {
          if (keyCreated.current) {
            keyCreated.current = false;
            console.log('I am called 2')
            setValueState((prevValue) => {
              const nextValue = { ...prevValue };
              const isArrayField = stringToArray(name);
              if (isArrayField) {
                const { arrayName } = isArrayField;
                delete nextValue[arrayName]
              } else {
                delete nextValue[name];
              }
              return nextValue;
            });
          }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [], // only run onmount and unmount
      );

      useEffect(() => {
        if (validateArg) {
          console.log({ validateArg })
          if (!validations.current[name]) {
            validations.current[name] = {};
          }
          validations.current[name].input = validateName(validateArg);
          return () => delete validations.current[name].input;
        }
        return undefined;
      }, [validateArg, name]);

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
        (nextComponentValue) => {
          if (name) {
            // we have somewhere to put this
            const nextTouched = { ...touched };
            nextTouched[name] = true;

            if (!touched[name]) {
              // don't update if not needed
              setTouched(nextTouched);
            }

            const nextValue = { ...value };
            // if nextValue doesn't have a key for name, this must be
            // uncontrolled form. we will flag this field was added so
            // we know to remove its value from the form if it is dynamically
            // removed
            if (!(name in nextValue)) keyCreated.current = true;
            const isArrayField = stringToArray(name);
            if (isArrayField) {
              const { indexOfArray, arrayName, arrayObjName } = isArrayField;
              setArrayOfFormFields((prevValue) => {
                // console.log('Before ', prevValue)
                if (!prevValue[arrayName]) {
                  prevValue[arrayName] = [];
                  prevValue[arrayName][indexOfArray] = {
                    [arrayObjName]: nextComponentValue
                  };
                } else if (!prevValue[arrayName][indexOfArray]) {
                  prevValue[arrayName][indexOfArray] = {
                    [arrayObjName]: nextComponentValue
                  }
                } else {
                  prevValue[arrayName][indexOfArray][arrayObjName] = nextComponentValue;
                }
                // delete nextValue[name];
                nextValue[arrayName] = prevValue[arrayName];
                console.log('After ', { prevValue, nextComponentValue })
                return prevValue;
              })
            } else {
              nextValue[name] = nextComponentValue;
            }
            // console.log({ name, nextComponentValue, initialValue, nextValue, inputValue, nextTouched })
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
      disabled,
      validate: validateArg,
    }) => {
      const error = disabled
        ? undefined
        : errorArg || validationResults.errors[name];
      const info = infoArg || validationResults.infos[name];

      useEffect(() => {
        const index = requiredFields.current.indexOf(name);
        console.log({ index, name, requiredFields, required, validateArg, validateOn })
        if (required) {
          if (index === -1) requiredFields.current.push(name);
        } else if (index !== -1) requiredFields.current.splice(index, 1);

        if (validateArg || required) {
          if (!validations.current[name]) {
            validations.current[name] = {};
          }
          validations.current[name].field = validateName(validateArg, required);
          return () => delete validations.current[name].field;
        }

        return undefined;
      }, [error, name, required, validateArg, disabled]);

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
        onReset={(event) => {
          setPendingValidation(undefined);
          if (!valueProp) {
            console.log('I am called 3')
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
        onSubmit={(event) => {
          // Don't submit the form via browser form action. We don't want it
          // if the validation fails. And, we assume a javascript action handler
          // otherwise.
          event.preventDefault();
          setPendingValidation(undefined);
          const [nextErrors, nextInfos] = validateForm(
            Object.entries(validations.current),
            value,
            format,
            messages,
            true,
          );

          setValidationResults(() => {
            const nextValidationResults = {
              errors: nextErrors,
              infos: nextInfos,
              // Show form's validity when clicking on Submit
              valid: buildValid(nextErrors),
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
Form.propTypes = FormPropTypes;

export { Form };
