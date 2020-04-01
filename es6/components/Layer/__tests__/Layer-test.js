function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { getByTestId, queryByTestId } from '@testing-library/dom';
import { createPortal, expectPortal } from '../../../utils/portal';
import { Grommet, Box, Layer } from '../..';
import { LayerContainer } from '../LayerContainer';

var SimpleLayer = function SimpleLayer() {
  var _React$useState = React.useState(true),
      showLayer = _React$useState[0],
      setShowLayer = _React$useState[1];

  React.useEffect(function () {
    return setShowLayer(false);
  }, []);
  var layer;

  if (showLayer) {
    layer = React.createElement(Layer, {
      "data-testid": "test-dom-removal"
    }, "This is a test");
  }

  return React.createElement(Box, null, layer);
};

var FakeLayer = function FakeLayer(_ref) {
  var children = _ref.children,
      dataTestid = _ref.dataTestid;

  var _React$useState2 = React.useState(false),
      showLayer = _React$useState2[0],
      setShowLayer = _React$useState2[1];

  React.useEffect(function () {
    return setShowLayer(true);
  }, []);
  var layer;

  if (showLayer) {
    layer = React.createElement(Layer, {
      onEsc: function onEsc() {
        return setShowLayer(false);
      }
    }, React.createElement("div", {
      "data-testid": dataTestid
    }, "This is a layer", React.createElement("input", {
      "data-testid": "test-input"
    })));
  }

  return React.createElement(Box, null, layer, children);
};

var TargetLayer = function TargetLayer(props) {
  var _React$useState3 = React.useState(),
      target = _React$useState3[0],
      setTarget = _React$useState3[1];

  var layer;

  if (target) {
    layer = React.createElement(Layer, _extends({}, props, {
      target: target
    }), "this is a test layer");
  }

  return React.createElement(Grommet, null, React.createElement("div", {
    ref: setTarget
  }), layer);
};

describe('Layer', function () {
  beforeEach(createPortal);
  afterEach(cleanup);
  ['top', 'bottom', 'left', 'right', 'start', 'end', 'center'].forEach(function (position) {
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
  ['slide', 'fadeIn', false, true].forEach(function (animation) {
    return test("animation " + animation, function () {
      render(React.createElement(Grommet, null, React.createElement(Layer, {
        id: "animation-test",
        animation: animation
      }, "This is a layer")));
      expectPortal('animation-test').toMatchSnapshot();
    });
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
  test('is accessible', function (done) {
    /* eslint-disable jsx-a11y/tabindex-no-positive */
    render(React.createElement(Grommet, null, React.createElement(FakeLayer, {
      dataTestid: "test-layer-node"
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
    }); // because of de-animation, we test both the initial and delayed states

    bodyNode = getByTestId(document, 'test-body-node');
    expect(bodyNode).toMatchSnapshot();
    setTimeout(function () {
      expect(queryByTestId(document, 'test-layer-node')).toBeNull();
      done();
    }, 300);
  });
  test('focus on layer', function () {
    /* eslint-disable jsx-a11y/no-autofocus */
    render(React.createElement(Grommet, null, React.createElement(Layer, {
      "data-testid": "focus-layer-test"
    }, React.createElement("input", null)), React.createElement("input", {
      autoFocus: true
    })));
    /* eslint-disable jsx-a11y/no-autofocus */

    var layerNode = getByTestId(document, 'focus-layer-test');
    expect(layerNode).toMatchSnapshot();
    expect(document.activeElement.nodeName).toBe('A');
  });
  test('not steal focus from an autofocus focusable element', function () {
    /* eslint-disable jsx-a11y/no-autofocus */
    render(React.createElement(Grommet, null, React.createElement(Layer, {
      "data-testid": "focus-layer-input-test"
    }, React.createElement("input", {
      autoFocus: true,
      "data-testid": "focus-input"
    }), React.createElement("button", {
      type: "button"
    }, "Button"))));
    /* eslint-disable jsx-a11y/no-autofocus */

    var layerNode = getByTestId(document, 'focus-layer-input-test');
    var inputNode = getByTestId(document, 'focus-input');
    expect(layerNode).toMatchSnapshot();
    expect(document.activeElement).toBe(inputNode);
  });
  test('target', function () {
    render(React.createElement(Grommet, null, React.createElement(TargetLayer, {
      id: "target-test"
    }, "This layer has a target")));
    expectPortal('target-test').toMatchSnapshot();
  });
  test('target not modal', function () {
    render(React.createElement(Grommet, null, React.createElement(TargetLayer, {
      id: "target-test",
      modal: false
    }, "This layer has a target")));
    expectPortal('target-test').toMatchSnapshot();
  });
  test('unmounts from dom', function () {
    render(React.createElement(Grommet, null, React.createElement(SimpleLayer, null)));
    setTimeout(function () {
      expect(queryByTestId(document, 'test-dom-removal')).toBeNull();
    }, 1000);
  });
  test('default containerTarget', function () {
    render(React.createElement(Grommet, null, React.createElement(Layer, {
      "data-testid": "layer"
    }, "Test")));
    var layer = getByTestId(document, 'layer');
    var actualRoot = layer.parentNode.parentNode.parentNode.parentNode;
    expect(actualRoot).toBe(document.body);
  });
  test('custom containerTarget', function () {
    var target = document.createElement('div');
    document.body.appendChild(target);

    try {
      render(React.createElement(Grommet, {
        containerTarget: target
      }, React.createElement(Layer, {
        "data-testid": "layer"
      }, "Test")));
      var layer = getByTestId(document, 'layer');
      var actualRoot = layer.parentNode.parentNode.parentNode.parentNode;
      expect(actualRoot).toBe(target);
    } finally {
      document.body.removeChild(target);
    }
  });
});