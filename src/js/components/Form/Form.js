import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FormContext } from './FormContext';
import { ValidationPending } from './ValidationPending';

const defaultMessages = {
  invalid: 'invalid',
  required: 'required',
};
const defaultValue = {};
const defaultTouched = {};
const defaultValidators = {};
const defaultValidations = {};

const Form = forwardRef(
  (
    {
      children,
      errors: errorsProp,
      infos: infosProp,
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
    // valueState is where we keep our internal view of the value for this Form
    const [valueState, setValueState] = useState(valueProp || defaultValue);
    // value is the valueProp for controlled forms or valueState for
    // uncontrolled forms
    const value = useMemo(() => valueProp || valueState, [
      valueProp,
      valueState,
    ]);
    // touched is the fields that have touched since we started rendering
    const [touched, setTouched] = useState(defaultTouched);

    // validators contains the validate props from FormFields
    const [validators, setValidators] = useState(defaultValidators);
    // validations contains the results of running the validators
    const [validations, setValidations] = useState(defaultValidations);
    // aborts are for promises we are waiting to complete
    const aborts = useRef({});
    // pendingSubmit contains a submit event we are waiting to deliver
    // when validation is done
    const [pendingSubmit, setPendingSubmit] = useState();

    // reset validations when errors or infos props change
    useEffect(() => {
      if (errorsProp || infosProp) {
        // translate to how we store validations
        const nextValidations = {};
        if (errorsProp)
          Object.keys(errorsProp).forEach(name => {
            nextValidations[name] = { error: errorsProp[name] };
          });
        if (infosProp)
          Object.keys(infosProp).forEach(name => {
            if (!nextValidations[name]) nextValidations[name] = {};
            nextValidations[name].info = infosProp[name];
          });
        setValidations(nextValidations);
      }
    }, [errorsProp, infosProp]);

    const validateField = useCallback(
      name => {
        const resultToValidation = (validator, result) => {
          const message = result.message || result;
          const status = result.status || validator.status || 'error';
          return { [status]: message };
        };

        const validateOne = validator => {
          if (typeof validator === 'function') {
            if (aborts.current[name]) {
              const abort = aborts.current[name];
              delete aborts.current[name];
              abort();
            }
            const result = validator(value[name], value);
            if (result) {
              if (result.promise) {
                result.promise.then(delayedResult => {
                  delete aborts.current[name];
                  setValidations(previousValidations => {
                    const nextValidations = { ...previousValidations };
                    nextValidations[name] = resultToValidation(
                      validator,
                      delayedResult,
                    );
                    return nextValidations;
                  });
                });
                aborts.current[name] = result.abort;
                return { busy: true };
              }
              return resultToValidation(validator, result);
            }
            return undefined;
          }
          if (validator.regexp) {
            if (!validator.regexp.test(value[name])) {
              return resultToValidation(
                validator,
                validator.message || messages.invalid,
              );
            }
          }
          return undefined;
        };

        if (validators[name]) {
          const { required, validators: subValidators } = validators[name];

          if (
            required &&
            (value[name] === undefined ||
              value[name] === '' ||
              value[name] === false)
          )
            return { error: messages.required };
          if (subValidators) {
            let result;
            // run each validator until one returns something
            subValidators.some(validator => {
              result = validateOne(validator);
              return !!result;
            });
            return result;
          }
        }
        return undefined;
      },
      [messages, validators, value],
    );

    // Runs all validators.
    // returns undefined if any busy, true if no errors, false if errors
    const validateForm = useCallback(() => {
      const nextValidations = {};
      Object.keys(validators).forEach(name => {
        const result = validateField(name);
        if (result) nextValidations[name] = result;
      });
      setValidations(nextValidations);
      if (Object.values(nextValidations).filter(({ busy }) => busy).length)
        return undefined;
      return !Object.values(nextValidations).filter(({ error }) => error)
        .length;
    }, [validateField, validators]);

    // if validating on change or blur, validate any initial values on mount
    useEffect(() => {
      if (validateOn === 'change' || validateOn === 'blur') {
        const nextValidations = {};
        Object.keys(validators)
          .filter(name => value[name])
          .forEach(name => {
            const result = validateField(name);
            if (result) nextValidations[name] = result;
          });
        setValidations(nextValidations);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const haveRequired = useMemo(
      () =>
        !Object.keys(validators).some(
          name =>
            // return true for first invalid field
            validators[name].required &&
            (value[name] === undefined ||
              value[name] === '' ||
              value[name] === false),
        ),
      [validators, value],
    );

    const errorValidations = useMemo(
      () => !!Object.values(validations).filter(({ error }) => error).length,
      [validations],
    );

    const busyValidations = useMemo(
      () => !!Object.values(validations).filter(({ busy }) => busy).length,
      [validations],
    );

    const valid = useMemo(
      () => haveRequired && !errorValidations && !busyValidations,
      [haveRequired, errorValidations, busyValidations],
    );

    console.log('!!! render', valid, validations, validators);

    const [onValidateArg, setOnValidateArg] = useState();

    // update onValidateArg and deliver, if needed
    useEffect(() => {
      if (onValidate && (Object.keys(validators).length || onValidateArg)) {
        const nextValidateArg = { errors: {}, infos: {}, valid };
        Object.keys(validations).forEach(name => {
          const { error, info } = validations[name];
          if (error) nextValidateArg.errors[name] = error;
          if (info) nextValidateArg.infos[name] = info;
        });
        console.log('!!! check', nextValidateArg);
        if (
          !onValidateArg ||
          nextValidateArg.valid !== onValidateArg.valid ||
          Object.keys(nextValidateArg.errors).length !==
            Object.keys(onValidateArg.errors).length ||
          Object.keys(nextValidateArg.infos).length !==
            Object.keys(onValidateArg.infos).length
        ) {
          setOnValidateArg(nextValidateArg);
          console.log('!!! deliver', nextValidateArg);
          onValidate(nextValidateArg);
        }
      }
    }, [onValidate, onValidateArg, valid, validations, validators]);

    const deliverSubmit = useCallback(
      event => {
        const adjustedEvent = event;
        adjustedEvent.value = value;
        adjustedEvent.touched = touched;
        onSubmit(event);
      },
      [onSubmit, touched, value],
    );

    // deliver onSubmit if we were waiting for validations
    useEffect(() => {
      if (pendingSubmit) {
        if (valid) {
          deliverSubmit(pendingSubmit);
          onSubmit(pendingSubmit);
          setPendingSubmit(undefined);
        } else if (errorValidations) setPendingSubmit(undefined);
      }
    }, [deliverSubmit, errorValidations, onSubmit, pendingSubmit, valid]);

    // There are three basic patterns of handling form input value state:
    //
    // 1 - form controlled
    //
    // In this model, the caller sets `value` and `onChange` properties
    // on the Form component to supply the values used by the input fields.
    // In useFormInput(), componentValue would be undefined and formValue
    // is be set to whatever the form state has. Whenever the form state
    // changes, we update the inputValue so the input component will use
    // that. When the input component changes, we will call setValueState() to
    // update the form state.
    //
    // 2 - input controlled
    //
    // In this model, the caller sets `value` and `onChange` properties
    // on the input components, like TextInput, to supply the value for it.
    // In useFormInput(), componentValue is this value and we ensure to
    // update the form state, via setValueState(), and set the inputValue from
    // the componentValue. When the input component changes, we will
    // call setValueState() to update the form state.
    //
    // 3 - uncontrolled
    //
    // In this model, the caller doesn't set a `value` or `onChange` property
    // at either the form or input component levels.
    // In useFormInput(), componentValue is undefined and valueProp is
    // undefined and nothing much happens here. That is, unless the
    // calling component needs to know the state in order to work, such
    // as CheckBox or Select. In this case, those components supply
    // an initialValue, which will trigger updating the inputValue so
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
      const [pending, setPending] = useState();
      const error = errorArg || (validations[name] && validations[name].error);
      const info = infoArg || (validations[name] && validations[name].info);
      const busy = validations[name] && validations[name].busy;

      useEffect(() => {
        setValidators(previousValidators => {
          const nextValidators = { ...previousValidators };
          if (errorArg || (!validateArg && !required))
            delete nextValidators[name];
          else {
            nextValidators[name] = {};
            if (required) nextValidators[name].required = required;
            if (validateArg)
              nextValidators[name].validators = Array.isArray(validateArg)
                ? validateArg
                : [validateArg];
          }
          return nextValidators;
        });
      }, [errorArg, name, required, validateArg]);

      // remove any validator on unmount
      useEffect(() => () => {
        console.log('!!! remove', name);
        setValidators(previousValidators => {
          const nextValidators = { ...previousValidators };
          delete nextValidators[name];
          return nextValidators;
        });
      }, [name]);

      useEffect(() => {
        // when onBlur input validation is triggered, we need to complete any
        // potential click events before running the onBlur validation.
        // otherwise, click events like reset, etc. may not be registered.
        // for a detailed scenario/discussion,
        // see: https://github.com/grommet/grommet/issues/4863
        if (pending) {
          // A timeout is needed to ensure that a click event (like one on
          // a reset button) completes prior to running the validation.
          // Without a timeout, the blur will always complete and trigger
          // a validation prematurely.
          // The following values have been empirically tested, but 120 was
          // selected because it is the largest value
          // Chrome: 100, Safari: 120, Firefox: 80
          const timer = setTimeout(() => {
            setValidations(previousValidations => {
              const nextValidations = { ...previousValidations };
              const result = validateField(name);
              if (result) nextValidations[name] = result;
              else delete nextValidations[name];
              return nextValidations;
            });
            setPending(false);
          }, 120);
          return () => clearTimeout(timer);
        }
        return undefined;
      }, [name, pending]);

      return {
        error: busy ? <ValidationPending /> : error,
        info,
        inForm: true,
        onBlur:
          validateOn === 'blur' && !pending
            ? () => setPending(true) // delay to avoid preventing button click
            : undefined,
        onChange:
          (validateOn === 'change' || error) && !pending
            ? () => setPending(true) // delay to debounce
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
            if (onChange) onChange(defaultValue, { touched: defaultTouched });
          }
          setTouched(defaultTouched);
          setValidations(defaultValidations);

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

          const canSubmit = validateOn === 'submit' ? validateForm() : valid;

          if (onSubmit) {
            event.persist(); // extract from React's synthetic event pool
            if (canSubmit === true) deliverSubmit(event);
            else setPendingSubmit(event);
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
