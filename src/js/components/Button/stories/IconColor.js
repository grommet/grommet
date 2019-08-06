import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from 'grommet-icons';

import { Box, Button, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from '../../../utils';

const customButtonIconColor = deepMerge(grommet, {
  button: {
    color: 'accent-2',
  },
});

const CustomIconLabelColor = () => (
  <Grommet theme={customButtonIconColor}>
    <Box align="center" pad="large">
      <Box align="center" pad="large" gap="small">
        <Button icon={<Add />} label="Add" onClick={() => {}} primary />
        <Button label="Add" onClick={() => {}} primary />
        <Button icon={<Add />} label="Add" onClick={() => {}} />
        <Button icon={<Add />} label="Add" gap="xlarge" onClick={() => {}} />
        <Button label="500px gap" gap="500px" onClick={() => {}} />
      </Box>
      <Box background="black" pad="large" gap="small">
        <Button icon={<Add />} label="500px gap" onClick={() => {}} />
        <Button label="500px gap" onClick={() => {}} />
      </Box>
    </Box>
  </Grommet>
);

const IconLabelColor = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Box align="center" pad="large" gap="small">
        <Button icon={<Add />} label="Add" onClick={() => {}} primary />
        <Button icon={<Add />} label="Add" onClick={() => {}} />
        <Button icon={<Add />} label="Add" gap="xlarge" onClick={() => {}} />
        <Button label="Add" gap="xlarge" onClick={() => {}} />
        <Box pad="large" gap="small" background="black">
          <Button icon={<Add />} label="500px gap" onClick={() => {}} />
          <Button label="500px gap" onClick={() => {}} />
          <Button icon={<Add />} label="Add" onClick={() => {}} primary />
        </Box>
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Button', module).add('Icon Label Color', () => (
  <CustomIconLabelColor />
));
storiesOf('Button', module).add('Icon Label', () => <IconLabelColor />);
