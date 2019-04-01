import React, { Component } from "react";

import {
  Anchor,
  Box,
  Button,
  Heading,
  Layer,
  ResponsiveContext,
  RoutedButton,
  Text
} from "grommet";
import { Cli, FormClose, LinkPrevious, Menu, Power } from "grommet-icons";

import { servers } from "../data";
import { StatusBadge } from "../components";

export class Server extends Component {
  static contextType = ResponsiveContext;
  state = {
    showActions: false
  };
  componentDidMount() {
    const size = this.context;
    if (size !== "small") {
      this.setState({ showActions: true });
    }
  }
  toggleActions = () => this.setState({ showActions: !this.state.showActions });
  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { showActions } = this.state;
    const size = this.context;
    const server = servers.find(s => s.id === id);
    if (!server) {
      return (
        <Box fill align="center" justify="center">
          <Heading>No server found with id {id}.</Heading>
        </Box>
      );
    }
    const actionsProps =
      size === "small"
        ? { full: true }
        : {
            basis: "1/3",
            elevation: "small"
          };
    const ActionComponent = size === "small" ? Layer : Box;
    return (
      <Box fill direction="row">
        <Box flex>
          <Box
            tag="header"
            direction="row"
            align="center"
            border="bottom"
            pad={{ vertical: "small" }}
            justify="between"
          >
            <Box direction="row" align="center">
              <RoutedButton path="/servers" icon={<LinkPrevious />} />
              <Box>
                <Heading level="3" margin={{ vertical: "none" }}>
                  {server.name}
                </Heading>
                <Box direction="row" align="center">
                  <StatusBadge
                    background={
                      server.status === "online"
                        ? "status-ok"
                        : "status-unknown"
                    }
                  />
                  <Text
                    margin={{ left: "xsmall" }}
                    color="dark-5"
                    size="xsmall"
                  >
                    {server.status}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Button icon={<Menu />} onClick={this.toggleActions} />
          </Box>
          <Box flex align="center" justify="center">
            <Heading level="4">Details of {server.name} goes here.</Heading>
          </Box>
        </Box>
        {showActions && (
          <ActionComponent {...actionsProps}>
            <Box
              direction="row"
              align="center"
              justify="between"
              pad={{ horizontal: "small", vertical: "medium" }}
            >
              <Heading level="3" margin="none">
                Actions
              </Heading>
              <Button onClick={this.toggleActions}>
                <Box>
                  <FormClose />
                </Box>
              </Button>
            </Box>
            <Box margin={{ left: "medium", top: "small" }} gap="small">
              <Anchor color="dark-5" icon={<Cli />} label="Console" href="#" />
              <Anchor
                color="dark-5"
                icon={<Power />}
                label="Power on"
                href="#"
              />
              <Anchor
                color="dark-5"
                icon={<Power />}
                label="Power off"
                href="#"
              />
            </Box>
          </ActionComponent>
        )}
      </Box>
    );
  }
}
