import React from 'react';
import { storiesOf } from '@storybook/react';

import { Add } from 'grommet-icons';

import { Link, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const Colors = () => {
  return (
    <Grommet theme={grommet}>
      <Box pad="medium" gap="medium">
        <Link icon={<Add />} href="#always" />
        <Link icon={<Add />} label="Add" href="#link" />
        <Link label="Add" href="#somewhere" />
      </Box>
      <Box background="dark-1" pad="medium" gap="medium">
        <Link icon={<Add />} href="#for" />
        <Link icon={<Add />} label="Add" href="#a11y" />
        <Link icon={<Add />} label="Add" href="#reasons" />
        <Link label="Add" href="#like-this" />
      </Box>
    </Grommet>
  );
};

storiesOf('Link', module).add('Colors', () => <Colors />);
