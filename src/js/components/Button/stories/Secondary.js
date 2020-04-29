import React from 'react';
import { storiesOf } from '@storybook/react';
import { User } from 'grommet-icons';
import { Box, Button, grommet, Grommet, Text } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';

const myHpe = deepMerge(hpe, {
  global: {
    colors: {
      green: {
        light: '#17EBA0',
        dark: '#008567',
      },
      'background-contrast': {
        dark: '#FFFFFF14',
        light: '#0000000A',
      },
      control: 'green',
    },
  },
  button: {
    color: 'text-strong',
    active: {
      border: {
        color: 'transparent',
      },
      background: {
        color: 'background-contrast',
      },
      color: 'text',
    },
    disabled: {
      background: 'transparent',
      border: {
        color: '#DDD',
      },
      color: '#DDD',
      opacity: 1.0,
    },
    hover: {
      default: {
        background: {
          color: 'background-contrast',
        },
        border: {
          color: 'background-contrast',
        },
      },
    },
    default: {
      color: 'text',
    },
    secondary: {
      border: {
        color: 'green',
      },
    },
    primary: {
      background: {
        color: 'green',
      },
    },
  },
});

const Secondary = () => (
  <>
    <Grommet theme={grommet}>
      <Box pad="medium" gap="medium">
        <Box gap="small">
          <Text>Grommet theme </Text>
          <Box align="center" direction="row" gap="small">
            <Box align="center" direction="row" gap="small">
              <Button icon={<User />} />
              <Button icon={<User />} label="Label" />
              <Button
                icon={<User />}
                label="Hover indicator"
                hoverIndicator="#33DDFF"
              />
              <Button icon={<User />} label="Active" active />
              <Button icon={<User />} label="Disabled" disabled />
              <Button icon={<User />} label="Color" color="#33DDFF" />
            </Box>
          </Box>
        </Box>
        <Box gap="small">
          <Text>Grommet Primary Button</Text>
          <Box align="center" direction="row" gap="small">
            <Button icon={<User />} primary />
            <Button icon={<User />} label="Label" primary />
            <Button
              icon={<User />}
              label="Hover indicator"
              hoverIndicator="#33DDFF"
              primary
            />
            <Button icon={<User />} label="Primary Active" primary active />
            <Button icon={<User />} label="Disabled" disabled />
            <Button icon={<User />} label="Color" color="#33DDFF" primary />
          </Box>
        </Box>
        <Box gap="small">
          <Text>Grommet Plain Button</Text>
          <Box align="center" direction="row" gap="small">
            <Button icon={<User />} label="Plain" plain />
            <Button icon={<User />} label="Plain" plain color="#33DDFF" />
          </Box>
        </Box>
      </Box>
    </Grommet>
    <Grommet theme={myHpe}>
      <Box pad="medium" gap="medium">
        <Box direction="row" gap="medium">
          <Box gap="small">
            <Text>HPE Primary Button</Text>
            <Box direction="row">
              <Box align="start" pad="small" gap="small">
                <Button icon={<User />} primary />
                <Button icon={<User />} label="Label" primary />
                <Button
                  icon={<User />}
                  label="Hover indicator"
                  hoverIndicator="#33DDFF"
                  primary
                />
                <Button icon={<User />} label="Primary Active" primary active />
                <Button icon={<User />} label="Disabled" primary disabled />
                <Button icon={<User />} label="Color" color="#33DDFF" primary />
              </Box>
              <Box
                align="start"
                pad="small"
                gap="small"
                background={{ color: 'background-back', dark: true }}
              >
                <Button icon={<User />} primary />
                <Button icon={<User />} label="Label" primary />
                <Button
                  icon={<User />}
                  label="Hover indicator"
                  hoverIndicator="#33DDFF"
                  primary
                />
                <Button icon={<User />} label="Primary Active" primary active />
                <Button icon={<User />} label="Disabled" primary disabled />
                <Button icon={<User />} label="Color" color="#33DDFF" primary />
              </Box>
            </Box>
          </Box>
          <Box gap="small">
            <Text>HPE Secondary Button</Text>
            <Box direction="row">
              <Box align="start" pad="small" gap="small">
                <Button icon={<User />} secondary />
                <Button icon={<User />} label="Label" secondary />
                <Button
                  icon={<User />}
                  label="Hover indicator"
                  hoverIndicator="#33DDFF"
                  secondary
                />
                <Button
                  icon={<User />}
                  label="Secondary Active"
                  secondary
                  active
                />
                <Button icon={<User />} label="Disabled" secondary disabled />
                <Button
                  icon={<User />}
                  label="Color"
                  color="#33DDFF"
                  secondary
                />
              </Box>
              <Box
                align="start"
                pad="small"
                gap="small"
                background={{ color: 'background-back', dark: true }}
              >
                <Button icon={<User />} secondary />
                <Button icon={<User />} label="Label" secondary />
                <Button
                  icon={<User />}
                  label="Hover indicator"
                  hoverIndicator="#33DDFF"
                  secondary
                />
                <Button
                  icon={<User />}
                  label="Secondary Active"
                  secondary
                  active
                />
                <Button icon={<User />} label="Disabled" secondary disabled />
                <Button
                  icon={<User />}
                  label="Color"
                  color="#33DDFF"
                  secondary
                />
              </Box>
            </Box>
          </Box>
          <Box gap="small">
            <Text>HPE Default Button</Text>
            <Box direction="row">
              <Box align="start" pad="small" gap="small">
                <Button icon={<User />} />
                <Button icon={<User />} label="Label" />
                <Button
                  icon={<User />}
                  label="Hover indicator"
                  hoverIndicator="#33DDFF"
                />
                <Button icon={<User />} label="Active" active />
                <Button icon={<User />} label="Disabled" disabled />
                <Button icon={<User />} label="Color" color="#33DDFF" />
              </Box>
              <Box
                align="start"
                pad="small"
                gap="small"
                background={{ color: 'background-back', dark: true }}
              >
                <Button icon={<User />} />
                <Button icon={<User />} label="Label" />
                <Button
                  icon={<User />}
                  label="Hover indicator"
                  hoverIndicator="#33DDFF"
                />
                <Button icon={<User />} label="Active" active />
                <Button icon={<User />} label="Disabled" disabled />
                <Button icon={<User />} label="Color" color="#33DDFF" />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box gap="small">
          <Text>HPE Plain Button</Text>
          <Box align="center" direction="row" gap="small">
            <Button icon={<User />} label="Plain" plain />
            <Button icon={<User />} label="Plain" plain color="#33DDFF" />
          </Box>
        </Box>
      </Box>
    </Grommet>
  </>
);

storiesOf('Button', module).add('Secondary', () => <Secondary />);
