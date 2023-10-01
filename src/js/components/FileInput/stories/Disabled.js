import React from 'react';

import { Box, FileInput, Grommet } from 'grommet';

export const Disabled = () => (
  <Grommet
    theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
  >
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <FileInput
          disabled
          aria-label="Choose files"
          onChange={(event, { files }) => {
            const fileList = files;
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

Disabled.storyName = 'Disabled';

export default {
  title: 'Input/FileInput/Disabled',
};
