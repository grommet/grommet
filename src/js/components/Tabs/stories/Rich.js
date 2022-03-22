import React from 'react';

import { Box, Tab, Tabs } from 'grommet';
import { Currency, HomeRounded, Notification, User } from 'grommet-icons';

export const TabsWithIcons = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" pad="medium">
    <Tabs>
      <Tab title="General" icon={<HomeRounded />}>
        <Box margin="small">General Information</Box>
      </Tab>
      <Tab title="Account" icon={<User />}>
        <Box margin="small">Account Information</Box>
      </Tab>
      <Tab title="Billing" icon={<Currency />}>
        <Box margin="small">Billing Information</Box>
      </Tab>
      <Tab title="Notifications" icon={<Notification />}>
        <Box margin="small">Notifications will show here.</Box>
      </Tab>
    </Tabs>
  </Box>
  // </Grommet>
);

TabsWithIcons.storyName = 'Tabs with icons';

export default {
  title: 'Controls/Tabs/Tabs with icons',
};
