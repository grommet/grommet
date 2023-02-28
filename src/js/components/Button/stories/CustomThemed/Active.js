import React from 'react';
import {
  Anchor,
  Grommet,
  Button,
  Box,
  Menu,
  Pagination,
  Select,
  SelectMultiple,
  MaskedInput,
  TextInput,
  DateInput,
  Text,
} from 'grommet';
import { LinkNext, Down, Search } from 'grommet-icons';

export const Active = () => (
  <Grommet
    theme={{
      global: {
        font: {
          family: `-apple-system, BlinkMacSystemFont`,
        },
      },
      icon: {
        matchSize: true,
        size: {
          small: '12px',
          medium: '18px',
          large: '24px',
        },
      },
      button: {
        default: {
          background: undefined,
          border: {
            radius: '2em',
          },
          pad: {
            horizontal: '12px',
            vertical: '12px',
          },
        },
        primary: {
          background: 'brand',
          border: {
            radius: '2em',
          },
          pad: {
            horizontal: '12px',
            vertical: '12px',
          },
        },
        size: {
          // small: {
          //   pad: '9px',
          // },
          // large: {
          //   pad: '9px',
          // },
        },
      }, // enabling kind button functionality
      menu: {
        icons: {
          down: Down,
        },
      },
      select: {
        icons: {
          down: Down,
        },
      },
    }}
  >
    <Box pad="large" align="center" gap="medium">
      <Button icon={<LinkNext />} size="small" primary />
      <Button icon={<LinkNext />} primary />
      <Button icon={<LinkNext />} size="large" primary />
      <Button
        icon={<LinkNext size="12px" />}
        label="Explicit size override on icon"
        size="large"
        primary
        reverse
      />
    </Box>
    <Box pad="large" align="center" gap="medium">
      <Pagination numberItems={200} size="small" />
      <Pagination numberItems={200} />
      <Pagination numberItems={200} size="large" />
    </Box>
    <Box pad="large" align="center" gap="medium">
      <Menu label="Menu" size="small" />
      <Menu label="Menu" />
      <Menu label="Menu" size="large" />
    </Box>
    <Box pad="large" align="center" gap="medium">
      <Select placeholder="Select" size="small" options={[]} />
      <Select placeholder="Select" options={[]} />
      <Select placeholder="Select" size="large" options={[]} />
    </Box>
    <Box pad="large" align="center" gap="medium">
      <SelectMultiple placeholder="SelectMultiple" size="small" options={[]} />
      <SelectMultiple placeholder="SelectMultiple" options={[]} />
      <SelectMultiple placeholder="SelectMultiple" size="large" options={[]} />
    </Box>
    <Box pad="large" align="center" gap="medium" width="medium">
      <TextInput placeholder="TextInput" size="small" icon={<Search />} />
      <TextInput placeholder="TextInput" icon={<Search />} />
      <TextInput placeholder="TextInput" size="large" icon={<Search />} />
    </Box>
    <Box pad="large" align="center" gap="medium" width="medium">
      <MaskedInput placeholder="MaskedInput" size="small" icon={<Search />} />
      <MaskedInput placeholder="MaskedInput" icon={<Search />} />
      <MaskedInput placeholder="MaskedInput" />
      <MaskedInput placeholder="MaskedInput" size="large" icon={<Search />} />
    </Box>
    <Box pad="large" align="center" gap="medium" width="medium">
      <DateInput format="mm/dd/yyyy" size="small" />
      <DateInput format="mm/dd/yyyy" />
      <DateInput format="mm/dd/yyyy" size="large" />
    </Box>
    <Box pad="large" align="center" gap="medium" width="medium">
      <Text size="small">
        This is <Anchor label="small" icon={<LinkNext />} reverse />
      </Text>
      <Text>
        This is <Anchor label="medium" icon={<LinkNext />} reverse />
      </Text>
      <Text size="large">
        This is <Anchor label="large" icon={<LinkNext />} reverse />
      </Text>
    </Box>
  </Grommet>
);

Active.storyName = 'Active';

export default {
  title: 'Controls/Button/Custom Themed/Active',
};
