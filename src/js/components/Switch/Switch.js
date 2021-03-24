import React from 'react';
import { ThemeContext } from 'styled-components';

import { deepMerge } from '../../utils';
import { RadioButtonGroup } from '../RadioButtonGroup';
import getSwitchTheme from './switchTheme';

const Switch = ({ value, options, onValueChange, disabled, ...rest }) => (
  <ThemeContext.Consumer>
    {theme => (
      <ThemeContext.Provider value={deepMerge(theme, getSwitchTheme())}>
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
      </ThemeContext.Provider>
    )}
  </ThemeContext.Consumer>
);

Switch.displayName = 'Switch';

let SwitchDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  SwitchDoc = require('./doc').doc(Switch);
}
const SwitchWrapper = SwitchDoc || Switch;

export { SwitchWrapper as Switch };