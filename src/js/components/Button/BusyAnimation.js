import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Checkmark } from 'grommet-icons/icons/Checkmark';
import { Box } from '../Box';

const bounceDelay = keyframes`
  0%, 80%, 100% { 
    transform: scale(0.4);
  } 40% { 
    transform: scale(0.8);
  }
`;

const bounceDelayRule = css`
  animation: ${bounceDelay} 1.4s infinite ease-in-out both;
`;

const Dot = styled(Box)`
  background-color: currentColor;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  display: inline-block;
  ${bounceDelayRule}
  ${(props) => props.delay && `animation-delay: ${props.delay};`}
`;

export const EllipsisAnimation = () => (
  <Box
    style={{ position: 'absolute' }}
    fill
    alignContent="center"
    justify="center"
  >
    <Box alignSelf="center" direction="row" gap="small">
      {/* A negative delay starts the animation sooner. The first dot
      should begin animating before the second and so on. */}
      <Dot delay="-0.32s" />
      <Dot delay="-0.16s" />
      <Dot />
    </Box>
  </Box>
);

const grow = keyframes`
  0% {
    opacity: 0;
    transform: scale(.3);
  }
  20% {
    opacity: 1;
    transform: scale(1.15);
  }
  30% { transform: scale(.9); }
  45% { transform: scale(1.05); }
  55% { transform: scale(1); }
  100% { transform: scale(1); }  
`;

export const GrowCheckmark = styled(Checkmark)`
  position: absolute;
  align-self: center;
  animation: ${grow} 0.9s ease-in-out;
`;

export const StyledBusyContents = styled.div`
  opacity: ${(props) => (props.animating ? 0 : 1)};}
`;
