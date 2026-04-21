import React from 'react';

import { Box, Button, Layer } from 'grommet';

export const FullLayer = () => {
  const [showLayer, setShowLayer] = React.useState(false);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box pad="small" fill background="dark-3" align="center" justify="center">
      <Button
        primary
        color="accent-3"
        label="Show"
        onClick={() => setShowLayer(true)}
      />
      {showLayer && (
        <Layer full animation="fadeIn">
          <Box fill background="light-4" align="center" justify="center">
            <Button primary label="Close" onClick={() => setShowLayer(false)} />
          </Box>
        </Layer>
      )}
    </Box>
    // </Grommet>
  );
};

FullLayer.storyName = 'Full';

FullLayer.parameters = {
  chromatic: { disable: true },
};

FullLayer.args = {
  full: true,
};

export default {
  title: 'Layout/Layer/Full',
};
