import styled, { css, keyframes } from 'styled-components';

import { normalizeColor, genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';

const StyledHour = styled.line`
  stroke-width: ${props => props.theme.clock.analog.hour.width};
  stroke: ${props =>
    normalizeColor(props.theme.clock.analog.hour.color, props.theme)};
  transition: stroke 1s ease-out;
`;

StyledHour.defaultProps = {};
Object.setPrototypeOf(StyledHour.defaultProps, defaultProps);

const StyledMinute = styled.line`
  stroke-width: ${props => props.theme.clock.analog.minute.width};
  stroke: ${props =>
    normalizeColor(props.theme.clock.analog.minute.color, props.theme)};
  transition: stroke 1s ease-out;
`;

StyledMinute.defaultProps = {};
Object.setPrototypeOf(StyledMinute.defaultProps, defaultProps);

const StyledSecond = styled.line`
  stroke-width: ${props => props.theme.clock.analog.second.width};
  stroke: ${props =>
    normalizeColor(props.theme.clock.analog.second.color, props.theme)};
  transition: stroke 1s ease-out;
`;

StyledSecond.defaultProps = {};
Object.setPrototypeOf(StyledSecond.defaultProps, defaultProps);

const StyledAnalog = styled.svg`
  width: ${props => props.theme.clock.analog.size[props.size]};
  height: ${props => props.theme.clock.analog.size[props.size]};

  ${genericStyles}
  ${props => props.theme.clock.analog && props.theme.clock.analog.extend};
`;

StyledAnalog.defaultProps = {};
Object.setPrototypeOf(StyledAnalog.defaultProps, defaultProps);

const sizeStyle = props => {
  // size is a combination of the size and height properties
  const size = props.size || 'medium';
  const data = props.theme.clock.digital.text[size] || {};
  return css`
    font-size: ${data.size || props.theme.clock.digital.text.medium.size};
    line-height: ${data.height || props.theme.clock.digital.text.medium.height};
  `;
};

const StyledDigitalDigit = styled.div`
  position: relative;
  width: 0.8em;
  text-align: center;
  overflow: hidden;
  ${props => sizeStyle(props)};
`;

StyledDigitalDigit.defaultProps = {};
Object.setPrototypeOf(StyledDigitalDigit.defaultProps, defaultProps);

const previousUp = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
`;

const previousDown = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
`;

const StyledDigitalPrevious = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0.8em;
  text-align: center;
  animation: ${props =>
      props.direction === 'down' ? previousDown : previousUp}
    0.5s forwards;
`;

StyledDigitalPrevious.defaultProps = {};
Object.setPrototypeOf(StyledDigitalPrevious.defaultProps, defaultProps);

const nextUp = keyframes`
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
`;

const nextDown = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
`;

const StyledDigitalNext = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0.8em;
  text-align: center;
  animation: ${props => (props.direction === 'down' ? nextDown : nextUp)} 0.5s
    forwards;
`;

StyledDigitalNext.defaultProps = {};
Object.setPrototypeOf(StyledDigitalNext.defaultProps, defaultProps);

export {
  StyledHour,
  StyledMinute,
  StyledSecond,
  StyledAnalog,
  StyledDigitalDigit,
  StyledDigitalPrevious,
  StyledDigitalNext,
};
