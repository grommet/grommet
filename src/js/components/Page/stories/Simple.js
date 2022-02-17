import React from 'react';

import { Page, Box, Header, Heading, Paragraph, Grid, Card } from 'grommet';

export const Simple = () => (
  <>
    <Box background="#35bd55">
      <Heading>Global Header</Heading>
    </Box>
    <Page kind="narrow">
      {/* <PageSection>
        <Header>
          <Heading>Heading</Heading>
        </Header>
      </PageSection>
      <PageSection full background="pink">
        Background goes all the way across regardless of Page kind (wide,
        narrow, or full). This is accomplished by setting the `full` prop on
        PageContent.
      </PageSection>
      <PageSection>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan
          nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis
          bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim
          faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.
        </Paragraph>
      </PageSection>
      <PageSection background="orange">
        Background width is restricted by Page kind (wide, narrow, or full).
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
      </PageSection>
      <PageSection>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan
          nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis
          bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim
          faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.
        </Paragraph>
      </PageSection> */}
    </Page>
    <Box background="#35bd55">
      <Heading>Global Footer</Heading>
    </Box>
  </>
);

export default {
  title: 'Layout/Page/Simple',
};
