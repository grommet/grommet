function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { getNewContainer } from '../../utils';
import { LayerContainer } from './LayerContainer';
import { animationDuration } from './StyledLayer';

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
    this.layerContainer = getNewContainer();
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
      }, animationDuration);
    }
  };

  _proto.render = function render() {
    var islayerContainerAvailable = this.state.islayerContainerAvailable;
    return islayerContainerAvailable ? createPortal(React.createElement(LayerContainer, this.props), this.layerContainer) : null;
  };

  return Layer;
}(Component);

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
export { LayerWrapper as Layer };