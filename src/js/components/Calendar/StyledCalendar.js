import styled, { css, keyframes } from 'styled-components';
import {
  backgroundStyle,
  focusStyle,
  genericStyles,
  kindPartStyles,
  parseMetricToNum,
  styledComponentsConfig,
} from '../../utils';
import { withTheme } from '../../default-props';

const sizeStyle = (props) => {
  const data = props.theme.calendar[props.sizeProp];
  const width = props.fillContainer
    ? '100%'
    : props.theme.global.size[props.sizeProp];

  return css`
    font-size: ${data.fontSize};
    line-height: ${data.lineHeight};
    width: ${width};
    ${(p) => p.fillContainer && 'height: 100%;'}
  `;
};

const StyledCalendar = styled.div
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  ${genericStyles}
  ${(props) => sizeStyle(props)}
  ${(props) => props.theme.calendar && props.theme.calendar.extend}
`;

const weeksContainerSizeStyle = (props) => {
  const height = props.fillContainer
    ? '100%'
    : `${parseMetricToNum(props.theme.calendar[props.sizeProp].daySize) * 6}px`;
  return `
    height: ${height};

  `;
};
const StyledWeeksContainer = styled.div
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  overflow: hidden;
  ${(props) => weeksContainerSizeStyle(props)}
  ${(props) => props.focus && !props.plain && focusStyle()};
`;

const slideStyle = (props) => {
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

const weeksSizeStyle = () => css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const StyledWeeks = styled.div
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  position: relative;
  ${(props) => props.fillContainer && weeksSizeStyle()}
  ${(props) => props.slide && slideStyle(props)};
`;

const StyledWeek = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  justify-content: space-between;
  ${(props) => props.fillContainer && 'flex: 1;'}
`;

// The width of 14.3% is derived from dividing 100/7. We want the
// widths of 7 days to equally fill 100% of the row.
const StyledDayContainer = styled.div.withConfig(styledComponentsConfig)`
  flex: 0 1 auto;
  ${(props) => props.fillContainer && 'width: 14.3%;'}
`;

const daySizeStyle = (props) => {
  const data = props.theme.calendar[props.sizeProp];

  return css`
    width: ${props.fillContainer ? '100%' : data.daySize};
    height: ${props.fillContainer ? '100%' : data.daySize};
  `;
};

const StyledDay = styled.div
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => daySizeStyle(props)}
  ${(props) =>
    (props.isSelected && backgroundStyle('control', props.theme)) ||
    (props.inRange &&
      backgroundStyle({ color: 'control', opacity: 'weak' }, props.theme))}
  ${(props) => props.otherMonth && 'opacity: 0.5;'}
  ${(props) => props.isSelected && 'font-weight: bold;'}
  ${(props) =>
    // when theme uses kind Buttons, since we use children for Button,
    // we have to special case how we handle disabled days here
    props.disabledProp &&
    props.theme.button.default &&
    kindPartStyles(props.theme.button.disabled, props.theme)}
  ${(props) =>
    props.theme.calendar &&
    props.theme.calendar.day &&
    props.theme.calendar.day.extend}
`;

export {
  StyledCalendar,
  StyledWeeksContainer,
  StyledWeeks,
  StyledWeek,
  StyledDayContainer,
  StyledDay,
};
