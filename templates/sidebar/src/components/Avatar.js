import React from "react";

import { Box } from "grommet";

export const Avatar = ({ name, url, ...rest }) => (
  <Box
    a11yTitle={`${name} avatar`}
    height="avatar"
    width="avatar"
    round="full"
    background={`url(${url})`}
    {...rest}
  />
);
