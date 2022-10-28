import React, { forwardRef, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { defaultProps } from '../../default-props';
import { normalizeColor, removeUndefined } from '../../utils';

import {
  StyledRadioButton,
  StyledRadioButtonContainer,
  StyledRadioButtonIcon,
  StyledRadioButtonInput,
  StyledRadioButtonLabel,
  StyledRadioButtonBox,
} from './StyledRadioButton';
import { RadioButtonPropTypes } from './propTypes';

const RadioButton = forwardRef(
  (
    {
      a11yTitle,
      checked,
      children,
      disabled,
      focus,
      focusIndicator,
      id,
      label,
      name,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [hover, setHover] = useState();
    const normalizedLabel =
      typeof label === 'string' ? (
        <StyledRadioButtonLabel>{label}</StyledRadioButtonLabel>
      ) : (
        label
      );

    const Icon = theme.radioButton.icons.circle;
    let borderColor = normalizeColor(theme.radioButton.border.color, theme);
    if (checked) {
      borderColor = normalizeColor(theme.radioButton.color || 'control', theme);
    }

    return (
      <StyledRadioButtonContainer
        {...removeUndefined({ htmlFor: id, disabled })}
        onClick={(event) => {
          // prevents clicking on the label trigging the event twice
          // https://stackoverflow.com/questions/24501497/why-the-onclick-element-will-trigger-twice-for-label-element
          if (event.target.type !== 'radio') {
            event.stopPropagation();
          }
        }}
        focus={focus}
        focusIndicator={focusIndicator}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <StyledRadioButton
          as={Box}
          flex={false}
          margin={
            label ? { right: theme.radioButton.gap || 'small' } : undefined
          }
        >
          <StyledRadioButtonInput
            aria-label={a11yTitle}
            {...rest}
            ref={ref}
            type="radio"
            {...removeUndefined({
              id,
              name,
              checked,
              disabled,
              onChange,
            })}
          />
          {children ? (
            children({ checked, focus: focus && focusIndicator, hover })
          ) : (
            <StyledRadioButtonBox
              focus={focus && focusIndicator}
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
                  <Icon theme={theme} as={StyledRadioButtonIcon} />
                ) : (
                  <StyledRadioButtonIcon
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <circle cx={12} cy={12} r={6} />
                  </StyledRadioButtonIcon>
                ))}
            </StyledRadioButtonBox>
          )}
        </StyledRadioButton>
        {normalizedLabel}
      </StyledRadioButtonContainer>
    );
  },
);

RadioButton.displayName = 'RadioButton';
RadioButton.propTypes = RadioButtonPropTypes;

export { RadioButton };
