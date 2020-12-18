"use strict";

exports.__esModule = true;
exports.HeightReplace = exports.Height = void 0;

var _react = _interopRequireDefault(require("react"));

var _themes = require("grommet/themes");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var allItems = Array(240).fill().map(function (_, i) {
  return i + 1;
});

var Example = function Example(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.InfiniteScroll, _extends({
    items: allItems
  }, props), function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: item,
      height: item <= 25 ? 'xsmall' : 'xxsmall',
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "item ", item));
  })));
};

var Height = function Height() {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
};

exports.Height = Height;

var HeightReplace = function HeightReplace() {
  return /*#__PURE__*/_react["default"].createElement(Example, {
    replace: true
  });
};

exports.HeightReplace = HeightReplace;
Height.story = {
  name: 'Variable item height',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};
HeightReplace.story = {
  name: 'Variable item height w/replace',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};