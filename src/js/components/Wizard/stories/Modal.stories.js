import React, { useState } from 'react';

import {
  Box,
  Button,
  Grommet,
  Layer,
  Notification,
  Paragraph,
  RadioButtonGroup,
  ResponsiveContext,
  Text,
} from 'grommet';
import { Wizard } from '../Wizard';
import { grommet } from '../../../themes';

// Wizard inside a modal Layer. The trigger button opens the modal; the
// wizard fills the layer and closes itself on complete or cancel. A
// `kind` selector alongside the trigger lets the user preview how the
// wizard's content column width changes.
const steps = [
  {
    id: 'details',
    title: 'Details',
    description: 'Enter details for the new resource.',
    render: () => (
      <Paragraph>Describe the resource you are creating.</Paragraph>
    ),
  },
  {
    id: 'configure',
    title: 'Configure',
    description: 'Configure options for this resource.',
    render: () => <Paragraph>Pick configuration options.</Paragraph>,
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Review and finish.',
    render: () => <Paragraph>Confirm and create the resource.</Paragraph>,
  },
];

const Modal = () => {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState('narrow');
  const [result, setResult] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const close = () => {
    setOpen(false);
    setResetKey((key) => key + 1);
  };
  return (
    <Grommet theme={grommet} full>
      <Box fill pad="medium" gap="medium">
        <ResponsiveContext.Consumer>
          {(size) =>
            size !== 'small' && (
              <Box direction="row" align="center" gap="small">
                <Text weight="bold">Wizard kind:</Text>
                <RadioButtonGroup
                  name="modal-wizard-kind"
                  direction="row"
                  gap="medium"
                  options={['full', 'narrow', 'wide']}
                  value={kind}
                  onChange={(event) => setKind(event.target.value)}
                />
              </Box>
            )
          }
        </ResponsiveContext.Consumer>
        <Box align="start">
          <Button primary label="Open wizard" onClick={() => setOpen(true)} />
        </Box>
        {open && (
          <Layer
            modal
            full={kind === 'full'}
            position="center"
            onEsc={close}
            onClickOutside={close}
          >
            <Box
              fill={kind === 'full'}
              width={kind === 'full' ? undefined : 'xlarge'}
              height={kind === 'full' ? undefined : 'large'}
            >
              <Wizard
                key={resetKey}
                aria-label="Modal wizard"
                kind={kind}
                header={{ title: 'Create resource' }}
                steps={steps}
                onComplete={(value) => {
                  setResult({ status: 'complete', value });
                  close();
                }}
                onCancel={close}
              />
            </Box>
          </Layer>
        )}
        {result && (
          <Notification
            toast={{ position: 'top' }}
            status="normal"
            title="Wizard complete"
            message={
              result.value && Object.keys(result.value).length > 0
                ? `Completed: ${JSON.stringify(result.value)}`
                : undefined
            }
            onClose={() => setResult(null)}
          />
        )}
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Layout/Wizard/Modal',
};

export { Modal };
