// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';

import { Grommet, Stepper } from '../..';
import { useStepper } from '..';
import type { StepperProps, StepType } from '..';

const steps: StepType[] = [
  { id: 'intro', title: 'Introduction' },
  {
    id: 'account',
    title: 'Account',
    children: [
      { id: 'email', title: 'Email' },
      { id: 'profile', title: 'Profile' },
    ],
  },
  {
    id: 'billing',
    title: 'Billing',
    children: [
      { id: 'card', title: 'Card' },
      { id: 'address', title: 'Address', status: 'disabled' },
    ],
  },
  { id: 'review', title: 'Review' },
];

const Example = (props: Partial<StepperProps>) => (
  <Grommet>
    <Stepper
      steps={steps}
      currentStep="intro"
      direction="vertical"
      aria-label="Setup progress"
      {...props}
    />
  </Grommet>
);

const button = (title: string) =>
  screen.getByRole('button', { name: new RegExp(`: ${title}$`) });

const expectRows = (titles: string[]) => {
  const rows = within(
    screen.getByRole('list', { name: 'Setup progress' }),
  ).getAllByRole('button');
  expect(rows.map((row) => row.getAttribute('aria-label'))).toEqual(
    titles.map(
      (title, index) => `Step ${index + 1} of ${titles.length}: ${title}`,
    ),
  );
  expect(rows.filter((row) => row.tabIndex === 0)).toHaveLength(1);
};

const OrderingProbe = () => {
  const { steps, stepIndex, isPriorStep, isAfterStep, canNavigateTo } =
    useStepper();
  return (
    <span>
      {[
        steps.map((step) => step.id).join(','),
        stepIndex('review'),
        steps[stepIndex('review')]?.id,
        canNavigateTo('email'),
        canNavigateTo('account'),
        isPriorStep('email'),
        isAfterStep('email'),
      ].join('|')}
    </span>
  );
};

const ParentNavigationProbe = () => {
  const { canNavigateTo } = useStepper();
  return <span>{String(canNavigateTo('account'))}</span>;
};

