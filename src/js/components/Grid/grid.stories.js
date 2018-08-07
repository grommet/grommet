import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Grid from '../Grid/Grid';
import Box from '../Box/Box';
import Button from '../Button/Button';
import Text from '../Text/Text';
import Grommet from '../Grommet/Grommet';

class AppGrid extends Component {
  state = { sidebar: true }
  render() {
    const { sidebar } = this.state;
    return (
      <Grommet>
        <Grid
          rows={['auto', 'medium']}
          columns={[sidebar ? 'small' : 0, 'flex']}
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'sidebar', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] },
          ]}
        >
          <Box
            gridArea='header'
            direction='row'
            align='center'
            justify='between'
            pad={{ horizontal: 'medium', vertical: 'small' }}
            background='dark-2'
          >
            <Button onClick={() => this.setState({ sidebar: !sidebar })}>
              <Text size='large'>Title</Text>
            </Button>
            <Text>my@email</Text>
          </Box>
          <Box
            gridArea='sidebar'
            background='dark-5'
          >
            {['First', 'Second', 'Third'].map(name => (
              <Button key={name} href='#' hoverIndicator={true}>
                <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                  <Text>{name}</Text>
                </Box>
              </Button>
            ))}
          </Box>
          <Box gridArea='main' justify='center' align='center'>
            <Text>main</Text>
          </Box>
        </Grid>
      </Grommet>
    );
  }
}

storiesOf('Grid', module)
  .add('App', () => <AppGrid />);
