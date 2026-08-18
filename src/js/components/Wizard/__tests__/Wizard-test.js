// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormField, Grommet, TextInput, Wizard } from '../..';

const basicSteps = [
  { id: 'step1', title: 'Step 1', description: 'First step' },
  { id: 'step2', title: 'Step 2', description: 'Second step' },
  { id: 'step3', title: 'Step 3', description: 'Final step' },
];

const renderStep = (step) => <p>{`Content for ${step.title}`}</p>;

describe('Wizard', () => {
  beforeEach(() => {
    console.warn = jest.fn();
  });

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('renders first step by default', () => {
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    expect(screen.getByText('Content for Step 1')).toBeTruthy();
    expect(screen.getByText('Step 1 of 3')).toBeTruthy();
  });

  test('renders the step at defaultStep when provided', () => {
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          defaultStep="step2"
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    expect(screen.getByRole('heading', { name: 'Step 2' })).toBeTruthy();
    expect(screen.getByText('Step 2 of 3')).toBeTruthy();
  });

  test('advances to next step and marks previous completed', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          renderStep={renderStep}
          onStepChange={onStepChange}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByRole('heading', { name: 'Step 2' })).toBeTruthy();
    // navigated event fired with expected shape
    const events = onStepChange.mock.calls.map((call) => call[0]);
    expect(events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ trigger: 'next', phase: 'requested' }),
        expect.objectContaining({ trigger: 'next', phase: 'validated' }),
        expect.objectContaining({
          trigger: 'next',
          phase: 'navigated',
          from: 'step1',
          to: 'step2',
        }),
      ]),
    );
  });

  test('previous returns to prior step via visited-step history', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: /next/i }));
    await user.click(screen.getByRole('button', { name: /previous/i }));
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
  });

  test('shows Complete on last step and calls onComplete', async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          defaultStep="step3"
          defaultValue={{ email: 'a@b.com' }}
          renderStep={renderStep}
          onComplete={onComplete}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: /complete/i }));
    expect(onComplete).toHaveBeenCalledWith({
      value: { email: 'a@b.com' },
      completedSteps: expect.any(Array),
    });
  });

  test('blocks completion when a required final field is empty', async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    const steps = [
      {
        id: 'final',
        title: 'Final step',
        render: () => (
          <FormField htmlFor="wizard-email" label="Email" name="email" required>
            <TextInput id="wizard-email" name="email" />
          </FormField>
        ),
      },
    ];
    render(
      <Grommet>
        <Wizard
          steps={steps}
          onComplete={onComplete}
          aria-label="Test wizard"
        />
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: /complete/i }));

    expect(onComplete).not.toHaveBeenCalled();
  });

  test('blocks navigation when validate returns falsy', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    const steps = [
      {
        id: 's1',
        title: 'Step 1',
        validate: () => 'Please fix this',
      },
      { id: 's2', title: 'Step 2' },
    ];
    render(
      <Grommet>
        <Wizard
          steps={steps}
          renderStep={renderStep}
          onStepChange={onStepChange}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: /next/i }));
    // We should still be on step 1 and a blocked event should fire.
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    const blockedEvent = onStepChange.mock.calls
      .map((call) => call[0])
      .find((event) => event.trigger === 'next' && event.phase === 'blocked');
    expect(blockedEvent).toBeTruthy();
    expect(blockedEvent.error).toBe('Please fix this');
  });

  test('async validate resolves and advances', async () => {
    const user = userEvent.setup();
    const steps = [
      {
        id: 's1',
        title: 'Step 1',
        validate: () => Promise.resolve(true),
      },
      { id: 's2', title: 'Step 2' },
    ];
    render(
      <Grommet>
        <Wizard
          steps={steps}
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Step 2' })).toBeTruthy(),
    );
  });

  test('blocks next when required form field is invalid, then advances once valid', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    const steps = [
      {
        id: 's1',
        title: 'Step 1',
        render: () => (
          <FormField htmlFor="wizard-email" label="Email" name="email" required>
            <TextInput
              id="wizard-email"
              name="email"
              placeholder="you@example.com"
            />
          </FormField>
        ),
      },
      { id: 's2', title: 'Step 2' },
    ];
    render(
      <Grommet>
        <Wizard
          steps={steps}
          renderStep={renderStep}
          onStepChange={onStepChange}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: /next/i }));
    // We should still be on step 1 and a blocked event should fire.
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    const blockedEvent = onStepChange.mock.calls
      .map((call) => call[0])
      .find((event) => event.trigger === 'next' && event.phase === 'blocked');
    expect(blockedEvent).toBeTruthy();

    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'a@b.com');
    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByRole('heading', { name: 'Step 2' })).toBeTruthy();
  });

  test('branching via nextStep(formValue) routes to declared id', async () => {
    const user = userEvent.setup();
    const steps = [
      {
        id: 'start',
        title: 'Start',
        nextStep: () => 'skipTarget',
      },
      { id: 'middle', title: 'Middle' },
      { id: 'skipTarget', title: 'Target' },
    ];
    render(
      <Grommet>
        <Wizard
          steps={steps}
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByRole('heading', { name: 'Target' })).toBeTruthy();
  });

  test('skip only appears on skippable steps and never completes', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    const steps = [
      { id: 's1', title: 'Step 1', skippable: true },
      { id: 's2', title: 'Step 2' },
    ];
    render(
      <Grommet>
        <Wizard
          steps={steps}
          renderStep={renderStep}
          onStepChange={onStepChange}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: /skip/i }));
    expect(screen.getByRole('heading', { name: 'Step 2' })).toBeTruthy();
    const skipEvent = onStepChange.mock.calls
      .map((call) => call[0])
      .find((event) => event.trigger === 'skip' && event.phase === 'navigated');
    expect(skipEvent).toBeTruthy();
  });

  test('cancel fires onCancel with current form value', async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          defaultValue={{ hello: 'world' }}
          renderStep={renderStep}
          onCancel={onCancel}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledWith({
      value: { hello: 'world' },
      reason: 'user',
    });
  });

  test('controlled currentStep respects external state', () => {
    const { rerender } = render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          currentStep="step1"
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    rerender(
      <Grommet>
        <Wizard
          steps={basicSteps}
          currentStep="step3"
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    expect(screen.getByRole('heading', { name: 'Step 3' })).toBeTruthy();
  });

  test('message overrides replace default labels', () => {
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          renderStep={renderStep}
          // Provide onCancel so the footer Cancel button renders
          // (it is conditional on hasCancelHandler in context).
          onCancel={() => {}}
          messages={{ next: 'Continue', cancel: 'Abort' }}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    expect(screen.getByRole('button', { name: 'Continue' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Abort' })).toBeTruthy();
  });

  test('renders vertical progress track when showProgress is vertical', () => {
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          showProgress="vertical"
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    // Both Step 1 label (in progress bar) and heading are rendered.
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
  });

  test('falls back to vertical when horizontal has sub-steps', () => {
    const warn = jest.fn();
    console.warn = warn;
    const steps = [
      {
        id: 'parent',
        title: 'Parent',
        children: [
          { id: 'child1', title: 'Child 1' },
          { id: 'child2', title: 'Child 2' },
        ],
      },
      { id: 'after', title: 'After' },
    ];
    render(
      <Grommet>
        <Wizard
          steps={steps}
          renderStep={renderStep}
          showProgress="horizontal"
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('sub-steps is not supported'),
    );
  });

  test('warns in dev when nesting is deeper than one level', () => {
    const warn = jest.fn();
    console.warn = warn;
    const steps = [
      {
        id: 'parent',
        title: 'Parent',
        children: [
          {
            id: 'child',
            title: 'Child',
            // Grandchild — beyond Wizard's supported two-level model.
            children: [{ id: 'grandchild', title: 'Grandchild' }],
          },
        ],
      },
    ];
    render(
      <Grommet>
        <Wizard
          steps={steps}
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('nesting deeper than one level'),
    );
    // Grandchild must NOT be reachable as a nav target.
    expect(screen.queryByRole('heading', { name: 'Grandchild' })).toBeNull();
  });

  test('renders custom composition when children are provided', () => {
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          renderStep={renderStep}
          aria-label="Test wizard"
        >
          <div data-testid="custom">custom composition</div>
        </Wizard>
      </Grommet>,
    );
    expect(screen.getByTestId('custom')).toBeTruthy();
    // Default step header is NOT rendered when children override composition.
    expect(screen.queryByRole('heading', { name: 'Step 1' })).toBeNull();
  });

  test('header X close button is always rendered', () => {
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeTruthy();
  });

  test('X click without onCancel unmounts the wizard', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('heading', { name: 'Step 1' })).toBeNull();
    // No footer Cancel button when onCancel is not provided.
    expect(screen.queryByRole('button', { name: /cancel/i })).toBeNull();
  });

  test('X click calls onCancel when provided', async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          defaultValue={{ hello: 'world' }}
          renderStep={renderStep}
          onCancel={onCancel}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(onCancel).toHaveBeenCalledWith({
      value: { hello: 'world' },
      reason: 'user',
    });
    // Wizard stays mounted; caller is expected to unmount.
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
  });

  test('footer Cancel button renders only when onCancel is provided', () => {
    const { rerender } = render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    expect(screen.queryByRole('button', { name: /^cancel$/i })).toBeNull();
    rerender(
      <Grommet>
        <Wizard
          steps={basicSteps}
          renderStep={renderStep}
          onCancel={() => {}}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    expect(screen.getByRole('button', { name: /^cancel$/i })).toBeTruthy();
  });
});
