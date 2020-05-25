import React from 'react';
import { storiesOf } from '@storybook/react';

import { SubtractCircle, AddCircle } from 'grommet-icons';

import { Accordion, AccordionPanel, Box, Text } from 'mnet-ui-base';

const CustomAccordionTheme = {
  accordion: {
    heading: { level: '3' },
    icons: {
      collapse: SubtractCircle,
      expand: AddCircle,
      color: 'hotpink',
    },
    border: undefined,
  },
};

const CustomAccordion = ({ animate, multiple, ...rest }) => (
  <div theme={CustomAccordionTheme}>
    <Box {...rest} pad="large" align="center" justify="center">
      <Accordion animate={animate} multiple>
        <AccordionPanel
          label={<Text size="large">Panel 1 - uses large Text size</Text>}
        >
          <Box background="light-2" height="small">
            Important Info
          </Box>
        </AccordionPanel>
        <AccordionPanel
          label={
            <Text size="xlarge" margin="vertical">
              Panel 2 - uses xlarge Text size
            </Text>
          }
        >
          <Box background="light-2" height="xsmall">
            <Text size="small">Important Info</Text>
          </Box>
        </AccordionPanel>
        {/* eslint-disable-next-line max-len */}
        <AccordionPanel label="Panel 3 - uses custom theme heading level for sizing">
          <Box background="light-2" height="xsmall">
            <Text size="small">Important Info</Text>
          </Box>
        </AccordionPanel>
      </Accordion>
    </Box>
  </div>
);

storiesOf('Accordion', module).add('Custom', () => <CustomAccordion />);
