import styled from 'styled-components';
import { Button } from '../Button';
import { roundStyle, edgeStyle, parseMetricToNum } from '../../utils';

const adjustPad = (value, theme) => {
  // resolve t-shirt size if it exists
  let vertical = typeof value === 'string' ? value : value?.vertical;
  vertical = theme.global.edgeSize[vertical] || vertical;
  let horizontal = typeof value === 'string' ? value : value?.horizontal;
  horizontal = theme.global.edgeSize[horizontal] || horizontal;

  const borderWidth = parseMetricToNum(theme.global.borderSize.xsmall);
  vertical = `${Math.max(parseMetricToNum(vertical) - borderWidth, 0)}px`;
  horizontal = `${Math.max(parseMetricToNum(horizontal) - borderWidth, 0)}px`;

  return { vertical, horizontal };
};

export const StyledButton = styled(Button)`
  border-radius: 0;
  border: none;
  ${(props) => roundStyle(props.round, false, props.theme)};
  ${(props) => {
    const themePad =
      props.icon &&
      !props.label &&
      props.theme?.toggleGroup?.button?.iconOnly?.pad
        ? props.theme?.toggleGroup?.button?.iconOnly?.pad
        : props.theme?.toggleGroup.button?.pad;

    // adjust pad for "kind" themes to align with how "kind" themes
    // manages this calculation
    const pad =
      props.theme?.button?.default && props.theme?.button?.intelligentPad
        ? adjustPad(themePad, props.theme)
        : themePad;
    return edgeStyle('padding', pad, false, undefined, props.theme);
  }}
  // remove hover style from StyledButton/StyledButtonKind theme
  &:hover {
    border: none;
    box-shadow: none;
  }
`;
