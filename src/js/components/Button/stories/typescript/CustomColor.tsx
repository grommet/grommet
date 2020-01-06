import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { mnet, MnetUIBase, Box, Button } from 'mnet-ui-base';
import { deepMerge } from 'mnet-ui-base/utils';

const customButtonColor = deepMerge(mnet, {
  button: {
    color: {
      light: 'white',
      dark: 'white',
    },
  },
});

const Colored = props => (
  <MnetUIBase theme={customButtonColor}>
    <Box align="center" pad="large" gap="small">
      <Button primary label="Submit" onClick={() => {}} />
      <Button
        primary
        color="dark-1"
        label="custom theme text colored"
        onClick={() => {}}
      />
      <Button
        primary
        color="dark-1"
        label="dark-1"
        onClick={() => {}}
        {...props}
      />
      <Button
        primary
        color="#111111"
        label="#111111"
        onClick={() => {}}
        {...props}
      />
      <Button primary color="#777" label="#777" onClick={() => {}} {...props} />
      <Button
        plain
        color="red"
        label="plain red"
        onClick={() => {}}
        {...props}
      />
      <Button plain label="plain inherit" onClick={() => {}} {...props} />
    </Box>
  </MnetUIBase>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Button', module).add('Colored', () => <Colored />);
}
