import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Box, Text } from 'grommet';
import { DateTimeInput } from '../index';

const meta: Meta<typeof DateTimeInput> = {
  title: 'Input/DateTimeInput/Locale',
  component: DateTimeInput,
};

export default meta;

type Story = StoryObj<typeof DateTimeInput>;

const ISO = '2020-07-22T18:30:00.000Z';

export const Locale: Story = {
  render: () => {
    const [usValue, setUsValue] = React.useState(ISO);
    const [deValue, setDeValue] = React.useState(ISO);
    const [frValue, setFrValue] = React.useState(ISO);

    return (
      <Box pad="large" gap="medium" width="medium">
        <Box gap="xsmall">
          <Text size="small" weight="bold">
            en-US (MM/DD/YYYY, 12h)
          </Text>
          <DateTimeInput
            locale="en-US"
            value={usValue}
            onChange={({ value: next }: { value?: string }) =>
              setUsValue(next || '')
            }
          />
        </Box>
        <Box gap="xsmall">
          <Text size="small" weight="bold">
            de-DE (DD.MM.YYYY, 24h)
          </Text>
          <DateTimeInput
            locale="de-DE"
            value={deValue}
            onChange={({ value: next }: { value?: string }) =>
              setDeValue(next || '')
            }
          />
        </Box>
        <Box gap="xsmall">
          <Text size="small" weight="bold">
            fr-FR (DD/MM/YYYY, 24h)
          </Text>
          <DateTimeInput
            locale="fr-FR"
            value={frValue}
            onChange={({ value: next }: { value?: string }) =>
              setFrValue(next || '')
            }
          />
        </Box>
      </Box>
    );
  },
};

Locale.storyName = 'Locale';
