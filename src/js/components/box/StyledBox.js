import styled, { css } from 'styled-components';

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
  flex-basis: ${props => BASIS_MAP[props.basis] || props.theme.brand.size[props.basis]};
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
    return `${kind}: ${theme.brand.edgeSize[data]};`;
  }
  if (data.horizontal) {
    return `
      ${kind}-left: ${theme.brand.edgeSize[data.horizontal]};
      ${kind}-right: ${theme.brand.edgeSize[data.horizontal]};
    `;
  }
  if (data.vertical) {
    return `
      ${kind}-top: ${theme.brand.edgeSize[data.vertical]};
      ${kind}-bottom: ${theme.brand.edgeSize[data.vertical]};
    `;
  }
  if (data.top) {
    return `${kind}-top: ${theme.brand.edgeSize[data.top]};`;
  }
  if (data.bottom) {
    return `${kind}-bottom: ${theme.brand.edgeSize[data.bottom]};`;
  }
  if (data.left) {
    return `${kind}-left: ${theme.brand.edgeSize[data.left]};`;
  }
  if (data.right) {
    return `${kind}-right: ${theme.brand.edgeSize[data.right]};`;
  }
  return '';
};

const StyledBox = styled.div`
  display: flex;

  ${props => props.align && alignStyle}
  ${props => props.alignContent && alignContentStyle}
  ${props => props.alignSelf && alignSelfStyle}
  ${props => props.basis && basisStyle}
  ${props => (props.direction || props.reverse) && directionStyle}
  ${props => props.flex !== undefined && flexStyle}
  ${props => props.justify && justifyStyle}
  ${props => props.margin && edgeStyle('margin', props.margin, props.theme)}
  ${props => props.pad && edgeStyle('padding', props.pad, props.theme)}
  ${props => props.textAlign && textAlignStyle}
  ${props => props.wrap && wrapStyle}
`;

export default StyledBox.extend`
  ${props => props.theme.box && props.theme.box.extend}
`;
