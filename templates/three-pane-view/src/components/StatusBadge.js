import React from "react";

import { Box } from "grommet";

export const StatusBadge = ({ background = "status-unknown", ...rest }) => (
  <Box
    width="12px"
    height="12px"
    round="small"
    background={background}
    {...rest}
  />
);
