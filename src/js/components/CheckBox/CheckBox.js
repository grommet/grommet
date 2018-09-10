import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFocus, withForwardRef, withTheme } from '../hocs';
import { removeUndefined } from '../../utils/object';

import {
  StyledCheckBox,
  StyledCheckBoxContainer,
  StyledCheckBoxInput,
  StyledCheckBoxBox,
  StyledCheckBoxToggle,
  StyledCheckBoxKnob,
} from './StyledCheckBox';

class CheckBox extends Component {
  render() {
    const {
      checked,
      disabled,
      focus,
      forwardRef,
      id,
      label,
      name,
      onChange,
      reverse,
      theme,
      toggle,
      ...rest
    } = this.props;

    const normalizedLabel = (typeof label === 'string' ? <div>{label}</div> : label);

    let hidden;
    if (disabled && checked) {
      hidden = <input name={name} type='hidden' value='true' />;
    }

    const Icon = theme.checkBox.icons.checked;

    const visual = (toggle ? (
      <StyledCheckBoxToggle focus={focus} theme={theme}>
        <StyledCheckBoxKnob theme={theme} />
      </StyledCheckBoxToggle>
    ) : (
      <StyledCheckBoxBox focus={focus} theme={theme}>
        {
          Icon ? <Icon /> : (
            <svg viewBox='0 0 24 24' preserveAspectRatio='xMidYMid meet'>
              <path fill='none' d='M6,11.3 L10.3,16 L18,6.2' />
            </svg>
          )
        }
      </StyledCheckBoxBox>
    ));

    return (
      <StyledCheckBoxContainer
        {...removeUndefined({ htmlFor: id, disabled, reverse })}
        theme={theme}
      >
        <StyledCheckBox theme={theme}>
          <StyledCheckBoxInput
            {...rest}
            ref={forwardRef}
            type='checkbox'
            {...removeUndefined({ id, name, checked, disabled, onChange })}
            theme={theme}
          />
          {visual}
        </StyledCheckBox>
        {normalizedLabel}
        {hidden}
      </StyledCheckBoxContainer>
    );
  }
}

let CheckBoxDoc;
if (process.env.NODE_ENV !== 'production') {
  CheckBoxDoc = require('./doc').doc(CheckBox); // eslint-disable-line global-require
}
const CheckBoxWrapper = compose(
  withFocus,
  withTheme,
  withForwardRef,
)(CheckBoxDoc || CheckBox);

export { CheckBoxWrapper as CheckBox };
