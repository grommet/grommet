import React from 'react';

import { ThemeType } from 'grommet/themes';
import { Box, Button, grommet, Grommet } from 'grommet';
import { Alert, Filter, Notification, MailOption } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.
const customTheme: ThemeType = deepMerge(grommet, {
  button: {
    default: {},
    hover: {
      default: { background: 'background-contrast' },
      secondary: {
        border: {
          width: '3px',
        },
      },
    },
    secondary: {
      border: {
        color: '#2196f3',
        width: '2px',
      },
    },
    border: {
      radius: '4px',
    },
    size: {
      medium: {
        pad: {
          vertical: '6px',
          horizontal: '12px',
        },
      },
    },
  },
});

export const Badge = () => (
  <>
    <Grommet theme={grommet}>
      <Box direction="row" align="center" pad="medium" gap="medium">
        <Button
          aria-label="2 Available Updates"
          label="Updates"
          onClick={() => {}}
          badge={2}
        />
        <Button
          aria-label="Settings, 1 Alert"
          label="Settings"
          onClick={() => {}}
          badge={
            <Box background="status-critical" pad="xsmall" round="xsmall">
              <Alert size="small" />
            </Box>
          }
        />
        <Button
          aria-label="20 Unread Notifications"
          icon={<Notification />}
          onClick={() => {}}
          badge={{
            target: 'contents',
            value: 20,
            max: 9,
          }}
          hoverIndicator
        />
        <Button
          aria-label="20 Unread Emails"
          icon={<MailOption />}
          onClick={() => {}}
          badge={{
            target: 'contents',
            value: true,
          }}
          hoverIndicator
        />
      </Box>
    </Grommet>
    <Grommet theme={customTheme}>
      <Box direction="row" align="center" pad="medium" gap="medium">
        <Button
          aria-label="2 Updates Available"
          label="Updates"
          onClick={() => {}}
          badge={2}
          secondary
        />
        <Button
          aria-label="100 Unread Notifications"
          label="Notifications"
          onClick={() => {}}
          badge={
            <Box background="status-critical" pad="xsmall" round="xsmall">
              <Alert size="small" />
            </Box>
          }
          secondary
        />
        <Button
          aria-label="100 Filters Applied"
          icon={<Filter />}
          onClick={() => {}}
          badge={{
            background: 'status-warning',
            border: { color: '#FFF', size: 'small' },
            value: 100,
            max: 9,
          }}
          secondary
        />
        <Button
          aria-label="20 Unread Notifications"
          icon={<Notification />}
          onClick={() => {}}
          badge={{
            target: 'contents',
            value: 20,
            max: 9,
          }}
          hoverIndicator
        />
        <Button
          aria-label="20 Unread Emails"
          icon={<MailOption />}
          onClick={() => {}}
          badge={{
            target: 'contents',
            value: true,
          }}
          hoverIndicator
        />
      </Box>
    </Grommet>
  </>
);

export default {
  title: 'Controls/Button/Badge',
};
