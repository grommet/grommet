import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Text } from 'mnet-ui-base';
import { Loader } from '../Loader';

const LoaderPreview = () => {
  return (
    <>
      <Box margin="small" align="center">
        <Text margin="large">Circle Loader</Text>
        <Loader primaryColor="control" secondaryColor="white" round="50%" />
      </Box>
      <Box margin="small" align="center">
        <Text margin="large">Inline Button Loader</Text>
        <Button primary>
          <Box width="xsmall">
            <Loader
              type="inline"
              primaryColor="white"
              secondaryColor="control"
            />
          </Box>
        </Button>
      </Box>
    </>
  );
};

storiesOf('Loader', module).add('Loaders', () => <LoaderPreview />);
