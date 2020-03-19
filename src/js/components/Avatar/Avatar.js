import React from 'react';
// import { ThemeContext } from 'styled-components';

import { Box } from '../Box';

// add warning for using size + (width + height)
// Add theme support
// improve src support
// think of supporting OOTB icon
// call out the px sizes on stack
// add forwardref and an example of button


const Avatar = ({
  align = 'center',
  round = 'full',
  size = 'xxsmall',
  src,
  ...rest
}) => {
  //   const theme = useContext(ThemeContext) || defaultProps.theme;

  return (
    <Box
      height={size}
      width={size}
      background={src}
      round={round}
      alignSelf={align}
      align={align}
      {...rest}
    />
  );
};

export { Avatar };
