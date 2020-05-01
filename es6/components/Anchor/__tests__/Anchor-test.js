import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import { findAllByType } from '../../../utils';
import { Grommet } from '../../Grommet';
import { Anchor } from '..';
describe('Anchor', function () {
  afterEach(cleanup);
  test('renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Anchor, null)));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('renders with children', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Anchor, {
      href: "#"
    }, "children")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('warns about invalid label render', function () {
    var warnSpy = jest.spyOn(console, 'warn');
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Anchor, {
      href: "#",
      label: "Test"
    }, "invalid")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith('Anchor should not have children if icon or label is provided');
    warnSpy.mockReset();
    warnSpy.mockRestore();
  });
  test('warns about invalid icon render', function () {
    var warnSpy = jest.spyOn(console, 'warn');
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Anchor, {
      href: "#",
      icon: /*#__PURE__*/React.createElement("svg", null)
    }, "invalid")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith('Anchor should not have children if icon or label is provided');
    warnSpy.mockReset();
    warnSpy.mockRestore();
  });
  test('primary renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Anchor, {
      href: "#",
      primary: true,
      label: "Test"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('focus renders', function () {
    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Anchor, {
      href: "#",
      label: "Test"
    }))),
        container = _render.container,
        getByText = _render.getByText;

    fireEvent.focus(getByText('Test'));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('disabled renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Anchor, {
      disabled: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('icon label renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Anchor, {
      icon: /*#__PURE__*/React.createElement("svg", null),
      label: "Test",
      onClick: function onClick() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('reverse icon label renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Anchor, {
      reverse: true,
      icon: /*#__PURE__*/React.createElement("svg", null),
      label: "Test",
      onClick: function onClick() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('is clickable', function () {
    var onClick = jest.fn();
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Anchor, {
      href: "#",
      label: "Test",
      onClick: onClick
    })));
    var tree = component.toJSON();
    var anchor = findAllByType(tree, 'a');
    anchor[0].props.onClick();
    expect(onClick).toBeCalled();
  });
  test('renders tag', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Anchor, {
      href: "#",
      label: "Test",
      as: "span"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});