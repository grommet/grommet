import styled, { css, keyframes } from 'styled-components';
import { backgroundStyle, parseMetricToNum } from '../../utils';

const sizeStyle = (props) => {
  const data = props.theme.calendar[props.size];
  return css`
    font-size: ${data.fontSize};
    line-height: ${data.lineHeight};
    width: ${props.theme.global.size[props.size]};
  `;
};

const StyledCalendar = styled.div`
  ${props => sizeStyle(props)}
`;

export const StyledWeeksContainer = styled.div`
  overflow: hidden;
  ${props => `height: ${parseMetricToNum(props.theme.calendar[props.size].daySize) * 6}px;`}
`;

const slideStyle = (props) => {
  const { slide: { direction, weeks }, size, theme } = props;
  const { daySize, slideDuration } = theme.calendar[size];
  const amount = parseMetricToNum(daySize) * weeks;
  return css`
    animation ${keyframes`
      from { transform: translateY(${direction === 'down' ? `-${amount}px` : '0'}) }
      to { transform: translateY(${direction === 'up' ? `-${amount}px` : '0'}) }`}
      ${slideDuration} forwards;
  `;
};

export const StyledWeeks = styled.div`
  position: relative;
  ${props => props.slide && slideStyle(props)}
`;

export const StyledWeek = styled.div`
  display: flex;
  flex-direction: row;
  flex-justify: between;
`;

export const StyledDayContainer = styled.div`
  flex: 0 0;
`;

const daySizeStyle = (props) => {
  const data = props.theme.calendar[props.size];
  return css`
    width: ${data.daySize};
    height: ${data.daySize};
  `;
};

export const StyledDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => daySizeStyle(props)}
  ${props => props.background && backgroundStyle(props.background, props.theme)}
  ${props => props.otherMonth && 'opacity: 0.5;'}
`;

export default StyledCalendar.extend`
  ${props => props.theme.calendar && props.theme.calendar.extend}
`;
