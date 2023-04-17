import React, { useEffect, useRef, useState } from 'react';

import { Box, Drop } from 'grommet';

const alignBottomLeft = { top: 'bottom', left: 'left' };
const alignTopLeft = { bottom: 'top', left: 'left' };

const StyledDrop = () => {
  const targetRef = useRef();

  const [, setShowDrop] = useState(false);
  useEffect(() => {
    setShowDrop(true);
  }, []);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="center">
      <Box
        background="dark-2"
        pad="medium"
        align="center"
        justify="start"
        ref={targetRef}
      >
        Target
      </Box>
      {targetRef.current && (
        <>
          <Drop
            align={alignBottomLeft}
            target={targetRef.current}
            elevation="large"
            margin={{ top: 'medium' }}
          >
            <Box pad="large">Drop Contents with elevation and margin</Box>
          </Drop>
          <Drop
            align={alignTopLeft}
            target={targetRef.current}
            round="large"
            background="background-contrast"
            margin={{ bottom: 'small' }}
          >
            <Box pad="large">
              Drop Contents with round, background and margin
            </Box>
          </Drop>
        </>
      )}
    </Box>
    // </Grommet>
  );
};

export const Styled = () => <StyledDrop />;
Styled.parameters = {
  chromatic: { disable: true },
};
Styled.args = {
  full: true,
};

export default {
  title: 'Controls/Drop/Styled',
};
