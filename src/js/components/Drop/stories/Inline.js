import React, { useEffect, useRef, useState } from 'react';

import { Box, Drop } from 'grommet';

const align = { top: 'bottom', left: 'left' };

const InlineDrop = () => {
  const targetRef = useRef();

  // trigger re-render so we have the targetRef
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
        {targetRef.current && (
          <Drop container="inline" align={align} target={targetRef.current}>
            <Box pad="large">Drop Contents</Box>
          </Drop>
        )}
      </Box>
    </Box>
    // </Grommet>
  );
};

export const Inline = () => <InlineDrop />;
Inline.parameters = {
  chromatic: { disable: true },
};
Inline.args = {
  full: true,
};

export default {
  title: 'Controls/Drop/Inline',
};
