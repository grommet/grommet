import React from 'react';

import { grommet, Box, Button, Grommet } from 'grommet';

export const Basic = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="medium">
      <Button label="Default" onClick={() => {}} {...props} />
    </Box>
    <Box align="center" pad="medium">
      <Button label="Anchor" href="#" />
    </Box>
    <Box align="center" pad="medium">
      <Button disabled label="Disabled" onClick={() => {}} {...props} />
    </Box>
    <Box align="center" pad="medium">
      <Button primary label="Primary" onClick={() => {}} {...props} />
    </Box>
    <Box align="center" pad="medium">
      <Button
        primary
        label="Active Primary"
        active
        onClick={() => {}}
        {...props}
      />
    </Box>
  </Grommet>
);

export default {
  title: 'Controls/Button/Basic',
};
