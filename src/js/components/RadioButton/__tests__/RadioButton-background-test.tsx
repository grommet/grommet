// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { FormCheckmark } from 'grommet-icons';
import 'jest-styled-components';
import 'jest-axe/extend-expect';

import { Grommet } from '../../Grommet';
import { Box } from '../../Box';
import { RadioButton } from '..';
import { ThemeType } from '../../../themes';

const { StyledRadioButtonBox } = jest.requireActual<{
  StyledRadioButtonBox: { styledComponentId: string };
}>('../StyledRadioButton');
const controlClass = StyledRadioButtonBox.styledComponentId;
const controlSelector = `input:not([disabled])+.${controlClass}`;

const theme: ThemeType = {
  global: {
    colors: {
      'control-fill': { light: '#eeeeee', dark: '#222222' },
      'selected-fill': { light: '#aaddff', dark: '#224466' },
      'hover-fill': { light: '#ffccaa', dark: '#663322' },
    },
  },
  radioButton: {
    background: { color: 'control-fill' },
    check: {
      background: { color: 'selected-fill' },
      hover: { background: { color: 'hover-fill' } },
    },
    hover: { background: { color: '#ddeeff' } },
  },
};

const getControl = () => {
  const input = screen.getByRole('radio', { name: /Option$/ });
  return {
    input,
    control: input.nextElementSibling as HTMLElement,
    label: input.closest('label') as HTMLLabelElement,
  };
};

