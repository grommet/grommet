import styled, { css } from 'styled-components';

const ALIGN_MAP = {
  baseline: 'baseline',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const ALIGN_CONTENT_MAP = {
  around: 'around',
  between: 'between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const ALIGN_SELF_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const JUSTIFY_MAP = {
  between: 'space-between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
};

const BASIS_MAP = {
  'full': '100%',
  '1/2': '50%',
  '1/4': '25%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%',
};

const alignStyle = css`
  align-items: ${props => ALIGN_MAP[props.align]};
`;

const alignContentStyle = css`
  align-content: ${props => ALIGN_CONTENT_MAP[props.alignContent]};
`;

const alignSelfStyle = css`
  align-self: ${props => ALIGN_SELF_MAP[props.alignSelf]};
`;

const directionStyle = css`
  flex-direction: ${(props) => {
    if (props.direction) {
      return (props.reverse ? `${props.direction}-reverse` : props.direction);
    }
    return 'column-reverse';
  }};
`;

const justifyStyle = css`
  justify-content: ${props => JUSTIFY_MAP[props.justify]};
`;

const basisStyle = css`
  flex-basis: ${props => BASIS_MAP[props.basis] || props.theme.brand.size[props.basis]};
`;

const StyledBox = styled.div`
  display: flex;

  ${props => props.align && alignStyle}
  ${props => props.alignContent && alignContentStyle}
  ${props => props.alignSelf && alignSelfStyle}
  ${props => props.basis && basisStyle}
  ${props => (props.direction || props.reverse) && directionStyle}
  ${props => props.justify && justifyStyle}
`;

export default StyledBox.extend`
  ${props => props.theme.box && props.theme.box.extend}
`;
