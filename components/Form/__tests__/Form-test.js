"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _react2 = require("@testing-library/react");

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

var _FormField = require("../../FormField");

var _Button = require("../../Button");

var _Text = require("../../Text");

var _TextInput = require("../../TextInput");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Form', function () {
  afterEach(_react2.cleanup);
  test('empty', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Form, null)));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('with field', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Form, null, _react["default"].createElement(_FormField.FormField, {
      name: "test"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('errors', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Form, {
      errors: {
        test: 'missing'
      }
    }, _react["default"].createElement(_FormField.FormField, {
      name: "test"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('infos', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Form, {
      infos: {
        test: 'missing'
      }
    }, _react["default"].createElement(_FormField.FormField, {
      name: "test"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('controlled', function () {
    var onSubmit = jest.fn();

    var Test = function Test() {
      var _React$useState = _react["default"].useState({
        test: ''
      }),
          value = _React$useState[0],
          setValue = _React$useState[1];

      var onChange = _react["default"].useCallback(function (nextValue) {
        return setValue(nextValue);
      }, []);

      return _react["default"].createElement(_.Form, {
        value: value,
        onChange: onChange,
        onSubmit: onSubmit
      }, _react["default"].createElement(_FormField.FormField, {
        name: "test"
      }, _react["default"].createElement(_TextInput.TextInput, {
        name: "test",
        placeholder: "test input"
      })), _react["default"].createElement(_Button.Button, {
        type: "submit",
        primary: true,
        label: "Submit"
      }));
    };

    var _render = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(Test, null))),
        getByPlaceholderText = _render.getByPlaceholderText,
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('Submit'));

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
      var _React$useState2 = _react["default"].useState({}),
          value = _React$useState2[0],
          setValue = _React$useState2[1];

      _react["default"].useEffect(function () {
        return setValue({
          test: 'test'
        });
      }, []);

      var onChange = _react["default"].useCallback(function (nextValue) {
        return setValue(nextValue);
      }, []);

      return _react["default"].createElement(_.Form, {
        value: value,
        onChange: onChange,
        onSubmit: onSubmit
      }, _react["default"].createElement(_FormField.FormField, {
        name: "test"
      }, _react["default"].createElement(_TextInput.TextInput, {
        name: "test",
        placeholder: "test input"
      })), _react["default"].createElement(_Button.Button, {
        type: "submit",
        primary: true,
        label: "Submit"
      }));
    };

    var _render2 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(Test, null))),
        getByPlaceholderText = _render2.getByPlaceholderText,
        getByText = _render2.getByText,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('Submit'));

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

    var _render3 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Form, {
      onSubmit: onSubmit
    }, _react["default"].createElement(_FormField.FormField, {
      name: "test"
    }, _react["default"].createElement(_TextInput.TextInput, {
      name: "test",
      placeholder: "test input"
    })), _react["default"].createElement(_Button.Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByPlaceholderText = _render3.getByPlaceholderText,
        getByText = _render3.getByText,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('Submit'));

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
      var _React$useState3 = _react["default"].useState(''),
          value = _React$useState3[0],
          setValue = _React$useState3[1];

      var onChange = _react["default"].useCallback(function (event) {
        return setValue(event.target.value);
      }, []);

      return _react["default"].createElement(_.Form, {
        onSubmit: onSubmit
      }, _react["default"].createElement(_FormField.FormField, {
        name: "test"
      }, _react["default"].createElement(_TextInput.TextInput, {
        name: "test",
        placeholder: "test input",
        value: value,
        onChange: onChange
      })), _react["default"].createElement(_Button.Button, {
        type: "submit",
        primary: true,
        label: "Submit"
      }));
    };

    var _render4 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(Test, null))),
        getByPlaceholderText = _render4.getByPlaceholderText,
        getByText = _render4.getByText,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('Submit'));

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
      var _React$useState4 = _react["default"].useState(''),
          value = _React$useState4[0],
          setValue = _React$useState4[1];

      _react["default"].useEffect(function () {
        return setValue('test');
      }, []);

      var onChange = _react["default"].useCallback(function (event) {
        return setValue(event.target.value);
      }, []);

      return _react["default"].createElement(_.Form, {
        onSubmit: onSubmit
      }, _react["default"].createElement(_FormField.FormField, {
        name: "test"
      }, _react["default"].createElement(_TextInput.TextInput, {
        name: "test",
        placeholder: "test input",
        value: value,
        onChange: onChange
      })), _react["default"].createElement(_Button.Button, {
        type: "submit",
        primary: true,
        label: "Submit"
      }));
    };

    var _render5 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(Test, null))),
        getByPlaceholderText = _render5.getByPlaceholderText,
        getByText = _render5.getByText,
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('Submit'));

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

    var _render6 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Form, {
      onSubmit: onSubmit
    }, _react["default"].createElement(_FormField.FormField, {
      name: "test",
      required: true,
      validate: validate,
      placeholder: "test input"
    }), _react["default"].createElement(_FormField.FormField, {
      name: "test2",
      placeholder: "test-2 input",
      validate: [validate2]
    }), _react["default"].createElement(_Button.Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByPlaceholderText = _render6.getByPlaceholderText,
        getByText = _render6.getByText,
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(validate).toBeCalledWith('v', {
      test: 'v'
    });
    expect(validate2).toBeCalledWith(undefined, {
      test: 'v'
    });

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'value'
      }
    });

    _react2.fireEvent.change(getByPlaceholderText('test-2 input'), {
      target: {
        value: 'value-2'
      }
    });

    _react2.fireEvent.click(getByText('Submit'));

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

    var _render7 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Form, {
      onSubmit: onSubmit
    }, _react["default"].createElement(_FormField.FormField, {
      name: "test",
      required: true,
      validate: {
        regexp: /^[a-z]/i
      },
      placeholder: "test input"
    }), _react["default"].createElement(_Button.Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByPlaceholderText = _render7.getByPlaceholderText,
        getByText = _render7.getByText,
        queryByText = _render7.queryByText;

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: '1'
      }
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(getByText('invalid')).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'a'
      }
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(queryByText('invalid')).toBeNull();
  });
  test('validate', function () {
    var onSubmit = jest.fn();

    var _render8 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Form, {
      onSubmit: onSubmit
    }, _react["default"].createElement(_FormField.FormField, {
      name: "test",
      required: true,
      validate: [function (value) {
        return value.length === 1 ? 'simple string' : undefined;
      }, function (value) {
        return value.length === 2 ? _react["default"].createElement(_Text.Text, null, " ReactNode ") : undefined;
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
    }), _react["default"].createElement(_Button.Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByPlaceholderText = _render8.getByPlaceholderText,
        getByText = _render8.getByText;

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'a'
      }
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(getByText('simple string')).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'ab'
      }
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(getByText('ReactNode')).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'abc'
      }
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(getByText('status error')).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'abcd'
      }
    });

    _react2.fireEvent.click(getByText('Submit'));

    expect(getByText('status info')).toMatchSnapshot();
  });
  test('required validation', function () {
    var onSubmit = jest.fn();

    var _render9 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Form, {
      onSubmit: onSubmit
    }, _react["default"].createElement(_FormField.FormField, {
      name: "test",
      required: true,
      placeholder: "test input"
    }), _react["default"].createElement(_Button.Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByPlaceholderText = _render9.getByPlaceholderText,
        getByText = _render9.getByText,
        queryByText = _render9.queryByText;

    _react2.fireEvent.click(getByText('Submit'));

    expect(queryByText('required')).toMatchSnapshot();

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: '1'
      }
    });

    expect(queryByText('required')).toBeNull();
  });
  test('reset clears form', function () {
    var onReset = jest.fn();

    var _render10 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Form, {
      onReset: onReset
    }, _react["default"].createElement(_FormField.FormField, {
      name: "test",
      required: true,
      placeholder: "test input"
    }), _react["default"].createElement(_Button.Button, {
      type: "reset",
      primary: true,
      label: "Reset"
    })))),
        getByPlaceholderText = _render10.getByPlaceholderText,
        getByText = _render10.getByText,
        queryByText = _render10.queryByText;

    _react2.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'Input has changed'
      }
    });

    _react2.fireEvent.click(getByText('Reset'));

    expect(queryByText('Input has changed')).toBeNull();
  });
  test('initial values', function () {
    var _onSubmit = jest.fn();

    var _render11 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Form, {
      onSubmit: function onSubmit(_ref) {
        var value = _ref.value,
            touched = _ref.touched;
        return _onSubmit({
          value: value,
          touched: touched
        });
      }
    }, _react["default"].createElement(_FormField.FormField, {
      name: "test",
      required: true,
      placeholder: "test input",
      value: "Initial value"
    }), _react["default"].createElement(_FormField.FormField, {
      name: "test2",
      value: "Initial value2"
    }), _react["default"].createElement(_Button.Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByText = _render11.getByText,
        queryByText = _render11.queryByText;

    _react2.fireEvent.click(getByText('Submit'));

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
      var _React$useState5 = _react["default"].useState(),
          test = _React$useState5[0],
          setTest = _React$useState5[1];

      return _react["default"].createElement(_.Form, {
        onSubmit: function onSubmit(_ref2) {
          var value = _ref2.value,
              touched = _ref2.touched;
          return _onSubmit2({
            value: value,
            touched: touched
          });
        }
      }, _react["default"].createElement(_TextInput.TextInput, {
        name: "test",
        value: test
      }), _react["default"].createElement(_Button.Button, {
        label: "set",
        onClick: function onClick() {
          return setTest('a');
        }
      }), _react["default"].createElement(_Button.Button, {
        label: "submit",
        type: "submit"
      }));
    };

    var _render12 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(Test, null))),
        container = _render12.container,
        getByText = _render12.getByText;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('set'));

    _react2.fireEvent.click(getByText('submit'));

    expect(_onSubmit2).toBeCalledWith(expect.objectContaining({
      value: {
        test: 'a'
      }
    }));
  }); // deprecated FormField+input pattern

  test('controlled FormField deprecated', function () {
    var onSubmit = jest.fn();

    var Test = function Test() {
      var _React$useState6 = _react["default"].useState({
        test: ''
      }),
          value = _React$useState6[0],
          setValue = _React$useState6[1];

      var onChange = _react["default"].useCallback(function (nextValue) {
        return setValue(nextValue);
      }, []);

      return _react["default"].createElement(_.Form, {
        value: value,
        onChange: onChange,
        onSubmit: onSubmit
      }, _react["default"].createElement(_FormField.FormField, {
        label: "test",
        name: "test",
        id: "test",
        htmlFor: "test"
      }), _react["default"].createElement(_Button.Button, {
        type: "submit",
        primary: true,
        label: "Submit"
      }));
    };

    var _render13 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(Test, null))),
        getByLabelText = _render13.getByLabelText,
        getByText = _render13.getByText,
        container = _render13.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.change(getByLabelText('test'), {
      target: {
        value: 'v'
      }
    });

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('Submit'));

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