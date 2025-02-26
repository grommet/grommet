"use strict";

exports.__esModule = true;
exports["default"] = exports.Kind = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
var _useThemeValue2 = require("../../../utils/useThemeValue");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var darks = [false, true];
var kinds = [{
  name: 'default',
  props: {}
}, {
  name: 'primary',
  props: {
    primary: true
  }
}, {
  name: 'secondary',
  props: {
    secondary: true
  }
}];
var states = [{}, {
  active: true
}, {
  disabled: true
}, {
  hoverIndicator: 'teal'
}];
var contents = [{
  icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null)
}, {
  label: 'label'
}, {
  icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null),
  label: 'label'
}, {
  plain: true,
  children: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "label"))
}];
var Kind = exports.Kind = function Kind() {
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "medium"
  }, kinds.map(function (kind) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: kind.name,
      flex: false
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 3,
      size: "small"
    }, kind.name), states.map(function (state, index) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        _react["default"].createElement(_grommet.Box, {
          key: index,
          direction: "row",
          align: "center"
        }, darks.map(function (dark) {
          var backgroundFallback = dark ? 'black' : 'white';
          return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
            key: dark,
            direction: dark ? 'row-reverse' : 'row',
            align: "center",
            gap: "small",
            background: {
              color: theme.global.colors.background ? 'background' : backgroundFallback,
              dark: dark
            },
            pad: "small"
          }, contents.map(function (content, index2) {
            return /*#__PURE__*/_react["default"].createElement(_grommet.Button
            // eslint-disable-next-line react/no-array-index-key
            , _extends({
              key: index2
            }, kind.props, content, state));
          }));
        }))
      );
    }));
  })));
};
var _default = exports["default"] = {
  title: 'Controls/Button/Kind'
};