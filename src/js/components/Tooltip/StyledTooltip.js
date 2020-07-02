import styled, { css } from 'styled-components';
import { Box } from '../Box';
import { backgroundStyle, normalizeColor } from '../../utils';

const ArrowStyle = props => {
  const { position } = props;
  const [, tipColor] = backgroundStyle(
    normalizeColor(
      (props.theme.tooptip && props.theme.tooptip.background) || 'dark-1',
      props.theme,
    ),
    props.theme,
  );

  if (position === 'up') {
    return css`
      border-left: solid transparent;
      border-right: solid transparent;
      border-top: solid ${tipColor};
    `;
  }
  if (position === 'down') {
    return css`
      border-left: solid transparent;
      border-right: solid transparent;
      border-bottom: solid ${tipColor};
    `;
  }
  if (position === 'left') {
    return css`
      border-top: solid transparent;
      border-bottom: solid transparent;
      border-left: solid ${tipColor};
    `;
  }
  return css`
    border-top: solid transparent;
    border-bottom: solid transparent;
    border-right: solid ${tipColor};
  `;
};

export const Arrow = styled(Box)`
  width: 0;
  height: 0;
  ${props => ArrowStyle(props)}
  border-width: ${props => props.theme.tooptip.tipSize || '5px'};
`;

const Alignment = props => {
  const { position } = props;
  if (position === 'up') {
    return css`
      flex-direction: column-reverse;
      align-items: center;
    `;
  }
  if (position === 'down') {
    return css`
      flex-direction: column;
      align-items: center;
    `;
  }
  if (position === 'left') {
    return css`
      flex-direction: row-reverse;
      align-items: center;
    `;
  }
  return css`
    flex-direction: row;
    align-items: center;
  `;
};

export const ArrowWrap = styled(Box)`
  ${props => Alignment(props)}
`;
