import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Form } from '..';
import { FormField } from '../../FormField';
import { Button } from '../../Button';
describe('Form', function () {
  afterEach(cleanup);
  test('empty', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Form, null)));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('with field', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Form, null, React.createElement(FormField, {
      name: "test"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('update', function () {
    var validate = jest.fn().mockReturnValueOnce('too short').mockReturnValueOnce(undefined);
    var onSubmit = jest.fn();

    var _render = render(React.createElement(Grommet, null, React.createElement(Form, {
      onSubmit: onSubmit
    }, React.createElement(FormField, {
      name: "test",
      required: true,
      validate: validate,
      placeholder: "test input"
    }), React.createElement(Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByPlaceholderText = _render.getByPlaceholderText,
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });
    expect(validate).toBeCalledWith('v');
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'value'
      }
    });
    expect(validate).toBeCalledWith('value');
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith(expect.objectContaining({
      value: {
        test: 'value'
      }
    }));
  });
});