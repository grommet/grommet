import React from 'react';

import {
  grommet,
  Anchor,
  Box,
  Button,
  Grommet,
  Heading,
  Paragraph,
  Text,
  Tip,
} from 'grommet';

export const Children = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box align="center" pad="large" fill>
    <Heading size="xsmall">Tip's Child</Heading>

    <Paragraph margin="none" textAlign="center">
      Tooltip is displayed once hovering on the Tip's child or when using
      keyboard navigation to skim through the webpage via tabbing.
    </Paragraph>

    <Paragraph textAlign="center">
      To ensure accessibility support for the tooltip content when using
      keyboard navigation, please use an{' '}
      <Anchor href="https://github.com/grommet/grommet/issues/5971">
        interactive element as the Tip's child component
      </Anchor>
      .
    </Paragraph>

    <Box align="center" pad="large" gap="xlarge" fill>
      <Tip
        plain
        dropProps={{ align: { right: 'left' } }}
        content={
          <Box
            animation="slideLeft"
            align="center"
            background="accent-2"
            round={{ size: 'medium', corner: 'left' }}
            pad="small"
            margin="small"
          >
            <Text color="brand">Tooltip</Text>
          </Box>
        }
      >
        <Box background="brand" pad="small" flex={false} onClick={() => {}}>
          Box Child
        </Box>
      </Tip>
      <Tip
        plain
        dropProps={{ align: { left: 'right' } }}
        content={
          <Box
            align="center"
            background="accent-1"
            margin="xsmall"
            pad="xsmall"
            round="medium"
            flex={false}
          >
            <Text color="brand">Tooltip</Text>
          </Box>
        }
      >
        <Button label="Button Child" />
      </Tip>
    </Box>
  </Box>
  // </Grommet>
);

Children.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Tip/Children',
};
