// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';

import {
  Amazon,
  Cloud,
  Configure,
  Database,
  Home,
  Logout,
  Server,
  ServerCluster,
  Storage,
  User,
} from 'grommet-icons';
import { Box, Select, Spinner, Text, ThemeContext } from 'grommet';

const transparentDisabledOptionTheme = {
  button: {
    disabled: {
      option: {
        background: 'transparent',
      },
    },
  },
};

// Reference example for HPE Design System adopters (e.g. Zerto) showing how
// to cover three commonly requested Select capabilities without forking it:
//
//   1. Loading state   -> `valueLabel` (control) + a placeholder option (drop)
//   2. Start/end icons -> `labelKey`/`valueLabel` (start); the end icon is the
//                         themed default caret, `icon` only for a custom one
//   3. Grouping        -> disabled options serve as visual group headers. This
//                         is an interim workaround because Select has no native
//                         grouped-options API.
//
// Use labelKey rather than the children render prop so option content follows
// Select's themed text path and preserves state styling without custom colors.
// `valueLabel` still customizes only the control's value area, and the end icon
// is the themed default caret (`icon` is only for a custom glyph, e.g. the
// loading spinner).
//
// Fake disabled header options inherit disabled-option styling and remain
// listbox options. This is an interim visual workaround, not semantic grouping;
// native grouping requires a future Select optionGroup API.
const storageOptions = [
  { header: true, label: 'Cloud Storage' },
  {
    label: 'AWS Storage Gateway',
    value: 'aws-gateway',
    icon: Amazon,
  },
  {
    label: 'Amazon S3',
    value: 'amazon-s3',
    icon: Amazon,
  },
  {
    label: 'Microsoft Azure Storage',
    value: 'azure',
    icon: Cloud,
  },
  {
    label: 'S3-Compatible storage',
    value: 's3-compatible',
    icon: Cloud,
  },
  { header: true, label: 'Network Attached Storage' },
  {
    label: 'Network Share',
    value: 'network-share',
    icon: Storage,
  },
  { header: true, label: 'Purpose-built Backup Appliances' },
  {
    label: 'DELL EMC Data Domain',
    value: 'dell-emc',
    icon: Database,
  },
  {
    label: 'HPE StoreOnce',
    value: 'hpe-storeonce',
    icon: ServerCluster,
  },
];

const headerIndexes = storageOptions.reduce(
  (indexes, option, index) => (option.header ? [...indexes, index] : indexes),
  [],
);

const selectableStorageOptions = storageOptions.filter(
  (option) => !option.header,
);

const findOption = (value) =>
  storageOptions.find((option) => option.value === value);

// labelKey keeps the option Button native so the theme owns its state styling.
const renderOptionLabel = (option) => {
  if (typeof option !== 'object') return option;
  if (option.loading)
    return (
      <Box direction="row" align="center" gap="small">
        <Spinner aria-hidden="true" size="xsmall" pad="none" />
        <Text>Loading…</Text>
      </Box>
    );
  if (option.header)
    return (
      <Text size="xsmall" weight="bold" color="text-strong">
        {option.label}
      </Text>
    );
  const Icon = option.icon;
  return (
    <Box direction="row" align="center" gap="small">
      <Icon aria-hidden="true" />
      <Text>{option.label}</Text>
    </Box>
  );
};

// Control content (valueLabel): leading icon + selected label, or placeholder.
const renderValueLabel = (value, placeholder) => {
  const option = findOption(value);
  if (!option)
    return (
      <Box direction="row" align="center" gap="small" pad="small">
        <Server aria-hidden="true" color="text-weak" />
        <Text color="text-weak">{placeholder}</Text>
      </Box>
    );
  const Icon = option.icon;
  return (
    <Box direction="row" align="center" gap="small" pad="small">
      <Icon aria-hidden="true" color="text" />
      <Text>{option.label}</Text>
    </Box>
  );
};

export const Grouped = () => {
  const [value, setValue] = useState('');

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="large">
      <Box width="medium">
        <ThemeContext.Extend value={transparentDisabledOptionTheme}>
          <Select
            id="storage-type-grouped"
            name="storageType"
            aria-label="Storage type"
            options={storageOptions}
            value={value}
            valueKey={{ key: 'value', reduce: true }}
            labelKey={renderOptionLabel}
            disabled={headerIndexes}
            valueLabel={renderValueLabel(value, 'Select storage type')}
            onChange={({ value: nextValue }) => setValue(nextValue)}
          />
        </ThemeContext.Extend>
      </Box>
    </Box>
    // </Grommet>
  );
};

export const Loading = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(selectableStorageOptions);

  useEffect(() => {
    if (!loading) return undefined;

    const loadingTimer = setTimeout(() => {
      setOptions(selectableStorageOptions);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, [loading]);

  // Simulate fetching options when the drop opens.
  const onOpen = () => {
    setLoading(true);
    setOptions([{ loading: true }]);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="large">
      <Box width="medium">
        <ThemeContext.Extend value={transparentDisabledOptionTheme}>
          <Select
            id="storage-type-loading"
            name="storageTypeLoading"
            aria-label="Storage type"
            options={options}
            value={value}
            valueKey={{ key: 'value', reduce: true }}
            labelKey={renderOptionLabel}
            disabled={loading ? [0] : undefined}
            // Custom end icon while loading; undefined restores themed caret.
            icon={
              loading ? (
                <Spinner aria-hidden="true" size="xsmall" pad="none" />
              ) : undefined
            }
            // Control reflects the loading state too.
            valueLabel={
              loading ? (
                <Box direction="row" align="center" gap="small" pad="small">
                  <Text color="text-weak">Loading options…</Text>
                </Box>
              ) : (
                renderValueLabel(value, 'Select storage type')
              )
            }
            onOpen={onOpen}
            onChange={({ value: nextValue }) => setValue(nextValue)}
          />
        </ThemeContext.Extend>
      </Box>
    </Box>
    // </Grommet>
  );
};

export const StartAndEndIcons = () => {
  const [value, setValue] = useState('home');
  // Each option carries its own start icon, matching the Home/Settings menu.
  const options = [
    { label: 'Home', value: 'home', icon: Home },
    { label: 'Settings', value: 'settings', icon: Configure },
    { label: 'Account', value: 'account', icon: User },
    { label: 'Sign out', value: 'signout', icon: Logout },
  ];

  const selected = options.find((option) => option.value === value);
  const TriggerIcon = selected ? selected.icon : Home;

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="large">
      <Box width="medium">
        <Select
          id="menu-select"
          name="menu"
          aria-label="Navigation destination"
          options={options}
          value={value}
          valueKey={{ key: 'value', reduce: true }}
          // Per-option start icons render through labelKey (keeps native state
          // styling); the control's start icon reflects the current selection.
          labelKey={(option) => (
            <Box direction="row" align="center" gap="small">
              <option.icon aria-hidden="true" />
              <Text>{option.label}</Text>
            </Box>
          )}
          valueLabel={
            <Box direction="row" align="center" gap="small" pad="small">
              <TriggerIcon aria-hidden="true" color="text" />
              <Text color={selected ? 'text' : 'text-weak'}>
                {selected ? selected.label : 'Home'}
              </Text>
            </Box>
          }
          onChange={({ value: nextValue }) => setValue(nextValue)}
        />
      </Box>
    </Box>
    // </Grommet>
  );
};

export default {
  title: 'Input/Select/Zerto Select Use case',
};
