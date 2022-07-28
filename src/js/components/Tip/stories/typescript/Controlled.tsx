import React, { useState } from 'react';

import { grommet, Box, Button, Grommet, Tip } from 'grommet';

export const Controlled = () => {
  const [show, setShow] = useState(false);

  const onShow = () => {
    setTimeout(() => {
      setShow(false);
    }, 2500);
  };

  const onClick = () => {
    setShow(true);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" justify="center" fill>
      <Tip content="Action info" show={show} onShow={onShow}>
        <Button label="Action" onClick={onClick} />
      </Tip>
    </Box>
    //</Grommet>
  );
};

Controlled.args = {
  full: true,
};

Controlled.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Tip/Controlled',
};
