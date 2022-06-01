import React from 'react';

import { Box, Menu, Text } from 'grommet';
import { Figma, Github, Slack } from 'grommet-icons';

const data = [
  {
    icon: <Github />,
    title: 'Github',
  },
  {
    icon: <Figma color="plain" />,
    title: 'Figma',
  },
  {
    icon: <Slack color="plain" />,
    title: 'Slack',
  },
];

export const Grouped = () => (
  <Box direction="row" gap="xlarge" align="center" pad="large">
    <Menu
      open
      dropProps={{
        align: { top: 'bottom', left: 'left' },
        elevation: 'xlarge',
      }}
      label="Simple Groups"
      items={[
        [{ label: 'New file' }, { label: 'Copy link' }, { label: 'Edit file' }],
        [{ label: 'Delete file' }],
      ]}
    />
    <Menu
      open
      dropProps={{
        align: { top: 'bottom', left: 'left' },
        elevation: 'xlarge',
      }}
      label="Grouped with headings"
      items={[
        [
          { heading: 'Cloud Consoles', id: 'cloud-consoles' },
          { label: 'HPE GreenLake Cloud Services' },
          { label: 'HPE Data Services' },
          { label: 'HPE Compute Ops Manager' },
        ],
        [
          {
            heading: 'HPE GreenLake Administration',
            id: 'hpe-greenlake-admin',
          },
          { label: 'Manage Account' },
          { label: 'Manage Devices' },
        ],
      ]}
    />
    <Menu
      open
      dropProps={{
        align: { top: 'bottom', left: 'left' },
        elevation: 'xlarge',
      }}
      label="Complex labels"
      items={[
        [
          { heading: 'Apps', id: 'apps' },
          { label: <CustomLabel icon={data[0].icon} title={data[0].title} /> },
          { label: <CustomLabel icon={data[1].icon} title={data[1].title} /> },
          { label: <CustomLabel icon={data[2].icon} title={data[2].title} /> },
        ],
        [{ label: 'Find new apps' }, { label: 'Manage your apps' }],
      ]}
    />
  </Box>
);

const CustomLabel = ({ icon, title }) => (
  <Box direction="row" gap="small">
    {icon}
    <Text>{title}</Text>
  </Box>
);

Grouped.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Menu/Grouped',
};
