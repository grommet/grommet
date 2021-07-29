import React from 'react';

import { Box, Grommet, FileInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const Multiple = () => (
  <Grommet full theme={grommet}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <FileInput
          multiple
          onChange={(event, { files }) => {
            console.log(event);
            for (let i = 0; i < files.length; i += 1) {
              const file = files[i];
              console.log(file.name);
            }
          }}
        />
      </Box>
    </Box>
  </Grommet>
);

export default {
  title: 'Input/FileInput/Multiple',
};
