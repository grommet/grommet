import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import WorldMap from '../WorldMap/WorldMap';
import Grommet from '../Grommet/Grommet';

class SimpleWorldMap extends Component {
  render() {
    return (
      <Grommet>
        <WorldMap />
      </Grommet>
    );
  }
}

storiesOf('WorldMap', module)
  .add('Simple WorldMap', () => <SimpleWorldMap />);
