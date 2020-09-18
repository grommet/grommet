import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, FileInput } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <FileInput
            onChange={event => {
              const fileList = event.target.files;
              for (let i = 0; i < fileList.length; i += 1) {
                const file = fileList[i];
                console.log(file.name);
              }
            }}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('FileInput', module).add('Simple', () => <Example />);
