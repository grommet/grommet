import styled from 'styled-components';

import { sizeStyle } from '../../utils';

export const StyledContainer = styled.div`
  /* IE11 hack to get drop contents to not overflow */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    width: 100%;
  }

  ${props =>
    props.dropHeight
      ? sizeStyle('max-height', props.dropHeight, props.theme)
      : 'max-height: inherit;'};

  ${props =>
    props.theme.select.container && props.theme.select.container.extend};
`;
