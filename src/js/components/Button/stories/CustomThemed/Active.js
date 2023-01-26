import React from 'react';
import { Grommet, Button, Box, TextInput } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';
import {
  Filter,
  Columns,
  Edit,
  Add,
  LinkNext,
  Trash,
  Search,
} from 'grommet-icons';

const primaryBackground = (props) =>
  !props.active
    ? `background:
linear-gradient(70deg, transparent,
  ${props.theme.global.colors['green!']} 35%, transparent 70%)
  ${props.theme.global.colors['green!']};`
    : '';

const primaryHoverBackground = (props) =>
  !props.active ? 'background-color: rgb(16, 116, 85);' : '';

const brandRefresh = deepMerge(hpe, {
  text: {
    xsmall: {
      size: '14px',
      height: '16px',
      maxWidth: '379px',
    },
    small: {
      size: '16px',
      height: '20px',
      maxWidth: '379px',
    },
    medium: {
      size: '18px',
      height: '24px',
      maxWidth: '432px',
    },
    large: {
      size: '24px',
      height: '32px',
      maxWidth: '538px',
    },
    xlarge: {
      size: '30px',
      height: '36px',
      maxWidth: '643px',
    },
    xxlarge: {
      size: '36px',
      height: '40px',
      maxWidth: '854px',
    },
    '3xl': {
      size: '42px',
      height: '46px',
    },
    '4xl': {
      size: '48px',
      height: '48px',
    },
    '5xl': {
      size: '72px',
      height: '72px',
    },
    // flatten to match 5xl
    '6xl': {
      size: '72px',
      height: '72px',
    },
  },
  button: {
    icon: {
      size: {
        small: '16px',
        medium: '18px',
        large: '24px',
      },
    },
    default: {
      color: 'text-strong',
      border: {
        radius: '100px',
      },
      font: {
        weight: 700,
      },
    },
    primary: {
      border: {
        radius: '100px',
      },
      color: 'text-primary-button',
      font: { weight: 'bold' },
      extend: (props) => primaryBackground(props),
    },
    secondary: {
      border: {
        color: 'brand',
        width: '2px',
        radius: '100px',
      },
      color: 'text-strong',
      font: {
        weight: 700,
      },
    },
    'cta-primary': {
      extend: (props) => primaryBackground(props),
    },
    hover: {
      primary: {
        extend: (props) => primaryHoverBackground(props),
      },
      'cta-primary': {
        extend: (props) => primaryHoverBackground(props),
      },
    },
    disabled: {
      opacity: 0.3,
      // overriding what is currently in grommet-theme-hpe
      background: undefined,
      color: undefined,
      primary: undefined,
      secondary: undefined,
      toolbar: undefined,
      'cta-primary': undefined,
      'cta-alternate': undefined,
    },
    size: {
      small: {
        pad: {
          vertical: '7px',
          horizontal: '18px',
        },
        // should we allow this or handle it in pad like above?
        // are there postives/negatives in alignment in cases where
        // button label wraps?
        font: {
          height: '24px',
        },
        toolbar: {
          pad: {
            vertical: '4px',
            horizontal: '8px',
          },
        },
        iconOnly: {
          pad: '9px',
        },
        // overriding what's currently in theme
        'cta-primary': undefined,
        'cta-alternate': undefined,
      },
      medium: {
        pad: {
          vertical: '6px',
          horizontal: '18px',
        },
        toolbar: {
          border: {
            radius: '6px',
          },
          pad: {
            vertical: '6px',
            horizontal: '12px',
          },
        },
        iconOnly: {
          pad: '9px',
        },
      },
      large: {
        pad: {
          vertical: '8px',
          horizontal: '24px',
        },

        toolbar: {
          pad: {
            vertical: '8px',
            horizontal: '16px',
          },
        },
        iconOnly: {
          pad: '12px',
        },
      },
    },
  },
});

