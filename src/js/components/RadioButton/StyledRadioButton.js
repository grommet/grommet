import styled from 'styled-components';

import { focusStyle } from '../../utils';

export const StyledRadioButtonContainer = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  user-select: none;

  > div:first-child {
    ${props => `margin-right: ${props.theme.global.edgeSize.small};`}
  }

  :hover input:not([disabled]) + div {
    border-color: ${props => (props.grommet.dark ? props.theme.global.colors.white : props.theme.global.colors.black)};
  }
`;

export const StyledRadioButtonInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;

  :focus + div,
  :focus + span {
    ${focusStyle}
  }

  :checked + div {
    border-color: ${props => (props.grommet.dark ? props.theme.global.colors.white : props.theme.radioButton.check.color)};
  }

  :checked + div > svg {
    display: block;
  }

  :checked + span > span {
    left: ${props => props.theme.radioButton.size};
    background-color: ${props => (props.grommet.dark ? props.theme.global.colors.white : props.theme.radioButton.check.color)};
  }
`;

export const StyledRadioButtonButton = styled.div`
  box-sizing: border-box;
  position: relative;
  top: -1px;
  display: inline-block;
  width: ${props => props.theme.radioButton.size};
  height: ${props => props.theme.radioButton.size};
  vertical-align: middle;
  background-color: inherit;
  border: ${props => props.theme.radioButton.border.width} solid;
  border-color: ${props => props.theme.radioButton.border.color[props.grommet.dark ? 'dark' : 'light']};
  border-radius: ${props => props.theme.radioButton.border.radius};

  > svg {
    box-sizing: border-box;
    position: absolute;
    top: -2px;
    left: -2px;
    display: none;
    width: ${props => props.theme.radioButton.size};
    height: ${props => props.theme.radioButton.size};
    fill: ${props => (props.grommet.dark ? props.theme.global.colors.white : props.theme.radioButton.check.color)};
  }
`;

const StyledRadioButton = styled.div`
`;

export default StyledRadioButton.extend`
  ${props => props.theme.radioButton && props.theme.radioButton.extend}
`;
