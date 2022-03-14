import React from 'react';

import { Box, Button } from 'grommet';

import { Add } from 'grommet-icons';

export const Multiple = () => (
  <Box align="center" pad="large">
    <Box direction="row" align="center" gap="small" pad="xsmall">
      <Button label="Cancel" onClick={() => {}} />
      <Button
        color="dark-1"
        primary
        icon={<Add color="brand" />}
        label="Add"
        onClick={() => {}}
      />
    </Box>
    <Box direction="row" align="center" gap="small" pad="xsmall">
      <Button label="Cancel" onClick={() => {}} />
      <Button
        color="dark-1"
        primary
        icon={<Add />}
        label="Add"
        onClick={() => {}}
      />
    </Box>
    <Box direction="row" align="center" gap="small" pad="xsmall">
      <Button label="Cancel" onClick={() => {}} />
      <Button primary icon={<Add />} label="Add" onClick={() => {}} />
    </Box>
    <Box direction="row" align="center" gap="small" pad="xsmall">
      <Button label="Cancel" onClick={() => {}} />
      <Button
        color="light-2"
        primary
        icon={<Add />}
        label="Add"
        onClick={() => {}}
      />
    </Box>
  </Box>
);

export default {
  title: 'Controls/Button/Multiple',
};
