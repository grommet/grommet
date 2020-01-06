import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Button, RadioButton } from 'mnet-ui-base';
import { Ascend } from 'grommet-icons';
import { mnet } from 'mnet-ui-base/themes';

const ChildrenRadioButton = () => {
  const [selected, setSelected] = React.useState();

  return (
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large" gap="large">
        <RadioButton
          name="name"
          value="option 1"
          checked={selected === 'option 1'}
          onChange={event => setSelected(event.target.value)}
        >
          {({ checked }) => (
            <Ascend color={checked ? 'brand' : 'status-unknown'} />
          )}
        </RadioButton>

        <Button label="clear" onClick={() => setSelected(undefined)} />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('RadioButton', module).add('Children', () => <ChildrenRadioButton />);
