import React from "react";

import { Box, Text, RoutedButton } from "grommet";
import { Star } from "grommet-icons";

import { StatusBadge } from ".";

export const ServerCard = ({ server = {}, path, ...rest }) => (
  <RoutedButton
    hoverIndicator="light-2"
    path={path}
    style={{ borderRadius: "4px" }}
  >
    <Box round="xsmall" border pad="small" gap="xsmall">
      <Box direction="row" align="center" justify="between">
        <Text>
          <strong>{server.name}</strong>
        </Text>
        {server.favorite && <Star size="small" />}
      </Box>
      <Box direction="row" align="center">
        <StatusBadge
          background={
            server.status === "online" ? "status-ok" : "status-unknown"
          }
        />
        <Text margin={{ left: "xsmall" }} color="dark-5" size="xsmall">
          {server.status}
        </Text>
      </Box>
    </Box>
  </RoutedButton>
);
