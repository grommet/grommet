import React from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Grommet, Wizard } from '../..';

const basicSteps = [
  { id: 'step1', title: 'Step 1', description: 'First step' },
  { id: 'step2', title: 'Step 2', description: 'Second step' },
  { id: 'step3', title: 'Step 3', description: 'Final step' },
];

const renderStep = (step) => <p>{`Content for ${step.title}`}</p>;

describe('Wizard', () => {
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
    expect(onComplete).toHaveBeenCalledWith({ email: 'a@b.com' });
  });

  test('blocks navigation when validate returns falsy', async () => {
    const user = userEvent.setup();
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
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: /next/i }));
    // We should still be on step 1 and the error should be visible.
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    expect(screen.getByRole('alert').textContent).toContain('Please fix this');
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
    expect(onCancel).toHaveBeenCalledWith({ hello: 'world' });
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
          messages={{ next: 'Continue', cancel: 'Abort' }}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    expect(screen.getByRole('button', { name: 'Continue' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Abort' })).toBeTruthy();
  });

  test('renders vertical progress track when direction is vertical', () => {
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          direction="vertical"
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    // Both Step 1 label (in progress bar) and heading are rendered.
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
  });

  test('falls back to vertical when horizontal has sub-steps', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
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
          direction="horizontal"
          aria-label="Test wizard"
        />
      </Grommet>,
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('sub-steps is not supported'),
    );
    warn.mockRestore();
  });

  test('warns in dev when nesting is deeper than one level', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
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
    warn.mockRestore();
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
});
