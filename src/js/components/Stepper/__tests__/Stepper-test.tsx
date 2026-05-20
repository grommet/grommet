import React from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { axe } from 'jest-axe';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Grommet, Stepper } from '../..';

const basicSteps = [
  { id: 'step1', title: 'Account', status: 'completed' as const },
  { id: 'step2', title: 'Profile', status: 'pending' as const },
  { id: 'step3', title: 'Review', status: 'pending' as const },
];

const nestedSteps = [
  {
    id: 'parent',
    title: 'Parent',
    children: [
      { id: 'child-1', title: 'Child One', status: 'pending' as const },
      { id: 'child-2', title: 'Child Two', status: 'pending' as const },
    ],
  },
  { id: 'final', title: 'Final', status: 'pending' as const },
];

const deepNestedSteps = [
  {
    id: 'parent',
    title: 'Parent',
    children: [
      {
        id: 'child',
        title: 'Child',
        status: 'pending' as const,
        children: [
          { id: 'grandchild', title: 'Grandchild', status: 'pending' as const },
        ],
      },
    ],
  },
  { id: 'final', title: 'Final', status: 'pending' as const },
];

describe('Stepper', () => {
  test('should have no accessibility violations', async () => {
    const { container, asFragment } = render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step2" />
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders in vertical direction', () => {
    const { asFragment } = render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step1" direction="vertical" />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders without Grommet wrapper', () => {
    const { asFragment } = render(
      <Stepper steps={basicSteps} currentStep="step1" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders all step states', () => {
    const steps = [
      { id: 's1', title: 'Pending', status: 'pending' as const },
      { id: 's2', title: 'Completed', status: 'completed' as const },
      {
        id: 's3',
        title: 'Error',
        status: 'error' as const,
        errorMessage: 'Fix this.',
      },
      {
        id: 's4',
        title: 'Disabled',
        status: 'disabled' as const,
        disabledReason: 'Not yet.',
      },
    ];
    const { asFragment } = render(
      <Grommet>
        <Stepper steps={steps} currentStep="s1" />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('current step has aria-current="step"', () => {
    render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step2" />
      </Grommet>,
    );
    // The button for the current step should have aria-current="step"
    const currentBtn = screen.getByRole('button', {
      name: /Step 2 of 3: Profile/,
    });
    expect(currentBtn).toHaveAttribute('aria-current', 'step');
  });

  test('non-current steps do not have aria-current', () => {
    render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step2" />
      </Grommet>,
    );
    const btn1 = screen.getByRole('button', { name: /Step 1 of 3: Account/ });
    expect(btn1).not.toHaveAttribute('aria-current');
  });

  test('disabled step has aria-disabled="true"', () => {
    const steps = [
      { id: 's1', title: 'Account', status: 'completed' as const },
      {
        id: 's2',
        title: 'Confirm',
        status: 'disabled' as const,
        disabledReason: 'Complete step 1 first.',
      },
    ];
    render(
      <Grommet>
        <Stepper steps={steps} currentStep="s1" />
      </Grommet>,
    );
    const disabledBtn = screen.getByRole('button', {
      name: /Step 2 of 2: Confirm/,
    });
    expect(disabledBtn).toHaveAttribute('aria-disabled', 'true');
  });

  test('horizontal disabled step exposes disabledReason text via aria-describedby', () => {
    const steps = [
      { id: 's1', title: 'Account', status: 'pending' as const },
      {
        id: 's2',
        title: 'Confirm',
        status: 'disabled' as const,
        disabledReason: 'Complete step 1 first.',
      },
    ];

    render(
      <Grommet>
        <Stepper steps={steps} currentStep="s1" direction="horizontal" />
      </Grommet>,
    );

    const disabledBtn = screen.getByRole('button', {
      name: /Step 2 of 2: Confirm/,
    });
    expect(disabledBtn).toHaveAttribute(
      'aria-describedby',
      'stepper-reason-s2',
    );
    expect(screen.getByText('Complete step 1 first.')).toBeInTheDocument();
  });

  test('error step button has aria-describedby pointing to error text', () => {
    const steps = [
      {
        id: 's1',
        title: 'Billing',
        status: 'error' as const,
        errorMessage: 'Card number is invalid.',
      },
    ];
    render(
      <Grommet>
        <Stepper steps={steps} currentStep="s1" />
      </Grommet>,
    );
    const btn = screen.getByRole('button', { name: /Step 1 of 1: Billing/ });
    expect(btn).toHaveAttribute('aria-describedby', 'stepper-error-s1');
    expect(screen.getByText('Card number is invalid.')).toBeInTheDocument();
  });

  test('onStepClick fires for non-disabled clickable steps', async () => {
    const user = userEvent.setup();
    const onStepClick = jest.fn();
    render(
      <Grommet>
        <Stepper
          steps={basicSteps}
          currentStep="step2"
          onStepClick={onStepClick}
        />
      </Grommet>,
    );
    await user.click(
      screen.getByRole('button', { name: /Step 1 of 3: Account/ }),
    );
    expect(onStepClick).toHaveBeenCalledWith('step1');
  });

  test('onStepClick does NOT fire for disabled steps', async () => {
    const user = userEvent.setup();
    const onStepClick = jest.fn();
    const steps = [
      { id: 's1', title: 'Active', status: 'pending' as const },
      { id: 's2', title: 'Locked', status: 'disabled' as const },
    ];
    render(
      <Grommet>
        <Stepper steps={steps} currentStep="s1" onStepClick={onStepClick} />
      </Grommet>,
    );
    await user.click(
      screen.getByRole('button', { name: /Step 2 of 2: Locked/ }),
    );
    expect(onStepClick).not.toHaveBeenCalled();
  });

  test('onStepClick does NOT fire when clickableSteps is false', async () => {
    const user = userEvent.setup();
    const onStepClick = jest.fn();
    render(
      <Grommet>
        <Stepper
          steps={basicSteps}
          currentStep="step1"
          clickableSteps={false}
          onStepClick={onStepClick}
        />
      </Grommet>,
    );
    await user.click(
      screen.getByRole('button', { name: /Step 2 of 3: Profile/ }),
    );
    expect(onStepClick).not.toHaveBeenCalled();
  });

  test('arrow key moves focus to next step (horizontal)', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step1" />
      </Grommet>,
    );
    const btn1 = screen.getByRole('button', { name: /Step 1 of 3/ });
    await act(async () => {
      btn1.focus();
    });
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: /Step 2 of 3/ })).toHaveFocus();
  });

  test('arrow key moves focus to previous step (horizontal)', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step2" />
      </Grommet>,
    );
    // Tab into stepper so currentStep button has focus
    const btn2 = screen.getByRole('button', { name: /Step 2 of 3/ });
    await act(async () => {
      btn2.focus();
    });
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('button', { name: /Step 1 of 3/ })).toHaveFocus();
  });

  test('Home key moves focus to first step', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step3" />
      </Grommet>,
    );
    const btn3 = screen.getByRole('button', { name: /Step 3 of 3/ });
    await act(async () => {
      btn3.focus();
    });
    await user.keyboard('{Home}');
    expect(screen.getByRole('button', { name: /Step 1 of 3/ })).toHaveFocus();
  });

  test('End key moves focus to last step', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step1" />
      </Grommet>,
    );
    const btn1 = screen.getByRole('button', { name: /Step 1 of 3/ });
    await act(async () => {
      btn1.focus();
    });
    await user.keyboard('{End}');
    expect(screen.getByRole('button', { name: /Step 3 of 3/ })).toHaveFocus();
  });

  test('arrow keys can land on disabled steps for discoverability', async () => {
    const user = userEvent.setup();
    const steps = [
      { id: 's1', title: 'Active', status: 'pending' as const },
      { id: 's2', title: 'Locked', status: 'disabled' as const },
    ];
    render(
      <Grommet>
        <Stepper steps={steps} currentStep="s1" />
      </Grommet>,
    );
    const btn1 = screen.getByRole('button', { name: /Step 1 of 2/ });
    await act(async () => {
      btn1.focus();
    });
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: /Step 2 of 2/ })).toHaveFocus();
  });

  test('disabled step with focus does not activate on Enter', async () => {
    const user = userEvent.setup();
    const onStepClick = jest.fn();
    const steps = [
      { id: 's1', title: 'Active', status: 'pending' as const },
      { id: 's2', title: 'Locked', status: 'disabled' as const },
    ];
    render(
      <Grommet>
        <Stepper steps={steps} currentStep="s1" onStepClick={onStepClick} />
      </Grommet>,
    );
    const btn2 = screen.getByRole('button', { name: /Step 2 of 2/ });
    await act(async () => {
      btn2.focus();
    });
    await user.keyboard('{Enter}');
    expect(onStepClick).not.toHaveBeenCalled();
  });

  test('arrow key navigates vertical layout with Down/Up keys', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="step1" direction="vertical" />
      </Grommet>,
    );
    const btn1 = screen.getByRole('button', { name: /Step 1 of 3/ });
    await act(async () => {
      btn1.focus();
    });
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: /Step 2 of 3/ })).toHaveFocus();
  });

  test('warn in development when currentStep is invalid', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Grommet>
        <Stepper steps={basicSteps} currentStep="nonexistent" />
      </Grommet>,
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('does not match any step id'),
    );
    consoleSpy.mockRestore();
  });

  test('warn in development when currentStep is a disabled step', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const steps = [
      { id: 's1', title: 'Active', status: 'pending' as const },
      { id: 's2', title: 'Locked', status: 'disabled' as const },
    ];
    render(
      <Grommet>
        <Stepper steps={steps} currentStep="s2" />
      </Grommet>,
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('matches a disabled step'),
    );
    consoleSpy.mockRestore();
  });

  test('renders step descriptions', () => {
    const stepsWithDesc = [
      {
        id: 's1',
        title: 'Setup',
        description: 'Configure your environment.',
        status: 'pending' as const,
      },
    ];
    render(
      <Grommet>
        <Stepper steps={stepsWithDesc} currentStep="s1" />
      </Grommet>,
    );
    expect(screen.getByText('Configure your environment.')).toBeInTheDocument();
  });

  test('a11yTitle sets aria-label on the list', () => {
    const { container } = render(
      <Grommet>
        <Stepper
          steps={basicSteps}
          currentStep="step1"
          a11yTitle="Checkout steps"
        />
      </Grommet>,
    );
    const list = container.querySelector('ol');
    expect(list).toHaveAttribute('aria-label', 'Checkout steps');
  });

  test('shows only parents until first child entry, then reveals nested children', () => {
    const { rerender } = render(
      <Grommet>
        <Stepper steps={nestedSteps} currentStep="parent" />
      </Grommet>,
    );

    expect(
      screen.getByRole('button', { name: /Step 1 of 2: Parent/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Child One/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Child Two/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Step 2 of 2: Final/ }),
    ).toBeInTheDocument();

    rerender(
      <Grommet>
        <Stepper steps={nestedSteps} currentStep="child-1" />
      </Grommet>,
    );

    expect(
      screen.getByRole('button', { name: /Step 1 of 2: Child One/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Step 1 of 2: Child Two/ }),
    ).toBeInTheDocument();
  });

  test('horizontal keyboard traversal includes child sub-steps', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <Stepper steps={nestedSteps} currentStep="child-1" />
      </Grommet>,
    );

    const parentButton = screen.getByRole('button', {
      name: /Step 1 of 2: Parent/,
    });
    await act(async () => {
      parentButton.focus();
    });

    await user.keyboard('{ArrowRight}');
    expect(
      screen.getByRole('button', { name: /Step 1 of 2: Child One/ }),
    ).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(
      screen.getByRole('button', { name: /Step 1 of 2: Child Two/ }),
    ).toHaveFocus();
  });

  test('warns and ignores descendants beyond child level', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <Grommet>
        <Stepper steps={deepNestedSteps} currentStep="parent" />
      </Grommet>,
    );

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('at most two step levels'),
    );
    expect(
      screen.getByRole('button', { name: /Step 1 of 2: Parent/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Child/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Step 2 of 2: Final/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Grandchild/ }),
    ).not.toBeInTheDocument();

    warnSpy.mockRestore();
  });
});
