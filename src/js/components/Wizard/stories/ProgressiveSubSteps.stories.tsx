// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Button,
  FormField,
  Notification,
  Paragraph,
  TextInput,
  Wizard,
} from 'grommet';

const meta: Meta<typeof Wizard> = {
  title: 'Layout/Wizard/Progressive Sub-Steps',
  component: Wizard,
};

export default meta;
type Story = StoryObj<typeof Wizard>;

// Next/Skip enter the first group. Clicking a later parent goes directly to
// its first child. Every visited group's full child list remains in the rail.
const ProgressiveSubStepsExample = () => {
  const [showProgress, setShowProgress] = useState(true);
  const [completedOrganization, setCompletedOrganization] = useState('');

  return (
    <Box fill gap="small">
      <Box pad="small" gap="small">
        <Paragraph margin="none">
          Complete each required field to continue. Once a group is entered, all
          of its child steps appear and stay visible. You can hide and restore
          the progress rail at any time.
        </Paragraph>
        <Button
          alignSelf="start"
          label={showProgress ? 'Hide progress' : 'Show progress'}
          onClick={() => setShowProgress((visible) => !visible)}
        />
      </Box>
      <Wizard
        aria-label="Progressive setup wizard"
        title="Set up your organization"
        showProgress={showProgress ? 'vertical' : false}
        clickableSteps
        steps={[
          {
            id: 'intro',
            title: 'Organization',
            description: 'Start with your organization details.',
          },
          {
            id: 'account',
            title: 'Account',
            children: [
              {
                id: 'email',
                title: 'Email',
                description: 'Add a contact email.',
              },
              {
                id: 'profile',
                title: 'Profile',
                description: 'Tell us who manages this account.',
              },
            ],
          },
          {
            id: 'billing',
            title: 'Billing',
            children: [
              {
                id: 'payment',
                title: 'Billing reference',
                description: 'Add your internal billing reference.',
              },
              {
                id: 'address',
                title: 'Billing address',
                description: 'Add the billing location.',
              },
            ],
          },
          {
            id: 'review',
            title: 'Review',
            description: 'Review your organization setup.',
          },
        ]}
        renderStep={(step, wizard) => (
          <Box gap="small">
            {step.id === 'intro' && (
              <FormField
                label="Organization name"
                name="organization"
                htmlFor="wizard-organization"
                required
              >
                <TextInput
                  id="wizard-organization"
                  name="organization"
                  placeholder="Example organization"
                />
              </FormField>
            )}
            {step.id === 'email' && (
              <FormField
                label="Contact email"
                name="email"
                htmlFor="wizard-email"
                required
                validate={(value) =>
                  value?.includes('@')
                    ? undefined
                    : 'Enter a valid email address.'
                }
              >
                <TextInput
                  id="wizard-email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                />
              </FormField>
            )}
            {step.id === 'profile' && (
              <FormField
                label="Account manager"
                name="manager"
                htmlFor="wizard-manager"
                required
              >
                <TextInput
                  id="wizard-manager"
                  name="manager"
                  placeholder="Full name"
                />
              </FormField>
            )}
            {step.id === 'payment' && (
              <FormField
                label="Purchase order or cost center"
                name="billingReference"
                htmlFor="wizard-billing-reference"
                required
              >
                <TextInput
                  id="wizard-billing-reference"
                  name="billingReference"
                  placeholder="For example, PO-12345"
                />
              </FormField>
            )}
            {step.id === 'address' && (
              <Box gap="small">
                <FormField
                  label="Street address"
                  name="street"
                  htmlFor="wizard-street"
                  required
                >
                  <TextInput id="wizard-street" name="street" />
                </FormField>
                <FormField
                  label="City"
                  name="city"
                  htmlFor="wizard-city"
                  required
                >
                  <TextInput id="wizard-city" name="city" />
                </FormField>
              </Box>
            )}
            {step.id === 'review' && (
              <Box gap="small">
                <Paragraph>
                  Organization: {wizard.formValue.organization || '—'}
                </Paragraph>
                <Paragraph>Email: {wizard.formValue.email || '—'}</Paragraph>
                <Paragraph>
                  Account manager: {wizard.formValue.manager || '—'}
                </Paragraph>
                <Paragraph>
                  Billing reference: {wizard.formValue.billingReference || '—'}
                </Paragraph>
              </Box>
            )}
          </Box>
        )}
        onComplete={({ value }) =>
          setCompletedOrganization(value.organization || 'your organization')
        }
      />
      {completedOrganization && (
        <Notification
          status="normal"
          title="Setup complete"
          message={`${completedOrganization} is ready.`}
        />
      )}
    </Box>
  );
};

export const ProgressiveSubSteps: Story = {
  render: () => <ProgressiveSubStepsExample />,
};
