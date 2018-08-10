import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import Tabs from '../Tabs/Tabs';
import Tab from '../Tabs/Tab';
import Box from '../Box/Box';
import Grommet from '../Grommet/Grommet';

const UncontrolledTabs = () => (
  <Grommet>
    <Tabs>
      <Tab title='Tab 1'>
        <Box pad='large' align='center' background='accent-1'>
          <Attraction size='xlarge' />
        </Box>
      </Tab>
      <Tab title='Tab 2'>
        <Box pad='large' align='center' background='accent-2'>
          <TreeOption size='xlarge' />
        </Box>
      </Tab>
      <Tab title='Tab 3'>
        <Box pad='large' align='center' background='accent-3'>
          <Car size='xlarge' />
        </Box>
      </Tab>
    </Tabs>
  </Grommet>
);

class ControlledTabs extends Component {
  state = {}

  onActive = index => this.setState({ index })

  render() {
    const { index } = this.state;
    return (
      <Grommet>
        <Tabs activeIndex={index} onActive={this.onActive}>
          <Tab title='Tab 1'>
            <Box pad='large' align='center' background='accent-1'>
              <Attraction size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 2'>
            <Box pad='large' align='center' background='accent-2'>
              <TreeOption size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 3'>
            <Box pad='large' align='center' background='accent-3'>
              <Car size='xlarge' />
            </Box>
          </Tab>
        </Tabs>
      </Grommet>
    );
  }
}


storiesOf('Tabs', module)
  .add('Uncontrolled Tabs', () => <UncontrolledTabs />)
  .add('Controlled Tabs', () => <ControlledTabs />);
