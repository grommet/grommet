import React, { useRef, useState } from 'react';

import { Box, Button, Drop } from 'grommet';

const align = { top: 'bottom', right: 'right' };

const ProgressiveDrop = () => {
  const boxRef = useRef();
  const innerBoxRef = useRef();

  const [openDrop, setOpenDrop] = useState(false);
  const [openInnerDrop, setOpenInnerDrop] = useState(false);
  const [interactedWithInnerButton, setInteractedWithInnerButton] =
    useState(false);

  const onCloseDrop = () => {
    setOpenDrop(false);
    setOpenInnerDrop(false);
  };

  const onOpenDrop = () => {
    setOpenDrop(true);
    setOpenInnerDrop(false);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="center">
      <Button ref={boxRef} primary label="Click me" onClick={onOpenDrop} />
      {openDrop && (
        <Drop
          target={boxRef.current}
          onClickOutside={onCloseDrop}
          onEsc={onCloseDrop}
        >
          <Box pad="large" ref={innerBoxRef}>
            <Button
              primary
              label="Click me again"
              onClick={() => setOpenInnerDrop(true)}
            />
          </Box>
          {openInnerDrop && (
            <Drop
              target={innerBoxRef.current}
              onClickOutside={() => setOpenInnerDrop(false)}
              onEsc={() => setOpenInnerDrop(false)}
              align={align}
            >
              <Box pad="large">
                <Button
                  primary
                  label={
                    interactedWithInnerButton
                      ? 'Good job!'
                      : 'You can interact with me'
                  }
                  onClick={() => setInteractedWithInnerButton(true)}
                />
              </Box>
            </Drop>
          )}
        </Drop>
      )}
    </Box>
    // </Grommet>
  );
};

export const Progressive = () => <ProgressiveDrop />;
Progressive.parameters = {
  chromatic: { disable: true },
};
Progressive.args = {
  full: true,
};

export default {
  title: 'Controls/Drop/Progressive',
};
