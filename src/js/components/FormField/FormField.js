import React, { Children, cloneElement, Component } from 'react';
import styled from 'styled-components';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import { colorForName, parseMetricToNum, getFirstFocusableDescendant } from '../../utils';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

import { withTheme } from '../hocs';

import doc from './doc';

const FormFieldBox = styled(Box)`
  :focus-within {
    border-color: ${props => colorForName('focus', props.theme)};
  }
`;

const PointerBox = styled(Box)`
  > * {
    cursor: pointer;
  }
`;

class FormField extends Component {
  onClick = () => {
    // set focus on focusable descendant
    const container = findDOMNode(this.childContainerRef);
    const element = getFirstFocusableDescendant(container);
    if (element) {
      element.focus();
    }
  }

  render() {
    const {
      children,
      error,
      focus,
      help,
      htmlFor,
      label,
      style,
      theme,
      ...rest
    } = this.props;
    const { formField } = theme;
    const { border } = formField;

    let contents = children;

    let borderColor;
    if (error) {
      borderColor = formField.border.error.color || 'status-critical';
    } else {
      borderColor = (border ? (border.color || 'border') : 'border');
    }
    let abut;
    let outerStyle = style;

    if (border) {
      const normalizedChildren = Children.map(children, (child) => {
        if (child) {
          return cloneElement(child, { plain: true, focusIndicator: false });
        }
        return child;
      });

      contents = (
        <FormFieldBox
          theme={theme}
          ref={(ref) => { this.childContainerRef = ref; }}
          border={border.position === 'inner' ?
            { ...border, side: (border.side || 'bottom'), color: borderColor }
            : undefined
          }
        >
          {normalizedChildren}
        </FormFieldBox>
      );

      abut = (border.position === 'outer' &&
        (border.side === 'all' || border.side === 'horizontal' || !border.side));
      if (abut) {
        // marginBottom is set to overlap adjacent fields
        let marginBottom = '-1px';
        if (border.size) {
          marginBottom =
            `-${parseMetricToNum(theme.global.borderSize[border.size])}px`;
        }
        outerStyle = {
          position: (focus ? 'relative' : undefined),
          marginBottom,
          zIndex: (focus ? 10 : undefined),
          ...style,
        };
      }
    }

    return (
      <FormFieldBox
        theme={theme}
        border={(border && border.position === 'outer') ?
          { ...border, color: borderColor } : undefined
        }
        margin={abut ? undefined : { bottom: 'small' }}
        style={outerStyle}
        {...rest}
      >
        <Button
          onClick={this.onClick}
          tabIndex='-1'
        >
          {(label || help) ? (
            <PointerBox
              margin={{ vertical: 'xsmall', horizontal: 'small' }}
              gap='xsmall'
            >
              {label ? (
                <Text tag='label' htmlFor={htmlFor} {...formField.label}>
                  {label}
                </Text>
              ) : undefined}
              {help ? (
                <Text {...formField.help}>{help}</Text>
              ) : undefined}
            </PointerBox>
          ) : undefined}
        </Button>
        {contents}
        {error ? (
          <Box margin={{ vertical: 'xsmall', horizontal: 'small' }} >
            <Text {...formField.error}>{error}</Text>
          </Box>
        ) : undefined}
      </FormFieldBox>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(FormField);
}

export default compose(
  withTheme,
)(FormField);
