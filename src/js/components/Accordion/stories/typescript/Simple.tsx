import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Accordion, AccordionPanel, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleAccordion = ({ animate = false, multiple = false, ...rest }) => (
  <Grommet theme={grommet}>
    <Box {...rest}>
      <Accordion animate={animate} multiple={multiple}>
        <AccordionPanel label="Panel 1">
          <Box background="light-2" overflow="auto" height="medium">
            <Box height="large" flex={false}>
              Panel 1 contents
            </Box>
          </Box>
        </AccordionPanel>
        <AccordionPanel label="Panel 2">
          <Box background="light-2" style={{ height: '50px' }}>
            Panel 2 contents
          </Box>
        </AccordionPanel>
        <AccordionPanel label="Panel 3">
          <Box background="light-2" style={{ height: '300px' }}>
            Panel 3 contents
          </Box>
        </AccordionPanel>
      </Accordion>
    </Box>
  </Grommet>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Accordion', module)
    .add('Simple', () => <SimpleAccordion />)
    .add('Dark no animation', () => (
      <SimpleAccordion animate={false} background="dark-2" />
    ))
    .add('Multiple', () => <SimpleAccordion multiple />);
}
