import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Box, Heading, Paragraph } from "grommet";

export const StyledHeading = styled(Heading)`
  font-weight: 200;
`;

const InstaXtreme = ({ size, ...rest }) => (
  <Fragment>
    <Box direction="row" {...rest}>
      <StyledHeading size={size}>insta</StyledHeading>
      <Heading size={size}>Xtreme</Heading>
    </Box>
    <Paragraph margin={{ top: "none" }} textAlign="center" size="xxlarge">
      get beta access to one of the hotest trends in social media and be a taste
      maker to the world with insta<b>Xtreme</b>. you be the judge of who’s
      insta famous or just another poser.
    </Paragraph>
  </Fragment>
);

InstaXtreme.propTypes = {
  size: PropTypes.string.isRequired,
};

export { InstaXtreme };
