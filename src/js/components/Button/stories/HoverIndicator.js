import React from 'react';

import { grommet, Box, Button, Grommet } from 'grommet';

export const HoverIndicator = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="medium">
      <Button
        label="With hoverIndicator prop as string"
        onClick={() => {}}
        hoverIndicator="light-2"
      />
    </Box>
    <Box align="center" pad="medium">
      <Button
        label="With hoverIndicator prop as background type"
        onClick={() => {}}
        hoverIndicator={{ color: 'light-2' }}
      />
    </Box>
    <Box align="center" pad="medium">
      <Button
        label="With hoverIndicator prop as object"
        onClick={() => {}}
        hoverIndicator={{
          background: 'brand',
          elevation: 'large',
          text: { color: 'white' },
        }}
      />
    </Box>
  </Grommet>
);

HoverIndicator.storyName = 'Hover Indicator';

export default {
  title: 'Controls/Button/Hover Indicator',
};
