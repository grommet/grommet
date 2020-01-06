import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { CircleInformation, Currency } from 'grommet-icons';
import {
  Box,
  MnetUIBase,
  FormField,
  Tab,
  Tabs,
  Text,
  TextInput,
} from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const RichTabs = () => (
  <MnetUIBase theme={mnet}>
    <Tabs>
      <Tab
        title={
          <RichTabTitle
            icon={<CircleInformation color="accent-2" />}
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
          <RichTabTitle icon={<Currency color="neutral-2" />} label="Payment" />
        }
      >
        <FormField label="Card Number">
          <TextInput placeholder="Enter your card number..." />
        </FormField>
      </Tab>
    </Tabs>
  </MnetUIBase>
);

const RichTabTitle = ({ icon, label }) => (
  <Box direction="row" align="center" gap="xsmall" margin="xsmall">
    {icon}
    <Text size="small">
      <strong>{label}</strong>
    </Text>
  </Box>
);

RichTabTitle.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

storiesOf('Tabs', module).add('Rich', () => <RichTabs />);

export { RichTabTitle };
