import React, { useState } from 'react';

import { Box, Button, Grid, Text } from 'grommet';

export const AppGrid = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Grid
      fill
      rows={['auto', 'flex']}
      columns={['auto', 'flex']}
      areas={[
        { name: 'header', start: [0, 0], end: [1, 0] },
        { name: 'sidebar', start: [0, 1], end: [0, 1] },
        { name: 'main', start: [1, 1], end: [1, 1] },
      ]}
    >
      <Box
        gridArea="header"
        direction="row"
        align="center"
        justify="between"
        pad={{ horizontal: 'medium', vertical: 'small' }}
        background="dark-2"
      >
        <Button onClick={() => setSidebar(!sidebar)}>
          <Text size="large">Title</Text>
        </Button>
        <Text>my@email</Text>
      </Box>
      {sidebar && (
        <Box
          gridArea="sidebar"
          background="dark-3"
          width="small"
          animation={[
            { type: 'fadeIn', duration: 300 },
            { type: 'slideRight', size: 'xlarge', duration: 150 },
          ]}
        >
          {['First', 'Second', 'Third'].map((name) => (
            <Button key={name} href="#" hoverIndicator>
              <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                <Text>{name}</Text>
              </Box>
            </Button>
          ))}
        </Box>
      )}
      <Box gridArea="main" justify="center" align="center">
        <Text>main</Text>
      </Box>
    </Grid>
    // </Grommet>
  );
};

AppGrid.args = {
  full: true,
};

AppGrid.storyName = 'App';

export default {
  title: 'Layout/Grid/App',
};
