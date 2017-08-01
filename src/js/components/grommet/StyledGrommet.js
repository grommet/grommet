import styled, { css } from 'styled-components';

import { lapAndUp, parseMetricToInt } from '../utils';

const centeredStyle = css`
  width: 100%;
  max-width: ${props => props.theme.global.centerColumnWidth};
  margin-left: auto;
  margin-right: auto;
`;

const StyledGrommet = styled.div`
  font-family: ${props => props.theme.global.font.family};
  font-size: ${props => `${(parseMetricToInt(props.theme.global.font.size) / 16) * 1}em`};
  line-height: ${props => (
    parseMetricToInt(props.theme.global.lineHeight) / parseMetricToInt(props.theme.global.font.size)
  )};
  color: ${props => props.theme.global.colors.text};
  background-color: ${props => props.theme.global.colors.background};

  box-sizing: border-box;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;

  * {
    box-sizing: inherit;
  }

  ${lapAndUp(`
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 100%;
    width: 100%;
    overflow: visible;
  `)}

  ${props => props.centered && centeredStyle}
  ${props => props.theme.global.font.face}
`;

export default StyledGrommet.extend`
  ${props => props.theme.grommet.extend}
`;
