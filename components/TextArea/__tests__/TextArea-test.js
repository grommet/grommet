"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _react2 = require("@testing-library/react");

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('TextArea', function () {
  test('basic', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.TextArea, {
      id: "item",
      name: "item"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('placeholder', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.TextArea, {
      id: "item",
      name: "item",
      placeholder: "placeholder"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('plain', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.TextArea, {
      id: "item",
      name: "item",
      plain: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('disabled', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.TextArea, {
      disabled: true,
      id: "item",
      name: "item",
      plain: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('focusIndicator', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.TextArea, {
      id: "item",
      name: "item",
      focusIndicator: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.TextArea, {
      id: "item",
      name: "item",
      fill: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  [true, false, 'horizontal', 'vertical'].forEach(function (resize) {
    test("resize " + resize, function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.TextArea, {
        id: "item",
        name: "item",
        resize: resize
      })));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  ['small', 'medium', 'large'].forEach(function (size) {
    test("size " + size, function () {
      var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.TextArea, {
        id: "item",
        name: "item",
        size: size
      })));

      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('Event tests', function () {
    afterEach(_react2.cleanup);
    var keyEvent = {
      key: 'Backspace',
      keyCode: 8,
      which: 8
    };
    test("onKeyDown", function () {
      var capturedEvent = null;

      var callback = function callback(event) {
        var key = event.key,
            keyCode = event.keyCode,
            which = event.which;
        capturedEvent = {
          key: key,
          keyCode: keyCode,
          which: which
        };
      };

      var component = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.TextArea, {
        id: "item",
        name: "item",
        placeholder: "item",
        onKeyDown: callback
      })));
      var textArea = component.getByPlaceholderText('item');

      _react2.fireEvent.keyDown(textArea, keyEvent);

      expect(capturedEvent).toEqual(expect.objectContaining(keyEvent));
    });
    test("onKeyUp", function () {
      var capturedEvent = null;

      var callback = function callback(event) {
        var key = event.key,
            keyCode = event.keyCode,
            which = event.which;
        capturedEvent = {
          key: key,
          keyCode: keyCode,
          which: which
        };
      };

      var component = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.TextArea, {
        id: "item",
        name: "item",
        placeholder: "item",
        onKeyUp: callback
      })));
      var textArea = component.getByPlaceholderText('item');

      _react2.fireEvent.keyUp(textArea, keyEvent);

      expect(capturedEvent).toEqual(expect.objectContaining(keyEvent));
    });
  });
});