"use strict";

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var RANGE_MIN = 0;
var RANGE_MAX = 100;

function Thin(_ref) {
  var _ref$initialRange = _ref.initialRange,
      initialRange = _ref$initialRange === void 0 ? [0, 100] : _ref$initialRange,
      label = _ref.label;

  var _useState = (0, _react.useState)(initialRange),
      range = _useState[0],
      setRange = _useState[1];

  return _react.default.createElement(_grommet.Box, {
    gap: "small",
    pad: "xlarge"
  }, label ? _react.default.createElement(_grommet.Text, null, label) : null, _react.default.createElement(_grommet.Stack, null, _react.default.createElement(_grommet.Box, {
    background: "light-4",
    height: "6px",
    direction: "row"
  }), _react.default.createElement(_grommet.RangeSelector, {
    direction: "horizontal",
    min: RANGE_MIN,
    max: RANGE_MAX,
    step: 1,
    values: range,
    onChange: function onChange(nextRange) {
      setRange(nextRange);
    }
  })), _react.default.createElement(_grommet.Box, {
    align: "center"
  }, _react.default.createElement(_grommet.Text, {
    size: "small"
  }, range[0] + "% - " + range[1] + "%")));
}

function App() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    pad: "small"
  }, _react.default.createElement(Thin, {
    label: "My Range Selector"
  })));
}

(0, _reactDom.render)(_react.default.createElement(App, null), document.getElementById('root'));
(0, _react2.storiesOf)('RangeSelector', module).add('Thin', function () {
  return _react.default.createElement(App, null);
});