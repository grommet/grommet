import React, { useState } from 'react';

import { Grommet, Notification } from 'grommet';
import { grommet } from 'grommet/themes';
import { Button } from '../../Button';
import { Box } from '../../Box';

const TitleAndMessageNotification = () => {
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
          title="Status Title"
          message="Messages should be at max two lines of text."
          onClose={onClose}
        />
      )}
    </Grommet>
  );
};

export const TitleAndMessage = () => <TitleAndMessageNotification />;

export default {
  title: 'Visualizations/Notification/Toast/Title and Message',
};
