function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getBodyChildElements, makeNodeFocusable, makeNodeUnfocusable } from '../utils';

var isNotAncestorOf = function isNotAncestorOf(child) {
  return function (parent) {
    return !parent.contains(child);
  };
};

export var FocusedContainer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FocusedContainer, _Component);

  function FocusedContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "ref", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "removeTrap", function () {
      var restrictScroll = _this.props.restrictScroll;
      var child = _this.ref.current;
      getBodyChildElements().filter(isNotAncestorOf(child)).forEach(makeNodeFocusable);

      if (restrictScroll) {
        document.body.style.overflow = _this.bodyOverflowStyle;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "trapFocus", function () {
      var restrictScroll = _this.props.restrictScroll;
      var child = _this.ref.current;
      getBodyChildElements().filter(isNotAncestorOf(child)).forEach(makeNodeUnfocusable);

      if (restrictScroll) {
        _this.bodyOverflowStyle = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
    });

    return _this;
  }

  var _proto = FocusedContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var hidden = this.props.hidden; // making sure trap focus always execute
    // after removeTrap for the case where two drops
    // are open at the same time

    setTimeout(function () {
      if (!hidden) {
        _this2.trapFocus();
      }
    }, 0);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.removeTrap();
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        hidden = _this$props.hidden,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "hidden"]);

    delete rest.restrictScroll;
    return React.createElement("div", _extends({
      ref: this.ref,
      "aria-hidden": hidden
    }, rest), children);
  };

  return FocusedContainer;
}(Component);

_defineProperty(FocusedContainer, "defaultProps", {
  hidden: false,
  restrictScroll: false
});

_defineProperty(FocusedContainer, "propTypes", {
  hidden: PropTypes.bool,
  restrictScroll: PropTypes.bool
});