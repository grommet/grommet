// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';

import {
  Button,
  Grommet,
  Wizard,
  WizardContent,
  WizardFooter,
  WizardProgress,
  WizardStepHeader,
} from '../..';
import type { WizardProps, WizardStep } from '..';

const steps: WizardStep[] = [
  { id: 'intro', title: 'Introduction', skippable: true },
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
      { id: 'address', title: 'Address' },
    ],
  },
  { id: 'review', title: 'Review' },
];

// Explicit composition keeps the progress rail visible at any viewport size.
const Example = (props: Partial<WizardProps>) => (
  <Grommet>
    <Wizard
      steps={steps}
      form={false}
      scrollToTop={false}
      closable={false}
      clickableSteps
      showProgress="vertical"
      aria-label="Setup wizard"
      renderStep={(step, wizard) => (
        <>
          <p>{`Content for ${step.title}`}</p>
          <Button
            label="Jump to profile"
            onClick={() => wizard.goTo('profile')}
          />
          <Button
            label="Jump to review"
            onClick={() => wizard.goTo('review')}
          />
        </>
      )}
      {...props}
    >
      <WizardProgress aria-label="Setup progress" />
      <WizardStepHeader />
      <WizardContent />
      <WizardFooter />
    </Wizard>
  </Grommet>
);

const rail = () => within(screen.getByRole('list', { name: 'Setup progress' }));

const expectPage = (title: string, index: number) => {
  expect(screen.getByRole('heading', { name: title })).toBeTruthy();
  // Wizard counters describe navigable leaves, not aggregate parent rows.
  expect(screen.getByText(`Step ${index} of 6`)).toBeTruthy();
};

