import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import styled from 'styled-components';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Alert, New, StatusInfo } from 'grommet-icons';
import { Grommet } from '../../Grommet';
import { Form } from '../../Form';
import { CheckBox } from '../../CheckBox';
import { FormField } from '..';
import { TextInput } from '../../TextInput';
import { TextArea } from '../../TextArea';

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
          <FormField name="formField" disabled />
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
          <FormField name="formField" required />
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
          <FormField name="formField" label="label" />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled with custom label', () => {
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
            },
          },
        }}
      >
        <Form>
          <FormField name="formField" disabled label="label" />
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
          <FormField name="formField" label="label" pad />
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
          <FormField name="formField" label="label" />
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
            name="formField"
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
            name="formField"
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
          <FormField name="formField" label="label" required />
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
          <FormField name="formField" label="label" required />
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
          <FormField
            name="formField"
            label="label"
            required={{ indicator: false }}
          />
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
            <CheckBox name="checkbox" label="checkbox with pad" />
          </FormField>
          <CheckBox name="checkbox" label="checkbox without pad" />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
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
});
