import React, { useRef, useState } from 'react';
import { Box, Button, Drop } from 'grommet';

const alignRight = { left: 'right' };

export const RestrictFocus = () => {
  const [showDrop, setShowDrop] = useState(false);
  const targetRef = useRef();

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box pad="large" gap="large" fill align="center" justify="center">
      <Button
        ref={targetRef}
        label="button"
        onClick={() => setShowDrop(!showDrop)}
      />
      {showDrop && (
        <Drop
          align={alignRight}
          target={targetRef.current}
          onClickOutside={() => setShowDrop(false)}
          restrictFocus="firstElement"
        >
          <Box gap="small" pad="large">
            <Button label="first element" />
            <Button label="second element" />
            <Button label="third element" />
          </Box>
        </Drop>
      )}
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Controls/Drop/RestrictFocus',
};
