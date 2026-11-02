// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Box, Button, FormField, Grommet, TextInput, Wizard } from '../..';

const basicSteps = [
  { id: 'step1', title: 'Step 1', description: 'First step' },
  { id: 'step2', title: 'Step 2', description: 'Second step' },
  { id: 'step3', title: 'Step 3', description: 'Final step' },
];

const renderStep = (step) => <p>{`Content for ${step.title}`}</p>;

const mockMediumContainerWidth = () =>
  jest
    .spyOn(window.HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({
      width: 1280,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

const DesktopWizard = ({ children }) => (
  <Grommet>
    <Box responsive="container" width="1280px">
      {children}
    </Box>
  </Grommet>
);

const renderStepState = (step, wizard) => (
  <>
    {renderStep(step)}
    <output aria-label="Wizard state">
      {JSON.stringify({
        states: wizard.stepStates,
        messages: wizard.stepErrorMessages,
        isBlocked: wizard.isBlocked,
        isCompleted: wizard.isCompleted,
      })}
    </output>
    <Button label="Direct next" onClick={wizard.next} />
    <Button label="Direct goTo" onClick={() => wizard.goTo('step3')} />
    <Button label="Direct skip" onClick={wizard.skip} />
  </>
);

const wizardState = () =>
  JSON.parse(screen.getByLabelText('Wizard state').textContent);

describe('Wizard', () => {
  beforeEach(() => {
    console.warn = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

  test('renders React node title without wrapping it in a heading', () => {
    render(
      <Grommet>
        <Wizard
          title={<span>Custom wizard title</span>}
          steps={basicSteps}
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );

    expect(screen.getByText('Custom wizard title')).toBeTruthy();
    expect(
      screen.queryByRole('heading', { name: 'Custom wizard title' }),
    ).toBeNull();
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
      steps: expect.arrayContaining([
        expect.objectContaining({ id: 'step3', status: 'completed' }),
      ]),
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

  test('completion flattens steps and retains metadata', async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    const valid = Object.freeze({
      id: 'valid',
      title: 'Valid',
      description: 'Step details',
      skippable: false,
    });
    const invalid = Object.freeze({
      id: 'invalid',
      title: 'Invalid',
      skippable: true,
      validate: () => 'Callback detail',
    });
    const consumerError = Object.freeze({
      id: 'consumer',
      title: 'Consumer',
      status: 'error',
      errorMessage: 'Server detail',
    });
    const disabled = Object.freeze({
      id: 'disabled',
      title: 'Disabled',
      disabled: true,
      disabledReason: 'No permission',
      skippable: true,
    });
    const pending = Object.freeze({ id: 'pending', title: 'Pending' });
    const parent = Object.freeze({
      id: 'parent',
      title: 'Group',
      children: Object.freeze([
        valid,
        invalid,
        consumerError,
        disabled,
        pending,
      ]),
    });
    const final = Object.freeze({ id: 'final', title: 'Final' });
    const steps = Object.freeze([parent, final]);
    render(
      <Wizard
        steps={steps}
        form={false}
        onComplete={onComplete}
        renderStep={(step, wizard) => (
          <Button label="Go to finish" onClick={() => wizard.goTo('final')} />
        )}
      />,
      { wrapper: Grommet },
    );
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    await user.click(screen.getByRole('button', { name: 'Go to finish' }));
    await user.click(
      screen.getByRole('button', { name: 'Complete', exact: true }),
    );
    const payload = onComplete.mock.calls[0][0];
    expect(payload.completedSteps).toEqual(['valid', 'final']);
    expect(payload.steps).toEqual([
      {
        id: 'parent',
        title: 'Group',
        status: 'error',
        errorMessage: undefined,
      },
      { ...valid, status: 'completed', errorMessage: undefined },
      { ...invalid, status: 'error', errorMessage: 'Callback detail' },
      { ...consumerError },
      { ...disabled, status: 'disabled', errorMessage: undefined },
      { ...pending, status: 'pending', errorMessage: undefined },
      { ...final, status: 'completed', errorMessage: undefined },
    ]);
    expect(payload.steps.every((step) => !('children' in step))).toBe(true);
    expect(payload.steps[1]).not.toBe(valid);
    expect(parent.children).toEqual([
      valid,
      invalid,
      consumerError,
      disabled,
      pending,
    ]);
  });

  test('completion aggregates the just-completed final child', async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    render(
      <Wizard
        form={false}
        onComplete={onComplete}
        steps={[
          { id: 'group', title: 'Group', children: basicSteps.slice(0, 2) },
        ]}
      />,
      { wrapper: Grommet },
    );
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    await user.click(
      screen.getByRole('button', { name: 'Complete', exact: true }),
    );
    expect(
      onComplete.mock.calls[0][0].steps.map((step) => step.status),
    ).toEqual(['completed', 'completed', 'completed']);
  });

  test.each([
    ['pending', undefined],
    ['completed', undefined],
    ['error', 'Consumer summary'],
    ['error', ''],
    ['disabled', undefined],
  ])(
    'completion honors explicit %s status and %p message',
    async (status, errorMessage) => {
      const user = userEvent.setup();
      const onComplete = jest.fn();
      const step = {
        id: 'final',
        title: 'Final',
        status,
        errorMessage,
        skippable: true,
        disabledReason: 'Consumer reason',
        validate: () => 'Callback message',
      };
      render(<Wizard steps={[step]} form={false} onComplete={onComplete} />, {
        wrapper: Grommet,
      });
      await user.click(
        screen.getByRole('button', { name: 'Complete', exact: true }),
      );
      expect(onComplete.mock.calls[0][0]).toEqual({
        value: {},
        completedSteps: [],
        steps: [
          {
            ...step,
            errorMessage: status === 'error' ? errorMessage : undefined,
          },
        ],
      });
    },
  );

  test.each(['goTo', 'complete'])(
    'does not complete an explicit error step through %s',
    async (action) => {
      const user = userEvent.setup();
      const onComplete = jest.fn();
      const errorStep = {
        ...basicSteps[0],
        status: 'error',
        skippable: true,
        errorMessage: 'Server error',
      };
      render(
        <Wizard
          form={false}
          onComplete={onComplete}
          steps={
            action === 'goTo'
              ? [errorStep, basicSteps[1], basicSteps[2]]
              : [errorStep]
          }
          renderStep={renderStepState}
        />,
        { wrapper: Grommet },
      );
      if (action === 'goTo') {
        await user.click(screen.getByRole('button', { name: 'Direct goTo' }));
        await user.click(
          screen.getByRole('button', { name: 'Previous', exact: true }),
        );
        await user.click(
          screen.getByRole('button', { name: 'Previous', exact: true }),
        );
        expect(wizardState().isCompleted).toBe(false);
        await user.click(screen.getByRole('button', { name: 'Direct goTo' }));
      }
      await user.click(
        screen.getByRole('button', { name: 'Complete', exact: true }),
      );
      expect(onComplete.mock.calls[0][0].completedSteps).not.toContain('step1');
      expect(onComplete.mock.calls[0][0].steps[0].status).toBe('error');
      if (action === 'complete') expect(wizardState().isCompleted).toBe(false);
    },
  );

  test('prop errors invalidate earlier completion', async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    const props = { form: false, onComplete, renderStep: renderStepState };
    const { rerender } = render(<Wizard {...props} steps={basicSteps} />, {
      wrapper: Grommet,
    });
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    await user.click(
      screen.getByRole('button', { name: 'Previous', exact: true }),
    );
    expect(wizardState().isCompleted).toBe(true);
    const erroredSteps = [
      { ...basicSteps[0], status: 'error', skippable: true },
      basicSteps[1],
      basicSteps[2],
    ];
    rerender(<Wizard {...props} steps={erroredSteps} />);
    expect(wizardState().isCompleted).toBe(false);
    rerender(<Wizard {...props} steps={basicSteps} />);
    expect(wizardState().isCompleted).toBe(false);
    expect(wizardState().states.step1).toBe('pending');
    rerender(<Wizard {...props} steps={erroredSteps} />);
    await user.click(screen.getByRole('button', { name: 'Direct goTo' }));
    await user.click(
      screen.getByRole('button', { name: 'Complete', exact: true }),
    );
    expect(onComplete.mock.calls[0][0].completedSteps).toEqual(['step3']);
  });

  test('completion reports form errors without generated text', async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    render(
      <Wizard
        steps={[{ id: 'final', title: 'Final', skippable: true }]}
        onComplete={onComplete}
        renderStep={() => (
          <FormField name="name" htmlFor="snapshot-name" label="Name" required>
            <TextInput name="name" id="snapshot-name" />
          </FormField>
        )}
      />,
      { wrapper: Grommet },
    );
    await user.click(
      screen.getByRole('button', { name: 'Complete', exact: true }),
    );
    expect(onComplete.mock.calls[0][0]).toEqual({
      value: {},
      completedSteps: [],
      steps: [
        {
          id: 'final',
          title: 'Final',
          skippable: true,
          status: 'error',
          errorMessage: undefined,
        },
      ],
    });
  });

  test('completion reflects final validation and corrected retry', async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    const validate = jest.fn(() => Promise.resolve('Final error'));
    const step = Object.freeze({
      id: 'final',
      title: 'Final',
      skippable: true,
      validate,
    });
    render(<Wizard steps={[step]} form={false} onComplete={onComplete} />, {
      wrapper: Grommet,
    });
    await user.click(
      screen.getByRole('button', { name: 'Complete', exact: true }),
    );
    expect(onComplete.mock.calls[0][0].steps).toEqual([
      { ...step, status: 'error', errorMessage: 'Final error' },
    ]);
    validate.mockReturnValue(Promise.resolve(true));
    await user.click(
      screen.getByRole('button', { name: 'Complete', exact: true }),
    );
    expect(onComplete.mock.calls[1][0].steps).toEqual([
      { ...step, status: 'completed', errorMessage: undefined },
    ]);
    expect(onComplete.mock.calls[0][0].steps[0].status).toBe('error');
    expect(step.status).toBeUndefined();
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

  test('retains validation error after previous', async () => {
    mockMediumContainerWidth();
    const user = userEvent.setup();
    const steps = basicSteps.map((step) => ({
      ...step,
      ...(step.id === 'step2'
        ? { validate: () => 'Please correct step 2' }
        : {}),
    }));
    render(
      <Grommet>
        <Box responsive="container" width="1280px">
          <Wizard
            steps={steps}
            defaultStep="step2"
            form={false}
            showProgress="vertical"
            renderStep={renderStep}
          />
        </Box>
      </Grommet>,
    );
    await user.click(screen.getByRole('button', { name: /next/i }));
    await user.click(screen.getByRole('button', { name: /previous/i }));
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    expect(screen.getByText('Please correct step 2')).toBeTruthy();
  });

  test.each([
    ['callback', undefined, false],
    ['pending override', 'pending', false],
    ['error status', 'error', true],
    ['form', undefined, true],
  ])('blocks skippable Next for %s', async (mode, status, valid) => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    const validate = jest.fn(() => valid);
    render(
      <Wizard
        form={mode === 'form'}
        steps={[
          { ...basicSteps[0], skippable: true, status, validate },
          basicSteps[1],
          basicSteps[2],
        ]}
        onStepChange={onStepChange}
        renderStep={(step, wizard) => (
          <>
            {renderStepState(step, wizard)}
            {mode === 'form' && step.id === 'step1' && (
              <FormField
                name="name"
                htmlFor="blocked-name"
                label="Name"
                required
              >
                <TextInput name="name" id="blocked-name" />
              </FormField>
            )}
          </>
        )}
      />,
      { wrapper: Grommet },
    );
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Direct next' }));
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    expect(onStepChange.mock.calls.map(([event]) => event.phase)).toEqual([
      'requested',
      'validating',
      'blocked',
      'requested',
      'validating',
      'blocked',
    ]);
    await user.click(screen.getByRole('button', { name: 'Direct goTo' }));
    expect(screen.getByRole('heading', { name: 'Step 3' })).toBeTruthy();
  });

  test('retries corrected skippable validation with Next', async () => {
    const user = userEvent.setup();
    const validate = jest.fn(() => 'Fix this step');
    render(
      <Wizard
        form={false}
        steps={[{ ...basicSteps[0], skippable: true, validate }, basicSteps[1]]}
        renderStep={renderStepState}
      />,
      { wrapper: Grommet },
    );
    await user.click(screen.getByRole('button', { name: 'Direct next' }));
    expect(wizardState().states.step1).toBe('error');
    validate.mockReturnValue(true);
    await user.click(screen.getByRole('button', { name: 'Direct next' }));
    expect(screen.getByRole('heading', { name: 'Step 2' })).toBeTruthy();
    expect(wizardState().states.step1).toBe('completed');
  });

  test.each(['Direct goTo', 'indicator'])(
    'allows a failing skippable step to navigate with %s',
    async (action) => {
      mockMediumContainerWidth();
      const user = userEvent.setup();
      const onStepChange = jest.fn();
      const onComplete = jest.fn();
      const steps = basicSteps.map((step, index) => ({
        ...step,
        ...(index === 0
          ? {
              skippable: true,
              validate: () => 'Unresolved callback',
            }
          : {}),
      }));
      render(
        <Wizard
          steps={steps}
          form={false}
          showProgress="vertical"
          clickableSteps
          renderStep={renderStepState}
          onStepChange={onStepChange}
          onComplete={onComplete}
        />,
        { wrapper: DesktopWizard },
      );
      await user.click(
        screen.getByRole('button', {
          name: action === 'indicator' ? /Step 3 of 3: Step 3/i : action,
          exact: true,
        }),
      );
      expect(wizardState().states.step1).toBe('error');
      expect(wizardState().messages.step1).toBe('Unresolved callback');
      expect(screen.getByText('Unresolved callback')).toBeTruthy();
      const phases = onStepChange.mock.calls.map(([event]) => event.phase);
      expect(phases).toEqual(['requested', 'validating', 'navigated']);
      await user.click(
        screen.getByRole('button', { name: 'Complete', exact: true }),
      );
      expect(onComplete.mock.calls[0][0].completedSteps).not.toContain('step1');
    },
  );

  test.each([false, 'Callback error', { error: 'Object error' }])(
    'allows completion with a failed skippable callback: %p',
    async (result) => {
      const user = userEvent.setup();
      const onComplete = jest.fn();
      const onStepChange = jest.fn();
      render(
        <Grommet>
          <Wizard
            form={false}
            steps={[
              {
                id: 'final',
                title: 'Final',
                skippable: true,
                validate: () => result,
              },
            ]}
            onComplete={onComplete}
            onStepChange={onStepChange}
            renderStep={renderStepState}
          />
        </Grommet>,
      );
      await user.click(
        screen.getByRole('button', { name: 'Complete', exact: true }),
      );
      expect(onComplete).toHaveBeenCalledWith({
        value: {},
        completedSteps: [],
        steps: [
          expect.objectContaining({
            id: 'final',
            status: 'error',
            skippable: true,
          }),
        ],
      });
      expect(wizardState().states.final).toBe('error');
      expect(onStepChange.mock.calls.map(([event]) => event.phase)).toEqual([
        'requested',
        'validating',
        'completed',
      ]);
    },
  );

  test('restores and clears form errors live', async () => {
    mockMediumContainerWidth();
    const user = userEvent.setup();
    render(
      <Wizard
        steps={[{ ...basicSteps[0], skippable: true }, basicSteps[1]]}
        showProgress="vertical"
        clickableSteps
        renderStep={(step, wizard) => (
          <>
            {renderStepState(step, wizard)}
            {step.id === 'step1' && (
              <FormField
                name="name"
                htmlFor="live-name"
                label="Name"
                validateOn="change"
                validate={(value) => (!value ? 'Name is missing' : undefined)}
              >
                <TextInput name="name" id="live-name" />
              </FormField>
            )}
          </>
        )}
      />,
      { wrapper: DesktopWizard },
    );
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    await user.click(
      screen.getByRole('button', { name: /Step 2 of 2: Step 2/i }),
    );
    expect(screen.getByRole('heading', { name: 'Step 2' })).toBeTruthy();
    expect(wizardState().states.step1).toBe('error');
    expect(wizardState().messages.step1).toBeUndefined();
    expect(
      within(screen.getByRole('list', { name: 'Wizard progress' })).queryByText(
        'Name is missing',
      ),
    ).toBeNull();
    await user.click(
      screen.getByRole('button', { name: 'Previous', exact: true }),
    );
    expect(screen.getByText('Name is missing')).toBeTruthy();
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Ada');
    await waitFor(() => expect(wizardState().states.step1).toBe('pending'));
    expect(screen.queryByText('Name is missing')).toBeNull();
    expect(wizardState().isBlocked).toBe(false);
  });

  test('live form success does not clear a callback failure', async () => {
    mockMediumContainerWidth();
    const user = userEvent.setup();
    const validate = jest.fn(() => 'Callback remains invalid');
    render(
      <Wizard
        steps={[{ ...basicSteps[0], validate }, basicSteps[1]]}
        defaultValue={{ name: 'Ada' }}
        showProgress="vertical"
        renderStep={(step, wizard) => (
          <>
            {renderStepState(step, wizard)}
            <FormField
              name="name"
              htmlFor="callback-name"
              label="Name"
              validateOn="change"
              validate={(value) => (!value ? 'Name is missing' : undefined)}
            >
              <TextInput name="name" id="callback-name" />
            </FormField>
          </>
        )}
      />,
      { wrapper: DesktopWizard },
    );
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    await user.clear(screen.getByRole('textbox', { name: 'Name' }));
    await waitFor(() => expect(wizardState().messages.step1).toBeUndefined());
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Grace');
    await waitFor(() =>
      expect(wizardState().messages.step1).toBe('Callback remains invalid'),
    );
    expect(wizardState().states.step1).toBe('error');
    expect(validate).toHaveBeenCalledTimes(1);
    validate.mockReturnValue(true);
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    expect(wizardState().states.step1).toBe('completed');
  });

  test('display overrides do not bypass validation', async () => {
    mockMediumContainerWidth();
    const user = userEvent.setup();
    const first = {
      ...basicSteps[0],
      status: 'completed',
      errorMessage: 'Consumer error',
      validate: () => 'Callback error',
    };
    const props = {
      form: false,
      showProgress: 'vertical',
      renderStep: renderStepState,
    };
    const { rerender } = render(
      <Wizard {...props} steps={[first, basicSteps[1]]} />,
      { wrapper: DesktopWizard },
    );
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    expect(wizardState().states.step1).toBe('completed');
    expect(wizardState().isBlocked).toBe(true);
    rerender(
      <Wizard
        {...props}
        steps={[{ ...first, status: 'error' }, basicSteps[1]]}
      />,
    );
    expect(wizardState().messages.step1).toBe('Consumer error');
    expect(screen.getByText('Consumer error')).toBeTruthy();
    rerender(
      <Wizard
        {...props}
        steps={[
          { ...first, status: undefined, errorMessage: '' },
          basicSteps[1],
        ]}
      />,
    );
    expect(wizardState().states.step1).toBe('error');
    expect(wizardState().messages.step1).toBe('');
    expect(
      within(screen.getByRole('list', { name: 'Wizard progress' })).queryByText(
        'Callback error',
      ),
    ).toBeNull();
  });

  test('skippable Complete preserves an explicit form summary', async () => {
    mockMediumContainerWidth();
    const user = userEvent.setup();
    const onComplete = jest.fn();
    render(
      <Wizard
        steps={[
          {
            id: 'final',
            title: 'Final',
            skippable: true,
            errorMessage: 'Consumer form summary',
          },
        ]}
        showProgress="vertical"
        onComplete={onComplete}
        renderStep={(step, wizard) => (
          <>
            {renderStepState(step, wizard)}
            <FormField name="name" htmlFor="final-name" label="Name" required>
              <TextInput name="name" id="final-name" />
            </FormField>
          </>
        )}
      />,
      { wrapper: DesktopWizard },
    );
    await user.click(
      screen.getByRole('button', { name: 'Complete', exact: true }),
    );
    expect(onComplete).toHaveBeenCalledWith({
      value: {},
      completedSteps: [],
      steps: [
        expect.objectContaining({
          id: 'final',
          status: 'error',
          errorMessage: 'Consumer form summary',
        }),
      ],
    });
    expect(screen.getByText('Consumer form summary')).toBeTruthy();
    expect(wizardState().states.final).toBe('error');
  });

  test('late results stay with their source step', async () => {
    mockMediumContainerWidth();
    const user = userEvent.setup();
    let resolveValidation;
    const validate = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveValidation = resolve;
        }),
    );
    const onStepChange = jest.fn();
    render(
      <Wizard
        steps={[basicSteps[0], { ...basicSteps[1], validate }, basicSteps[2]]}
        form={false}
        defaultStep="step2"
        showProgress="vertical"
        renderStep={renderStepState}
        onStepChange={onStepChange}
      />,
      { wrapper: DesktopWizard },
    );
    await user.click(screen.getByRole('button', { name: 'Direct next' }));
    await user.click(screen.getByRole('button', { name: 'Direct next' }));
    expect(validate).toHaveBeenCalledTimes(1);
    await user.click(
      screen.getByRole('button', { name: 'Previous', exact: true }),
    );
    await act(async () => resolveValidation('Late error'));
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    expect(wizardState().states.step2).toBe('error');
    expect(screen.getByText('Late error')).toBeTruthy();
    expect(onStepChange.mock.calls.map(([event]) => event.phase)).toEqual([
      'requested',
      'validating',
      'navigated',
    ]);
  });

  test('nested status aggregates errors and accepts overrides', async () => {
    mockMediumContainerWidth();
    const user = userEvent.setup();
    const parent = {
      id: 'parent',
      title: 'Parent',
      children: [
        {
          id: 'child1',
          title: 'Child 1',
          skippable: true,
          validate: () => 'Child error',
        },
        { id: 'child2', title: 'Child 2' },
      ],
    };
    const props = {
      form: false,
      showProgress: 'vertical',
      renderStep: (step, wizard) => (
        <>
          {renderStepState(step, wizard)}
          <Button label="Leave child" onClick={() => wizard.goTo('child2')} />
        </>
      ),
    };
    const { rerender } = render(<Wizard {...props} steps={[parent]} />, {
      wrapper: DesktopWizard,
    });
    await user.click(screen.getByRole('button', { name: 'Leave child' }));
    expect(wizardState().states).toEqual({
      parent: 'error',
      child1: 'error',
      child2: 'pending',
    });
    expect(screen.getByText('Child error')).toBeTruthy();
    rerender(
      <Wizard {...props} steps={[{ ...parent, status: 'completed' }]} />,
    );
    expect(wizardState().states.parent).toBe('completed');
    expect(wizardState().states.child1).toBe('error');
  });

  test('blocks next until the required form field is valid', async () => {
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

  test('disabled display overrides retain their reason and label', async () => {
    mockMediumContainerWidth();
    const user = userEvent.setup();
    const first = { ...basicSteps[0], validate: () => 'Callback error' };
    const props = {
      form: false,
      showProgress: 'horizontal',
      clickableSteps: true,
      renderStep: renderStepState,
    };
    const { rerender } = render(
      <Wizard {...props} steps={[first, basicSteps[1]]} />,
      { wrapper: DesktopWizard },
    );
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    rerender(
      <Wizard
        {...props}
        steps={[{ ...first, status: 'pending' }, basicSteps[1]]}
      />,
    );
    expect(wizardState().states.step1).toBe('pending');
    expect(wizardState().isBlocked).toBe(true);
    rerender(
      <Wizard
        {...props}
        steps={[
          {
            ...first,
            status: 'disabled',
            disabledReason: 'Waiting for permission',
            'aria-label': 'Account step',
          },
          basicSteps[1],
        ]}
      />,
    );
    expect(wizardState().states.step1).toBe('disabled');
    expect(screen.getByText('Waiting for permission')).toBeTruthy();
    expect(
      screen
        .getByRole('button', { name: 'Account step' })
        .getAttribute('aria-disabled'),
    ).toBe('true');
    rerender(
      <Wizard
        {...props}
        steps={[
          {
            ...first,
            status: 'error',
            disabled: true,
            disabledReason: 'Waiting for permission',
          },
          basicSteps[1],
        ]}
      />,
    );
    expect(wizardState().states.step1).toBe('disabled');
    expect(
      screen.getByRole('button', { name: 'Next', exact: true }).disabled,
    ).toBe(true);
  });

  test('clicking a parent chooses its first enabled child', async () => {
    mockMediumContainerWidth();
    const user = userEvent.setup();
    const steps = [
      basicSteps[0],
      {
        id: 'parent',
        title: 'Parent',
        children: [
          {
            id: 'disabled',
            title: 'Unavailable',
            disabled: true,
            disabledReason: 'Not available',
          },
          { id: 'enabled', title: 'Enabled', 'aria-label': 'Enabled child' },
        ],
      },
    ];
    const { container } = render(
      <Wizard
        steps={steps}
        form={false}
        showProgress="vertical"
        clickableSteps
        renderStep={renderStepState}
      />,
      { wrapper: DesktopWizard },
    );
    await user.click(screen.getByRole('button', { name: /Parent$/i }));
    expect(screen.getByRole('heading', { name: 'Enabled' })).toBeTruthy();
    expect(wizardState().states.step1).toBe('completed');
    expect(screen.getByText('Not available')).toBeTruthy();
    expect(await axe(container)).toHaveNoViolations();
  });

  test('controlled navigation preserves per-step results', async () => {
    const user = userEvent.setup();
    const steps = basicSteps.map((step) => ({
      ...step,
      ...(step.id === 'step2' ? { validate: () => 'Stored error' } : {}),
    }));
    const props = { form: false, renderStep: renderStepState };
    const { rerender } = render(
      <Wizard {...props} steps={steps} currentStep="step2" />,
      { wrapper: Grommet },
    );
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    rerender(
      <Wizard {...props} steps={[...steps].reverse()} currentStep="step1" />,
    );
    expect(wizardState().states.step2).toBe('error');
    expect(wizardState().messages.step2).toBe('Stored error');
    rerender(
      <Wizard {...props} steps={[steps[0], steps[2]]} currentStep="step1" />,
    );
    expect(wizardState().states.step2).toBeUndefined();
    rerender(<Wizard {...props} steps={steps} currentStep="step1" />);
    expect(wizardState().states.step2).toBe('pending');
    expect(wizardState().messages.step2).toBeUndefined();
  });

  test('skip and backward goTo preserve failed validation', async () => {
    mockMediumContainerWidth();
    const user = userEvent.setup();
    const validate = jest.fn(() => 'Stored error');
    const steps = [
      basicSteps[0],
      { ...basicSteps[1], validate },
      basicSteps[2],
    ];
    const props = {
      form: false,
      showProgress: 'vertical',
      clickableSteps: true,
      renderStep: renderStepState,
      defaultStep: 'step2',
    };
    const { rerender } = render(<Wizard {...props} steps={steps} />, {
      wrapper: DesktopWizard,
    });
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    await user.click(
      screen.getByRole('button', { name: /Step 1 of 3: Step 1/i }),
    );
    expect(wizardState().states.step2).toBe('error');
    await user.click(
      screen.getByRole('button', { name: /Step 2 of 3: Step 2/i }),
    );
    rerender(
      <Wizard
        {...props}
        steps={[steps[0], { ...steps[1], skippable: true }, steps[2]]}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Direct skip' }));
    expect(screen.getByRole('heading', { name: 'Step 3' })).toBeTruthy();
    expect(wizardState().states.step2).toBe('error');
    expect(validate).toHaveBeenCalledTimes(1);
  });

  test('later failure removes an earlier completion claim', async () => {
    const user = userEvent.setup();
    const validate = jest.fn(() => true);
    const onComplete = jest.fn();
    render(
      <Wizard
        form={false}
        steps={[{ ...basicSteps[0], skippable: true, validate }, basicSteps[1]]}
        renderStep={renderStepState}
        onComplete={onComplete}
      />,
      { wrapper: Grommet },
    );
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    expect(wizardState().states.step1).toBe('completed');
    await user.click(
      screen.getByRole('button', { name: 'Previous', exact: true }),
    );
    validate.mockReturnValue('Now invalid');
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    expect(wizardState().states.step1).toBe('error');
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Direct skip' }));
    await user.click(
      screen.getByRole('button', { name: 'Complete', exact: true }),
    );
    expect(onComplete).toHaveBeenCalledWith({
      value: {},
      completedSteps: ['step2'],
      steps: [
        expect.objectContaining({
          id: 'step1',
          status: 'error',
          errorMessage: 'Now invalid',
        }),
        expect.objectContaining({ id: 'step2', status: 'completed' }),
      ],
    });
  });

  test.each(['throw', 'reject'])(
    'records a callback %s and blocks skippable Next',
    async (mode) => {
      const user = userEvent.setup();
      render(
        <Wizard
          form={false}
          steps={[
            {
              ...basicSteps[0],
              skippable: true,
              validate: () => {
                if (mode === 'throw') throw new Error('Validation exception');
                return Promise.reject(new Error('Validation exception'));
              },
            },
            basicSteps[1],
          ]}
          renderStep={renderStepState}
        />,
        { wrapper: Grommet },
      );
      await user.click(
        screen.getByRole('button', { name: 'Next', exact: true }),
      );
      expect(wizardState().states.step1).toBe('error');
      expect(wizardState().messages.step1).toBe('Validation exception');
      expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    },
  );

  test('ignores late results for removed IDs', async () => {
    const user = userEvent.setup();
    let resolveValidation;
    const steps = [
      {
        ...basicSteps[0],
        validate: () =>
          new Promise((resolve) => {
            resolveValidation = resolve;
          }),
      },
      basicSteps[1],
    ];
    const props = { form: false, renderStep: renderStepState };
    const { rerender } = render(
      <Wizard {...props} steps={steps} currentStep="step1" />,
      { wrapper: Grommet },
    );
    await user.click(screen.getByRole('button', { name: 'Next', exact: true }));
    rerender(<Wizard {...props} steps={[steps[1]]} currentStep="step2" />);
    rerender(<Wizard {...props} steps={steps} currentStep="step2" />);
    await act(async () => resolveValidation('Obsolete error'));
    expect(wizardState().states.step1).toBe('pending');
    expect(wizardState().messages.step1).toBeUndefined();
  });

  test('direct next and complete validate forms', async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    const steps = [
      { id: 'first', title: 'First' },
      { id: 'last', title: 'Last' },
    ];
    render(
      <Grommet>
        <Wizard
          steps={steps}
          onComplete={onComplete}
          renderStep={(step, wizard) => (
            <>
              <FormField
                htmlFor={`${step.id}-input`}
                label={step.title}
                name={step.id}
                required
              >
                <TextInput id={`${step.id}-input`} name={step.id} required />
              </FormField>
              <button
                type="button"
                onClick={step.id === 'first' ? wizard.next : wizard.complete}
              >
                Continue step
              </button>
            </>
          )}
          aria-label="Test wizard"
        />
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: 'Continue step' }));
    expect(screen.getByRole('heading', { name: 'First' })).toBeTruthy();
    await user.type(screen.getByRole('textbox', { name: 'First' }), 'one');
    await user.click(screen.getByRole('button', { name: 'Continue step' }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Last' })).toBeTruthy(),
    );

    await user.click(screen.getByRole('button', { name: 'Continue step' }));
    expect(onComplete).not.toHaveBeenCalled();
    await user.type(screen.getByRole('textbox', { name: 'Last' }), 'two');
    await user.click(screen.getByRole('button', { name: 'Continue step' }));
    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
  });

  test('direct goTo validates before moving forward', async () => {
    const user = userEvent.setup();
    const onStepChange = jest.fn();
    render(
      <Grommet>
        <Wizard
          steps={basicSteps}
          onStepChange={onStepChange}
          renderStep={(step, wizard) => (
            <>
              {step.id === 'step1' && (
                <FormField
                  htmlFor="wizard-name"
                  label="Name"
                  name="name"
                  required
                >
                  <TextInput id="wizard-name" name="name" />
                </FormField>
              )}
              <button type="button" onClick={() => wizard.goTo('step3')}>
                Go to final
              </button>
            </>
          )}
          aria-label="Test wizard"
        />
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: 'Go to final' }));
    expect(screen.getByRole('heading', { name: 'Step 1' })).toBeTruthy();
    expect(onStepChange).toHaveBeenCalledWith(
      expect.objectContaining({ trigger: 'goTo', phase: 'blocked' }),
    );
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Ada');
    await user.click(screen.getByRole('button', { name: 'Go to final' }));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Step 3' })).toBeTruthy(),
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
    mockMediumContainerWidth();
    render(
      <Grommet>
        <Box responsive="container" width="1280px">
          <Wizard
            steps={basicSteps}
            showProgress="vertical"
            renderStep={renderStep}
            aria-label="Test wizard"
          />
        </Box>
      </Grommet>,
    );
    expect(screen.getByRole('list', { name: 'Wizard progress' })).toBeTruthy();
  });

  test('navigates vertical progress when clickableSteps is true', async () => {
    mockMediumContainerWidth();
    const user = userEvent.setup();
    render(
      <Grommet>
        <Box responsive="container" width="1280px">
          <Wizard
            clickableSteps
            steps={basicSteps}
            showProgress="vertical"
            renderStep={renderStep}
            aria-label="Test wizard"
          />
        </Box>
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', { name: /Step 3 of 3: Step 3/i }),
    );

    expect(screen.getByRole('heading', { name: 'Step 3' })).toBeTruthy();
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

  test('hides close button when closable is false', () => {
    render(
      <Grommet>
        <Wizard
          closable={false}
          steps={basicSteps}
          renderStep={renderStep}
          aria-label="Test wizard"
        />
      </Grommet>,
    );

    expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
  });

  test('navigates and completes when form is false', async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    const steps = basicSteps.slice(0, 2);
    render(
      <Grommet>
        <Wizard
          form={false}
          steps={steps}
          renderStep={renderStep}
          onComplete={onComplete}
          aria-label="Test wizard"
        />
      </Grommet>,
    );

    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByRole('heading', { name: 'Step 2' })).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /complete/i }));
    expect(onComplete).toHaveBeenCalledWith({
      value: {},
      completedSteps: expect.any(Array),
      steps: [
        expect.objectContaining({ id: 'step1', status: 'completed' }),
        expect.objectContaining({ id: 'step2', status: 'completed' }),
      ],
    });
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
