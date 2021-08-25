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

const defaultValue = {};
const defaultTouched = {};
const defaultValidationResults = {
  errors: {},
  infos: {},
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
    const nameValue = formValue[name];
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
      // This is the onValidate function we made for example
      result = input(name, formValue, format, messages);
    }
    if (field && !result) {
      result = field(name, formValue, format, messages);
    }
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
    const value = useMemo(
      () => valueProp || valueState,
      [valueProp, valueState],
    );
    const [touched, setTouched] = useState(defaultTouched);
    const [validationResults, setValidationResults] = useState(
      defaultValidationResults,
    );

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
      const nextErrors = errors;
      return Object.keys(nextErrors)
        .filter((n) => !validations.current[n] || nextErrors[n] === undefined)
        .forEach((n) => delete nextErrors[n]);
    };

    // Remove any infos that we don't have any validations for anymore.
    const filterInfoValidations = (infos) => {
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
      ).filter(([n]) => value[n]);

      if (validationsForSetFields.length > 0 && validateOn !== 'submit') {
        const [errors, infos] = validateForm(
          validationsForSetFields,
          value,
          format,
          messages,
        );

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
    const useFormInput = ({
      name,
      value: componentValue,
      initialValue,
      validate: validateArg,
    }) => {
      const [inputValue, setInputValue] = useState(initialValue);
      const formValue = name ? value[name] : undefined;
      // for dynamic forms, we need to track when an input has been added to
      // the form value. if the input is unmounted, we will delete its key/value
      // from the form value.
      const keyCreated = useRef(false);

      // This effect is for pattern #2, where the controlled input
      // component is driving the value via componentValue.
      useEffect(() => {
        if (
          name && // we have somewhere to put this
          componentValue !== undefined && // input driving
          componentValue !== formValue // don't already have it
        ) {
          setValueState((prevValue) => {
            const nextValue = { ...prevValue };
            nextValue[name] = componentValue;
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
            setValueState((prevValue) => {
              const nextValue = { ...prevValue };
              delete nextValue[name];
              return nextValue;
            });
          }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [], // only run onmount and unmount
      );

      useEffect(() => {
        if (validateArg) {
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
        const index = requiredFields.current.indexOf(name);
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
        onReset={(event) => {
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

let FormDoc;
if (process.env.NODE_ENV !== 'production') {
  FormDoc = require('./doc').doc(Form); // eslint-disable-line global-require
}

const FormWrapper = FormDoc || Form;

export { FormWrapper as Form };
