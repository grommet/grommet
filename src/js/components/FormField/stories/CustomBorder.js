import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, FormField, CheckBox, Grommet } from 'grommet';

const FormFieldCustomBorder = props => {
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);

  return (
    <Grommet theme={grommet}>
      <Box justify="center" pad="large" direction="row" gap="medium">
        <FormField label="Default border" htmlFor="check-box" {...props}>
          <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
            <CheckBox
              id="check-box"
              label="CheckBox"
              checked={checkBox1}
              onChange={() => setCheckBox1(!checkBox1)}
            />
          </Box>
        </FormField>
        <FormField
          label="No border"
          htmlFor="check-box2"
          border={false}
          {...props}
        >
          <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
            <CheckBox
              id="check-box2"
              label="CheckBox"
              checked={checkBox2}
              onChange={() => setCheckBox2(!checkBox2)}
            />
          </Box>
        </FormField>
        <FormField
          label="Custom border"
          htmlFor="check-box3"
          border={[
            {
              color: 'brand',
              side: 'left',
              position: 'outer',
              style: 'dashed',
              size: 'medium',
            },
            { color: 'neutral-3', side: 'bottom', size: 'medium' },
          ]}
          {...props}
        >
          <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
            <CheckBox
              id="check-box3"
              label="CheckBox"
              checked={checkBox3}
              onChange={() => setCheckBox3(!checkBox3)}
            />
          </Box>
        </FormField>
      </Box>
    </Grommet>
  );
};

storiesOf('FormField', module).add('Custom Border', () => (
  <FormFieldCustomBorder />
));
