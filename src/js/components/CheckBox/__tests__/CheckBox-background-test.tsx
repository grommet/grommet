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
import { deepMerge } from '../../../utils';
import { hpe } from 'grommet-theme-hpe';

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

const revisedTheme: ThemeType = {
  global: theme.global,
  checkBox: {
    control: {
      background: 'control-fill',
      hover: { background: { color: '#ffccaa' } },
      selected: {
        background: { color: 'selected-fill' },
        hover: { background: '#bbddaa' },
      },
    },
    container: {
      background: '#f0f0f0',
      hover: { background: { color: '#ddeeff' } },
    },
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
  test('overrides HPE control backgrounds with merged theme values', () => {
    const hpeTheme: ThemeType = deepMerge(hpe, {
      checkBox: {
        control: {
          background: { color: 'blue' },
          selected: { background: { color: 'purple' } },
        },
        extend: undefined,
      },
    });
    render(
      <Grommet>
        <Grommet theme={hpeTheme} themeMode="light" background="background">
          <CheckBox label="Option" />
          <CheckBox label="Selected" checked />
        </Grommet>
      </Grommet>,
    );
    expect(getControl().control).toHaveStyleRule(
      'background-color',
      'rgba(0, 112, 248, 1)',
    );
    const selected = screen.getByRole('checkbox', { name: 'Selected' });
    expect(selected.nextElementSibling).toHaveStyleRule(
      'background-color',
      'rgba(119, 100, 252, 1)',
    );
  });

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

  test.each([
    [false, false, '#eeeeee', 'rgba(255, 204, 170, 1)'],
    [true, false, 'rgba(170, 221, 255, 1)', '#bbddaa'],
    [false, true, 'rgba(170, 221, 255, 1)', '#bbddaa'],
  ] as const)(
    'new state matrix: checked=%s indeterminate=%s',
    async (checked, indeterminate, normal, hover) => {
      const user = userEvent.setup();
      render(
        <Grommet theme={revisedTheme}>
          <CheckBox
            label="Option"
            checked={checked}
            indeterminate={indeterminate}
          />
        </Grommet>,
      );
      const { control, label } = getControl();
      expect(control).toHaveStyleRule('background-color', normal);
      expect(label).toHaveStyleRule('background-color', '#f0f0f0');
      await user.hover(screen.getByText('Option'));
      expect(label).toHaveStyleRule('background-color', hover, {
        modifier: `:hover ${controlSelector}`,
      });
      expect(label).toHaveStyleRule(
        'background-color',
        'rgba(221, 238, 255, 1)',
        {
          modifier: ':hover',
        },
      );
      await user.unhover(screen.getByText('Option'));
      expect(control).toHaveStyleRule('background-color', normal);
      expect(label).toHaveStyleRule('background-color', '#f0f0f0');
    },
  );

  test.each([
    [false, false],
    [true, false],
    [false, true],
  ] as const)(
    'missing state hover never inherits the other state: checked=%s indeterminate=%s',
    async (checked, indeterminate) => {
      const user = userEvent.setup();
      const selected = checked || indeterminate;
      render(
        <Grommet
          theme={{
            checkBox: {
              control: {
                background: '#eeeeee',
                hover: selected ? { background: '#ffccaa' } : undefined,
                selected: {
                  background: '#aaddff',
                  hover: selected ? undefined : { background: '#bbddaa' },
                },
              },
              container: { background: '#f0f0f0' },
            },
          }}
        >
          <CheckBox
            label="Option"
            checked={checked}
            indeterminate={indeterminate}
            {...{ focusIndicator: false }}
          />
        </Grommet>,
      );
      expect(getControl().label).toHaveStyleRule('background-color', '#f0f0f0');
      await user.hover(screen.getByText('Option'));
      await user.tab();
      const { control, label } = getControl();
      expect(control).toHaveStyleRule(
        'background-color',
        selected ? '#aaddff' : '#eeeeee',
      );
      expect(label).not.toHaveStyleRule('background-color', undefined, {
        modifier: `:hover ${controlSelector}`,
      });
      expect(label).not.toHaveStyleRule('background-color', undefined, {
        modifier: controlSelector,
      });
      expect(label).toHaveStyleRule('background-color', '#f0f0f0');
      expect(label).not.toHaveStyleRule('background-color', undefined, {
        modifier: ':hover',
      });
    },
  );

  test.each(['light', 'dark'] as const)(
    'new backgrounds resolve symbolic and direct light/dark colors in %s mode',
    (mode) => {
      render(
        <Grommet
          theme={{
            ...revisedTheme,
            checkBox: {
              ...revisedTheme.checkBox,
              container: {
                background: { color: { light: '#f0f0f0', dark: '#101010' } },
                hover: { background: 'hover-fill' },
              },
            },
          }}
          themeMode={mode}
          background={mode === 'dark' ? 'black' : 'white'}
        >
          <CheckBox label="Option" checked />
        </Grommet>,
      );
      const { control, label } = getControl();
      expect(control).toHaveStyleRule(
        'background-color',
        mode === 'light' ? 'rgba(170, 221, 255, 1)' : 'rgba(34, 68, 102, 1)',
      );
      expect(label).toHaveStyleRule(
        'background-color',
        mode === 'light' ? 'rgba(240, 240, 240, 1)' : 'rgba(16, 16, 16, 1)',
      );
      expect(label).toHaveStyleRule(
        'background-color',
        mode === 'light' ? '#ffccaa' : '#663322',
        { modifier: ':hover' },
      );
      expect(label).not.toHaveStyleRule('color');
    },
  );

  test.each([
    [false, false],
    [true, false],
    [false, true],
  ] as const)(
    'explicit new tokens beat legacy tokens, including transparent: checked=%s indeterminate=%s',
    (checked, indeterminate) => {
      render(
        <Grommet
          theme={{
            ...theme,
            checkBox: {
              ...theme.checkBox,
              control: {
                background: 'transparent',
                hover: { background: 'transparent' },
                selected: {
                  background: { color: 'transparent' },
                  hover: { background: { color: 'transparent' } },
                },
              },
              container: {
                background: { color: 'transparent' },
                hover: { background: 'transparent' },
              },
            },
          }}
        >
          <CheckBox
            label="Option"
            checked={checked}
            indeterminate={indeterminate}
          />
        </Grommet>,
      );
      const { control, label } = getControl();
      expect(control).toHaveStyleRule('background-color', 'transparent');
      expect(label).toHaveStyleRule('background-color', 'transparent');
      expect(label).toHaveStyleRule('background-color', 'transparent', {
        modifier: ':hover',
      });
      expect(label).toHaveStyleRule('background-color', 'transparent', {
        modifier: `:hover ${controlSelector}`,
      });
    },
  );

  test.each([
    [false, false, true, '#112233', '#445566'],
    [true, false, true, '#aaddff', '#ffccaa'],
    [false, true, true, '#aaddff', '#ffccaa'],
    [true, false, false, '#112233', '#ffccaa'],
    [false, true, false, '#112233', '#ffccaa'],
  ] as const)(
    'mixed fallback: checked=%s indeterminate=%s legacySelected=%s',
    async (checked, indeterminate, legacySelected, normal, hover) => {
      const user = userEvent.setup();
      render(
        <Grommet
          theme={{
            ...theme,
            checkBox: {
              ...theme.checkBox,
              check: {
                ...theme.checkBox?.check,
                background: legacySelected
                  ? { color: 'selected-fill' }
                  : undefined,
              },
              control: {
                background: '#112233',
                hover: { background: '#445566' },
              },
              container: { background: '#f0f0f0' },
            },
          }}
        >
          <CheckBox
            label="Option"
            checked={checked}
            indeterminate={indeterminate}
            {...{ focusIndicator: false }}
          />
        </Grommet>,
      );
      await user.tab();
      const { control, label } = getControl();
      expect(control).toHaveStyleRule('background-color', normal);
      expect(label).toHaveStyleRule('background-color', hover, {
        modifier: `:hover ${controlSelector}`,
      });
      expect(label).toHaveStyleRule('background-color', hover, {
        modifier: controlSelector,
      });
      expect(label).toHaveStyleRule('background-color', '#ddeeff');
      expect(label).toHaveStyleRule('background-color', '#ddeeff', {
        modifier: ':hover',
      });
    },
  );

  test.each(['control', 'container'] as const)(
    'new %s backgrounds only fill their own anatomy',
    async (anatomy) => {
      const user = userEvent.setup();
      render(
        <Grommet
          theme={{
            checkBox: {
              [anatomy]: {
                background: '#112233',
                hover: { background: { color: '#445566' } },
              },
            },
          }}
        >
          <CheckBox label="Option" {...{ focusIndicator: false }} />
        </Grommet>,
      );
      await user.hover(screen.getByText('Option'));
      const { control, label } = getControl();
      if (anatomy === 'control') {
        expect(control).toHaveStyleRule('background-color', '#112233');
        expect(label).toHaveStyleRule(
          'background-color',
          'rgba(68, 85, 102, 1)',
          {
            modifier: `:hover ${controlSelector}`,
          },
        );
        expect(label).not.toHaveStyleRule('background-color');
        expect(label).not.toHaveStyleRule('background-color', undefined, {
          modifier: ':hover',
        });
      } else {
        expect(control).not.toHaveStyleRule('background-color');
        expect(label).toHaveStyleRule('background-color', '#112233');
        expect(label).toHaveStyleRule(
          'background-color',
          'rgba(68, 85, 102, 1)',
          {
            modifier: ':hover',
          },
        );
        expect(label).not.toHaveStyleRule('background-color', undefined, {
          modifier: `:hover ${controlSelector}`,
        });
      }
      await user.tab();
      if (anatomy === 'control') {
        expect(label).toHaveStyleRule(
          'background-color',
          'rgba(68, 85, 102, 1)',
          {
            modifier: controlSelector,
          },
        );
        expect(label).not.toHaveStyleRule('background-color');
      } else
        expect(label).toHaveStyleRule(
          'background-color',
          'rgba(68, 85, 102, 1)',
        );
    },
  );

  test('new hover-only tokens retain legacy normal and selected backgrounds', () => {
    const mixedTheme: ThemeType = {
      ...theme,
      checkBox: {
        ...theme.checkBox,
        control: { selected: { hover: { background: '#112233' } } },
      },
    };
    const { rerender } = render(
      <Grommet theme={mixedTheme}>
        <CheckBox label="Option" />
      </Grommet>,
    );
    expect(getControl().control).toHaveStyleRule('background-color', '#eeeeee');
    expect(getControl().label).toHaveStyleRule('background-color', '#ffccaa', {
      modifier: `:hover ${controlSelector}`,
    });
    rerender(
      <Grommet theme={mixedTheme}>
        <CheckBox label="Option" checked />
      </Grommet>,
    );
    expect(getControl().control).toHaveStyleRule('background-color', '#aaddff');
    expect(getControl().label).toHaveStyleRule('background-color', '#112233', {
      modifier: `:hover ${controlSelector}`,
    });
  });

  test('controlled rerenders update hover across all selection states', () => {
    const { rerender } = render(
      <Grommet theme={revisedTheme}>
        <CheckBox label="Option" checked={false} />
      </Grommet>,
    );
    expect(getControl().label).toHaveStyleRule(
      'background-color',
      'rgba(255, 204, 170, 1)',
      { modifier: `:hover ${controlSelector}` },
    );
    rerender(
      <Grommet theme={revisedTheme}>
        <CheckBox label="Option" checked />
      </Grommet>,
    );
    expect(getControl().label).toHaveStyleRule('background-color', '#bbddaa', {
      modifier: `:hover ${controlSelector}`,
    });
    rerender(
      <Grommet theme={revisedTheme}>
        <CheckBox label="Option" checked={false} indeterminate />
      </Grommet>,
    );
    expect(getControl().control).toHaveStyleRule(
      'background-color',
      'rgba(170, 221, 255, 1)',
    );
    expect(getControl().label).toHaveStyleRule('background-color', '#bbddaa', {
      modifier: `:hover ${controlSelector}`,
    });
    rerender(
      <Grommet theme={revisedTheme}>
        <CheckBox label="Option" checked={false} />
      </Grommet>,
    );
    expect(getControl().control).toHaveStyleRule('background-color', '#eeeeee');
    expect(getControl().label).toHaveStyleRule(
      'background-color',
      'rgba(255, 204, 170, 1)',
      { modifier: `:hover ${controlSelector}` },
    );
  });

  test('uncontrolled changes update state-specific hover while the label remains hovered', async () => {
    const user = userEvent.setup();
    render(
      <Grommet theme={revisedTheme}>
        <CheckBox label="Option" />
      </Grommet>,
    );
    await user.click(screen.getByText('Option'));
    expect(getControl().control).toHaveStyleRule(
      'background-color',
      'rgba(170, 221, 255, 1)',
    );
    expect(getControl().label).toHaveStyleRule('background-color', '#bbddaa', {
      modifier: `:hover ${controlSelector}`,
    });
    await user.click(screen.getByText('Option'));
    expect(getControl().control).toHaveStyleRule('background-color', '#eeeeee');
    expect(getControl().label).toHaveStyleRule(
      'background-color',
      'rgba(255, 204, 170, 1)',
      { modifier: `:hover ${controlSelector}` },
    );
  });

  test.each([
    [false, false],
    [true, false],
    [false, true],
  ] as const)(
    'new disabled backgrounds suppress all hover and focus fills: checked=%s indeterminate=%s',
    async (checked, indeterminate) => {
      const user = userEvent.setup();
      render(
        <Grommet theme={revisedTheme}>
          <CheckBox
            label="Option"
            checked={checked}
            indeterminate={indeterminate}
            disabled
            {...{ focus: true, focusIndicator: false }}
          />
        </Grommet>,
      );
      await user.hover(screen.getByText('Option'));
      const { control, label } = getControl();
      expect(control).toHaveStyleRule(
        'background-color',
        checked || indeterminate ? 'rgba(170, 221, 255, 1)' : '#eeeeee',
      );
      expect(label).toHaveStyleRule('background-color', '#f0f0f0');
      expect(label).not.toHaveStyleRule('background-color', undefined, {
        modifier: ':hover',
      });
      expect(label).not.toHaveStyleRule('background-color', undefined, {
        modifier: `:hover ${controlSelector}`,
      });
      expect(label).not.toHaveStyleRule('background-color', undefined, {
        modifier: controlSelector,
      });
    },
  );

  test.each([
    [false, false, false],
    [true, false, false],
    [false, true, false],
    [false, false, true],
    [true, false, true],
    [false, true, true],
  ] as const)(
    'new focus emulates current-state hover only without an indicator: checked=%s indeterminate=%s indicator=%s',
    async (checked, indeterminate, focusIndicator) => {
      const user = userEvent.setup();
      render(
        <Grommet theme={revisedTheme}>
          <CheckBox
            label="Option"
            checked={checked}
            indeterminate={indeterminate}
            {...{ focusIndicator }}
          />
        </Grommet>,
      );
      await user.tab();
      const { input, label } = getControl();
      expect(document.activeElement).toBe(input);
      if (focusIndicator) {
        expect(label).not.toHaveStyleRule('background-color', undefined, {
          modifier: controlSelector,
        });
        expect(label).toHaveStyleRule('background-color', '#f0f0f0');
      } else {
        expect(label).toHaveStyleRule(
          'background-color',
          checked || indeterminate ? '#bbddaa' : 'rgba(255, 204, 170, 1)',
          { modifier: controlSelector },
        );
        expect(label).toHaveStyleRule(
          'background-color',
          'rgba(221, 238, 255, 1)',
        );
      }
      await user.tab();
      expect(label).toHaveStyleRule('background-color', '#f0f0f0');
      expect(label).not.toHaveStyleRule('background-color', undefined, {
        modifier: controlSelector,
      });
    },
  );

  test.each([false, true])(
    'new container fills apply to toggles without affecting track or knob (checked=%s)',
    async (checked) => {
      const user = userEvent.setup();
      render(
        <Grommet
          theme={{
            ...revisedTheme,
            checkBox: {
              ...revisedTheme.checkBox,
              toggle: { background: '#112233', color: '#445566' },
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
      const { control, label } = getControl();
      expect(label).toHaveStyleRule('background-color', '#f0f0f0');
      await user.hover(screen.getByText('Option'));
      await user.tab();
      expect(control.matches(controlSelector)).toBe(false);
      expect(control).toHaveStyleRule('background-color', '#112233');
      expect(control.firstElementChild).toHaveStyleRule(
        'background',
        '#445566',
      );
      expect(label).toHaveStyleRule(
        'background-color',
        'rgba(221, 238, 255, 1)',
      );
      expect(label).toHaveStyleRule(
        'background-color',
        'rgba(221, 238, 255, 1)',
        {
          modifier: ':hover',
        },
      );
    },
  );

  test('new tokens preserve custom children and extend precedence', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Grommet theme={revisedTheme}>
        <CheckBox label="Option" {...{ focusIndicator: false }}>
          {() => <Box background="#112233">Custom control</Box>}
        </CheckBox>
      </Grommet>,
    );
    await user.hover(screen.getByText('Option'));
    await user.tab();
    expect(getControl().control.matches(controlSelector)).toBe(false);
    expect(getControl().control).toHaveStyleRule('background-color', '#112233');
    expect(getControl().label).toHaveStyleRule(
      'background-color',
      'rgba(221, 238, 255, 1)',
    );
    rerender(
      <Grommet
        theme={{
          ...revisedTheme,
          checkBox: {
            ...revisedTheme.checkBox,
            check: { extend: 'background-color: #334455;' },
            hover: {
              border: { color: '#654321' },
              extend: 'border-style: dashed;',
            },
            extend:
              'background-color: #778899; &:hover { background-color: #aabbcc; }',
          },
        }}
      >
        <CheckBox label="Option" checked />
      </Grommet>,
    );
    const { control, label } = getControl();
    expect(control).toHaveStyleRule('background-color', '#334455');
    expect(label).toHaveStyleRule('background-color', '#778899');
    expect(label).toHaveStyleRule('background-color', '#aabbcc', {
      modifier: ':hover',
    });
    expect(label).toHaveStyleRule('border-color', '#654321', {
      modifier: ':hover input:not([disabled])+div',
    });
    expect(label).toHaveStyleRule('border-style', 'dashed', {
      modifier: ':hover input:not([disabled])+div',
    });
  });
});
