import React from 'react';
import { storiesOf } from '@storybook/react';

import { Accordion, AccordionPanel, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const ExamplePanel = ({ index }) => (
  <AccordionPanel label={`Panel ${index}`}>
    <Box background="light-2" overflow="auto" height="medium">
      <Box height="medium" flex={false}>
        Panel {index} contents
      </Box>
    </Box>
  </AccordionPanel>
);

const Example = props => {
  const { animate, multiple, ...rest } = props;
  return (
    <Grommet theme={grommet}>
      <Box {...rest}>
        <Accordion animate={animate} multiple={multiple}>
          {[1, 2, 3].map(index => (
            <ExamplePanel key={index} index={index} />
          ))}
        </Accordion>
      </Box>
    </Grommet>
  );
};

storiesOf('Accordion', module).add('Wrapped', () => <Example />);
