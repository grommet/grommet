import React, { Component } from 'react';
import { compose } from 'recompose';

import { withForwardRef, withTheme } from '../hocs';
import { removeUndefined } from '../../utils/object';

import {
  StyledRadioButton,
  StyledRadioButtonContainer,
  StyledRadioButtonInput,
  StyledRadioButtonButton,
} from './StyledRadioButton';

class RadioButton extends Component {
  render() {
    const {
      checked, disabled, forwardRef, id, label, name, onChange, theme, ...rest
    } = this.props;

    const normalizedLabel = (typeof label === 'string' ? <div>{label}</div> : label);

    return (
      <StyledRadioButtonContainer
        {...removeUndefined({ htmlFor: id, disabled })}
        theme={theme}
      >
        <StyledRadioButton theme={theme}>
          <StyledRadioButtonInput
            {...rest}
            ref={forwardRef}
            type='radio'
            {...removeUndefined({ id, name, checked, disabled, onChange })}
            theme={theme}
          />
          <StyledRadioButtonButton theme={theme}>
            <svg viewBox='0 0 24 24' preserveAspectRatio='xMidYMid meet'>
              <circle cx={12} cy={12} r={6} />
            </svg>
          </StyledRadioButtonButton>
        </StyledRadioButton>
        {normalizedLabel}
      </StyledRadioButtonContainer>
    );
  }
}

let RadioButtonDoc;
if (process.env.NODE_ENV !== 'production') {
  RadioButtonDoc = require('./doc').doc(RadioButton); // eslint-disable-line global-require
}
const RadioButtonWrapper = compose(
  withTheme,
  withForwardRef,
)(RadioButtonDoc || RadioButton);

export { RadioButtonWrapper as RadioButton };
