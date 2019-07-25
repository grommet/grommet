import React, { Children, cloneElement, Component } from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';
import { parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { CheckBox } from '../CheckBox';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { withFocus } from '../hocs';
import { FormContext } from '../Form/FormContext';

const validateField = (required, validate, messages) => (value, data) => {
  let error;
  if (required && (value === undefined || value === '')) {
    error = messages.required;
  } else if (validate) {
    if (typeof validate === 'function') {
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
  ${props => props.theme.formField.extend}
`;

class FormFieldContent extends Component {
  componentDidMount() {
    const { checked, context, name, value } = this.props;
    if (
      context &&
      context.value[name] === undefined &&
      (value !== undefined || checked !== undefined)
    ) {
      context.update(name, value !== undefined ? value : checked);
    }
  }

  renderChildren = (value, update) => {
    const {
      name,
      checked,
      component,
      required,
      value: valueProp,
      onChange,
      ...rest
    } = this.props;

    delete rest.className;
    const Input = component || TextInput;
    if (Input === CheckBox) {
      return (
        <Input
          name={name}
          checked={value[name] !== undefined ? value[name] : checked || false}
          onChange={event => {
            update(name, event.target.checked);
            if (onChange) onChange(event);
          }}
          {...rest}
        />
      );
    }
    return (
      <Input
        name={name}
        value={value[name] !== undefined ? value[name] : valueProp || ''}
        onChange={event => {
          update(name, event.value || event.target.value || '');
          if (onChange) onChange(event);
        }}
        plain
        focusIndicator={false}
        {...rest}
      />
    );
  };

  render() {
    const {
      children,
      className,
      component,
      context,
      error,
      focus,
      help,
      htmlFor,
      label,
      name,
      pad,
      required,
      style,
      theme,
      validate,
      onBlur,
      onFocus,
    } = this.props;
    const { formField } = theme;
    const { border } = formField;

    let normalizedError = error;
    let contents = children;

    if (context) {
      const { addValidation, errors, value, update, messages } = context;
      addValidation(name, validateField(required, validate, messages));
      normalizedError = error || errors[name];
      contents = children || this.renderChildren(value, update);
    }

    if (pad) {
      contents = <Box {...formField.content}>{contents}</Box>;
    }

    let borderColor;
    if (focus && !normalizedError) {
      borderColor = 'focus';
    } else if (normalizedError) {
      borderColor = (border && border.error.color) || 'status-critical';
    } else {
      borderColor = (border && border.color) || 'border';
    }
    let abut;
    let outerStyle = style;

    if (border) {
      const normalizedChildren = children
        ? Children.map(children, child => {
            if (child) {
              return cloneElement(child, {
                plain: true,
                focusIndicator: false,
                onBlur,
                onFocus,
              });
            }
            return child;
          })
        : contents;
      contents = (
        <Box
          ref={ref => {
            this.childContainerRef = ref;
          }}
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
          {normalizedChildren}
        </Box>
      );

      abut =
        border.position === 'outer' &&
        (border.side === 'all' || border.side === 'horizontal' || !border.side);
      if (abut) {
        // marginBottom is set to overlap adjacent fields
        let marginBottom = '-1px';
        if (border.size) {
          marginBottom = `-${parseMetricToNum(
            theme.global.borderSize[border.size],
          )}px`;
        }
        outerStyle = {
          position: focus ? 'relative' : undefined,
          marginBottom,
          zIndex: focus ? 10 : undefined,
          ...style,
        };
      }
    }

    return (
      <FormFieldBox
        className={className}
        border={
          border && border.position === 'outer'
            ? { ...border, color: borderColor }
            : undefined
        }
        margin={abut ? undefined : { ...formField.margin }}
        style={outerStyle}
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
  }
}

// Can't be a functional component because styled-components withTheme() needs
// to attach a ref.
/* eslint-disable-next-line react/no-multi-comp, react/prefer-stateless-function */
class FormField extends Component {
  render() {
    return (
      <FormContext.Consumer>
        {context => <FormFieldContent context={context} {...this.props} />}
      </FormContext.Consumer>
    );
  }
}

FormField.defaultProps = {};
Object.setPrototypeOf(FormField.defaultProps, defaultProps);

let FormFieldDoc;
if (process.env.NODE_ENV !== 'production') {
  FormFieldDoc = require('./doc').doc(FormField); // eslint-disable-line global-require
}
const FormFieldWrapper = compose(
  withFocus({ focusWithMouse: true }),
  withTheme,
)(FormFieldDoc || FormField);

export { FormFieldWrapper as FormField };
