import styled from 'styled-components';
import { Box } from '../Box';
import { Button } from '../Button';
import { disabledStyle, getRGBA, normalizeColor } from '../../utils';
import { readOnlyStyle } from '../../utils/readOnly';

const getThemeElevation = (props) => {
  const mode = props.theme.dark ? 'dark' : 'light';
  return props.theme.global?.elevation?.[mode]?.small;
};

const getBorderColor = (props) => {
  if (props.hasError) {
    return (
      props.theme.timeInput?.container?.error?.borderColor ||
      props.theme.global?.colors?.['status-critical'] ||
      normalizeColor('status-critical', props.theme)
    );
  }
  if (props.disabled) {
    return (
      props.theme.timeInput?.container?.disabled?.borderColor ||
      getRGBA(normalizeColor('black', props.theme), 0.12)
    );
  }
  if (props.readOnlyProp) {
    return (
      props.theme.timeInput?.container?.readOnly?.borderColor ||
      normalizeColor('border', props.theme)
    );
  }
  return (
    props.theme.timeInput?.container?.borderColor ||
    normalizeColor('border', props.theme)
  );
};

export const StyledTimeInputContainer = styled(Box).withConfig({
  shouldForwardProp: (prop) =>
    !['disabled', 'readOnlyProp', 'hasError', 'plain'].includes(prop),
})`
  ${(props) => props.disabled && disabledStyle()}
  ${(props) => props.readOnlyProp && readOnlyStyle(props.theme)}
  border-radius: ${(props) =>
    props.theme.timeInput?.container?.borderRadius ||
    'var(--formfield-default-medium-input-container-borderRadius, 8px)'};
  min-height: ${(props) =>
    props.theme.timeInput?.container?.minHeight ||
    'var(--formfield-default-medium-input-container-minHeight, 36px)'};
  ${(props) =>
    !props.plain &&
    `
  border-width: ${
    props.theme.timeInput?.container?.borderWidth ||
    'var(--formfield-default-medium-input-container-borderWidth, 1px)'
  };
  border-style: solid;
  border-color: ${getBorderColor(props)};
  `}
  background: ${(props) => {
    if (props.disabled) {
      return (
        props.theme.timeInput?.container?.disabled?.background || 'transparent'
      );
    }
    return props.theme.timeInput?.container?.background || 'transparent';
  }};
  gap: ${(props) =>
    props.theme.timeInput?.container?.textToElementX ||
    'var(--formfield-default-medium-input-container-textToElementX, 12px)'};

  &:hover {
    ${(props) =>
      !props.plain &&
      `border-color: ${
        props.disabled || props.readOnlyProp || props.hasError
          ? 'inherit'
          : props.theme.timeInput?.container?.hover?.borderColor ||
            normalizeColor('border', props.theme)
      };`}
    background: ${(props) => {
      if (props.disabled || props.readOnlyProp) return 'inherit';
      return (
        props.theme.timeInput?.container?.hover?.background || 'transparent'
      );
    }};
  }

  &:focus-within {
    ${(props) =>
      !props.plain &&
      `border-color: ${
        props.theme.timeInput?.container?.focus?.borderColor ||
        normalizeColor('focus', props.theme)
      };`}
    ${(props) =>
      !props.plain &&
      `box-shadow: ${
        props.theme.timeInput?.container?.focus?.boxShadow ||
        (() => {
          const bgColor = normalizeColor('background-front', props.theme);
          const innerRing = `0 0 0 2px ${bgColor}`;
          const focusColor = normalizeColor('focus', props.theme);
          const outerRing = `0 0 0 4px ${focusColor}`;
          return (
            `var(--timeinput-focus-ring-inner, ${innerRing}),` +
            ` var(--timeinput-focus-ring-outer, ${outerRing})`
          );
        })()
      };`}
  }

  input {
    color: ${(props) => {
      if (props.disabled) {
        return (
          props.theme.timeInput?.value?.disabled?.color ||
          normalizeColor('text-xweak', props.theme)
        );
      }
      return (
        props.theme.timeInput?.value?.color ||
        normalizeColor('text', props.theme)
      );
    }};
    font-family: ${(props) =>
      props.theme.global?.font?.family || 'HPE Graphik'};
    font-size: ${(props) =>
      props.theme.timeInput?.value?.size ||
      'var(--formfield-default-medium-value-fontSize, 16px)'};
    line-height: ${(props) =>
      props.theme.timeInput?.value?.lineHeight ||
      'var(--formfield-default-medium-value-lineHeight, 24px)'};
    padding: ${(props) =>
      props.theme.timeInput?.input?.pad ||
      `var(--formfield-default-medium-input-container-paddingY, 5px)
      var(--formfield-default-medium-input-container-paddingX, 12px)`};
  }

  input::placeholder {
    color: ${(props) =>
      props.theme.timeInput?.placeholder?.color ||
      normalizeColor('placeholder', props.theme)};
    opacity: 1;
    font-size: ${(props) =>
      props.theme.timeInput?.placeholder?.size ||
      'var(--formfield-default-medium-placeholder-fontSize, 16px)'};
    line-height: ${(props) =>
      props.theme.timeInput?.placeholder?.lineHeight ||
      'var(--formfield-default-medium-placeholder-lineHeight, 24px)'};
  }

  input::selection {
    background: ${(props) =>
      props.theme.timeInput?.selection?.background ||
      getRGBA(normalizeColor('black', props.theme), 0.04)};
    color: inherit;
  }

  input::-moz-selection {
    background: ${(props) =>
      props.theme.timeInput?.selection?.background ||
      getRGBA(normalizeColor('black', props.theme), 0.04)};
    color: inherit;
  }
`;

