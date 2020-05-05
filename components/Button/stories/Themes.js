"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _grommetThemeHpe = require("grommet-theme-hpe");

var _grommetThemeHpeNext = require("grommet-theme-hpe-next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var themes = [{
  name: 'grommet',
  theme: _grommet.grommet
}, {
  name: 'hpe',
  theme: _grommetThemeHpe.hpe
}, {
  name: 'hpe next',
  theme: _grommetThemeHpeNext.hpe
}];
var darks = [false, true];
var kinds = [{
  name: 'default',
  props: {}
}, {
  name: 'primary',
  props: {
    primary: true
  }
}];
var states = [{}, {
  active: true
}, {
  disabled: true
}, {
  color: 'teal'
}, {
  color: '#9999ff'
}, {
  color: '#333399'
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
  children: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "label"))
}];

var Example = function Example() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    gap: "large"
  }, themes.map(function (_ref) {
    var name = _ref.name,
        theme = _ref.theme;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
      theme: theme
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 2,
      size: "small",
      margin: "none"
    }, name), kinds.map(function (kind) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        key: kind.name,
        flex: false
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
        level: 3,
        size: "small"
      }, kind.name), states.map(function (state) {
        return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
          direction: "row",
          align: "center"
        }, darks.map(function (dark) {
          return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
            key: dark,
            direction: dark ? 'row-reverse' : 'row',
            align: "center",
            gap: "small",
            background: {
              color: 'background',
              dark: dark
            },
            pad: "small"
          }, contents.map(function (content, index) {
            return /*#__PURE__*/_react["default"].createElement(_grommet.Button // eslint-disable-next-line react/no-array-index-key
            , _extends({
              key: index
            }, kind.props, content, state));
          }));
        }));
      }));
    })));
  }));
};

(0, _react2.storiesOf)('Button', module).add('Themes', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
});