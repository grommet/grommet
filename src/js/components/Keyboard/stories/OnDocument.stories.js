import React from 'react';

import { Box, Heading, Keyboard } from 'grommet';

export const OnDocument = () => (
  <>
    {/* eslint-disable no-alert */}
    <Keyboard target="document" onEsc={() => alert('You pressed Esc!')}>
      <Box pad="large" background="light-4">
        <Heading level="3">Press Esc on me!</Heading>
      </Box>
    </Keyboard>
  </>
);

OnDocument.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Utilities/Keyboard/On Document',
};
