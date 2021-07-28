import React from 'react';

import { Grommet, Notification } from 'grommet';
import { grommet } from 'grommet/themes';
import { Box } from '../../Box';
import { Text } from '../../Text';

const StatusNotification = () => (
  <Grommet theme={grommet}>
    <Box pad="large" justify="center" gap="large">
      <Box gap="xsmall">
        <Text size="medium">Default (No status prop)</Text>
        <Notification
          message="Status Message"
          body="This is an example of body text"
        />
      </Box>
      <Box gap="xsmall">
        <Text size="medium">Good</Text>
        <Notification
          status="good"
          message="Status Message"
          body="This is an example of body text"
        />
      </Box>
      <Box gap="xsmall">
        <Text size="medium">Warning</Text>
        <Notification
          status="warning"
          message="Status Message"
          body="This is an example of body text"
        />
      </Box>
      <Box gap="xsmall">
        <Text size="medium">Critical</Text>
        <Notification
          status="critical"
          message="Status Message"
          body="This is an example of body text"
        />
      </Box>
      <Box gap="xsmall">
        <Text size="medium">Unknown</Text>
        <Notification
          status="unknown"
          message="Status Message"
          body="This is an example of body text"
        />
      </Box>
    </Box>
  </Grommet>
);

export const Status = () => <StatusNotification />;

export default {
  title: 'Visualizations/Notification/Status',
};
