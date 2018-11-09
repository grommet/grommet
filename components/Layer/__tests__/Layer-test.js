"use strict";

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("jest-styled-components");

var _reactTestingLibrary = require("react-testing-library");

var _domTestingLibrary = require("dom-testing-library");

var _portal = require("../../../utils/portal");

var _ = require("../..");

var _LayerContainer = require("../LayerContainer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    var children = this.props.children;
    var showLayer = this.state.showLayer;
    var layer;

    if (showLayer) {
      layer = _react.default.createElement(_.Layer, {
        onEsc: function onEsc() {
          return _this2.setState({
            showLayer: false
          });
        }
      }, _react.default.createElement("div", {
        "data-testid": "test-layer-node"
      }, "This is a layer", _react.default.createElement("input", {
        "data-testid": "test-input"
      })));
    }

    return _react.default.createElement(_.Grommet, null, layer, children);
  };

  return FakeLayer;
}(_react.Component);

_defineProperty(FakeLayer, "propTypes", {
  children: _propTypes.default.node.isRequired
});

describe('Layer', function () {
  beforeEach(_portal.createPortal);
  afterEach(_reactTestingLibrary.cleanup);
  ['top', 'bottom', 'left', 'right', 'center'].forEach(function (position) {
    return test("position " + position, function () {
      (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Layer, {
        id: "position-test",
        position: position
      }, "This is a layer")));
      (0, _portal.expectPortal)('position-test').toMatchSnapshot();
    });
  });
  [true, false, 'horizontal', 'vertical'].forEach(function (full) {
    return test("full " + full, function () {
      (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Layer, {
        id: "full-test",
        full: full
      }, "This is a layer")));
      (0, _portal.expectPortal)('full-test').toMatchSnapshot();
    });
  });
  ['none', 'xsmall', 'small', 'medium', 'large'].forEach(function (margin) {
    return test("margin " + margin, function () {
      (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Layer, {
        id: "margin-test",
        margin: margin
      }, "This is a layer")));
      (0, _portal.expectPortal)('margin-test').toMatchSnapshot();
    });
  });
  test('hidden', function () {
    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Layer, {
      id: "hidden-test",
      position: "hidden"
    }, "This is a layer"))),
        rerender = _render.rerender;

    (0, _portal.expectPortal)('hidden-test').toMatchSnapshot();
    rerender(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Layer, {
      id: "hidden-test",
      position: "center"
    }, "This is a layer")));
    (0, _portal.expectPortal)('hidden-test').toMatchSnapshot();
  });
  test('plain', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Layer, {
      id: "plain-test",
      plain: true
    }, "This is a plain layer")));
    (0, _portal.expectPortal)('plain-test').toMatchSnapshot();
  });
  test('non-modal', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Layer, {
      id: "non-modal-test",
      modal: false
    }, "This is a non-modal layer")));
    (0, _portal.expectPortal)('non-modal-test').toMatchSnapshot();
  });
  test('dark context', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Box, {
      background: "dark-1"
    }, _react.default.createElement(_.Layer, {
      id: "non-modal-test",
      modal: false
    }, "This is a non-modal layer"))));
    (0, _portal.expectPortal)('non-modal-test').toMatchSnapshot();
  });
  test('invokes onEsc', function () {
    var map = {};
    document.addEventListener = jest.fn(function (event, cb) {
      map[event] = cb;
    });
    var onEsc = jest.fn();
    (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_LayerContainer.LayerContainer, {
      onEsc: onEsc
    }, _react.default.createElement("input", {
      "data-testid": "test-input"
    }))));
    map.keydown({
      key: 'Esc',
      keyCode: 27,
      which: 27
    });
    expect(onEsc).toBeCalled();
  });
  test('is accessible', function () {
    var map = {};
    document.addEventListener = jest.fn(function (event, cb) {
      map[event] = cb;
    });
    /* eslint-disable jsx-a11y/tabindex-no-positive */

    (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(FakeLayer, null, _react.default.createElement("div", {
      "data-testid": "test-body-node"
    }, _react.default.createElement("input", null), _react.default.createElement("input", {
      tabIndex: "10"
    })))));
    /* eslint-enable jsx-a11y/tabindex-no-positive */

    var bodyNode = (0, _domTestingLibrary.getByTestId)(document, 'test-body-node');
    var layerNode = (0, _domTestingLibrary.getByTestId)(document, 'test-layer-node');
    expect(bodyNode).toMatchSnapshot();
    expect(layerNode).toMatchSnapshot();
    map.keydown({
      key: 'Esc',
      keyCode: 27,
      which: 27
    });
    bodyNode = (0, _domTestingLibrary.getByTestId)(document, 'test-body-node');
    expect(bodyNode).toMatchSnapshot();
    expect((0, _domTestingLibrary.queryByTestId)(document, 'test-layer-node')).toBeNull();
  });
});