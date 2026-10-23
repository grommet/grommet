// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Button, Paragraph, Wizard } from 'grommet';

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

  return (
    <Box fill gap="small">
      <Box pad="small" gap="small">
        <Paragraph margin="none">
          Reveal Account, hide progress, jump to Review, then show progress.
          Check that Account still shows both children after the rail is
          restored. Reveal history lasts for the lifetime of this Wizard.
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
        form={false}
        steps={[
          { id: 'intro', title: 'Introduction', skippable: true },
          {
            id: 'account',
            title: 'Account',
            children: [
              { id: 'email', title: 'Email' },
              { id: 'profile', title: 'Profile' },
            ],
          },
          {
            id: 'billing',
            title: 'Billing',
            children: [
              { id: 'payment', title: 'Payment method' },
              { id: 'address', title: 'Billing address' },
            ],
          },
          { id: 'review', title: 'Review' },
        ]}
        renderStep={(step, wizard) => (
          <Box gap="small">
            <Paragraph>
              {`Current step: ${step.title}. `}
              Revealed groups stay visible for the Wizard lifetime, even if the
              progress rail is temporarily hidden.
            </Paragraph>
            <Box direction="row" gap="small" wrap>
              <Button
                label="Reveal Account"
                onClick={() => wizard.goTo('email')}
              />
              <Button
                label="Reveal Billing"
                onClick={() => wizard.goTo('payment')}
              />
              <Button
                label="Jump to Review"
                onClick={() => wizard.goTo('review')}
              />
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

export const ProgressiveSubSteps: Story = {
  render: () => <ProgressiveSubStepsExample />,
};
