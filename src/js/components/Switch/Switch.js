import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { deepMerge } from '../../utils';
import { defaultProps } from '../../default-props';
import { MnetUIBase } from '../MnetUIBase';
import { RadioButtonGroup } from '../RadioButtonGroup';
import getSwitchTheme from './switchTheme';


const Switch = ({ value, options, onValueChange, disabled, ...rest }) => {
  const theme = deepMerge(
    useContext(ThemeContext) || defaultProps.theme,
    getSwitchTheme(),
  );
  return(
    <MnetUIBase theme={theme}>
      <RadioButtonGroup
        name="radio"
        options={options}
        value={value}
        onChange={onValueChange}
        disabled={disabled}
        {...theme.switch.container}
        {...(disabled && theme.switch.disabled)}
        {...rest}
      />
    </MnetUIBase>
  );
}

Switch.displayName = 'Switch';

let SwitchDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  SwitchDoc = require('./doc').doc(Switch);
}
const SwitchWrapper = SwitchDoc || Switch;

export { SwitchWrapper as Switch };