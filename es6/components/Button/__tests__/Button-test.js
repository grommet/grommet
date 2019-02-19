import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { findAllByType } from '../../../utils';
import { Grommet, Button, Text } from '../..';
describe('Button', function () {
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
  test('focus', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      focus: true,
      label: "Test",
      onClick: function onClick() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('disabled', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      disabled: true
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
  test('hoverIndicator as object', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        background: true
      }
    }, "hoverIndicator")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object with color', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        background: 'brand'
      }
    }, "hoverIndicator")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object with colorIndex', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        background: 'accent-1'
      }
    }, "hoverIndicator")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object with invalid color', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        background: 'accent'
      }
    }, "hoverIndicator")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        background: 'invalid'
      }
    }, "hoverIndicator")));
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hoverIndicator as object with invalid colorIndex', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      onClick: function onClick() {},
      hoverIndicator: {
        background: 'accent-100'
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
  test('as', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
      as: "span"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});