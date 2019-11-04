import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Grommet, RadioButton } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const SimpleRadioButton = ({ selected: selectedProp, ...rest }) => {
  const [selected, setSelected] = React.useState(selectedProp);

  const onChange = event => setSelected(event.target.value);

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large" gap="small">
        <RadioButton
          label="Choice 1"
          name="radio"
          value="c1"
          checked={selected === 'c1'}
          onChange={onChange}
          {...rest}
        />
        <RadioButton
          label="Choice 2"
          name="radio"
          value="c2"
          checked={selected === 'c2'}
          onChange={onChange}
          {...rest}
        />
      </Box>
    </Grommet>
  );
};

const customTheme = deepMerge(grommet, {
  radioButton: {
    gap: 'xsmall',
    size: '18px',
    hover: {
      border: {
        color: 'dark-3',
      },
    },
    check: {
      color: {
        light: 'neutral-1',
      },
    },
    icon: {
      size: '10px',
    },
  },
});

const CustomRadioButton = () => {
  const [selected, setSelected] = React.useState();

  const onChange = event => setSelected(event.target.value);

  return (
    <Grommet theme={customTheme}>
      <Box align="center" pad="large" gap="small">
        <RadioButton
          label="Choice 1"
          name="radio"
          value="c1"
          checked={selected === 'c1'}
          onChange={onChange}
        />
        <RadioButton
          label="Choice 2"
          name="radio"
          value="c2"
          checked={selected === 'c2'}
          onChange={onChange}
        />
      </Box>
    </Grommet>
  );
};

const CheckBoxInsideButton = () => {
  const [selected, setSelected] = React.useState();

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Button
          hoverIndicator="background"
          onClick={() => {
            if (selected) {
              setSelected(undefined);
            } else {
              setSelected('c1');
            }
          }}
        >
          <RadioButton
            label="Choice 1"
            name="radio"
            value="c1"
            checked={selected === 'c1'}
          />
        </Button>
      </Box>
    </Grommet>
  );
};

storiesOf('RadioButton', module)
  .add('Simple', () => <SimpleRadioButton />)
  .add('Disabled', () => <SimpleRadioButton disabled selected="c2" />)
  .add('Custom Theme', () => <CustomRadioButton />)
  .add('Inside a Button', () => <CheckBoxInsideButton />);
