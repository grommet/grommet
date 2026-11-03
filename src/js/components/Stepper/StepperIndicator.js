// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { useThemeValue } from '../../utils/useThemeValue';
import { useStepTheme } from './utils';

import { useStepper, useStepItem } from './StepperContext';
import { StyledIndicator } from './StyledStepper';

const renderIcon = (Icon, props) => {
  if (!Icon) return null;
  const iconProps = {
    color: 'currentColor',
    ...props,
  };
  if (React.isValidElement(Icon)) {
    return React.cloneElement(Icon, {
      ...iconProps,
      'aria-hidden': true,
    });
  }
  return <Icon {...iconProps} aria-hidden />;
};

export const StepperIndicator = ({ ...rest }) => {
  const { clickableSteps } = useStepper();
  const { passThemeFlag } = useThemeValue();

  const { step, isSubStep } = useStepItem();
  const stepTheme = useStepTheme(step, isSubStep);
  if (!step) return null;

  const isDisabled = step.status === 'disabled';
  const isClickable = clickableSteps && !isDisabled;

  // grab the icon pieces and size. Size will be handled
  // in the StyledIndicator component but we pull it out
  // here to leave other props as boxProps
  const indicatorTheme = stepTheme?.indicator || {};
  const { color, icon, iconSize, size, ...boxProps } = indicatorTheme;

  return (
    <StyledIndicator
      stepTheme={stepTheme}
      isClickable={isClickable}
      {...boxProps}
      {...passThemeFlag}
      {...rest}
    >
      {renderIcon(icon, { size: iconSize })}
    </StyledIndicator>
  );
};
