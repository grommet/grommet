import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';

class CircleMeter extends React.Component {
  state = { value: 20 };

  componentDidMount() {
    this.timer = setInterval(() => {
      const { value } = this.state;
      this.setState({ value: value < 100 ? value + 8 : 20 });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { value } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <Meter
            type="circle"
            background="light-2"
            values={[{ value, color: value > 50 ? 'accent-2' : 'accent-1' }]}
          />
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Meter', module).add('Circle', () => <CircleMeter />);
