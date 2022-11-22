import styled from 'styled-components';

import { Button } from '../Button';
import { DropButton } from '../DropButton';
import { TextInput } from '../TextInput';
import {
  getHoverIndicatorStyle,
  selectedStyle,
  controlBorderStyle,
  sizeStyle,
} from '../../utils';

export const StyledContainer = styled.div`
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
export const OptionsContainer = styled.div`
  position: relative;
  scroll-behavior: smooth;
  overflow: auto;
  outline: none;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const SelectOption = styled(Button)`
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

export const StyledSelectDropButton = styled(DropButton)`
  ${(props) => !props.plainSelect && controlBorderStyle};
  ${(props) => props.theme.select?.control?.extend};
  ${(props) => props.open && props.theme.select?.control?.open};
`;
