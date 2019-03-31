import React, { Component } from 'react';
import { render } from 'react-dom';

import { Box, Grommet, Heading, Text } from 'grommet';
import { List, ListItem } from './components';
import { grommet } from 'grommet/themes';
import { data } from './data/data';

class App extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <Heading level="3"> List & ListItem </Heading>
        </Box>
        <List pad={{ horizontal: 'large' }}>
          {data.map(({ name, location, id }, index) => (
            <ListItem key={id} index={index}>
              <Text>{name}</Text>
              <Box>{location}</Box>
            </ListItem>
          ))}
        </List>
      </Grommet>
    );
  }
}

render(<App />, document.getElementById('root'));
