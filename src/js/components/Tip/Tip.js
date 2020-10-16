import React, {
  cloneElement,
  forwardRef,
  useContext,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Drop } from '../Drop';

export const Tip = forwardRef(
  ({ children, content, dropProps, ...rest }, tipRef) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [over, setOver] = useState(false);
    const ref = useRef();

    // compliant with accessibility standards
    const childProps = {
      onMouseOver: () => setOver(true),
      onMouseLeave: () => setOver(false),
      onFocus: () => setOver(true),
      onBlur: () => setOver(false),
      ref,
    };

    return (
      // Not sure about the extra Box, I'm still thinking of ways to simplify
      <Box ref={tipRef} {...rest}>
        {cloneElement(children, childProps)}
        {over && (
          <Drop
            align={{ left: 'right' }} // most common use case is a sidebar?!
            target={ref.current}
            trapFocus={false}
            plain
            {...theme.tip.drop}
            {...dropProps}
          >
            <Box {...theme.tip.content}>{content}</Box>
          </Drop>
        )}
      </Box>
    );
  },
);

Tip.propTypes = {
  children: PropTypes.node,
};

Tip.defaultProps = {
  children: undefined,
};
