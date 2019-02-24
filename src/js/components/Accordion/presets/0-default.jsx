import * as React from 'react';
import Accordion from '../Accordion';
import AccordionPanel from '../../AccordionPanel/AccordionPanel';
import Box from '../../Box/Box/Box';
import Text from '../../Text/Text';

export default (
  <Accordion uxpId="accordionContainer0">
    <AccordionPanel label="Panel 1" uxpId="accordionPanel0">
      <Box pad="medium" background="light-2" uxpId="content0">
        <Text uxpId="text0">One</Text>
      </Box>
    </AccordionPanel>
    <AccordionPanel label="Panel 2" uxpId="accordionPanel1">
      <Box pad="medium" background="light-2" uxpId="content1">
        <Text uxpId="text1">Two</Text>
      </Box>
    </AccordionPanel>
  </Accordion>
);
