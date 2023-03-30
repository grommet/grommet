import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAnalytics } from '../../contexts';
import { MessageContext } from '../../contexts/MessageContext';
import { useForwardedRef } from '../../utils';

import { FormContext } from './FormContext';
import { FormPropTypes } from './propTypes';

const defaultValue = {};
const defaultTouched = {};
const defaultValidationResults = {
  errors: {},
  infos: {},
};

const stringToArray = (string) => {
  const match = string?.match(/^(.+)\[([0-9]+)\]\.(.*)$/);
  if (match) {
    const [, arrayName, indexOfArray, arrayObjName] = match;
    return {
      indexOfArray,
      arrayName,
      arrayObjName,
    };
  }
  return undefined;
};

const getValueAt = (valueObject, pathArg) => {
  if (valueObject === undefined) return undefined;
  const path = Array.isArray(pathArg) ? pathArg : pathArg.split('.');
  if (path.length === 1) return valueObject[path];
  return getValueAt(valueObject[path.shift()], path);
};

const setValueAt = (valueObject, pathArg, value) => {
  const object = valueObject;
  const path = Array.isArray(pathArg) ? pathArg : pathArg.split('.');
  if (path.length === 1) object[path] = value;
  else {
    const key = path.shift();
    if (!object[key]) object[key] = {};
    setValueAt(object[key], path, value);
  }
};

const getFieldValue = (name, value) => {
  const isArrayField = stringToArray(name);
  if (isArrayField) {
    const { indexOfArray, arrayName, arrayObjName } = isArrayField;
    const obj = value[arrayName]?.[indexOfArray];
    return arrayObjName ? obj?.[arrayObjName] : obj;
  }
  return getValueAt(value, name);
};

const setFieldValue = (name, componentValue, prevValue) => {
  const nextValue = { ...prevValue };
  const isArrayField = stringToArray(name);
  if (isArrayField) {
    const { indexOfArray, arrayName, arrayObjName } = isArrayField;
    if (!nextValue[arrayName]) nextValue[arrayName] = [];
    if (arrayObjName) {
      if (!nextValue[arrayName][indexOfArray])
        nextValue[arrayName][indexOfArray] = {
          [arrayObjName]: componentValue,
        };
      nextValue[arrayName][indexOfArray][arrayObjName] = componentValue;
    } else nextValue[arrayName][indexOfArray] = componentValue;
  } else {
    setValueAt(nextValue, name, componentValue);
  }
  return nextValue;
};

// Apply validation rule to field value and send correct messaging.
const validate = (rule, fieldValue, formValue, format, messages) => {
  let result;
  if (typeof rule === 'function') {
    result = rule(fieldValue, formValue);
  } else if (rule.regexp) {
    if (!rule.regexp.test(fieldValue)) {
      result = rule.message || format({ id: 'form.invalid', messages });
      if (rule.status) {
        result = { message: result, status: rule.status };
      }
    }
  }
  return result;
};

// Validates particular key in formValue
const validateName =
  (validationRules, required) => (name, formValue, format, messages) => {
    const fieldValue = getFieldValue(name, formValue);
    let validationResult;

    if (
      required &&
      // false is for CheckBox
      (fieldValue === undefined ||
        fieldValue === '' ||
        fieldValue === false ||
        (Array.isArray(fieldValue) && !fieldValue.length))
    ) {
      validationResult = format({ id: 'form.required', messages });
    } else if (validationRules) {
      if (Array.isArray(validationRules)) {
        validationRules.some((rule) => {
          validationResult = validate(
            rule,
            fieldValue,
            formValue,
            format,
            messages,
          );
          return !!validationResult;
        });
      } else {
        validationResult = validate(
          validationRules,
          fieldValue,
          formValue,
          format,
          messages,
        );
      }
    }
    return validationResult;
  };

