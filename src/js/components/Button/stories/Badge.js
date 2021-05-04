import React from 'react';

import { Box, Button, grommet, Grommet } from 'grommet';
import { Alert, Notification, SettingsOption } from 'grommet-icons';

export const Badge = props => (
  <Grommet theme={grommet}>
    <Box direction="row" align="center" pad="medium" gap="medium">
      <Button
        aria-label="Label, 2 Alerts"
        label="Label"
        onClick={() => {}}
        badge={2}
        secondary
        {...props}
      />
      <Button
        aria-label="100 Unread Notifications"
        label="Notifications"
        onClick={() => {}}
        badge={{
          background: 'status-warning',
          value: 100,
          max: 9,
        }}
        secondary
        {...props}
      />
      <Button
        aria-label="Alert on Settings"
        icon={<SettingsOption />}
        onClick={() => {}}
        badge={
          <Box background="status-critical" pad="xsmall" round="xsmall">
            <Alert size="small" />
          </Box>
        }
        hoverIndicator
        {...props}
      />
      <Button
        aria-label="23 Unread Notifications"
        icon={<Notification />}
        onClick={() => {}}
        badge
        hoverIndicator
        {...props}
      />
    </Box>
  </Grommet>
);

export default {
  title: 'Controls/Button/Badge',
};
