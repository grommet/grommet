import React from 'react';
import { Box, Button, Grommet, Layer, Select, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { FormClose } from 'grommet-icons';

const customTheme = deepMerge(grommet, {
  layer: {
    border: {
      radius: 'large',
      intelligentRounding: true,
    },
  },
});

export const RoundLayer = () => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState();
  const [full, setFull] = React.useState();
  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(undefined);

  return (
    <Grommet theme={customTheme} full>
      <Box fill align="center" justify="center" gap="medium">
        <Select
          placeholder="Layer position"
          options={[
            'bottom',
            'bottom-left',
            'bottom-right',
            'center',
            'end',
            'hidden',
            'right',
            'start',
            'top',
            'top-left',
            'top-right',
          ]}
          onChange={({ option }) => setPosition(option)}
        />
        <Select
          placeholder="Full"
          options={[
            { label: 'true', value: true },
            { label: 'false', value: false },
            { label: 'vertical', value: 'vertical' },
            { label: 'horizontal', value: 'horizontal' },
          ]}
          labelKey="label"
          valueKey={{ key: 'value' }}
          onChange={({ option }) => setFull(option.value)}
        />
        <Button label="Open layer" onClick={onOpen} />
      </Box>
      {open && (
        <Layer
          full={full}
          position={position}
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            pad="medium"
            gap="small"
            width={{ min: 'medium' }}
            height={{ min: 'small' }}
            fill
          >
            <Button alignSelf="end" icon={<FormClose />} onClick={onClose} />
            <Text>Hi, I am a Layer!</Text>
          </Box>
        </Layer>
      )}
    </Grommet>
  );
};

RoundLayer.storyName = 'Border Radius';

RoundLayer.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Layout/Layer/Custom Themed/Border Radius',
};
