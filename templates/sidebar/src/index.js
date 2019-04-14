import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Box, Grommet } from 'grommet';
import {
  Grommet as GrommetIcon,
  Group,
  SettingsOption,
  Servers as ServersIcon,
} from 'grommet-icons';

import { theme } from './theme';
import { Sidebar } from './components';
import { Dashboard, NotFound, Servers, Settings, Users } from './pages';

const userSession = {
  user: {
    name: 'Alan Souza',
    thumbnail: '//s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80',
  },
  items: [
    {
      label: 'Logout',
      href: '#',
    },
  ],
};

const items = [
  {
    label: 'Servers',
    Icon: ServersIcon,
    path: '/servers',
  },
  {
    label: 'Users',
    Icon: Group,
    path: '/users',
  },
  {
    label: 'Settings',
    Icon: SettingsOption,
    path: '/settings',
  },
];

const App = () => {
  return (
    <Router>
      <Grommet theme={theme} full>
        <Box direction="row" fill>
          <Sidebar
            appIcon={<GrommetIcon color="brand" />}
            appName="My App"
            items={items}
            userSession={userSession}
          />
          <Box flex>
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/servers" component={Servers} />
              <Route path="/users" component={Users} />
              <Route path="/settings" component={Settings} />
              <Route component={NotFound} />
            </Switch>
          </Box>
        </Box>
      </Grommet>
    </Router>
  );
};

render(<App />, document.getElementById('app'));
