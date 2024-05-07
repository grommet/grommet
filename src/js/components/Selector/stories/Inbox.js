import React from 'react';

import {
  Box,
  Button,
  Text,
  Notification,
  SelectorGroup,
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
import { SelectorIndicator } from '../../SelectorIndicator';

// template to put into DS site
const SelectorContainer = ({ children, icon }) => {
  return (
    <Selector>
      {({ selected }) => {
        return (
          <Box
            border={{
              color: selected ? 'brand' : 'border',
            }}
            overflow="hidden"
            round="xsmall"
            fill
            pad="small"
          >
            <Box gap="xsmall">
              <Box direction="row" justify="between">
                {icon}
                <SelectorIndicator />
              </Box>
              {children}
            </Box>
          </Box>
        );
      }}
    </Selector>
  );
};

const InboxFilters = () => (
  <SelectorGroup multiple>
    <Grid
      columns={{
        count: 3,
        size: ['xsmall'],
      }}
      gap="small"
    >
      <SelectorContainer icon={<StatusCriticalSmall color="status-critical" />}>
        <Text size="small">Critical</Text>
        <Text size="large">18</Text>
      </SelectorContainer>
      <SelectorContainer icon={<CircleAlert />}>
        <Text size="small">Action needed</Text>
        <Text size="large">9</Text>
      </SelectorContainer>
      <SelectorContainer icon={<StatusWarningSmall color="status-warning" />}>
        <Text size="small">Warning</Text>
        <Text size="large">9</Text>
      </SelectorContainer>
    </Grid>
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
