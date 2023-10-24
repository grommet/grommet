import React, { ChangeEvent, useState } from 'react';

import { Box, RadioButtonGroup } from 'grommet';

type EventWithValueProp = ChangeEvent<HTMLInputElement> & {value: string | number};

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
  // Remove <string | number> if you are not using Typescript.
  const [value, setValue] = useState<string | number>(postMethods[0].value);

  return (
    <Box align="center" pad="large">
      <RadioButtonGroup
        name="radio"
        options={postMethods}
        value={value}
        onChange={(event: EventWithValueProp) => setValue(event.value)}
      />
    </Box>
  );
};

export default {
  title: 'Input/RadioButtonGroup/Simple',
};
