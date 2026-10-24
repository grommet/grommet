// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled, { css } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { useThemeValue } from '../../utils/useThemeValue';

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

// Layout wrapper for a parent step's sub-steps list. The connecting line
// into the sub-steps is rendered by the parent's own StyledConnector
// (sibling in StepperStep), which stays anchored to the indicator
// regardless of how tall this group's content grows.
export const StepConnector = ({ direction, children }) => {
  const { passThemeFlag } = useThemeValue();

  return (
    <StyledStepConnectorGroup direction={direction} {...passThemeFlag}>
      {children}
    </StyledStepConnectorGroup>
  );
};
