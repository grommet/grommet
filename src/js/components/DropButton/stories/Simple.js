import React from 'react';
import PropTypes from 'prop-types';
import { Close } from 'grommet-icons';

import { Grommet, Box, Button, DropButton, Heading, Text } from 'grommet';
import { grommet } from 'grommet/themes';

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

const SimpleDropButton = () => {
  const [open, setOpen] = React.useState();
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <DropButton
          label="Open"
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          dropContent={<DropContent onClose={onClose} />}
          dropProps={{ align: { top: 'bottom' } }}
        />
      </Box>
    </Grommet>
  );
};

export const Simple = () => <SimpleDropButton />;
Simple.story = {
  parameters: {
    chromatic: { disable: true },
  },
};
