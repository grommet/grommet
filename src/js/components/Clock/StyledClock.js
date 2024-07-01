import styled, { css, keyframes } from 'styled-components';

import {
  normalizeColor,
  genericStyles,
  styledComponentsConfig,
} from '../../utils';
import { withTheme } from '../../default-props';

const StyledHour = styled.line
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  stroke-width: ${(props) => props.theme.clock.analog.hour.width};
  stroke: ${(props) =>
    normalizeColor(props.theme.clock.analog.hour.color, props.theme)};
  transition: stroke 1s ease-out;
`;

const StyledMinute = styled.line
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  stroke-width: ${(props) => props.theme.clock.analog.minute.width};
  stroke: ${(props) =>
    normalizeColor(props.theme.clock.analog.minute.color, props.theme)};
  transition: stroke 1s ease-out;
`;

const StyledSecond = styled.line
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  stroke-width: ${(props) => props.theme.clock.analog.second.width};
  stroke: ${(props) =>
    normalizeColor(props.theme.clock.analog.second.color, props.theme)};
  transition: stroke 1s ease-out;
`;

const StyledAnalog = styled.svg
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  width: ${(props) => props.theme.clock.analog.size[props.size]};
  height: ${(props) => props.theme.clock.analog.size[props.size]};

  ${genericStyles}
  ${(props) => props.theme.clock.analog && props.theme.clock.analog.extend};
`;

const sizeStyle = (props) => {
  // size is a combination of the size and height properties
  const size = props.size || 'medium';
  const data = props.theme.clock.digital.text[size] || {};
  return css`
    font-size: ${data.size || props.theme.clock.digital.text.medium.size};
    line-height: ${data.height || props.theme.clock.digital.text.medium.height};
  `;
};

const StyledDigitalDigit = styled.div
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  position: relative;
  width: 0.8em;
  text-align: center;
  overflow: hidden;
  ${(props) => sizeStyle(props)};
`;

const previousUp = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
`;

const previousDown = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
`;

const StyledDigitalPrevious = styled.div.withConfig(styledComponentsConfig)`
  position: absolute;
  top: 0;
  left: 0;
  width: 0.8em;
  text-align: center;
  animation: ${(props) =>
      props.direction === 'down' ? previousDown : previousUp}
    0.5s forwards;
`;

const nextUp = keyframes`
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
`;

const nextDown = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
`;

const StyledDigitalNext = styled.div.withConfig(styledComponentsConfig)`
  position: absolute;
  top: 0;
  left: 0;
  width: 0.8em;
  text-align: center;
  animation: ${(props) => (props.direction === 'down' ? nextDown : nextUp)} 0.5s
    forwards;
`;

export {
  StyledHour,
  StyledMinute,
  StyledSecond,
  StyledAnalog,
  StyledDigitalDigit,
  StyledDigitalPrevious,
  StyledDigitalNext,
};
