// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  Box,
  Button,
  Form,
  FormField,
  SelectMultiple,
  Text,
  TextInput,
} from 'grommet';

const options = Array.from({ length: 8 }, (_, index) => `Option ${index + 1}`);
const longOptions = Array.from(
  { length: 50 },
  (_, index) => `Option ${index + 1}`,
);

const OptionsPresentationExample = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Box width="medium" pad="medium">
      <Form
        onChange={() => setSubmitted(false)}
        onSubmit={() => setSubmitted(true)}
      >
        <FormField
          label="Current behaviour"
          name="drop"
          help="Selections inside drop"
        >
          <SelectMultiple
            name="drop"
            options={options}
            dropHeight="medium"
            placeholder="Choose options"
          />
        </FormField>
        <FormField
          label="Option D"
          name="dropDone"
          help="Drop with Done button"
        >
          <SelectMultiple
            name="dropDone"
            options={longOptions}
            dropHeight="medium"
            showDoneButton
            placeholder="Choose options"
          />
        </FormField>
        <FormField
          label="Option B - Inline presentation"
          name="inline"
          help="8 options, hugs inline content"
        >
          <SelectMultiple
            name="inline"
            options={options}
            optionsPresentation="inline"
            placeholder="Choose options"
          />
        </FormField>
        <FormField
          label="Option B - Inline presentation"
          name="inline"
          help="8 options, using open prop to control visibility on load"
        >
          <SelectMultiple
            name="inline"
            options={options}
            optionsPresentation="inline"
            placeholder="Choose options"
            open
          />
        </FormField>
        <FormField
          label="Option B - Inline presentation"
          name="inlineLong"
          help="50 options, fixed height + overflow scroll"
        >
          <SelectMultiple
            name="inlineLong"
            options={longOptions}
            optionsPresentation="inline"
            dropHeight="medium"
            placeholder="Choose options"
          />
        </FormField>
        <FormField label="Notes" name="notes">
          <TextInput />
        </FormField>
        <Button type="submit" label="Submit" primary />
        {submitted && <Text>Submitted</Text>}
      </Form>
    </Box>
  );
};

const meta: Meta<typeof SelectMultiple> = {
  title: 'Input/SelectMultiple/Options presentation',
  component: SelectMultiple,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const OptionsPresentation: Story = {
  render: () => <OptionsPresentationExample />,
};
