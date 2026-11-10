// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';

import { Checkmark } from 'grommet-icons';
import type { ThemeType } from '../../../themes/base';
import { Grommet } from '../../Grommet';
import { Stepper, StepType } from '..';

type StepperThemeType = NonNullable<ThemeType['stepper']>;

const stepTheme: StepperThemeType = {
  indicator: {
    background: 'background-front',
    border: { color: 'brand', size: 'small' },
    elevation: 'small',
    height: 'small',
    margin: 'xsmall',
    pad: { horizontal: 'xsmall', vertical: 'small' },
    round: '50%',
    width: 'small',
    icon: Checkmark,
    iconSize: 'small',
    size: 'medium',
    color: 'brand',
    align: 'center',
    justify: 'center',
  },
  button: {
    background: 'background-front',
    border: { color: 'brand', size: 'small' },
    elevation: 'small',
    height: 'medium',
    margin: 'xsmall',
    pad: { horizontal: 'small', vertical: 'xsmall' },
    round: 'small',
    width: 'large',
    gap: '12px',
  },
  label: { color: 'text-strong', size: 'medium', weight: 600 },
  description: { color: 'text-weak', size: 'small', weight: 400 },
  errorText: { color: 'status-critical', size: 'small', weight: 600 },
  disabledReason: { color: 'text-weak', size: 'small', weight: 400 },
  children: {
    background: 'background-back',
    border: { color: 'border', size: 'small' },
    elevation: 'small',
    height: 'medium',
    margin: 'xsmall',
    pad: 'small',
    round: 'small',
    width: 'large',
    gap: '12px',
  },
  connector: { color: 'brand', thickness: 'small' },
  hover: {
    indicator: {
      background: 'status-warning',
      border: { color: 'status-warning' },
      elevation: 'small',
      height: 'medium',
      margin: 'xsmall',
      pad: 'xsmall',
      round: 'small',
      width: 'medium',
      color: 'text-strong',
      size: 'small',
      icon: Checkmark,
      iconSize: 'xsmall',
      align: 'center',
      justify: 'center',
    },
    label: { color: 'brand', size: 'small', weight: 700 },
  },
};

const stepperTheme: ThemeType = {
  stepper: {
    ...stepTheme,
    container: {
      background: 'background-front',
      border: { color: 'border', size: 'small' },
      elevation: 'small',
      height: 'large',
      margin: 'small',
      pad: 'small',
      round: 'small',
      width: 'large',
      gap: { row: 'small', column: 'medium' },
    },
    vertical: stepTheme,
    subStep: stepTheme,
    pending: stepTheme,
    current: stepTheme,
    currentCompleted: stepTheme,
    completed: stepTheme,
    error: stepTheme,
    currentError: stepTheme,
    disabled: stepTheme,
  },
};

const steps: StepType[] = [
  {
    id: 'configure',
    title: 'Configure',
    description: 'Configure settings.',
    status: 'completed',
    children: [{ id: 'review', title: 'Review', status: 'pending' }],
  },
  {
    id: 'deploy',
    title: 'Deploy',
    description: 'Deploy the application.',
    status: 'error',
    errorMessage: 'Deployment failed.',
  },
  {
    id: 'verify',
    title: 'Verify',
    status: 'disabled',
    disabledReason: 'Resolve the deployment failure first.',
  },
];

describe('Stepper theme types', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('has no accessibility violations with the full typed theme', async () => {
    const { container } = render(
      <Grommet theme={stepperTheme}>
        <Stepper
          direction="vertical"
          steps={steps}
          currentStep="review"
          onStepClick={() => {}}
          aria-label="Deployment progress"
        />
      </Grommet>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  test('renders steps and helper text with the full typed theme', () => {
    render(
      <Grommet theme={stepperTheme}>
        <Stepper
          direction="vertical"
          steps={steps}
          currentStep="review"
          onStepClick={() => {}}
          aria-label="Deployment progress"
        />
      </Grommet>,
    );

    expect(screen.getByText('Configure')).toBeTruthy();
    expect(screen.getByText('Review')).toBeTruthy();
    expect(screen.getByText('Deployment failed.')).toBeTruthy();
    expect(
      screen.getByText('Resolve the deployment failure first.'),
    ).toBeTruthy();
  });
});
