import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Meter, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

class MultipleValues extends Component {
  state = { total: 70 };

  render() {
    const { active, label, total } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <Stack anchor="center">
            <Meter
              type="circle"
              background="light-2"
              values={[
                {
                  value: 40,
                  onHover: over =>
                    this.setState({
                      active: over ? 40 : 0,
                      label: over ? 'in use' : undefined,
                    }),
                },
                {
                  value: 30,
                  onHover: over =>
                    this.setState({
                      active: over ? 30 : 0,
                      label: over ? 'available' : undefined,
                    }),
                },
              ]}
              max={100}
              size="small"
              thickness="medium"
            />
            <Box align="center">
              <Box direction="row" align="center" pad={{ bottom: 'xsmall' }}>
                <Text size="xxlarge" weight="bold">
                  {active || total}
                </Text>
                <Text>GB</Text>
              </Box>
              <Text>{label || 'total'}</Text>
            </Box>
          </Stack>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Meter', module).add('Multiple Values', () => <MultipleValues />);
