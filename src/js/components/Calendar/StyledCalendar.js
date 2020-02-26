import styled, { css, keyframes } from 'styled-components';
import {
  backgroundStyle,
  focusStyle,
  genericStyles,
  parseMetricToNum,
} from '../../utils';

import { defaultProps } from '../../default-props';

const sizeStyle = props => {
  const data = props.theme.calendar[props.sizeProp];
  return css`
    font-size: ${data.fontSize};
    line-height: ${data.lineHeight};
    width: ${props.theme.global.size[props.sizeProp]};
  `;
};

const StyledCalendar = styled.div`
  ${genericStyles}
  ${props => sizeStyle(props)}
  ${props => props.theme.calendar && props.theme.calendar.extend}
`;

StyledCalendar.defaultProps = {};
Object.setPrototypeOf(StyledCalendar.defaultProps, defaultProps);

const StyledWeeksContainer = styled.div`
  overflow: hidden;
  ${props =>
    `height: ${parseMetricToNum(props.theme.calendar[props.sizeProp].daySize) *
      6}px;`};
  outline: none;
  ${props => props.focus && !props.plain && focusStyle};
`;

StyledWeeksContainer.defaultProps = {};
Object.setPrototypeOf(StyledWeeksContainer.defaultProps, defaultProps);

const slideStyle = props => {
  const {
    slide: { direction, weeks },
    sizeProp,
    theme,
  } = props;
  const { daySize, slideDuration } = theme.calendar[sizeProp];
  const amount = parseMetricToNum(daySize) * weeks;

  const translateYFrom = direction === 'down' ? `-${amount}px` : '0';
  const translateYTo = direction === 'up' ? `-${amount}px` : '0';
  const slideTransition = css`
    0% {
      transform: translateY(${translateYFrom});
    }
    100% {
      transform: translateY(${translateYTo});
    }
  `;
  return css`
    animation: ${keyframes`${slideTransition}`} ${slideDuration} forwards;
  `;
};

const StyledWeeks = styled.div`
  position: relative;
  ${props => props.slide && slideStyle(props)};
`;

StyledWeeks.defaultProps = {};
Object.setPrototypeOf(StyledWeeks.defaultProps, defaultProps);

const StyledWeek = styled.div`
  display: flex;
  flex-direction: row;
  flex-justify: between;
`;

StyledWeek.defaultProps = {};
Object.setPrototypeOf(StyledWeek.defaultProps, defaultProps);

const StyledDayContainer = styled.div`
  flex: 0 0 auto;
`;

StyledDayContainer.defaultProps = {};
Object.setPrototypeOf(StyledDayContainer.defaultProps, defaultProps);

const daySizeStyle = props => {
  const data = props.theme.calendar[props.sizeProp];
  return css`
    width: ${data.daySize};
    height: ${data.daySize};
  `;
};

const StyledDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => daySizeStyle(props)}
  ${props =>
    (props.isSelected && backgroundStyle('control', props.theme)) ||
    (props.inRange &&
      backgroundStyle({ color: 'control', opacity: 'weak' }, props.theme))}
  ${props => props.otherMonth && 'opacity: 0.5;'}
  ${props => props.isSelected && 'font-weight: bold;'}
  ${props =>
    props.theme.calendar &&
    props.theme.calendar.day &&
    props.theme.calendar.day.extend}
`;

StyledDay.defaultProps = {};
Object.setPrototypeOf(StyledDay.defaultProps, defaultProps);

export {
  StyledCalendar,
  StyledWeeksContainer,
  StyledWeeks,
  StyledWeek,
  StyledDayContainer,
  StyledDay,
};
