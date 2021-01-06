import React from 'react';
import styled from 'styled-components';

import { Button } from '../Button';
import { Text } from '../Text';

const sizeStyle = props => {
  const style =
    props.theme.pagination.control &&
    props.theme.pagination.control.size &&
    // need to create a size prop if this is functionality we desire
    props.theme.pagination.control.size[props.sizeProp || 'medium'];

  // TODO: control size and positioning of icon

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

const StyledContent = styled(Button)`
  padding: 4px;
  border-radius: 4px;
  border-width: 0;
  ${props => sizeStyle(props).content};
`;

const StyledContainer = styled.div`
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

export const PageControl = ({ control, separator, ...rest }) => {
  return (
    <StyledContainer as="li">
      {separator ? (
        <Text
          // margin="small" // thinking we should not be hardcoding these here
          weight="bold" // thinking we should not be hardcoding these here
        >
          &#8230;
        </Text>
      ) : (
        <StyledContent
          a11yTitle={`Go to page ${control}`}
          label={control}
          fill
          {...rest}
        />
      )}
    </StyledContainer>
  );
};