describe('RadioButton control backgrounds', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <Grommet theme={theme}>
        <RadioButton name="option" label="Option" />
      </Grommet>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  test.each([false, true])(
    'retains normal and selected fills (checked=%s)',
    (checked) => {
      render(
        <Grommet theme={theme}>
          <RadioButton
            name="option"
            label="Option"
            checked={checked}
            onChange={jest.fn()}
          />
        </Grommet>,
      );
      expect(getControl().control).toHaveStyleRule(
        'background-color',
        checked ? '#aaddff' : '#eeeeee',
      );
    },
  );

  test('selected fill falls back to normal', () => {
    render(
      <Grommet theme={{ radioButton: { background: { color: '#eeeeee' } } }}>
        <RadioButton
          name="option"
          label="Option"
          checked
          onChange={jest.fn()}
        />
      </Grommet>,
    );
    expect(getControl().control).toHaveStyleRule('background-color', '#eeeeee');
  });

  test('selected fill can be transparent', () => {
    render(
      <Grommet
        theme={{
          radioButton: {
            background: { color: '#eeeeee' },
            check: { background: { color: 'transparent' } },
          },
        }}
      >
        <RadioButton
          name="option"
          label="Option"
          checked
          onChange={jest.fn()}
        />
      </Grommet>,
    );
    expect(getControl().control).toHaveStyleRule(
      'background-color',
      'transparent',
    );
  });

  test.each(['light', 'dark'] as const)(
    'resolves symbolic and light/dark backgrounds in %s mode',
    (mode) => {
      const { rerender } = render(
        <Grommet
          theme={theme}
          themeMode={mode}
          background={mode === 'dark' ? 'black' : 'white'}
        >
          <RadioButton
            name="option"
            label="Option"
            checked={false}
            onChange={jest.fn()}
          />
        </Grommet>,
      );
      expect(getControl().control).toHaveStyleRule(
        'background-color',
        mode === 'light' ? '#eeeeee' : '#222222',
      );
      rerender(
        <Grommet
          theme={theme}
          themeMode={mode}
          background={mode === 'dark' ? 'black' : 'white'}
        >
          <RadioButton
            name="option"
            label="Option"
            checked
            onChange={jest.fn()}
          />
        </Grommet>,
      );
      const { control, label } = getControl();
      expect(control).toHaveStyleRule(
        'background-color',
        mode === 'light' ? '#aaddff' : '#224466',
      );
      expect(label).toHaveStyleRule(
        'background-color',
        mode === 'light' ? '#ffccaa' : '#663322',
        { modifier: `:hover ${controlSelector}` },
      );
    },
  );

  test.each([false, true])(
    'label hover overrides the control fill (checked=%s)',
    async (checked) => {
      const user = userEvent.setup();
      render(
        <Grommet theme={theme}>
          <RadioButton
            name="option"
            label="Option"
            checked={checked}
            onChange={jest.fn()}
          />
        </Grommet>,
      );
      await user.hover(screen.getByText('Option'));
      const { control, label } = getControl();
      expect(control.matches(controlSelector)).toBe(true);
      expect(label).toHaveStyleRule('background-color', '#ffccaa', {
        modifier: `:hover ${controlSelector}`,
      });
      expect(label).toHaveStyleRule('background-color', '#ddeeff', {
        modifier: ':hover',
      });
      await user.unhover(screen.getByText('Option'));
      expect(control).toHaveStyleRule(
        'background-color',
        checked ? '#aaddff' : '#eeeeee',
      );
    },
  );

  test('legacy label hover does not set a control background', () => {
    render(
      <Grommet
        theme={{
          radioButton: { hover: { background: { color: '#ddeeff' } } },
        }}
      >
        <RadioButton name="option" label="Option" />
      </Grommet>,
    );
    const { control, label } = getControl();
    expect(control).not.toHaveStyleRule('background-color');
    expect(label).toHaveStyleRule('background-color', '#ddeeff', {
      modifier: ':hover',
    });
    expect(label).not.toHaveStyleRule('background-color', undefined, {
      modifier: `:hover ${controlSelector}`,
    });
  });

  test('control hover does not set a label background', () => {
    render(
      <Grommet
        theme={{
          radioButton: {
            check: { hover: { background: { color: '#ffccaa' } } },
          },
        }}
      >
        <RadioButton name="option" label="Option" />
      </Grommet>,
    );
    const { label } = getControl();
    expect(label).toHaveStyleRule('background-color', '#ffccaa', {
      modifier: `:hover ${controlSelector}`,
    });
    expect(label).not.toHaveStyleRule('background-color', undefined, {
      modifier: ':hover',
    });
  });

  test.each([false, true])(
    'disabled controls retain their fill and suppress hover (checked=%s)',
    async (checked) => {
      const user = userEvent.setup();
      render(
        <Grommet theme={theme}>
          <RadioButton
            name="option"
            label="Option"
            checked={checked}
            disabled
            {...{ focus: true, focusIndicator: false }}
          />
        </Grommet>,
      );
      await user.hover(screen.getByText('Option'));
      const { control, label } = getControl();
      expect(control).toHaveStyleRule(
        'background-color',
        checked ? '#aaddff' : '#eeeeee',
      );
      expect(label).not.toHaveStyleRule('background-color', '#ffccaa', {
        modifier: `:hover ${controlSelector}`,
      });
      expect(label).not.toHaveStyleRule('background-color', '#ffccaa', {
        modifier: controlSelector,
      });
      expect(label).not.toHaveStyleRule('background-color', '#ddeeff', {
        modifier: ':hover',
      });
    },
  );

  test.each([false, true])(
    'focus only emulates hover without a focus indicator (indicator=%s)',
    async (focusIndicator) => {
      const user = userEvent.setup();
      render(
        <Grommet theme={theme}>
          <RadioButton
            name="option"
            label="Option"
            checked
            onChange={jest.fn()}
            {...{ focusIndicator }}
          />
        </Grommet>,
      );
      await user.tab();
      const { input, label } = getControl();
      expect(document.activeElement).toBe(input);
      if (focusIndicator) {
        expect(label).not.toHaveStyleRule('background-color', '#ffccaa', {
          modifier: controlSelector,
        });
      } else {
        expect(label).toHaveStyleRule('background-color', '#ffccaa', {
          modifier: controlSelector,
        });
      }
      await user.tab();
      expect(label).not.toHaveStyleRule('background-color', '#ffccaa', {
        modifier: controlSelector,
      });
    },
  );

  test('custom children keep their fill on hover and focus', async () => {
    const user = userEvent.setup();
    render(
      <Grommet theme={theme}>
        <RadioButton
          name="option"
          label="Option"
          {...{ focusIndicator: false }}
        >
          {() => <Box background="#112233">Custom control</Box>}
        </RadioButton>
      </Grommet>,
    );
    await user.hover(screen.getByText('Option'));
    await user.tab();
    const { control } = getControl();
    expect(control.matches(controlSelector)).toBe(false);
    expect(control).toHaveStyleRule('background-color', '#112233');
    expect(control).not.toHaveStyleRule('background-color', '#ffccaa');
  });

  test('label clicks preserve the native change event', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Grommet theme={theme}>
        <RadioButton
          name="option"
          value="one"
          label="Option"
          onChange={onChange}
        />
      </Grommet>,
    );
    await user.click(screen.getByText('Option'));
    const { input, control } = getControl();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target).toBe(input);
    expect(onChange.mock.calls[0][0].target.value).toBe('one');
    expect(input.hasAttribute('backgroundColor')).toBe(false);
    expect(control.hasAttribute('backgroundColor')).toBe(false);
  });

  test.each([false, true])(
    'focus without a hover token retains the state fill (checked=%s)',
    async (checked) => {
      const user = userEvent.setup();
      render(
        <Grommet
          theme={{
            radioButton: {
              background: { color: '#eeeeee' },
              check: { background: { color: '#aaddff' } },
            },
          }}
        >
          <RadioButton
            name="option"
            label="Option"
            checked={checked}
            onChange={jest.fn()}
            {...{ focusIndicator: false }}
          />
        </Grommet>,
      );
      await user.tab();
      const { control, label } = getControl();
      expect(control).toHaveStyleRule(
        'background-color',
        checked ? '#aaddff' : '#eeeeee',
      );
      expect(label).not.toHaveStyleRule('background-color', undefined, {
        modifier: controlSelector,
      });
    },
  );

  test('keeps custom icons, extend hooks, and existing border semantics', () => {
    render(
      <Grommet
        theme={{
          ...theme,
          radioButton: {
            ...theme.radioButton,
            border: { color: '#123456' },
            color: '#abcdef',
            icons: { circle: FormCheckmark },
            icon: { extend: 'fill: #112233;' },
            check: {
              ...theme.radioButton?.check,
              extend: 'background-color: #334455;',
            },
            hover: { border: { color: '#654321' } },
            container: { extend: 'outline-offset: 3px;' },
            extend: 'padding: 1px;',
          },
        }}
      >
        <RadioButton
          name="option"
          label="Option"
          checked
          onChange={jest.fn()}
        />
      </Grommet>,
    );
    const { control, label } = getControl();
    expect(control).toHaveStyleRule('background-color', '#334455');
    expect(control).toHaveStyleRule('border', 'solid 2px #abcdef');
    expect(control.firstElementChild).toHaveStyleRule('fill', '#112233');
    expect(control.parentElement).toHaveStyleRule('padding', '1px');
    expect(label).toHaveStyleRule('outline-offset', '3px');
    expect(label).toHaveStyleRule('border-color', '#654321', {
      modifier: ':hover input:not([disabled])+div',
    });
  });
});
