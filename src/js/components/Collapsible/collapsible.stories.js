import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { FormDown, FormNext, Notification } from 'grommet-icons';

import { Box, Button, Collapsible, Heading, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

class SimpleCollapsible extends Component {
  state = {
    open: false,
  };

  render() {
    const { open } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="start" gap="small">
          <Button
            primary
            onClick={() => this.setState({ open: !open })}
            label="Toggle"
          />
          <Collapsible open={open} {...this.props}>
            <Box
              background="light-2"
              round="medium"
              pad="medium"
              align="center"
              justify="center"
            >
              <Text>This is a box inside a Collapsible component</Text>
            </Box>
          </Collapsible>
          <Text>This is other content outside the Collapsible box</Text>
        </Box>
      </Grommet>
    );
  }
}

const MenuButton = ({ label, open, submenu, ...rest }) => {
  const Icon = open ? FormDown : FormNext;
  return (
    <Button hoverIndicator="background" {...rest}>
      <Box
        margin={submenu ? { left: 'small' } : undefined}
        direction="row"
        align="center"
        pad="xsmall"
      >
        <Icon color="brand" />
        <Text size="small">{label}</Text>
      </Box>
    </Button>
  );
};

class NestedCollapsible extends Component {
  state = {
    openMenu1: false,
    openSubmenu1: false,
    openMenu2: false,
  };

  render() {
    const { openMenu1, openSubmenu1, openMenu2 } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box width="small">
          <MenuButton
            open={openMenu1}
            label="Accordion"
            onClick={() => {
              const newOpenMenu1 = !openMenu1;

              this.setState({
                openMenu1: newOpenMenu1,
                openSubmenu1: !newOpenMenu1 ? false : openSubmenu1,
              });
            }}
          />
          <Collapsible open={openMenu1}>
            <MenuButton
              submenu
              open={openSubmenu1}
              label="Accordion Basics"
              onClick={() => this.setState({ openSubmenu1: !openSubmenu1 })}
            />
            <Collapsible open={openSubmenu1}>
              {/* eslint-disable no-alert */}
              <Button
                hoverIndicator="background"
                onClick={() => alert('Submenu item 1 selected')}
              >
                <Box
                  margin={{ left: 'medium' }}
                  direction="row"
                  align="center"
                  pad="xsmall"
                >
                  <Text size="small">Submenu item 1</Text>
                </Box>
              </Button>
              <Button
                hoverIndicator="background"
                onClick={() => alert('Submenu item 2 selected')}
              >
                <Box
                  margin={{ left: 'medium' }}
                  direction="row"
                  align="center"
                  pad="xsmall"
                >
                  <Text size="small">Submenu item 2</Text>
                </Box>
              </Button>
              {/* eslint-enable no-alert */}
            </Collapsible>
          </Collapsible>
          <MenuButton
            open={openMenu2}
            label="Button"
            onClick={() => this.setState({ openMenu2: !openMenu2 })}
          />
          <Collapsible open={openMenu2}>
            {/* eslint-disable no-alert */}
            <Button
              hoverIndicator="background"
              onClick={() => alert('Submenu item 1 selected')}
            >
              <Box
                margin={{ left: 'medium' }}
                direction="row"
                align="center"
                pad="xsmall"
              >
                <Text size="small">Submenu item 1</Text>
              </Box>
            </Button>
            {/* eslint-enable no-alert */}
          </Collapsible>
        </Box>
      </Grommet>
    );
  }
}

class HorizontalCollapsible extends Component {
  state = {
    openNotification: false,
  };

  render() {
    const { openNotification } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill>
          <Box
            tag="header"
            direction="row"
            align="center"
            pad={{ vertical: 'small', horizontal: 'medium' }}
            justify="between"
            background="neutral-4"
            elevation="large"
            style={{ zIndex: '1000' }}
          >
            <Heading level={3} margin="none" color="white">
              <strong>My App</strong>
            </Heading>
            <Button
              onClick={() =>
                this.setState({ openNotification: !openNotification })
              }
              icon={<Notification color="white" />}
            />
          </Box>
          <Box flex direction="row">
            <Box flex align="center" justify="center">
              Dashboard content goes here
            </Box>
            <Collapsible direction="horizontal" open={openNotification}>
              <Box
                flex
                width="medium"
                background="light-2"
                pad="small"
                elevation="small"
              >
                Sidebar
              </Box>
            </Collapsible>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Collapsible', module)
  .add('Default', () => <SimpleCollapsible />)
  .add('Nested', () => <NestedCollapsible />)
  .add('Horizontal', () => <HorizontalCollapsible />);
