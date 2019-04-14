import React from "react";

import { Box, Heading, Grid, Text } from "grommet";

import { ServerCard } from "../components";
import { servers } from "../data";

const todayServers = servers.slice(0, 2);

const lastWeekServers = servers.slice(2, 6);

const oldServers = servers.slice(6, 11);

const ServerSection = ({ name, children, ...rest }) => (
  <Box border={{ side: "top", color: "light-3" }} {...rest}>
    <Text
      size="xsmall"
      color="dark-4"
      margin={{ left: "small", top: "xsmall" }}
    >
      {name}
    </Text>
    {children}
  </Box>
);

export const Servers = ({ match: { url } }) => (
  <Box fill direction="row">
    <Box flex>
      <Heading level="4" margin={{ left: "small", vertical: "small" }}>
        Servers
      </Heading>
      <ServerSection name="Today">
        <Grid
          margin={{ horizontal: "small", vertical: "medium" }}
          gap="small"
          columns="small"
        >
          {todayServers.map(server => (
            <ServerCard
              server={server}
              key={server.name}
              path={`/servers/${server.id}`}
            />
          ))}
        </Grid>
      </ServerSection>
      <ServerSection name="Last Week">
        <Grid
          margin={{ horizontal: "small", vertical: "medium" }}
          gap="small"
          columns="small"
        >
          {lastWeekServers.map(server => (
            <ServerCard
              server={server}
              key={server.name}
              path={`/servers/${server.id}`}
            />
          ))}
        </Grid>
      </ServerSection>
      <ServerSection name="Older">
        <Grid
          margin={{ horizontal: "small", vertical: "medium" }}
          gap="small"
          columns="small"
        >
          {oldServers.map(server => (
            <ServerCard
              server={server}
              key={server.name}
              path={`/servers/${server.id}`}
            />
          ))}
        </Grid>
      </ServerSection>
    </Box>
  </Box>
);
