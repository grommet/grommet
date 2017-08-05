import styled, { css } from 'styled-components';

import { backgroundStyle } from '../utils';

const ALIGN_MAP = {
  baseline: 'baseline',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const alignStyle = css`
  align-items: ${props => ALIGN_MAP[props.align]};
`;

const ALIGN_CONTENT_MAP = {
  around: 'around',
  between: 'between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const alignContentStyle = css`
  align-content: ${props => ALIGN_CONTENT_MAP[props.alignContent]};
`;

const ALIGN_SELF_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const alignSelfStyle = css`
  align-self: ${props => ALIGN_SELF_MAP[props.alignSelf]};
`;

const BASIS_MAP = {
  'full': '100%',
  '1/2': '50%',
  '1/4': '25%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%',
};

const basisStyle = css`
  flex-basis: ${props => BASIS_MAP[props.basis] || props.theme.global.size[props.basis]};
`;

const directionStyle = css`
  flex-direction: ${(props) => {
    if (props.direction) {
      return (props.reverse ? `${props.direction}-reverse` : props.direction);
    }
    return 'column-reverse';
  }};
`;

const FLEX_MAP = {
  [true]: '1 1',
  [false]: '0 0 auto',
  grow: '1 0',
  shrink: '0 1',
};

const flexStyle = css`
  flex: ${props => FLEX_MAP[props.flex]};
`;

const fullStyle = (full) => {
  if (full === 'horizontal') {
    return `
      max-width: 100%;
      width: 100vw;
    `;
  }
  if (full === 'vertical') {
    return `
      height: 100vh;
      max-height: 100%;
      overflow: auto;
    `;
  }
  if (full === 'grow') {
    return `
      max-width: 100%;
      width: 100vw;
      min-height: 100vh;
    `;
  }
  if (full) {
    return `
      max-width: 100%;
      width: 100vw;
      height: 100vh;
      max-height: 100%;
      overflow: auto;
    `;
  }
  return undefined;
};

const gridAreaStyle = css`
  grid-area: ${props => props.gridArea};
`;

const JUSTIFY_MAP = {
  between: 'space-between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
};

const justifyStyle = css`
  justify-content: ${props => JUSTIFY_MAP[props.justify]};
`;

const TEXT_ALIGN_MAP = {
  center: 'center',
  end: 'right',
  start: 'left',
};

const textAlignStyle = css`
  text-align: ${props => TEXT_ALIGN_MAP[props.textAlign]};
`;

const wrapStyle = 'flex-wrap: true;';

const edgeStyle = (kind, data, theme) => {
  if (typeof data === 'string') {
    return `${kind}: ${theme.global.edgeSize[data]};`;
  }
  if (data.horizontal) {
    return `
      ${kind}-left: ${theme.global.edgeSize[data.horizontal]};
      ${kind}-right: ${theme.global.edgeSize[data.horizontal]};
    `;
  }
  if (data.vertical) {
    return `
      ${kind}-top: ${theme.global.edgeSize[data.vertical]};
      ${kind}-bottom: ${theme.global.edgeSize[data.vertical]};
    `;
  }
  if (data.top) {
    return `${kind}-top: ${theme.global.edgeSize[data.top]};`;
  }
  if (data.bottom) {
    return `${kind}-bottom: ${theme.global.edgeSize[data.bottom]};`;
  }
  if (data.left) {
    return `${kind}-left: ${theme.global.edgeSize[data.left]};`;
  }
  if (data.right) {
    return `${kind}-right: ${theme.global.edgeSize[data.right]};`;
  }
  return '';
};

const StyledBox = styled.div`
  display: flex;

  ${props => props.align && alignStyle}
  ${props => props.alignContent && alignContentStyle}
  ${props => props.alignSelf && alignSelfStyle}
  ${props => props.basis && basisStyle}
  ${props => props.background && backgroundStyle(props.background, props.theme)}
  ${props => (props.direction || props.reverse) && directionStyle}
  ${props => props.flex !== undefined && flexStyle}
  ${props => props.full && fullStyle(props.full)}
  ${props => props.gridArea && gridAreaStyle}
  ${props => props.justify && justifyStyle}
  ${props => props.margin && edgeStyle('margin', props.margin, props.theme)}
  ${props => props.pad && edgeStyle('padding', props.pad, props.theme)}
  ${props => props.textAlign && textAlignStyle}
  ${props => props.wrap && wrapStyle}
`;

export default StyledBox.extend`
  ${props => props.theme.box && props.theme.box.extend}
`;
