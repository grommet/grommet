import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, WorldMap } from '..';
import { grommet } from '../../themes';

class SimpleWorldMap extends Component {
  state = {};

  onSelectPlace = place => {
    this.setState({ places: [{ color: 'accent-1', location: place }] });
  };

  render() {
    const { places } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <WorldMap onSelectPlace={this.onSelectPlace} places={places} />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('WorldMap', module).add('Simple WorldMap', () => <SimpleWorldMap />);
