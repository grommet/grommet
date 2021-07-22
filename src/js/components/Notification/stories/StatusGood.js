import React, { useState } from 'react';

import { Grommet, Notification } from 'grommet';
import { grommet } from 'grommet/themes';
import { Button } from '../../Button';
import { Box } from '../../Box';

const StatusGoodNotification = () => {
  const [visible, setVisible] = useState(false);

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(undefined);

  return (
    <Grommet theme={grommet}>
      <Box pad="large" justify="center">
        <Button label="Show Notification" onClick={onOpen} />
      </Box>
      {visible && (
        <Notification
          toast
          status="good"
          message="Status Message"
          onClose={onClose}
        />
      )}
    </Grommet>
  );
};

export const StatusGood = () => <StatusGoodNotification />;

export default {
  title: 'Visualizations/Notification/Toast/Status Good',
};
