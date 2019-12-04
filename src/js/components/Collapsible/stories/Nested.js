import React from 'react';
import { storiesOf } from '@storybook/react';

import { FormDown, FormNext } from 'grommet-icons';

import { Box, Button, Collapsible, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

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

const NestedCollapsible = () => {
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openSubmenu1, setOpenSubmenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);

  return (
    <Grommet theme={grommet}>
      <Box width="small">
        <MenuButton
          open={openMenu1}
          label="Accordion"
          onClick={() => {
            const newOpenMenu1 = !openMenu1;
            setOpenMenu1(newOpenMenu1);
            setOpenSubmenu1(!newOpenMenu1 ? false : openSubmenu1);
          }}
        />
        <Collapsible open={openMenu1}>
          <MenuButton
            submenu
            open={openSubmenu1}
            label="Accordion Basics"
            onClick={() => setOpenSubmenu1(!openSubmenu1)}
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
          onClick={() => setOpenMenu2(!openMenu2)}
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
};

storiesOf('Collapsible', module).add('Nested', () => <NestedCollapsible />);
