import React from 'react';
import { storiesOf } from '@storybook/react';

import { Accordion, AccordionPanel, Box, Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe-next';
import { deepMerge } from 'grommet/utils';

const theme = deepMerge(hpe, {
  accordion: {
    border: undefined,
    heading: {
      margin: { vertical: 'medium', horizontal: 'xsmall' },
    },
    hover: {
      color: undefined,
    },
    panel: {
      border: {
        side: 'horizontal',
      },
    },
  },
});

const AccordionExample = () => {
  const pad = 'small';

  return (
    <Grommet theme={theme}>
      <Accordion pad="small">
        <AccordionPanel label="Our Company">
          <Box pad={pad}>We are HPE.</Box>
        </AccordionPanel>
        <AccordionPanel label="Our History">
          <Box pad={pad}>
            At Hewlett Packard Enterprise, we advance the way you live and work
            by engineering experiences that unlock your full potential.
          </Box>
        </AccordionPanel>
        <AccordionPanel label="Our Purpose">
          <Box pad={pad}>
            We advance the way you live and work by engineering experiences that
            unlock your full potential.
          </Box>
        </AccordionPanel>
        <AccordionPanel label="What's New">
          <Box pad={pad}>We make Bold Moves.</Box>
        </AccordionPanel>
      </Accordion>
    </Grommet>
  );
};

storiesOf('Accordion', module).add('Themed', () => <AccordionExample />);
