import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Layer } from 'mnet-ui-base';

const FullLayer = () => {
  const [showLayer, setShowLayer] = React.useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
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
              <Button
                primary
                label="Close"
                onClick={() => setShowLayer(false)}
              />
            </Box>
          </Layer>
        )}
      </Box>
    </div>
  );
};

storiesOf('Layer', module).add('Full', () => <FullLayer />);
