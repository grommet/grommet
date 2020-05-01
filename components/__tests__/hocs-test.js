"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _utils = require("../../utils");

var _hocs = require("../hocs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var TestDiv = _react["default"].forwardRef(function (_ref, ref) {
  var focus = _ref.focus,
      rest = _objectWithoutPropertiesLoose(_ref, ["focus"]);

  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: ref
  }, rest), focus ? 'focus' : 'no focus');
});

var Test = (0, _hocs.withFocus)()(TestDiv);
test('withFocus set focus', function (done) {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Test, null));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  var container = (0, _utils.findAllByType)(tree, 'div');
  container[0].props.onFocus();
  setTimeout(function () {
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  }, 50);
});
test('withFocus calls callback', function () {
  var onFocus = jest.fn();
  var onBlur = jest.fn();

  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(Test, {
    onFocus: onFocus,
    onBlur: onBlur
  }));

  var tree = component.toJSON();
  var container = (0, _utils.findAllByType)(tree, 'div');
  container[0].props.onFocus();
  container[0].props.onBlur();
  expect(onFocus).toBeCalled();
  expect(onBlur).toBeCalled();
});