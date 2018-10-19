import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { css } from 'styled-components';

import {
  Attraction, Car, CircleInformation, Currency, TreeOption,
} from 'grommet-icons';

import {
  Box, Grommet, FormField, Tab, Tabs, Text, TextInput,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

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

class ResponsiveTabs extends Component {
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
          <Tab title='Tab 4'>
            <Box margin='small' pad='large' align='center' background='accent-1'>
              <Attraction size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 5'>
            <Box margin='small' pad='large' align='center' background='accent-2'>
              <TreeOption size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 6'>
            <Box margin='small' pad='large' align='center' background='accent-3'>
              <Car size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 7'>
            <Box margin='small' pad='large' align='center' background='accent-1'>
              <Attraction size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 8'>
            <Box margin='small' pad='large' align='center' background='accent-2'>
              <TreeOption size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 9'>
            <Box margin='small' pad='large' align='center' background='accent-3'>
              <Car size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 10'>
            <Box margin='small' pad='large' align='center' background='accent-1'>
              <Attraction size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 11'>
            <Box margin='small' pad='large' align='center' background='accent-1'>
              <Attraction size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 12'>
            <Box margin='small' pad='large' align='center' background='accent-2'>
              <TreeOption size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 13'>
            <Box margin='small' pad='large' align='center' background='accent-3'>
              <Car size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 14'>
            <Box margin='small' pad='large' align='center' background='accent-1'>
              <Attraction size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 15'>
            <Box margin='small' pad='large' align='center' background='accent-2'>
              <TreeOption size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 16'>
            <Box margin='small' pad='large' align='center' background='accent-3'>
              <Car size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 17'>
            <Box margin='small' pad='large' align='center' background='accent-1'>
              <Attraction size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 18'>
            <Box margin='small' pad='large' align='center' background='accent-2'>
              <TreeOption size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 19'>
            <Box margin='small' pad='large' align='center' background='accent-3'>
              <Car size='xlarge' />
            </Box>
          </Tab>
          <Tab title='Tab 20'>
            <Box margin='small' pad='large' align='center' background='accent-1'>
              <Attraction size='xlarge' />
            </Box>
          </Tab>
        </Tabs>
      </Grommet>
    );
  }
}
const RichTabTitle = ({ icon, label }) => (
  <Box direction='row' align='center' gap='xsmall' margin='xsmall'>
    {icon}
    <Text size='small'>
      <strong>{label}</strong>
    </Text>
  </Box>
);

RichTabTitle.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

const RichTabs = () => (
  <Grommet theme={grommet}>
    <Tabs>
      <Tab title={<RichTabTitle icon={<CircleInformation color='accent-1' />} label='Personal Data' />}>
        <FormField label='Name'>
          <TextInput placeholder='Enter your name...' />
        </FormField>
      </Tab>
      <Tab title={<RichTabTitle icon={<Currency color='neutral-5' />} label='Payment' />}>
        <FormField label='Card Number'>
          <TextInput placeholder='Enter your card number...' />
        </FormField>
      </Tab>
    </Tabs>
  </Grommet>
);

const customTheme = deepMerge(grommet, {
  global: {
    elevation: {
      light: {
        small: '0px 1px 5px rgba(0, 0, 0, 0.50)',
        medium: '0px 3px 8px rgba(0, 0, 0, 0.50)',
      },
    },
  },
  tab: {
    background: 'dark-1',
    hover: {
      background: 'dark-2',
    },
    extend: ({ theme }) => css`
      border-radius: ${theme.global.control.border.radius};
      padding: 0px ${theme.global.edgeSize.small};
      box-shadow: ${theme.global.elevation.light.small};
    `,
  },
  tabs: {
    background: 'dark-4',
    header: {
      background: 'dark-3',
      extend: ({ theme }) => css`
        padding: ${theme.global.edgeSize.small};
        box-shadow: ${theme.global.elevation.light.medium};
      `,
    },
    gap: 'medium',
  },
});

const CustomTabs = () => (
  <Grommet theme={customTheme}>
    <Tabs>
      <Tab header={<RichTabTitle icon={<CircleInformation color='accent-1' />} label='Personal Data' />}>
        <FormField label='Name'>
          <TextInput placeholder='Enter your name...' />
        </FormField>
      </Tab>
      <Tab header={<RichTabTitle icon={<Currency color='neutral-5' />} label='Payment' />}>
        <FormField label='Card Number'>
          <TextInput placeholder='Enter your card number...' />
        </FormField>
      </Tab>
    </Tabs>
  </Grommet>
);

storiesOf('Tabs', module)
  .add('Uncontrolled Tabs', () => <UncontrolledTabs />)
  .add('Controlled Tabs', () => <ControlledTabs />)
  .add('Responsive Tabs', () => <ResponsiveTabs />)
  .add('Rich Tabs', () => <RichTabs />)
  .add('CustomTheme', () => <CustomTabs />);
