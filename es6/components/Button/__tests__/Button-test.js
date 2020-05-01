import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import { Add } from "grommet-icons/es6/icons/Add";
import { Next } from "grommet-icons/es6/icons/Next";
import { findAllByType } from '../../../utils';
import { Grommet, Button, Text } from '../..';
describe('Button', function () {
  afterEach(cleanup);
  test('basic', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      label: "Test",
      onClick: function onClick() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('children function', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      onClick: function onClick() {}
    }, function () {
      return /*#__PURE__*/React.createElement(Text, null, "Test");
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('warns about invalid label', function () {
    var warnSpy = jest.spyOn(console, 'warn');
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
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
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement("svg", null),
      onClick: function onClick() {}
    }, "invalid")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith('Button should not have children if icon or label is provided');
    warnSpy.mockReset();
    warnSpy.mockRestore();
  });
  test('primary', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      primary: true,
      label: "Test",
      onClick: function onClick() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('color', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      color: "accent-1",
      label: "Test",
      onClick: function onClick() {}
    }), /*#__PURE__*/React.createElement(Button, {
      color: "accent-1",
      primary: true,
      label: "Test",
      onClick: function onClick() {}
    }), /*#__PURE__*/React.createElement(Button, {
      color: "#111111",
      primary: true,
      label: "Test",
      onClick: function onClick() {}
    }), /*#__PURE__*/React.createElement(Button, {
      color: "#123",
      primary: true,
      label: "Test",
      onClick: function onClick() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, null, /*#__PURE__*/React.createElement(Button, {
      fill: true
    }), /*#__PURE__*/React.createElement(Button, {
      fill: false
    }), /*#__PURE__*/React.createElement(Button, {
      fill: "horizontal"
    }), /*#__PURE__*/React.createElement(Button, {
      fill: "vertical"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('focus', function () {
    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      label: "Test",
      onClick: function onClick() {}
    }))),
        container = _render.container,
        getByText = _render.getByText;

    fireEvent.focus(getByText('Test'));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('disabled', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      disabled: true
    }), /*#__PURE__*/React.createElement(Button, {
      disabled: true,
      primary: true,
      label: "Button"
    }), /*#__PURE__*/React.createElement(Button, {
      disabled: true,
      label: "Button"
    }), /*#__PURE__*/React.createElement(Button, {
      disabled: true,
      plain: true,
      label: "Button"
    }), /*#__PURE__*/React.createElement(Button, {
      disabled: true,
      plain: false,
      label: "Button"
    }), /*#__PURE__*/React.createElement(Button, {
      disabled: true,
      icon: /*#__PURE__*/React.createElement("svg", null)
    }), /*#__PURE__*/React.createElement(Button, {
      disabled: true,
      icon: /*#__PURE__*/React.createElement("svg", null),
      plain: true
    }), /*#__PURE__*/React.createElement(Button, {
      disabled: true,
      icon: /*#__PURE__*/React.createElement("svg", null),
      plain: false
    }), /*#__PURE__*/React.createElement(Button, {
      disabled: true,
      icon: /*#__PURE__*/React.createElement("svg", null),
      label: "Button"
    }), /*#__PURE__*/React.createElement(Button, {
      disabled: true,
      icon: /*#__PURE__*/React.createElement("svg", null),
      label: "Button",
      plain: true
    }), /*#__PURE__*/React.createElement(Button, {
      disabled: true,
      icon: /*#__PURE__*/React.createElement("svg", null),
      label: "Button",
      primary: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('active', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      active: true,
      label: "Button"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('active + primary', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      active: true,
      primary: true,
      label: "Button"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('icon label', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement("svg", null),
      label: "Test",
      onClick: function onClick() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('reverse icon label', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      reverse: true,
      icon: /*#__PURE__*/React.createElement("svg", null),
      label: "Test",
      onClick: function onClick() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('href', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      href: "test"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator background', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: "background"
    }, "hoverIndicator")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object with color', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        color: 'brand'
      }
    }, "hoverIndicator")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object with invalid color', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        color: 'invalid'
      }
    }, "hoverIndicator")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator color', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: "dark-3"
    }, "hoverIndicator")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('onClick', function () {
    var onClick = jest.fn();
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      label: "Test",
      onClick: onClick
    })));
    var tree = component.toJSON();
    var button = findAllByType(tree, 'button');
    button[0].props.onClick();
    expect(onClick).toBeCalled();
  });
  test('size', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      size: "small",
      label: "Small"
    }), /*#__PURE__*/React.createElement(Button, {
      size: "medium",
      label: "Medium"
    }), /*#__PURE__*/React.createElement(Button, {
      label: "Default"
    }), /*#__PURE__*/React.createElement(Button, {
      size: "large",
      label: "Large"
    }), /*#__PURE__*/React.createElement(Button, {
      primary: true,
      size: "small",
      label: "Small"
    }), /*#__PURE__*/React.createElement(Button, {
      primary: true,
      size: "medium",
      label: "Medium"
    }), /*#__PURE__*/React.createElement(Button, {
      primary: true,
      label: "Default"
    }), /*#__PURE__*/React.createElement(Button, {
      primary: true,
      size: "large",
      label: "Large"
    }), /*#__PURE__*/React.createElement(Button, {
      size: "small",
      icon: /*#__PURE__*/React.createElement(Add, null),
      primary: true
    }), /*#__PURE__*/React.createElement(Button, {
      size: "medium",
      icon: /*#__PURE__*/React.createElement(Add, null),
      primary: true
    }), /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement(Add, null),
      primary: true
    }), /*#__PURE__*/React.createElement(Button, {
      size: "large",
      icon: /*#__PURE__*/React.createElement(Add, null),
      primary: true
    }), /*#__PURE__*/React.createElement(Button, {
      size: "small",
      label: "Small",
      icon: /*#__PURE__*/React.createElement(Next, null),
      reverse: true
    }), /*#__PURE__*/React.createElement(Button, {
      size: "medium",
      label: "Medium",
      icon: /*#__PURE__*/React.createElement(Next, null),
      reverse: true
    }), /*#__PURE__*/React.createElement(Button, {
      label: "Default",
      icon: /*#__PURE__*/React.createElement(Next, null),
      reverse: true
    }), /*#__PURE__*/React.createElement(Button, {
      size: "large",
      label: "Large",
      icon: /*#__PURE__*/React.createElement(Next, null),
      reverse: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('as', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Button, {
      as: "span"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});