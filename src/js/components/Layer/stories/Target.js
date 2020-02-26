import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grid, Grommet, Layer } from 'grommet';
import { grommet } from 'grommet/themes';

const TargetLayer = () => {
  const [open, setOpen] = React.useState();
  const [gutter, setGutter] = React.useState('small');
  React.useEffect(() => {
    window.dispatchEvent(new Event('resize'));
    return undefined;
  }, [gutter]);
  const ref = React.useRef();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  return (
    <Grommet theme={grommet} full>
      <Grid fill columns={[gutter, 'flex', gutter]}>
        <Box background="brand" />
        <Box ref={ref} fill align="center" justify="center">
          <Button label="Open" onClick={onOpen} />
        </Box>
        <Box background="brand" />
      </Grid>
      {open && (
        <Layer
          position="start"
          target={ref.current}
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box pad="medium" gap="small" width="medium">
            <Button
              label="Toggle"
              onClick={() => setGutter(gutter === 'small' ? 'medium' : 'small')}
            />
            <Button label="Close" onClick={onClose} />
          </Box>
        </Layer>
      )}
    </Grommet>
  );
};

storiesOf('Layer', module).add('Target', () => <TargetLayer />);
