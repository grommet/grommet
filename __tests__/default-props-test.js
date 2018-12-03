"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

require("jest-styled-components");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomBox = _styledComponents.default.div.withConfig({
  displayName: "default-props-test__CustomBox",
  componentId: "sc-9t2l2e-0"
})(["background:", ";"], function (props) {
  return props.theme.global.colors.brand;
});

CustomBox.defaultProps = {};
Object.setPrototypeOf(CustomBox.defaultProps, _.defaultProps);
test('default theme is used', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Box, {
    background: "brand"
  }));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('extends default theme', function () {
  (0, _.extendDefaultTheme)({
    global: {
      colors: {
        brand: 'red'
      }
    }
  });

  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Box, {
    background: "brand"
  }));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('extends default theme twice', function () {
  (0, _.extendDefaultTheme)({
    global: {
      colors: {
        brand: 'red'
      }
    }
  });

  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Box, {
    background: "brand"
  }));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  (0, _.extendDefaultTheme)({
    global: {
      colors: {
        brand: 'blue'
      }
    }
  });
  component = _reactTestRenderer.default.create(_react.default.createElement(_.Box, {
    background: "brand"
  }));
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('uses Grommet theme instead of default', function () {
  (0, _.extendDefaultTheme)({
    global: {
      colors: {
        brand: 'red'
      }
    }
  });

  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, {
    theme: _.grommet
  }, _react.default.createElement(_.Box, {
    background: "brand"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('leverages default theme', function () {
  (0, _.extendDefaultTheme)({
    global: {
      colors: {
        brand: 'red'
      }
    }
  });

  var component = _reactTestRenderer.default.create(_react.default.createElement(CustomBox, null));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});