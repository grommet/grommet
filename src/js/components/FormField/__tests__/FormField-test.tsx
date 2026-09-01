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
import { Button } from '../../Button';
import { CheckBox } from '../../CheckBox';
import { RadioButtonGroup } from '../../RadioButtonGroup';
import { RangeInput } from '../../RangeInput';
import { Form } from '../../Form';
import { Grommet } from '../../Grommet';
import { TextInput } from '../../TextInput';
import { TextArea } from '../../TextArea';
import { Text } from '../../Text';

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
