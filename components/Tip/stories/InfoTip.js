"use strict";

exports.__esModule = true;
exports.Info = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Info = function Info() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    background: "background-back",
    gap: "large",
    pad: "large",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tip, {
    content: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "small",
      gap: "small",
      width: {
        max: 'small'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold"
    }, "Information"), /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "A battle is won by him who is firmly resolved to win it."), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "-Leo Tolstoy"))),
    dropProps: {
      align: {
        left: 'right'
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.CircleInformation, {
      size: "large"
    })
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Tip, {
    plain: true,
    content: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "small",
      gap: "small",
      width: {
        max: 'small'
      },
      round: "small",
      background: "background-front",
      responsive: false
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold"
    }, "Help"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "Help is on the way! Who are you going to call?")),
    dropProps: {
      align: {
        left: 'right'
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.HelpOption, {
      size: "large"
    })
  }))));
};

exports.Info = Info;
Info.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};