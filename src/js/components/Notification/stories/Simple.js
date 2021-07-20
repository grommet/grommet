import React, { useState } from 'react';

import { Grommet, Notification } from 'grommet';
import { grommet } from 'grommet/themes';
import { Button } from '../../Button';
import { Box } from '../../Box';

const SimpleNotification = () => {
  const [visible, setVisible] = useState(false);

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(undefined);

  return (
    <Grommet theme={grommet}>
      <Box alignContent="center" justify="center">
        <Button label="Show Notification" onClick={onOpen} primary />
      </Box>
      {visible && <Notification message="Hello" onClose={onClose} />}
    </Grommet>
  );
};

export const Simple = () => <SimpleNotification />;

export default {
  title: 'Controls/Notification/Simple',
};
