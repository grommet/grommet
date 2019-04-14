import React from "react";
import PropTypes from "prop-types";
import { Box } from "grommet";

const Section = ({ children, width, ...rest }) => (
  <Box align="center" pad="large" {...rest}>
    <Box width={width}>{children}</Box>
  </Box>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
};

Section.defaultProps = {
  width: "xlarge",
};

export { Section };
