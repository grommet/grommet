import React from 'react';

import {
  Anchor,
  Box,
  Button,
  PageHeader,
  Page,
  PageContent,
  Text,
} from 'grommet';
import { FormPrevious } from 'grommet-icons';

export const Children = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Page>
    <PageContent>
      <PageHeader
        gridProps={{
          areas: [
            ['context', 'context'],
            ['pretitle', 'empty-1'],
            ['title', 'actions'],
            ['subtitle', 'empty'],
          ],
          rows: ['auto', 'auto', 'auto', 'auto'],
        }}
        title="Grommet"
        subtitle={`Grommet helps you build responsive and accessible 
          mobile-first projects for the web with an easy to use component 
          library.`}
        actions={<Button label="Get Started" primary />}
        context={
          <Anchor label="Back to All Libraries" icon={<FormPrevious />} />
        }
      >
        <Box gridArea="pretitle">
          <Text size="small">Open-source</Text>
        </Box>
      </PageHeader>
    </PageContent>
  </Page>
  // </Grommet>
);

export default {
  title: 'Layout/PageHeader/Children',
};
