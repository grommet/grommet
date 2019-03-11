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
    }), React.createElement(FormField, {
      name: "test2",
      placeholder: "test-2 input"
    }), React.createElement(Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByPlaceholderText = _render.getByPlaceholderText,
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });
    fireEvent.click(getByText('Submit'));
    expect(validate).toBeCalledWith('v', {
      test: 'v'
    });
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'value'
      }
    });
    fireEvent.change(getByPlaceholderText('test-2 input'), {
      target: {
        value: 'value-2'
      }
    });
    fireEvent.click(getByText('Submit'));
    expect(validate).toBeCalledWith('value', {
      test: 'value',
      test2: 'value-2'
    });
    expect(onSubmit).toBeCalledWith(expect.objectContaining({
      value: {
        test: 'value',
        test2: 'value-2'
      }
    }));
  });
  test('regexp validation', function () {
    var onSubmit = jest.fn();

    var _render2 = render(React.createElement(Grommet, null, React.createElement(Form, {
      onSubmit: onSubmit
    }, React.createElement(FormField, {
      name: "test",
      required: true,
      validate: {
        regexp: /^[a-z]/i
      },
      placeholder: "test input"
    }), React.createElement(Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByPlaceholderText = _render2.getByPlaceholderText,
        getByText = _render2.getByText,
        queryByText = _render2.queryByText;

    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: '1'
      }
    });
    fireEvent.click(getByText('Submit'));
    expect(getByText('invalid')).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'a'
      }
    });
    fireEvent.click(getByText('Submit'));
    expect(queryByText('invalid')).toBeNull();
  });
  test('required validation', function () {
    var onSubmit = jest.fn();

    var _render3 = render(React.createElement(Grommet, null, React.createElement(Form, {
      onSubmit: onSubmit
    }, React.createElement(FormField, {
      name: "test",
      required: true,
      placeholder: "test input"
    }), React.createElement(Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByPlaceholderText = _render3.getByPlaceholderText,
        getByText = _render3.getByText,
        queryByText = _render3.queryByText;

    fireEvent.click(getByText('Submit'));
    expect(queryByText('required')).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: '1'
      }
    });
    expect(queryByText('required')).toBeNull();
  });
  test('reset clears form', function () {
    var onReset = jest.fn();

    var _render4 = render(React.createElement(Grommet, null, React.createElement(Form, {
      onReset: onReset
    }, React.createElement(FormField, {
      name: "test",
      required: true,
      placeholder: "test input"
    }), React.createElement(Button, {
      type: "reset",
      primary: true,
      label: "Reset"
    })))),
        getByPlaceholderText = _render4.getByPlaceholderText,
        getByText = _render4.getByText,
        queryByText = _render4.queryByText;

    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'Input has changed'
      }
    });
    fireEvent.click(getByText('Reset'));
    expect(queryByText('Input has changed')).toBeNull();
  });
});