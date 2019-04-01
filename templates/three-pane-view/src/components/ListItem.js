import React from "react";

import { Box } from "grommet";

export const ListItem = props => (
  <Box
    tag="li"
    border="bottom"
    pad="small"
    direction="row-responsive"
    align="center"
    {...props}
  />
);
