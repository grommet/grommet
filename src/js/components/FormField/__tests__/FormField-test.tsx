// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import React from 'react';
import 'regenerator-runtime/runtime';
import styled, { css } from 'styled-components';

import { Alert, New, StatusInfo } from 'grommet-icons';
import { FormField } from '..';
import { FormFieldExtendedProps } from '../index';
import { ThemeType } from '../../../themes';
import { Box } from '../../Box';
import { Button } from '../../Button';
import { CheckBox } from '../../CheckBox';
import { CheckBoxGroup } from '../../CheckBoxGroup';
import { RadioButtonGroup } from '../../RadioButtonGroup';
import { RangeInput } from '../../RangeInput';
import { Form } from '../../Form';
import { Grommet } from '../../Grommet';
import { TextInput } from '../../TextInput';
import { TextArea } from '../../TextArea';
import { Text } from '../../Text';
import { TimeInput } from '../../TimeInput';

const CustomFormField = styled(FormField)`
  font-size: 40px;
`;

describe('FormField', () => {
  test(`should have no accessibility violations`, async () => {
    const { container } = render(
      <Grommet>
        <FormField />
      </Grommet>,
    );
    const results = await axe(container);
    expect(container.firstChild).toMatchSnapshot();
    expect(results).toHaveNoViolations();
  });

  test('default', () => {
    const { container } = render(
      <Grommet>
        <FormField />
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('default outside grommet wrapper', () => {
    const { container } = render(<FormField />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('label', () => {
    const { container } = render(
      <Grommet>
        <FormField label="test label" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('help', () => {
    const { container } = render(
      <Grommet>
        <FormField help="test help" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('error', () => {
    const { container } = render(
      <Grommet>
        <FormField error="test error" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('info', () => {
    const { container } = render(
      <Grommet>
        <FormField info="test info" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('htmlFor', () => {
    const { container } = render(
      <Grommet>
        <FormField htmlFor="test-id" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('margin', () => {
    const { container } = render(
      <Grommet>
        <FormField margin="medium" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('empty margin', () => {
    const { container } = render(
      <Grommet>
        <FormField margin="none" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad', () => {
    const { container } = render(
      <Grommet>
        <FormField pad />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('abut', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            border: {
              color: 'border',
              error: {
                color: {
                  dark: 'white',
                  light: 'status-critical',
                },
              },
              size: 'large',
              position: 'outer',
              side: 'all',
            },
            margin: { bottom: 'small' },
          },
        }}
      >
        <FormField htmlFor="test-id" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('does not apply focusIndicator when formField.focusIndicator is false', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            focus: {
              containerFocus: true,
            },
          },
        }}
      >
        <FormField htmlFor="checkbox-id">
          <CheckBox label="CheckBox" />
        </FormField>
        <FormField htmlFor="radio-id">
          <RadioButtonGroup
            name="radio-group"
            options={['Option 1', 'Option 2']}
          />
        </FormField>
        <FormField htmlFor="range-id">
          <RangeInput name="range" min={0} max={100} />
        </FormField>
      </Grommet>,
    );

    // Simulate focus
    fireEvent.focus(screen.getByRole('checkbox'));
    fireEvent.focus(screen.getByLabelText('Option 1'));
    fireEvent.focus(screen.getByLabelText('Option 2'));
    fireEvent.focus(screen.getByRole('slider'));

    expect(container).toMatchSnapshot();
  });

  test('keeps focus within a TimeInput while moving between segments', async () => {
    const user = userEvent.setup();
    const fieldRef = React.createRef<HTMLInputElement>();
    const warn = console.warn;
    console.warn = jest.fn();

    try {
      render(
        <Grommet
          theme={{
            global: { colors: { focus: '#FF0000' } },
            formField: {
              border: { position: 'outer', side: 'all', color: '#CCCCCC' },
            },
          }}
        >
          <FormField ref={fieldRef} label="Time">
            <TimeInput format="24" />
          </FormField>
          <Button label="After" />
        </Grommet>,
      );

      const hours = screen.getByRole('spinbutton', { name: 'hours' });
      const minutes = screen.getByRole('spinbutton', { name: 'minutes' });

      await user.tab();
      expect(hours).toHaveFocus();
      expect(fieldRef.current).toHaveStyleRule('border-color', '#FF0000');

      await user.keyboard('{ArrowRight}');
      expect(minutes).toHaveFocus();
      expect(fieldRef.current).toHaveStyleRule('border-color', '#FF0000');

      await user.keyboard('{ArrowLeft}');
      expect(hours).toHaveFocus();
      expect(fieldRef.current).toHaveStyleRule('border-color', '#FF0000');

      await user.tab();
      expect(screen.getByRole('button', { name: 'Choose time' })).toHaveFocus();
      expect(fieldRef.current).not.toHaveStyleRule('border-color', '#FF0000');

      await user.tab();
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      expect(fieldRef.current).not.toHaveStyleRule('border-color', '#FF0000');
    } finally {
      console.warn = warn;
    }
  });

  test('abut with margin', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            border: {
              color: 'border',
              error: {
                color: {
                  dark: 'white',
                  light: 'status-critical',
                },
              },
              size: 'large',
              position: 'outer',
              side: 'all',
            },
            margin: { bottom: 'small' },
          },
        }}
      >
        <FormField margin="medium" htmlFor="test-id" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('info and help label colors', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            disabled: { label: { color: 'teal' } },
            help: { color: 'blue' },
            info: { color: 'green' },
          },
        }}
      >
        <FormField
          label="Label"
          disabled
          help="Text to help the user know what is possible"
          info="Additional contextual information"
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom formfield', () => {
    const { container } = render(
      <Grommet>
        <CustomFormField htmlFor="test-id" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const { container } = render(
      <Grommet>
        <FormField disabled /> {/* don't use FormField without Form */}
        <Form>
          <FormField disabled />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('required', () => {
    const { container } = render(
      <Grommet>
        <FormField required /> {/* don't use FormField without Form */}
        <Form>
          <FormField required />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom label', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            label: {
              color: 'red',
              size: 'small',
              margin: 'xsmall',
              weight: 600,
            },
          },
        }}
      >
        <Form>
          <FormField label="label" />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled with custom label for help and info', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            label: {
              color: 'red',
              size: 'small',
              margin: 'xsmall',
              weight: 600,
            },
            disabled: {
              label: {
                color: 'teal',
              },
              help: {
                color: 'blue',
              },
              info: {
                color: 'green',
              },
            },
          },
        }}
      >
        <Form>
          <FormField
            help="Text to help the user know what is possible"
            info="Additional contextual information"
            htmlFor="text-input"
            disabled
            label="label"
          >
            <TextInput
              id="text-input"
              placeholder="placeholder"
              value="Value"
            />
          </FormField>
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad with border undefined', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            border: undefined,
            content: {
              pad: 'large',
            },
          },
        }}
      >
        <Form>
          <FormField label="label" pad />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom input margin', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            content: {
              margin: { vertical: 'large' },
            },
          },
        }}
      >
        <Form>
          <FormField label="label" />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('contentProps', () => {
    const { container } = render(
      <Grommet>
        <Form>
          <FormField
            label="label"
            contentProps={{
              border: false,
            }}
          />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom error and info icon and container', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            error: {
              icon: <Alert />,
              container: {
                background: {
                  color: 'green',
                },
              },
            },
            info: {
              icon: <StatusInfo />,
              container: {
                pad: { horizontal: 'large' },
              },
            },
          },
        }}
      >
        <Form>
          <FormField
            label="label"
            error="This is an error message."
            info="Here is a little added info on FormField."
            contentProps={{
              border: false,
            }}
          />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render asterisk when requiredIndicator === true', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            label: {
              requiredIndicator: true,
            },
          },
        }}
      >
        <Form>
          <FormField label="label" required />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`should render custom indicator when requiredIndicator is
  element`, () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            label: {
              requiredIndicator: <New size="small" />,
            },
          },
        }}
      >
        <Form>
          <FormField label="label" required />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should not render asterisk when required.indicator === false', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            label: {
              requiredIndicator: true,
            },
          },
        }}
      >
        <Form>
          <FormField label="label" required={{ indicator: false }} />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('checkbox pad is defined in formfield', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            checkBox: {
              pad: {
                horizontal: 'small',
                vertical: 'xsmall',
              },
            },
          },
        }}
      >
        <Form>
          <FormField label="label">
            <CheckBox label="checkbox with pad" />
          </FormField>
          <CheckBox label="checkbox without pad" />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('max and threshold validation', () => {
    const { container } = render(
      <Grommet>
        <Form validate="change">
          <FormField
            label="label"
            validate={{ max: 10, threshold: 0.5 }}
            name="issue-description"
            htmlFor="issue-description"
          >
            <TextInput
              id="issue-description"
              name="issue-description"
              placeholder="placeholder"
            />
          </FormField>
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('typing something into the input that meets the threshold', () => {
    render(
      <Grommet>
        <Form validate="change">
          <FormField
            label="label"
            validate={{ max: 10, threshold: 0.5 }}
            name="issue-description"
            htmlFor="issue-description"
          >
            <TextInput
              data-testid="test-input"
              id="issue-description"
              name="issue-description"
              placeholder="placeholder"
            />
          </FormField>
        </Form>
      </Grommet>,
    );

    fireEvent.change(screen.getByTestId('test-input'), {
      target: { value: '12345' },
    });

    expect(screen.queryByText('characters left', { exact: false })).toBeNull();
  });

  test('checks that the "X characters left" message appears', async () => {
    render(
      <Grommet>
        <Form validate="change">
          <FormField
            label="label"
            validate={{ max: 10, threshold: 0.5 }}
            name="issue-description"
            htmlFor="issue-description"
          >
            <TextInput
              data-testid="test-input"
              id="issue-description"
              name="issue-description"
              placeholder="placeholder"
            />
          </FormField>
        </Form>
      </Grommet>,
    );

    fireEvent.change(screen.getByTestId('test-input'), {
      target: { value: '123456' },
    });

    await waitFor(() => {
      expect(screen.getByText('4 characters left')).toBeTruthy();
    });
  });

  // eslint-disable-next-line max-len
  test('checks that the "X characters over limit" message appears.', async () => {
    render(
      <Grommet>
        <Form validate="change">
          <FormField
            label="label"
            validate={{ max: 10, threshold: 0.5 }}
            name="issue-description"
            htmlFor="issue-description"
          >
            <TextInput
              data-testid="test-input"
              id="issue-description"
              name="issue-description"
              placeholder="placeholder"
            />
          </FormField>
        </Form>
      </Grommet>,
    );

    fireEvent.change(screen.getByTestId('test-input'), {
      target: { value: '1234567890$' },
    });

    await waitFor(() => {
      expect(screen.getAllByText('1 character over limit')).toBeTruthy();
    });
  });

  test('Field with autoFocus', () => {
    const mockFocus = jest.fn();
    render(
      <Grommet>
        <FormField label="Label" htmlFor="select">
          <TextArea onFocus={mockFocus} autoFocus />
        </FormField>
      </Grommet>,
    );
    expect(mockFocus).toHaveBeenCalledTimes(1);
  });

  test('Field with null as child', () => {
    const { container } = render(
      <Grommet>
        <FormField label="Label">
          <TextInput />
          {false && <Text>foobar</Text>}
        </FormField>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Custom theme TextInput FormField container', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            textInput: {
              container: {
                extend: (props: any) => css`
                  color: ${props['disabledProp'] ? 'green' : 'red'};
                `,
              },
            },
          },
        }}
      >
        <FormField disabled label="Label">
          <TextInput />
        </FormField>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('links error message via aria-describedby with children pattern', () => {
    render(
      <Grommet>
        <FormField htmlFor="email-input" error="Invalid email">
          <TextInput id="email-input" name="email" />
        </FormField>
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute(
      'aria-describedby',
      'grommet-email-input__error',
    );
    expect(
      document.getElementById('grommet-email-input__error'),
    ).toHaveTextContent('Invalid email');
  });

  test('merges aria-describedby with a pre-existing value on the child', () => {
    render(
      <Grommet>
        <FormField htmlFor="email-input" error="Invalid email">
          <TextInput
            id="email-input"
            name="email"
            aria-describedby="custom-hint"
          />
        </FormField>
        <span id="custom-hint">Use your work email</span>
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute(
      'aria-describedby',
      'custom-hint grommet-email-input__error',
    );
  });

  test('does not link aria-describedby for a custom non-grommet input', () => {
    const CustomInput = (props: any) => <input {...props} />;
    render(
      <Grommet>
        <FormField htmlFor="custom-input" error="Invalid value">
          <CustomInput id="custom-input" name="custom" />
        </FormField>
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-describedby');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  test('sets aria-invalid on grommet input children when there is an error', () => {
    render(
      <Grommet>
        <FormField htmlFor="email-input" error="Invalid email">
          <TextInput id="email-input" name="email" />
        </FormField>
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test(`merges aria-describedby with pre-existing value on internal Input
  (no children)`, () => {
    render(
      <Grommet>
        <Form>
          <FormField
            htmlFor="email"
            name="email"
            error="Invalid email"
            aria-describedby="custom-hint"
          />
        </Form>
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute(
      'aria-describedby',
      'custom-hint grommet-email__error',
    );
  });

  test('preserves the input value when an error appears after typing', async () => {
    // guards against the field remounting (and losing its value) when the
    // aria-describedby link is added once an error appears
    const user = userEvent.setup();
    render(
      <Grommet>
        <Form>
          <FormField
            label="Email"
            name="email"
            htmlFor="email-input"
            validate={(value: string) => (value ? 'Invalid value' : undefined)}
          >
            <TextInput id="email-input" name="email" />
          </FormField>
          <Button label="Submit" type="submit" />
        </Form>
      </Grommet>,
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'typed value');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(await screen.findByText('Invalid value')).toBeInTheDocument();
    expect(input).toHaveValue('typed value');
  });

  test('does not apply readOnly styling to a non-input child whose displayName is a substring match', () => {
    // regression test: `readOnlyField` detection previously used
    // 'TextInput'.indexOf(child.type.displayName), which matched any
    // child.type.displayName that is a substring of 'TextInput', such as
    // grommet's own Text component ('Text' is a substring of 'TextInput').
    const readOnlyTheme = {
      global: {
        input: {
          readOnly: {
            background: '#123456',
          },
        },
      },
    };

    const { container: textInputContainer } = render(
      <Grommet theme={readOnlyTheme}>
        <FormField label="Label">
          <TextInput readOnly />
        </FormField>
      </Grommet>,
    );
    const textInputContentBox = textInputContainer.querySelector(
      '[class*="FormFieldContentBox"]',
    );
    expect(textInputContentBox).toHaveStyleRule('background-color', '#123456');

    const { container: textContainer } = render(
      <Grommet theme={readOnlyTheme}>
        <FormField label="Label">
          {/* @ts-expect-error readOnly is not a valid Text prop */}
          <Text readOnly>Some static content</Text>
        </FormField>
      </Grommet>,
    );
    const textContentBox = textContainer.querySelector(
      '[class*="FormFieldContentBox"]',
    );
    expect(textContentBox).not.toHaveStyleRule('background-color', '#123456');
  });

  describe('background', () => {
    type FieldTheme = NonNullable<ThemeType['formField']>;
    type BackgroundOptions = {
      fieldProps?: FormFieldExtendedProps;
      inputProps?: React.ComponentProps<typeof TextInput>;
      generated?: boolean;
    };

    const normalColor = '#123456';
    const hoverColor = '#654321';
    const stateColor = '#abcdef';
    const overrideColor = '#223344';
    const surfaceProps = {
      role: 'group',
      'aria-label': 'Input surface',
    };
    const positions: [string, FieldTheme['border']][] = [
      ['inner', { position: 'inner' }],
      ['outer', { position: 'outer', side: 'all' }],
      ['borderless', false],
    ];

    const renderBackground = (
      theme: ThemeType,
      { fieldProps = {}, inputProps = {}, generated }: BackgroundOptions = {},
    ) => {
      const result = render(
        <Grommet theme={theme}>
          <Form>
            <FormField
              label="Label"
              htmlFor="background-input"
              name="background-input"
              help="Help"
              info="Info"
              {...fieldProps}
              contentProps={{ ...surfaceProps, ...fieldProps.contentProps }}
            >
              {generated
                ? undefined
                : fieldProps.children || (
                    <TextInput id="background-input" {...inputProps} />
                  )}
            </FormField>
          </Form>
        </Grommet>,
      );
      const content = screen.getByRole('group', { name: 'Input surface' });
      return { ...result, content, outer: content.parentElement };
    };

    test.each(positions)(
      'paints only normal and hover content with %s borders',
      (_, border) => {
        const theme: ThemeType = {
          formField: {
            border,
            background: normalColor,
            hover: { background: hoverColor },
          },
        };
        const { content, outer } = renderBackground(theme);

        expect(content).toHaveStyleRule('background-color', normalColor);
        expect(content).toHaveStyleRule('background-color', hoverColor, {
          modifier: ':hover',
        });
        expect(outer).not.toHaveStyleRule('background-color', normalColor);
        expect(outer).not.toHaveStyleRule('background-color', hoverColor, {
          modifier: ':hover',
        });
        ['Label', 'Help', 'Info'].forEach((text) => {
          const message = screen.getByText(text);
          expect(content).not.toContainElement(message);
          expect(message).not.toHaveStyleRule('background-color', normalColor);
          expect(message).not.toHaveStyleRule('background-color', hoverColor, {
            modifier: ':hover',
          });
        });
      },
    );

    test('adds no normal background by default', () => {
      const { content } = renderBackground({});
      expect(content).not.toHaveStyleRule('background-color');
    });

    test('shared transparent surfaces explicitly opt out', () => {
      const theme: ThemeType = {
        formField: {
          background: 'transparent',
          hover: { background: 'transparent' },
        },
      };
      const { content } = renderBackground(theme);
      expect(content).toHaveStyleRule('background-color', 'transparent');
      expect(content).toHaveStyleRule('background-color', 'transparent', {
        modifier: ':hover',
      });
    });

    test('overrides shared normal and hover backgrounds per input', () => {
      const theme: ThemeType = {
        formField: {
          background: normalColor,
          hover: { background: hoverColor },
          textInput: {
            background: overrideColor,
            hover: { background: stateColor },
          },
        },
      };
      const { content } = renderBackground(theme);
      expect(content).toHaveStyleRule('background-color', overrideColor);
      expect(content).toHaveStyleRule('background-color', stateColor, {
        modifier: ':hover',
      });
    });

    test('applies per-input Box-part styles and hover Box-state styles', async () => {
      const user = userEvent.setup();
      const theme: ThemeType = {
        formField: {
          border: false,
          textInput: {
            background: normalColor,
            border: { color: '#112233', size: '2px' },
            elevation: 'small',
            height: { min: '40px', height: '48px' },
            margin: { top: '4px' },
            pad: '8px',
            round: '6px',
            width: { min: '160px', width: '240px' },
            hover: {
              background: hoverColor,
              border: { color: '#445566' },
              elevation: 'medium',
              pad: '12px',
              round: '10px',
            },
          },
        },
      };
      const { content } = renderBackground(theme);

      expect(content).toHaveStyleRule('background-color', normalColor);
      expect(content).toHaveStyleRule('border', 'solid 2px #112233');
      expect(content).toHaveStyleRule('box-shadow', expect.any(String));
      expect(content).toHaveStyleRule('min-height', '40px');
      expect(content).toHaveStyleRule('height', '48px');
      expect(content).toHaveStyleRule('margin-top', '4px');
      expect(content).toHaveStyleRule('padding', '8px');
      expect(content).toHaveStyleRule('border-radius', '6px');
      expect(content).toHaveStyleRule('min-width', '160px');
      expect(content).toHaveStyleRule('width', '240px');

      await user.hover(content);
      expect(content).toHaveStyleRule('background-color', hoverColor, {
        modifier: ':hover',
      });
      expect(content).toHaveStyleRule('border-color', '#445566', {
        modifier: ':hover',
      });
      expect(content).toHaveStyleRule('box-shadow', expect.any(String), {
        modifier: ':hover',
      });
      expect(content).toHaveStyleRule('padding', '12px', {
        modifier: ':hover',
      });
      expect(content).toHaveStyleRule('border-radius', '10px', {
        modifier: ':hover',
      });
    });

    test.each(['checkBoxGroup', 'radioButtonGroup'] as const)(
      'applies Box-part and hover styles to the %s content wrapper',
      async (inputName) => {
        const user = userEvent.setup();
        const theme: ThemeType = {
          formField: {
            border: false,
            [inputName]: {
              border: { color: '#112233', size: '2px' },
              elevation: 'small',
              pad: '8px',
              round: '6px',
              hover: {
                background: hoverColor,
                border: { color: '#445566' },
                elevation: 'medium',
                pad: '12px',
                round: '10px',
              },
            },
          },
        };
        const children =
          inputName === 'checkBoxGroup' ? (
            <CheckBoxGroup
              aria-label="Choices"
              name="choices"
              options={['One', 'Two']}
            />
          ) : (
            <RadioButtonGroup
              aria-label="Choices"
              name="choices"
              options={['One', 'Two']}
            />
          );
        const { content } = renderBackground(theme, {
          fieldProps: { children },
        });

        expect(content).toHaveStyleRule('border', 'solid 2px #112233');
        expect(content).toHaveStyleRule('box-shadow', expect.any(String));
        expect(content).toHaveStyleRule('padding', '8px');
        expect(content).toHaveStyleRule('border-radius', '6px');
        await user.hover(content);
        expect(content).toHaveStyleRule('background-color', hoverColor, {
          modifier: ':hover',
        });
        expect(content).toHaveStyleRule('border-color', '#445566', {
          modifier: ':hover',
        });
        expect(content).toHaveStyleRule('padding', '12px', {
          modifier: ':hover',
        });
        expect(content).toHaveStyleRule('border-radius', '10px', {
          modifier: ':hover',
        });
      },
    );

    test('keeps FormField CheckBox padding on the CheckBox label', () => {
      render(
        <Grommet
          theme={{
            formField: {
              border: { position: 'inner', side: 'all' },
              checkBox: { pad: '12px' },
            },
          }}
        >
          <FormField label="Label">
            <CheckBox name="updates" label="Updates" />
          </FormField>
        </Grommet>,
      );
      expect(
        screen.getByRole('checkbox', { name: 'Updates' }).closest('label'),
      ).toHaveStyleRule('padding', '12px');
    });

    test('undefined per-input backgrounds inherit shared surfaces', () => {
      const theme: ThemeType = {
        formField: {
          background: normalColor,
          hover: { background: hoverColor },
          textInput: {
            background: undefined,
            hover: { background: undefined },
          },
        },
      };
      const { content } = renderBackground(theme);
      expect(content).toHaveStyleRule('background-color', normalColor);
      expect(content).toHaveStyleRule('background-color', hoverColor, {
        modifier: ':hover',
      });
    });

    test.each(['checkBoxGroup', 'radioButtonGroup'] as const)(
      '%s can opt out of both shared surfaces',
      (inputName) => {
        const theme: ThemeType = {
          formField: {
            background: normalColor,
            hover: { background: hoverColor },
            [inputName]: {
              background: 'transparent',
              hover: { background: 'transparent' },
            },
          },
        };
        const children =
          inputName === 'checkBoxGroup' ? (
            <CheckBoxGroup name="choices" options={['One', 'Two']} />
          ) : (
            <RadioButtonGroup name="choices" options={['One', 'Two']} />
          );
        const { content } = renderBackground(theme, {
          fieldProps: { children },
        });
        expect(content).toHaveStyleRule('background-color', 'transparent');
        expect(content).toHaveStyleRule('background-color', 'transparent', {
          modifier: ':hover',
        });
      },
    );

    test.each(positions)(
      'resolves generated default TextInput themes with %s borders',
      (_, border) => {
        const theme: ThemeType = {
          formField: {
            border,
            background: normalColor,
            hover: { background: hoverColor },
            textInput: {
              background: overrideColor,
              hover: { background: stateColor },
            },
          },
        };
        const { content } = renderBackground(theme, { generated: true });
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(content).toHaveStyleRule('background-color', overrideColor);
        expect(content).toHaveStyleRule('background-color', stateColor, {
          modifier: ':hover',
        });
      },
    );

    test('resolves an explicit generated component theme', () => {
      const theme: ThemeType = {
        formField: {
          background: normalColor,
          hover: { background: hoverColor },
          textArea: {
            background: overrideColor,
            hover: { background: stateColor },
          },
        },
      };
      const { content } = renderBackground(theme, {
        generated: true,
        fieldProps: { component: TextArea },
      });
      expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
      expect(content).toHaveStyleRule('background-color', overrideColor);
      expect(content).toHaveStyleRule('background-color', stateColor, {
        modifier: ':hover',
      });
    });

    test('per-input border false removes the default inner border', () => {
      const theme: ThemeType = {
        formField: {
          border: { position: 'inner', side: 'all', color: '#123456' },
          checkBoxGroup: { border: false },
        },
      };
      const { content } = renderBackground(theme, {
        fieldProps: {
          children: (
            <CheckBoxGroup
              aria-label="Choices"
              name="choices"
              options={['One', 'Two']}
            />
          ),
        },
      });

      expect(content).not.toHaveStyleRule('border-color', '#123456');
    });

    test.each([
      ['checkBoxGroup', 'inner'],
      ['checkBoxGroup', 'outer'],
      ['checkBoxGroup', 'borderless'],
      ['radioButtonGroup', 'inner'],
      ['radioButtonGroup', 'outer'],
      ['radioButtonGroup', 'borderless'],
    ] as const)(
      '%s error styles override normal styles with %s borders and reset',
      async (inputName, position) => {
        const user = userEvent.setup();
        const theme: ThemeType = {
          formField: {
            border:
              position === 'borderless' ? false : { position, side: 'all' },
            round: '6px',
            error: {
              background: stateColor,
              border: { color: '#990000' },
            },
            [inputName]: {
              background: 'transparent',
              border: { color: 'transparent', size: '3px', side: 'all' },
              elevation: 'small',
              pad: '8px',
              round: '6px',
              error: {
                background: '#ffdddd',
                border: { color: '#cc0000' },
                elevation: 'medium',
                pad: '12px',
                round: false,
              },
              hover: { background: hoverColor, pad: '16px' },
            },
          },
        };
        const children =
          inputName === 'checkBoxGroup' ? (
            <CheckBoxGroup name="choices" options={['One', 'Two']} />
          ) : (
            <RadioButtonGroup name="choices" options={['One', 'Two']} />
          );
        const content = (error: boolean) => (
          <Grommet theme={theme}>
            <Form>
              <FormField
                name="choices"
                label="Choices"
                error={error}
                contentProps={surfaceProps}
              >
                {children}
              </FormField>
            </Form>
          </Grommet>
        );
        const { rerender } = render(content(false));
        const surface = screen.getByRole('group', { name: 'Input surface' });
        expect(surface).toHaveStyleRule('border', 'solid 3px transparent');
        expect(surface).toHaveStyleRule('padding', '8px');
        rerender(content(true));
        expect(surface).toHaveStyleRule('border', 'solid 3px #cc0000');
        expect(surface).toHaveStyleRule('background-color', '#ffdddd');
        expect(surface).toHaveStyleRule('padding', '12px');
        expect(surface).not.toHaveStyleRule('border-radius');
        expect(surface).toHaveStyleRule('box-shadow', expect.any(String));
        expect(surface).not.toHaveAttribute('error');
        await user.hover(surface);
        expect(surface).not.toHaveStyleRule('background-color', undefined, {
          modifier: ':hover',
        });
        expect(surface).not.toHaveStyleRule('padding', undefined, {
          modifier: ':hover',
        });
        rerender(content(false));
        expect(surface).toHaveStyleRule('border', 'solid 3px transparent');
        expect(surface).toHaveStyleRule('background-color', 'transparent');
        expect(surface).toHaveStyleRule('padding', '8px');
        expect(surface).toHaveStyleRule('border-radius', '6px');
      },
    );

    test.each(['inner', 'borderless'] as const)(
      'per-input error styling inherits shared error fill and border color with %s borders',
      (position) => {
        const { content } = renderBackground(
          {
            formField: {
              border: position === 'inner' ? { position, side: 'all' } : false,
              error: {
                background: stateColor,
                border: { color: '#cc0000' },
              },
              textInput: {
                border: { color: 'transparent', size: '3px' },
                error: { pad: '12px' },
              },
            },
          },
          { fieldProps: { error: true } },
        );
        expect(content).toHaveStyleRule('border', 'solid 3px #cc0000');
        expect(content).toHaveStyleRule('background-color', stateColor);
        expect(content).toHaveStyleRule('padding', '12px');
      },
    );

    test('error border colors preserve normal border array sides and sizes', () => {
      const { content } = renderBackground(
        {
          formField: {
            border: false,
            textInput: {
              border: [
                { side: 'top', color: 'transparent', size: '2px' },
                { side: 'bottom', color: 'transparent', size: '3px' },
              ],
              error: { border: { color: '#cc0000' } },
            },
          },
        },
        { fieldProps: { error: true } },
      );
      expect(content).toHaveStyleRule('border-top', 'solid 2px #cc0000');
      expect(content).toHaveStyleRule('border-bottom', 'solid 3px #cc0000');
    });

    test('error border colors preserve a normal side-string border', () => {
      const { content } = renderBackground(
        {
          formField: {
            textInput: {
              border: 'bottom',
              error: { border: { color: '#cc0000' } },
            },
          },
        },
        { fieldProps: { error: true } },
      );
      expect(content).toHaveStyleRule('border-bottom', 'solid 1px #cc0000');
      expect(content).not.toHaveStyleRule('border');
    });

    test('generated input error styling remains visible during focus', async () => {
      const user = userEvent.setup();
      const { content } = renderBackground(
        {
          global: { focus: { border: { color: '#00ff00' } } },
          formField: {
            border: { position: 'inner', side: 'all' },
            textArea: {
              border: { color: 'transparent', size: '3px' },
              error: { border: { color: '#cc0000' }, pad: '12px' },
            },
          },
        },
        {
          generated: true,
          fieldProps: { component: TextArea, error: true },
        },
      );
      await user.type(screen.getByRole('textbox'), 'Keep this value');
      expect(screen.getByRole('textbox')).toHaveValue('Keep this value');
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-invalid',
        'true',
      );
      expect(content).toHaveStyleRule('border', 'solid 3px #cc0000');
      expect(content).toHaveStyleRule('border-color', '#cc0000');
      expect(content).toHaveStyleRule('padding', '12px');
    });

    test('per-input error styles allow false resets and contentProps overrides', () => {
      const theme: ThemeType = {
        formField: {
          textInput: {
            border: { color: '#112233' },
            error: { border: false, round: false, pad: '12px' },
          },
        },
      };
      const { content } = renderBackground(theme, {
        fieldProps: {
          error: true,
          contentProps: { background: overrideColor, pad: '16px' },
        },
      });
      expect(content).not.toHaveStyleRule('border');
      expect(content).not.toHaveStyleRule('border-radius');
      expect(content).toHaveStyleRule('padding', '16px');
      expect(content).toHaveStyleRule('background-color', overrideColor);
    });

    test.each([true, false])(
      'disabled=%s preserves state priority over the per-input error part',
      (disabled) => {
        const { content } = renderBackground(
          {
            global: { input: { readOnly: { background: '#112233' } } },
            formField: {
              border: { position: 'inner' },
              disabled: { background: '#223344' },
              textInput: {
                pad: '8px',
                error: { background: '#ffdddd', pad: '12px' },
              },
            },
          },
          {
            fieldProps: { disabled, error: true },
            inputProps: { disabled, readOnly: !disabled },
          },
        );
        expect(content).toHaveStyleRule(
          'background-color',
          disabled ? '#223344' : '#112233',
        );
        expect(content).toHaveStyleRule('padding', '8px');
      },
    );

    test.each(['checkBoxGroup', 'radioButtonGroup'] as const)(
      'generated %s uses its transparent normal and hover overrides',
      (inputName) => {
        const theme: ThemeType = {
          formField: {
            background: normalColor,
            hover: { background: hoverColor },
            [inputName]: {
              background: 'transparent',
              hover: { background: 'transparent' },
            },
          },
        };
        const { content } = renderBackground(theme, {
          generated: true,
          fieldProps: {
            component:
              inputName === 'checkBoxGroup' ? CheckBoxGroup : RadioButtonGroup,
            options: ['One', 'Two'],
          },
        });
        expect(content).toHaveStyleRule('background-color', 'transparent');
        expect(content).toHaveStyleRule('background-color', 'transparent', {
          modifier: ':hover',
        });
      },
    );

    test('does not infer inputs recursively through wrappers', () => {
      const theme: ThemeType = {
        formField: {
          background: normalColor,
          hover: { background: hoverColor },
          textInput: {
            background: overrideColor,
            hover: { background: stateColor },
          },
        },
      };
      const { content } = renderBackground(theme, {
        fieldProps: {
          children: (
            <Box>
              <TextInput id="background-input" />
            </Box>
          ),
        },
      });
      expect(content).toHaveStyleRule('background-color', normalColor);
      expect(content).toHaveStyleRule('background-color', hoverColor, {
        modifier: ':hover',
      });
    });

    const states = ['readOnly', 'error', 'disabled', 'focus'] as const;
    test.each(states)(
      'retains normal fill and suppresses hover when %s has no background',
      async (state) => {
        const user = userEvent.setup();
        const theme: ThemeType = {
          global: { input: { readOnly: { background: undefined } } },
          formField: {
            background: normalColor,
            hover: { background: hoverColor },
            error: { background: undefined },
            disabled: { background: undefined },
            focus: { background: undefined },
          },
        };
        const { content } = renderBackground(theme, {
          fieldProps: {
            error: state === 'error' ? 'Invalid' : undefined,
            disabled: state === 'disabled',
          },
          inputProps: {
            readOnly: state === 'readOnly',
            disabled: state === 'disabled',
          },
        });
        if (state === 'focus') await user.click(screen.getByRole('textbox'));
        expect(content).toHaveStyleRule('background-color', normalColor);
        expect(content).not.toHaveStyleRule('background-color', hoverColor, {
          modifier: ':hover',
        });
      },
    );

    test.each(['readOnly', 'error', 'disabled'] as const)(
      'inner %s background overrides normal fill',
      (state) => {
        const theme: ThemeType = {
          global: { input: { readOnly: { background: stateColor } } },
          formField: {
            background: normalColor,
            error: { background: stateColor },
            disabled: { background: stateColor },
          },
        };
        const { content, outer } = renderBackground(theme, {
          fieldProps: {
            error: state === 'error' ? 'Invalid' : undefined,
            disabled: state === 'disabled',
          },
          inputProps: { readOnly: state === 'readOnly' },
        });
        expect(content).toHaveStyleRule('background-color', stateColor);
        expect(outer).not.toHaveStyleRule('background-color', stateColor);
      },
    );

    test('inner state priority remains readOnly, error, then disabled', () => {
      const theme: ThemeType = {
        global: { input: { readOnly: { background: stateColor } } },
        formField: {
          background: normalColor,
          error: { background: overrideColor },
          disabled: { background: hoverColor },
        },
      };
      const { content } = renderBackground(theme, {
        fieldProps: { error: 'Invalid', disabled: true },
        inputProps: { readOnly: true },
      });
      expect(content).toHaveStyleRule('background-color', stateColor);
    });

    test('disabled fields suppress errors and retain the disabled background', () => {
      const theme: ThemeType = {
        formField: {
          background: normalColor,
          error: { background: stateColor },
          disabled: { background: hoverColor },
        },
      };
      const { content } = renderBackground(theme, {
        fieldProps: { error: 'Invalid', disabled: true },
      });
      expect(content).toHaveStyleRule('background-color', hoverColor);
    });

    test('a missing inner readOnly fill retains normal instead of lower states', () => {
      const theme: ThemeType = {
        global: { input: { readOnly: { background: undefined } } },
        formField: {
          background: normalColor,
          error: { background: stateColor },
          disabled: { background: hoverColor },
        },
      };
      const { content } = renderBackground(theme, {
        fieldProps: { error: 'Invalid', disabled: true },
        inputProps: { readOnly: true },
      });
      expect(content).toHaveStyleRule('background-color', normalColor);
    });

    test('generated readOnly inputs use the inner state background', () => {
      const theme: ThemeType = {
        global: { input: { readOnly: { background: stateColor } } },
        formField: {
          background: normalColor,
          hover: { background: hoverColor },
        },
      };
      const { content } = renderBackground(theme, {
        generated: true,
        fieldProps: { readOnly: true },
      });
      expect(content).toHaveStyleRule('background-color', stateColor);
      expect(content).not.toHaveStyleRule('background-color', hoverColor, {
        modifier: ':hover',
      });
    });

    test.each(['error', 'focus', 'disabled'] as const)(
      'outer %s background is not masked by the content default',
      async (state) => {
        const user = userEvent.setup();
        const theme: ThemeType = {
          formField: {
            border: { position: 'outer' },
            background: normalColor,
            textInput: { background: overrideColor },
            hover: { background: hoverColor },
            error: { background: stateColor },
            focus: { background: { color: stateColor } },
            disabled: { background: stateColor },
          },
        };
        const { content, outer } = renderBackground(theme, {
          fieldProps: {
            error: state === 'error' ? 'Invalid' : undefined,
            disabled: state === 'disabled',
          },
        });
        if (state === 'focus') await user.click(screen.getByRole('textbox'));
        expect(outer).toHaveStyleRule('background-color', stateColor);
        expect(content).not.toHaveStyleRule('background-color');
        expect(content).not.toHaveStyleRule('background-color', hoverColor, {
          modifier: ':hover',
        });
      },
    );

    test.each(['error', 'focus', 'disabled'] as const)(
      'outer %s without a background retains normal content fill',
      async (state) => {
        const user = userEvent.setup();
        const theme: ThemeType = {
          formField: {
            border: { position: 'outer' },
            background: normalColor,
            error: { background: undefined },
            focus: { background: undefined },
            disabled: { background: undefined },
          },
        };
        const { content, outer } = renderBackground(theme, {
          fieldProps: {
            error: state === 'error' ? 'Invalid' : undefined,
            disabled: state === 'disabled',
          },
        });
        if (state === 'focus') await user.click(screen.getByRole('textbox'));
        expect(content).toHaveStyleRule('background-color', normalColor);
        expect(outer).not.toHaveStyleRule('background-color', normalColor);
      },
    );

    test('outer disabled fields suppress errors and retain focus treatment', async () => {
      const user = userEvent.setup();
      const theme: ThemeType = {
        formField: {
          border: { position: 'outer' },
          background: normalColor,
          error: { background: stateColor },
          focus: { background: { color: overrideColor } },
          disabled: { background: hoverColor },
        },
      };
      const { content, outer } = renderBackground(theme, {
        fieldProps: { error: 'Invalid', disabled: true },
      });
      await user.click(screen.getByRole('textbox'));
      expect(outer).toHaveStyleRule('background-color', overrideColor);
      expect(content).not.toHaveStyleRule('background-color');
    });

    test('outer focus background wins over disabled', async () => {
      const user = userEvent.setup();
      const theme: ThemeType = {
        formField: {
          border: { position: 'outer' },
          background: normalColor,
          focus: { background: { color: stateColor } },
          disabled: { background: hoverColor },
        },
      };
      const { content, outer } = renderBackground(theme, {
        fieldProps: { disabled: true },
      });
      await user.click(screen.getByRole('textbox'));
      expect(outer).toHaveStyleRule('background-color', stateColor);
      expect(content).not.toHaveStyleRule('background-color');
    });

    test('normal and hover fills return after outer focus leaves', async () => {
      const user = userEvent.setup();
      const theme: ThemeType = {
        formField: {
          border: { position: 'outer' },
          background: normalColor,
          hover: { background: hoverColor },
          focus: { background: { color: stateColor } },
        },
      };
      const { content, outer } = renderBackground(theme);
      await user.click(screen.getByRole('textbox'));
      expect(outer).toHaveStyleRule('background-color', stateColor);
      expect(content).not.toHaveStyleRule('background-color');
      await user.tab();
      expect(outer).not.toHaveStyleRule('background-color', stateColor);
      expect(content).toHaveStyleRule('background-color', normalColor);
      expect(content).toHaveStyleRule('background-color', hoverColor, {
        modifier: ':hover',
      });
    });

    test('outer readOnly keeps normal fill and does not move its state fill', () => {
      const theme: ThemeType = {
        global: { input: { readOnly: { background: stateColor } } },
        formField: {
          border: { position: 'outer' },
          background: normalColor,
          hover: { background: hoverColor },
        },
      };
      const { content, outer } = renderBackground(theme, {
        inputProps: { readOnly: true },
      });
      expect(content).toHaveStyleRule('background-color', normalColor);
      expect(outer).not.toHaveStyleRule('background-color', stateColor);
      expect(content).not.toHaveStyleRule('background-color', hoverColor, {
        modifier: ':hover',
      });
    });

    test.each(states)(
      'borderless %s keeps normal fill without moving state backgrounds',
      async (state) => {
        const user = userEvent.setup();
        const theme: ThemeType = {
          global: { input: { readOnly: { background: stateColor } } },
          formField: {
            border: false,
            background: normalColor,
            hover: { background: hoverColor },
            error: { background: stateColor },
            disabled: { background: stateColor },
            focus: { background: { color: stateColor } },
          },
        };
        const { content, outer } = renderBackground(theme, {
          fieldProps: {
            error: state === 'error' ? 'Invalid' : undefined,
            disabled: state === 'disabled',
          },
          inputProps: { readOnly: state === 'readOnly' },
        });
        if (state === 'focus') await user.click(screen.getByRole('textbox'));
        expect(content).toHaveStyleRule('background-color', normalColor);
        expect(outer).not.toHaveStyleRule('background-color', stateColor);
        expect(content).not.toHaveStyleRule('background-color', hoverColor, {
          modifier: ':hover',
        });
      },
    );

    test.each(positions)(
      'contentProps background is last with %s borders and state fills',
      (_, border) => {
        const theme: ThemeType = {
          formField: {
            border,
            background: normalColor,
            textInput: { background: hoverColor },
            error: { background: stateColor },
          },
        };
        const { content } = renderBackground(theme, {
          fieldProps: {
            error: 'Invalid',
            contentProps: { background: overrideColor },
          },
        });
        expect(content).toHaveStyleRule('background-color', overrideColor);
      },
    );

    test.each([undefined, 'transparent'])(
      'contentProps can explicitly remove normal fill with %s',
      (background) => {
        const theme: ThemeType = { formField: { background: normalColor } };
        const { content } = renderBackground(theme, {
          fieldProps: { contentProps: { background } },
        });
        if (background === undefined)
          expect(content).not.toHaveStyleRule('background-color');
        else expect(content).toHaveStyleRule('background-color', 'transparent');
      },
    );

    test.each([false, true])(
      'resolves symbolic light/dark background colors (dark=%s)',
      (dark) => {
        const theme: ThemeType = {
          global: {
            colors: {
              background: dark ? '#000000' : '#ffffff',
              'input-surface': { light: normalColor, dark: overrideColor },
              'input-hover': { light: hoverColor, dark: stateColor },
            },
          },
          formField: {
            background: { color: 'input-surface' },
            hover: { background: { color: 'input-hover' } },
          },
        };
        const { content } = renderBackground(theme);
        expect(content).toHaveStyleRule(
          'background-color',
          dark ? 'rgba(34, 51, 68, 1)' : 'rgba(18, 52, 86, 1)',
        );
        expect(content).toHaveStyleRule(
          'background-color',
          dark ? 'rgba(171, 205, 239, 1)' : 'rgba(101, 67, 33, 1)',
          { modifier: ':hover' },
        );
      },
    );
  });

  describe('hover', () => {
    const hoverTheme = {
      formField: {
        hover: {
          background: '#654321',
          border: { color: '#AAFF00' },
        },
      },
    };

    const outerHoverTheme = {
      formField: {
        ...hoverTheme.formField,
        border: { position: 'outer' as const, side: 'all' as const },
      },
    };

    test('applies theme hover border and background to inner border', () => {
      const { container } = render(
        <Grommet theme={hoverTheme}>
          <FormField label="Label">
            <TextInput />
          </FormField>
        </Grommet>,
      );

      const contentBox = container.querySelector(
        '[class*="FormFieldContentBox"]',
      );
      expect(contentBox).toHaveStyleRule('border-color', '#AAFF00', {
        modifier: ':hover',
      });
      expect(contentBox).toHaveStyleRule('background-color', '#654321', {
        modifier: ':hover',
      });
    });

    test('applies theme hover border to outer border', () => {
      const { container } = render(
        <Grommet theme={outerHoverTheme}>
          <FormField label="Label">
            <TextInput />
          </FormField>
        </Grommet>,
      );

      expect(
        container.querySelector('[class*="FormFieldBox"]'),
      ).toHaveStyleRule('border-color', '#AAFF00', { modifier: ':hover' });
    });

    test('keeps hover background off the outer box so it does not cover the label', () => {
      const { container } = render(
        <Grommet theme={outerHoverTheme}>
          <FormField label="Label">
            <TextInput />
          </FormField>
        </Grommet>,
      );

      expect(
        container.querySelector('[class*="FormFieldBox"]'),
      ).not.toHaveStyleRule('background-color', '#654321', {
        modifier: ':hover',
      });
      expect(
        container.querySelector('[class*="FormFieldContentBox"]'),
      ).toHaveStyleRule('background-color', '#654321', { modifier: ':hover' });
    });

    test('applies theme hover background when theme has no border', () => {
      const { container } = render(
        <Grommet
          theme={{ formField: { ...hoverTheme.formField, border: false } }}
        >
          <FormField label="Label">
            <TextInput />
          </FormField>
        </Grommet>,
      );

      expect(
        container.querySelector('[class*="StyledContentsBox"]'),
      ).toHaveStyleRule('background-color', '#654321', { modifier: ':hover' });
    });

    test('allows a child input to opt out of the shared hover border color', () => {
      const { container } = render(
        <Grommet
          theme={{
            formField: {
              ...hoverTheme.formField,
              radioButtonGroup: {
                hover: {
                  border: { color: undefined },
                },
              },
            },
          }}
        >
          <FormField label="Label">
            <RadioButtonGroup name="test" options={['One', 'Two']} />
          </FormField>
        </Grommet>,
      );

      expect(
        container.querySelector('[class*="FormFieldContentBox"]'),
      ).not.toHaveStyleRule('border-color', '#AAFF00', { modifier: ':hover' });
    });

    test('allows a child input to override the shared hover border color', () => {
      const { container } = render(
        <Grommet
          theme={{
            formField: {
              ...hoverTheme.formField,
              radioButtonGroup: {
                hover: {
                  border: { color: '#112233' },
                },
              },
            },
          }}
        >
          <FormField label="Label">
            <RadioButtonGroup name="test" options={['One', 'Two']} />
          </FormField>
        </Grommet>,
      );

      expect(
        container.querySelector('[class*="FormFieldContentBox"]'),
      ).toHaveStyleRule('border-color', '#112233', { modifier: ':hover' });
    });

    test('allows a child input to override the shared hover background color', () => {
      const { container } = render(
        <Grommet
          theme={{
            formField: {
              ...hoverTheme.formField,
              radioButtonGroup: {
                hover: {
                  background: '#223344',
                },
              },
            },
          }}
        >
          <FormField label="Label">
            <RadioButtonGroup name="test" options={['One', 'Two']} />
          </FormField>
        </Grommet>,
      );

      expect(
        container.querySelector('[class*="FormFieldContentBox"]'),
      ).toHaveStyleRule('background-color', '#223344', { modifier: ':hover' });
    });

    test('does not apply hover styling when disabled', () => {
      const { container } = render(
        <Grommet theme={hoverTheme}>
          <FormField label="Label" disabled>
            <TextInput disabled />
          </FormField>
        </Grommet>,
      );

      expect(
        container.querySelector('[class*="FormFieldContentBox"]'),
      ).not.toHaveStyleRule('border-color', '#AAFF00', { modifier: ':hover' });
    });

    test('does not apply hover styling when readOnly', () => {
      const { container } = render(
        <Grommet theme={hoverTheme}>
          <FormField label="Label">
            <TextInput readOnly />
          </FormField>
        </Grommet>,
      );

      expect(
        container.querySelector('[class*="FormFieldContentBox"]'),
      ).not.toHaveStyleRule('border-color', '#AAFF00', { modifier: ':hover' });
    });

    test('does not apply hover styling when there is an error', () => {
      const { container } = render(
        <Grommet theme={hoverTheme}>
          <FormField label="Label" error="Required">
            <TextInput />
          </FormField>
        </Grommet>,
      );

      expect(
        container.querySelector('[class*="FormFieldContentBox"]'),
      ).not.toHaveStyleRule('border-color', '#AAFF00', { modifier: ':hover' });
    });

    test('does not apply hover styling when focused', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Grommet theme={hoverTheme}>
          <FormField label="Label">
            <TextInput />
          </FormField>
        </Grommet>,
      );

      await user.click(screen.getByRole('textbox'));

      expect(
        container.querySelector('[class*="FormFieldContentBox"]'),
      ).not.toHaveStyleRule('border-color', '#AAFF00', { modifier: ':hover' });
    });
  });
});
