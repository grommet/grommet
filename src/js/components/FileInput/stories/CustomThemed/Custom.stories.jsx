import React from 'react';

import { Box, Grommet, FileInput, Text } from 'grommet';
import { Trash } from 'grommet-icons';

const customTheme = {
  fileInput: {
    button: {
      hover: {
        color: 'accent-2',
      },
      border: {
        color: 'skyblue',
        width: '1px',
      },
      pad: {
        vertical: '4px',
        horizontal: '8px',
      },
    },
    message: {
      color: 'green',
      textAlign: 'center',
    },
    background: '#f2f2f2',
    border: { size: 'medium' },
    pad: { horizontal: 'medium', vertical: 'small' },
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
          aria-label="Choose files"
          renderFile={(file) => (
            <Box>
              <Text weight="bold" truncate>
                {file.name}
              </Text>
              <Text color="text-weak">{file.size} bytes</Text>
            </Box>
          )}
          multiple={{
            max: 5,
          }}
          messages={{
            maxFile: 'You can only select a maximum of 5 files.',
          }}
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
  title: 'Input/FileInput/Custom Themed/Custom',
};
