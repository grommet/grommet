import styled, { css } from 'styled-components';

const ALIGN_MAP = {
  baseline: 'baseline',
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

const alignStyle = css`
  align-items: ${props => ALIGN_MAP[props.align]};
`;

const directionStyle = css`
  flex-direction: ${props => props.direction};
`;

const justifyStyle = css`
  justify-content: ${props => JUSTIFY_MAP[props.justify]};
`;

const StyledBox = styled.div`
  display: flex;

  ${props => props.align && alignStyle}
  ${props => props.direction && directionStyle}
  ${props => props.justify && justifyStyle}
`;

export default StyledBox.extend`
  ${props => props.theme.box && props.theme.box.extend}
`;
