// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'jest-styled-components';
import '@testing-library/jest-dom';

import { FormField } from '..';
import { BoxProps } from '../../Box';
import { Form } from '../../Form';
import { Grommet } from '../../Grommet';
import { TextInput } from '../../TextInput';
import { TextArea } from '../../TextArea';
import { Text } from '../../Text';
import { FileInput } from '../../FileInput';
import { Select } from '../../Select';
import { ThemeType } from '../../../themes';
import { deepMerge } from '../../../utils';
import {
  getLegacyInputTheme,
  getPartStyleProps,
  mergeDefinedPart,
  mergePart,
  resolveFormFieldPart,
  resolvePart,
} from '../FormFieldTheme';

// Get the owned frame from the accessible input rather than private class names.
const content = () => {
  const input = screen.getByRole('textbox');
  return input.tagName === 'TEXTAREA'
    ? input.parentElement
    : input.parentElement?.parentElement;
};
const container = () => content()?.parentElement;
const responsiveHoverRules = () =>
  Array.from(document.styleSheets).flatMap((sheet) =>
    Array.from(sheet.cssRules).flatMap((rule) => {
      if (!('conditionText' in rule)) return [];
      const media = rule as CSSMediaRule;
      if (!media.conditionText.includes('600px')) return [];
      return Array.from(media.cssRules).filter((nested) => {
        const selector = (nested as CSSStyleRule).selectorText;
        return (
          selector?.endsWith(':hover') &&
          content()?.matches(selector.replace(/:hover$/, ''))
        );
      }) as CSSStyleRule[];
    }),
  );
const hoverBorders: BoxProps['border'][] = [
  false,
  [],
  'top',
  'horizontal',
  'start',
  'between',
];

