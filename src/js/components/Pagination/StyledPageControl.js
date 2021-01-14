import styled from 'styled-components';

import { Button } from '../Button';

// sizeStyle is exploratory, but would allow user to apply a size
// prop to their Pagination component which would scale everything
// up or down. This does not necessarily have to be part of the first pass,
// but we wanted to explore the possibility
const sizeStyle = props => {
  const style =
    props.theme.pagination.control &&
    props.theme.pagination.control.size &&
    // need to create a size prop if this is functionality we desire
    props.theme.pagination.control.size[props.sizeProp || 'medium'];

  return style
    ? {
        content: {
          fontSize: style.font && style.font.size,
          lineHeight: style.font && style.font.height,
          borderRadius: style.border && style.border.radius,
          borderWidth: style.border && style.border.width,
        },
        container: {
          height: style.height,
          minWidth: style.width,
        },
      }
    : '';
};

export const StyledPaginationButton = styled(Button)`
  padding: 4px;
  border-radius: 4px;
  ${props => sizeStyle(props).content};
`;

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px; // default line-height + default padding
  max-width: 100%;
  min-width: 32px; // default line-height + default padding
  ${props => sizeStyle(props).container};
  ${props =>
    props.theme.pagination.control && props.theme.pagination.control.extend};
`;
