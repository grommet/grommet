import React from 'react';

import { Box, FileInput } from 'grommet';

export const Multiple = () => (
  <Box fill align="center" justify="start" pad="large">
    <Box width="medium">
      <FileInput
        aria-label="Choose files"
        multiple={{
          max: 5,
        }}
        onChange={(event, { files }) => {
          console.log(event);
          console.log(event.target.files);
          for (let i = 0; i < files.length; i += 1) {
            const file = files[i];
            console.log(file.name);
          }
        }}
      />
    </Box>
  </Box>
);

export default {
  title: 'Input/FileInput/Multiple',
};
