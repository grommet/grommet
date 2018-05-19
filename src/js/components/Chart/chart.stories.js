import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Chart from '../Chart/Chart';
import Grommet from '../Grommet/Grommet';

class BarChart extends Component {
  render() {
    return (
      <Grommet>
        <Chart
          type='bar'
          values={[{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }]}
        />
      </Grommet>
    );
  }
}

class LineChart extends Component {
  render() {
    return (
      <Grommet>
        <Chart
          type='line'
          values={[{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }]}
        />
      </Grommet>
    );
  }
}

class AreaChart extends Component {
  render() {
    return (
      <Grommet>
        <Chart
          type='area'
          values={[{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }]}
        />
      </Grommet>
    );
  }
}

storiesOf('Chart', module)
  .add('Bar Chart', () => <BarChart />)
  .add('Line Chart', () => <LineChart />)
  .add('Area Chart', () => <AreaChart />);
