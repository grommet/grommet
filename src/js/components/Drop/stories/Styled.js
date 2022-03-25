import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Box, Drop } from 'grommet';

const StyledDrop = () => {
  const targetRef = useRef();

  const [, setShowDrop] = useState(false);
  useEffect(() => {
    setShowDrop(true);
  }, []);

  const alignBottomLeft = useMemo(() => {
    const alignProp = { top: 'bottom', left: 'left' };
    return alignProp;
  }, []);

  const alignTopleft = useMemo(() => {
    const alignProp = { bottom: 'top', left: 'left' };
    return alignProp;
  }, []);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="center">
      <Box
        background="dark-3"
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
            align={alignTopleft}
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
