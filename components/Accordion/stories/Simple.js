"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SimpleAccordion = function SimpleAccordion(props) {
  var animate = props.animate,
      multiple = props.multiple,
      rest = _objectWithoutPropertiesLoose(props, ["animate", "multiple"]);

  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, rest, _react.default.createElement(_grommet.Accordion, {
    animate: animate,
    multiple: multiple
  }, _react.default.createElement(_grommet.AccordionPanel, {
    label: "Panel 1"
  }, _react.default.createElement(_grommet.Box, {
    background: "light-2",
    overflow: "auto",
    height: "medium"
  }, _react.default.createElement(_grommet.Box, {
    height: "large",
    flex: false
  }, "Panel 1 contents"))), _react.default.createElement(_grommet.AccordionPanel, {
    label: "Panel 2"
  }, _react.default.createElement(_grommet.Box, {
    background: "light-2",
    style: {
      height: '50px'
    }
  }, "Panel 2 contents")), _react.default.createElement(_grommet.AccordionPanel, {
    label: "Panel 3"
  }, _react.default.createElement(_grommet.Box, {
    background: "light-2",
    style: {
      height: '300px'
    }
  }, "Panel 3 contents")))));
};

(0, _react2.storiesOf)('Accordion', module).add('Simple', function () {
  return _react.default.createElement(SimpleAccordion, null);
}).add('Dark no animation', function () {
  return _react.default.createElement(SimpleAccordion, {
    animate: false,
    background: "dark-2"
  });
}).add('Multiple', function () {
  return _react.default.createElement(SimpleAccordion, {
    multiple: true
  });
});