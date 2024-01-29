import React, { useState } from 'react';
import { Box, CheckBox, FileInput, Grommet } from 'grommet';

export const Multiple = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <Grommet
      theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
    >
      <Box fill align="center" justify="start" pad="large" gap="medium">
        <CheckBox
          checked={disabled}
          label="Disabled the FileInput"
          onChange={(event) => setDisabled(event.target.checked)}
        />

        <Box width="medium">
          <FileInput
            disabled={disabled}
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
    </Grommet>
  );
};

export default {
  title: 'Input/FileInput/Multiple',
};
