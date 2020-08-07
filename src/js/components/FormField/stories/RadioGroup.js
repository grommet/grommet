import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import {
  mnet,
  Box, 
  FormField,
  RadioButtonGroup,
  MnetUIBase,
} from 'mnet-ui-base';

const FormFieldRadioGroup = props => {
  const [value, setValue] = useState('c1');

  return (
    <MnetUIBase theme={mnet}>
      <Box align="center" pad="large">
        <FormField label="Label" htmlFor="select" showBorder={false} {...props}>
          <RadioButtonGroup
            id="radioGrp"
            options={[
              { label: 'Choice 1', value: 'c1' },
              { label: 'Choice 2', value: 'c2' },
              { label: 'Choice 3', value: 'c3' },
            ]}
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </FormField>
      </Box>
    </MnetUIBase>
  );
};

storiesOf('FormField', module)
  .add('RadioButtonGroup', () => <FormFieldRadioGroup />);
