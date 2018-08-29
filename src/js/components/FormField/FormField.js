import React, { Children, cloneElement, Component } from 'react';
import { compose } from 'recompose';

import { parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { Text } from '../Text';
import { withFocus, withTheme } from '../hocs';

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
      borderColor = formField.border.error.color[theme.dark ? 'dark' : 'light']
        || 'status-critical';
    } else {
      borderColor = (border && border.color[theme.dark ? 'dark' : 'light'])
        || (theme.dark ? 'border-dark' : 'border-light');
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
              <Text
                {...formField.help}
                color={formField.help.color[theme.dark ? 'dark' : 'light']}
              >
                {help}
              </Text>
            ) : undefined}
          </Box>
        ) : undefined}
        {contents}
        {error ? (
          <Box margin={{ vertical: 'xsmall', horizontal: 'small' }} >
            <Text
              {...formField.error}
              color={formField.error.color[theme.dark ? 'dark' : 'light']}
            >
              {error}
            </Text>
          </Box>
        ) : undefined}
      </Box>
    );
  }
}

let FormFieldDoc;
if (process.env.NODE_ENV !== 'production') {
  FormFieldDoc = require('./doc').doc(FormField); // eslint-disable-line global-require
}
const FormFieldWrapper = compose(
  withFocus,
  withTheme,
)(FormFieldDoc || FormField);

export { FormFieldWrapper as FormField };
