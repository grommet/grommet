import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';

import { removeUndefined } from '../../utils/object';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { FormContext } from '../Form/FormContext';

import {
  StyledCheckBox,
  StyledCheckBoxBox,
  StyledCheckBoxIcon,
  StyledCheckBoxContainer,
  StyledCheckBoxInput,
  StyledCheckBoxToggle,
  StyledCheckBoxKnob,
} from './StyledCheckBox';

import { normalizeColor } from '../../utils';

const stopLabelClick = event => {
  // prevents clicking on the label trigging the event twice
  // https://stackoverflow.com/questions/24501497/why-the-onclick-element-will-trigger-twice-for-label-element
  if (event.target.type !== 'checkbox') {
    event.stopPropagation();
  }
};

const CheckBox = forwardRef(
  (
    {
      checked: checkedProp,
      disabled,
      focus: focusProp,
      id,
      label,
      name,
      onBlur,
      onChange,
      onFocus,
      reverse,
      toggle,
      indeterminate,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const formContext = useContext(FormContext);

    const [checked, setChecked] = formContext.useFormContext(
      name,
      checkedProp,
      false,
    );

    const [focus, setFocus] = useState(focusProp);
    useEffect(() => setFocus(focusProp), [focusProp]);

    useEffect(() => {
      if (checkedProp && indeterminate) {
        console.warn(
          'Checkbox cannot be "checked" and "indeterminate" at the same time.',
        );
      }

      if (toggle && indeterminate) {
        console.warn(
          'Checkbox of type toggle does not have "indeterminate" state.',
        );
      }
    }, [checkedProp, toggle, indeterminate]);

    const themeableProps = {
      checked,
      disabled,
      focus,
      reverse,
      toggle,
      indeterminate,
    };

    let hidden;
    if (disabled && checked) {
      hidden = <input name={name} type="hidden" value="true" />;
    }

    const {
      checked: CheckedIcon,
      indeterminate: IndeterminateIcon,
    } = theme.checkBox.icons;

    let borderColor = normalizeColor(theme.checkBox.border.color, theme);
    if (checked) {
      borderColor = normalizeColor(theme.checkBox.color || 'control', theme);
    }

    const visual = toggle ? (
      <StyledCheckBoxToggle {...themeableProps}>
        <StyledCheckBoxKnob {...themeableProps} />
      </StyledCheckBoxToggle>
    ) : (
      <StyledCheckBoxBox
        as={Box}
        align="center"
        justify="center"
        width={theme.checkBox.size}
        height={theme.checkBox.size}
        border={{
          size: theme.checkBox.border.width,
          color: borderColor,
        }}
        round={theme.checkBox.check.radius}
        {...themeableProps}
      >
        {!indeterminate &&
          checked &&
          (CheckedIcon ? (
            <CheckedIcon theme={theme} as={StyledCheckBoxIcon} />
          ) : (
            <StyledCheckBoxIcon
              theme={theme}
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              {...themeableProps}
            >
              <path fill="none" d="M6,11.3 L10.3,16 L18,6.2" />
            </StyledCheckBoxIcon>
          ))}
        {!checked &&
          indeterminate &&
          (IndeterminateIcon ? (
            <IndeterminateIcon theme={theme} as={StyledCheckBoxIcon} />
          ) : (
            <StyledCheckBoxIcon
              theme={theme}
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              {...themeableProps}
            >
              <path fill="none" d="M6,12 L18,12" />
            </StyledCheckBoxIcon>
          ))}
      </StyledCheckBoxBox>
    );

    const side = reverse ? 'left' : 'right';
    const checkBoxNode = (
      <StyledCheckBox
        as={Box}
        align="center"
        justify="center"
        margin={label && { [side]: theme.checkBox.gap || 'small' }}
        {...themeableProps}
      >
        <StyledCheckBoxInput
          {...rest}
          ref={ref}
          type="checkbox"
          {...removeUndefined({
            id,
            name,
            checked,
            disabled,
          })}
          {...themeableProps}
          onFocus={event => {
            setFocus(true);
            if (onFocus) onFocus(event);
          }}
          onBlur={event => {
            setFocus(false);
            if (onBlur) onBlur(event);
          }}
          onChange={event => {
            setChecked(event.target.checked);
            if (onChange) onChange(event);
          }}
        />
        {visual}
        {hidden}
      </StyledCheckBox>
    );

    const normalizedLabel =
      typeof label === 'string' ? <span>{label}</span> : label;

    const first = reverse ? normalizedLabel : checkBoxNode;
    const second = reverse ? checkBoxNode : normalizedLabel;

    return (
      <StyledCheckBoxContainer
        reverse={reverse}
        {...removeUndefined({ htmlFor: id, disabled })}
        checked={checked}
        onClick={stopLabelClick}
        {...themeableProps}
      >
        {first}
        {second}
      </StyledCheckBoxContainer>
    );
  },
);

CheckBox.displayName = 'CheckBox';

let CheckBoxDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CheckBoxDoc = require('./doc').doc(CheckBox);
}
const CheckBoxWrapper = CheckBoxDoc || CheckBox;

export { CheckBoxWrapper as CheckBox };
