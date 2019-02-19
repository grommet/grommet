"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _utils = require("../../../utils");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Button', function () {
  test('basic', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      label: "Test",
      onClick: function onClick() {}
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('children function', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      onClick: function onClick() {}
    }, function () {
      return _react.default.createElement(_.Text, null, "Test");
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('warns about invalid label', function () {
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
  test('warns about invalid icon', function () {
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
  test('primary', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      primary: true,
      label: "Test",
      onClick: function onClick() {}
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('color', function () {
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
  test('focus', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      focus: true,
      label: "Test",
      onClick: function onClick() {}
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('disabled', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      disabled: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('icon label', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      icon: _react.default.createElement("svg", null),
      label: "Test",
      onClick: function onClick() {}
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('reverse icon label', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      reverse: true,
      icon: _react.default.createElement("svg", null),
      label: "Test",
      onClick: function onClick() {}
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('href', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      href: "test"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator background', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      onClick: function onClick() {},
      hoverIndicator: "background"
    }, "hoverIndicator")));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        background: true
      }
    }, "hoverIndicator")));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object with color', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        background: 'brand'
      }
    }, "hoverIndicator")));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object with colorIndex', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        background: 'accent-1'
      }
    }, "hoverIndicator")));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object with invalid color', function () {
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
  test('hoverIndicator as object with invalid colorIndex', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        background: 'accent-100'
      }
    }, "hoverIndicator")));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator color', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      onClick: function onClick() {},
      hoverIndicator: "dark-3"
    }, "hoverIndicator")));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('onClick', function () {
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
  test('as', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Button, {
      as: "span"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});