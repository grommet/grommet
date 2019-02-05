"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

var _FormField = require("../../FormField");

var _Button = require("../../Button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Form', function () {
  afterEach(_reactTestingLibrary.cleanup);
  test('empty', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Form, null)));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('with field', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Form, null, _react.default.createElement(_FormField.FormField, {
      name: "test"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('update', function () {
    var validate = jest.fn().mockReturnValueOnce('too short').mockReturnValueOnce(undefined);
    var onSubmit = jest.fn();

    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Form, {
      onSubmit: onSubmit
    }, _react.default.createElement(_FormField.FormField, {
      name: "test",
      required: true,
      validate: validate,
      placeholder: "test input"
    }), _react.default.createElement(_FormField.FormField, {
      name: "test2",
      placeholder: "test-2 input"
    }), _react.default.createElement(_Button.Button, {
      type: "submit",
      primary: true,
      label: "Submit"
    })))),
        getByPlaceholderText = _render.getByPlaceholderText,
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'v'
      }
    });

    _reactTestingLibrary.fireEvent.click(getByText('Submit'));

    expect(validate).toBeCalledWith('v', {
      test: 'v'
    });

    _reactTestingLibrary.fireEvent.change(getByPlaceholderText('test input'), {
      target: {
        value: 'value'
      }
    });

    _reactTestingLibrary.fireEvent.change(getByPlaceholderText('test-2 input'), {
      target: {
        value: 'value-2'
      }
    });

    _reactTestingLibrary.fireEvent.click(getByText('Submit'));

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
});