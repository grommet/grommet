function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { findAllByType } from '../../../utils';
import { Grommet } from '../../Grommet';
import { RoutedAnchor } from '..';

var FakeRouter =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FakeRouter, _Component);

  function FakeRouter() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FakeRouter.prototype;

  _proto.getChildContext = function getChildContext() {
    var _this$props = this.props,
        push = _this$props.push,
        replace = _this$props.replace;
    return {
      router: {
        history: {
          push: push,
          replace: replace
        }
      }
    };
  };

  _proto.render = function render() {
    var children = this.props.children;
    return React.createElement("div", null, children);
  };

  return FakeRouter;
}(Component);

_defineProperty(FakeRouter, "propTypes", {
  children: PropTypes.node.isRequired,
  push: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired
});

_defineProperty(FakeRouter, "childContextTypes", {
  router: PropTypes.shape({}).isRequired
});

describe('RoutedAnchor', function () {
  test('renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FakeRouter, null, React.createElement(RoutedAnchor, {
      label: "Test",
      path: "/"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('is clickable', function () {
    var preventDefault = jest.fn();
    var push = jest.fn();
    var onClick = jest.fn();
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FakeRouter, {
      push: push
    }, React.createElement(RoutedAnchor, {
      label: "Test",
      onClick: onClick
    }))));
    var tree = component.toJSON();
    var anchor = findAllByType(tree, 'a');
    anchor[0].props.onClick({
      preventDefault: preventDefault
    });
    expect(onClick).toBeCalled();
    expect(push).toBeCalled();
    expect(preventDefault).toBeCalled();
  });
  test('skips onClick if right clicked', function () {
    var onClick = jest.fn();
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FakeRouter, null, React.createElement(RoutedAnchor, {
      label: "Test",
      onClick: onClick
    }))));
    var tree = component.toJSON();
    var anchor = findAllByType(tree, 'a');
    anchor[0].props.onClick({
      ctrlKey: true
    });
    anchor[0].props.onClick({
      metaKey: true
    });
    expect(onClick).not.toBeCalled();
  });
  test('calls router context push', function () {
    var preventDefault = jest.fn();
    var push = jest.fn();
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FakeRouter, {
      push: push
    }, React.createElement(RoutedAnchor, {
      label: "Test",
      path: "/"
    }))));
    var tree = component.toJSON();
    var anchor = findAllByType(tree, 'a');
    anchor[0].props.onClick({
      preventDefault: preventDefault
    });
    expect(preventDefault).toBeCalled();
    expect(push).toBeCalledWith('/');
  });
  test('calls router context replace', function () {
    var preventDefault = jest.fn();
    var replace = jest.fn();
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(FakeRouter, {
      replace: replace
    }, React.createElement(RoutedAnchor, {
      label: "Test",
      path: "/",
      method: "replace"
    }))));
    var tree = component.toJSON();
    var anchor = findAllByType(tree, 'a');
    anchor[0].props.onClick({
      preventDefault: preventDefault
    });
    expect(preventDefault).toBeCalled();
    expect(replace).toBeCalledWith('/');
  });
});