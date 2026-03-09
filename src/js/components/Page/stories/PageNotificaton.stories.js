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
  Grommet,
  ToggleGroup,
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';
import {
  Accessibility,
  Add,
  List,
  Table,
  Map,
} from '@hpe-design/icons-grommet';

export const PageNotification = () => {
  const [largeFocus, setLargeFocus] = useState(false);

  const options = [
    {
      icon: <List a11yTitle="List view" />,
      value: 'list',
      tip: 'List',
    },
    {
      icon: <Table a11yTitle="Map view" />,
      value: 'table',
      tip: 'Table',
    },
    {
      icon: <Map a11yTitle="Map view" />,
      value: 'map',
      tip: 'Map',
    },
  ];

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    <Grommet
      theme={deepMerge(hpe, {
        global: {
          focus: {
            outline: {
              size: largeFocus ? '3px' : '2px',
            },
          },
        },
      })}
    >
      <Page pad={{ vertical: 'medium' }}>
        <PageContent background="background-front">
          <Box direction="row" justify="between" pad={{ vertical: 'medium' }}>
            <Heading margin="none">Page</Heading>
            <Box direction="row" align="end">
              <Button autoFocus label="Focused button" onClick={() => {}} />
              <Button
                label={`Toggle focus to ${largeFocus ? '2px' : '3px'}`}
                onClick={() => {
                  setLargeFocus(!largeFocus);
                }}
              />
            </Box>
          </Box>

          <Notification
            status="critical"
            message="Page level notification."
            onClose={() => console.log('close notification')}
          />
          <Paragraph>
            For the purposes of this demo I made the active border color black
            so that we ignore the color change when evaluating the focus state
            vs the active state.
          </Paragraph>
          <Box pad="small" direction="row" gap="small">
            <Button
              style={{
                border: '1px solid #000',
              }}
              icon={<Accessibility />}
            />
            <Button icon={<Add />} />
          </Box>
          <ToggleGroup
            a11yTitle="Choose view"
            options={options}
            defaultValue="list"
          />
          <Grid
            rows="xsmall"
            columns={{ count: 'fit', size: 'xsmall' }}
            gap="xsmall"
          >
            <Card background="white" pad="large">
              Card
            </Card>
            <Card background="white" pad="large">
              Card
            </Card>
          </Grid>
          <Box align="start">
            <Button
              style={{
                border: '1px solid #000',
                background: 'transparent',
                color: '#292d3a',
                'font-weight': '500',
              }}
              default
              active
              label="Active button"
              onClick={() => {}}
            />
          </Box>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            commodo gravida tincidunt. Nunc fringilla blandit tortor, id
            accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec
            mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce
            nec enim faucibus nunc porta egestas. Fusce dapibus lobortis
            tincidunt.
          </Paragraph>
        </PageContent>
      </Page>
    </Grommet>
  );
};

export default {
  title: 'Layout/Page/Page Notification',
};
