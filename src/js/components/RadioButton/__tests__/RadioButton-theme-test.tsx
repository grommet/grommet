// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { FormCheckmark } from 'grommet-icons';
import '@testing-library/jest-dom';
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
const selector = (checked: boolean) =>
  `input:not([disabled])${
    checked ? ':checked' : ':not(:checked)'
  }+.${controlClass}`;

type RadioTheme = NonNullable<ThemeType['radioButton']>;
const normal = '#eeeeee';
const selected = '#aaddff';
const hover = '#ffccaa';
const selectedHover = '#aaccee';
const containerFill = '#f0f0f0';
const containerHover = '#ddeeff';
const normalRgba = 'rgba(238, 238, 238, 1)';
const selectedRgba = 'rgba(170, 221, 255, 1)';
const hoverRgba = 'rgba(255, 204, 170, 1)';
const containerFillRgba = 'rgba(240, 240, 240, 1)';
const containerHoverRgba = 'rgba(221, 238, 255, 1)';
const theme: ThemeType = {
  radioButton: {
    control: {
      background: normal,
      hover: { background: { color: hover } },
      selected: {
        background: { color: selected },
        hover: { background: selectedHover },
      },
    },
    container: {
      background: { color: containerFill },
      hover: { background: containerHover },
    },
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

const fillCases: {
  name: string;
  radioButton: RadioTheme;
  normal: string;
  selected: string;
}[] = [
  {
    name: 'new string normal supplies the selected fallback',
    radioButton: { control: { background: normal } },
    normal,
    selected: normal,
  },
  {
    name: 'new object normal supplies the selected fallback',
    radioButton: { control: { background: { color: normal } } },
    normal: normalRgba,
    selected: normalRgba,
  },
  {
    name: 'new normal and selected beat legacy fills',
    radioButton: {
      background: { color: '#111111' },
      check: { background: { color: '#222222' } },
      control: { background: normal, selected: { background: selected } },
    },
    normal,
    selected,
  },
  {
    name: 'legacy selected beats the new normal fallback',
    radioButton: {
      control: { background: normal },
      check: { background: { color: selected } },
    },
    normal,
    selected,
  },
  {
    name: 'new selected mixes with legacy normal',
    radioButton: {
      background: { color: normal },
      control: { selected: { background: { color: selected } } },
    },
    normal,
    selected: selectedRgba,
  },
  {
    name: 'transparent new selected beats legacy selected',
    radioButton: {
      background: { color: normal },
      check: { background: { color: selected } },
      control: { selected: { background: 'transparent' } },
    },
    normal,
    selected: 'transparent',
  },
];

const hoverCases: {
  name: string;
  radioButton: RadioTheme;
  normal?: string;
  selected?: string;
  selectedFill?: string;
}[] = [
  {
    name: 'distinct state-specific hover backgrounds',
    radioButton: theme.radioButton!,
    normal: hoverRgba,
    selected: selectedHover,
    selectedFill: selectedRgba,
  },
  {
    name: 'unselected hover never applies to selected',
    radioButton: { control: { hover: { background: hover } } },
    normal: hover,
  },
  {
    name: 'selected hover never applies to unselected',
    radioButton: {
      control: { selected: { hover: { background: selectedHover } } },
    },
    selected: selectedHover,
  },
  {
    name: 'neither hover is required',
    radioButton: {},
  },
  {
    name: 'explicit string hover backgrounds for both states',
    radioButton: {
      control: {
        hover: { background: hover },
        selected: { hover: { background: selectedHover } },
      },
    },
    normal: hover,
    selected: selectedHover,
  },
  {
    name: 'transparent hover backgrounds for both states',
    radioButton: {
      control: {
        hover: { background: 'transparent' },
        selected: { hover: { background: 'transparent' } },
      },
    },
    normal: 'transparent',
    selected: 'transparent',
  },
  {
    name: 'object hover backgrounds for both states',
    radioButton: {
      ...theme.radioButton,
      control: {
        ...theme.radioButton?.control,
        selected: {
          ...theme.radioButton?.control?.selected,
          hover: { background: { color: selectedHover } },
        },
      },
    },
    normal: hoverRgba,
    selected: 'rgba(170, 204, 238, 1)',
    selectedFill: selectedRgba,
  },
];

describe('RadioButton theme', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <Grommet theme={theme}>
        <RadioButton name="option" label="Option" />
      </Grommet>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  test('legacy label hover does not set a control background', async () => {
    const user = userEvent.setup();
    render(
      <Grommet
        theme={{
          radioButton: { hover: { background: { color: containerHover } } },
        }}
      >
        <RadioButton name="option" label="Option" />
      </Grommet>,
    );
    await user.hover(screen.getByText('Option'));
    const { control, label } = getControl();
    expect(control).not.toHaveStyleRule('background-color');
    expect(label).toHaveStyleRule('background-color', containerHover, {
      modifier: ':hover',
    });
    expect(label).not.toHaveStyleRule('background-color', undefined, {
      modifier: `:hover ${selector(false)}`,
    });
  });

  test.each([
    [false, false],
    [true, false],
    [false, true],
    [true, true],
  ])(
    'Box-part styles and state overrides (checked=%s, disabled=%s)',
    async (checked, disabled) => {
      const user = userEvent.setup();
      render(
        <Grommet
          theme={{
            radioButton: {
              control: {
                border: { color: '#123456', size: '3px' },
                elevation: 'small',
                height: { min: '28px', height: '36px' },
                width: { width: '40px', max: '48px' },
                margin: { end: '4px' },
                pad: '3px',
                round: '6px',
                hover: {
                  border: { color: '#abcdef' },
                  elevation: 'medium',
                  pad: '5px',
                  round: '10px',
                },
                selected: {
                  border: { color: '#654321' },
                  pad: '4px',
                  hover: { border: false, round: false, pad: '6px' },
                },
              },
              container: {
                border: [
                  { side: 'top', color: '#112233', size: '2px' },
                  { side: 'bottom', color: '#334455', size: '1px' },
                ],
                elevation: 'small',
                height: { min: '40px', height: '60px' },
                width: { min: '100px', width: '240px', max: '300px' },
                margin: { start: '4px' },
                pad: '8px',
                round: '6px',
                hover: {
                  border: false,
                  elevation: 'medium',
                  pad: '12px',
                  round: false,
                },
              },
            },
          }}
        >
          <RadioButton
            name="example"
            label="Option"
            checked={checked}
            disabled={disabled}
            readOnly
          />
        </Grommet>,
      );
      const { control, label } = getControl();
      expect(control).toHaveStyleRule(
        'border',
        `solid 3px ${checked ? '#654321' : '#123456'}`,
      );
      expect(control).toHaveStyleRule('min-height', '28px');
      expect(control).toHaveStyleRule('height', '36px');
      expect(control).toHaveStyleRule('width', '40px');
      expect(control).toHaveStyleRule('max-width', '48px');
      expect(control).toHaveStyleRule('margin-inline-end', '4px');
      expect(control).toHaveStyleRule('padding', checked ? '4px' : '3px');
      expect(control).toHaveStyleRule('border-radius', '6px');
      expect(control).toHaveStyleRule('box-shadow', expect.any(String));
      expect(label).toHaveStyleRule('box-sizing', 'border-box');
      expect(label).toHaveStyleRule('border-top', 'solid 2px #112233');
      expect(label).toHaveStyleRule('border-bottom', 'solid 1px #334455');
      expect(label).toHaveStyleRule('min-height', '40px');
      expect(label).toHaveStyleRule('height', '60px');
      expect(label).toHaveStyleRule('min-width', '100px');
      expect(label).toHaveStyleRule('width', '240px');
      expect(label).toHaveStyleRule('max-width', '300px');
      expect(label).toHaveStyleRule('margin-inline-start', '4px');
      expect(label).toHaveStyleRule('padding', '8px');
      expect(label).toHaveStyleRule('border-radius', '6px');
      expect(label).toHaveStyleRule('box-shadow', expect.any(String));
      await user.hover(screen.getByText('Option'));
      if (disabled) {
        expect(label).not.toHaveStyleRule('padding', undefined, {
          modifier: `:hover ${selector(checked)}`,
        });
        expect(label).not.toHaveStyleRule('padding', undefined, {
          modifier: ':hover',
        });
      } else {
        expect(label).toHaveStyleRule(
          'border',
          checked ? 'none' : 'solid 3px #abcdef',
          { modifier: `:hover ${selector(checked)}` },
        );
        expect(label).toHaveStyleRule('padding', checked ? '6px' : '5px', {
          modifier: `:hover ${selector(checked)}`,
        });
        expect(label).toHaveStyleRule('border-radius', checked ? '0' : '10px', {
          modifier: `:hover ${selector(checked)}`,
        });
        expect(label).toHaveStyleRule('padding', '12px', {
          modifier: ':hover',
        });
        expect(label).toHaveStyleRule('border', 'none', { modifier: ':hover' });
        expect(label).toHaveStyleRule('border-radius', '0', {
          modifier: ':hover',
        });
        expect(label).toHaveStyleRule('box-shadow', expect.any(String), {
          modifier: ':hover',
        });
      }
      expect(control).not.toHaveAttribute('$checked');
    },
  );

  test.each([false, true])(
    'Box-state focus styles respect focusIndicator=%s',
    async (focusIndicator) => {
      const user = userEvent.setup();
      render(
        <Grommet
          theme={{
            radioButton: {
              control: {
                border: false,
                round: false,
                selected: { hover: { pad: '6px' } },
              },
              container: { pad: '8px', hover: { pad: '12px' } },
            },
          }}
        >
          <RadioButton
            name="example"
            label="Option"
            checked
            readOnly
            {...{ focusIndicator }}
          />
        </Grommet>,
      );
      await user.tab();
      const { input, label, control } = getControl();
      expect(input).toHaveFocus();
      expect(control).toHaveStyleRule('border', 'none');
      expect(control).toHaveStyleRule('border-radius', '0');
      expect(label).toHaveStyleRule('padding', focusIndicator ? '8px' : '12px');
      if (focusIndicator)
        expect(label).not.toHaveStyleRule('padding', undefined, {
          modifier: selector(true),
        });
      else
        expect(label).toHaveStyleRule('padding', '6px', {
          modifier: selector(true),
        });
      await user.tab();
      expect(label).toHaveStyleRule('padding', '8px');
      expect(label).not.toHaveStyleRule('padding', undefined, {
        modifier: selector(true),
      });
    },
  );

  test('part styling preserves extension precedence and custom children', () => {
    const appearanceTheme: ThemeType = {
      radioButton: {
        control: { pad: '3px', round: '6px' },
        check: { extend: 'padding: 8px; border-radius: 2px;' },
        container: {
          pad: '4px',
          round: '6px',
          extend: 'padding: 12px; border-radius: 3px;',
        },
      },
    };
    const { rerender } = render(
      <Grommet theme={appearanceTheme}>
        <RadioButton name="example" label="Option" />
      </Grommet>,
    );
    expect(getControl().control).toHaveStyleRule('padding', '8px');
    expect(getControl().control).toHaveStyleRule('border-radius', '2px');
    expect(getControl().label).toHaveStyleRule('padding', '12px');
    expect(getControl().label).toHaveStyleRule('border-radius', '3px');
    rerender(
      <Grommet theme={appearanceTheme}>
        <RadioButton name="example" label="Option">
          {() => (
            <Box pad="16px" round="10px">
              Custom control
            </Box>
          )}
        </RadioButton>
      </Grommet>,
    );
    expect(getControl().control).toHaveStyleRule('padding', '16px');
    expect(getControl().control).toHaveStyleRule('border-radius', '10px');
    expect(getControl().label).toHaveStyleRule('padding', '12px');
  });

  describe.each([false, true])('checked=%s', (checked) => {
    test.each(fillCases)('$name', (testCase) => {
      render(
        <Grommet theme={{ radioButton: testCase.radioButton }}>
          <RadioButton
            name="option"
            label="Option"
            checked={checked}
            onChange={jest.fn()}
          />
        </Grommet>,
      );
      const { control, label } = getControl();
      expect(control).toHaveStyleRule(
        'background-color',
        checked ? testCase.selected : testCase.normal,
      );
      expect(control).not.toHaveAttribute('$controlBackground');
      expect(control).not.toHaveAttribute('backgroundColor');
      expect(label).not.toHaveAttribute('checked');
    });

    test.each(hoverCases)('$name on hover and focus', async (testCase) => {
      const user = userEvent.setup();
      const radioButton: RadioTheme = {
        ...testCase.radioButton,
        control: {
          background: normal,
          ...testCase.radioButton.control,
          selected: {
            background: selected,
            ...testCase.radioButton.control?.selected,
          },
        },
      };
      render(
        <Grommet theme={{ radioButton }}>
          <RadioButton
            name="option"
            label="Option"
            checked={checked}
            onChange={jest.fn()}
            {...{ focusIndicator: false }}
          />
        </Grommet>,
      );
      await user.hover(screen.getByText('Option'));
      const { input, control, label } = getControl();
      expect(control.matches(selector(checked))).toBe(true);
      const expected = checked ? testCase.selected : testCase.normal;
      if (expected) {
        expect(label).toHaveStyleRule('background-color', expected, {
          modifier: `:hover ${selector(checked)}`,
        });
      } else {
        expect(label).not.toHaveStyleRule('background-color', undefined, {
          modifier: `:hover ${selector(checked)}`,
        });
      }
      await user.unhover(screen.getByText('Option'));
      expect(control).toHaveStyleRule(
        'background-color',
        checked ? testCase.selectedFill || selected : normal,
      );
      await user.tab();
      expect(input).toHaveFocus();
      if (expected) {
        expect(label).toHaveStyleRule('background-color', expected, {
          modifier: selector(checked),
        });
      } else {
        expect(label).not.toHaveStyleRule('background-color', undefined, {
          modifier: selector(checked),
        });
      }
      await user.tab();
      expect(label).not.toHaveStyleRule('background-color', undefined, {
        modifier: selector(checked),
      });
    });

    test('disabled retains control and container fills without hover', async () => {
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
      const { input, control, label } = getControl();
      expect(input).toBeDisabled();
      expect(control).toHaveStyleRule(
        'background-color',
        checked ? selectedRgba : normal,
      );
      expect(label).toHaveStyleRule('background-color', containerFillRgba);
      expect(label).not.toHaveStyleRule('background-color', undefined, {
        modifier: ':hover',
      });
      [false, true].forEach((state) => {
        expect(label).not.toHaveStyleRule('background-color', undefined, {
          modifier: `:hover ${selector(state)}`,
        });
        expect(label).not.toHaveStyleRule('background-color', undefined, {
          modifier: selector(state),
        });
      });
    });
  });

  test.each([
    {
      name: 'new hover beats legacy',
      background: containerHover,
      legacy: '#112233',
      expected: containerHover,
    },
    {
      name: 'legacy hover is the fallback',
      legacy: '#112233',
      expected: '#112233',
    },
    {
      name: 'missing hover retains the normal container',
      expected: containerFill,
    },
  ])('container $name on hover and focus', async (testCase) => {
    const { background, legacy, expected } = testCase;
    const user = userEvent.setup();
    render(
      <Grommet
        theme={{
          radioButton: {
            container: {
              background: containerFill,
              hover: { background },
              extend: 'outline-offset: 3px;',
            },
            hover: { background: { color: legacy } },
          },
        }}
      >
        <RadioButton
          name="option"
          label="Option"
          {...{ focusIndicator: false }}
        />
      </Grommet>,
    );
    await user.hover(screen.getByText('Option'));
    const { control, label } = getControl();
    expect(control).not.toHaveStyleRule('background-color');
    expect(label).toHaveStyleRule('background-color', containerFill);
    if (background || legacy) {
      expect(label).toHaveStyleRule('background-color', expected, {
        modifier: ':hover',
      });
    } else {
      expect(label).not.toHaveStyleRule('background-color', undefined, {
        modifier: ':hover',
      });
    }
    await user.unhover(screen.getByText('Option'));
    await user.tab();
    expect(label).toHaveStyleRule('background-color', expected);
    expect(label).toHaveStyleRule('outline-offset', '3px');
    await user.tab();
    expect(label).toHaveStyleRule('background-color', containerFill);
  });

  test.each(['light', 'dark'] as const)(
    'resolves every background in %s mode',
    async (mode) => {
      const user = userEvent.setup();
      const dark = mode === 'dark';
      const colors = (light: string, darkColor: string) => ({
        light,
        dark: darkColor,
      });
      const modeTheme: ThemeType = {
        global: {
          colors: { 'normal-fill': colors(normal, '#222222') },
        },
        radioButton: {
          control: {
            background: 'normal-fill',
            hover: { background: { color: colors(hover, '#663322') } },
            selected: {
              background: { color: colors(selected, '#224466') },
              hover: {
                background: { color: colors(selectedHover, '#446688') },
              },
            },
          },
          container: {
            background: { color: colors(containerFill, '#111111') },
            hover: { background: { color: colors(containerHover, '#334455') } },
          },
        },
      };
      const content = (checked: boolean) => (
        <Grommet
          theme={modeTheme}
          themeMode={mode}
          background={dark ? 'black' : 'white'}
        >
          <RadioButton
            name="option"
            label="Option"
            checked={checked}
            onChange={jest.fn()}
          />
        </Grommet>
      );
      const { rerender } = render(content(false));
      expect(getControl().control).toHaveStyleRule(
        'background-color',
        dark ? '#222222' : normal,
      );
      rerender(content(true));
      await user.hover(screen.getByText('Option'));
      const { control, label } = getControl();
      expect(control).toHaveStyleRule(
        'background-color',
        dark ? 'rgba(34, 68, 102, 1)' : selectedRgba,
      );
      expect(label).toHaveStyleRule(
        'background-color',
        dark ? 'rgba(17, 17, 17, 1)' : containerFillRgba,
      );
      expect(label).toHaveStyleRule(
        'background-color',
        dark ? 'rgba(51, 68, 85, 1)' : containerHoverRgba,
        { modifier: ':hover' },
      );
      expect(label).toHaveStyleRule(
        'background-color',
        dark ? 'rgba(102, 51, 34, 1)' : hoverRgba,
        { modifier: `:hover ${selector(false)}` },
      );
      expect(label).toHaveStyleRule(
        'background-color',
        dark ? 'rgba(68, 102, 136, 1)' : 'rgba(170, 204, 238, 1)',
        { modifier: `:hover ${selector(true)}` },
      );
    },
  );

  test('control-only hover does not color the container', () => {
    render(
      <Grommet
        theme={{ radioButton: { control: { hover: { background: hover } } } }}
      >
        <RadioButton name="option" label="Option" />
      </Grommet>,
    );
    const { control, label } = getControl();
    expect(control).not.toHaveStyleRule('background-color');
    expect(label).not.toHaveStyleRule('background-color');
    expect(label).not.toHaveStyleRule('background-color', undefined, {
      modifier: ':hover',
    });
    expect(label).toHaveStyleRule('background-color', hover, {
      modifier: `:hover ${selector(false)}`,
    });
  });

  test('container-only hover does not color the control', () => {
    render(
      <Grommet
        theme={{
          radioButton: {
            container: { hover: { background: { color: containerHover } } },
          },
        }}
      >
        <RadioButton name="option" label="Option" />
      </Grommet>,
    );
    const { control, label } = getControl();
    expect(control).not.toHaveStyleRule('background-color');
    expect(label).not.toHaveStyleRule('background-color');
    expect(label).toHaveStyleRule('background-color', containerHoverRgba, {
      modifier: ':hover',
    });
  });

  test('background objects support images without changing text colors', () => {
    const image = 'linear-gradient(#112233, #445566)';
    render(
      <Grommet
        theme={{
          global: { colors: { text: { light: '#010101', dark: '#020202' } } },
          radioButton: {
            control: { background: { color: normal, image, dark: true } },
            container: {
              background: { color: containerFill, dark: true },
              hover: { background: { color: containerHover, dark: true } },
            },
          },
        }}
      >
        <RadioButton name="option" label="Option" />
      </Grommet>,
    );
    const { control, label } = getControl();
    expect(control).toHaveStyleRule('background-image', image);
    expect(control).toHaveStyleRule('background-color', normalRgba);
    expect(control).not.toHaveStyleRule('color', '#020202');
    expect(label).not.toHaveStyleRule('color', '#020202');
    expect(label).not.toHaveStyleRule('color', '#020202', {
      modifier: ':hover',
    });
  });

  test('hover selectors follow native uncontrolled selection', async () => {
    const user = userEvent.setup();
    render(
      <Grommet theme={theme}>
        <RadioButton name="option" label="Option" />
      </Grommet>,
    );
    expect(getControl().control.matches(selector(false))).toBe(true);
    await user.click(screen.getByText('Option'));
    const { input, control, label } = getControl();
    expect(input).toBeChecked();
    expect(control.matches(selector(false))).toBe(false);
    expect(control.matches(selector(true))).toBe(true);
    expect(label).toHaveStyleRule('background-color', selectedHover, {
      modifier: `:hover ${selector(true)}`,
    });
  });

  test('a focus indicator does not use focus-as-hover backgrounds', async () => {
    const user = userEvent.setup();
    render(
      <Grommet theme={theme}>
        <RadioButton name="option" label="Option" />
      </Grommet>,
    );
    await user.tab();
    const { label } = getControl();
    expect(label).toHaveStyleRule('background-color', containerFillRgba);
    expect(label).not.toHaveStyleRule('background-color', undefined, {
      modifier: selector(false),
    });
  });

  test('custom children own their fill while container backgrounds still apply', async () => {
    const user = userEvent.setup();
    const child = jest.fn(() => <Box background="#112233">Custom control</Box>);
    render(
      <Grommet theme={theme}>
        <RadioButton
          name="option"
          label="Option"
          checked
          onChange={jest.fn()}
          {...{ focusIndicator: false }}
        >
          {child}
        </RadioButton>
      </Grommet>,
    );
    await user.hover(screen.getByText('Option'));
    await user.tab();
    const { control, label } = getControl();
    expect(child).toHaveBeenLastCalledWith({
      checked: true,
      focus: false,
      hover: true,
    });
    expect(control.matches(selector(true))).toBe(false);
    expect(control).toHaveStyleRule('background-color', '#112233');
    expect(label).toHaveStyleRule('background-color', containerHover);
  });

  test('preserves borders, icons, extends, and native change events', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Grommet
        theme={{
          radioButton: {
            ...theme.radioButton,
            color: '#abcdef',
            icons: { circle: FormCheckmark },
            icon: { extend: 'fill: #112233;' },
            check: { extend: 'background-color: #334455;' },
            container: {
              ...theme.radioButton?.container,
              extend: 'background-color: #445566;',
            },
            hover: { border: { color: '#654321' } },
            extend: 'padding: 1px;',
          },
        }}
      >
        <RadioButton
          name="option"
          label="Option"
          value="one"
          checked
          onChange={onChange}
        />
        <RadioButton
          name="option"
          label="Other"
          value="two"
          onChange={onChange}
        />
      </Grommet>,
    );
    const { control, label } = getControl();
    expect(control).toHaveStyleRule('background-color', '#334455');
    expect(control).toHaveStyleRule('border', 'solid 2px #abcdef');
    expect(control.firstElementChild).toHaveStyleRule('fill', '#112233');
    expect(control.parentElement).toHaveStyleRule('padding', '1px');
    expect(label).toHaveStyleRule('background-color', '#445566');
    expect(label).toHaveStyleRule('border-color', '#654321', {
      modifier: ':hover input:not([disabled])+div',
    });
    await user.click(screen.getByText('Other'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target).toBe(
      screen.getByRole('radio', { name: 'Other' }),
    );
    expect(onChange.mock.calls[0][0].target.value).toBe('two');
  });
});
