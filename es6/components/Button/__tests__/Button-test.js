import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { findAllByType } from '../../../utils';
import { Grommet, Button } from '../..';
test('Button renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
    label: "Test",
    onClick: function onClick() {}
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button warns about invalid label render', function () {
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
test('Button warns about invalid icon render', function () {
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
test('Button primary renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
    primary: true,
    label: "Test",
    onClick: function onClick() {}
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button color renders', function () {
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
test('Button focus renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
    focus: true,
    label: "Test",
    onClick: function onClick() {}
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button disabled renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
    disabled: true
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button icon label renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
    icon: React.createElement("svg", null),
    label: "Test",
    onClick: function onClick() {}
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button reverse icon label renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
    reverse: true,
    icon: React.createElement("svg", null),
    label: "Test",
    onClick: function onClick() {}
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button href renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
    href: "test"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button hoverIndicator renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
    onClick: function onClick() {},
    hoverIndicator: "background"
  }, "hoverIndicator")));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button hoverIndicator as object renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
    onClick: function onClick() {},
    hoverIndicator: {
      background: true
    }
  }, "hoverIndicator")));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button hoverIndicator as object with color renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
    onClick: function onClick() {},
    hoverIndicator: {
      background: 'brand'
    }
  }, "hoverIndicator")));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button hoverIndicator as object with colorIndex renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
    onClick: function onClick() {},
    hoverIndicator: {
      background: 'accent-1'
    }
  }, "hoverIndicator")));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Button hoverIndicator as object with invalid color renders', function () {
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
test('Button hoverIndicator as object with invalid colorIndex renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
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
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Button, {
    label: "Test",
    onClick: onClick
  })));
  var tree = component.toJSON();
  var button = findAllByType(tree, 'button');
  button[0].props.onClick();
  expect(onClick).toBeCalled();
});