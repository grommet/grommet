import React from "react";

import { Box, Heading, Grid, Meter, Text } from "grommet";
import { FormClose } from "grommet-icons";

import { List, ListItem, ServerCard } from "../components";
import { servers } from "../data";

const TaskItem = ({ message, percentComplete, ...rest }) => (
  <ListItem justify="between" {...rest}>
    {message}
    <Box direction="row" align="center">
      <Meter
        thickness="small"
        type="bar"
        size="xsmall"
        background="light-2"
        values={[{ value: percentComplete, color: "neutral-1" }]}
        round
      />
      <Text size="small" margin={{ left: "small" }}>
        {percentComplete}%
      </Text>
    </Box>
  </ListItem>
);

const favoriteServers = servers.filter(server => server.favorite);

export const Dashboard = () => (
  <Box fill>
    <Box
      pad="small"
      background={{ color: "status-critical", dark: true }}
      direction="row"
      align="center"
      justify="between"
    >
      <Text>There are 10 severs offline</Text>
      <FormClose size="medium" />
    </Box>
    <Heading level="3" margin={{ left: "small" }}>
      Favorite Servers
    </Heading>
    <Grid margin={{ horizontal: "small" }} gap="small" columns="small">
      {favoriteServers.map(server => (
        <ServerCard
          server={server}
          key={server.name}
          path={`/servers/${server.id}`}
        />
      ))}
    </Grid>
    <Heading level="3" margin={{ left: "small" }}>
      Running Tasks
    </Heading>
    <List>
      <TaskItem
        border="horizontal"
        message={
          <Text size="small" color="dark-5">
            Removing{" "}
            <Text color="dark-3" size="small">
              <strong>Server 1</strong>
            </Text>{" "}
            by Eric Soderberg
          </Text>
        }
        percentComplete={30}
      />
      <TaskItem
        message={
          <Text size="small" color="dark-5">
            Adding{" "}
            <Text color="dark-3" size="small">
              <strong>Server 10</strong>
            </Text>{" "}
            by Alan Souza
          </Text>
        }
        percentComplete={80}
      />
    </List>
  </Box>
);
