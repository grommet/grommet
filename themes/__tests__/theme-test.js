"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _grommetThemeHpe = require("grommet-theme-hpe");

var _grommetIcons = require("grommet-icons");

var _components = require("../../components");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colors = ['accent-1', 'accent-2', 'accent-3', 'brand', 'dark-1', 'dark-2', 'dark-3', 'dark-4', 'dark-5', 'focus', 'light-1', 'light-2', 'light-3', 'light-4', 'light-5', 'neutral-1', 'neutral-2', 'neutral-3', 'status-critical', 'status-disabled', 'status-ok', 'status-unknown', 'status-warning'];
var customTheme = {
  global: {
    colors: {
      custom: '#cc6633'
    }
  }
};
describe('Grommet', function () {
  test('default theme', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_components.Grommet, null, colors.map(function (color) {
      return _react.default.createElement(_components.Box, {
        key: color,
        background: color
      }, _react.default.createElement(_components.Text, null, color));
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('dark theme', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_components.Grommet, {
      theme: _.dark
    }, colors.map(function (color) {
      return _react.default.createElement(_components.Box, {
        key: color,
        background: color
      }, _react.default.createElement(_components.Text, null, color));
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hpe theme', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_components.Grommet, {
      theme: _grommetThemeHpe.hpe
    }, colors.map(function (color) {
      return _react.default.createElement(_components.Box, {
        key: color,
        background: color
      }, _react.default.createElement(_components.Text, null, color));
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('custom theme', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_components.Grommet, {
      theme: customTheme
    }, _react.default.createElement(_components.Box, null, _react.default.createElement(_components.Anchor, {
      icon: _react.default.createElement(_grommetIcons.Add, null),
      label: "Add"
    }), _react.default.createElement(_components.Anchor, {
      icon: _react.default.createElement(_grommetIcons.Add, null),
      label: "Add",
      color: "custom"
    })), _react.default.createElement(_components.Box, {
      background: "dark-1"
    }, _react.default.createElement(_components.Anchor, {
      icon: _react.default.createElement(_grommetIcons.Add, null),
      label: "Add"
    }), _react.default.createElement(_components.Anchor, {
      icon: _react.default.createElement(_grommetIcons.Add, null),
      label: "Add",
      color: "custom"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});