import React from 'react';

import { Grommet, Box, Heading, Paragraph, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const paragraphFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

export const Small = () => (
  <Grommet theme={grommet}>
    <Box pad="medium">
      <div>
        <Heading size="small">Heading 1 - Small</Heading>
        <Text size="large">Text Large</Text>
        <Paragraph>
          Paragraph - Medium
          {paragraphFiller}
        </Paragraph>
        <Heading level={2} size="small">
          Heading 2 - Small
        </Heading>
        <Text>Text Medium</Text>
        <Paragraph>
          Paragraph - Medium
          {paragraphFiller}
        </Paragraph>
        <Heading level={3} size="small">
          Heading 3 - Small
        </Heading>
        <Text>Text Medium</Text>
        <Paragraph size="small">
          Paragraph - Small
          {paragraphFiller}
        </Paragraph>
        <Heading level={4} size="small">
          Heading 4 - Small
        </Heading>
        <Text size="small">Text Small</Text>
        <Paragraph size="small">
          Paragraph - Small
          {paragraphFiller}
        </Paragraph>
      </div>
    </Box>
  </Grommet>
);

export default {
  title: 'Type/Typography/Small',
};
