import React, { useRef, useState } from 'react';
import { Box, Anchor, Button, Drop } from 'grommet';

const TestDrop = () => {
  const [showDrop, setShowDrop] = useState(false);
  const ref = useRef();

  const handleClosePopover = () => {
    setShowDrop(false);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <>
      <Button ref={ref} label="button" onClick={() => setShowDrop(true)} />
      {showDrop && (
        <Drop target={ref.current} onEsc={handleClosePopover}>
          <Box gap="medium" pad="large">
            Drop Contents
            <Button label="testing button" />
            <Anchor href="#" label="testing anchor" />
          </Box>
        </Drop>
      )}
    </>
    // </Grommet>
  );
};

export const Test = () => <TestDrop />;
Test.parameters = {
  chromatic: { disable: true },
};
Test.args = {
  full: true,
};

export default {
  title: 'Controls/Drop/Test',
};
