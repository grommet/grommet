import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from 'grommet-icons';

import { Box, Button, Grommet, RoutedButton, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from '../../utils';

const SimpleButton = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Button label="Submit" onClick={() => {}} {...props} />
    </Box>
  </Grommet>
);

const IconButton = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Box round="full" overflow="hidden" background="neutral-1">
        <Button icon={<Add />} hoverIndicator onClick={() => {}} />
      </Box>
    </Box>
  </Grommet>
);

const IconLabelButton = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large" gap="small">
      <Button icon={<Add />} label="Add" onClick={() => {}} primary />
      <Button icon={<Add />} label="Add" onClick={() => {}} />
    </Box>
  </Grommet>
);

const PlainButton = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Button hoverIndicator="light-1" onClick={() => {}} {...props}>
        <Box pad="small" direction="row" align="center" gap="small">
          <Add />
          <Text>Add</Text>
        </Box>
      </Button>
    </Box>
  </Grommet>
);

const AnchorButton = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Button label="Go" href="#" />
    </Box>
  </Grommet>
);

const RouteButton = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <RoutedButton label="Go" path="/" />
    </Box>
  </Grommet>
);

const CustomTagButton = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Button as="span" label="Go" path="/" />
    </Box>
  </Grommet>
);

const customTheme = {
  global: {
    font: {
      family: 'Arial',
    },
  },
  button: {
    border: {
      radius: undefined,
      color: '#2196f3',
    },
    padding: {
      vertical: '12px',
      horizontal: '24px',
    },
    primary: {
      color: '#2196f3',
    },
    extend: props => {
      let extraStyles = '';
      if (props.primary) {
        extraStyles = `
          text-transform: uppercase;
        `;
      }
      return `
        color: white;
        font-size: 12px;
        font-weight: bold;

        ${extraStyles}
      `;
    },
  },
};

const CustomThemeButton = () => (
  <Grommet theme={customTheme}>
    <Box align="center" pad="large">
      <Button label="Submit" onClick={() => {}} primary />
    </Box>
  </Grommet>
);

const MultipleButton = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Box direction="row" align="center" gap="small" pad="xsmall">
        <Button label="Cancel" onClick={() => {}} />
        <Button
          color="dark-1"
          primary
          icon={<Add color="accent-1" />}
          label="Add"
          onClick={() => {}}
        />
      </Box>
      <Box direction="row" align="center" gap="small" pad="xsmall">
        <Button label="Cancel" onClick={() => {}} />
        <Button
          color="dark-1"
          primary
          icon={<Add />}
          label="Add"
          onClick={() => {}}
        />
      </Box>
      <Box direction="row" align="center" gap="small" pad="xsmall">
        <Button label="Cancel" onClick={() => {}} />
        <Button primary icon={<Add />} label="Add" onClick={() => {}} />
      </Box>
      <Box direction="row" align="center" gap="small" pad="xsmall">
        <Button label="Cancel" onClick={() => {}} />
        <Button
          color="light-2"
          primary
          icon={<Add />}
          label="Add"
          onClick={() => {}}
        />
      </Box>
    </Box>
  </Grommet>
);

const ColoredButton = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large" gap="small">
      <Button
        primary
        color="dark-1"
        label="Submit"
        onClick={() => {}}
        {...props}
      />
      <Button
        primary
        color="#111111"
        label="Submit"
        onClick={() => {}}
        {...props}
      />
      <Button
        primary
        color="#000"
        label="Submit"
        onClick={() => {}}
        {...props}
      />
    </Box>
  </Grommet>
);

const customButtonColor = deepMerge(grommet, {
  global: {
    colors: {
      text: {
        light: 'grey',
        dark: 'grey',
      },
    },
  },
  button: {
    color: {
      light: 'white',
      dark: 'white',
    },
  },
});

const ThemeColored = () => (
  <Grommet theme={customButtonColor}>
    <Box align="center" pad="large" gap="small">
      <Button primary label="Submit" onClick={() => {}} />
      <Button primary color="dark-1" label="Submit" onClick={() => {}} />
    </Box>
  </Grommet>
);

const SidebarButton = ({ label, onClick }) => (
  <Button plain onClick={onClick}>
    {({ hover }) => (
      <Box
        background={hover ? 'accent-1' : undefined}
        pad={{ horizontal: 'large', vertical: 'medium' }}
      >
        <Text size="large">{label}</Text>
      </Box>
    )}
  </Button>
);

const SidebarButtons = () => (
  <Grommet full theme={grommet}>
    <Box fill direction="row">
      <Box background="neutral-1">
        <SidebarButton label="Dashboard" onClick={() => {}} />
        <SidebarButton label="Devices" onClick={() => {}} />
        <SidebarButton label="Settings" onClick={() => {}} />
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Button', module)
  .add('Default', () => <SimpleButton />)
  .add('Primary', () => <SimpleButton primary />)
  .add('Icon', () => <IconButton />)
  .add('Icon Label', () => <IconLabelButton />)
  .add('Disabled', () => <SimpleButton disabled />)
  .add('Plain', () => <PlainButton />)
  .add('Anchor', () => <AnchorButton />)
  .add('RoutedButton', () => <RouteButton />)
  .add('Active', () => <PlainButton active />)
  .add('Custom theme', () => <CustomThemeButton />)
  .add('Multiple Same Line', () => <MultipleButton />)
  .add('Colored', () => <ColoredButton />)
  .add('Theme Colored', () => <ThemeColored />)
  .add('Custom tag Button', () => <CustomTagButton />)
  .add('Sidebar', () => <SidebarButtons />);
