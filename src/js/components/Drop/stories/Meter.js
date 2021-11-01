import React, { useEffect, useRef, useState } from 'react';

import { Box, Drop, Meter } from 'grommet';

const TestDrop = () => {
  const targetRef = useRef();

  const [, setShowDrop] = useState(false);
  useEffect(() => setShowDrop(true), []);
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="center" pad="large">
      <Meter
        ref={targetRef}
        size="small"
        background="light-2"
        values={[{ value: 20, color: 'accent-1' }]}
      />
      {targetRef.current && (
        <Drop
          id="test-drop-with-svg"
          plain
          align={{ top: 'bottom', left: 'left' }}
          target={targetRef.current}
        >
          <Box pad="large">target is an svg</Box>
        </Drop>
      )}
    </Box>
    // </Grommet>
  );
};

export const SVGChild = () => <TestDrop />;
SVGChild.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Drop/SVG child',
};
