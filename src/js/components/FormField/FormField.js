// eslint-disable-next-line max-len
/* eslint-disable react/no-multi-comp, react/prefer-stateless-function, max-classes-per-file */
import React, { Children, cloneElement, Component } from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';

import { parseMetricToNum } from '../../utils';
import { defaultProps } from '../../default-props';
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

  createBorder(border) {
    this.borderArray = {
      innerBorder: [],
      outerBorder: [],
    };
    for (let i = 0; i < border.length; i += 1) {
      if (border[i].position === 'inner' || border[i].position === undefined) {
        this.borderArray.innerBorder.push(border[i]);
      }
      if (border[i].position === 'outer') {
        this.borderArray.outerBorder.push(border[i]);
      }
    }
    return this.borderArray;
  }

  checkAbut(border) {
    this.borderArray = [];
    for (let i = 0; i < border.length; i += 1) {
      if (
        border[i].position === 'outer' &&
        (border[i].side === 'all' ||
          border[i].side === 'horizontal' ||
          border[i].side === 'bottom')
      ) {
        this.borderArray.push(border[i]);
      }
    }
    if (this.borderArray.length >= 0) {
      // final item determines the style of border
      return this.borderArray[this.borderArray.length - 1];
    }
    return undefined;
  }

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
      margin,
    } = this.props;
    let { border } = this.props;
    const { formField } = theme;
    if (border === undefined) {
      border = formField.border;
    }
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
    let abutMargin;
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
            Array.isArray(border)
              ? this.createBorder(border).innerBorder
              : border !== false &&
                (border.position === 'inner' ||
                  border.position === undefined) && {
                  ...border,
                  side: border.side || 'bottom',
                  color: borderColor,
                }
          }
        >
          {normalizedChildren}
        </Box>
      );

      abut = Array.isArray(border)
        ? this.checkAbut(border)
        : border.position === 'outer' &&
          (border.side === 'all' ||
            border.side === 'horizontal' ||
            !border.side);
      if (abut) {
        // marginBottom is set to overlap adjacent fields
        abutMargin = { bottom: '-1px' };
        if (margin) {
          abutMargin = margin;
        } else if (Array.isArray(border)) {
          const lastItem = this.checkAbut(border);
          if (lastItem.size) {
            abutMargin = {
              bottom: `-${parseMetricToNum(
                theme.global.borderSize[lastItem.size] || lastItem.size,
              )}px`,
            };
          }
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

    return (
      <FormFieldBox
        className={className}
        border={
          Array.isArray(border)
            ? this.createBorder(border).outerBorder
            : border &&
              border.position === 'outer' && { ...border, color: borderColor }
        }
        margin={abut ? abutMargin : margin || { ...formField.margin }}
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
  // eslint-disable-next-line global-require
  FormFieldDoc = require('./doc').doc(FormField);
}
const FormFieldWrapper = compose(
  withFocus({ focusWithMouse: true }),
  withTheme,
)(FormFieldDoc || FormField);

export { FormFieldWrapper as FormField };
