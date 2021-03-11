import React from 'react';
import { css } from 'styled-components';
import { ThemeType, BoxTypes, Grommet, Box, Anchor, Button } from 'grommet';

// Custom theme to verify that various `extend` types work correctly
// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' and :' BoxTypes' if you are not using TypeScript.
const custom: ThemeType = {
  box: {
    extend: css`
      cursor: ${(props: BoxTypes) => (props.onClick ? 'cursor' : 'inherit')};
    `,
  },
  anchor: {
    extend: props => css`
      color: ${props.href ? 'green' : 'red'};
    `,
  },
  button: {
    extend: props => {
      let extraStyles = '';
      if (props.primary) {
        extraStyles = `
          text-transform: uppercase;
          color: white;
        `;
      }
      return `
        color: green;
        font-size: 12px;
        font-weight: bold;

        ${extraStyles}
      `;
    },
  },
  icon: {
    // Components without typed theme props should pass type-checking
    extend: props => css`
      color: ${props.untypedProp === 'some value' ? 'red' : 'green'};
    `,
  },
};

// Type annotations can only be used in TypeScript files.
// Remove ': TReact.FC' is you are not using TypeScript.
const ExtendTheme: React.FC = () => {
  return (
    <Grommet theme={custom}>
      <Box pad="small" gap="medium" width="medium">
        <Anchor href="#">Anchor (href)</Anchor>
        <Anchor>Anchor (no href)</Anchor>

        <Button label="Standard Button" onClick={() => {}} />
        <Button label="Primary Button" primary onClick={() => {}} />

        <Box onClick={() => {}}>Clickable box should use pointer cursor.</Box>

        <Box>Un-clickable box should use standard cursor.</Box>
      </Box>
    </Grommet>
  );
};

export const Extend = () => <ExtendTheme />;

export default {
  title: 'Utilities/Theme/Extend',
};
