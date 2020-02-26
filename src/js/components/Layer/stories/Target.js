import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grid, Grommet, Layer, Select } from 'grommet';
import { grommet } from 'grommet/themes';

const positions = ['center', 'start', 'end', 'top', 'bottom'];

const TargetLayer = () => {
  const [open, setOpen] = React.useState();
  const [gutter, setGutter] = React.useState('small');
  const [position, setPosition] = React.useState('start');
  React.useEffect(() => {
    window.dispatchEvent(new Event('resize'));
    return undefined;
  }, [gutter]);
  const ref = React.useRef();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  return (
    <Grommet theme={grommet} full>
      <Grid
        fill
        columns={[gutter, 'flex', gutter]}
        rows={[gutter, 'flex', gutter]}
        areas={[{ name: 'main', start: [1, 1], end: [1, 1] }]}
      >
        <Box
          ref={ref}
          gridArea="main"
          fill
          align="center"
          justify="center"
          gap="medium"
          background="brand"
        >
          <Select
            options={positions}
            value={position}
            onChange={({ option }) => setPosition(option)}
          />
          <Button label="Open" onClick={onOpen} />
        </Box>
      </Grid>
      {open && (
        <Layer
          position={position}
          target={ref.current}
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box pad="medium" gap="small" width="medium">
            <Button
              label="Toggle gutter size"
              onClick={() => setGutter(gutter === 'small' ? 'xsmall' : 'small')}
            />
            <Button label="Close" onClick={onClose} />
          </Box>
        </Layer>
      )}
    </Grommet>
  );
};

storiesOf('Layer', module).add('Target', () => <TargetLayer />);
