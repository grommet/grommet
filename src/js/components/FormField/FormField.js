import React, { Children, cloneElement, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import { parseMetricToNum, getFirstFocusableDescendant } from '../../utils';

import { Box } from '../Box';
import { Text } from '../Text';

import { withTheme } from '../hocs';

import doc from './doc';

class FormField extends Component {
  static defaultProps = {
    border: { color: 'border', position: 'inner', side: 'bottom' },
  }

  state = {};

  render() {
    const { border, children, error, help, label, style, theme,
      ...rest } = this.props;
    const { focus } = this.state;

    let contents = children;
    const focusHandlers = {
      onClick: () => {
        // set focus on focusable descendant
        const container = findDOMNode(this.childContainerRef);
        const element = getFirstFocusableDescendant(container);
        if (element) {
          element.focus();
        }
      },
    };
    let borderColor;
    if (focus) {
      borderColor = 'accent-1';
    } else if (error) {
      borderColor = 'status-critical';
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

      focusHandlers.onFocus = () => this.setState({ focus: true });
      focusHandlers.onBlur = () => this.setState({ focus: false });

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
        {...focusHandlers}
        style={outerStyle}
        {...rest}
      >
        {(label || help) ? (
          <Box
            margin={{ vertical: 'xsmall', horizontal: 'small' }}
            gap='xsmall'
          >
            {label ? <Text><strong>{label}</strong></Text> : undefined}
            {help ? <Text color='dark-5'>{help}</Text> : undefined}
          </Box>
        ) : undefined}
        {contents}
        {error ? (
          <Box
            justify='between'
            margin={{ vertical: 'xsmall', horizontal: 'small' }}
          >
            <Text color='status-critical'>{error}</Text>
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
