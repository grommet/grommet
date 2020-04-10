"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _react2 = require("@testing-library/react");

require("jest-styled-components");

var _grommetIcons = require("grommet-icons");

var _utils = require("../../../utils");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Button', function () {
  afterEach(_react2.cleanup);
  test('basic', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      label: "Test",
      onClick: function onClick() {}
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('children function', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      onClick: function onClick() {}
    }, function () {
      return _react["default"].createElement(_.Text, null, "Test");
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('warns about invalid label', function () {
    var warnSpy = jest.spyOn(console, 'warn');

    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
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

    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      icon: _react["default"].createElement("svg", null),
      onClick: function onClick() {}
    }, "invalid")));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith('Button should not have children if icon or label is provided');
    warnSpy.mockReset();
    warnSpy.mockRestore();
  });
  test('primary', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      primary: true,
      label: "Test",
      onClick: function onClick() {}
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('color', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      color: "accent-1",
      label: "Test",
      onClick: function onClick() {}
    }), _react["default"].createElement(_.Button, {
      color: "accent-1",
      primary: true,
      label: "Test",
      onClick: function onClick() {}
    }), _react["default"].createElement(_.Button, {
      color: "#111111",
      primary: true,
      label: "Test",
      onClick: function onClick() {}
    }), _react["default"].createElement(_.Button, {
      color: "#123",
      primary: true,
      label: "Test",
      onClick: function onClick() {}
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, null, _react["default"].createElement(_.Button, {
      fill: true
    }), _react["default"].createElement(_.Button, {
      fill: false
    }), _react["default"].createElement(_.Button, {
      fill: "horizontal"
    }), _react["default"].createElement(_.Button, {
      fill: "vertical"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('focus', function () {
    var _render = (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      label: "Test",
      onClick: function onClick() {}
    }))),
        container = _render.container,
        getByText = _render.getByText;

    _react2.fireEvent.focus(getByText('Test'));

    expect(container.firstChild).toMatchSnapshot();
  });
  test('disabled', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      disabled: true
    }), _react["default"].createElement(_.Button, {
      disabled: true,
      primary: true,
      label: "Button"
    }), _react["default"].createElement(_.Button, {
      disabled: true,
      label: "Button"
    }), _react["default"].createElement(_.Button, {
      disabled: true,
      icon: _react["default"].createElement("svg", null)
    }), _react["default"].createElement(_.Button, {
      disabled: true,
      icon: _react["default"].createElement("svg", null),
      label: "Button"
    }), _react["default"].createElement(_.Button, {
      disabled: true,
      icon: _react["default"].createElement("svg", null),
      label: "Button",
      primary: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('active', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      active: true,
      label: "Button"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('active + primary', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      active: true,
      primary: true,
      label: "Button"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('icon label', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      icon: _react["default"].createElement("svg", null),
      label: "Test",
      onClick: function onClick() {}
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('reverse icon label', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      reverse: true,
      icon: _react["default"].createElement("svg", null),
      label: "Test",
      onClick: function onClick() {}
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('href', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      href: "test"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator background', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      onClick: function onClick() {},
      hoverIndicator: "background"
    }, "hoverIndicator")));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object with color', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        color: 'brand'
      }
    }, "hoverIndicator")));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object with invalid color', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        color: 'invalid'
      }
    }, "hoverIndicator")));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator color', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      onClick: function onClick() {},
      hoverIndicator: "dark-3"
    }, "hoverIndicator")));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('onClick', function () {
    var onClick = jest.fn();

    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      label: "Test",
      onClick: onClick
    })));

    var tree = component.toJSON();
    var button = (0, _utils.findAllByType)(tree, 'button');
    button[0].props.onClick();
    expect(onClick).toBeCalled();
  });
  test('size', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      size: "small",
      label: "Small"
    }), _react["default"].createElement(_.Button, {
      size: "medium",
      label: "Medium"
    }), _react["default"].createElement(_.Button, {
      label: "Default"
    }), _react["default"].createElement(_.Button, {
      size: "large",
      label: "Large"
    }), _react["default"].createElement(_.Button, {
      primary: true,
      size: "small",
      label: "Small"
    }), _react["default"].createElement(_.Button, {
      primary: true,
      size: "medium",
      label: "Medium"
    }), _react["default"].createElement(_.Button, {
      primary: true,
      label: "Default"
    }), _react["default"].createElement(_.Button, {
      primary: true,
      size: "large",
      label: "Large"
    }), _react["default"].createElement(_.Button, {
      size: "small",
      icon: _react["default"].createElement(_grommetIcons.Add, null),
      primary: true
    }), _react["default"].createElement(_.Button, {
      size: "medium",
      icon: _react["default"].createElement(_grommetIcons.Add, null),
      primary: true
    }), _react["default"].createElement(_.Button, {
      icon: _react["default"].createElement(_grommetIcons.Add, null),
      primary: true
    }), _react["default"].createElement(_.Button, {
      size: "large",
      icon: _react["default"].createElement(_grommetIcons.Add, null),
      primary: true
    }), _react["default"].createElement(_.Button, {
      size: "small",
      label: "Small",
      icon: _react["default"].createElement(_grommetIcons.Next, null),
      reverse: true
    }), _react["default"].createElement(_.Button, {
      size: "medium",
      label: "Medium",
      icon: _react["default"].createElement(_grommetIcons.Next, null),
      reverse: true
    }), _react["default"].createElement(_.Button, {
      label: "Default",
      icon: _react["default"].createElement(_grommetIcons.Next, null),
      reverse: true
    }), _react["default"].createElement(_.Button, {
      size: "large",
      label: "Large",
      icon: _react["default"].createElement(_grommetIcons.Next, null),
      reverse: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('as', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Button, {
      as: "span"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});