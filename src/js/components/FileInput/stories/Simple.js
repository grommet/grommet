import React from 'react';

import { Box, FileInput } from 'grommet';

export const Simple = () => (
  <Box fill align="center" justify="start" pad="large">
    <Box width="medium">
      <FileInput
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
);

export default {
  title: 'Input/FileInput/Simple',
};