describe('FormField parts and states', () => {
  test('has no accessibility violations with named error parts', async () => {
    const { container: root } = render(
      <Grommet
        theme={{
          formField: {
            content: { error: { border: { color: 'status-critical' } } },
          },
        }}
      >
        <FormField label="Email" htmlFor="email" error="Enter an email">
          <TextInput id="email" />
        </FormField>
      </Grommet>,
    );
    expect(await axe(root)).toHaveNoViolations();
  });

  test('retains legacy own undefined opt-outs and array replacements', () => {
    const base = Object.freeze({
      border: Object.freeze({ color: 'red', side: 'bottom' }),
      background: 'white',
    });
    const merged = mergePart(base, {
      border: { color: undefined },
      background: undefined,
    });
    expect(merged).toEqual({
      border: { color: undefined, side: 'bottom' },
      background: undefined,
    });
    expect(base.border.color).toBe('red');
    expect(mergePart(base, { border: [] }).border).toEqual([]);
    expect(mergePart(base, { border: false }).border).toBe(false);
  });

  test('named merges inherit undefined recursively without mutating themes', () => {
    const base = Object.freeze({
      background: Object.freeze({ color: 'white', opacity: undefined }),
      border: Object.freeze({ color: 'red', side: 'bottom' }),
      pad: Object.freeze({ horizontal: 'small', vertical: 'medium' }),
    });
    const override = Object.freeze({
      background: undefined,
      border: Object.freeze({ color: undefined, size: '2px' }),
      pad: Object.freeze({ horizontal: undefined, vertical: 'none' }),
    });
    expect(mergeDefinedPart(base, override)).toEqual({
      background: { color: 'white' },
      border: { color: 'red', side: 'bottom', size: '2px' },
      pad: { horizontal: 'small', vertical: 'none' },
    });
    expect(base.background).toHaveProperty('opacity', undefined);
    expect(override.border).toHaveProperty('color', undefined);
    const borders = Object.freeze([
      Object.freeze({ color: undefined, side: 'top' }),
    ]);
    expect(mergeDefinedPart(base, { border: borders }).border).toEqual([
      { side: 'top' },
    ]);
    expect(borders[0]).toHaveProperty('color', undefined);
    expect(mergeDefinedPart(base, { border: [] }).border).toEqual([]);
    expect(mergeDefinedPart(base, { border: false }).border).toBe(false);
  });

  test('adapts direct input wrappers while canonical inputs take precedence', () => {
    const theme = {
      textInput: {
        hover: {
          background: '#111111',
          border: { color: '#222222' },
        },
        container: { extend: 'outline: 1px solid red;' },
      },
      inputs: {
        textInput: {
          content: {
            hover: {
              background: '#333333',
              border: { color: undefined },
            },
          },
        },
      },
    };
    expect(resolveFormFieldPart(theme, 'textInput', 'content').hover).toEqual({
      background: '#333333',
      border: { color: '#222222' },
    });
    expect(resolveFormFieldPart(theme, 'textInput', 'container').props).toEqual(
      {},
    );
    expect(getLegacyInputTheme(theme, 'textInput').containerExtend).toBe(
      'outline: 1px solid red;',
    );
    expect(getLegacyInputTheme({ error: { hover: {} } }, 'error')).toEqual({
      hasHover: false,
      hover: undefined,
      content: undefined,
    });
    expect(
      resolveFormFieldPart(
        {
          textInput: { hover: { background: '#111111' } },
          inputs: { textInput: { content: { hover: false } } },
        },
        'textInput',
        'content',
      ),
    ).toMatchObject({ hover: false, hasHover: true });
    expect(
      resolveFormFieldPart(
        {
          textInput: { hover: { background: '#111111' } },
          inputs: {
            textInput: {
              content: { error: { hover: { background: '#333333' } } },
            },
          },
        },
        'textInput',
        'content',
        'error',
      ).hover,
    ).toEqual({ background: '#333333' });
  });

  test('adapts legacy CheckBox padding only for child handoff', () => {
    expect(
      getLegacyInputTheme(
        { checkBox: { pad: { horizontal: 'small' } } },
        'checkBox',
      ).pad,
    ).toEqual({ horizontal: 'small' });
    expect(
      resolveFormFieldPart(
        { checkBox: { pad: { horizontal: 'small' } } },
        'checkBox',
        'content',
      ).props,
    ).toEqual({});
  });

  test('allowlists base and state props and ignores behavior/focus keys', () => {
    const part = {
      background: 'white',
      width: 'medium',
      direction: 'row',
      onClick: jest.fn(),
      focus: { background: 'blue' },
      disabled: { background: 'red', width: 'large', margin: 'large' },
    };
    expect(getPartStyleProps(part)).toEqual({
      background: 'white',
      width: 'medium',
    });
    expect(resolvePart(part, undefined, 'disabled').props).toEqual({
      background: 'red',
      width: 'medium',
    });
    expect(part.onClick).not.toHaveBeenCalled();
  });

  test('resolves one state and inherits whole and nested undefined values', () => {
    const base = {
      background: 'white',
      hover: { background: 'blue', pad: 'small' },
      disabled: { elevation: 'large' },
      error: { border: { color: 'red' } },
    };
    const result = resolvePart(base, { error: { hover: undefined } }, 'error');
    expect(result.props).toEqual({
      background: 'white',
      border: { color: 'red' },
    });
    expect(result.hasHover).toBe(true);
    expect(result.hover).toEqual(base.hover);
    expect(resolvePart(base, {}, 'error').hover).toEqual(base.hover);
    expect(
      resolvePart(base, { hover: { background: undefined } }, 'error').hover,
    ).toEqual(base.hover);
    expect(
      resolvePart({ error: { pad: 'small' } }, { error: undefined }, 'error')
        .hasStatePad,
    ).toBe(true);
    expect(
      resolvePart({ pad: 'small', error: { pad: undefined } }, {}, 'error'),
    ).toMatchObject({ props: { pad: 'small' }, hasStatePad: false });
    expect(
      resolvePart(
        {},
        { hover: undefined, error: { hover: undefined } },
        'error',
      ).hasHover,
    ).toBe(false);
    expect(resolvePart({}, { hover: {} }).hasHover).toBe(true);
    expect(resolvePart({}, { error: { hover: {} } }, 'error').hasHover).toBe(
      true,
    );
  });

  test.each([
    { base: { hover: false }, input: {}, expected: false },
    { base: { hover: false }, input: { hover: undefined }, expected: false },
    {
      base: { hover: { background: 'blue' } },
      input: { hover: false },
      expected: false,
    },
    {
      base: { hover: false },
      input: { hover: { background: 'blue' } },
      expected: { background: 'blue' },
    },
    { base: { hover: false }, input: { hover: {} }, expected: {} },
    {
      base: { hover: false, error: { hover: { pad: 'small' } } },
      input: { hover: false },
      expected: { pad: 'small' },
    },
    {
      base: { hover: { background: 'blue' }, error: { hover: false } },
      input: { error: { hover: undefined } },
      expected: false,
    },
    {
      base: { error: { hover: false } },
      input: { hover: { background: 'blue' } },
      expected: false,
    },
    {
      base: { error: { hover: false } },
      input: { error: { hover: { pad: 'small' } } },
      expected: { pad: 'small' },
    },
    {
      base: { hover: false },
      input: { error: { hover: undefined } },
      expected: false,
    },
  ])('resolves hover false with normal specificity: %j', (theme) => {
    expect(resolvePart(theme.base, theme.input, 'error')).toMatchObject({
      hover: theme.expected,
      hasHover: true,
    });
  });

  test.each(['inner', 'outer', false] as const)(
    'styles named parts independently of legacy border position %s',
    (position) => {
      const theme: ThemeType = {
        formField: {
          border: position === false ? undefined : { position },
          container: {
            background: '#112233',
            border: { side: 'top', color: '#223344', size: '2px' },
            elevation: 'small',
            height: '100px',
            margin: '3px',
            pad: '4px',
            round: '5px',
            width: '200px',
          },
          content: {
            background: '#334455',
            border: { side: 'bottom', color: '#445566', size: '3px' },
            height: '40px',
            margin: '2px',
            round: '6px',
            width: '150px',
          },
        },
      };
      render(
        <Grommet theme={theme}>
          <FormField label="Email">
            <TextInput />
          </FormField>
        </Grommet>,
      );
      expect(container()).toHaveStyleRule('background-color', '#112233');
      expect(container()).toHaveStyleRule('border-top', 'solid 2px #223344');
      expect(container()).toHaveStyleRule('height', '100px');
      expect(container()).toHaveStyleRule('width', '200px');
      expect(container()).toHaveStyleRule('margin', '3px');
      expect(container()).toHaveStyleRule('padding', '4px');
      expect(container()).toHaveStyleRule('border-radius', '5px');
      expect(content()).toHaveStyleRule('background-color', '#334455');
      expect(content()).toHaveStyleRule('border-bottom', 'solid 3px #445566');
      expect(content()).toHaveStyleRule('height', '40px');
      expect(content()).toHaveStyleRule('width', '150px');
    },
  );

  test('preserves direct input hover placement and behavior for legacy themes', () => {
    const { rerender } = render(
      <Grommet
        theme={{
          formField: {
            border: { position: 'outer', side: 'all' },
            textInput: {
              hover: {
                background: '#112233',
                border: { color: '#223344' },
              },
            },
          },
        }}
      >
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );
    const root = document.querySelector('[class*="FormFieldBox"]');
    expect(root).toHaveStyleRule('border-color', '#223344', {
      modifier: ':hover',
    });
    expect(root).not.toHaveStyleRule('background-color', '#112233', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('background-color', '#112233', {
      modifier: ':hover',
    });
    expect(content()).not.toHaveStyleRule('border-color', '#223344', {
      modifier: ':hover',
    });
    rerender(
      <Grommet
        theme={{
          formField: {
            border: { position: 'outer', side: 'all' },
            textInput: {
              hover: {
                background: '#112233',
                border: { color: '#223344' },
              },
            },
          },
        }}
      >
        <FormField error="Invalid">
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(content()).not.toHaveStyleRule('background-color', '#112233', {
      modifier: ':hover',
    });
  });

  test.each([
    { error: 'Invalid', disabled: true, readOnly: true, expected: '#AA0000' },
    { error: 'Invalid', disabled: false, readOnly: true, expected: '#AA0000' },
    { error: undefined, disabled: true, readOnly: true, expected: '#00AA00' },
    { error: undefined, disabled: false, readOnly: true, expected: '#0000AA' },
  ])('selects error > disabled > readOnly: %j', (flags) => {
    render(
      <Grommet
        theme={{
          formField: {
            content: {
              error: { background: '#AA0000' },
              disabled: { background: '#00AA00', elevation: 'large' },
              readOnly: { background: '#0000AA', pad: '20px' },
            },
          },
        }}
      >
        <FormField error={flags.error} disabled={flags.disabled}>
          <TextInput disabled={flags.disabled} readOnly={flags.readOnly} />
        </FormField>
      </Grommet>,
    );
    expect(content()).toHaveStyleRule('background-color', flags.expected);
    if (flags.error) {
      expect(content()).not.toHaveStyleRule('box-shadow');
      expect(content()).not.toHaveStyleRule('padding', '20px');
    }
  });

  test('inherits shared styles and legacy hover for input undefined values', () => {
    render(
      <Grommet
        theme={{
          formField: {
            hover: { background: '#111111', border: { color: '#222222' } },
            content: {
              background: '#333333',
              error: { border: { color: '#444444' } },
              hover: { background: '#555555', pad: '7px' },
            },
            inputs: {
              textInput: {
                content: {
                  background: undefined,
                  hover: {
                    background: undefined,
                    border: { color: undefined },
                  },
                },
              },
            },
          },
        }}
      >
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(content()).toHaveStyleRule('background-color', '#333333');
    expect(content()).not.toHaveStyleRule('background-color', '#111111', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('background-color', '#555555', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('border-color', '#222222', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('padding', '7px', { modifier: ':hover' });
  });

  test('supports enabled error hover, including all five Box state props', () => {
    render(
      <Grommet
        theme={{
          formField: {
            content: {
              hover: { pad: '7px' },
              error: {
                hover: {
                  background: '#123456',
                  border: { side: 'all', color: '#654321', size: '2px' },
                  elevation: 'small',
                  round: '8px',
                },
              },
            },
          },
        }}
      >
        <FormField error="Invalid">
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(content()).toHaveStyleRule('background-color', '#123456', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('border', 'solid 2px #654321', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('padding', '7px', { modifier: ':hover' });
    expect(content()).toHaveStyleRule('border-radius', '8px', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('box-shadow', expect.any(String), {
      modifier: ':hover',
    });
  });

  test.each(['disabled', 'readOnly'] as const)(
    'actual child %s suppresses hover even when error wins',
    (flag) => {
      render(
        <Grommet
          theme={{
            formField: {
              content: { error: { hover: { background: '#123456' } } },
            },
          }}
        >
          <FormField error="Invalid">
            <TextInput {...{ [flag]: true }} />
          </FormField>
        </Grommet>,
      );
      expect(content()).not.toHaveStyleRule('background-color', '#123456', {
        modifier: ':hover',
      });
    },
  );

  test('keeps named error hover and the global focus indicator independent', async () => {
    const user = userEvent.setup();
    render(
      <Grommet
        theme={{
          global: {
            focus: { border: undefined, shadow: '0 0 0 2px #112233' },
          },
          formField: {
            content: {
              error: {
                hover: { background: '#445566', elevation: 'small' },
              },
            },
          },
        }}
      >
        <FormField error="Invalid">
          <TextInput />
        </FormField>
      </Grommet>,
    );
    await user.tab();
    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(content()).toHaveStyleRule('box-shadow', '0 0 0 2px #112233');
    expect(content()).toHaveStyleRule('box-shadow', '0 0 0 2px #112233', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('background-color', '#445566', {
      modifier: ':hover',
    });
  });

  test.each(hoverBorders)('translates border hover/reset %j', (border) => {
    render(
      <Grommet theme={{ formField: { content: { hover: { border } } } }}>
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );
    if (border === 'between')
      expect(content()).not.toHaveStyleRule('border', expect.any(String), {
        modifier: ':hover',
      });
    else if (border === false || Array.isArray(border))
      expect(content()).toHaveStyleRule('border', 'none', {
        modifier: ':hover',
      });
    else if (border === 'start')
      expect(content()).toHaveStyleRule(
        'border-inline-start',
        expect.any(String),
        { modifier: ':hover' },
      );
    else
      expect(content()).toHaveStyleRule('border-top', expect.any(String), {
        modifier: ':hover',
      });
  });

  test('translates border arrays, boolean border, and round/elevation resets', () => {
    const { rerender } = render(
      <Grommet
        theme={{
          formField: {
            content: {
              hover: {
                border: [{ side: 'left', color: '#123456' }, { side: 'right' }],
                round: false,
                elevation: 'none',
              },
            },
          },
        }}
      >
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(content()).toHaveStyleRule('border-left', 'solid 1px #123456', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('border-radius', '0', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('box-shadow', 'none', {
      modifier: ':hover',
    });
    rerender(
      <Grommet theme={{ formField: { content: { hover: { border: true } } } }}>
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(content()).toHaveStyleRule(
      'border',
      expect.stringMatching(/^solid/),
      {
        modifier: ':hover',
      },
    );
  });

  test.each(['light', 'dark'] as const)(
    'uses Box responsive and dark/light hover helpers in %s mode',
    (themeMode) => {
      const theme: ThemeType = {
        global: {
          edgeSize: { small: '10px' },
          radius: { small: '12px' },
          borderSize: { small: '4px' },
          breakpoints: {
            small: {
              value: 600,
              edgeSize: { small: '5px' },
              radius: { small: '6px' },
              borderSize: { small: '2px' },
            },
          },
        },
        formField: {
          content: {
            hover: {
              background: { color: { dark: '#112233', light: '#445566' } },
              border: { side: 'all', size: 'small', color: '#778899' },
              pad: 'small',
              round: 'small',
            },
          },
        },
      };
      const { rerender } = render(
        <Grommet
          theme={theme}
          themeMode={themeMode}
          background={themeMode === 'dark' ? 'black' : 'white'}
        >
          <FormField>
            <TextInput />
          </FormField>
        </Grommet>,
      );
      expect(content()).toHaveStyleRule(
        'background-color',
        themeMode === 'dark' ? 'rgba(17, 34, 51, 1)' : 'rgba(68, 85, 102, 1)',
        { modifier: ':hover' },
      );
      expect(content()).toHaveStyleRule('padding', '10px', {
        modifier: ':hover',
      });
      const responsive = responsiveHoverRules();
      expect(responsive.some((rule) => rule.style.padding === '5px')).toBe(
        true,
      );
      expect(
        responsive.some(
          (rule) => rule.style.getPropertyValue('border-radius') === '6px',
        ),
      ).toBe(true);
      expect(responsive.some((rule) => rule.style.border.includes('2px'))).toBe(
        true,
      );
      rerender(
        <Grommet
          theme={theme}
          themeMode={themeMode}
          background={themeMode === 'dark' ? 'black' : 'white'}
        >
          <FormField contentProps={{ responsive: false }}>
            <TextInput />
          </FormField>
        </Grommet>,
      );
      expect(responsiveHoverRules()).toHaveLength(0);
    },
  );

  test.each(['hover', 'error.hover'])(
    'an input-specific whole %s undefined inherits shared hover',
    (path) => {
      render(
        <Grommet
          theme={{
            formField: {
              hover: { background: '#111111' },
              content: {
                hover: { background: '#222222', pad: '9px' },
                error: { hover: { background: '#333333' } },
              },
              inputs: {
                textInput: {
                  content:
                    path === 'hover'
                      ? { hover: undefined }
                      : { error: { hover: undefined } },
                },
              },
            },
          }}
        >
          <FormField error={path === 'error.hover' ? 'Invalid' : undefined}>
            <TextInput />
          </FormField>
        </Grommet>,
      );
      expect(content()).toHaveStyleRule(
        'background-color',
        path === 'hover' ? '#222222' : '#333333',
        { modifier: ':hover' },
      );
      expect(content()).toHaveStyleRule('padding', '9px', {
        modifier: ':hover',
      });
    },
  );

  test.each(['container', 'content'] as const)(
    '%s hover false disables named and legacy hover, but a variant can re-enable it',
    (part) => {
      const shared: ThemeType = {
        formField: {
          border: { position: part === 'container' ? 'outer' : 'inner' },
          hover: { background: '#111111', border: { color: '#222222' } },
          [part]: { hover: false },
        },
      };
      const { rerender } = render(
        <Grommet theme={shared}>
          <FormField>
            <TextInput />
          </FormField>
        </Grommet>,
      );
      const ownedPart = part === 'container' ? container : content;
      expect(ownedPart()).not.toHaveStyleRule('border-color', '#222222', {
        modifier: ':hover',
      });
      expect(ownedPart()).not.toHaveStyleRule('background-color', '#111111', {
        modifier: ':hover',
      });
      rerender(
        <Grommet
          theme={{
            formField: {
              ...shared.formField,
              inputs: { textInput: { [part]: { hover: {} } } },
            },
          }}
        >
          <FormField>
            <TextInput />
          </FormField>
        </Grommet>,
      );
      expect(ownedPart()).toHaveStyleRule('border-color', '#222222', {
        modifier: ':hover',
      });
    },
  );

  test('error.hover false applies only while error is selected', () => {
    const theme: ThemeType = {
      formField: {
        hover: { border: { color: '#222222' } },
        content: {
          hover: { background: '#333333' },
          error: { hover: false },
        },
      },
    };
    const { rerender } = render(
      <Grommet theme={theme}>
        <FormField error="Invalid">
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(content()).not.toHaveStyleRule('background-color', '#333333', {
      modifier: ':hover',
    });
    expect(content()).not.toHaveStyleRule('border-color', '#222222', {
      modifier: ':hover',
    });
    rerender(
      <Grommet theme={theme}>
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(content()).toHaveStyleRule('background-color', '#333333', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('border-color', '#222222', {
      modifier: ':hover',
    });
  });

  test('defined Box resets override shared and legacy fallback styles', () => {
    render(
      <Grommet
        theme={{
          formField: {
            hover: { background: '#111111', border: { color: '#222222' } },
            content: {
              background: '#333333',
              border: { color: '#444444' },
              hover: { background: '#555555', pad: '9px', round: '8px' },
            },
            inputs: {
              textInput: {
                content: {
                  background: 'transparent',
                  border: false,
                  hover: {
                    background: 'transparent',
                    border: false,
                    pad: 'none',
                    round: false,
                    elevation: 'none',
                  },
                },
              },
            },
          },
        }}
      >
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(content()).toHaveStyleRule('background-color', 'transparent');
    expect(content()).not.toHaveStyleRule('border-bottom');
    expect(content()).toHaveStyleRule('background-color', 'transparent', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('border', 'none', { modifier: ':hover' });
    expect(content()).toHaveStyleRule('padding', '0px', { modifier: ':hover' });
    expect(content()).toHaveStyleRule('border-radius', '0', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('box-shadow', 'none', {
      modifier: ':hover',
    });
  });

  test('cannot recover named values erased by an external deepMerge', () => {
    const base: ThemeType = {
      formField: {
        hover: { background: '#111111' },
        content: {
          background: '#333333',
          hover: { background: '#222222', pad: '9px' },
        },
      },
    };
    const override: ThemeType = {
      formField: {
        content: { background: undefined, hover: { background: undefined } },
      },
    };
    const theme = deepMerge(base, override);
    expect(theme.formField?.content?.background).toBeUndefined();
    expect(theme.formField?.content?.hover).toEqual({
      background: undefined,
      pad: '9px',
    });
    expect(
      resolvePart(base.formField?.content, override.formField?.content).props,
    ).toEqual({ background: '#333333' });
    render(
      <Grommet theme={theme}>
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(content()).not.toHaveStyleRule('background-color', '#333333');
    expect(content()).toHaveStyleRule('background-color', '#111111', {
      modifier: ':hover',
    });
    expect(content()).not.toHaveStyleRule('background-color', '#222222', {
      modifier: ':hover',
    });
    expect(content()).toHaveStyleRule('padding', '9px', { modifier: ':hover' });
    expect(base.formField?.content?.background).toBe('#333333');
  });

  test('undefined selected styles inherit available legacy fallbacks recursively', () => {
    render(
      <Grommet
        theme={{
          formField: {
            error: {
              background: '#123456',
              border: { color: '#654321' },
            },
            content: {
              background: undefined,
              border: { color: undefined },
              error: {
                background: undefined,
                border: { color: undefined },
              },
            },
            inputs: {
              textInput: { content: { error: undefined } },
            },
          },
        }}
      >
        <FormField error="Invalid">
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(content()).toHaveStyleRule('background-color', '#123456');
    expect(content()).toHaveStyleRule('border-bottom', 'solid 1px #654321');
  });

  test.each([undefined, 'Invalid'])(
    'undefined variant/state padding does not bypass the shared pad gate: %s',
    (error) => {
      render(
        <Grommet
          theme={{
            formField: {
              content: { pad: '9px', error: { pad: undefined } },
              inputs: { textInput: { content: { pad: undefined } } },
            },
          }}
        >
          <FormField error={error}>
            <TextInput />
          </FormField>
        </Grommet>,
      );
      expect(content()).not.toHaveStyleRule('padding');
    },
  );

  test('retains legacy content padding gate but honors explicit variant padding', () => {
    const { rerender } = render(
      <Grommet>
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(content()).not.toHaveStyleRule('padding');
    rerender(
      <Grommet
        theme={{
          formField: { inputs: { textInput: { content: { pad: '9px' } } } },
        }}
      >
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(content()).toHaveStyleRule('padding', '9px');
  });

  test('retains outer-border abut margin for legacy-only themes', () => {
    render(
      <Grommet
        theme={{
          formField: {
            margin: undefined,
            border: { position: 'outer', side: 'all', size: 'small' },
          },
        }}
      >
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(container()).toHaveStyleRule('margin-bottom', '-2px');
  });

  test.each([undefined, TextInput, TextArea])(
    'recognizes internal input identity and readOnly: %s',
    (component) => {
      render(
        <Grommet
          theme={{
            formField: {
              inputs: {
                textInput: { content: { readOnly: { background: '#123456' } } },
                textArea: { content: { background: '#654321' } },
              },
            },
          }}
        >
          <Form>
            <FormField name="email" component={component} readOnly />
          </Form>
        </Grommet>,
      );
      expect(content()).toHaveStyleRule(
        'background-color',
        component === TextArea ? '#654321' : '#123456',
      );
    },
  );

  test('a non-input sibling does not overwrite recognized input identity', () => {
    render(
      <Grommet
        theme={{
          formField: {
            inputs: {
              textInput: {
                content: { background: '#123456' },
                container: { background: '#654321' },
              },
            },
          },
        }}
      >
        <FormField>
          <TextInput />
          <Text>Suffix</Text>
        </FormField>
      </Grommet>,
    );
    expect(content()).toHaveStyleRule('background-color', '#123456');
    expect(container()).toHaveStyleRule('background-color', '#654321');
  });

  test('instance content props override resolved base and application state', () => {
    render(
      <Grommet
        theme={{
          formField: {
            container: { margin: '10px' },
            content: {
              background: '#123456',
              error: { background: '#654321' },
            },
          },
        }}
      >
        <FormField
          error="Invalid"
          margin="3px"
          contentProps={{ background: '#ABCDEF', border: false }}
        >
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(content()).toHaveStyleRule('background-color', '#ABCDEF');
    expect(content()).not.toHaveStyleRule('border-bottom');
    expect(container()).toHaveStyleRule('margin', '3px');
  });

  test('does not remount or lose a draft when error appears', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Grommet>
        <FormField htmlFor="draft">
          <TextInput id="draft" />
        </FormField>
      </Grommet>,
    );
    const input = screen.getByRole('textbox');
    await user.type(input, 'keep this draft');
    rerender(
      <Grommet>
        <FormField htmlFor="draft" error="Invalid">
          <TextInput id="draft" />
        </FormField>
      </Grommet>,
    );
    expect(screen.getByRole('textbox')).toBe(input);
    expect(input).toHaveValue('keep this draft');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'grommet-draft__error');
  });

  test('retains internal Select error label/description linkage', () => {
    render(
      <Grommet>
        <Form>
          <FormField
            name="fruit"
            component={Select}
            htmlFor="fruit"
            id="fruit"
            label="Fruit"
            options={['Apple']}
            error="Choose fruit"
          />
        </Form>
      </Grommet>,
    );
    const input = screen.getByLabelText('Fruit', { selector: 'input' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute(
      'aria-describedby',
      'grommet-fruit__input__error',
    );
  });

  test('retains FileInput borrowed inner border geometry', () => {
    render(
      <Grommet
        theme={{
          fileInput: { border: { side: 'all', size: '2px', style: 'dashed' } },
        }}
      >
        <FormField htmlFor="file" label="File">
          <FileInput id="file" />
        </FormField>
      </Grommet>,
    );
    const frame = screen.getByLabelText('File').parentElement;
    expect(frame?.parentElement).toHaveStyleRule(
      'border',
      expect.stringMatching(/^dashed 2px /),
    );
  });
});