export const StyledTimeInputInputWrapper = styled(Box)`
  position: relative;
`;

export const StyledPickerList = styled(Box)``;

export const StyledTimeInputToggleButton = styled(Button)`
  color: ${(props) =>
    props.theme.timeInput?.toggle?.color ||
    normalizeColor('icon', props.theme)};
  background: transparent;
  border: ${(props) =>
      props.theme.timeInput?.toggle?.borderWidth ||
      'var(--button-toolbar-medium-iconOnly-borderWidth, 1px)'}
    solid transparent;
  border-radius: ${(props) =>
    props.theme.timeInput?.toggle?.borderRadius ||
    'var(--button-toolbar-medium-iconOnly-borderRadius, 6px)'};
  min-width: ${(props) =>
    props.theme.timeInput?.toggle?.minWidth ||
    'var(--button-toolbar-medium-iconOnly-minWidth, 36px)'};
  padding: ${(props) =>
    props.theme.timeInput?.toggle?.pad ||
    `var(--timeinput-toggle-paddingY, 8px)
    var(--button-toolbar-medium-iconOnly-paddingX, 9px)`};

  &:disabled {
    color: ${(props) =>
      props.theme.timeInput?.toggle?.disabled?.color ||
      normalizeColor('text-xweak', props.theme)};
  }
`;

export const StyledPickerOptionBox = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== 'optionWidth',
})`
  width: ${(props) => props.optionWidth};
  opacity: 1;
`;

export const StyledPickerDropContent = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== 'dropHeight',
})`
  width: max-content;
  max-width: max-content;
  height: ${(props) => props.dropHeight};
  overflow: hidden;
  border-radius: ${(props) =>
    props.theme.timeInput?.drop?.borderRadius ||
    'var(--drop-default-borderRadius, 6px)'};
  box-shadow: ${(props) =>
    props.theme.timeInput?.drop?.boxShadow || getThemeElevation(props)};
  background: ${(props) =>
    props.theme.timeInput?.drop?.background ||
    normalizeColor('background-front', props.theme)};
`;
