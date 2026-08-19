// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled, { css } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { useThemeValue } from '../../utils/useThemeValue';
import { StyledConnector } from './StyledStepper';

const StyledStepConnectorGroup = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'direction',
})`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  overflow: visible;
  ${(props) =>
    props.direction === 'horizontal' &&
    css`
      align-items: center;
    `}
`;

export const StepConnector = ({ step, direction, children }) => {
  const { passThemeFlag } = useThemeValue();

  return (
    <StyledStepConnectorGroup direction={direction} {...passThemeFlag}>
      <StyledConnector
        direction={direction}
        status={step.status}
        aria-hidden="true"
        isBetween
        {...passThemeFlag}
      />
      {children}
    </StyledStepConnectorGroup>
  );
};
