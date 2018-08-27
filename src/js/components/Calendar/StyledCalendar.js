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

export const StyledCalendar = styled.div`
  ${props => sizeStyle(props)}
`.extend`
  ${props => props.theme.calendar && props.theme.calendar.extend}
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
  flex: 0 0 auto;
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
  ${props => (props.isSelected && backgroundStyle('brand', props.theme)) ||
    (props.inRange &&
      backgroundStyle({ color: 'brand', opacity: 'weak' }, props.theme))}
  ${props => props.otherMonth && 'opacity: 0.5;'}
  ${props => props.isSelected && 'font-weight: bold;'}
`;
