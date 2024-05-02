import React from 'react';

import {
  Box,
  Text,
  Selector,
  SelectorGroup,
  SelectorBody,
  SelectorHeader,
  Page,
  PageContent,
  PageHeader,
  Data,
  DataTable,
} from 'grommet';

export const QuickFilters = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>

  <Page>
    <PageContent>
      <PageHeader title="Devices" subtitle="Manage your devices." />
      <Box gap="medium">
        <SelectorGroup multiple>
          <Selector>
            <SelectorHeader title="Require service assignments" />
            <SelectorBody>
              <Text size="large">24</Text>
            </SelectorBody>
          </Selector>
          <Selector>
            <SelectorHeader title="Expired subscriptions" />
            <SelectorBody>
              <Text size="large">18</Text>
            </SelectorBody>
          </Selector>
          <Selector>
            <SelectorHeader title="Needs attention" />
            <SelectorBody>
              <Text size="large">9</Text>
            </SelectorBody>
          </Selector>
        </SelectorGroup>
        <Data data={[]} toolbar>
          <DataTable
            columns={[
              {
                property: 'name',
                header: 'Name',
              },
              {
                property: 'model',
                header: 'Model',
              },
              {
                property: 'city',
                header: 'City',
              },
              {
                property: 'state',
                header: 'State',
              },
              {
                property: 'country',
                header: 'Country',
              },
            ]}
            placeholder={
              <Box pad="large" align="center" justify="center">
                There is no available data.
              </Box>
            }
          />
        </Data>
      </Box>
    </PageContent>
  </Page>
  // </Grommet>
);

QuickFilters.args = {
  full: true,
};

export default {
  title: 'Controls/SelectorGroup/Quick Filters',
};
