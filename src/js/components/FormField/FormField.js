import React, {
  Children,
  cloneElement,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { CheckBox } from '../CheckBox';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { FormContext } from '../Form/FormContext';

const grommetInputNames = ['TextInput', 'Select', 'MaskedInput', 'TextArea'];
const grommetInputPadNames = ['CheckBox', 'RadioButtonGroup', 'RangeInput'];

const isGrommetInput = comp =>
  comp &&
  (grommetInputNames.indexOf(comp.displayName) !== -1 ||
    grommetInputPadNames.indexOf(comp.displayName) !== -1);

const FormFieldBox = styled(Box)`
  ${props => props.theme.formField && props.theme.formField.extend}
`;

const Message = ({ message, ...rest }) => {
  if (message) {
    if (typeof message === 'string') return <Text {...rest}>{message}</Text>;
    return <Box {...rest}>{message}</Box>;
  }
  return null;
};

const FormField = forwardRef(
  (
    {
      children,
      className,
      component,
      disabled, // pass through in renderInput()
      error,
      help,
      htmlFor,
      info,
      label,
      margin,
      name, // pass through in renderInput()
      onBlur,
      onFocus,
      pad,
      required, // pass through in renderInput()
      style,
      validate,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const context = useContext(FormContext);

    useEffect(() => {
      if (context && context.addValidation) {
        const { addValidation, messages, removeValidation } = context;

        const validateSingle = (aValidate, value2, data) => {
          let result;
          if (typeof aValidate === 'function') {
            result = aValidate(value2, data);
          } else if (validate.regexp) {
            if (!validate.regexp.test(value2)) {
              result = validate.message || messages.invalid;
              if (validate.status) {
                result = { message: error, status: validate.status };
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
          } else if (validate) {
            if (Array.isArray(validate)) {
              validate.some(aValidate => {
                result = validateSingle(aValidate, value2, data);
                return !!result;
              });
            } else {
              result = validateSingle(validate, value2, data);
            }
          }
          return result;
        };

        if (validate || required) {
          addValidation(name, validateField);
          return () => removeValidation(name, validateField);
        }
        removeValidation(name, validateField);
      }
      return undefined;
    }, [context, error, name, required, validate]);

    const [focus, setFocus] = useState();

    const renderInput = (formValue, invalid) => {
      const Input = component || TextInput;
      if (Input === CheckBox) {
        return (
          <Input
            name={name}
            label={label}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            {...rest}
          />
        );
      }
      return (
        <Input
          name={name}
          value={!isGrommetInput(component) ? formValue[name] : undefined}
          disabled={disabled}
          plain
          focusIndicator={false}
          aria-invalid={invalid || undefined}
          {...rest}
          onChange={
            // Grommet input components already check for FormContext
            // and, using their `name`, end up calling the context.update()
            // already. For custom components, we expect they will call
            // this onChange() and we'll call context.update() here, primarily
            // for backwards compatibility.
            isGrommetInput(component)
              ? rest.onChange
              : event => {
                  context.update(name, event.target.value);
                  if (rest.onChange) rest.onChange(event);
                }
          }
        />
      );
    };

    const { formField } = theme;
    const { border } = formField;

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

    let normalizedError = error;
    let normalizedInfo = info;
    let onFieldBlur;
    // put rest on container, unless we use renderInput()
    let containerRest = rest;
    if (context && context.addValidation) {
      const {
        errors,
        infos,
        onBlur: onContextBlur,
        value: formValue,
      } = context;
      normalizedError = error || errors[name];
      normalizedInfo = info || infos[name];
      if (!contents) containerRest = {};
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
          overflow="hidden"
          border={
            border.position === 'inner'
              ? {
                  ...border,
                  side: border.side || 'bottom',
                  color: borderColor,
                }
              : undefined
          }
          round={border.position === 'inner' ? formField.round : undefined}
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
        round={border.position === 'outer' ? formField.round : undefined}
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
        {...containerRest}
      >
        {(label && component !== CheckBox) || help ? (
          <>
            {label && component !== CheckBox && (
              <Text as="label" htmlFor={htmlFor} {...formField.label}>
                {label}
              </Text>
            )}
            <Message message={help} {...formField.help} />
          </>
        ) : (
          undefined
        )}
        {contents}
        <Message message={normalizedError} {...formField.error} />
        <Message message={normalizedInfo} {...formField.info} />
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
