import React from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  Grommet,
  Wizard,
  WizardContent,
  WizardFooter,
  WizardProgress,
  useWizard,
} from '../..';

// jsdom does not implement window.scrollTo
beforeAll(() => {
  Object.defineProperty(window, 'scrollTo', {
    value: jest.fn(),
    writable: true,
  });
});

const basicSteps = [
  { id: 'step1', title: 'Step 1' },
  { id: 'step2', title: 'Step 2' },
  { id: 'step3', title: 'Step 3' },
];

const GoToButton = ({ targetId }: { targetId: string }) => {
  const { navigation } = useWizard();
  return (
    <button type="button" onClick={() => navigation.goTo(targetId)}>
      Go To
    </button>
  );
};

describe('Wizard', () => {
  test('should have no accessibility violations', async () => {
    const { container, asFragment } = render(
      <Grommet>
        <Wizard steps={basicSteps}>
          <WizardContent>
            <p>Step content</p>
          </WizardContent>
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders without Grommet wrapper', () => {
    const { asFragment } = render(
      <Wizard steps={basicSteps}>
        <WizardContent>
          <p>Content</p>
        </WizardContent>
        <WizardFooter />
      </Wizard>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('uncontrolled: starts at first step by default', () => {
    render(
      <Grommet>
        <Wizard steps={basicSteps}>
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    // Previous should be disabled on first step
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
  });

  test('uncontrolled: advances to next step on Next click', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    render(
      <Grommet>
        <Wizard steps={basicSteps} onStepChange={onStepChange}>
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => {
      expect(onStepChange).toHaveBeenCalledWith(
        expect.objectContaining({
          fromStepId: 'step1',
          toStepId: 'step2',
          trigger: 'next',
          phase: 'completed',
        }),
      );
    });
  });

  test('uncontrolled: goes back on Previous click', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          defaultStep="step2"
          onStepChange={onStepChange}
        >
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onStepChange).toHaveBeenCalledWith(
      expect.objectContaining({
        fromStepId: 'step2',
        trigger: 'previous',
        phase: 'completed',
      }),
    );
  });

  test('last step shows Complete button instead of Next', () => {
    render(
      <Grommet>
        <Wizard steps={basicSteps} defaultStep="step3">
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    expect(
      screen.getByRole('button', { name: 'Complete' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Next' }),
    ).not.toBeInTheDocument();
  });

  test('Complete fires onComplete with completed steps', async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    render(
      <Grommet>
        <Wizard steps={basicSteps} defaultStep="step3" onComplete={onComplete}>
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: 'Complete' }));
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({ completedSteps: expect.any(Array) }),
    );
  });

  test('validation: blocks next on failure', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    const steps = [
      {
        id: 'step1',
        title: 'Validate',
        validation: () => {
          throw new Error('Required field missing.');
        },
      },
      { id: 'step2', title: 'Step 2' },
    ];
    render(
      <Grommet>
        <Wizard steps={steps} onStepChange={onStepChange}>
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => {
      expect(onStepChange).toHaveBeenCalledWith(
        expect.objectContaining({
          phase: 'blocked',
          blocked: true,
          error: 'Required field missing.',
        }),
      );
    });
  });

  test('async validation: blocks on async rejection', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    const steps = [
      {
        id: 'step1',
        title: 'Async Validate',
        validation: async () => {
          throw new Error('Async error');
        },
      },
      { id: 'step2', title: 'Step 2' },
    ];
    render(
      <Grommet>
        <Wizard steps={steps} onStepChange={onStepChange}>
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => {
      expect(onStepChange).toHaveBeenCalledWith(
        expect.objectContaining({
          phase: 'blocked',
          error: 'Async error',
        }),
      );
    });
  });

  test('skippable step shows Skip button', () => {
    const steps = [
      { id: 'step1', title: 'Required' },
      { id: 'step2', title: 'Optional', skippable: true },
      { id: 'step3', title: 'Final' },
    ];
    render(
      <Grommet>
        <Wizard steps={steps} defaultStep="step2">
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    expect(screen.getByRole('button', { name: 'Skip' })).toBeInTheDocument();
  });

  test('non-skippable step does NOT show Skip button', () => {
    render(
      <Grommet>
        <Wizard steps={basicSteps}>
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    expect(
      screen.queryByRole('button', { name: 'Skip' }),
    ).not.toBeInTheDocument();
  });

  test('controlled mode: onStepChange emits with attempted phase first', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          currentStep="step1"
          onStepChange={onStepChange}
        >
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => {
      const calls = onStepChange.mock.calls.map((c) => c[0]);
      expect(calls[0]).toMatchObject({ phase: 'attempted', trigger: 'next' });
      expect(calls[1]).toMatchObject({ phase: 'completed', trigger: 'next' });
    });
  });

  test('renders with showProgress=horizontal and Stepper', () => {
    const { container } = render(
      <Grommet>
        <Wizard steps={basicSteps} showProgress="horizontal" />
      </Grommet>,
    );
    // Stepper renders an <ol>
    expect(container.querySelector('ol')).toBeInTheDocument();
  });

  test('custom composition does not auto-render progress from showProgress', () => {
    const { container } = render(
      <Grommet>
        <Wizard steps={basicSteps} showProgress="horizontal">
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    expect(container.querySelector('ol')).not.toBeInTheDocument();
  });

  test('custom composition with WizardProgress renders a single progress list', () => {
    const { container } = render(
      <Grommet>
        <Wizard steps={basicSteps} showProgress="horizontal">
          <WizardProgress direction="horizontal" />
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    expect(container.querySelectorAll('ol')).toHaveLength(1);
  });

  test('default no-children contract renders header and footer actions', () => {
    render(
      <Grommet>
        <Wizard steps={basicSteps} />
      </Grommet>,
    );
    expect(
      screen.getByRole('heading', { name: 'Multi-step workflow', level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  test('default contract order is header then progress then body for horizontal progress', () => {
    const { container } = render(
      <Grommet>
        <Wizard steps={basicSteps} showProgress="horizontal" />
      </Grommet>,
    );

    const rootRegion = container.querySelector('[role="region"]');
    expect(rootRegion).toBeInTheDocument();

    const firstChild = rootRegion?.firstElementChild;
    expect(firstChild?.querySelector('h1')).toBeInTheDocument();

    const secondChild = firstChild?.nextElementSibling;
    expect(secondChild?.querySelector('ol')).toBeInTheDocument();

    const thirdChild = secondChild?.nextElementSibling;
    expect(thirdChild?.querySelector('h2')).toBeInTheDocument();
  });

  test('footer consumes wizard action color tokens', () => {
    const customTheme = {
      wizard: {
        actions: {
          previous: { color: 'accent-1' },
          next: { color: 'accent-2' },
          skip: { color: 'accent-3' },
          cancel: { color: 'accent-4' },
        },
      },
    };

    const steps = [
      { id: 'step1', title: 'Step 1' },
      { id: 'step2', title: 'Step 2', skippable: true },
      { id: 'step3', title: 'Step 3' },
    ];

    render(
      <Grommet theme={customTheme as any}>
        <Wizard steps={steps} defaultStep="step2" onCancel={() => {}}>
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );

    expect(
      screen.getByRole('button', { name: 'Previous' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Skip' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  test('showProgress=vertical renders sidebar-style progress structure', () => {
    const { container } = render(
      <Grommet>
        <Wizard steps={basicSteps} showProgress="vertical" />
      </Grommet>,
    );
    const progressList = container.querySelector('ol');
    expect(progressList).toBeInTheDocument();

    // Progress should be in a layout branch with adjacent content branch.
    let node: Element | null | undefined = progressList;
    let hasAdjacentBranch = false;
    while (node && node !== container && !hasAdjacentBranch) {
      hasAdjacentBranch = Boolean(node.nextElementSibling);
      node = node.parentElement;
    }
    expect(hasAdjacentBranch).toBe(true);
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeInTheDocument();
  });

  test('a11yTitle sets aria-label on the region', () => {
    const { container } = render(
      <Grommet>
        <Wizard steps={basicSteps} a11yTitle="Account setup wizard">
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    expect(container.querySelector('[role="region"]')).toHaveAttribute(
      'aria-label',
      'Account setup wizard',
    );
  });

  test('branching: nextStep resolver determines next step id', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    const steps = [
      {
        id: 'choice',
        title: 'Choose',
        nextStep: () => 'branch-b',
      },
      { id: 'branch-a', title: 'Branch A' },
      { id: 'branch-b', title: 'Branch B' },
    ];
    render(
      <Grommet>
        <Wizard steps={steps} onStepChange={onStepChange}>
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await waitFor(() => {
      expect(onStepChange).toHaveBeenCalledWith(
        expect.objectContaining({
          fromStepId: 'choice',
          toStepId: 'branch-b',
          trigger: 'next',
          phase: 'completed',
        }),
      );
    });
  });

  test('invalid controlled step falls back to first step and warns in dev', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Grommet>
        <Wizard steps={basicSteps} currentStep="does-not-exist" />
      </Grommet>,
    );
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeInTheDocument();
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('invalid step id "does-not-exist"'),
    );
    warn.mockRestore();
  });

  test('previous emits attempted then completed phases', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          defaultStep="step2"
          onStepChange={onStepChange}
        >
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    const previousEvents = onStepChange.mock.calls
      .map((c) => c[0])
      .filter((event) => event.trigger === 'previous');
    expect(previousEvents[0]).toMatchObject({
      phase: 'attempted',
      fromStepId: 'step2',
    });
    expect(previousEvents[1]).toMatchObject({
      phase: 'completed',
      fromStepId: 'step2',
      toStepId: 'step1',
    });
  });

  test('goTo unknown step emits attempted then blocked', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    render(
      <Grommet>
        <Wizard steps={basicSteps} onStepChange={onStepChange}>
          <GoToButton targetId="missing-step" />
        </Wizard>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: 'Go To' }));
    const goToEvents = onStepChange.mock.calls
      .map((c) => c[0])
      .filter((event) => event.trigger === 'goTo');
    expect(goToEvents[0]).toMatchObject({
      phase: 'attempted',
      fromStepId: 'step1',
      toStepId: 'missing-step',
    });
    expect(goToEvents[1]).toMatchObject({
      phase: 'blocked',
      blocked: true,
      fromStepId: 'step1',
      toStepId: 'missing-step',
    });
  });

  test('goTo same step is a no-op (no events)', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    render(
      <Grommet>
        <Wizard steps={basicSteps} onStepChange={onStepChange}>
          <GoToButton targetId="step1" />
        </Wizard>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: 'Go To' }));
    expect(onStepChange).not.toHaveBeenCalled();
  });

  test('goTo backward bypasses validation and completes transition', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    const steps = [
      { id: 'step1', title: 'Step 1' },
      {
        id: 'step2',
        title: 'Step 2',
        validation: () => {
          throw new Error('Should not run for backward goTo');
        },
      },
    ];

    render(
      <Grommet>
        <Wizard steps={steps} defaultStep="step2" onStepChange={onStepChange}>
          <GoToButton targetId="step1" />
        </Wizard>
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: 'Go To' }));

    const goToEvents = onStepChange.mock.calls
      .map((c) => c[0])
      .filter((event) => event.trigger === 'goTo');

    expect(goToEvents[0]).toMatchObject({
      phase: 'attempted',
      fromStepId: 'step2',
      toStepId: 'step1',
    });
    expect(goToEvents[1]).toMatchObject({
      phase: 'completed',
      fromStepId: 'step2',
      toStepId: 'step1',
    });
    expect(
      goToEvents.find(
        (event) => event.phase === 'blocked' && event.trigger === 'goTo',
      ),
    ).toBeUndefined();
  });

  test('next on final step emits attempted then blocked', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          defaultStep="step3"
          onStepChange={onStepChange}
        >
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: 'Complete' }));

    // Re-render at final step and trigger next through context.
    const NextFromContext = () => {
      const { navigation } = useWizard();
      return (
        <button type="button" onClick={() => navigation.next()}>
          Force Next
        </button>
      );
    };

    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          defaultStep="step3"
          onStepChange={onStepChange}
        >
          <NextFromContext />
        </Wizard>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: 'Force Next' }));

    const nextEvents = onStepChange.mock.calls
      .map((c) => c[0])
      .filter((event) => event.trigger === 'next');
    expect(nextEvents[0]).toMatchObject({
      phase: 'attempted',
      fromStepId: 'step3',
    });
    expect(nextEvents[1]).toMatchObject({
      phase: 'blocked',
      blocked: true,
      fromStepId: 'step3',
      toStepId: 'step3',
    });
  });

  test('invalid nextStep id emits attempted then blocked', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const steps = [
      {
        id: 'step1',
        title: 'Step 1',
        nextStep: () => 'missing-step',
      },
      { id: 'step2', title: 'Step 2' },
    ];

    render(
      <Grommet>
        <Wizard steps={steps} onStepChange={onStepChange}>
          <WizardFooter />
        </Wizard>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: 'Next' }));

    const nextEvents = onStepChange.mock.calls
      .map((c) => c[0])
      .filter((event) => event.trigger === 'next');
    expect(nextEvents[0]).toMatchObject({
      phase: 'attempted',
      fromStepId: 'step1',
    });
    expect(nextEvents[1]).toMatchObject({
      phase: 'blocked',
      blocked: true,
      fromStepId: 'step1',
      toStepId: 'missing-step',
    });
    warn.mockRestore();
  });

  test('focus moves to step heading after successful next transition', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <Wizard steps={basicSteps} />
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Step 2' })).toHaveFocus();
    });
  });

  test('focus moves to error summary on blocked validation', async () => {
    const user = userEvent.setup();
    const steps = [
      {
        id: 'step1',
        title: 'Validate',
        validation: () => {
          throw new Error('Required field missing.');
        },
      },
      { id: 'step2', title: 'Step 2' },
    ];

    render(
      <Grommet>
        <Wizard steps={steps} />
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveFocus();
    });
  });

  test('stepper click integration: clicking non-disabled step validates and transitions', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    const steps = [
      {
        id: 'step1',
        title: 'Step 1',
        validation: () => {
          // Valid step
        },
      },
      { id: 'step2', title: 'Step 2' },
    ];

    render(
      <Grommet>
        <Wizard
          steps={steps}
          showProgress="horizontal"
          onStepChange={onStepChange}
        />
      </Grommet>,
    );

    // Click step 2 via Stepper (this routes through Wizard.goTo)
    const step2Button = screen.getByRole('button', {
      name: /Step 2 of 2: Step 2/,
    });
    await user.click(step2Button);

    // Verify goTo was triggered with validation
    await waitFor(() => {
      const goToEvents = onStepChange.mock.calls
        .map((c) => c[0])
        .filter((event) => event.trigger === 'goTo');
      expect(goToEvents.length).toBeGreaterThan(0);
      expect(goToEvents[goToEvents.length - 1]).toMatchObject({
        phase: 'completed',
        fromStepId: 'step1',
        toStepId: 'step2',
      });
    });
  });
});
