import React from 'react';

import { Box, Grommet, FileInput } from 'grommet';
import { grommet } from 'grommet/themes';

function confirmationDialog() {
  return window.confirm('Do you really want to delete this file');
}

export const Simple = () => (
  <Grommet full theme={grommet}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <FileInput
          onClickRemove={confirmationDialog}
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

export default {
  title: 'Input/FileInput/Simple',
};
