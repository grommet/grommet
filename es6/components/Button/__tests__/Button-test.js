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
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      label: "Test",
      onClick: function onClick() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('children function', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      onClick: function onClick() {}
    }, function () {
      return React.createElement(Text, null, "Test");
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('warns about invalid label', function () {
    var warnSpy = jest.spyOn(console, 'warn');
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
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
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      icon: React.createElement("svg", null),
      onClick: function onClick() {}
    }, "invalid")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith('Button should not have children if icon or label is provided');
    warnSpy.mockReset();
    warnSpy.mockRestore();
  });
  test('primary', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      primary: true,
      label: "Test",
      onClick: function onClick() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('color', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      color: "accent-1",
      label: "Test",
      onClick: function onClick() {}
    }), React.createElement(Button, {
      color: "accent-1",
      primary: true,
      label: "Test",
      onClick: function onClick() {}
    }), React.createElement(Button, {
      color: "#111111",
      primary: true,
      label: "Test",
      onClick: function onClick() {}
    }), React.createElement(Button, {
      color: "#123",
      primary: true,
      label: "Test",
      onClick: function onClick() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, null, React.createElement(Button, {
      fill: true
    }), React.createElement(Button, {
      fill: false
    }), React.createElement(Button, {
      fill: "horizontal"
    }), React.createElement(Button, {
      fill: "vertical"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('focus', function () {
    var _render = render(React.createElement(Grommet, null, React.createElement(Button, {
      label: "Test",
      onClick: function onClick() {}
    }))),
        container = _render.container,
        getByText = _render.getByText;

    fireEvent.focus(getByText('Test'));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('disabled', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      disabled: true
    }), React.createElement(Button, {
      disabled: true,
      primary: true,
      label: "Button"
    }), React.createElement(Button, {
      disabled: true,
      label: "Button"
    }), React.createElement(Button, {
      disabled: true,
      plain: true,
      label: "Button"
    }), React.createElement(Button, {
      disabled: true,
      plain: false,
      label: "Button"
    }), React.createElement(Button, {
      disabled: true,
      icon: React.createElement("svg", null)
    }), React.createElement(Button, {
      disabled: true,
      icon: React.createElement("svg", null),
      plain: true
    }), React.createElement(Button, {
      disabled: true,
      icon: React.createElement("svg", null),
      plain: false
    }), React.createElement(Button, {
      disabled: true,
      icon: React.createElement("svg", null),
      label: "Button"
    }), React.createElement(Button, {
      disabled: true,
      icon: React.createElement("svg", null),
      label: "Button",
      plain: true
    }), React.createElement(Button, {
      disabled: true,
      icon: React.createElement("svg", null),
      label: "Button",
      primary: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('active', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      active: true,
      label: "Button"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('active + primary', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      active: true,
      primary: true,
      label: "Button"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('icon label', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      icon: React.createElement("svg", null),
      label: "Test",
      onClick: function onClick() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('reverse icon label', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      reverse: true,
      icon: React.createElement("svg", null),
      label: "Test",
      onClick: function onClick() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('href', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      href: "test"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator background', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: "background"
    }, "hoverIndicator")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object with color', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        color: 'brand'
      }
    }, "hoverIndicator")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object with invalid color', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        color: 'invalid'
      }
    }, "hoverIndicator")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator color', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: "dark-3"
    }, "hoverIndicator")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('onClick', function () {
    var onClick = jest.fn();
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      label: "Test",
      onClick: onClick
    })));
    var tree = component.toJSON();
    var button = findAllByType(tree, 'button');
    button[0].props.onClick();
    expect(onClick).toBeCalled();
  });
  test('size', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      size: "small",
      label: "Small"
    }), React.createElement(Button, {
      size: "medium",
      label: "Medium"
    }), React.createElement(Button, {
      label: "Default"
    }), React.createElement(Button, {
      size: "large",
      label: "Large"
    }), React.createElement(Button, {
      primary: true,
      size: "small",
      label: "Small"
    }), React.createElement(Button, {
      primary: true,
      size: "medium",
      label: "Medium"
    }), React.createElement(Button, {
      primary: true,
      label: "Default"
    }), React.createElement(Button, {
      primary: true,
      size: "large",
      label: "Large"
    }), React.createElement(Button, {
      size: "small",
      icon: React.createElement(Add, null),
      primary: true
    }), React.createElement(Button, {
      size: "medium",
      icon: React.createElement(Add, null),
      primary: true
    }), React.createElement(Button, {
      icon: React.createElement(Add, null),
      primary: true
    }), React.createElement(Button, {
      size: "large",
      icon: React.createElement(Add, null),
      primary: true
    }), React.createElement(Button, {
      size: "small",
      label: "Small",
      icon: React.createElement(Next, null),
      reverse: true
    }), React.createElement(Button, {
      size: "medium",
      label: "Medium",
      icon: React.createElement(Next, null),
      reverse: true
    }), React.createElement(Button, {
      label: "Default",
      icon: React.createElement(Next, null),
      reverse: true
    }), React.createElement(Button, {
      size: "large",
      label: "Large",
      icon: React.createElement(Next, null),
      reverse: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('as', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      as: "span"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});