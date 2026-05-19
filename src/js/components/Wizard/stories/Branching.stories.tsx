import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Wizard, WizardContent, WizardFooter } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Wizard/Branching',
  component: Wizard,
} as Meta<typeof Wizard>;

export const Branching: StoryFn<typeof Wizard> = () => {
  const [accountType, setAccountType] = useState<'business' | 'personal'>(
    'personal',
  );

  const steps = [
    {
      id: 'accountType',
      title: 'Account Type',
      nextStep: () =>
        accountType === 'business' ? 'businessDetails' : 'personalDetails',
    },
    { id: 'businessDetails', title: 'Business Details' },
    { id: 'personalDetails', title: 'Personal Details' },
    { id: 'review', title: 'Review & Submit' },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" width="large" margin="auto">
        <Wizard steps={steps} onComplete={() => alert('Done!')}>
          <WizardContent>
            <Box gap="small">
              <label>Account type:</label>
              <label>
                <input
                  type="radio"
                  value="personal"
                  checked={accountType === 'personal'}
                  onChange={() => setAccountType('personal')}
                />{' '}
                Personal
              </label>
              <label>
                <input
                  type="radio"
                  value="business"
                  checked={accountType === 'business'}
                  onChange={() => setAccountType('business')}
                />{' '}
                Business
              </label>
            </Box>
          </WizardContent>
          <WizardFooter />
        </Wizard>
      </Box>
    </Grommet>
  );
};

Branching.storyName = 'Branching';
