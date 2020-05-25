import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, CheckBoxGroup, MnetUIBase } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const objectOptions = [];
for (let i = 1; i <= 5; i += 1) {
  objectOptions.push({
    label: `option ${i}`,
    val: i,
  });
}

const Example = () => {
  return (
    <MnetUIBase theme={mnet}>
      <Box pad="medium">
        <CheckBoxGroup
          labelKey="label"
          valueKey="val"
          options={objectOptions}
        />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('CheckBoxGroup', module).add('Object options', () => <Example />);
