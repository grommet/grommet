// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { useThemeValue } from '../../utils/useThemeValue';
import { useStepTheme } from './utils';

import { useStepper, useStepItem } from './StepperContext';
import { StyledIndicator } from './StyledStepper';

const getMetricSize = (theme, size) =>
  theme.global?.edgeSize?.[size] || size;

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
  const { theme, passThemeFlag } = useThemeValue();

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

  // Convert the icon-related size to a width and height for a box.
  // T-shirt sizes for Box are
  const indicatorSizeToken = indicatorTheme?.size || 'medium';
  const sizeMetric = getMetricSize(theme, indicatorSizeToken);

  return (
    <StyledIndicator
      stepTheme={stepTheme}
      isClickable={isClickable}
      width={{ width: sizeMetric, max: sizeMetric }}
      height={{ height: sizeMetric, max: sizeMetric }}
      {...boxProps}
      {...passThemeFlag}
      {...rest}
    >
      {renderIcon(icon, { size: iconSize })}
    </StyledIndicator>
  );
};
