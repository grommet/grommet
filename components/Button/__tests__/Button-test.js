"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _utils = require("../../../utils");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Button renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    label: "Test",
    onClick: function onClick() {}
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button warns about invalid label render', function () {
  var warnSpy = jest.spyOn(console, 'warn');

  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    label: "Test",
    onClick: function onClick() {}
  }, "invalid")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(warnSpy).toHaveBeenCalledWith('Button should not have children if icon or label is provided');
  warnSpy.mockReset();
  warnSpy.mockRestore();
});
test('Button warns about invalid icon render', function () {
  var warnSpy = jest.spyOn(console, 'warn');

  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    icon: _react.default.createElement("svg", null),
    onClick: function onClick() {}
  }, "invalid")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(warnSpy).toHaveBeenCalledWith('Button should not have children if icon or label is provided');
  warnSpy.mockReset();
  warnSpy.mockRestore();
});
test('Button primary renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    primary: true,
    label: "Test",
    onClick: function onClick() {}
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button color renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    color: "accent-1",
    label: "Test",
    onClick: function onClick() {}
  }), _react.default.createElement(_.Button, {
    color: "accent-1",
    primary: true,
    label: "Test",
    onClick: function onClick() {}
  }), _react.default.createElement(_.Button, {
    color: "#111111",
    primary: true,
    label: "Test",
    onClick: function onClick() {}
  }), _react.default.createElement(_.Button, {
    color: "#123",
    primary: true,
    label: "Test",
    onClick: function onClick() {}
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button focus renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    focus: true,
    label: "Test",
    onClick: function onClick() {}
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button disabled renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    disabled: true
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button icon label renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    icon: _react.default.createElement("svg", null),
    label: "Test",
    onClick: function onClick() {}
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button reverse icon label renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    reverse: true,
    icon: _react.default.createElement("svg", null),
    label: "Test",
    onClick: function onClick() {}
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button href renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    href: "test"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button hoverIndicator renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    onClick: function onClick() {},
    hoverIndicator: "background"
  }, "hoverIndicator")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button hoverIndicator as object renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    onClick: function onClick() {},
    hoverIndicator: {
      background: true
    }
  }, "hoverIndicator")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button hoverIndicator as object with color renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    onClick: function onClick() {},
    hoverIndicator: {
      background: 'brand'
    }
  }, "hoverIndicator")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button hoverIndicator as object with colorIndex renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    onClick: function onClick() {},
    hoverIndicator: {
      background: 'accent-1'
    }
  }, "hoverIndicator")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button hoverIndicator as object with invalid color renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    onClick: function onClick() {},
    hoverIndicator: {
      background: 'accent'
    }
  }, "hoverIndicator")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    onClick: function onClick() {},
    hoverIndicator: {
      background: 'invalid'
    }
  }, "hoverIndicator")));
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button hoverIndicator as object with invalid colorIndex renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    onClick: function onClick() {},
    hoverIndicator: {
      background: 'accent-100'
    }
  }, "hoverIndicator")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button is clickable', function () {
  var onClick = jest.fn();

  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
    label: "Test",
    onClick: onClick
  })));

  var tree = component.toJSON();
  var button = (0, _utils.findAllByType)(tree, 'button');
  button[0].props.onClick();
  expect(onClick).toBeCalled();
});