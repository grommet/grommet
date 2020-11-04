"use strict";

exports.__esModule = true;
exports.ShowAfter = exports.ShowBefore = exports.Replace = void 0;

var _react = _interopRequireDefault(require("react"));

var _themes = require("grommet/themes");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var allItems = Array(240).fill().map(function (_, i) {
  return "item " + (i + 1);
});

var Example = function Example(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.InfiniteScroll, _extends({
    items: allItems
  }, props), function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: item,
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, item));
  }));
};

var Replace = function Replace() {
  return /*#__PURE__*/_react["default"].createElement(Example, {
    replace: true
  });
};

exports.Replace = Replace;

var ShowBefore = function ShowBefore() {
  return /*#__PURE__*/_react["default"].createElement(Example, {
    replace: true,
    show: 27
  });
};

exports.ShowBefore = ShowBefore;

var ShowAfter = function ShowAfter() {
  return /*#__PURE__*/_react["default"].createElement(Example, {
    replace: true,
    show: 87
  });
};

exports.ShowAfter = ShowAfter;
Replace.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};
ShowBefore.story = {
  name: 'Replace, show before step',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};
ShowAfter.story = {
  name: 'Replace, show after step',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};