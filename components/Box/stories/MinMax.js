"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("../../../themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MinMaxSizesBox = function MinMaxSizesBox() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    gap: "small",
    direction: "row",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "small",
    height: {
      max: 'small'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "max-height=small")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "small",
    height: {
      max: 'small'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "max-height=small"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "max-height=small"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "max-height=small")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "small",
    height: {
      max: 'small'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, Array(20).fill().map(function (_, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement(_grommet.Text, {
        key: i
      }, "Small (" + i + ")")
    );
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "small",
    height: {
      max: '100px'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, Array(20).fill().map(function (_, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement(_grommet.Text, {
        key: i
      }, "Small (" + i + ")")
    );
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    gap: "small",
    direction: "row",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "small",
    height: {
      min: '100px'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "min-height=100px")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "small",
    height: {
      min: 'small'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "min-height=small")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "small",
    height: {
      min: 'small'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "min-height=small"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "min-height=small"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "min-height=small")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "small",
    height: {
      min: 'small'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, Array(20).fill().map(function (_, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement(_grommet.Text, {
        key: i
      }, "Small (" + i + ")")
    );
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    gap: "small",
    direction: "row",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: {
      max: 'small'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "max")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: {
      max: 'small'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "max-width=small")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: {
      max: 'small'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "max-width=small, max-width=small")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: {
      max: '100px'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "max-width=100px, max-width=100px"))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    gap: "small",
    direction: "row",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: {
      min: '100px'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "100px")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: {
      min: 'small'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "small")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: {
      min: 'small'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "min-width=small")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: {
      min: 'small'
    },
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "min-width=small, min-width=small")))));
};

(0, _react2.storiesOf)('Box', module).add('Min/Max sizes', function () {
  return /*#__PURE__*/_react["default"].createElement(MinMaxSizesBox, null);
});