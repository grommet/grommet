import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { FormCheckmark } from 'grommet-icons/icons/FormCheckmark';
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
  width: 8px;
  height: 8px;
  background-color: ;
  ${(props) => props.color && `background-color: ${props.color};`}
  border-radius: 100%;
  display: inline-block;
  ${bounceDelayRule}
  ${(props) => props.delay && `animation-delay: ${props.delay};`}
`;

export const EllipsisAnimation = ({ color }) => (
  <Box
    style={{ position: 'absolute' }}
    fill
    alignContent="center"
    justify="center"
  >
    <Box alignSelf="center" direction="row" gap="small">
      <Dot color={color} delay="-0.32s" />
      <Dot color={color} delay="-0.16s" />
      <Dot color={color} />
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

export const GrowCheckmark = styled(FormCheckmark)`
  position: absolute;
  align-self: center;
  animation: ${grow} 0.9s ease-in-out;
`;

export const StyledBusyContents = styled.div`
  opacity: ${(props) =>
    props.busy === 'loading' || props.busy === 'success' ? 0 : 1};}
`;
