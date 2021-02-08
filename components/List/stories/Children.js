"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [{
  city: 'Boise',
  state: 'Idaho'
}, {
  city: 'Fort Collins',
  state: 'Colorado'
}, {
  city: 'Bay Area',
  state: 'California'
}, {
  city: 'San Diego',
  state: 'California'
}];

var Children = function Children() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    height: "100%",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    data: data,
    pad: "medium",
    border: false
  }, function (datum) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Tip, {
      content: datum.state,
      dropProps: {
        align: {
          left: 'right'
        }
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row-responsive",
      gap: "medium",
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Gremlin, {
      size: "large"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold"
    }, datum.city)));
  })));
};

exports.Children = Children;
var _default = {
  title: 'Visualizations/List/Children'
};
exports["default"] = _default;