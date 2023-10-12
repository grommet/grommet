import styled from 'styled-components';

import { Button } from '../Button';
import { Text } from '../Text';

const sizeStyle = (props) => {
  const style =
    props.theme.pagination.button &&
    props.theme.pagination.button.size &&
    props.theme.pagination.button.size[props.size || 'medium'];

  return style
    ? {
        content: {
          fontSize: style.font && style.font.size,
          // fix for safari, apply line-height 0 on next/previous
          // icon-only buttons
          lineHeight: style.font && props.hasLabel ? style.font.height : 0,
        },
        container: {
          height: style.height,
          minWidth: style.width,
        },
      }
    : '';
};

export const StyledPaginationButton = styled(Button)`
  > svg {
    margin: 0 auto;
  }
  ${(props) => sizeStyle(props).content};
`;

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  ${(props) => sizeStyle(props).container};
  ${(props) =>
    props.theme.pagination.control && props.theme.pagination.control.extend};
`;

export const StyledSeparator = styled(Text)`
  font-weight: bold;
  ${(props) =>
    `font-size: ${
      sizeStyle(props).content && sizeStyle(props).content.fontSize
    }`};
  ${(props) =>
    `line-height: ${
      sizeStyle(props).content && sizeStyle(props).content.lineHeight
    }`};
`;
