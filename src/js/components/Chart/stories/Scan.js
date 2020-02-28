import React, { useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Chart, Keyboard, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

import { calcs } from '../calcs';
import { generateData } from './data';

const ScanChart = props => {
  const [active, setActive] = useState(undefined);

  const { data, max } = props;

  const values = data.map(d => [d.time, d.value]);
  const { axis, bounds, pad, thickness } = useMemo(
    () => calcs(values, { min: 0, max }),
    [values, max],
  );

  return (
    <Grommet theme={grommet}>
      <Keyboard
        onLeft={() => setActive(Math.max(0, active - 1))}
        onRight={() => setActive(Math.min(data.length - 1, active + 1))}
        onEsc={() => setActive(undefined)}
      >
        <Box tabIndex="0" direction="row" margin="large">
          {/* y-axis */}
          <Box width="xxsmall">
            <Box flex justify="between">
              <Box border="top" align="end">
                <Box
                  pad="xsmall"
                  background={{ color: 'white', opacity: 'medium' }}
                >
                  <Text>{axis[1][0]}</Text>
                </Box>
              </Box>
              <Box border="bottom" align="end">
                <Box
                  pad="xsmall"
                  background={{ color: 'white', opacity: 'medium' }}
                >
                  <Text>{axis[1][1]}</Text>
                </Box>
              </Box>
            </Box>
            <Box height="xxsmall" flex={false} />
          </Box>

          <Box width="large">
            <Stack guidingChild="first">
              <Box pad={{ horizontal: pad }}>
                <Chart
                  type="bar"
                  overflow
                  bounds={bounds}
                  values={values}
                  thickness={thickness}
                  size={{ width: 'full', height: 'small' }}
                />
              </Box>
              <Box fill direction="row" justify="between">
                {values.map((v, i) => (
                  <Box flex={false} key={v[0]}>
                    <Stack fill anchor="center" interactiveChild="first">
                      <Box
                        fill
                        pad={pad}
                        background={
                          active === i
                            ? { color: 'dark-5', opacity: 'medium' }
                            : undefined
                        }
                        onMouseOver={() => setActive(i)}
                        onMouseOut={() => setActive(undefined)}
                        onFocus={() => {}}
                        onBlur={() => {}}
                      />
                      {/* tip flag */}
                      {active === i && (
                        <Box
                          animation={{ type: 'fadeIn', duration: 100 }}
                          width="xsmall"
                          pad="small"
                          round="small"
                          background="dark-3"
                        >
                          <Text size="large">{data[active].value}</Text>
                          {/* className="chromatic-ignore" is used for this 
                            component testing. grommet doesn't reccomend the
                            usage of className */}
                          <Text className="chromatic-ignore" size="small">
                            {new Date(data[active].time).toLocaleDateString()}
                          </Text>
                        </Box>
                      )}
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Stack>

            {/* x-axis */}
            <Box
              height="xxsmall"
              direction="row"
              justify="between"
              align="center"
            >
              {axis[0].map(t => (
                <Text className="chromatic-ignore" key={t}>
                  {new Date(t).toLocaleDateString()}
                </Text>
              ))}
            </Box>
          </Box>
        </Box>
      </Keyboard>
    </Grommet>
  );
};

storiesOf('Chart', module).add('Scan', () => (
  <ScanChart data={generateData(30, 100)} max={100} />
));
