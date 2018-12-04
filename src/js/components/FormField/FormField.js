import React, { Children, cloneElement, Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';
import { parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { RadioButton } from '../RadioButton';
import { Select } from '../Select';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { withFocus } from '../hocs';
import { FormContext } from '../Form/FormContext';

const validateField = (required, validate) => data => {
  let error;
  if (required && !data) {
    error = 'required';
  } else if (validate) {
    if (typeof validate === 'function') {
      error = validate(data);
    } else if (validate.regexp) {
      if (!validate.regexp.test(data)) {
        error = validate.message || 'invalid';
      }
    }
  }
  return error;
};

const FormTextInput = ({ name, value, update }) => (
  <TextInput
    name={name}
    value={value[name] || ''}
    onChange={event => update(name, event.target.value)}
    plain
    focusIndicator={false}
  />
);

const FormSelect = ({ labelKey, name, options, value, valueKey, update }) => (
  <Select
    name={name}
    value={value[name] || ''}
    options={options}
    labelKey={labelKey}
    valueKey={valueKey}
    onChange={({ value: data }) => update(name, data)}
    plain
    focusIndicator={false}
  />
);

const FormRadioButtons = ({ name, options, value, update }) => (
  <Box margin={{ bottom: 'small' }}>
    {options.map(option => (
      <Box key={option} pad={{ horizontal: 'small', vertical: 'xsmall' }}>
        <RadioButton
          name={name}
          value={option}
          label={option}
          checked={value[name] === option}
          onChange={() => update(name, option)}
        />
      </Box>
    ))}
  </Box>
);

class FormField extends Component {
  renderChildren = (value, update) => {
    const { name, options, optionLabelKey, optionValueKey, type } = this.props;

    let result;
    if (options) {
      if (options.length > 3) {
        result = (
          <FormSelect
            name={name}
            value={value}
            update={update}
            options={options}
            labelKey={optionLabelKey}
            valueKey={optionValueKey}
          />
        );
      } else {
        result = (
          <FormRadioButtons
            name={name}
            value={value}
            update={update}
            options={options}
          />
        );
      }
    } else {
      result = (
        <FormTextInput name={name} value={value} update={update} type={type} />
      );
    }
    return result;
  };

  render() {
    const {
      children,
      error,
      focus,
      help,
      htmlFor,
      label,
      name,
      required,
      style,
      theme,
      validate,
      ...rest
    } = this.props;
    const { formField } = theme;
    const { border } = formField;

    return (
      <FormContext.Consumer>
        {context => {
          let normalizedError = error;
          let contents = children;

          if (context) {
            const { addValidation, errors, value, update } = context;
            addValidation(name, validateField(required, validate));
            normalizedError = error || errors[name];
            contents = children || this.renderChildren(value, update);
          }

          let borderColor;
          if (focus) {
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
              (border.side === 'all' ||
                border.side === 'horizontal' ||
                !border.side);
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
            <Box
              border={
                border && border.position === 'outer'
                  ? { ...border, color: borderColor }
                  : undefined
              }
              margin={abut ? undefined : { bottom: 'small' }}
              style={outerStyle}
              {...rest}
            >
              {label || help ? (
                <Box
                  margin={{ vertical: 'xsmall', horizontal: 'small' }}
                  gap="xsmall"
                >
                  {label ? (
                    <Text as="label" htmlFor={htmlFor} {...formField.label}>
                      {label}
                    </Text>
                  ) : (
                    undefined
                  )}
                  {help ? (
                    <Text
                      {...formField.help}
                      color={
                        formField.help.color[theme.dark ? 'dark' : 'light']
                      }
                    >
                      {help}
                    </Text>
                  ) : (
                    undefined
                  )}
                </Box>
              ) : (
                undefined
              )}
              {contents}
              {normalizedError ? (
                <Box margin={{ vertical: 'xsmall', horizontal: 'small' }}>
                  <Text
                    {...formField.error}
                    color={formField.error.color[theme.dark ? 'dark' : 'light']}
                  >
                    {normalizedError}
                  </Text>
                </Box>
              ) : (
                undefined
              )}
            </Box>
          );
        }}
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
  withFocus,
  withTheme,
)(FormFieldDoc || FormField);

export { FormFieldWrapper as FormField };
