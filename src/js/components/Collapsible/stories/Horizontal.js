import React from 'react';
import { storiesOf } from '@storybook/react';

import { Notification } from 'grommet-icons';

import { Box, Button, Collapsible, Heading, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const HorizontalCollapsible = () => {
  const [openNotification, setOpenNotification] = React.useState();

  return (
    <Grommet full theme={grommet}>
      <Box fill>
        <Box
          as="header"
          direction="row"
          align="center"
          pad={{ vertical: 'small', horizontal: 'medium' }}
          justify="between"
          background="neutral-3"
          elevation="large"
          style={{ zIndex: '1000' }}
        >
          <Heading level={3} margin="none" color="white">
            <strong>My App</strong>
          </Heading>
          <Button
            onClick={() => setOpenNotification(!openNotification)}
            icon={<Notification color="white" />}
          />
        </Box>
        <Box flex direction="row">
          <Box flex align="center" justify="center">
            Dashboard content goes here, click on the notification icon
          </Box>
          <Collapsible direction="horizontal" open={openNotification}>
            <Box
              flex
              width="medium"
              background="light-2"
              pad="small"
              elevation="small"
            >
              <Text size="xlarge">Sidebar</Text>
            </Box>
          </Collapsible>
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('Collapsible', module).add('Horizontal', () => (
  <HorizontalCollapsible />
));
