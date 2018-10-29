import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Heading, Paragraph, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const paragraphFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

const Medium = () => {
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

const Small = () => (
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

const Large = () => (
  <Grommet theme={grommet}>
    <Box pad="medium">
      <div>
        <Heading size="large">Heading 1 - Large</Heading>
        <Text size="xxlarge">Text XXLarge</Text>
        <Paragraph size="xlarge">
          Paragraph - XLarge
          {paragraphFiller}
        </Paragraph>
        <Heading level={2} size="large">
          Heading 2 - Large
        </Heading>
        <Text size="xlarge">Text XLarge</Text>
        <Paragraph size="large">
          Paragraph - Large
          {paragraphFiller}
        </Paragraph>
        <Heading level={3} size="large">
          Heading 3 - Large
        </Heading>
        <Text size="large">Text Large</Text>
        <Paragraph>
          Paragraph - Medium
          {paragraphFiller}
        </Paragraph>
        <Heading level={4} size="large">
          Heading 4 - Large
        </Heading>
        <Text>Text Medium</Text>
        <Paragraph>
          Paragraph - Medium
          {paragraphFiller}
        </Paragraph>
      </div>
    </Box>
  </Grommet>
);

storiesOf('Typography', module)
  .add('Small', () => <Small />)
  .add('Medium', () => <Medium />)
  .add('Large', () => <Large />);
