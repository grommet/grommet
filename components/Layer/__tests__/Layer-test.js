"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _react2 = require("@testing-library/react");

var _dom = require("@testing-library/dom");

var _portal = require("../../../utils/portal");

var _ = require("../..");

var _LayerContainer = require("../LayerContainer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var FakeLayer = function FakeLayer(_ref) {
  var children = _ref.children,
      dataTestid = _ref.dataTestid;

  var _React$useState = _react["default"].useState(false),
      showLayer = _React$useState[0],
      setShowLayer = _React$useState[1];

  _react["default"].useEffect(function () {
    return setShowLayer(true);
  }, []);

  var layer;

  if (showLayer) {
    layer = _react["default"].createElement(_.Layer, {
      onEsc: function onEsc() {
        return setShowLayer(false);
      }
    }, _react["default"].createElement("div", {
      "data-testid": dataTestid
    }, "This is a layer", _react["default"].createElement("input", {
      "data-testid": "test-input"
    })));
  }

  return _react["default"].createElement(_.Box, null, layer, children);
};

var TargetLayer = function TargetLayer(props) {
  var _React$useState2 = _react["default"].useState(),
      target = _React$useState2[0],
      setTarget = _React$useState2[1];

  var layer;

  if (target) {
    layer = _react["default"].createElement(_.Layer, _extends({}, props, {
      target: target
    }), "this is a test layer");
  }

  return _react["default"].createElement(_.Grommet, null, _react["default"].createElement("div", {
    ref: setTarget
  }), layer);
};

describe('Layer', function () {
  beforeEach(_portal.createPortal);
  afterEach(_react2.cleanup);
  ['top', 'bottom', 'left', 'right', 'start', 'end', 'center'].forEach(function (position) {
    return test("position " + position, function () {
      (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Layer, {
        id: "position-test",
        position: position
      }, "This is a layer")));
      (0, _portal.expectPortal)('position-test').toMatchSnapshot();
    });
  });
  [true, false, 'horizontal', 'vertical'].forEach(function (full) {
    return test("full " + full, function () {
      (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Layer, {
        id: "full-test",
        full: full
      }, "This is a layer")));
      (0, _portal.expectPortal)('full-test').toMatchSnapshot();
    });
  });
  ['none', 'xsmall', 'small', 'medium', 'large'].forEach(function (margin) {
    return test("margin " + margin, function () {
      (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Layer, {
        id: "margin-test",
        margin: margin
      }, "This is a layer")));
      (0, _portal.expectPortal)('margin-test').toMatchSnapshot();
    });
  });
  test("custom margin", function () {
    (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Layer, {
      id: "margin-test",
      margin: {
        top: '50px',
        bottom: '40px',
        left: '30px',
        right: '20px'
      }
    }, "This is a layer")));
    (0, _portal.expectPortal)('margin-test').toMatchSnapshot();
  });
  test('hidden', function () {
    var _render = (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Layer, {
      id: "hidden-test",
      position: "hidden"
    }, "This is a layer"))),
        rerender = _render.rerender;

    (0, _portal.expectPortal)('hidden-test').toMatchSnapshot();
    rerender(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Layer, {
      id: "hidden-test",
      position: "center"
    }, "This is a layer")));
    (0, _portal.expectPortal)('hidden-test').toMatchSnapshot();
  });
  test('plain', function () {
    (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Layer, {
      id: "plain-test",
      plain: true
    }, "This is a plain layer")));
    (0, _portal.expectPortal)('plain-test').toMatchSnapshot();
  });
  test('non-modal', function () {
    (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Layer, {
      id: "non-modal-test",
      modal: false
    }, "This is a non-modal layer")));
    (0, _portal.expectPortal)('non-modal-test').toMatchSnapshot();
  });
  test('dark context', function () {
    (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Box, {
      background: "dark-1"
    }, _react["default"].createElement(_.Layer, {
      id: "non-modal-test",
      modal: false
    }, "This is a non-modal layer"))));
    (0, _portal.expectPortal)('non-modal-test').toMatchSnapshot();
  });
  ['slide', 'fadeIn', false, true].forEach(function (animation) {
    return test("animation " + animation, function () {
      (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Layer, {
        id: "animation-test",
        animation: animation
      }, "This is a layer")));
      (0, _portal.expectPortal)('animation-test').toMatchSnapshot();
    });
  });
  test('invokes onEsc', function () {
    var onEsc = jest.fn();
    (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_LayerContainer.LayerContainer, {
      onEsc: onEsc
    }, _react["default"].createElement("input", {
      "data-testid": "test-input"
    }))));
    var inputNode = (0, _dom.getByTestId)(document, 'test-input');

    _react2.fireEvent.keyDown(inputNode, {
      key: 'Esc',
      keyCode: 27,
      which: 27
    });

    expect(onEsc).toBeCalled();
  });
  test('is accessible', function (done) {
    /* eslint-disable jsx-a11y/tabindex-no-positive */
    (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(FakeLayer, {
      dataTestid: "test-layer-node"
    }, _react["default"].createElement("div", {
      "data-testid": "test-body-node"
    }, _react["default"].createElement("input", null), _react["default"].createElement("input", {
      tabIndex: "10"
    })))));
    /* eslint-enable jsx-a11y/tabindex-no-positive */

    var bodyNode = (0, _dom.getByTestId)(document, 'test-body-node');
    var layerNode = (0, _dom.getByTestId)(document, 'test-layer-node');
    var inputNode = (0, _dom.getByTestId)(document, 'test-input');
    expect(bodyNode).toMatchSnapshot();
    expect(layerNode).toMatchSnapshot();

    _react2.fireEvent.keyDown(inputNode, {
      key: 'Esc',
      keyCode: 27,
      which: 27
    }); // because of de-animation, we test both the initial and delayed states


    bodyNode = (0, _dom.getByTestId)(document, 'test-body-node');
    expect(bodyNode).toMatchSnapshot();
    setTimeout(function () {
      expect((0, _dom.queryByTestId)(document, 'test-layer-node')).toBeNull();
      done();
    }, 300);
  });
  test('focus on layer', function () {
    /* eslint-disable jsx-a11y/no-autofocus */
    (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Layer, {
      "data-testid": "focus-layer-test"
    }, _react["default"].createElement("input", null)), _react["default"].createElement("input", {
      autoFocus: true
    })));
    /* eslint-disable jsx-a11y/no-autofocus */

    var layerNode = (0, _dom.getByTestId)(document, 'focus-layer-test');
    expect(layerNode).toMatchSnapshot();
    expect(document.activeElement.nodeName).toBe('A');
  });
  test('not steal focus from an autofocus focusable element', function () {
    /* eslint-disable jsx-a11y/no-autofocus */
    (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Layer, {
      "data-testid": "focus-layer-input-test"
    }, _react["default"].createElement("input", {
      autoFocus: true,
      "data-testid": "focus-input"
    }), _react["default"].createElement("button", {
      type: "button"
    }, "Button"))));
    /* eslint-disable jsx-a11y/no-autofocus */

    var layerNode = (0, _dom.getByTestId)(document, 'focus-layer-input-test');
    var inputNode = (0, _dom.getByTestId)(document, 'focus-input');
    expect(layerNode).toMatchSnapshot();
    expect(document.activeElement).toBe(inputNode);
  });
  test('target', function () {
    (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(TargetLayer, {
      id: "target-test"
    }, "This layer has a target")));
    (0, _portal.expectPortal)('target-test').toMatchSnapshot();
  });
});