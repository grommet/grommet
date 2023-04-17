import React from 'react';
import PropTypes from 'prop-types';
import { Close } from 'grommet-icons';

import { Box, Button, DropButton, Heading, Text } from 'grommet';

const DropContent = ({ onClose }) => (
  <Box pad="small">
    <Box direction="row" justify="between" align="center">
      <Heading level={3} margin="small">
        Heading
      </Heading>
      <Button icon={<Close />} onClick={onClose} />
    </Box>
    <Text>Content</Text>
  </Box>
);

DropContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const align = { top: 'bottom' };

const SimpleDropButton = () => {
  const [open, setOpen] = React.useState();
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Box align="center" pad="large">
      <DropButton
        label="Open"
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        dropContent={<DropContent onClose={onClose} />}
        dropProps={{ align }}
      />
    </Box>
  );
};

export const Simple = () => <SimpleDropButton />;
Simple.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/DropButton/Simple',
};
