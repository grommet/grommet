import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Form } from '..';
import { FormField } from '../../FormField';
import { Button } from '../../Button';
import { Text } from '../../Text';
import { TextInput } from '../../TextInput';
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
  test('errors', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Form, {
      errors: {
        test: 'missing'
      }
    }, React.createElement(FormField, {
      name: "test"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('infos', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Form, {
      infos: {
        test: 'missing'
      }
    }, React.createElement(FormField, {
      name: "test"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('controlled', function () {
    var onSubmit = jest.fn();

    var Test = function Test() {
      var _React$useState = React.useState({
        test: ''
      }),
          value = _React$useState[0],
          setValue = _React$useState[1];

      var onChange = React.useCallback(function (nextValue) {
        return setValue(nextValue);
      }, []);
      return React.createElement(Form, {
        value: value,
        onChange: onChange,
        onSubmit: onSubmit
      }, React.createElement(FormField, {
        name: "test"
      }, React.createElement(TextInput, {
        name: "test",
        placeholder: "test input"
      })), React.createElement(Button, {
        type: "submit",
        primary: true,
        label: "Submit"
      }));
    };

    var _render = render(React.createElement(Grommet, null, React.createElement(Test, null))),
        getByPlaceholderText = _render.getByPlaceholderText,
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith(expect.objectContaining({
      value: {
        test: 'v'
      },
      touched: {
        test: true
      }
    }));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('controlled lazy', function () {
    var onSubmit = jest.fn();

    var Test = function Test() {
      var _React$useState2 = React.useState({}),
          value = _React$useState2[0],
          setValue = _React$useState2[1];

      React.useEffect(function () {
        return setValue({
          test: 'test'
        });
      }, []);
      var onChange = React.useCallback(function (nextValue) {
        return setValue(nextValue);
      }, []);
      return React.createElement(Form, {
        value: value,
        onChange: onChange,
        onSubmit: onSubmit
      }, React.createElement(FormField, {
        name: "test"
      }, React.createElement(TextInput, {
        name: "test",
        placeholder: "test input"
      })), React.createElement(Button, {
        type: "submit",
        primary: true,
        label: "Submit"
      }));
    };

    var _render2 = render(React.createElement(Grommet, null, React.createElement(Test, null))),
        getByPlaceholderText = _render2.getByPlaceholderText,
        getByText = _render2.getByText,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith(expect.objectContaining({
      value: {
        test: 'v'
      },
      touched: {
        test: true
      }
    }));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('uncontrolled', function () {
    var onSubmit = jest.fn();

    var _render3 = render(React.createElement(Grommet, null, React.createElement(Form, {
      onSubmit: onSubmit
    }, React.createElement(FormField, {
      name: "test"
    }, React.createElement(TextInput, {
      name: "test",
      placeholder: "test input"
    })), React.createElement(Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByPlaceholderText = _render3.getByPlaceholderText,
        getByText = _render3.getByText,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith(expect.objectContaining({
      value: {
        test: 'v'
      },
      touched: {
        test: true
      }
    }));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('controlled input', function () {
    var onSubmit = jest.fn();

    var Test = function Test() {
      var _React$useState3 = React.useState(''),
          value = _React$useState3[0],
          setValue = _React$useState3[1];

      var onChange = React.useCallback(function (event) {
        return setValue(event.target.value);
      }, []);
      return React.createElement(Form, {
        onSubmit: onSubmit
      }, React.createElement(FormField, {
        name: "test"
      }, React.createElement(TextInput, {
        name: "test",
        placeholder: "test input",
        value: value,
        onChange: onChange
      })), React.createElement(Button, {
        type: "submit",
        primary: true,
        label: "Submit"
      }));
    };

    var _render4 = render(React.createElement(Grommet, null, React.createElement(Test, null))),
        getByPlaceholderText = _render4.getByPlaceholderText,
        getByText = _render4.getByText,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith(expect.objectContaining({
      value: {
        test: 'v'
      },
      touched: {
        test: true
      }
    }));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('controlled input lazy', function () {
    var onSubmit = jest.fn();

    var Test = function Test() {
      var _React$useState4 = React.useState(''),
          value = _React$useState4[0],
          setValue = _React$useState4[1];

      React.useEffect(function () {
        return setValue('test');
      }, []);
      var onChange = React.useCallback(function (event) {
        return setValue(event.target.value);
      }, []);
      return React.createElement(Form, {
        onSubmit: onSubmit
      }, React.createElement(FormField, {
        name: "test"
      }, React.createElement(TextInput, {
        name: "test",
        placeholder: "test input",
        value: value,
        onChange: onChange
      })), React.createElement(Button, {
        type: "submit",
        primary: true,
        label: "Submit"
      }));
    };

    var _render5 = render(React.createElement(Grommet, null, React.createElement(Test, null))),
        getByPlaceholderText = _render5.getByPlaceholderText,
        getByText = _render5.getByText,
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith(expect.objectContaining({
      value: {
        test: 'v'
      },
      touched: {
        test: true
      }
    }));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('update', function () {
    var validate = jest.fn().mockReturnValueOnce('too short').mockReturnValueOnce(undefined);
    var validate2 = jest.fn().mockReturnValue(undefined);
    var onSubmit = jest.fn();

    var _render6 = render(React.createElement(Grommet, null, React.createElement(Form, {
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
        getByPlaceholderText = _render6.getByPlaceholderText,
        getByText = _render6.getByText,
        container = _render6.container;

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
      },
      touched: {
        test: true,
        test2: true
      }
    }));
  });
  test('regexp validation', function () {
    var onSubmit = jest.fn();

    var _render7 = render(React.createElement(Grommet, null, React.createElement(Form, {
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
        getByPlaceholderText = _render7.getByPlaceholderText,
        getByText = _render7.getByText,
        queryByText = _render7.queryByText;

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
  test('validate', function () {
    var onSubmit = jest.fn();

    var _render8 = render(React.createElement(Grommet, null, React.createElement(Form, {
      onSubmit: onSubmit
    }, React.createElement(FormField, {
      name: "test",
      required: true,
      validate: [function (value) {
        return value.length === 1 ? 'simple string' : undefined;
      }, function (value) {
        return value.length === 2 ? React.createElement(Text, null, " ReactNode ") : undefined;
      }, function (value) {
        return value.length === 3 ? {
          message: 'status error',
          status: 'error'
        } : undefined;
      }, function (value) {
        return value.length === 4 ? {
          message: 'status info',
          status: 'info'
        } : undefined;
      }],
      placeholder: "test input"
    }), React.createElement(Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByPlaceholderText = _render8.getByPlaceholderText,
        getByText = _render8.getByText;

    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'a'
      }
    });
    fireEvent.click(getByText('Submit'));
    expect(getByText('simple string')).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'ab'
      }
    });
    fireEvent.click(getByText('Submit'));
    expect(getByText('ReactNode')).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'abc'
      }
    });
    fireEvent.click(getByText('Submit'));
    expect(getByText('status error')).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'abcd'
      }
    });
    fireEvent.click(getByText('Submit'));
    expect(getByText('status info')).toMatchSnapshot();
  });
  test('required validation', function () {
    var onSubmit = jest.fn();

    var _render9 = render(React.createElement(Grommet, null, React.createElement(Form, {
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
        getByPlaceholderText = _render9.getByPlaceholderText,
        getByText = _render9.getByText,
        queryByText = _render9.queryByText;

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

    var _render10 = render(React.createElement(Grommet, null, React.createElement(Form, {
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
        getByPlaceholderText = _render10.getByPlaceholderText,
        getByText = _render10.getByText,
        queryByText = _render10.queryByText;

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

    var _render11 = render(React.createElement(Grommet, null, React.createElement(Form, {
      onSubmit: function onSubmit(_ref) {
        var value = _ref.value,
            touched = _ref.touched;
        return _onSubmit({
          value: value,
          touched: touched
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
        getByText = _render11.getByText,
        queryByText = _render11.queryByText;

    fireEvent.click(getByText('Submit'));
    expect(queryByText('required')).toBeNull();
    expect(_onSubmit).toBeCalledWith(expect.objectContaining({
      value: {
        test: 'Initial value',
        test2: 'Initial value2'
      },
      touched: {}
    }));
  });
  test('lazy value', function () {
    var _onSubmit2 = jest.fn();

    var Test = function Test() {
      var _React$useState5 = React.useState(),
          test = _React$useState5[0],
          setTest = _React$useState5[1];

      return React.createElement(Form, {
        onSubmit: function onSubmit(_ref2) {
          var value = _ref2.value,
              touched = _ref2.touched;
          return _onSubmit2({
            value: value,
            touched: touched
          });
        }
      }, React.createElement(TextInput, {
        name: "test",
        value: test
      }), React.createElement(Button, {
        label: "set",
        onClick: function onClick() {
          return setTest('a');
        }
      }), React.createElement(Button, {
        label: "submit",
        type: "submit"
      }));
    };

    var _render12 = render(React.createElement(Grommet, null, React.createElement(Test, null))),
        container = _render12.container,
        getByText = _render12.getByText;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('set'));
    fireEvent.click(getByText('submit'));
    expect(_onSubmit2).toBeCalledWith(expect.objectContaining({
      value: {
        test: 'a'
      }
    }));
  }); // deprecated FormField+input pattern

  test('controlled FormField deprecated', function () {
    var onSubmit = jest.fn();

    var Test = function Test() {
      var _React$useState6 = React.useState({
        test: ''
      }),
          value = _React$useState6[0],
          setValue = _React$useState6[1];

      var onChange = React.useCallback(function (nextValue) {
        return setValue(nextValue);
      }, []);
      return React.createElement(Form, {
        value: value,
        onChange: onChange,
        onSubmit: onSubmit
      }, React.createElement(FormField, {
        label: "test",
        name: "test",
        id: "test",
        htmlFor: "test"
      }), React.createElement(Button, {
        type: "submit",
        primary: true,
        label: "Submit"
      }));
    };

    var _render13 = render(React.createElement(Grommet, null, React.createElement(Test, null))),
        getByLabelText = _render13.getByLabelText,
        getByText = _render13.getByText,
        container = _render13.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByLabelText('test'), {
      target: {
        value: 'v'
      }
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith(expect.objectContaining({
      value: {
        test: 'v'
      },
      touched: {
        test: true
      }
    }));
    expect(container.firstChild).toMatchSnapshot();
  });
});