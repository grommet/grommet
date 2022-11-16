import React, { useEffect, useRef, useState } from 'react';

import { Box, Drop } from 'grommet';

const align = { top: 'bottom', left: 'left' };

const PlainDrop = () => {
  const targetRef = useRef();

  const [, setShowDrop] = useState(false);
  useEffect(() => setShowDrop(true), []);
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box background="light-3" fill align="center" justify="center">
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
        <Drop plain align={align} target={targetRef.current}>
          <Box pad="large">No background no shadow</Box>
        </Drop>
      )}
    </Box>
    // </Grommet>
  );
};

export const Plain = () => <PlainDrop />;
Plain.parameters = {
  chromatic: { disable: true },
};
Plain.args = {
  full: true,
};

export default {
  title: 'Controls/Drop/Plain',
};
