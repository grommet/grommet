import React, { useState } from 'react';
import {
  Page,
  PageContent,
  Heading,
  Paragraph,
  Grid,
  Card,
  Box,
  Button,
  Notification,
} from 'grommet';

export const PageNotification = () => {
  const [kind, setKind] = useState('narrow');

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Page pad={{ vertical: 'medium' }} kind={kind} background="background-back">
      <PageContent background="background-front">
        <Box direction="row" justify="between" pad={{ vertical: 'medium' }}>
          <Heading margin="none">
            {kind.slice(0, 1).toUpperCase() + kind.slice(1)} Page
          </Heading>
          <Box direction="row" align="end">
            <Button
              label="Wide"
              onClick={() => setKind('wide')}
              primary={kind === 'wide'}
              color={kind === 'wide' ? 'background-back' : undefined}
            />
            <Button
              label="Narrow"
              onClick={() => setKind('narrow')}
              primary={kind === 'narrow'}
              color={kind === 'narrow' ? 'background-back' : undefined}
            />
            <Button
              label="Full"
              onClick={() => setKind('full')}
              primary={kind === 'full'}
              color={kind === 'full' ? 'background-back' : undefined}
            />
          </Box>
        </Box>

        <Notification
          status="critical"
          message="Page level notification."
          onClose={() => console.log('close notification')}
        />
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan
          nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis
          bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim
          faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.
        </Paragraph>
        <Grid
          rows="small"
          columns={{ count: 'fit', size: 'small' }}
          gap="small"
        >
          <Card background="white" pad="large">
            Card
          </Card>
          <Card background="white" pad="large">
            Card
          </Card>
        </Grid>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan
          nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis
          bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim
          faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.
        </Paragraph>
      </PageContent>
    </Page>
    // </Grommet>
  );
};

export default {
  title: 'Layout/Page/Page Notification',
};
