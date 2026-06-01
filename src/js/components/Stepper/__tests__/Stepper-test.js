import React from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { render, fireEvent, act } from '@testing-library/react';

import { Grommet, Stepper } from '../..';

describe('Stepper', () => {
  const basicSteps = [
    { id: 'step1', title: 'Step 1', status: 'pending' },
    { id: 'step2', title: 'Step 2', status: 'pending' },
    { id: 'step3', title: 'Step 3', status: 'pending' },
  ];

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Stepper
          steps={basicSteps}
          currentStep="step1"
          aria-label="Test stepper"
        />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('renders horizontal steps', () => {
    const { container, getByText } = render(
      <Grommet>
        <Stepper
          steps={basicSteps}
          currentStep="step1"
          direction="horizontal"
        />
      </Grommet>,
    );

    expect(getByText('Step 1')).toBeTruthy();
    expect(getByText('Step 2')).toBeTruthy();
    expect(getByText('Step 3')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders vertical steps', () => {
    const { container, getByText } = render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step2" direction="vertical" />
      </Grommet>,
    );

    expect(getByText('Step 1')).toBeTruthy();
    expect(getByText('Step 2')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders completed state with checkmark', () => {
    const steps = [
      { id: 'step1', title: 'Step 1', status: 'completed' },
      { id: 'step2', title: 'Step 2', status: 'pending' },
    ];
    const { container } = render(
      <Grommet>
        <Stepper steps={steps} currentStep="step2" />
      </Grommet>,
    );

    // Checkmark SVG should be rendered for completed step
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  test('renders error state with message', () => {
    const steps = [
      { id: 'step1', title: 'Step 1', status: 'completed' },
      {
        id: 'step2',
        title: 'Step 2',
        status: 'error',
        errorMessage: 'Card invalid',
      },
    ];
    const { getByText } = render(
      <Grommet>
        <Stepper steps={steps} currentStep="step2" />
      </Grommet>,
    );

    expect(getByText('Card invalid')).toBeTruthy();
  });

  test('renders disabled step with reason', () => {
    const steps = [
      { id: 'step1', title: 'Step 1', status: 'pending' },
      {
        id: 'step2',
        title: 'Step 2',
        status: 'disabled',
        disabledReason: 'Complete step 1 first',
      },
    ];
    const { getByText } = render(
      <Grommet>
        <Stepper steps={steps} currentStep="step1" />
      </Grommet>,
    );

    expect(getByText('Complete step 1 first')).toBeTruthy();
  });

  test('fires onStepClick when clicking enabled step', () => {
    const onStepClick = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Stepper
          steps={basicSteps}
          currentStep="step1"
          onStepClick={onStepClick}
        />
      </Grommet>,
    );

    fireEvent.click(getByLabelText(/Step 2 of 3/));
    expect(onStepClick).toHaveBeenCalledWith('step2');
  });

  test('does not fire onStepClick when clicking disabled step', () => {
    const onStepClick = jest.fn();
    const steps = [
      { id: 'step1', title: 'Step 1', status: 'pending' },
      { id: 'step2', title: 'Step 2', status: 'disabled' },
    ];
    const { getByLabelText } = render(
      <Grommet>
        <Stepper steps={steps} currentStep="step1" onStepClick={onStepClick} />
      </Grommet>,
    );

    fireEvent.click(getByLabelText(/Step 2 of 2/));
    expect(onStepClick).not.toHaveBeenCalled();
  });

  test('does not fire onStepClick when clickableSteps is false', () => {
    const onStepClick = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Stepper
          steps={basicSteps}
          currentStep="step1"
          clickableSteps={false}
          onStepClick={onStepClick}
        />
      </Grommet>,
    );

    fireEvent.click(getByLabelText(/Step 2 of 3/));
    expect(onStepClick).not.toHaveBeenCalled();
  });

  test('keyboard navigation - arrow right moves focus', () => {
    const { getByLabelText } = render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step1" />
      </Grommet>,
    );

    const step1 = getByLabelText(/Step 1 of 3/);
    step1.focus();
    fireEvent.keyDown(step1, { key: 'ArrowRight' });

    const step2 = getByLabelText(/Step 2 of 3/);
    expect(document.activeElement).toBe(step2);
  });

  test('keyboard navigation - Home and End', () => {
    const { getByLabelText } = render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step2" />
      </Grommet>,
    );

    const step2 = getByLabelText(/Step 2 of 3/);
    step2.focus();
    fireEvent.keyDown(step2, { key: 'End' });

    const step3 = getByLabelText(/Step 3 of 3/);
    expect(document.activeElement).toBe(step3);

    fireEvent.keyDown(step3, { key: 'Home' });
    const step1 = getByLabelText(/Step 1 of 3/);
    expect(document.activeElement).toBe(step1);
  });

  test('Enter activates focused step', () => {
    const onStepClick = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Stepper
          steps={basicSteps}
          currentStep="step1"
          onStepClick={onStepClick}
        />
      </Grommet>,
    );

    const step2 = getByLabelText(/Step 2 of 3/);
    act(() => step2.focus());
    fireEvent.keyDown(step2, { key: 'Enter' });
    expect(onStepClick).toHaveBeenCalledWith('step2');
  });

  test('Space activates focused step', () => {
    const onStepClick = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Stepper
          steps={basicSteps}
          currentStep="step1"
          onStepClick={onStepClick}
        />
      </Grommet>,
    );

    const step2 = getByLabelText(/Step 2 of 3/);
    act(() => step2.focus());
    fireEvent.keyDown(step2, { key: ' ' });
    expect(onStepClick).toHaveBeenCalledWith('step2');
  });

  test('aria-current is set on current step', () => {
    const { getByLabelText } = render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step2" />
      </Grommet>,
    );

    const step2 = getByLabelText(/Step 2 of 3/);
    expect(step2.getAttribute('aria-current')).toBe('step');

    const step1 = getByLabelText(/Step 1 of 3/);
    expect(step1.getAttribute('aria-current')).toBeNull();
  });

  test('aria-disabled is set on disabled step', () => {
    const steps = [
      { id: 'step1', title: 'Step 1', status: 'pending' },
      { id: 'step2', title: 'Step 2', status: 'disabled' },
    ];
    const { getByLabelText } = render(
      <Grommet>
        <Stepper steps={steps} currentStep="step1" />
      </Grommet>,
    );

    const step2 = getByLabelText(/Step 2 of 2/);
    expect(step2.getAttribute('aria-disabled')).toBe('true');
  });

  test('renders nested sub-steps', () => {
    const steps = [
      {
        id: 'account',
        title: 'Account Setup',
        children: [
          { id: 'email', title: 'Email', status: 'completed' },
          { id: 'password', title: 'Password', status: 'pending' },
        ],
      },
      { id: 'confirm', title: 'Confirm', status: 'pending' },
    ];
    const { getByText } = render(
      <Grommet>
        <Stepper steps={steps} currentStep="email" direction="vertical" />
      </Grommet>,
    );

    expect(getByText('Account Setup')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
  });

  test('parent step is highlighted when a child is current', () => {
    const steps = [
      {
        id: 'setup',
        title: 'Setup',
        status: 'pending',
        children: [
          { id: 'sub1', title: 'Sub 1', status: 'completed' },
          { id: 'sub2', title: 'Sub 2', status: 'pending' },
        ],
      },
      { id: 'done', title: 'Done', status: 'pending' },
    ];
    const { getByLabelText } = render(
      <Grommet>
        <Stepper steps={steps} currentStep="sub2" direction="vertical" />
      </Grommet>,
    );

    // Parent should have aria-current="step" when child is current
    const parent = getByLabelText(/Setup/);
    expect(parent.getAttribute('aria-current')).toBe('step');

    // The current child should also have aria-current
    const child = getByLabelText(/Sub 2/);
    expect(child.getAttribute('aria-current')).toBe('step');

    // Non-current sibling step should not
    const done = getByLabelText(/Done/);
    expect(done.getAttribute('aria-current')).toBeNull();
  });

  test('renders outside Grommet wrapper', () => {
    const { container } = render(
      <Stepper steps={basicSteps} currentStep="step1" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('warns when currentStep does not match any step id', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="invalid-id" />
      </Grommet>,
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('does not match any step id'),
    );
    consoleSpy.mockRestore();
  });

  test('warns when currentStep matches disabled step', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const steps = [
      { id: 'step1', title: 'Step 1', status: 'disabled' },
      { id: 'step2', title: 'Step 2', status: 'pending' },
    ];
    render(
      <Grommet>
        <Stepper steps={steps} currentStep="step1" />
      </Grommet>,
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('matches a disabled step'),
    );
    consoleSpy.mockRestore();
  });

  test('vertical direction uses ArrowDown/ArrowUp', () => {
    const { getByLabelText } = render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step1" direction="vertical" />
      </Grommet>,
    );

    const step1 = getByLabelText(/Step 1 of 3/);
    step1.focus();
    fireEvent.keyDown(step1, { key: 'ArrowDown' });

    const step2 = getByLabelText(/Step 2 of 3/);
    expect(document.activeElement).toBe(step2);
  });

  test('keyboard navigation skips disabled steps', () => {
    const steps = [
      { id: 'step1', title: 'Step 1', status: 'completed' },
      { id: 'step2', title: 'Step 2', status: 'disabled' },
      { id: 'step3', title: 'Step 3', status: 'pending' },
    ];
    const { getByLabelText } = render(
      <Grommet>
        <Stepper steps={steps} currentStep="step3" />
      </Grommet>,
    );

    const step1 = getByLabelText(/Step 1 of 3/);
    act(() => step1.focus());
    fireEvent.keyDown(step1, { key: 'ArrowRight' });

    // Should skip disabled step2 and land on step3
    const step3 = getByLabelText(/Step 3 of 3/);
    expect(document.activeElement).toBe(step3);
  });

  test('Home and End skip disabled steps', () => {
    const steps = [
      { id: 'step1', title: 'Step 1', status: 'disabled' },
      { id: 'step2', title: 'Step 2', status: 'pending' },
      { id: 'step3', title: 'Step 3', status: 'pending' },
      { id: 'step4', title: 'Step 4', status: 'disabled' },
    ];
    const { getByLabelText } = render(
      <Grommet>
        <Stepper steps={steps} currentStep="step2" />
      </Grommet>,
    );

    const step2 = getByLabelText(/Step 2 of 4/);
    act(() => step2.focus());

    // End should skip disabled step4 and land on step3
    fireEvent.keyDown(step2, { key: 'End' });
    const step3 = getByLabelText(/Step 3 of 4/);
    expect(document.activeElement).toBe(step3);

    // Home should skip disabled step1 and land on step2
    fireEvent.keyDown(step3, { key: 'Home' });
    expect(document.activeElement).toBe(step2);
  });

  test('keyboard navigation wraps around skipping disabled steps', () => {
    const steps = [
      { id: 'step1', title: 'Step 1', status: 'pending' },
      { id: 'step2', title: 'Step 2', status: 'disabled' },
      { id: 'step3', title: 'Step 3', status: 'pending' },
    ];
    const { getByLabelText } = render(
      <Grommet>
        <Stepper steps={steps} currentStep="step3" />
      </Grommet>,
    );

    const step3 = getByLabelText(/Step 3 of 3/);
    act(() => step3.focus());
    // ArrowRight from last enabled should wrap to step1 (skip disabled step2)
    fireEvent.keyDown(step3, { key: 'ArrowRight' });

    const step1 = getByLabelText(/Step 1 of 3/);
    expect(document.activeElement).toBe(step1);
  });
});
