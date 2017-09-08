import styled, { css } from 'styled-components';

const FIT_MAP = {
  cover: 'cover',
  contain: 'contain',
};

const fitStyle = css`
  object-fit: ${props => FIT_MAP[props.fit]};
`;

const StyledImage = styled.img`
  width: 100%;

  ${props => props.fit && fitStyle}
`;

export default StyledImage.extend`
  ${props => props.theme.image && props.theme.image.extend}
`;
