"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _grommetThemeHpeNext = require("grommet-theme-hpe-next");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var theme = (0, _utils.deepMerge)(_grommetThemeHpeNext.hpe, {
  accordion: {
    border: undefined,
    heading: {
      margin: {
        vertical: 'medium',
        horizontal: 'xsmall'
      }
    },
    hover: {
      color: undefined
    },
    panel: {
      border: {
        side: 'horizontal'
      }
    }
  }
});

var AccordionExample = function AccordionExample() {
  var pad = 'small';
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Accordion, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: "Our Company"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: pad
  }, "We are HPE.")), /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: "Our History"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: pad
  }, "At Hewlett Packard Enterprise, we advance the way you live and work by engineering experiences that unlock your full potential.")), /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: "Our Purpose"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: pad
  }, "We advance the way you live and work by engineering experiences that unlock your full potential.")), /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: "What's New"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: pad
  }, "We make Bold Moves."))));
};

(0, _react2.storiesOf)('Accordion', module).add('Themed', function () {
  return /*#__PURE__*/_react["default"].createElement(AccordionExample, null);
});