// Validates all keys in formValue
const validateForm = (
  validationRules,
  formValue,
  format,
  messages,
  omitValid,
) => {
  const nextErrors = {};
  const nextInfos = {};
  validationRules.forEach(([name, { field, input, validateOn }]) => {
    if (!omitValid) {
      nextErrors[name] = undefined;
      nextInfos[name] = undefined;
    }
    if (!validateOn) return;
    let result;
    if (input) {
      // input() a validation function supplied through useFormInput()
      result = input(name, formValue, format, messages);
    }
    if (field && !result) {
      // field() a validation function supplied through useFormField()
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

const isInstantValidate = (validateOn) =>
  ['blur', 'change'].includes(validateOn);

const Form = forwardRef(
  (
    {
      children,
      errors: errorsProp = defaultValidationResults.errors,
      infos: infosProp = defaultValidationResults.infos,
      messages,
      kind,
      onChange,
      onReset,
      onSubmit,
      onValidate,
      validate: validateOnProp = 'submit',
      value: valueProp,
      ...rest
    },
    ref,
  ) => {
    const formRef = useForwardedRef(ref);
    const { format } = useContext(MessageContext);
    const [valueState, setValueState] = useState(valueProp || defaultValue);
    const value = useMemo(
      () => valueProp || valueState,
      [valueProp, valueState],
    );
    const [touched, setTouched] = useState(defaultTouched);
    const [validateOn, setValidateOn] = useState(validateOnProp);
    const [validationResults, setValidationResults] = useState({
      errors: errorsProp,
      infos: infosProp,
    });
    // maintain a copy of validationResults in a ref for useEffects
    // which can't depend on validationResults directly without
    // causing infinite renders.
    const validationResultsRef = useRef({});
    // Simulated onMount state. Consider Form to be mounted once it has
    // accounted for values originating from controlled inputs (available
    // at second rendering).
    const [mounted, setMounted] = useState('unmounted');
    useEffect(() => {
      if (!mounted) setMounted('mounting');
      else if (mounted === 'mounting') setMounted('mounted');
    }, [mounted]);
    // `pendingValidation` is the name of the FormField awaiting validation.
    const [pendingValidation, setPendingValidation] = useState(undefined);

    const validationRulesRef = useRef({});
    const requiredFields = useRef([]);
    const analyticsRef = useRef({ start: new Date(), errors: {} });

    const sendAnalytics = useAnalytics();

    const buildValid = useCallback(
      (nextErrors) => {
        let valid = false;
        valid = requiredFields.current
          .filter((n) => Object.keys(validationRulesRef.current).includes(n))
          .every(
            (field) =>
              value[field] && (value[field] !== '' || value[field] !== false),
          );

        if (Object.keys(nextErrors).length > 0) valid = false;
        return valid;
      },
      [value],
    );

    // Only keep validation results for current form fields. In the case of a
    // dynamic form, a field possessing an error may have been removed from the
    // form; need to clean up any previous related validation results.
    const filterRemovedFields = (prevValidations) => {
      const nextValidations = prevValidations;
      return Object.keys(nextValidations)
        .filter(
          (n) =>
            !validationRulesRef.current[n] || nextValidations[n] === undefined,
        )
        .forEach((n) => delete nextValidations[n]);
    };

    const updateAnalytics = () => {
      const errorFields = Object.keys(validationResultsRef.current?.errors);
      const errorCounts = analyticsRef.current.errors;

      if (errorFields.length > 0) {
        errorFields.forEach((key) => {
          errorCounts[key] = (errorCounts[key] || 0) + 1;
        });
      }
    };

    const applyValidationRules = useCallback(
      (validationRules) => {
        const [validatedErrors, validatedInfos] = validateForm(
          validationRules,
          value,
          format,
          messages,
        );

        setValidationResults((prevValidationResults) => {
          // Keep any previous errors and infos for untouched keys,
          // these may have come from a Submit.
          const nextErrors = {
            ...prevValidationResults.errors,
            ...validatedErrors,
          };
          const nextInfos = {
            ...prevValidationResults.infos,
            ...validatedInfos,
          };
          // Remove previous errors and infos for keys no longer in the
          // form, these may have been fields removed from a dynamic form.
          filterRemovedFields(nextErrors);
          filterRemovedFields(nextInfos);
          const nextValidationResults = {
            errors: nextErrors,
            infos: nextInfos,
          };
          if (onValidate)
            onValidate({
              ...nextValidationResults,
              valid: buildValid(nextErrors),
            });
          validationResultsRef.current = nextValidationResults;
          updateAnalytics();
          return nextValidationResults;
        });
      },
      [buildValid, format, messages, onValidate, value],
    );

    // Validate all fields holding values onMount if set to
    // validate when blur or change.
    useEffect(() => {
      const validationRules = Object.entries(validationRulesRef.current);
      // Use simulated onMount state to account for values provided by
      // controlled inputs.
      if (
        mounted !== 'mounted' &&
        (isInstantValidate(validateOn) ||
          validationRules.some(([, v]) => isInstantValidate(v.validateOn))) &&
        Object.keys(value).length > 0 &&
        Object.keys(touched).length === 0
      ) {
        applyValidationRules(
          validationRules
            .filter(([n, v]) => getFieldValue(n, value) && v.validateOn)
            // Exlude empty arrays which may be initial values in
            // an input such as DateInput.
            .filter(
              ([n]) =>
                !(
                  Array.isArray(getFieldValue(n, value)) &&
                  getFieldValue(n, value).length === 0
                ),
            ),
        );
      }
    }, [applyValidationRules, mounted, touched, validateOn, value]);

    // Run validation against fields with pendingValidations from onBlur
    // and/or onChange.
    useEffect(() => {
      const validationRules = Object.entries(validationRulesRef.current);
      const timer = setTimeout(() => {
        if (
          pendingValidation &&
          (isInstantValidate(validateOn) ||
            validationRules.some(([, v]) => isInstantValidate(v.validateOn)))
        ) {
          applyValidationRules(
            validationRules.filter(
              ([n, v]) =>
                (touched[n] || pendingValidation.includes(n)) && v.validateOn,
            ),
          );
          setPendingValidation(undefined);
        }
        // Complete any potential click events before running onBlur validation.
        // Otherwise, click events like reset, etc. may not be registered. For a
        // detailed scenario/discussion, see: https://github.com/grommet/grommet/issues/4863
        // Values empirically tested; 120 was selected because it is the largest
        // Chrome: 100, Safari: 120, Firefox: 80
      }, 120);
      return () => clearTimeout(timer);
    }, [applyValidationRules, pendingValidation, touched, validateOn]);

    // Re-run validation rules for all fields with prior errors.
    // if validate=blur this helps re-validate if there are errors
    // as the user fixes them (basically act like validate=change for that)
    useEffect(() => {
      const validationRules = Object.entries(validationRulesRef.current);
      if (
        validationResultsRef.current?.errors &&
        Object.keys(validationResultsRef.current.errors).length > 0
      ) {
        applyValidationRules(
          validationRules.filter(
            ([n]) => touched[n] && validationResultsRef.current.errors[n],
          ),
        );
      }
    }, [applyValidationRules, touched]);

    useEffect(() => {
      const element = formRef.current;
      analyticsRef.current = { start: new Date(), errors: {} };
      sendAnalytics({
        type: 'formOpen',
        element,
      });
      return () => {
        if (!analyticsRef.current.submitted) {
          sendAnalytics({
            type: 'formClose',
            element,
            errors: analyticsRef.current.errors,
            elapsed:
              new Date().getTime() - analyticsRef.current.start.getTime(),
          });
        }
      };
    }, [sendAnalytics, formRef]);

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
    const formContextValue = useMemo(() => {
      const useFormInput = ({
        name,
        value: componentValue,
        initialValue,
        validate: validateArg,
      }) => {
        const [inputValue, setInputValue] = useState(initialValue);
        const formValue = name ? getFieldValue(name, value) : undefined;
        // for dynamic forms, we need to track when an input has been added to
        // the form value. if the input is unmounted, we will delete its
        // key/value from the form value.
        const keyCreated = useRef(false);

        // This effect is for pattern #2, where the controlled input
        // component is driving the value via componentValue.
        useEffect(() => {
          if (
            name && // we have somewhere to put this
            componentValue !== undefined && // input driving
            componentValue !== formValue // don't already have it
          ) {
            setValueState((prevValue) =>
              setFieldValue(name, componentValue, prevValue),
            );
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
                const isArrayField = stringToArray(name);
                if (isArrayField) {
                  const { arrayName } = isArrayField;
                  delete nextValue[arrayName];
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

        // Create validation rules for fields
        useEffect(() => {
          if (validateArg) {
            if (!validationRulesRef.current[name]) {
              validationRulesRef.current[name] = {};
            }
            validationRulesRef.current[name].input = validateName(validateArg);
            return () => delete validationRulesRef.current[name].input;
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

              // if nextValue doesn't have a key for name, this must be
              // uncontrolled form. we will flag this field was added so
              // we know to remove its value from the form if it is dynamically
              // removed
              if (!(name in value)) keyCreated.current = true;
              const nextValue = setFieldValue(name, nextComponentValue, value);
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
        validateOn: validateOnArg,
      }) => {
        const error = disabled
          ? undefined
          : errorArg || validationResults.errors[name];
        const info = infoArg || validationResults.infos[name];

        useEffect(() => {
          setValidateOn((prevValues) => {
            if (typeof prevValues === 'string') {
              return { [name]: validateOnArg || validateOnProp };
            }
            return { ...prevValues, [name]: validateOnArg || validateOnProp };
          });
        }, [validateOnArg, name]);

        // Create validation rules for field
        useEffect(() => {
          const index = requiredFields.current.indexOf(name);
          if (required) {
            if (index === -1) requiredFields.current.push(name);
          } else if (index !== -1) requiredFields.current.splice(index, 1);

          if (validateArg || required) {
            if (!validationRulesRef.current[name]) {
              validationRulesRef.current[name] = {};
            }
            validationRulesRef.current[name].field = validateName(
              validateArg,
              required,
            );

            // priority is given to validateOn prop on formField, if it is
            // undefined, then we will use the validate prop value of Form.
            // The reason we don't want to add validateOn = "submit" here is
            // because we don't want to trigger validation of "submit" field
            // when the user is typing in the instant (blur, change)
            // validation fields.
            if (validateOnArg && validateOnArg !== 'submit') {
              validationRulesRef.current[name].validateOn = validateOnArg;
            } else if (!validateOnArg && validateOnProp !== 'submit') {
              validationRulesRef.current[name].validateOn = validateOnProp;
            }
            return () => {
              delete validationRulesRef.current[name].field;
              delete validationRulesRef.current[name].validateOn;
              const requiredFieldIndex = requiredFields.current.indexOf(name);
              if (requiredFieldIndex !== -1) {
                requiredFields.current.splice(requiredFieldIndex, 1);
              }
            };
          }

          return undefined;
        }, [error, name, required, validateArg, disabled, validateOnArg]);

        return {
          error,
          info,
          inForm: true,
          onBlur:
            validateOnArg === 'blur' || validateOn[name] === 'blur'
              ? () =>
                  setPendingValidation(
                    pendingValidation ? [...pendingValidation, name] : [name],
                  )
              : undefined,
          onChange:
            validateOnArg === 'change' || validateOn[name] === 'change'
              ? () =>
                  setPendingValidation(
                    pendingValidation ? [...pendingValidation, name] : [name],
                  )
              : undefined,
        };
      };

      return { useFormField, useFormInput, kind };
    }, [
      onChange,
      kind,
      pendingValidation,
      touched,
      validateOn,
      validationResults.errors,
      validationResults.infos,
      value,
      valueProp,
      validateOnProp,
    ]);

    return (
      <form
        ref={formRef}
        {...rest}
        onReset={(event) => {
          sendAnalytics({
            type: 'formReset',
            element: formRef.current,
            data: event,
            errors: analyticsRef.current.errors,
            elapsed:
              new Date().getTime() - analyticsRef.current.start.getTime(),
          });
          setPendingValidation(undefined);
          if (!valueProp) {
            setValueState(defaultValue);
            if (onChange) onChange(defaultValue, { touched: defaultTouched });
          }
          setTouched(defaultTouched);
          setValidationResults(defaultValidationResults);
          analyticsRef.current = { start: new Date(), errors: {} };
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
          // adding validateOn: "submit" prop to the undefined validateOn fields
          // as we want to trigger "submit" validation once form is submitted
          const newValidationRulesRef = Object.keys(
            validationRulesRef.current,
          ).reduce((acc, key) => {
            acc[key] = validationRulesRef.current[key];
            if (!acc[key].validateOn) {
              acc[key] = {
                ...validationRulesRef.current[key],
                validateOn: 'submit',
              };
            }
            return acc;
          }, {});

          const [nextErrors, nextInfos] = validateForm(
            Object.entries(newValidationRulesRef),
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
            validationResultsRef.current = nextValidationResults;
            updateAnalytics();
            return nextValidationResults;
          });

          if (Object.keys(nextErrors).length === 0 && onSubmit) {
            event.persist(); // extract from React's synthetic event pool
            const adjustedEvent = event;
            adjustedEvent.value = value;
            adjustedEvent.touched = touched;
            onSubmit(adjustedEvent);
            sendAnalytics({
              type: 'formSubmit',
              element: formRef.current,
              data: adjustedEvent,
              errors: analyticsRef.current.errors,
              elapsed:
                new Date().getTime() - analyticsRef.current.start.getTime(),
            });
            analyticsRef.current.errors = {};
            analyticsRef.current.submitted = true;
          }
        }}
      >
        <FormContext.Provider value={formContextValue}>
          {children}
        </FormContext.Provider>
      </form>
    );
  },
);

Form.displayName = 'Form';
Form.propTypes = FormPropTypes;

export { Form };
