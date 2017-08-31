/* TODO: re-enable eslint before code review */
/* eslint-disable */

import styled, { css } from 'styled-components';

import { focusStyle, fontSize, lapAndUp, parseMetricToInt } from '../utils';

const anchorStyles = css`
  color: ${props => props.theme.anchor.colors.default};
  text-decoration: ${props => props.theme.anchor.textDecoration};
  cursor: pointer;
`;

const primaryStyles = css`
  color: ${props => props.theme.anchor.colors.brand};
  font-weight: ${props => props.theme.anchor.fontWeight};
  text-decoration: none;
`;

const disabledStyles = css`
  opacity: 0.3;
  cursor: default;
`;

const iconStyles = css`
  flex: 0 0 auto;
`;

const styles = css`
  ${anchorStyles}
  ${props => props.disabled && disabledStyles}
  ${props => props.primary && primaryStyles}
  ${props => props.icon && iconStyles}
`;

export const StyledIcon = styled.span`
  display: inline-block;

  &:first-child:not(:last-child) {
    margin-right: ${props => parseMetricToInt(props.theme.global.spacing) / 2}px;
  }

  > * {
    vertical-align: bottom;
  }
`;

export default styled.a`
  ${styles}
`;
