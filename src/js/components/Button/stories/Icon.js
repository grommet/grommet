import React from 'react';
import { Close, Send, User } from 'grommet-icons';

import { Box, Button, Text } from 'grommet';

export const Icon = () => (
  <Box>
    <Box align="center" pad="large">
      <Text margin="small"> plain=true </Text>
      <Box direction="row">
        <Button plain icon={<Close />} onClick={() => {}} primary />
        <Button plain icon={<Send />} onClick={() => {}} />
        <Button plain icon={<User />} onClick={() => {}} />
      </Box>
    </Box>
    <Box align="center" pad="large">
      <Text margin="small"> plain=false </Text>
      <Box direction="row">
        <Button plain={false} icon={<Close />} onClick={() => {}} primary />
        <Button plain={false} icon={<Send />} onClick={() => {}} />
        <Button plain={false} icon={<User />} onClick={() => {}} />
      </Box>
    </Box>
    <Box align="center" pad="large">
      <Text margin="small"> plain=undefined </Text>
      <Box direction="row">
        <Button icon={<Close />} onClick={() => {}} primary />
        <Button icon={<Send />} onClick={() => {}} />
        <Button icon={<User />} onClick={() => {}} />
      </Box>
    </Box>
  </Box>
);

Icon.storyName = 'Icon plain';

export default {
  title: `Controls/Button/Icon plain`,
};
