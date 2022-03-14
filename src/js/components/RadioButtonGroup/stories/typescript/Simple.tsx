import React, { useState } from 'react';

import { Box, RadioButtonGroup } from 'grommet';

export const Simple = () => {
  const postMethods = [
    { label: 'FTP', value: 'FTP' },
    {
      label: 'File System',
      value: 'FileSystem',
    },
    {
      label: 'FTP & File System',
      value: 'FTPCopy',
    },
  ];

  // Type arguments can only be used in TypeScript files.
  // Remove <string | object> if you are not using Typescript.
  const [value, setValue] = useState<string | object>(postMethods[0]);

  return (
    <Box align="center" pad="large">
      <RadioButtonGroup
        name="radio"
        options={postMethods}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </Box>
  );
};

export default {
  title: 'Input/RadioButtonGroup/Simple',
};
