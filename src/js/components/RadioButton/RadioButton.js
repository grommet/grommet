import React, { forwardRef, useState } from 'react';

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
import { useThemeValue } from '../../utils/useThemeValue';

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
    const { theme, passThemeFlag } = useThemeValue();
    const [hover, setHover] = useState();
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = React.useRef(null);

    const normalizedLabel =
      typeof label === 'string' ? (
        <StyledRadioButtonLabel {...passThemeFlag}>
          {label}
        </StyledRadioButtonLabel>
      ) : (
        label
      );

    const Icon = theme.radioButton.icons.circle;
    let borderColor = normalizeColor(theme.radioButton.border.color, theme);
    let backgroundColor = normalizeColor(
      theme.radioButton.background?.color,
      theme,
    );

    if (checked) {
      borderColor = normalizeColor(theme.radioButton.color || 'control', theme);

      if (theme.radioButton.check?.background?.color) {
        backgroundColor = normalizeColor(
          theme.radioButton.check.background.color,
          theme,
        );
      }
    }

    const handleKeyDown = (event) => {
      if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        inputRef.current.click();
      }
    };

    return (
      <StyledRadioButtonContainer
        {...removeUndefined({ htmlFor: id, disabled })}
        onClick={(event) => {
          if (event.target.type !== 'radio') {
            event.stopPropagation();
          }
        }}
        focusIndicator={focusIndicator}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        {...passThemeFlag}
        onFocus={() => {
          setIsFocused(true);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}  
        tabIndex={disabled ? -1 : 0}
        focus={focus || isFocused}
      >
        <StyledRadioButton
          flex={false}
          margin={
            label ? { right: theme.radioButton.gap || 'small' } : undefined
          }
          {...passThemeFlag}
        >
          <StyledRadioButtonInput
            aria-label={a11yTitle}
            {...rest}
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref && 'current' in ref) {
                ref.current = node;
              }
            }}
            type="radio"
            tabIndex={disabled ? -1 : 0}
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
              align="center"
              justify="center"
              width={theme.radioButton.size}
              height={theme.radioButton.size}
              border={{
                size: theme.radioButton.border.width,
                color: borderColor,
              }}
              backgroundColor={backgroundColor}
              round={theme.radioButton.check.radius}
              {...passThemeFlag}
            >
              {checked &&
                (Icon ? (
                  <Icon theme={theme} as={StyledRadioButtonIcon} />
                ) : (
                  <StyledRadioButtonIcon
                    viewBox="0 0 24 24"
                    preserveAspectRatio="xMidYMid meet"
                    {...passThemeFlag}
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
