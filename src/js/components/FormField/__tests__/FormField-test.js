import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { cleanup, render } from '@testing-library/react';
import { Alert, New, StatusInfo } from 'grommet-icons';
import { Grommet } from '../../Grommet';
import { Form } from '../../Form';
import { FormField } from '..';
import { TextInput } from '../../TextInput';

const CustomFormField = styled(FormField)`
  font-size: 40px;
`;

describe('FormField', () => {
  afterEach(cleanup);

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
    const component = renderer.create(
      <Grommet>
        <FormField />
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('label', () => {
    const component = renderer.create(
      <Grommet>
        <FormField label="test label" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('help', () => {
    const component = renderer.create(
      <Grommet>
        <FormField help="test help" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('error', () => {
    const component = renderer.create(
      <Grommet>
        <FormField error="test error" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('info', () => {
    const component = renderer.create(
      <Grommet>
        <FormField info="test info" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('htmlFor', () => {
    const component = renderer.create(
      <Grommet>
        <FormField htmlFor="test-id" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('margin', () => {
    const component = renderer.create(
      <Grommet>
        <FormField margin="medium" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('empty margin', () => {
    const component = renderer.create(
      <Grommet>
        <FormField margin="none" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('pad', () => {
    const component = renderer.create(
      <Grommet>
        <FormField pad />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('abut', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('abut with margin', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('custom formfield', () => {
    const component = renderer.create(
      <Grommet>
        <CustomFormField htmlFor="test-id" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('disabled', () => {
    const component = renderer.create(
      <Grommet>
        <FormField disabled /> {/* don't use FormField without Form */}
        <Form>
          <FormField disabled />
        </Form>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('required', () => {
    const component = renderer.create(
      <Grommet>
        <FormField required /> {/* don't use FormField without Form */}
        <Form>
          <FormField required />
        </Form>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('custom label', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('disabled with custom label', () => {
    const component = renderer.create(
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
          <FormField disabled label="label" />
        </Form>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('pad with border undefined', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('custom input margin', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('contentProps', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('custom error and info icon and container', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
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
});
