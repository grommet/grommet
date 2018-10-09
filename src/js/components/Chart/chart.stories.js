import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Chart, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

import { calcs } from '../Chart/calcs';

class BarChart extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Chart
          type='bar'
          values={[[10, 20], [20, 30], [30, 15]]}
        />
      </Grommet>
    );
  }
}

class LineChart extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Chart
          type='line'
          values={[20, 30, 15]}
        />
      </Grommet>
    );
  }
}

class AreaChart extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Chart
          type='area'
          values={[{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }]}
        />
      </Grommet>
    );
  }
}

class RichChart extends Component {
  state = { values: [], yAxis: [], xAxis: [] }

  componentDidMount() {
    // generate data as a server might
    const date = new Date(2018, 5, 9);
    let value = 12345.678;
    const averages = [];
    while (averages.length < 21) {
      averages.unshift({ date: date.toISOString(), value });
      date.setTime(date.getTime() - (1000 * 3600 * 24));
      const factor = date.getDate() % 3;
      value = (factor === 0 ? value + 12.34 : value - (123.45 * factor));
    }

    // convert for displaying
    const values = [];
    averages.forEach((avg) => {
      values.push({ value: [(new Date(avg.date)).getTime(), avg.value] });
    });

    const { axis, bounds } = calcs(values, { coarseness: 5, steps: [3, 3] });
    const xAxis = axis[0].map(x =>
      (new Date(x)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    const yAxis = axis[1];
    this.setState({ bounds, values, yAxis, xAxis }); // eslint-disable-line
  }

  render() {
    const { bounds, values, yAxis, xAxis } = this.state;
    const chartProps = {
      size: { width: 'medium', height: 'small' },
      bounds,
      values,
      overflow: true,
    };
    return (
      <Grommet theme={grommet}>
        <Box align='center'>
          <Box direction='row' justify='between' width='medium' margin={{ vertical: 'small' }}>
            {xAxis.map(x => <Text key={x}>{x}</Text>)}
          </Box>
          <Stack guidingChild='last'>
            <Box fill={true} justify='between'>
              {yAxis.map((y, index) => {
                const first = index === 0;
                const last = index === yAxis.length - 1 && !first;
                let align;
                if (first) {
                  align = 'start';
                } else if (last) {
                  align = 'end';
                } else {
                  align = 'center';
                }
                return (
                  <Box key={y} direction='row' align={align}>
                    <Box pad={{ horizontal: 'small' }}>
                      <Text>{y}</Text>
                    </Box>
                    <Box border='top' flex={true} />
                  </Box>
                );
              })}
            </Box>
            <Chart
              {...chartProps}
              type='area'
              color={{ color: 'accent-1', opacity: 'medium' }}
              thickness='hair'
            />
            {/* }
            <Chart
              {...chartProps}
              type='bar'
              color={{ color: 'accent-2', opacity: 'medium' }}
              thickness='xsmall'
            />
            { */}
            <Chart
              {...chartProps}
              type='line'
              round={true}
              color={{ color: 'accent-3', opacity: 'strong' }}
              thickness='small'
            />
          </Stack>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Chart', module)
  .add('Bar Chart', () => <BarChart />)
  .add('Line Chart', () => <LineChart />)
  .add('Area Chart', () => <AreaChart />)
  .add('Rich Chart', () => <RichChart />);
