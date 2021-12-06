import React, { useRef, useState } from 'react';

import { Box, Button, Drop, DropButton, Layer, TextInput } from 'grommet';

const MultipleDrop = () => {
  const [showDrop, setShowDrop] = useState(false);
  const [showLayer, setShowLayer] = useState(false);
  const targetRef = useRef();

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="center">
      <DropButton
        label="drop button"
        dropAlign={{ right: 'left' }}
        dropContent={
          <Box pad="large">
            <TextInput
              value=""
              onChange={() => {}}
              suggestions={['one', 'two']}
            />
          </Box>
        }
      />
      <Button
        ref={targetRef}
        label="button"
        onClick={() => setShowDrop(true)}
      />
      {showDrop && (
        <Drop
          align={{ left: 'right' }}
          target={targetRef.current}
          onClickOutside={() => setShowDrop(false)}
        >
          <Box pad="large">
            <TextInput
              value=""
              onChange={() => {}}
              suggestions={['one', 'two']}
            />
          </Box>
        </Drop>
      )}
      <Button label="layer" onClick={() => setShowLayer(!showLayer)} />
      {showLayer && (
        <Layer position="left" modal={false}>
          <Box pad="large" border>
            <TextInput
              value=""
              onChange={() => {}}
              suggestions={['one', 'two']}
            />
          </Box>
        </Layer>
      )}
    </Box>
    // </Grommet>
  );
};

export const Multiple = () => <MultipleDrop />;
Multiple.parameters = {
  chromatic: { disable: true },
};
Multiple.args = {
  full: true,
};

export default {
  title: 'Controls/Drop/Multiple',
};
