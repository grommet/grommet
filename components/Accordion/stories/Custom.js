"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CustomAccordionTheme = {
  accordion: {
    heading: {
      level: '3'
    },
    icons: {
      collapse: _grommetIcons.SubtractCircle,
      expand: _grommetIcons.AddCircle,
      color: 'hotpink'
    },
    border: undefined
  }
};

var CustomAccordion = function CustomAccordion(_ref) {
  var animate = _ref.animate,
      multiple = _ref.multiple,
      rest = _objectWithoutPropertiesLoose(_ref, ["animate", "multiple"]);

  return _react.default.createElement(_grommet.Grommet, {
    theme: CustomAccordionTheme
  }, _react.default.createElement(_grommet.Box, _extends({}, rest, {
    pad: "large",
    align: "center",
    justify: "center"
  }), _react.default.createElement(_grommet.Accordion, {
    animate: animate,
    multiple: true
  }, _react.default.createElement(_grommet.AccordionPanel, {
    label: _react.default.createElement(_grommet.Text, {
      size: "large"
    }, "Panel 1 - uses large Text size")
  }, _react.default.createElement(_grommet.Box, {
    background: "light-2",
    height: "small"
  }, "Important Info")), _react.default.createElement(_grommet.AccordionPanel, {
    label: _react.default.createElement(_grommet.Text, {
      size: "xlarge",
      margin: "vertical"
    }, "Panel 2 - uses xlarge Text size")
  }, _react.default.createElement(_grommet.Box, {
    background: "light-2",
    height: "xsmall"
  }, _react.default.createElement(_grommet.Text, {
    size: "small"
  }, "Important Info"))), _react.default.createElement(_grommet.AccordionPanel, {
    label: "Panel 3 - uses custom theme heading level for sizing"
  }, _react.default.createElement(_grommet.Box, {
    background: "light-2",
    height: "xsmall"
  }, _react.default.createElement(_grommet.Text, {
    size: "small"
  }, "Important Info"))))));
};

(0, _react2.storiesOf)('Accordion', module).add('Custom', function () {
  return _react.default.createElement(CustomAccordion, null);
});