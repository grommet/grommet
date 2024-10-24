import styled, { css, keyframes } from 'styled-components';
import {
  backgroundStyle,
  focusStyle,
  genericStyles,
  kindPartStyles,
  normalizeColor,
  parseMetricToNum,
  roundStyle,
  styledComponentsConfig,
} from '../../utils';
import { activeStyle } from '../../utils/background';

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

const StyledCalendar = styled.div.withConfig(styledComponentsConfig)`
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
const StyledWeeksContainer = styled.div.withConfig(styledComponentsConfig)`
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

const rangeRoundStyle = (props) => {
  let themeObj;
  if (props.isSelected) {
    if (
      props.rangePosition === 'start' &&
      props.theme.calendar?.[props.sizeProp]?.range?.start?.round
    ) {
      themeObj = props.theme.calendar[props.sizeProp].range.start.round;
    } else if (
      props.rangePosition === 'end' &&
      props.theme.calendar?.[props.sizeProp]?.range?.end?.round
    )
      themeObj = props.theme.calendar[props.sizeProp].range.end.round;
  } else themeObj = props.theme.calendar?.[props.sizeProp]?.range?.round;
  return (
    themeObj && [
      roundStyle(themeObj, props.responsive, props.theme),
      'overflow: hidden;',
    ]
  );
};

const StyledWeeks = styled.div.withConfig(styledComponentsConfig)`
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
  ${(props) =>
    (props.inRange || (props.isSelected && props.rangePosition)) &&
    props.theme.calendar?.range?.background &&
    backgroundStyle(props.theme.calendar.range.background, props.theme)}
  ${(props) => rangeRoundStyle(props)}
`;

const daySizeStyle = (props) => {
  const data = props.theme.calendar[props.sizeProp];

  return css`
    width: ${props.fillContainer ? '100%' : data.daySize};
    height: ${props.fillContainer ? '100%' : data.daySize};
  `;
};

const dayStyle = (props) => {
  let backgroundObj;
  let colorObj;
  if (props.isSelected) {
    backgroundObj = props.theme.calendar.day?.selected?.background || 'control';
    colorObj = props.theme.calendar.day?.selected?.color;
  } else if (props.inRange) {
    // for backwards compatability, only apply this if caller hasn't specified
    // range specific rounding
    // if they have, background will be applied to StyledDayContainer
    backgroundObj =
      !props.theme.calendar?.[props.sizeProp]?.range?.round &&
      (props.theme.calendar.day?.inRange?.background || {
        color: 'control',
        opacity: 'weak',
      });
    colorObj = props.theme.calendar.day?.inRange?.color;
  } else {
    backgroundObj = props.theme.calendar.day?.background;
    colorObj = props.theme.calendar.day?.color;
  }

  if (colorObj && !backgroundObj)
    return `color: ${normalizeColor(colorObj, props.theme)};`;
  return backgroundStyle(backgroundObj, props.theme, colorObj);
};

const dayHoverStyle = (props) => {
  let backgroundObj;
  let colorObj;
  if (props.isSelected) {
    backgroundObj = props.theme.calendar.day?.selected?.hover?.background;
    colorObj = props.theme.calendar.day?.selected?.hover?.color;
  } else if (props.inRange) {
    backgroundObj = props.theme.calendar.day?.inRange?.hover?.background;
    colorObj = props.theme.calendar.day?.inRange?.hover?.color;
  } else {
    backgroundObj = props.theme.calendar.day?.hover?.background;
    colorObj = props.theme.calendar.day?.hover?.color;
  }

  if (colorObj && !backgroundObj)
    return `color: ${normalizeColor(colorObj, props.theme)};`;
  return backgroundStyle(backgroundObj, props.theme, colorObj);
};

const dayFontStyle = (props) => {
  let style = '';
  if (props.isSelected) {
    style += `font-weight: ${
      props.theme.calendar.day?.selected?.font?.weight || 'bold'
    };`;
  }
  return style;
};

const StyledDay = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => daySizeStyle(props)}
  ${(props) => dayStyle(props)}
  ${(props) => props.otherMonth && 'opacity: 0.5;'}
  ${(props) => dayFontStyle(props)}
   ${(props) =>
    props.theme.calendar?.[props.sizeProp]?.day?.round &&
    roundStyle(
      props.theme.calendar?.[props.sizeProp]?.day?.round,
      props.responsive,
      props.theme,
    )}
  ${(props) => props.active && activeStyle}
  ${(props) => props.hover && dayHoverStyle(props)}
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
