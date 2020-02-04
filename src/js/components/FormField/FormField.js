import React, {
  Children,
  cloneElement,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import styled, { ThemeContext } from 'styled-components';

import { parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { CheckBox } from '../CheckBox';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { FormContext } from '../Form/FormContext';

const grommetInputNames = ['TextInput', 'Select', 'MaskedInput', 'TextArea'];
const grommetInputPadNames = ['CheckBox', 'RadioButtonGroup', 'RangeInput'];

const validateField = (required, validate, messages) => (value, data) => {
  let error;
  if (required && (value === undefined || value === '')) {
    error = messages.required;
  } else if (validate) {
    if (Array.isArray(validate)) {
      validate.some(oneValidate => {
        error = validateField(false, oneValidate, messages)(value, data);
        return !!error;
      });
    } else if (typeof validate === 'function') {
      error = validate(value, data);
    } else if (validate.regexp) {
      if (!validate.regexp.test(value)) {
        error = validate.message || messages.invalid;
      }
    }
  }
  return error;
};

const FormFieldBox = styled(Box)`
  ${props => props.theme.formField && props.theme.formField.extend}
`;

const FormField = forwardRef(
  (
    {
      checked,
      children,
      className,
      component,
      disabled,
      error,
      help,
      htmlFor,
      label,
      margin,
      name,
      onBlur,
      onFocus,
      pad,
      required,
      style,
      validate,
      value: valueProp,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext);
    const context = useContext(FormContext);
    const [value, setValue] = useState(valueProp);
    useEffect(() => setValue(valueProp), [valueProp]);

    useEffect(() => {
      if (
        context &&
        context.value[name] === undefined &&
        (value !== undefined || checked !== undefined)
      ) {
        context.update(
          name,
          value !== undefined ? value : checked,
          undefined,
          true,
        );
      }
    });

    const [focus, setFocus] = useState();

    const renderInput = (formValue, invalid) => {
      const Input = component || TextInput;
      if (Input === CheckBox) {
        return (
          <Input
            name={name}
            label={label}
            checked={
              formValue[name] !== undefined ? formValue[name] : checked || false
            }
            aria-invalid={invalid || undefined}
            {...rest}
          />
        );
      }
      return (
        <Input
          name={name}
          value={
            formValue[name] !== undefined ? formValue[name] : valueProp || ''
          }
          plain
          focusIndicator={false}
          aria-invalid={invalid || undefined}
          {...rest}
        />
      );
    };

    const { formField } = theme;
    const { border } = formField;

    let normalizedError = error;
    // This is here for backwards compatibility. In case the child is a grommet
    // input component, set plain and focusIndicator props, if they aren't
    // already set.
    let wantContentPad =
      component && (component === CheckBox || component === RadioButtonGroup);
    let contents =
      (border &&
        children &&
        Children.map(children, child => {
          if (
            child &&
            child.type &&
            grommetInputPadNames.indexOf(child.type.displayName) !== -1
          ) {
            wantContentPad = true;
          }
          if (
            child &&
            child.type &&
            grommetInputNames.indexOf(child.type.displayName) !== -1 &&
            child.props.plain === undefined &&
            child.props.focusIndicator === undefined
          ) {
            return cloneElement(child, {
              plain: true,
              focusIndicator: false,
            });
          }
          return child;
        })) ||
      children;

    let onFieldBlur;
    if (context) {
      const {
        addValidation,
        errors,
        onBlur: onContextBlur,
        value: formValue,
        messages,
      } = context;
      addValidation(name, validateField(required, validate, messages));
      normalizedError = error || errors[name];
      contents = contents || renderInput(formValue, !!normalizedError);
      if (onContextBlur) {
        onFieldBlur = () => onContextBlur(name);
      }
    }

    const contentProps = pad || wantContentPad ? { ...formField.content } : {};
    if (border.position === 'inner') {
      if (normalizedError && formField.error) {
        contentProps.background = formField.error.background;
      } else if (disabled && formField.disabled) {
        contentProps.background = formField.disabled.background;
      }
    }
    contents = <Box {...contentProps}>{contents}</Box>;

    let borderColor;
    if (focus && !normalizedError) {
      borderColor = 'focus';
    } else if (normalizedError) {
      borderColor = (border && border.error.color) || 'status-critical';
    } else {
      borderColor = (border && border.color) || 'border';
    }
    let abut;
    let abutMargin;
    let outerStyle = style;

    if (border) {
      contents = (
        <Box
          border={
            border.position === 'inner'
              ? {
                  ...border,
                  side: border.side || 'bottom',
                  color: borderColor,
                }
              : undefined
          }
        >
          {contents}
        </Box>
      );

      const mergedMargin = margin || formField.margin;
      abut =
        border.position === 'outer' &&
        (border.side === 'all' ||
          border.side === 'horizontal' ||
          !border.side) &&
        !(
          mergedMargin &&
          ((typeof mergedMargin === 'string' && mergedMargin !== 'none') ||
            (mergedMargin.bottom && mergedMargin.bottom !== 'none') ||
            (mergedMargin.horizontal && mergedMargin.horizontal !== 'none'))
        );
      if (abut) {
        // marginBottom is set to overlap adjacent fields
        abutMargin = { bottom: '-1px' };
        if (margin) {
          abutMargin = margin;
        } else if (border.size) {
          // if the user defines a margin,
          // then the default margin below will be overriden
          abutMargin = {
            bottom: `-${parseMetricToNum(
              theme.global.borderSize[border.size] || border.size,
            )}px`,
          };
        }

        outerStyle = {
          position: focus ? 'relative' : undefined,
          zIndex: focus ? 10 : undefined,
          ...style,
        };
      }
    }

    let outerBackground;
    if (border.position === 'outer') {
      if (normalizedError && formField.error) {
        outerBackground = formField.error.background;
      } else if (disabled && formField.disabled) {
        outerBackground = formField.disabled.background;
      }
    }

    return (
      <FormFieldBox
        ref={ref}
        className={className}
        border={
          border && border.position === 'outer'
            ? { ...border, color: borderColor }
            : undefined
        }
        background={outerBackground}
        margin={abut ? abutMargin : margin || { ...formField.margin }}
        style={outerStyle}
        onFocus={event => {
          setFocus(true);
          if (onFocus) onFocus(event);
        }}
        onBlur={event => {
          setFocus(false);
          if (onFieldBlur) onFieldBlur(event);
          if (onBlur) onBlur(event);
        }}
      >
        {(label && component !== CheckBox) || help ? (
          <>
            {label && component !== CheckBox && (
              <Text as="label" htmlFor={htmlFor} {...formField.label}>
                {label}
              </Text>
            )}
            {help && (
              <Text
                {...formField.help}
                color={formField.help.color[theme.dark ? 'dark' : 'light']}
              >
                {help}
              </Text>
            )}
          </>
        ) : (
          undefined
        )}
        {contents}
        {normalizedError && (
          <Text
            {...formField.error}
            color={formField.error.color[theme.dark ? 'dark' : 'light']}
          >
            {normalizedError}
          </Text>
        )}
      </FormFieldBox>
    );
  },
);

FormField.displayName = 'FormField';

let FormFieldDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  FormFieldDoc = require('./doc').doc(FormField);
}
const FormFieldWrapper = FormFieldDoc || FormField;

export { FormFieldWrapper as FormField };
