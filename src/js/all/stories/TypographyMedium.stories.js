import React from 'react';

import { Grommet, Box, Heading, Paragraph, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const paragraphFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

export const Medium = () => {
  const margin = undefined;
  return (
    <Grommet theme={grommet}>
      <Box pad="medium">
        <div>
          <Heading margin={margin}>Heading 1 - Medium</Heading>
          <Text size="xlarge">Text XLarge</Text>
          <Paragraph size="large" margin={margin}>
            Paragraph - Large
            {paragraphFiller}
          </Paragraph>
          <Heading level={2} margin={margin}>
            Heading 2 - Medium
          </Heading>
          <Text size="large">Text Large</Text>
          <Paragraph margin={margin}>
            Paragraph - Medium
            {paragraphFiller}
          </Paragraph>
          <Heading level={3} margin={margin}>
            Heading 3 - Medium
          </Heading>
          <Text>Text Medium</Text>
          <Paragraph margin={margin}>
            Paragraph - Medium
            {paragraphFiller}
          </Paragraph>
          <Heading level={4} margin={margin}>
            Heading 4 - Medium
          </Heading>
          <Text size="small">Text Small</Text>
          <Paragraph size="small" margin={margin}>
            Paragraph - Small
            {paragraphFiller}
          </Paragraph>
        </div>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Type/Typography/Medium',
};
