import React, { useEffect, useRef, useState } from 'react';

import { Box, Drop } from 'grommet';

const align = { top: 'bottom', left: 'left' };

const SimpleDrop = () => {
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
        <Drop align={align} target={targetRef.current}>
          <Box pad="large">Drop Contents</Box>
        </Drop>
      )}
    </Box>
    // </Grommet>
  );
};

export const Simple = () => <SimpleDrop />;
Simple.parameters = {
  chromatic: { disable: true },
};
Simple.args = {
  full: true,
};

export default {
  title: 'Controls/Drop/Simple',
};