export const Active = () => (
  <Grommet theme={brandRefresh}>
    <Box direction="row" align="start" gap="medium" pad="medium">
      <Box align="start" gap="small">
        <Button label="Default (small)" size="small" />
        <Button label="Default" />
        <Button label="Default (large)" size="large" />
        <Button label="Default, active" active />
        <Button label="Default, disabled" disabled />
        <Button icon={<Edit />} />
        <Button icon={<Add />} size="large" />
      </Box>
      <Box align="start" gap="small">
        <Button label="Secondary (small)" secondary size="small" />
        <Button label="Secondary" secondary />
        <Button label="Secondary (large)" secondary size="large" />
        <Button label="Secondary, active" active secondary />
        <Button label="Secondary, disabled" disabled secondary />
        <Button icon={<Edit />} secondary />
        <Button icon={<Add />} secondary size="large" />
      </Box>
      <Box align="start" gap="small">
        <Button
          label="Secondary (small)"
          secondary
          size="small"
          icon={<LinkNext color="green!" />}
          reverse
        />
        <Button
          label="Secondary"
          secondary
          icon={<LinkNext color="green!" />}
          reverse
        />
        <Button
          label="Secondary (large)"
          secondary
          size="large"
          icon={<LinkNext color="green!" />}
          reverse
        />
      </Box>
      <Box align="start" gap="small">
        <Button label="Primary (small)" size="small" primary />
        <Button label="Primary" primary />
        <Button label="Primary (large)" size="large" primary />
        <Button label="Primary, active" active primary />
        <Button label="Primary, disabled" disabled primary />
        <Button icon={<Edit />} primary />
        <Button icon={<Trash />} primary />
        <Button icon={<Add />} primary size="large" />
      </Box>
      <Box align="start" gap="small">
        <Button
          label="Primary (small)"
          primary
          size="small"
          icon={<LinkNext color="text-primary-button" />}
          reverse
        />
        <Button
          label="Primary"
          primary
          icon={<LinkNext color="text-primary-button" />}
          reverse
        />
        <Button
          label="Primary (large)"
          primary
          size="large"
          icon={<LinkNext color="text-primary-button" />}
          reverse
        />
      </Box>
      <Box align="start" gap="small">
        <Button label="CTA primary (small)" size="small" kind="cta-primary" />
        <Button label="CTA primary" kind="cta-primary" />
        <Button label="CTA primary (large)" size="large" kind="cta-primary" />
        <Button label="CTA primary, active" active kind="cta-primary" />
        <Button label="CTA primary, disabled" disabled kind="cta-primary" />
      </Box>
      <Box align="start" gap="small">
        <Button
          label="CTA alternate (small)"
          size="small"
          kind="cta-alternate"
        />
        <Button label="CTA alternate" kind="cta-alternate" />
        <Button
          label="CTA alternate (large)"
          size="large"
          kind="cta-alternate"
        />
        <Button label="CTA alternate, active" active kind="cta-alternate" />
        <Button label="CTA alternate, disabled" disabled kind="cta-alternate" />
      </Box>
      <Box align="start" gap="small">
        <Button label="Toolbar" kind="toolbar" />
        <Button label="Toolbar, active" active kind="toolbar" />
        <Button label="Toolbar, disabled" disabled kind="toolbar" />
        <Button icon={<Filter />} kind="toolbar" />
      </Box>
    </Box>
    <Box
      pad="medium"
      alignSelf="start"
      direction="row"
      gap="small"
      width="xlarge"
      border="top"
    >
      <Box width="medium">
        <TextInput icon={<Search />} />
      </Box>
      <Button icon={<Columns />} tip="Open filters" />
      <Button icon={<Filter />} tip="Open filters" />
      <Box flex />
      <Button label="Add server" secondary />
    </Box>
  </Grommet>
);

Active.storyName = 'Active';

export default {
  title: 'Controls/Button/Custom Themed/Active',
};
