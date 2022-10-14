import React from 'react';

import { Box, Heading, Paragraph, Skeleton, Text } from 'grommet';

const HeadingExample = () => (
  <Box gap="small">
    <Heading level={2}>Heading</Heading>
    <Box skeleton>
      <Heading level={2}>Heading</Heading>
    </Box>
  </Box>
);

const TextExample = () => (
  <Box gap="small">
    <Text>Text</Text>
    <Box skeleton>
      <Text>Text</Text>
    </Box>
  </Box>
);

const ParagraphExample = () => (
  <Box fill="horizontal" gap="small">
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Paragraph>
    <Box skeleton fill="horizontal">
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Paragraph>
    </Box>
  </Box>
);

const SkeletonExample = () => (
  <Box gap="small">
    <Text>Skeleton</Text>
    <Skeleton />
    <Skeleton height="small" />
  </Box>
);

export const Simple = () => (
  <Box gap="medium" pad="medium">
    <HeadingExample />
    <TextExample />
    <ParagraphExample />
    <SkeletonExample />
  </Box>
);

export default {
  title: 'Visualizations/Skeleton/Simple',
};
