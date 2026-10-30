// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled, { css } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { useThemeValue } from '../../utils/useThemeValue';
import { useStepper, useStepItem } from './StepperContext';
import { StyledConnector } from './StyledStepper';
import { resolveStepTheme } from './utils';

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

export const StepConnector = ({ children }) => {
  const { currentStep, direction } = useStepper();
  const { theme, passThemeFlag } = useThemeValue();

  const { step, isSubStep } = useStepItem();
  if (!step) return null;

  const stepTheme = resolveStepTheme(
    theme,
    direction,
    step,
    isSubStep,
    currentStep,
  );

  return (
    <StyledStepConnectorGroup direction={direction} {...passThemeFlag}>
      <StyledConnector
        direction={direction}
        status={step.status}
        aria-hidden="true"
        isBetween
        stepTheme={stepTheme}
        {...passThemeFlag}
      />
      {children}
    </StyledStepConnectorGroup>
  );
};
