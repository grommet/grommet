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
import { CheckBox } from '..';
import { ThemeType } from '../../../themes';

const { StyledCheckBoxBox } = jest.requireActual<{
  StyledCheckBoxBox: { styledComponentId: string };
}>('../StyledCheckBox');
const controlClass = StyledCheckBoxBox.styledComponentId;
const controlSelector = `input:not([disabled])+.${controlClass}`;

const theme: ThemeType = {
  global: {
    colors: {
      'control-fill': { light: '#eeeeee', dark: '#222222' },
      'selected-fill': { light: '#aaddff', dark: '#224466' },
      'hover-fill': { light: '#ffccaa', dark: '#663322' },
    },
  },
  checkBox: {
    background: { color: 'control-fill' },
    check: {
      background: { color: 'selected-fill' },
      hover: { background: { color: 'hover-fill' } },
    },
    hover: { background: { color: '#ddeeff' } },
  },
};

const getControl = () => {
  const input = screen.getByRole('checkbox', { name: /Option$/ });
  return {
    input,
    control: input.nextElementSibling as HTMLElement,
    label: input.closest('label') as HTMLLabelElement,
  };
};

describe('CheckBox control backgrounds', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <Grommet theme={theme}>
        <CheckBox label="Option" />
      </Grommet>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  test.each([
    [false, false, '#eeeeee'],
    [true, false, '#aaddff'],
    [false, true, '#aaddff'],
  ] as const)(
    'normal/selected fill: checked=%s indeterminate=%s',
    (checked, indeterminate, color) => {
      render(
        <Grommet theme={theme}>
          <CheckBox
            label="Option"
            checked={checked}
            indeterminate={indeterminate}
          />
        </Grommet>,
      );
      expect(getControl().control).toHaveStyleRule('background-color', color);
    },
  );

  test.each([false, true])(
    'selected fill falls back to normal (indeterminate=%s)',
    (indeterminate) => {
      render(
        <Grommet theme={{ checkBox: { background: { color: '#eeeeee' } } }}>
          <CheckBox
            label="Option"
            checked={!indeterminate}
            indeterminate={indeterminate}
          />
        </Grommet>,
      );
      expect(getControl().control).toHaveStyleRule(
        'background-color',
        '#eeeeee',
      );
    },
  );

  test('selected fill can be transparent', () => {
    render(
      <Grommet
        theme={{
          checkBox: {
            background: { color: '#eeeeee' },
            check: { background: { color: 'transparent' } },
          },
        }}
      >
        <CheckBox label="Option" checked />
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
          <CheckBox label="Option" />
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
          <CheckBox label="Option" checked />
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

  test.each([
    [false, false],
    [true, false],
    [false, true],
  ] as const)(
    'label hover overrides the control fill: checked=%s indeterminate=%s',
    async (checked, indeterminate) => {
      const user = userEvent.setup();
      render(
        <Grommet theme={theme}>
          <CheckBox
            label="Option"
            checked={checked}
            indeterminate={indeterminate}
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
        checked || indeterminate ? '#aaddff' : '#eeeeee',
      );
    },
  );

  test('legacy label hover does not set a control background', () => {
    render(
      <Grommet
        theme={{ checkBox: { hover: { background: { color: '#ddeeff' } } } }}
      >
        <CheckBox label="Option" />
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
          checkBox: {
            check: { hover: { background: { color: '#ffccaa' } } },
          },
        }}
      >
        <CheckBox label="Option" />
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
          <CheckBox
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
          <CheckBox label="Option" checked {...{ focusIndicator }} />
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
        <CheckBox label="Option" {...{ focusIndicator: false }}>
          {() => <Box background="#112233">Custom control</Box>}
        </CheckBox>
      </Grommet>,
    );
    await user.hover(screen.getByText('Option'));
    await user.tab();
    const { control } = getControl();
    expect(control.matches(controlSelector)).toBe(false);
    expect(control).toHaveStyleRule('background-color', '#112233');
    expect(control).not.toHaveStyleRule('background-color', '#ffccaa');
  });

  test.each([false, true])(
    'toggle styling is unaffected, including hover and focus (checked=%s)',
    async (checked) => {
      const user = userEvent.setup();
      render(
        <Grommet
          theme={{
            ...theme,
            checkBox: {
              ...theme.checkBox,
              toggle: { background: '#112233' },
            },
          }}
        >
          <CheckBox
            label="Option"
            toggle
            checked={checked}
            {...{ focusIndicator: false }}
          />
        </Grommet>,
      );
      await user.hover(screen.getByText('Option'));
      await user.tab();
      const { control, label } = getControl();
      expect(control.matches(controlSelector)).toBe(false);
      expect(control).toHaveStyleRule('background-color', '#112233');
      expect(label).toHaveStyleRule('background-color', '#ddeeff', {
        modifier: ':hover',
      });
    },
  );

  test('label clicks preserve native events and update the fill', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Grommet theme={theme}>
        <CheckBox label="Option" onChange={onChange} />
      </Grommet>,
    );
    await user.click(screen.getByText('Option'));
    const { input, control } = getControl();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target).toBe(input);
    expect(control).toHaveStyleRule('background-color', '#aaddff');
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
            checkBox: {
              background: { color: '#eeeeee' },
              check: { background: { color: '#aaddff' } },
            },
          }}
        >
          <CheckBox
            label="Option"
            checked={checked}
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
          checkBox: {
            ...theme.checkBox,
            border: { color: '#123456' },
            color: '#abcdef',
            icons: { checked: FormCheckmark },
            icon: { extend: 'stroke: #112233;' },
            check: {
              ...theme.checkBox?.check,
              extend: 'background-color: #334455;',
            },
            hover: {
              border: { color: '#654321' },
              extend: 'border-style: dashed;',
            },
            extend: 'outline-offset: 3px;',
          },
        }}
      >
        <CheckBox label="Option" checked />
      </Grommet>,
    );
    const { control, label } = getControl();
    expect(control).toHaveStyleRule('background-color', '#334455');
    expect(control).toHaveStyleRule('border', 'solid 2px #abcdef');
    expect(control.firstElementChild).toHaveStyleRule('stroke', '#112233');
    expect(label).toHaveStyleRule('outline-offset', '3px');
    expect(label).toHaveStyleRule('border-color', '#654321', {
      modifier: ':hover input:not([disabled])+div',
    });
    expect(label).toHaveStyleRule('border-style', 'dashed', {
      modifier: ':hover input:not([disabled])+div',
    });
  });

  test('disabled indeterminate controls retain the selected fill', async () => {
    const user = userEvent.setup();
    render(
      <Grommet theme={theme}>
        <CheckBox label="Option" indeterminate disabled />
      </Grommet>,
    );
    await user.hover(screen.getByText('Option'));
    const { control, label } = getControl();
    expect(control).toHaveStyleRule('background-color', '#aaddff');
    expect(label).not.toHaveStyleRule('background-color', '#ffccaa', {
      modifier: `:hover ${controlSelector}`,
    });
  });
});
