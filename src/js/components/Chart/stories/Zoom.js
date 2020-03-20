import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Button, Chart, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { Next, Previous } from 'grommet-icons';

import { calcs } from '../calcs';
import { generateData } from './data';

const intervalDays = {
  '1 week': 7,
  '30 days': 30,
  '1 year': 365,
};

const ZoomChart = ({ data, max }) => {
  const [reference, setReference] = useState(
    new Date(data[data.length - 1].time),
  );
  const [interval, setInterval] = useState(Object.keys(intervalDays)[1]);

  const startDate = new Date(reference);
  startDate.setDate(reference.getDate() - intervalDays[interval]);

  const values = [];
  data.some(d => {
    const date = new Date(d.time);
    if (date > reference) {
      return true;
    }
    if (date >= startDate) {
      values.push({ value: [d.time, d.value] });
    }
    return false;
  });

  const { axis, bounds, thickness } = calcs(values, { min: 0, max });

  // calculate next and previous references
  const days = intervalDays[interval];
  let nextReference = new Date(reference);
  nextReference.setDate(reference.getDate() + days);
  const firstReference = new Date(data[data.length - 1].time);
  if (nextReference > firstReference) {
    nextReference = firstReference;
  }
  let previousReference = new Date(reference);
  previousReference.setDate(reference.getDate() - days);
  const lastReference = new Date(data[0].time);
  lastReference.setDate(lastReference.getDate() + days);
  if (previousReference < lastReference) {
    previousReference = lastReference;
  }

  return (
    <Grommet theme={grommet}>
      <Box pad="large" direction="row" gap="medium">
        <Button
          hoverIndicator
          icon={<Previous />}
          onClick={() => setReference(previousReference)}
        />
        <Box flex>
          <Box direction="row" justify="end">
            {Object.keys(intervalDays).map(int => (
              <Button key={int} onClick={() => setInterval(int)}>
                <Box pad="small">
                  <Text color={interval === int ? 'black' : 'brand'}>
                    {int}
                  </Text>
                </Box>
              </Button>
            ))}
          </Box>
          <Stack guidingChild="first">
            <Box pad={{ horizontal: thickness }}>
              <Chart
                type="bar"
                overflow
                bounds={bounds}
                values={values}
                thickness={thickness}
                size={{ width: 'full', height: 'small' }}
              />
            </Box>
            <Box fill justify="between">
              <Box border="top" align="start">
                <Box
                  pad="xsmall"
                  background={{ color: 'white', opacity: 'medium' }}
                >
                  <Text>{axis[1][0]}</Text>
                </Box>
              </Box>
              <Box border="bottom" align="start">
                <Box
                  pad="xsmall"
                  background={{ color: 'white', opacity: 'medium' }}
                >
                  <Text>{axis[1][1]}</Text>
                </Box>
              </Box>
            </Box>
          </Stack>
          <Box direction="row" justify="between">
            {/* className="chromatic-ignore" is used for the story testing. 
                grommet doesn't recommend the usage of className */}
            {axis[0].map(t => (
              <Text key={t} className="chromatic-ignore">
                {new Date(t).toLocaleDateString()}
              </Text>
            ))}
          </Box>
        </Box>
        <Button
          hoverIndicator
          icon={<Next />}
          onClick={() => setReference(nextReference)}
        />
      </Box>
    </Grommet>
  );
};

storiesOf('Chart', module).add('Zoom', () => (
  <ZoomChart data={generateData(1000, 100)} max={100} />
));
