import React, { useState } from 'react';

import { Grommet, Notification } from 'grommet';
import { grommet } from 'grommet/themes';
import { Button } from '../../Button';
import { Box } from '../../Box';

const MessageAndBodyNotification = () => {
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
          message="Status Message"
          body="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit, sed do eiusmod temporincid idunt 
            ut labore et dolore magna aliqua. Ut enim ad minim 
            veniam, quis nostrud"
          onClose={onClose}
        />
      )}
    </Grommet>
  );
};

export const MessageAndBody = () => <MessageAndBodyNotification />;

export default {
  title: 'Visualizations/Notification/Toast/Message And Body',
};
