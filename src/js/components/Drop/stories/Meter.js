import React, { useEffect, useRef, useState } from 'react';

import { Box, Drop, Meter } from 'grommet';

const align = { top: 'bottom', left: 'left' };

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
        values={[{ value: 20, color: 'brand' }]}
      />
      {targetRef.current && (
        <Drop
          id="test-drop-with-svg"
          plain
          align={align}
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
SVGChild.storyName = 'SVG child';
SVGChild.args = {
  full: true,
};

export default {
  title: 'Controls/Drop/SVG child',
};
