"use strict";

exports.__esModule = true;
exports.Layer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _utils = require("../../utils");

var _LayerContainer = require("./LayerContainer");

var _StyledLayer = require("./StyledLayer");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Layer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Layer, _Component);

  function Layer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      islayerContainerAvailable: false
    });

    return _this;
  }

  var _proto = Layer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // ensure document is available
    this.originalFocusedElement = document.activeElement;
    this.layerContainer = (0, _utils.getNewContainer)();
    this.setState({
      islayerContainerAvailable: true
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this2 = this;

    var _this$props = this.props,
        animate = _this$props.animate,
        animation = _this$props.animation;

    if (this.originalFocusedElement) {
      if (this.originalFocusedElement.focus) {
        // wait for the fixed positioning to come back to normal
        // see layer styling for reference
        setTimeout(function () {
          _this2.originalFocusedElement.focus();
        }, 0);
      } else if (this.originalFocusedElement.parentNode && this.originalFocusedElement.parentNode.focus) {
        // required for IE11 and Edge
        this.originalFocusedElement.parentNode.focus();
      }
    }

    var activeAnimation = animation !== undefined ? animation : animate;

    if (activeAnimation !== false) {
      // undefined uses 'slide' as the default
      // animate out and remove later
      var layerClone = this.layerContainer.cloneNode(true);
      layerClone.id = 'layerClone';
      document.body.appendChild(layerClone);
      var clonedContainer = layerClone.querySelector('[class*="StyledLayer__StyledContainer"]');

      if (clonedContainer && clonedContainer.style) {
        clonedContainer.style.animationDirection = 'reverse';
      }

      setTimeout(function () {
        // we add the id and query here so the unit tests work
        var clone = document.getElementById('layerClone');
        if (clone) document.body.removeChild(clone);
      }, _StyledLayer.animationDuration);
    }
  };

  _proto.render = function render() {
    var islayerContainerAvailable = this.state.islayerContainerAvailable;
    return islayerContainerAvailable ? (0, _reactDom.createPortal)(_react["default"].createElement(_LayerContainer.LayerContainer, this.props), this.layerContainer) : null;
  };

  return Layer;
}(_react.Component);

_defineProperty(Layer, "defaultProps", {
  full: false,
  margin: 'none',
  modal: true,
  position: 'center',
  responsive: true
});

var LayerDoc;

if (process.env.NODE_ENV !== 'production') {
  LayerDoc = require('./doc').doc(Layer); // eslint-disable-line global-require
}

var LayerWrapper = LayerDoc || Layer;
exports.Layer = LayerWrapper;