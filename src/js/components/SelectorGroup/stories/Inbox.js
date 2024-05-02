import React from 'react';

import {
  Box,
  Button,
  Text,
  Notification,
  SelectorGroup,
  SelectorTitle,
  SelectorHeader,
  Selector,
  Page,
  PageContent,
  PageHeader,
  Toolbar,
  DataSearch,
  Grid,
  Tabs,
  Tab,
} from 'grommet';
import {
  StatusCriticalSmall,
  CircleAlert,
  StatusWarningSmall,
} from 'grommet-icons';

const InboxFilters = () => (
  <SelectorGroup multiple>
    <Selector>
      <SelectorHeader>
        <Box gap="xsmall">
          <StatusCriticalSmall color="status-critical" />
          <SelectorTitle size="small">Critical</SelectorTitle>
          <Text size="large">18</Text>
        </Box>
      </SelectorHeader>
    </Selector>
    <Selector>
      <SelectorHeader>
        <Box gap="xsmall">
          <CircleAlert />
          <SelectorTitle size="small">Action needed</SelectorTitle>
          <Text size="large">9</Text>
        </Box>
      </SelectorHeader>
    </Selector>
    <Selector>
      <SelectorHeader>
        <Box gap="xsmall">
          <StatusWarningSmall color="status-warning" />
          <SelectorTitle size="small">Warning</SelectorTitle>
          <Text size="large">9</Text>
        </Box>
      </SelectorHeader>
    </Selector>
  </SelectorGroup>
);

export const Inbox = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Page kind="full" background="background-back" fill>
    <PageContent>
      <PageHeader
        title="Cases"
        actions={<Button label="Create case" secondary />}
      />
      <Toolbar>
        <DataSearch />
      </Toolbar>
      <Grid
        columns={['medium', 'flex']}
        gap="medium"
        pad={{ vertical: 'medium' }}
      >
        <Box
          background="background-front"
          gap="small"
          round="small"
          pad="small"
        >
          <InboxFilters />
          <Text>100 cases</Text>
          <Box border={{ style: 'dashed' }} height="medium">
            inbox summary here
          </Box>
        </Box>
        <Box background="background-front" pad="medium" round="small">
          <Notification
            status="warning"
            title="Awaiting customer action"
            message="Please confirm this case is resolved and may be closed."
          />
          <PageHeader
            level={2}
            title="APIs not updating"
            subtitle="Case: 5234981432"
            actions={
              <Box direction="row" gap="small">
                <Button label="Upload files" />
                <Button label="Request to close" secondary />
              </Box>
            }
          />
          <Tabs justify="start">
            <Tab title="Details">
              <Box pad={{ vertical: 'medium' }}>Page content here.</Box>
            </Tab>
            <Tab title="Communications">
              <Box pad={{ vertical: 'medium' }}>Page content here.</Box>
            </Tab>
            <Tab title="Files">
              <Box pad={{ vertical: 'medium' }}>Page content here.</Box>
            </Tab>
          </Tabs>
        </Box>
      </Grid>
    </PageContent>
  </Page>

  // </Grommet>
);

Inbox.args = {
  full: true,
};

export default {
  title: 'Controls/SelectorGroup/Inbox',
};
