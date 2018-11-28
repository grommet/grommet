import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from 'grommet-icons';

import { Box, Button, Grommet, RoutedButton, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from '../../utils';

const SimpleButton = props => (
  <Grommet theme={grommet}>
    <Box align="start">
      <Button label="Submit" onClick={() => {}} {...props} />
    </Box>
  </Grommet>
);

const IconButton = () => (
  <Grommet theme={grommet}>
    <Button icon={<Add />} hoverIndicator onClick={() => {}} />
  </Grommet>
);

const IconLabelButton = () => (
  <Grommet theme={grommet}>
    <Box align="start" gap="small">
      <Button icon={<Add />} label="Add" onClick={() => {}} primary />
      <Button icon={<Add />} label="Add" onClick={() => {}} />
    </Box>
  </Grommet>
);

const PlainButton = props => (
  <Grommet theme={grommet}>
    <Button hoverIndicator="light-1" onClick={() => {}} {...props}>
      <Box pad="small" direction="row" align="center" gap="small">
        <Add />
        <Text>Add</Text>
      </Box>
    </Button>
  </Grommet>
);

const AnchorButton = () => (
  <Grommet theme={grommet}>
    <Button label="Go" href="#" />
  </Grommet>
);

const RouteButton = () => (
  <Grommet theme={grommet}>
    <RoutedButton label="Go" path="/" />
  </Grommet>
);

const CustomTagButton = () => (
  <Grommet theme={grommet}>
    <Button as="span" label="Go" path="/" />
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
    <Button label="Submit" onClick={() => {}} primary />
  </Grommet>
);

const MultipleButton = () => (
  <Grommet theme={grommet}>
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
  </Grommet>
);

const ColoredButton = props => (
  <Grommet theme={grommet}>
    <Box align="start" gap="small">
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
    <Box align="start" gap="small">
      <Button primary label="Submit" onClick={() => {}} />
      <Button primary color="dark-1" label="Submit" onClick={() => {}} />
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
  .add('Custom tag Button', () => <CustomTagButton />);
