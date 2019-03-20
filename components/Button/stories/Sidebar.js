"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SidebarButton = function SidebarButton(_ref) {
  var label = _ref.label,
      rest = _objectWithoutPropertiesLoose(_ref, ["label"]);

  return _react.default.createElement(_grommet.Button, _extends({
    plain: true
  }, rest), function (_ref2) {
    var hover = _ref2.hover;
    return _react.default.createElement(_grommet.Box, {
      background: hover ? 'accent-1' : undefined,
      pad: {
        horizontal: 'large',
        vertical: 'medium'
      }
    }, _react.default.createElement(_grommet.Text, {
      size: "large"
    }, label));
  });
};

var SidebarButtons = function SidebarButtons() {
  var _useState = (0, _react.useState)(),
      active = _useState[0],
      setActive = _useState[1];

  return _react.default.createElement(_grommet.Grommet, {
    full: true,
    theme: _grommet.grommet
  }, _react.default.createElement(_grommet.Box, {
    fill: true,
    direction: "row"
  }, _react.default.createElement(_grommet.Box, {
    background: "neutral-1"
  }, ['Dashboard', 'Devices', 'Settings'].map(function (label) {
    return _react.default.createElement(SidebarButton, {
      key: label,
      label: label,
      active: label === active,
      onClick: function onClick() {
        return setActive(label);
      }
    });
  }))));
};

(0, _react2.storiesOf)('Button', module).add('Sidebar', function () {
  return _react.default.createElement(SidebarButtons, null);
});