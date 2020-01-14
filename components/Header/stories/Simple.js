"use strict";

exports.__esModule = true;
exports.Avatar = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Avatar = function Avatar(_ref) {
  var rest = _extends({}, _ref);

  return _react["default"].createElement(_grommet.Box, _extends({
    height: "xxsmall",
    width: "xxsmall",
    round: "full" // eslint-disable-next-line max-len
    ,
    background: "url(//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80)"
  }, rest));
};

exports.Avatar = Avatar;

var Simple = function Simple() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Header, {
    background: "light-4",
    pad: "small"
  }, _react["default"].createElement(Avatar, null), _react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "medium"
  }, _react["default"].createElement(_grommet.Anchor, {
    label: "Home",
    href: "#"
  }), _react["default"].createElement(_grommet.Anchor, {
    label: "Profile",
    href: "#"
  }))));
};

(0, _react2.storiesOf)('Header', module).add('Simple', function () {
  return _react["default"].createElement(Simple, null);
});