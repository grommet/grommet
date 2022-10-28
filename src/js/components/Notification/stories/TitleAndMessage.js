import React, { useState } from 'react';

import { Notification } from 'grommet';
import { Button } from '../../Button';
import { Box } from '../../Box';

const TitleAndMessageNotification = () => {
  const [visible, setVisible] = useState(false);

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(undefined);

  return (
    <>
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
    </>
  );
};

export const Toast = () => <TitleAndMessageNotification />;

Toast.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/Notification/Toast',
};
