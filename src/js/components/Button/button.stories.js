import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from 'grommet-icons';

import Button from '../Button/Button';
import Grommet from '../Grommet/Grommet';
import Box from '../Box/Box';
import Text from '../Text/Text';

const SimpleButton = () => (
  <Grommet>
    <Button label='Submit' onClick={() => {}} />
  </Grommet>
);

const IconButton = () => (
  <Grommet>
    <Button icon={<Add />} hoverIndicator={true} onClick={() => {}} />
  </Grommet>
);

const PlainButton = () => (
  <Grommet>
    <Button hoverIndicator={true} onClick={() => {}}>
      <Box pad='small' direction='row' align='center' gap='small'>
        <Add />
        <Text>Add</Text>
      </Box>
    </Button>
  </Grommet>
);

storiesOf('Button', module)
  .add('Simple Button', () => <SimpleButton />)
  .add('Icon Button', () => <IconButton />)
  .add('Plain Button', () => <PlainButton />);
