import React, { useState } from 'react';

import { Grommet, Notification } from 'grommet';
import { grommet } from 'grommet/themes';
import { Button } from '../../Button';
import { Box } from '../../Box';

const TimedOutNotification = () => {
  const [visible, setVisible] = useState();

  const onOpen = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(undefined);
    }, 8000);
  };

  const onClose = () => setVisible(undefined);

  return (
    <Grommet theme={grommet}>
      <Box pad="large" justify="center">
        <Button label="Show Notification" onClick={onOpen} />
      </Box>
      {visible && (
        <Notification
          toast
          status="warning"
          title="Timed Out Warning"
          message="This notification will disappear after 8 seconds"
          onClose={onClose}
        />
      )}
    </Grommet>
  );
};

export const ToastTimed = () => <TimedOutNotification />;

export default {
  title: 'Visualizations/Notification/Toast Timed',
};
