import React from 'react';
import {
  Page,
  Header,
  Heading,
  Paragraph,
  Grid,
  Card,
  PageContent,
  Grommet,
} from 'grommet';

const customTheme = {
  page: {
    customKind: {
      alignSelf: 'start',
      width: {
        min: '200px',
        max: '500px',
      },
      small: {
        pad: 'medium',
        margin: { vertical: 'small', horizontal: 'small' },
      },
      medium: {
        pad: 'medium',
        margin: { vertical: 'small', horizontal: 'small' },
      },
      large: {
        pad: 'medium',
        margin: { vertical: 'small', horizontal: 'small' },
      },
    },
  },
};

export const LeftColumn = () => (
  <Grommet theme={customTheme}>
    <Page kind="customKind">
      <PageContent>
        <Header>
          <Heading>Custom Kind</Heading>
        </Header>
      </PageContent>
      <PageContent background={{ fill: 'horizontal', color: 'pink' }}>
        Background goes all the way across Page width regardless of Page kind
        (wide, narrow, full, or custom).
      </PageContent>
      <PageContent>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan
          nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis
          bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim
          faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.
        </Paragraph>
      </PageContent>
      <PageContent background="orange">
        <Paragraph>
          Background width is restricted by Page kind (wide, narrow, or full).
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
      </PageContent>
      <PageContent>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan
          nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis
          bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim
          faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.
        </Paragraph>
      </PageContent>
    </Page>
  </Grommet>
);

LeftColumn.storyName = 'Left column';

export default {
  title: 'Layout/Page/Custom Themed/Left column',
};
