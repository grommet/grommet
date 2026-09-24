import React from "react";
import { Box, Button } from "grommet";
import { Edit, CircleInformation, Trash } from "grommet-icons";

export const Actions = (datum) => (
  <Box direction="row">
    <Button icon={<Edit />} />
    <Button icon={<CircleInformation />} />
    <Button icon={<Trash />} />
  </Box>
);

export default Actions;
