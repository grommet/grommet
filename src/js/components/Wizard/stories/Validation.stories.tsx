import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Grommet, Wizard, WizardContent, WizardFooter } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Wizard/Validation',
  component: Wizard,
} as Meta<typeof Wizard>;

export const WithValidation: StoryFn<typeof Wizard> = () => {
  const [email, setEmail] = useState('');

  const steps = [
    {
      id: 'email',
      title: 'Email Address',
      validation: async () => {
        if (!email || !email.includes('@')) {
          throw new Error('Please enter a valid email address.');
        }
      },
    },
    { id: 'confirm', title: 'Confirm' },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" width="large" margin="auto">
        <Wizard steps={steps} onComplete={() => alert('Done!')}>
          <WizardContent>
            <Box gap="small">
              <label htmlFor="email-input">Email</label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '8px', fontSize: '1rem' }}
              />
            </Box>
          </WizardContent>
          <WizardFooter />
        </Wizard>
      </Box>
    </Grommet>
  );
};

WithValidation.storyName = 'With Validation';
