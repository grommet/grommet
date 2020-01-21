import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from '@testing-library/react';
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
    var validate2 = jest.fn().mockReturnValue(undefined);
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
      placeholder: "test-2 input",
      validate: [validate2]
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
    expect(validate2).toBeCalledWith(undefined, {
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
    expect(validate2).toBeCalledWith('value-2', {
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
  test('initial values', function () {
    var _onSubmit = jest.fn();

    var _render5 = render(React.createElement(Grommet, null, React.createElement(Form, {
      onSubmit: function onSubmit(_ref) {
        var value = _ref.value;
        return _onSubmit({
          value: value
        });
      }
    }, React.createElement(FormField, {
      name: "test",
      required: true,
      placeholder: "test input",
      value: "Initial value"
    }), React.createElement(FormField, {
      name: "test2",
      value: "Initial value2"
    }), React.createElement(Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByText = _render5.getByText,
        queryByText = _render5.queryByText;

    fireEvent.click(getByText('Submit'));
    expect(queryByText('required')).toBeNull();
    expect(_onSubmit).toBeCalledWith(expect.objectContaining({
      value: {
        test: 'Initial value',
        test2: 'Initial value2'
      }
    }));
  });
});