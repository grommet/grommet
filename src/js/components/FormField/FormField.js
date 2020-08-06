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

import { focusStyle, parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { CheckBox } from '../CheckBox';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { FormContext } from '../Form/FormContext';
// import { Drop } from '../Drop';
// import { Button } from '../Button';
// import { Tooltip } from '../Tooltip';

const mnetInputNames = ['TextInput', 'Select', 'MaskedInput', 'TextArea'];
const mnetInputPadNames = [
  'CheckBox',
  'CheckBoxGroup',
  'RadioButtonGroup',
  'RangeInput',
];

const isMnetUIBaseInput = comp =>
  comp &&
  (mnetInputNames.indexOf(comp.displayName) !== -1 ||
    mnetInputPadNames.indexOf(comp.displayName) !== -1);

const FormFieldBox = styled(Box)`
  ${props => props.focus && focusStyle({ justBorder: true })}
  ${props => props.theme.formField && props.theme.formField.extend}
`;

const FormFieldContentBox = styled(Box)`
  ${props => props.focus && focusStyle({ justBorder: true })}
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
      direction = 'column',
      postfix,
      prefix,
      labelWidth = 0,
      width = 'auto',
      showBorder = true,
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
          value={!isMnetUIBaseInput(component) ? formValue[name] : undefined}
          disabled={disabled}
          plain
          focusIndicator={false}
          aria-invalid={invalid || undefined}
          {...rest}
          onChange={
            // MnetUIBase input components already check for FormContext
            // and, using their `name`, end up calling the context.update()
            // already. For custom components, we expect they will call
            // this onChange() and we'll call context.update() here, primarily
            // for backwards compatibility.
            isMnetUIBaseInput(component)
              ? rest.onChange
              : event => {
                  context.update(name, event.target.value);
                  if (rest.onChange) rest.onChange(event);
                }
          }
        />
      );
    };

    const { formField: formFieldTheme } = theme;
    const { border: themeBorder } = formFieldTheme;

    // This is here for backwards compatibility. In case the child is a mnet
    // input component, set plain and focusIndicator props, if they aren't
    // already set.
    let wantContentPad =
      component &&
      (component === CheckBox ||
        component === CheckBoxGroup ||
        component === RadioButtonGroup);

    let contents =
      (themeBorder &&
        children &&
        Children.map(children, child => {
          if (
            child &&
            child.type &&
            mnetInputPadNames.indexOf(child.type.displayName) !== -1
          ) {
            wantContentPad = true;
          }
          if (
            child &&
            child.type &&
            mnetInputNames.indexOf(child.type.displayName) !== -1 &&
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

    const contentProps =
      pad || wantContentPad ? { ...formFieldTheme.content } : {};
    if (themeBorder.position === 'inner') {
      if (normalizedError && formFieldTheme.error) {
        contentProps.background = formFieldTheme.error.background;
      } else if (disabled && formFieldTheme.disabled) {
        contentProps.background = formFieldTheme.disabled.background;
      }
    }
    contents = (
      <Box {...contentProps} width={width}>
        <Box direction="row">
          {prefix && (
            <Box {...formFieldTheme.prefix} style={{ wordBreak: 'normal' }}>
              {prefix}
            </Box>
          )}
          {contents}
          {postfix && (
            <Box {...formFieldTheme.postfix} style={{ wordBreak: 'normal' }}>
              {postfix}
            </Box>
          )}
        </Box>
      </Box>
    );

    let borderColor;

    if (
      disabled &&
      formFieldTheme.disabled.border &&
      formFieldTheme.disabled.border.color
    ) {
      borderColor = formFieldTheme.disabled.border.color;
    } else if (normalizedError && themeBorder && themeBorder.error.color) {
      borderColor = themeBorder.error.color || 'status-critical';
    } else if (
      focus &&
      formFieldTheme.focus &&
      formFieldTheme.focus.border &&
      formFieldTheme.focus.border.color
    ) {
      borderColor = formFieldTheme.focus.border.color;
    } else {
      borderColor = (themeBorder && themeBorder.color) || 'border';
    }

    const labelStyle = { ...formFieldTheme.label };

    if (disabled) {
      labelStyle.color =
        formFieldTheme.disabled && formFieldTheme.disabled.label
          ? formFieldTheme.disabled.label.color
          : labelStyle.color;
    }

    let abut;
    let abutMargin;
    let outerStyle = style;

    if (themeBorder) {
      const innerProps =
        themeBorder.position === 'inner'
          ? {
              border: {
                ...themeBorder,
                side: themeBorder.side || 'bottom',
                color: borderColor,
              },
              round: formFieldTheme.round,
              focus,
            }
          : {};
      contents = (
        <FormFieldContentBox overflow="hidden" {...(showBorder && innerProps)}>
          {contents}
        </FormFieldContentBox>
      );

      const mergedMargin = margin || formFieldTheme.margin;
      abut =
        themeBorder.position === 'outer' &&
        (themeBorder.side === 'all' ||
          themeBorder.side === 'horizontal' ||
          !themeBorder.side) &&
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
        } else if (themeBorder.size) {
          // if the user defines a margin,
          // then the default margin below will be overridden
          abutMargin = {
            bottom: `-${parseMetricToNum(
              theme.global.borderSize[themeBorder.size] || themeBorder.size,
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
    if (themeBorder.position === 'outer') {
      if (
        normalizedError &&
        formFieldTheme.error &&
        formFieldTheme.error.background
      ) {
        outerBackground = formFieldTheme.error.background;
      } else if (
        focus &&
        formFieldTheme.focus &&
        formFieldTheme.focus.background &&
        formFieldTheme.focus.background.color
      ) {
        outerBackground = formFieldTheme.focus.background.color;
      } else if (
        disabled &&
        formFieldTheme.disabled &&
        formFieldTheme.disabled.background
      ) {
        outerBackground = formFieldTheme.disabled.background;
      }
    }

    const layoutType =
      direction && direction === 'row'
        ? {
            flexDirection: direction,
            alignItems: 'center',
          }
        : { flexDirection: direction };

    const outerProps =
      themeBorder && themeBorder.position === 'outer'
        ? {
            border: { ...themeBorder, color: borderColor },
            round: formFieldTheme.round,
            focus,
          }
        : {};

    return (
      <FormFieldBox
        ref={ref}
        className={className}
        background={outerBackground}
        margin={abut ? abutMargin : margin || { ...formFieldTheme.margin }}
        {...outerProps}
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
        <Box style={{ ...layoutType }}>
          {(label && component !== CheckBox) || labelWidth ? (
            <Box {...labelStyle} width={labelWidth}>
              {label && component !== CheckBox && (
                <Text as="label" htmlFor={htmlFor}>
                  {label} {required && <Text color="status-critical">*</Text>}
                </Text>
              )}
            </Box>
          ) : null}

          <Box>
            {contents}
            {normalizedError && (
              <Box>
                <Message
                  message={normalizedError}
                  {...formFieldTheme.error}
                  style={{
                    position: `${direction === 'row' ? 'absolute' : 'static'}`,
                  }}
                />
              </Box>
            )}
            {normalizedInfo && (
              <Message message={normalizedInfo} {...formFieldTheme.info} />
            )}
          </Box>
        </Box>
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
