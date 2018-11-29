function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { getByTestId, queryByTestId } from 'dom-testing-library';
import { createPortal, expectPortal } from '../../../utils/portal';
import { Grommet, Box, Layer } from '../..';
import { LayerContainer } from '../LayerContainer';

var FakeLayer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FakeLayer, _Component);

  function FakeLayer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      showLayer: false
    });

    return _this;
  }

  var _proto = FakeLayer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setState({
      showLayer: true
    }); // eslint-disable-line
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        children = _this$props.children,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children"]);

    var showLayer = this.state.showLayer;
    var layer;

    if (showLayer) {
      layer = React.createElement(Layer, {
        onEsc: function onEsc() {
          return _this2.setState({
            showLayer: false
          });
        }
      }, React.createElement("div", rest, "This is a layer", React.createElement("input", {
        "data-testid": "test-input"
      })));
    }

    return React.createElement(Grommet, null, layer, children);
  };

  return FakeLayer;
}(Component);

_defineProperty(FakeLayer, "propTypes", {
  children: PropTypes.node.isRequired
});

describe('Layer', function () {
  beforeEach(createPortal);
  afterEach(cleanup);
  ['top', 'bottom', 'left', 'right', 'center'].forEach(function (position) {
    return test("position " + position, function () {
      render(React.createElement(Grommet, null, React.createElement(Layer, {
        id: "position-test",
        position: position
      }, "This is a layer")));
      expectPortal('position-test').toMatchSnapshot();
    });
  });
  [true, false, 'horizontal', 'vertical'].forEach(function (full) {
    return test("full " + full, function () {
      render(React.createElement(Grommet, null, React.createElement(Layer, {
        id: "full-test",
        full: full
      }, "This is a layer")));
      expectPortal('full-test').toMatchSnapshot();
    });
  });
  ['none', 'xsmall', 'small', 'medium', 'large'].forEach(function (margin) {
    return test("margin " + margin, function () {
      render(React.createElement(Grommet, null, React.createElement(Layer, {
        id: "margin-test",
        margin: margin
      }, "This is a layer")));
      expectPortal('margin-test').toMatchSnapshot();
    });
  });
  test("custom margin", function () {
    render(React.createElement(Grommet, null, React.createElement(Layer, {
      id: "margin-test",
      margin: {
        top: '50px',
        bottom: '40px',
        left: '30px',
        right: '20px'
      }
    }, "This is a layer")));
    expectPortal('margin-test').toMatchSnapshot();
  });
  test('hidden', function () {
    var _render = render(React.createElement(Grommet, null, React.createElement(Layer, {
      id: "hidden-test",
      position: "hidden"
    }, "This is a layer"))),
        rerender = _render.rerender;

    expectPortal('hidden-test').toMatchSnapshot();
    rerender(React.createElement(Grommet, null, React.createElement(Layer, {
      id: "hidden-test",
      position: "center"
    }, "This is a layer")));
    expectPortal('hidden-test').toMatchSnapshot();
  });
  test('plain', function () {
    render(React.createElement(Grommet, null, React.createElement(Layer, {
      id: "plain-test",
      plain: true
    }, "This is a plain layer")));
    expectPortal('plain-test').toMatchSnapshot();
  });
  test('non-modal', function () {
    render(React.createElement(Grommet, null, React.createElement(Layer, {
      id: "non-modal-test",
      modal: false
    }, "This is a non-modal layer")));
    expectPortal('non-modal-test').toMatchSnapshot();
  });
  test('dark context', function () {
    render(React.createElement(Grommet, null, React.createElement(Box, {
      background: "dark-1"
    }, React.createElement(Layer, {
      id: "non-modal-test",
      modal: false
    }, "This is a non-modal layer"))));
    expectPortal('non-modal-test').toMatchSnapshot();
  });
  test('invokes onEsc', function () {
    var onEsc = jest.fn();
    render(React.createElement(Grommet, null, React.createElement(LayerContainer, {
      onEsc: onEsc
    }, React.createElement("input", {
      "data-testid": "test-input"
    }))));
    var inputNode = getByTestId(document, 'test-input');
    fireEvent.keyDown(inputNode, {
      key: 'Esc',
      keyCode: 27,
      which: 27
    });
    expect(onEsc).toBeCalled();
  });
  test('is accessible', function () {
    /* eslint-disable jsx-a11y/tabindex-no-positive */
    render(React.createElement(Grommet, null, React.createElement(FakeLayer, {
      "data-testid": "test-layer-node"
    }, React.createElement("div", {
      "data-testid": "test-body-node"
    }, React.createElement("input", null), React.createElement("input", {
      tabIndex: "10"
    })))));
    /* eslint-enable jsx-a11y/tabindex-no-positive */

    var bodyNode = getByTestId(document, 'test-body-node');
    var layerNode = getByTestId(document, 'test-layer-node');
    var inputNode = getByTestId(document, 'test-input');
    expect(bodyNode).toMatchSnapshot();
    expect(layerNode).toMatchSnapshot();
    fireEvent.keyDown(inputNode, {
      key: 'Esc',
      keyCode: 27,
      which: 27
    });
    bodyNode = getByTestId(document, 'test-body-node');
    expect(bodyNode).toMatchSnapshot();
    expect(queryByTestId(document, 'test-layer-node')).toBeNull();
  });
});