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
  switch (position) {
    case 'up':
      return css`
        border-left: solid transparent;
        border-right: solid transparent;
        border-top: solid ${tipColor};
      `;
    case 'down':
      return css`
        border-left: solid transparent;
        border-right: solid transparent;
        border-bottom: solid ${tipColor};
      `;
    case 'left':
      return css`
        border-top: solid transparent;
        border-bottom: solid transparent;
        border-left: solid ${tipColor};
      `;

    default:
      return css`
        border-top: solid transparent;
        border-bottom: solid transparent;
        border-right: solid ${tipColor};
      `;
  }
};

export const Arrow = styled(Box)`
  width: 0;
  height: 0;
  ${props => ArrowStyle(props)}
  border-width: ${props => props.theme.tooptip.tipSize || '5px'};
`;

const Alignment = props => {
  const { position } = props;
  switch (position) {
    case 'up':
      return css`
        flex-direction: column-reverse;
      `;
    case 'down':
      return css`
        flex-direction: column;
      `;
    case 'left':
      return css`
        flex-direction: row-reverse;
      `;
    default:
      return css`
        flex-direction: row;
      `;
  }
};

export const ArrowWrap = styled(Box)`
  align-items: center;
  ${props => Alignment(props)}
`;
