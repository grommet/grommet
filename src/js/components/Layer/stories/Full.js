import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, MnetUIBase, Layer } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const FullLayer = () => {
  const [showLayer, setShowLayer] = React.useState(false);

  return (
    <MnetUIBase theme={mnet} full>
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
    </MnetUIBase>
  );
};

storiesOf('Layer', module).add('Full', () => <FullLayer />);
