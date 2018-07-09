import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import WorldMap from '../WorldMap/WorldMap';
import Grommet from '../Grommet/Grommet';

class SimpleWorldMap extends Component {
  state = {}

  onSelectPlace = (place) => {
    this.setState({ places: [{ color: 'accent-1', location: place }] });
  }

  render() {
    const { places } = this.state;
    return (
      <Grommet>
        <WorldMap onSelectPlace={this.onSelectPlace} places={places} />
      </Grommet>
    );
  }
}

storiesOf('WorldMap', module)
  .add('Simple WorldMap', () => <SimpleWorldMap />);
