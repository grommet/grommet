import React, { useEffect, useRef, useState } from 'react';

import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const StyledDrop = () => {
  const targetRef = useRef();

  const [, setShowDrop] = useState(false);
  useEffect(() => {
    setShowDrop(true);
  }, []);

  return (
    <Grommet theme={grommet} full>
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
              align={{ top: 'bottom', left: 'left' }}
              target={targetRef.current}
              elevation="large"
              margin={{ top: 'medium' }}
            >
              <Box pad="large">Drop Contents with elevation and margin</Box>
            </Drop>
            <Drop
              align={{ bottom: 'top', left: 'left' }}
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
    </Grommet>
  );
};

export const Styled = () => <StyledDrop />;
Styled.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Drop/Styled',
};
