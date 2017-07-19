import styled, { css } from 'styled-components';

import { lapAndUp } from '../mixins';
import { parseMetricToInt } from '../utils';

const centeredStyle = css`
  width: 100%;
  max-width: ${props => props.theme.brand.centerColumnWidth};
  margin-left: auto;
  margin-right: auto;
`;

const inlineStyle = css`
  position: relative;
`;

const StyledGrommet = styled.div`
  font-family: ${props => props.theme.brand.font.family};
  font-size: ${props => `${(parseMetricToInt(props.theme.brand.font.size) / 16) * 1}em`};
  line-height: ${props => (
    parseMetricToInt(props.theme.brand.lineHeight) / parseMetricToInt(props.theme.brand.font.size)
  )};
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.background};

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
  ${props => props.inline && inlineStyle}
  ${props => props.theme.brand.font.face}
  ${props => props.theme.grommet.extend}
`;

export default StyledGrommet;