describe('Wizard progressive substeps', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('has no accessibility violations with hidden and revealed children', async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(await axe(container)).toHaveNoViolations();
  });

  test('next visits children in order before continuing to the next parent', async () => {
    const user = userEvent.setup();
    render(<Example />);
    expectPage('Introduction', 1);
    expect(rail().getAllByRole('button')).toHaveLength(4);
    expect(rail().queryByRole('button', { name: /: Email$/ })).toBeNull();
    expect(rail().queryByRole('button', { name: /: Card$/ })).toBeNull();

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expectPage('Email', 2);
    expect(rail().getByRole('button', { name: /: Account$/ })).toBeTruthy();
    expect(rail().getByRole('button', { name: /: Profile$/ })).toBeTruthy();
    expect(rail().queryByRole('button', { name: /: Card$/ })).toBeNull();

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expectPage('Profile', 3);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expectPage('Card', 4);
    expect(rail().getAllByRole('button')).toHaveLength(8);
    expect(rail().getByRole('button', { name: /: Email$/ })).toBeTruthy();
    expect(rail().getByRole('button', { name: /: Billing$/ })).toBeTruthy();
    expect(rail().getByRole('button', { name: /: Address$/ })).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expectPage('Address', 5);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expectPage('Review', 6);
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expectPage('Address', 5);
    expect(rail().getAllByRole('button')).toHaveLength(8);
  });

  test('goTo a non-first child reveals all siblings and keeps them on return', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Jump to profile' }));
    expectPage('Profile', 3);
    expect(rail().getAllByRole('button')).toHaveLength(6);
    expect(rail().getByRole('button', { name: /: Email$/ })).toBeTruthy();
    await user.click(rail().getByRole('button', { name: /: Introduction$/ }));
    expectPage('Introduction', 1);
    expect(rail().getAllByRole('button')).toHaveLength(6);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expectPage('Email', 2);
  });

  test('skip into a child reveals its parent group', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    render(<Example onStepChange={onStepChange} />);
    await user.click(screen.getByRole('button', { name: 'Skip' }));
    expectPage('Email', 2);
    expect(rail().getAllByRole('button')).toHaveLength(6);
    expect(rail().getByRole('button', { name: /: Account$/ })).toBeTruthy();
    expect(rail().getByRole('button', { name: /: Profile$/ })).toBeTruthy();
    expect(onStepChange).toHaveBeenCalledWith({
      trigger: 'skip',
      phase: 'navigated',
      from: 'intro',
      to: 'email',
    });
  });

  test('clicking an unrevealed parent navigates to its first enabled child', async () => {
    const user = userEvent.setup();
    const withDisabledChild = steps.map((step) =>
      step.id === 'billing'
        ? {
            ...step,
            children: [
              { id: 'card', title: 'Card', disabled: true },
              { id: 'address', title: 'Address' },
            ],
          }
        : step,
    );
    render(<Example steps={withDisabledChild} />);
    await user.click(rail().getByRole('button', { name: /: Billing$/ }));
    expectPage('Address', 5);
    expect(
      rail()
        .getByRole('button', { name: /: Card$/ })
        .getAttribute('aria-disabled'),
    ).toBe('true');
    expect(rail().queryByRole('button', { name: /: Email$/ })).toBeNull();
  });

  test('failed navigation does not reveal the requested child group', async () => {
    const user = userEvent.setup();
    const invalidSteps = [
      { ...steps[0], skippable: false, validate: () => false },
      ...steps.slice(1),
    ];
    render(<Example steps={invalidSteps} />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expectPage('Introduction', 1);
    await user.click(screen.getByRole('button', { name: 'Jump to profile' }));
    expectPage('Introduction', 1);
    expect(rail().getAllByRole('button')).toHaveLength(4);
    expect(rail().queryByRole('button', { name: /: Email$/ })).toBeNull();
  });

  test('initial parent group shows its first child and siblings', () => {
    render(<Example steps={steps.slice(1)} />);
    expect(screen.getByRole('heading', { name: 'Email' })).toBeTruthy();
    expect(rail().getAllByRole('button')).toHaveLength(5);
    expect(rail().getByRole('button', { name: /: Profile$/ })).toBeTruthy();
    expect(rail().queryByRole('button', { name: /: Card$/ })).toBeNull();
  });

  test.each(['Next', 'Skip'])(
    '%s can branch to a non-first child',
    async (action) => {
      const user = userEvent.setup();
      const branchingSteps = [
        { ...steps[0], nextStep: () => 'profile' },
        ...steps.slice(1),
      ];
      render(<Example steps={branchingSteps} />);
      await user.click(screen.getByRole('button', { name: action }));
      expectPage('Profile', 3);
      expect(rail().getAllByRole('button')).toHaveLength(6);
      expect(rail().getByRole('button', { name: /: Email$/ })).toBeTruthy();
      expect(rail().queryByRole('button', { name: /: Card$/ })).toBeNull();
    },
  );

  test('controlled requests reveal only when currentStep changes', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    const { rerender } = render(
      <Example currentStep="intro" onStepChange={onStepChange} />,
    );
    await user.click(screen.getByRole('button', { name: 'Jump to profile' }));
    expect(onStepChange).toHaveBeenCalledWith({
      trigger: 'goTo',
      phase: 'navigated',
      from: 'intro',
      to: 'profile',
    });
    expect(rail().getAllByRole('button')).toHaveLength(4);
    rerender(<Example currentStep="profile" onStepChange={onStepChange} />);
    expect(rail().getAllByRole('button')).toHaveLength(6);
    rerender(<Example currentStep="intro" onStepChange={onStepChange} />);
    expect(rail().getAllByRole('button')).toHaveLength(6);
  });

  test('initial and externally controlled children reveal persistently', () => {
    const { rerender } = render(<Example currentStep="profile" />);
    expectPage('Profile', 3);
    expect(rail().getAllByRole('button')).toHaveLength(6);
    rerender(<Example currentStep="review" />);
    expect(rail().getAllByRole('button')).toHaveLength(6);
    rerender(<Example currentStep="address" />);
    rerender(<Example currentStep="intro" />);
    expectPage('Introduction', 1);
    expect(rail().getAllByRole('button')).toHaveLength(8);
  });

  test('revealed groups persist when progress is hidden and shown again', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Jump to profile' }));
    expect(rail().getAllByRole('button')).toHaveLength(6);

    rerender(<Example showProgress={false} />);
    expect(screen.queryByRole('list', { name: 'Setup progress' })).toBeNull();
    expect(
      screen.getByRole('list', { name: 'Setup progress', hidden: true }),
    ).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Jump to review' }));
    expectPage('Review', 6);

    rerender(<Example showProgress="vertical" />);
    expect(rail().getAllByRole('button')).toHaveLength(6);
    expect(rail().getByRole('button', { name: /: Email$/ })).toBeTruthy();
    expect(rail().getByRole('button', { name: /: Profile$/ })).toBeTruthy();
  });

  test('non-clickable progress also reveals on navigation', async () => {
    const user = userEvent.setup();
    render(<Example clickableSteps={false} />);
    expect(rail().getAllByRole('group')).toHaveLength(4);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expectPage('Email', 2);
    expect(rail().getAllByRole('group')).toHaveLength(6);
    expect(rail().queryByRole('button')).toBeNull();
  });
});
