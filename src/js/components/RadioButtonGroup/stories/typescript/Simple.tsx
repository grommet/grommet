import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { RadioButtonGroup } from 'grommet';

export const App = () => {
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

  const [value, setValue] = useState<string | object>(postMethods[0]);

  return (
    <RadioButtonGroup
      name="radio"
      options={postMethods}
      value={value}
      onChange={event => setValue(event.target.value)}
    />
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/RadioButtonGroup', module).add('Simple', () => <App />);
}
