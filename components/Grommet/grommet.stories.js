"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var customTheme = {
  global: {
    colors: {
      custom: '#cc6633'
    }
  }
};

var Themed = function Themed() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: customTheme
  }, _react.default.createElement(_grommet.Box, {
    pad: "medium"
  }, _react.default.createElement(_grommet.Anchor, {
    icon: _react.default.createElement(_grommetIcons.Add, null),
    label: "Add",
    color: "custom"
  })));
};

var Plain = function Plain() {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_grommet.Grommet, {
    plain: true
  }, _react.default.createElement(_grommet.Box, {
    pad: "medium"
  }, _react.default.createElement("p", null, "Plain Grommet"))), _react.default.createElement(_grommet.Grommet, null, _react.default.createElement(_grommet.Box, {
    pad: "medium"
  }, _react.default.createElement("p", null, "Not plain Grommet"))));
};

(0, _react2.storiesOf)('Grommet', module).add('Theme', function () {
  return _react.default.createElement(Themed, null);
}).add('Plain', function () {
  return _react.default.createElement(Plain, null);
});