import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

import { MnetUIBase } from '../../MnetUIBase';
import { FormField } from '..';
import { TextInput } from '../../TextInput';

const CustomFormField = styled(FormField)`
  font-size: 40px;
`;

describe('FormField', () => {
  test('default', () => {
    const component = renderer.create(
      <MnetUIBase>
        <FormField />
        <FormField>
          <TextInput />
        </FormField>
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('label', () => {
    const component = renderer.create(
      <MnetUIBase>
        <FormField label="test label" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('help', () => {
    const component = renderer.create(
      <MnetUIBase>
        <FormField help="test help" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('error', () => {
    const component = renderer.create(
      <MnetUIBase>
        <FormField error="test error" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('info', () => {
    const component = renderer.create(
      <Grommet>
        <FormField info="test info" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('htmlFor', () => {
    const component = renderer.create(
      <MnetUIBase>
        <FormField htmlFor="test-id" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('margin', () => {
    const component = renderer.create(
      <MnetUIBase>
        <FormField margin="medium" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('empty margin', () => {
    const component = renderer.create(
      <MnetUIBase>
        <FormField margin="none" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('pad', () => {
    const component = renderer.create(
      <MnetUIBase>
        <FormField pad />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('abut', () => {
    const component = renderer.create(
      <MnetUIBase
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
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('abut with margin', () => {
    const component = renderer.create(
      <MnetUIBase
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
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('custom formfield', () => {
    const component = renderer.create(
      <MnetUIBase>
        <CustomFormField htmlFor="test-id" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
