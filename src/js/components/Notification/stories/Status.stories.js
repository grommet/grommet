import React from 'react';

import { Notification } from 'grommet';
import { Box } from '../../Box';
import { Text } from '../../Text';

const StatusNotification = () => (
  <Box pad="large" justify="center" gap="large">
    <Box gap="xsmall">
      <Text size="medium">Default (No status prop)</Text>
      <Notification
        title="Status Title"
        message="This is an example of message text"
      />
    </Box>
    <Box gap="xsmall">
      <Text size="medium">Normal</Text>
      <Notification
        status="normal"
        title="Status Title"
        message="This is an example of message text"
      />
    </Box>
    <Box gap="xsmall">
      <Text size="medium">Warning</Text>
      <Notification
        status="warning"
        title="Status Title"
        message="This is an example of message text"
      />
    </Box>
    <Box gap="xsmall">
      <Text size="medium">Critical</Text>
      <Notification
        status="critical"
        title="Status Title"
        message="This is an example of message text"
      />
    </Box>
    <Box gap="xsmall">
      <Text size="medium">Unknown</Text>
      <Notification
        status="unknown"
        title="Status Title"
        message="This is an example of message text"
      />
    </Box>
  </Box>
);

export const Status = () => <StatusNotification />;

export default {
  title: 'Visualizations/Notification/Status',
};
