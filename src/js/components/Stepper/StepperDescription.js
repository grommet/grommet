// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef } from 'react';
import { Text } from '../Text';
import { useStepper, useStepItem, useStepperHelperRef } from './StepperContext';
import { useStepTheme } from './utils';

export const StepperDescription = forwardRef(({ ...rest }, forwardedRef) => {
  const { direction, showDescription } = useStepper();

  const { step, isSubStep, descriptionId } = useStepItem();
  const stepTheme = useStepTheme(step, isSubStep);
  const ref = useStepperHelperRef(
    'description',
    'id' in rest ? rest.id : descriptionId,
    forwardedRef,
  );
  if (!step || !step.description || !showDescription) return null;

  return (
    <Text
      ref={ref}
      truncate={direction === 'horizontal'}
      {...stepTheme.description}
      id={descriptionId}
      {...rest}
    >
      {step.description}
    </Text>
  );
});

StepperDescription.displayName = 'StepperDescription';
