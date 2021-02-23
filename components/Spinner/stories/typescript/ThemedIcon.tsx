import React from 'react';

import { Box, Grommet, Spinner } from 'grommet';
import { Node } from 'grommet-icons';
import { ThemeType } from 'grommet/themes';

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.
const themeWithAnimation: ThemeType = {
  spinner: {
    icon: Node,
    container: {
      color: 'accent-2',
      align: 'center',
      justify: 'center',
      size: 'large',
      animation: { type: 'rotateLeft', duration: 900 },
    },
  },
};

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.
const themeWithAnimatedIcon: ThemeType = {
  spinner: {
    icon: (
      <svg
        version="1.1"
        viewBox="0 0 32 32"
        width="32px"
        height="32px"
        fill="#333333"
      >
        <path
          opacity=".25"
          d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28
      A12 12 0 0 1 16 4"
        />
        <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 16 16"
            to="360 16 16"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    ),
    container: { size: 'large', animation: undefined },
  },
};

export const ThemedIcon = () => (
  <>
    <Grommet theme={themeWithAnimation}>
      <Box pad="large">
        <Spinner />
      </Box>
    </Grommet>
    <Grommet theme={themeWithAnimatedIcon}>
      <Box pad="large">
        <Spinner />
      </Box>
    </Grommet>
  </>
);

ThemedIcon.storyName = 'Themed Icon';

export default {
  title: 'Visualizations/Spinner/Themed Icon',
};
