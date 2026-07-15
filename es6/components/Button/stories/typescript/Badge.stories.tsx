import React from 'react';

import { Box, Button, Grommet } from 'grommet';
import { Alert, Filter, Notification, MailOption } from 'grommet-icons';

export const Badge = () => (
  <>
    <Box direction="row" align="center" pad="medium" gap="medium">
      <Button
        a11yTitle="2 Available Updates"
        label="Updates"
        onClick={() => {}}
        badge={2}
      />
      <Button
        a11yTitle="Settings, 1 Alert"
        label="Settings"
        onClick={() => {}}
        badge={
          <Box background="status-critical" pad="xsmall" round="xsmall">
            <Alert size="small" />
          </Box>
        }
      />
      <Button
        a11yTitle="20 Unread Notifications"
        icon={<Notification />}
        onClick={() => {}}
        badge={{
          value: 20,
          max: 15,
        }}
        hoverIndicator
      />
      <Button
        a11yTitle="20 Unread Emails"
        icon={<MailOption />}
        onClick={() => {}}
        badge
        hoverIndicator
      />
      <Button
        a11yTitle="100 Filters Applied"
        icon={<Filter />}
        onClick={() => {}}
        badge={{
          background: 'status-warning',
          value: 100,
        }}
        secondary
      />
    </Box>
  </>
);

export default {
  title: 'Controls/Button/Badge',
};
