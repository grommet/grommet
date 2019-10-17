import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from 'styled-components';

import { CircleInformation, Currency } from 'grommet-icons';

import { Grommet, FormField, Tab, Tabs, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

import { RichTabTitle } from './Rich';

const customTheme = deepMerge(grommet, {
  global: {
    edgeSize: {
      small: '10px',
    },
    elevation: {
      light: {
        small: '0px 1px 5px rgba(0, 0, 0, 0.50)',
        medium: '0px 3px 8px rgba(0, 0, 0, 0.50)',
      },
    },
  },
  tab: {
    active: {
      background: 'dark-1',
      color: 'accent-1',
    },
    background: 'dark-3',
    border: undefined,
    color: 'white',
    hover: {
      background: 'dark-1',
    },
    margin: undefined,
    pad: {
      bottom: undefined,
      horizontal: 'small',
    },
    extend: ({ theme }) => css`
      border-radius: ${theme.global.control.border.radius};
      box-shadow: ${theme.global.elevation.light.small};
    `,
  },
  tabs: {
    background: 'dark-3',
    gap: 'medium',
    header: {
      background: 'dark-2',
      extend: ({ theme }) => css`
        padding: ${theme.global.edgeSize.small};
        box-shadow: ${theme.global.elevation.light.medium};
      `,
    },
    panel: {
      extend: ({ theme }) => css`
        padding: ${theme.global.edgeSize.large};
        box-shadow: ${theme.global.elevation.light.medium};
      `,
    },
  },
});

const CustomTabs = () => (
  <Grommet theme={customTheme}>
    <Tabs>
      <Tab
        title={
          <RichTabTitle
            icon={<CircleInformation color="accent-1" />}
            label="Personal Data"
          />
        }
      >
        <FormField label="Name">
          <TextInput placeholder="Enter your name..." />
        </FormField>
      </Tab>
      <Tab
        title={
          <RichTabTitle icon={<Currency color="light-3" />} label="Payment" />
        }
      >
        <FormField label="Card Number">
          <TextInput placeholder="Enter your card number..." />
        </FormField>
      </Tab>
      <Tab title="Simple Tab">
        This Tab has a different styling than the RichTabTitle (e.g
        tab.active.color)
      </Tab>
    </Tabs>
  </Grommet>
);

storiesOf('Tabs', module).add('Custom Theme', () => <CustomTabs />);