describe('Stepper child reveal', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('has no accessibility violations before or after revealing children', async () => {
    const { container, rerender } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
    rerender(<Example currentStep="profile" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  test('shows every parent but no children before entering a child', () => {
    const { rerender } = render(<Example />);
    expectRows(['Introduction', 'Account', 'Billing', 'Review']);
    expect(screen.queryByText('Email')).toBeNull();
    expect(screen.queryByText('Profile')).toBeNull();
    expect(screen.queryByText('Card')).toBeNull();
    expect(screen.queryByText('Address')).toBeNull();

    // A parent currentStep activates its first enabled child by default.
    rerender(<Example currentStep="account" />);
    expectRows([
      'Introduction',
      'Account',
      'Email',
      'Profile',
      'Billing',
      'Review',
    ]);
    expect(button('Email').getAttribute('aria-current')).toBe('step');
  });

  test('an initial current child reveals all siblings nested below its parent', () => {
    render(<Example currentStep="profile" />);
    expectRows([
      'Introduction',
      'Account',
      'Email',
      'Profile',
      'Billing',
      'Review',
    ]);
    const parentItem = button('Account').closest('li');
    expect(parentItem).not.toBeNull();
    const children = within(parentItem as HTMLElement).getByRole('list');
    expect(within(children).getAllByRole('button')).toEqual([
      button('Email'),
      button('Profile'),
    ]);
    expect(button('Account').getAttribute('aria-current')).toBe('step');
    expect(button('Profile').getAttribute('aria-current')).toBe('step');
    expect(button('Profile').tabIndex).toBe(0);
    expect(screen.queryByText('Card')).toBeNull();
  });

  test('activating a parent navigates to its first enabled child', async () => {
    const user = userEvent.setup();
    const onStepClick = jest.fn();
    render(<Example onStepClick={onStepClick} />);
    await user.click(button('Account'));
    expect(onStepClick).toHaveBeenCalledWith('email');
  });

  test('activating a parent skips disabled children and has no target if all are disabled', async () => {
    const user = userEvent.setup();
    const onStepClick = jest.fn();
    const disabledChildren = steps.map((step) =>
      step.id === 'account'
        ? {
            ...step,
            children: [
              { id: 'email', title: 'Email', status: 'disabled' as const },
              { id: 'profile', title: 'Profile' },
            ],
          }
        : step,
    );
    const allDisabledChildren = disabledChildren.map((step) =>
      step.id === 'account'
        ? {
            ...step,
            children: step.children?.map((child) => ({
              ...child,
              status: 'disabled' as const,
            })),
          }
        : step,
    );

    const { rerender } = render(
      <Example steps={disabledChildren} onStepClick={onStepClick} />,
    );
    await user.click(button('Account'));
    expect(onStepClick).toHaveBeenCalledWith('profile');
    rerender(<Example steps={disabledChildren} currentStep="account" />);
    expect(button('Profile').getAttribute('aria-current')).toBe('step');

    onStepClick.mockClear();
    rerender(<Example steps={allDisabledChildren} onStepClick={onStepClick} />);
    expect(button('Account').getAttribute('aria-disabled')).toBe('true');
    await user.click(button('Account'));
    expect(onStepClick).not.toHaveBeenCalled();
  });

  test.each(['email', 'removed'])(
    'falls back to the first enabled child when currentStep is %s',
    (currentStep) => {
      const disabledEmail = steps.slice(1).map((step) =>
        step.id === 'account'
          ? {
              ...step,
              children: [
                { id: 'email', title: 'Email', status: 'disabled' as const },
                { id: 'profile', title: 'Profile' },
              ],
            }
          : step,
      );
      render(
        <Example
          steps={disabledEmail}
          currentStep={currentStep === 'removed' ? 'removed' : 'email'}
        />,
      );
      expect(button('Profile').getAttribute('aria-current')).toBe('step');
      expect(button('Email').getAttribute('aria-disabled')).toBe('true');
    },
  );

  test('public context uses full step tree before revealing children', () => {
    render(
      <Grommet>
        <Stepper
          steps={steps}
          currentStep="intro"
          direction="vertical"
          aria-label="Setup progress"
        >
          <OrderingProbe />
        </Stepper>
      </Grommet>,
    );
    expect(
      screen.getByText(
        'intro,account,email,profile,billing,card,address,review|7|review|true|true|false|true',
      ),
    ).toBeTruthy();
  });

  test('canNavigateTo rejects a parent with only disabled children', () => {
    const allDisabledChildren = steps.map((step) =>
      step.id === 'account'
        ? {
            ...step,
            children: step.children?.map((child) => ({
              ...child,
              status: 'disabled' as const,
            })),
          }
        : step,
    );
    render(
      <Grommet>
        <Stepper
          steps={allDisabledChildren}
          currentStep="intro"
          direction="vertical"
          aria-label="Setup progress"
        >
          <ParentNavigationProbe />
        </Stepper>
      </Grommet>,
    );
    expect(screen.getByText('false')).toBeTruthy();
  });

  test('parent with only disabled children uses disabled visuals', () => {
    const allDisabledChildren = steps.map((step) =>
      step.id === 'account'
        ? {
            ...step,
            children: step.children?.map((child) => ({
              ...child,
              status: 'disabled' as const,
            })),
          }
        : step,
    );
    render(
      <Grommet
        theme={{
          stepper: {
            pending: { label: { color: '#123456' } },
            disabled: { label: { color: '#654321' } },
          },
        }}
      >
        <Stepper
          steps={allDisabledChildren}
          currentStep="intro"
          direction="vertical"
          aria-label="Setup progress"
        />
      </Grommet>,
    );
    const accountLabel = screen.getByText('Account');
    expect(window.getComputedStyle(accountLabel).color).toBe(
      'rgb(101, 67, 33)',
    );
  });

  test('remembers multiple revealed parents across controlled changes', () => {
    const { rerender } = render(<Example />);
    rerender(<Example currentStep="profile" />);
    rerender(<Example currentStep="review" />);
    expectRows([
      'Introduction',
      'Account',
      'Email',
      'Profile',
      'Billing',
      'Review',
    ]);
    rerender(<Example currentStep="card" />);
    // Recreating the tree must not reset reveal history.
    const recreated = steps.map((step) => ({
      ...step,
      children: step.children?.map((child) => ({ ...child })),
    }));
    rerender(<Example currentStep="intro" steps={recreated} />);
    expectRows([
      'Introduction',
      'Account',
      'Email',
      'Profile',
      'Billing',
      'Card',
      'Address',
      'Review',
    ]);
    expect(button('Account').getAttribute('aria-current')).toBeNull();
    expect(button('Billing').getAttribute('aria-current')).toBeNull();
  });

  test('arrows, Home, End and wrapping target visible rows only', async () => {
    const user = userEvent.setup();
    const onStepClick = jest.fn();
    render(<Example onStepClick={onStepClick} />);
    await user.tab();
    expect(document.activeElement).toBe(button('Introduction'));
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(button('Account'));
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(button('Billing'));
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(button('Review'));
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(button('Introduction'));
    await user.keyboard('{ArrowUp}');
    expect(document.activeElement).toBe(button('Review'));
    await user.keyboard('{Home}');
    expect(document.activeElement).toBe(button('Introduction'));
    await user.keyboard('{End}');
    expect(document.activeElement).toBe(button('Review'));
    expect(onStepClick).not.toHaveBeenCalled();
    expectRows(['Introduction', 'Account', 'Billing', 'Review']);
  });

  test('keeps the roving target by id when earlier groups reveal children', async () => {
    const user = userEvent.setup();
    const onStepClick = jest.fn();
    const { rerender } = render(<Example onStepClick={onStepClick} />);
    await user.tab();
    await user.keyboard('{ArrowDown}{ArrowDown}');
    expect(document.activeElement).toBe(button('Billing'));

    rerender(<Example currentStep="card" onStepClick={onStepClick} />);
    rerender(<Example currentStep="email" onStepClick={onStepClick} />);
    expect(document.activeElement).toBe(button('Billing'));
    expect(button('Billing').tabIndex).toBe(0);
    expect(button('Email').tabIndex).toBe(-1);
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(button('Card'));
    await user.keyboard('{Enter}');
    expect(onStepClick).toHaveBeenLastCalledWith('card');
    await user.keyboard('{ArrowDown}');
    // Visible disabled rows remain discoverable but cannot be activated.
    expect(document.activeElement).toBe(button('Address'));
    onStepClick.mockClear();
    await user.keyboard('{Enter}');
    expect(onStepClick).not.toHaveBeenCalled();
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(button('Review'));
    expectRows([
      'Introduction',
      'Account',
      'Email',
      'Profile',
      'Billing',
      'Card',
      'Address',
      'Review',
    ]);
  });

  test('retains a visible tab stop when the focused step is removed', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Example currentStep="email" />);
    await user.tab();
    expect(document.activeElement).toBe(button('Email'));
    rerender(<Example steps={steps.filter((step) => step.id !== 'account')} />);
    expectRows(['Introduction', 'Billing', 'Review']);
    expect(button('Introduction').tabIndex).toBe(0);
  });

  test('read-only progress reveals children without introducing tab targets', () => {
    const { rerender } = render(<Example clickableSteps={false} />);
    expect(screen.getAllByRole('group')).toHaveLength(4);
    rerender(<Example clickableSteps={false} currentStep="profile" />);
    rerender(<Example clickableSteps={false} currentStep="review" />);
    expect(screen.getAllByRole('group')).toHaveLength(6);
    expect(screen.queryByRole('button')).toBeNull();
    expect(
      screen.getByRole('group', { name: 'Step 4 of 6: Profile' }),
    ).toBeTruthy();
    expect(screen.queryByText('Card')).toBeNull();
  });
});
