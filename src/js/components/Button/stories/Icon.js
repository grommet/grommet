import React from 'react';
import { Close, Send, User } from 'grommet-icons';

import { Box, Button, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

export const Icon = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Text margin="small"> plain=true (no padding, no border) </Text>
      <Box direction="row">
        <Button plain icon={<Close />} onClick={() => {}} primary />
        <Button plain icon={<Send />} onClick={() => {}} />
        <Button plain icon={<User />} onClick={() => {}} />
      </Box>
    </Box>
    <Box align="center" pad="large">
      <Text margin="small"> plain=false (includes padding and border)</Text>
      <Box direction="row">
        <Button plain={false} icon={<Close />} onClick={() => {}} primary />
        <Button plain={false} icon={<Send />} onClick={() => {}} />
        <Button plain={false} icon={<User />} onClick={() => {}} />
      </Box>
    </Box>
    <Box align="center" pad="large">
      <Text margin="small"> plain=undefined (with padding, no border) </Text>
      <Box direction="row">
        <Button icon={<Close />} onClick={() => {}} primary />
        <Button icon={<Send />} onClick={() => {}} />
        <Button icon={<User />} onClick={() => {}} />
      </Box>
    </Box>
  </Grommet>
);

Icon.storyName = 'Icon plain';

export default {
  title: `Controls/Button/Icon plain`,
};
