import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button } from 'mnet-ui-base';

const LoaderButtons = props => (
  <div>
    <Box align="center" pad="medium">
      <Button
        isLoading
        background="brand"
        primary
        label="Loader"
        size="medium"
        onClick={() => {}}
        {...props}
      />
    </Box>
  </div>
);

storiesOf('Button', module).add('Button Loader', () => <LoaderButtons />);
