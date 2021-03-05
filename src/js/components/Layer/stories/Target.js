import React from 'react';
import { Box, Button, CheckBox, Grid, Grommet, Layer, Select } from 'grommet';
import { grommet } from 'grommet/themes';

const positions = ['left', 'right', 'top', 'bottom', 'center'];

export const TargetLayer = () => {
  const [open, setOpen] = React.useState();
  const [gutter, setGutter] = React.useState('small');
  const [modal, setModal] = React.useState(true);
  const [position, setPosition] = React.useState(positions[0]);
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
          height={{ min: 'small' }}
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
          <CheckBox
            toggle
            label="modal"
            checked={modal}
            onChange={() => setModal(!modal)}
          />
          <Button label="Open" onClick={onOpen} />
        </Box>
      </Grid>
      {/* Adding Box as placeholder to demo how Layer scrolls
        with target */}
      <Box height="large" />
      {open && (
        <Layer
          modal={modal}
          position={position}
          target={ref.current}
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box pad="medium" gap="small" width="medium">
            <Button
              label="Toggle gutter size"
              onClick={() => setGutter(gutter === 'small' ? 'xsmall' : 'small')}
            />
            <Button label="Close" onClick={onClose} />
            <Select
              options={positions}
              value={position}
              onChange={({ option }) => setPosition(option)}
            />
          </Box>
        </Layer>
      )}
    </Grommet>
  );
};

TargetLayer.storyName = 'Target';

export default {
  title: 'Layout/Layer/Target',
};
