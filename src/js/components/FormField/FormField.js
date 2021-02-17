import React, {
  Children,
  cloneElement,
  forwardRef,
  useContext,
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

const grommetInputNames = [
  'TextInput',
  'Select',
  'MaskedInput',
  'TextArea',
  'DateInput',
  'FileInput',
];
const grommetInputPadNames = [
  'CheckBox',
  'CheckBoxGroup',
  'RadioButtonGroup',
  'RangeInput',
];

const isGrommetInput = comp =>
  comp &&
  (grommetInputNames.indexOf(comp.displayName) !== -1 ||
    grommetInputPadNames.indexOf(comp.displayName) !== -1);

const FormFieldBox = styled(Box)`
  ${props => props.focus && focusStyle({ justBorder: true })}
  ${props => props.theme.formField && props.theme.formField.extend}
`;

const FormFieldContentBox = styled(Box)`
  ${props => props.focus && focusStyle({ justBorder: true })}
`;

const StyledMessageContainer = styled(Box)`
  ${props =>
    props.messageType &&
    props.theme.formField[props.messageType].container &&
    props.theme.formField[props.messageType].container.extend}
`;

const Message = ({ error, info, message, type, ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  if (message) {
    let icon;
    let containerProps;

    if (type) {
      icon = theme.formField[type] && theme.formField[type].icon;
      containerProps = theme.formField[type] && theme.formField[type].container;
    }

    let messageContent;
    if (typeof message === 'string')
      messageContent = <Text {...rest}>{message}</Text>;
    else messageContent = <Box {...rest}>{message}</Box>;

    return icon || containerProps ? (
      <StyledMessageContainer
        direction="row"
        messageType={type}
        {...containerProps}
      >
        {icon && <Box flex={false}>{icon}</Box>}
        {messageContent}
      </StyledMessageContainer>
    ) : (
      messageContent
    );
  }
  return null;
};

const Input = ({ component, disabled, invalid, name, onChange, ...rest }) => {
  const formContext = useContext(FormContext);
  const [value, setValue] = formContext.useFormInput(name, rest.value);
  const InputComponent = component || TextInput;
  // Grommet input components already check for FormContext
  // and, using their `name`, end up calling the useFormInput.setValue()
  // already. For custom components, we expect they will call
  // this onChange() and we'll call setValue() here, primarily
  // for backwards compatibility.
  const extraProps = isGrommetInput(InputComponent)
    ? { focusIndicator: false, onChange, plain: true }
    : {
        value,
        onChange: event => {
          setValue(
            event.value !== undefined ? event.value : event.target.value,
          );
          if (onChange) onChange(event);
        },
      };
  return (
    <InputComponent
      name={name}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      {...rest}
      {...extraProps}
    />
  );
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const FormField = forwardRef(
  (
    {
      children,
      className,
      component,
      contentProps,
      disabled, // pass through in renderInput()
      error: errorProp,
      help,
      htmlFor,
      info: infoProp,
      label,
      margin,
      name, // pass through in renderInput()
      onBlur,
      onChange,
      onFocus,
      pad,
      required,
      style,
      validate,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const formContext = useContext(FormContext);
    const {
      error,
      info,
      inForm,
      onBlur: contextOnBlur,
      onChange: contextOnChange,
    } = formContext.useFormField({
      error: errorProp,
      info: infoProp,
      name,
      required,
      validate,
    });
    const [focus, setFocus] = useState();

    const { formField: formFieldTheme } = theme;
    const { border: themeBorder } = formFieldTheme;

    // This is here for backwards compatibility. In case the child is a grommet
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

    // put rest on container, unless we use internal Input
    let containerRest = rest;
    if (inForm) {
      if (!contents) containerRest = {};
      contents = contents || (
        <Input
          component={component}
          disabled={disabled}
          invalid={!!error}
          name={name}
          label={component === CheckBox ? label : undefined}
          {...rest}
        />
      );
    }

    const themeContentProps = { ...formFieldTheme.content };

    if (!pad && !wantContentPad) {
      themeContentProps.pad = undefined;
    }

    if (themeBorder && themeBorder.position === 'inner') {
      if (error && formFieldTheme.error) {
        themeContentProps.background = formFieldTheme.error.background;
      } else if (disabled && formFieldTheme.disabled) {
        themeContentProps.background = formFieldTheme.disabled.background;
      }
    }

    if (!themeBorder) {
      contents = (
        <Box {...themeContentProps} {...contentProps}>
          {contents}
        </Box>
      );
    }

    let borderColor;

    if (
      disabled &&
      formFieldTheme.disabled.border &&
      formFieldTheme.disabled.border.color
    ) {
      borderColor = formFieldTheme.disabled.border.color;
    } else if (error && themeBorder && themeBorder.error.color) {
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
        <FormFieldContentBox
          {...themeContentProps}
          {...innerProps}
          {...contentProps}
        >
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

    if (themeBorder && themeBorder.position === 'outer') {
      if (error && formFieldTheme.error && formFieldTheme.error.background) {
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

    const outerProps =
      themeBorder && themeBorder.position === 'outer'
        ? {
            border: { ...themeBorder, color: borderColor },
            round: formFieldTheme.round,
            focus,
          }
        : {};

    let { requiredIndicator } = theme.formField.label;
    if (requiredIndicator === true)
      // a11yTitle necessary so screenreader announces as "required"
      // as opposed to "star"
      // accessibility resource: https://www.deque.com/blog/anatomy-of-accessible-forms-required-form-fields/
      requiredIndicator = <Text a11yTitle="required">*</Text>;

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
          if (contextOnBlur) contextOnBlur(event);
          if (onBlur) onBlur(event);
        }}
        onChange={
          contextOnChange || onChange
            ? event => {
                event.persist();
                if (onChange) onChange(event);
                if (contextOnChange) {
                  const debouncedFn = debounce(() => {
                    contextOnChange(event);
                    // A half second (500ms) debounce can be a helpful starting
                    // point. You want to give the user time to fill out a
                    // field, but capture their attention before they move on
                    // past it. 2 second (2000ms) might be too long depending
                    // on how fast people type, and 200ms would be an eye blink
                  }, 500);
                  debouncedFn();
                }
              }
            : undefined
        }
        {...containerRest}
      >
        {(label && component !== CheckBox) || help ? (
          <>
            {label && component !== CheckBox && (
              <Text as="label" htmlFor={htmlFor} {...labelStyle}>
                {label}
                {required && requiredIndicator ? requiredIndicator : undefined}
              </Text>
            )}
            <Message message={help} {...formFieldTheme.help} />
          </>
        ) : (
          undefined
        )}
        {contents}
        <Message type="error" message={error} {...formFieldTheme.error} />
        <Message type="info" message={info} {...formFieldTheme.info} />
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
