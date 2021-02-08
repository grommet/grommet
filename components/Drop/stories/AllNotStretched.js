"use strict";

exports.__esModule = true;
exports["default"] = exports.AllNotStretched = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var OneDrop = function OneDrop(_ref) {
  var align = _ref.align,
      target = _ref.target;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    align: align,
    target: target,
    stretch: false
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }));
};

OneDrop.propTypes = {
  align: _propTypes["default"].shape({}).isRequired,
  target: _propTypes["default"].shape({}).isRequired
};

var Set = function Set(_ref2) {
  var aligns = _ref2.aligns,
      label = _ref2.label;

  var _React$useState = _react["default"].useState(),
      target = _React$useState[0],
      setTarget = _React$useState[1];

  var targetRef = _react["default"].useCallback(setTarget, []);

  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, label), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "xlarge",
    background: "dark-3",
    pad: {
      horizontal: 'large',
      vertical: 'medium'
    },
    align: "center",
    justify: "center",
    ref: targetRef
  }, "\xA0"), target && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, aligns.map(function (align, index) {
    return /*#__PURE__*/_react["default"].createElement(OneDrop // eslint-disable-next-line react/no-array-index-key
    , {
      key: index,
      align: align,
      target: target
    });
  })));
};

Set.propTypes = {
  aligns: _propTypes["default"].arrayOf(_propTypes["default"].shape({})).isRequired,
  label: _propTypes["default"].string.isRequired
};

var AllDrops = function AllDrops() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Extend, {
    value: {
      global: {
        drop: {
          background: {
            color: 'white',
            opacity: 'medium'
          }
        }
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    wrap: true,
    pad: "large",
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(Set, {
    label: "left: left",
    aligns: [{
      top: 'top',
      left: 'left'
    }, {
      top: 'bottom',
      left: 'left'
    }, {
      bottom: 'top',
      left: 'left'
    }, {
      bottom: 'bottom',
      left: 'left'
    }]
  }), /*#__PURE__*/_react["default"].createElement(Set, {
    label: "left: right",
    aligns: [{
      top: 'top',
      left: 'right'
    }, {
      top: 'bottom',
      left: 'right'
    }, {
      bottom: 'top',
      left: 'right'
    }, {
      bottom: 'bottom',
      left: 'right'
    }]
  }), /*#__PURE__*/_react["default"].createElement(Set, {
    label: "(center horizontal)",
    aligns: [{
      top: 'top'
    }, {
      top: 'bottom'
    }, {
      bottom: 'top'
    }, {
      bottom: 'bottom'
    }]
  }), /*#__PURE__*/_react["default"].createElement(Set, {
    label: "right: left",
    aligns: [{
      top: 'top',
      right: 'left'
    }, {
      top: 'bottom',
      right: 'left'
    }, {
      bottom: 'top',
      right: 'left'
    }, {
      bottom: 'bottom',
      right: 'left'
    }]
  }), /*#__PURE__*/_react["default"].createElement(Set, {
    label: "right: right",
    aligns: [{
      top: 'top',
      right: 'right'
    }, {
      top: 'bottom',
      right: 'right'
    }, {
      bottom: 'top',
      right: 'right'
    }, {
      bottom: 'bottom',
      right: 'right'
    }]
  }), /*#__PURE__*/_react["default"].createElement(Set, {
    label: "top: top",
    aligns: [{
      left: 'left',
      top: 'top'
    }, {
      left: 'right',
      top: 'top'
    }, {
      right: 'left',
      top: 'top'
    }, {
      right: 'right',
      top: 'top'
    }]
  }), /*#__PURE__*/_react["default"].createElement(Set, {
    label: "top: bottom",
    aligns: [{
      left: 'left',
      top: 'bottom'
    }, {
      left: 'right',
      top: 'bottom'
    }, {
      right: 'left',
      top: 'bottom'
    }, {
      right: 'right',
      top: 'bottom'
    }]
  }), /*#__PURE__*/_react["default"].createElement(Set, {
    label: "(center vertical)",
    aligns: [{
      left: 'left'
    }, {
      left: 'right'
    }, {
      right: 'left'
    }, {
      right: 'right'
    }]
  }), /*#__PURE__*/_react["default"].createElement(Set, {
    label: "bottom: top",
    aligns: [{
      left: 'left',
      bottom: 'top'
    }, {
      left: 'right',
      bottom: 'top'
    }, {
      right: 'left',
      bottom: 'top'
    }, {
      right: 'right',
      bottom: 'top'
    }]
  }), /*#__PURE__*/_react["default"].createElement(Set, {
    label: "bottom: bottom",
    aligns: [{
      left: 'left',
      bottom: 'bottom'
    }, {
      left: 'right',
      bottom: 'bottom'
    }, {
      right: 'left',
      bottom: 'bottom'
    }, {
      right: 'right',
      bottom: 'bottom'
    }]
  }), /*#__PURE__*/_react["default"].createElement(Set, {
    label: "(center vertical and horizontal)",
    aligns: [{}]
  }))));
};

var AllNotStretched = function AllNotStretched() {
  return /*#__PURE__*/_react["default"].createElement(AllDrops, null);
};

exports.AllNotStretched = AllNotStretched;
AllNotStretched.storyName = 'All not stretched';
var _default = {
  title: 'Controls/Drop/All not stretched'
};
exports["default"] = _default;