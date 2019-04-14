import React from "react";
import PropTypes from "prop-types";

import { Anchor, Box, Heading, Paragraph, Stack } from "grommet";

const Talent = ({ action, children, name, summary, ...rest }) => (
  <Box align="center" margin="large" direction="row" {...rest}>
    <Stack anchor="center">
      <Box direction="row">
        <Box
          width="small"
          height="medium"
          round="medium"
          background="light-4"
        />
        <Box background="white" width="xxsmall" />
      </Box>
      <Box>{children}</Box>
    </Stack>
    <Box>
      <Heading level={1} size="small" margin="none">
        {name}
      </Heading>
      <Paragraph>{summary}</Paragraph>
      <Anchor href="/">{action}</Anchor>
    </Box>
  </Box>
);

Talent.propTypes = {
  action: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  summary: PropTypes.node.isRequired,
};

export default Talent;
