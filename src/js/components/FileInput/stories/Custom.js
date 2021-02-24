import React from 'react';

import { Box, Grommet, FileInput, Text } from 'grommet';
import { Trash } from 'grommet-icons';

const customTheme = {
  fileInput: {
    background: '#f2f2f2',
    border: { size: 'medium' },
    pad: { horizontal: 'large', vertical: 'medium' },
    round: 'small',
    label: {
      size: 'large',
    },
    icons: {
      remove: Trash,
    },
    dragOver: {
      border: { color: 'focus' },
    },
    hover: {
      border: { color: 'control' },
      extend: `letterSpacing: '0.1em'`,
    },
  },
};

export const Custom = () => (
  <Grommet full theme={customTheme}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <FileInput
          renderFile={file => (
            <Box direction="row" gap="small">
              <Text weight="bold">{file.name}</Text>
              <Text color="text-weak">{file.size} bytes</Text>
            </Box>
          )}
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

export default {
  title: 'Input/FileInput/Custom',
};
