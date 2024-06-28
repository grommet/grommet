import styled from 'styled-components';

import { Box } from '../Box';
import { Button } from '../Button';
import { DropButton } from '../DropButton';
import { TextInput } from '../TextInput';
import {
  getHoverIndicatorStyle,
  selectedStyle,
  controlBorderStyle,
  sizeStyle,
  styledComponentsConfig,
} from '../../utils';
import { withTheme } from '../../default-props';

export const StyledContainer = styled(Box).attrs(withTheme)`
  /* IE11 hack to get drop contents to not overflow */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    width: 100%;
  }

  ${(props) =>
    props.dropHeight
      ? sizeStyle('max-height', props.dropHeight, props.theme)
      : 'max-height: inherit;'};

  ${(props) =>
    props.theme.select.container && props.theme.select.container.extend};
`;

// position relative is so scroll can be managed correctly
export const OptionsContainer = styled.div.withConfig(styledComponentsConfig)`
  position: relative;
  scroll-behavior: smooth;
  overflow: auto;
  outline: none;
`;

export const HiddenInput = styled.input.withConfig(styledComponentsConfig)`
  display: none;
`;

export const SelectOption = styled(Button).attrs(withTheme)`
  ${(props) => props.selected && props.textComponent && selectedStyle}
  // applies theme.global.hover.background to the active
  // option for mouse and keyboard interactions
  ${(props) =>
    props.active &&
    getHoverIndicatorStyle(
      !props.children && !props.theme.select.options ? undefined : 'background',
      props.theme,
    )}
  // apply hover styling when option receives tab focus so it's
  // visible to keyboard users
  &:focus {
    ${(props) =>
      props.active &&
      getHoverIndicatorStyle(
        !props.children && !props.theme.select.options
          ? undefined
          : 'background',
        props.theme,
      )}
  }
  display: block;
  width: 100%;
  ${(props) => props[`aria-disabled`] && `cursor: default`};
`;

export const SelectTextInput = styled(TextInput)`
  cursor: ${(props) => (props.defaultCursor ? 'default' : 'pointer')};
`;

export const StyledSelectDropButton = styled(DropButton).attrs(withTheme)`
  ${(props) => !props.plainSelect && controlBorderStyle};
  ${(props) => props.theme.select?.control?.extend};
  ${(props) => props.open && props.theme.select?.control?.open};
`;
