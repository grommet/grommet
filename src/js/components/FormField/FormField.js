import React, { Children, cloneElement, Component } from 'react';
import { compose } from 'recompose';

import { parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { Text } from '../Text';
import { withFocus, withTheme } from '../hocs';

import doc from './doc';

class FormField extends Component {
  render() {
    const { children, error, focus, help, htmlFor, label, style, theme,
      ...rest } = this.props;
    const { formField } = theme;
    const { border } = formField;

    let contents = children;

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
  withFocus,
  withTheme,
)(FormField);
