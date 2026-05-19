import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  Box,
  Button,
  Grommet,
  Layer,
  Paragraph,
  Wizard,
  WizardStepHeader,
  useWizard,
} from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  title: 'Controls/Wizard/Cancel Confirmation',
  component: Wizard,
} as Meta<typeof Wizard>;

const ConfirmingFooter = () => {
  const { navigation } = useWizard();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        direction="row"
        justify="between"
        gap="small"
        pad={{ top: 'medium' }}
      >
        <Button label="Previous" onClick={navigation.previous} secondary />
        <Box direction="row" gap="small">
          <Button label="Cancel" onClick={() => setOpen(true)} plain />
          <Button label="Next" onClick={navigation.next} primary />
        </Box>
      </Box>
      {open && (
        <Layer
          onEsc={() => setOpen(false)}
          onClickOutside={() => setOpen(false)}
        >
          <Box pad="medium" gap="small" width="medium">
            <Paragraph margin="none">Cancel this workflow?</Paragraph>
            <Box direction="row" justify="end" gap="small">
              <Button label="Keep editing" onClick={() => setOpen(false)} />
              <Button
                label="Confirm cancel"
                onClick={() => {
                  setOpen(false);
                  navigation.cancel();
                }}
                primary
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

export const CancelConfirmation: StoryFn<typeof Wizard> = () => {
  const steps = [
    { id: 'step1', title: 'Step 1' },
    { id: 'step2', title: 'Step 2' },
  ];

  return (
    <Grommet theme={grommet} full>
      <Box pad="large" width="large" margin="auto">
        <Wizard steps={steps}>
          <WizardStepHeader />
          <Paragraph>
            This story demonstrates consumer-managed cancel flow.
          </Paragraph>
          <ConfirmingFooter />
        </Wizard>
      </Box>
    </Grommet>
  );
};

CancelConfirmation.storyName = 'Cancel Confirmation';
