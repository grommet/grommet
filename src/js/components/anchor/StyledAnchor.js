/* TODO: re-enable eslint before code review */
/* eslint-disable */

import { styled, css } from 'styled-components';

const primaryStyles = css`
  color: ${props => props.theme.brand.color};
`;

const disabledStyles = css`
  opacity: 0.3;
  cursor: default;
`;

const iconStyles = css`
  flex: 0 0 auto;
`;

const styles = css`
  ${props => props.disabled && disabledStyles}
  ${props => props.primary && primaryStyles}
  ${props => props.icon && iconStyles}
`;

export default styled.a`
  ${styles}
`;
