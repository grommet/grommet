import React, { Children, cloneElement, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import { parseMetricToNum, getFirstFocusableDescendant } from '../../utils';

import { Box } from '../Box';
import { Text } from '../Text';

import { withTheme } from '../hocs';

import doc from './doc';

// empirically determined via interaction with story, post IE11 '1' is enough.
const FOCUS_DELAY = 20;

class FormField extends Component {
  state = {};

  componentWillUnmount() {
    clearTimeout(this.focusTimer);
  }

  onClick = () => {
    // set focus on focusable descendant
    const container = findDOMNode(this.childContainerRef);
    const element = getFirstFocusableDescendant(container);
    if (element) {
      element.focus();
    }
  }

  onFocus = () => {
    // delay to prevent re-rendering children before their events are delivered
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      this.focusTimer = undefined;
      this.setState({ focus: true });
    }, FOCUS_DELAY);
  }

  onBlur = () => {
    // delay to prevent re-rendering children before their events are delivered
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      this.focusTimer = undefined;
      this.setState({ focus: false });
    }, FOCUS_DELAY);
  }

  render() {
    const { children, error, help, htmlFor, label, style, theme,
      ...rest } = this.props;
    const { formField } = theme;
    const { border } = formField;
    const { focus } = this.state;

    let contents = children;
    const handlers = {};

    if (!focus && !this.focusTimer) {
      handlers.onClick = this.onClick;
    }

    let borderColor;
    if (focus) {
      borderColor = 'focus';
    } else if (error) {
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
        <Box
          ref={(ref) => { this.childContainerRef = ref; }}
          border={border.position === 'inner' ?
            { ...border, side: (border.side || 'bottom'), color: borderColor }
            : undefined
          }
        >
          {normalizedChildren}
        </Box>
      );

      handlers.onFocus = this.onFocus;
      handlers.onBlur = this.onBlur;

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
      <Box
        border={(border && border.position === 'outer') ?
          { ...border, color: borderColor } : undefined
        }
        margin={abut ? undefined : { bottom: 'small' }}
        {...handlers}
        style={outerStyle}
        {...rest}
      >
        {(label || help) ? (
          <Box
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
          </Box>
        ) : undefined}
        {contents}
        {error ? (
          <Box margin={{ vertical: 'xsmall', horizontal: 'small' }} >
            <Text {...formField.error}>{error}</Text>
          </Box>
        ) : undefined}
      </Box>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(FormField);
}

export default compose(
  withTheme,
)(FormField);
