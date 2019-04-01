import React, { Component } from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Box, Grommet, ResponsiveContext } from 'grommet';
import { Grommet as GrommetIcon } from 'grommet-icons';

import { theme } from './theme';
import { AppHeader, Sidebar } from './components';
import { Dashboard, NotFound, Server, Servers, Settings, Users } from './pages';

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
    active: true,
    label: 'Home',
    path: '/',
    exact: true,
  },
  {
    active: true,
    label: 'Servers',
    path: '/servers',
  },
  {
    active: true,
    label: 'Users',
    path: '/users',
  },
  {
    active: false,
    label: 'Settings',
    path: '/settings',
  },
];

class AppBody extends Component {
  static contextType = ResponsiveContext;

  state = {
    showSidebar: false,
  };

  componentDidUpdate() {
    const size = this.context;
    const { showSidebar } = this.state;
    if (size !== 'small' && !showSidebar) {
      this.setState({ showSidebar: true });
    }
  }

  onToggleSidebar = () =>
    this.setState({ showSidebar: !this.state.showSidebar });

  render() {
    const { showSidebar } = this.state;
    return (
      <Router>
        <Grommet theme={theme} full>
          <Box fill>
            <AppHeader
              appName="My App"
              appIcon={<GrommetIcon />}
              userSession={userSession}
              onToggleSidebar={this.onToggleSidebar}
            />
            <Box direction="row" flex>
              {showSidebar && (
                <Sidebar
                  appIcon={<GrommetIcon color="brand" />}
                  items={items}
                  onToggleSidebar={this.onToggleSidebar}
                />
              )}
              <Box flex>
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/servers" exact component={Servers} />
                  <Route path="/servers/:id" component={Server} />
                  <Route path="/users" component={Users} />
                  <Route path="/settings" component={Settings} />
                  <Route component={NotFound} />
                </Switch>
              </Box>
            </Box>
          </Box>
        </Grommet>
      </Router>
    );
  }
}

const App = () => (
  <Router>
    <Grommet theme={theme} full>
      <AppBody />
    </Grommet>
  </Router>
);

render(<App />, document.getElementById('app'));
