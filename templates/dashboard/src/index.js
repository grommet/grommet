import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  Box,
  Button,
  Grommet,
  Text,
  TextInput,
  ResponsiveContext,
} from 'grommet';
import { Search, Menu } from 'grommet-icons';
import { theme } from './theme';
import {
  AppHeader,
  Hardware,
  Notification,
  UtilizationCard,
  VirtualMachinesCard,
} from './components';
import { hardware, utilization, vms, notification } from './data';

const userSession = {
  user: {
    name: 'Shimi Shimi',
    thumbnail: '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80',
  },
  items: [
    {
      label: 'Logout',
      href: '#',
    },
  ],
};

class AppBody extends Component {
  static contextType = ResponsiveContext;

  render() {
    return (
      <Grommet theme={theme} full>
        <Box fill background="light-3">
          <AppHeader
            appName="Fort Collins, Cluster 4"
            appIcon={<Menu />}
            userSession={userSession}
          />
          <Box flex overflow="auto" gap="medium" pad="medium">
            <Box
              flex={false}
              overflow="auto"
              round="large"
              background={{ color: 'dark-5', opacity: 'weak' }}
              direction="row"
              align="center"
              pad={{ horizontal: 'medium', vertical: 'small' }}
              margin={{ horizontal: 'medium', top: 'medium' }}
            >
              <Search color="brand" />
              <TextInput plain placeholder="Search Cluster" type="search" />
            </Box>
            <Box flex={false} direction="row-responsive" wrap>
              <Box gap="large" flex="grow" margin="medium">
                <Notification data={notification} />
                <VirtualMachinesCard data={vms} />
              </Box>
              <Box gap="large" flex="grow" margin="medium">
                {utilization.map(data => (
                  <UtilizationCard key={data.name} data={data} />
                ))}
              </Box>
              <Box flex="grow" margin="medium">
                <Hardware data={hardware} />
              </Box>
            </Box>
          </Box>

          <Box
            flex={false}
            pad={{ vertical: 'xsmall', left: 'medium' }}
            responsive={false}
            background={{ color: 'brand', dark: false }}
            direction="row"
            align="center"
            justify="between"
          >
            <Text color="light-1">5 Running Tasks</Text>
            <Button
              size="medium"
              label="Show Tasks"
              icon={<Menu color="white" />}
              reverse
            />
          </Box>
        </Box>
      </Grommet>
    );
  }
}
const App = () => (
  <Grommet theme={theme} full>
    <AppBody />
  </Grommet>
);
render(<App />, document.getElementById('app'));
