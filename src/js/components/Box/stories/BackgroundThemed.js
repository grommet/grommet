import React, { useContext } from 'react';

import { Box, Paragraph, Text, ThemeContext } from 'grommet';
import { Grid } from '../../Grid';

export const BackgroundThemed = () => {
  const theme = useContext(ThemeContext);
  const { backgrounds } = theme.global;

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet>
    backgrounds ? (
      <Grid columns="small" rows="small" gap="small" pad="large">
        {Object.entries(backgrounds).map(([key, background]) => (
          <Box
            key={key}
            background={background}
            fill
            pad="medium"
            justify="center"
            round="small"
          >
            <Text weight="bold" size="large">
              {key}
            </Text>
          </Box>
        ))}
      </Grid>
    ) : (
      <Box pad="large">
        <Paragraph size="large">
          There are no backgrounds defined at `theme.global.backgrounds` for the
          currently selected theme. Selecting &quot;grommet&quot; from the Theme
          menu above is a good place to start.
        </Paragraph>
      </Box>
    )
    // </Grommet>
  );
};

BackgroundThemed.storyName = 'Background from theme';

export default {
  title: 'Layout/Box/Background from theme',
};
