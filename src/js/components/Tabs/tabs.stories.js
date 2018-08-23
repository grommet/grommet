import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { Grommet, Box, Tab, Tabs } from '../';
import { grommet } from '../../themes';

const UncontrolledTabs = () => (
  <Grommet theme={grommet}>
    <Tabs>
      <Tab title='Tab 1'>
        <Box margin='small' pad='large' align='center' background='accent-1'>
          <Attraction size='xlarge' />
        </Box>
      </Tab>
      <Tab title='Tab 2'>
        <Box margin='small' pad='large' align='center' background='accent-2'>
          <TreeOption size='xlarge' />
        </Box>
      </Tab>
      <Tab title='Tab 3'>
        <Box margin='small' pad='large' align='center' background='accent-3'>
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
      <Grommet theme={grommet}>
        <Tabs activeIndex={index} onActive={this.onActive}>
          <Tab title='Tab 1'>
            <Box margin='small' pad='large' align='center' background='accent-1'>
              <Attraction size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 2'>
            <Box margin='small' pad='large' align='center' background='accent-2'>
              <TreeOption size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 3'>
            <Box margin='small' pad='large' align='center' background='accent-3'>
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
