import React from 'react';
import {
  Page,
  Header,
  Heading,
  Paragraph,
  Grid,
  Card,
  PageContent,
  Footer,
  Box,
} from 'grommet';

export const MultipleBackgrounds = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Page kind="narrow">
    <PageContent background={{ fill: 'horizontal', color: 'white' }}>
      <Header>
        <Heading>Narrow Page</Heading>
      </Header>
    </PageContent>
    <PageContent background={{ fill: 'horizontal', color: 'light-2' }}>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
        gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
        dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum
        leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus
        nunc porta egestas. Fusce dapibus lobortis tincidunt.
      </Paragraph>
    </PageContent>
    <PageContent background={{ fill: 'horizontal', color: 'dark-4' }}>
      <Box pad={{ vertical: 'medium' }}>
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
      </Box>
    </PageContent>
    <PageContent background={{ fill: 'horizontal', color: 'light-2' }}>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
        gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
        dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum
        leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus
        nunc porta egestas. Fusce dapibus lobortis tincidunt.
      </Paragraph>
    </PageContent>
    <PageContent background={{ fill: 'horizontal', color: 'white' }}>
      <Footer pad={{ vertical: 'small' }}>Footer</Footer>
    </PageContent>
  </Page>
  // </Grommet>
);

MultipleBackgrounds.storyName = 'Multiple backgrounds';

export default {
  title: 'Layout/Page/Multiple backgrounds',
};
