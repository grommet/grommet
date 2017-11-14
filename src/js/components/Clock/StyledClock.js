import styled, { css } from 'styled-components';

export const StyledCircle = styled.circle`
  stroke-width: ${props => props.theme.clock.circle.width};
  stroke: ${props => props.theme.clock.circle.color.day};
  transition: stroke 1s ease-out;

  ${props => props.night && css`
    stroke: ${props.theme.clock.circle.color.night};
    fill: ${props.theme.clock.circle.color.night};
    transition: fill 1s ease;
  `}
`;

export const StyledHour = styled.line`
  stroke-width: ${props => props.theme.clock.hour.width};
  stroke: ${props => (props.night ? props.theme.clock.hour.color.night : props.theme.clock.hour.color.day)};
  transition: stroke 1s ease-out;

  ${props => props.animate && `
    animation: rotate 43200s infinite linear;
  `}
`;

export const StyledMinute = styled.line`
  stroke-width: ${props => props.theme.clock.minute.width};
  stroke: ${props => (props.night ? props.theme.clock.minute.color.night : props.theme.clock.minute.color.day)};
  transition: stroke 1s ease-out;

  ${props => props.animate && `
    animation: rotate 3600s infinite steps(60);
    animation-delay: 1s;
  `}
`;

export const StyledSecond = styled.line`
  stroke-width: ${props => props.theme.clock.second.width};
  stroke: ${props => (props.night ? props.theme.clock.second.color.night : props.theme.clock.second.color.day)};
  transition: stroke 1s ease-out;

  ${props => props.animate && `
    animation: rotate 60s infinite steps(60);
  `}
`;

const StyledClock = styled.svg`
  width: ${props => props.theme.clock.size[props.size]};
  height: ${props => props.theme.clock.size[props.size]};

  @keyframes rotate {
    100% {
      transform: rotateZ(360deg);
    }
  }
`;

export default StyledClock.extend`
  ${props => props.theme.clock && props.theme.clock.extend}
`;
