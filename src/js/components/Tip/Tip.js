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

    const getChildren = () => {
      // handle the use case of a single string child
      if (typeof children === 'string') return <span>{children}</span>;
      return children;
    };

    return (
      // Not sure about the extra Box, I'm still thinking of ways to simplify
      <Box ref={tipRef} {...rest}>
        {cloneElement(getChildren(), childProps)}
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
