// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';

import {
  Grommet,
  Stepper,
  StepperDescription,
  StepperDisabledReason,
  StepperError,
  StepperLabel,
  StepperStep,
} from '../..';
import type { StepType } from '..';

const steps: StepType[] = [
  {
    id: 'account',
    title: 'Account',
    status: 'error',
    description: 'Account details',
    errorMessage: 'Account error',
  },
  {
    id: 'billing',
    title: 'Billing',
    status: 'disabled',
    description: 'Billing details',
    disabledReason: 'Complete account first',
  },
];

const account = () => screen.getByRole('button', { name: /Account/ });
const billing = () => screen.getByRole('button', { name: /Billing/ });

const expectDescriptions = (element: HTMLElement, texts: string[]) => {
  const ids = element.getAttribute('aria-describedby')?.split(/\s+/) || [];
  expect(ids).toHaveLength(texts.length);
  expect(ids.map((id) => document.getElementById(id)?.textContent)).toEqual(
    texts,
  );
  expect(
    screen.getByRole('button', {
      name: element.getAttribute('aria-label') || '',
      description: texts.join(' '),
    }),
  ).toBe(element);
};

const NestedDescription = () => (
  <span>
    <StepperDescription />
  </span>
);

describe('Stepper helper text associations', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('has no accessibility violations for a partial composition', async () => {
    const { container } = render(
      <Grommet>
        <Stepper steps={steps} currentStep="account" aria-label="Progress">
          <StepperStep stepId="account">
            <StepperLabel />
            <NestedDescription />
          </StepperStep>
        </Stepper>
      </Grommet>,
    );

    expectDescriptions(account(), ['Account details']);
    expect(await axe(container)).toHaveNoViolations();
  });

  test('default layout associates all visible description and status text', () => {
    const { rerender } = render(
      <Grommet>
        <Stepper steps={steps} currentStep="account" />
      </Grommet>,
    );
    expectDescriptions(account(), ['Account details', 'Account error']);
    expectDescriptions(billing(), [
      'Billing details',
      'Complete account first',
    ]);

    rerender(
      <Grommet>
        <Stepper steps={steps} currentStep="account" showDescription={false} />
      </Grommet>,
    );
    expectDescriptions(account(), ['Account error']);
    expectDescriptions(billing(), ['Complete account first']);
  });

  test('only associates helpers included in each custom step', () => {
    render(
      <Grommet>
        <Stepper steps={steps} currentStep="account">
          <StepperStep stepId="account">
            <StepperLabel />
            <StepperError />
          </StepperStep>
          <StepperStep stepId="billing">
            <StepperLabel />
            <StepperDisabledReason />
          </StepperStep>
        </Stepper>
      </Grommet>,
    );
    expectDescriptions(account(), ['Account error']);
    expectDescriptions(billing(), ['Complete account first']);
    expect(screen.queryByText('Account details')).toBeNull();
    expect(screen.queryByText('Billing details')).toBeNull();
  });

  test('associates rendered helpers for read-only custom steps', () => {
    render(
      <Grommet>
        <Stepper steps={steps} currentStep="account" clickableSteps={false}>
          <StepperStep stepId="account">
            <StepperLabel />
            <NestedDescription />
          </StepperStep>
        </Stepper>
      </Grommet>,
    );
    const group = screen.getByRole('group', {
      name: /Account/,
      description: 'Account details',
    });
    const id = group.getAttribute('aria-describedby');
    expect(id).toBeTruthy();
    expect(document.getElementById(id as string)?.textContent).toBe(
      'Account details',
    );
  });

  test('updates associations when nested helpers and showDescription change', () => {
    const composition = (show: boolean, showDescription: boolean) => (
      <React.StrictMode>
        <Grommet>
          <Stepper
            steps={steps}
            currentStep="account"
            showDescription={showDescription}
          >
            <StepperStep stepId="account">
              <StepperLabel />
              {show && <NestedDescription />}
              <StepperError />
            </StepperStep>
          </Stepper>
        </Grommet>
      </React.StrictMode>
    );
    const { rerender } = render(composition(false, true));
    expectDescriptions(account(), ['Account error']);
    rerender(composition(true, true));
    expectDescriptions(account(), ['Account details', 'Account error']);
    rerender(composition(true, false));
    expectDescriptions(account(), ['Account error']);
    rerender(composition(true, true));
    expectDescriptions(account(), ['Account details', 'Account error']);
    rerender(composition(false, true));
    expectDescriptions(account(), ['Account error']);
  });

  test('updates associations when step data and status change', () => {
    const composition = (status: StepType['status'], description?: string) => (
      <Grommet>
        <Stepper
          steps={[{ ...steps[0], status, description }]}
          currentStep="account"
        >
          <StepperStep stepId="account">
            <StepperLabel />
            <StepperDescription />
            <StepperError />
            <StepperDisabledReason />
          </StepperStep>
        </Stepper>
      </Grommet>
    );
    const { rerender } = render(composition('error', 'Account details'));
    expectDescriptions(account(), ['Account details', 'Account error']);
    rerender(composition('pending'));
    expectDescriptions(account(), []);
    rerender(composition('error', 'Updated details'));
    expectDescriptions(account(), ['Updated details', 'Account error']);
  });

  test('updates associations when the status changes between error and disabled', () => {
    const composition = (status: StepType['status']) => (
      <Grommet>
        <Stepper
          steps={[
            { ...steps[0], status, disabledReason: 'Account locked' },
            { id: 'next', title: 'Next' },
          ]}
          currentStep="next"
        >
          <StepperStep stepId="account">
            <StepperLabel />
            <StepperDescription />
            <StepperError />
            <StepperDisabledReason />
          </StepperStep>
        </Stepper>
      </Grommet>
    );
    const { rerender } = render(composition('error'));
    expectDescriptions(account(), ['Account details', 'Account error']);
    rerender(composition('disabled'));
    expectDescriptions(account(), ['Account details', 'Account locked']);
    rerender(composition('error'));
    expectDescriptions(account(), ['Account details', 'Account error']);
  });

  test('switches between default and custom layouts without stale references', () => {
    const composition = (custom: boolean) => (
      <Grommet>
        <Stepper steps={steps} currentStep="account">
          <StepperStep stepId="account">
            {custom ? <StepperLabel /> : null}
          </StepperStep>
        </Stepper>
      </Grommet>
    );
    const { rerender } = render(composition(false));
    expectDescriptions(account(), ['Account details', 'Account error']);
    rerender(composition(true));
    expectDescriptions(account(), []);
    rerender(composition(false));
    expectDescriptions(account(), ['Account details', 'Account error']);
  });

  test('tracks multiple helper instances and their actual overridden IDs', () => {
    // The existing runtime API forwards Text props, including id.
    const Description = StepperDescription as React.ComponentType<{
      id: string;
    }>;
    const composition = (first: boolean, secondId: string) => (
      <Grommet>
        <Stepper steps={steps} currentStep="account">
          <StepperStep stepId="account">
            <StepperLabel />
            {first && <Description id="first-description" />}
            <Description id={secondId} />
          </StepperStep>
        </Stepper>
      </Grommet>
    );
    const { rerender } = render(composition(true, 'second-description'));
    expectDescriptions(account(), ['Account details', 'Account details']);
    expect(account().getAttribute('aria-describedby')).toBe(
      'first-description second-description',
    );
    rerender(composition(false, 'updated-description'));
    expectDescriptions(account(), ['Account details']);
    expect(account().getAttribute('aria-describedby')).toBe(
      'updated-description',
    );
  });
});
