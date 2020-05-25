import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, Button, Grid, Text } from 'mnet-ui-base';

const AppGrid = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
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
            {['First', 'Second', 'Third'].map(name => (
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
    </div>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/Grid', module).add('App', () => <AppGrid />);
}
