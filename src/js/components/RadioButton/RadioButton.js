import React, { Component } from 'react';
import { compose } from 'recompose';

import { normalizeColor, removeUndefined } from '../../utils';

import { Box } from '../Box';

import { withFocus, withForwardRef, withTheme } from '../hocs';

import {
  StyledRadioButton,
  StyledRadioButtonContainer,
  StyledRadioButtonIcon,
  StyledRadioButtonInput,
  StyledRadioButtonBox,
} from './StyledRadioButton';

class RadioButton extends Component {
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
      theme,
      ...rest
    } = this.props;

    const normalizedLabel =
      typeof label === 'string' ? <span>{label}</span> : label;

    const Icon = theme.radioButton.icons.circle;
    let borderColor = normalizeColor(theme.radioButton.border.color, theme);
    if (checked) {
      borderColor = normalizeColor(theme.radioButton.color || 'control', theme);
    }

    return (
      <StyledRadioButtonContainer
        as={Box}
        tag="label"
        direction="row"
        align="center"
        {...removeUndefined({ htmlFor: id, disabled })}
        theme={theme}
        onClick={event => {
          // prevents clicking on the label trigging the event twice
          // https://stackoverflow.com/questions/24501497/why-the-onclick-element-will-trigger-twice-for-label-element
          if (event.target.type !== 'radio') {
            event.stopPropagation();
          }
        }}
      >
        <StyledRadioButton
          as={Box}
          margin={{ right: theme.radioButton.gap || 'small' }}
          theme={theme}
        >
          <StyledRadioButtonInput
            {...rest}
            ref={forwardRef}
            type="radio"
            {...removeUndefined({
              id,
              name,
              checked,
              disabled,
              onChange,
            })}
            theme={theme}
          />
          <StyledRadioButtonBox
            theme={theme}
            focus={focus}
            as={Box}
            align="center"
            justify="center"
            width={theme.radioButton.size}
            height={theme.radioButton.size}
            border={{
              size: theme.radioButton.border.width,
              color: borderColor,
            }}
            round={theme.radioButton.check.radius}
          >
            {checked &&
              (Icon ? (
                <Icon as={StyledRadioButtonIcon} theme={theme} />
              ) : (
                <StyledRadioButtonIcon
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  theme={theme}
                >
                  <circle cx={12} cy={12} r={6} />
                </StyledRadioButtonIcon>
              ))}
          </StyledRadioButtonBox>
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
  withFocus,
  withTheme,
  withForwardRef
)(RadioButtonDoc || RadioButton);

export { RadioButtonWrapper as RadioButton };
