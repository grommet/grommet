function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { css } from 'styled-components';
import React, { Component } from 'react';
import { Box } from '../../..';
import { ThemeContext } from '../../../../contexts';
import { normalizeColor } from '../../../../utils';
var searchingStyle = css(["position:relative;outline:none;box-shadow:none;&:before{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:", ";}&:after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;will-change:left,right;background:", ";animation:progress 1.5s cubic-bezier(0.4,0,0.2,1) infinite;transform:translateX(-50%) scaleX(0);}@keyframes progress{0%{transform:translateX(-50%) scaleX(0);}50%{transform:translateX(12.5%) scaleX(0.75);}100%{transform:translateX(50%) scaleX(0);}}"], function (props) {
  return normalizeColor('light-2', props.theme);
}, function (props) {
  return normalizeColor('brand', props.theme);
});
var defaultStyle = css(["position:relative;outline:none;&:after{content:'';position:absolute;bottom:0;left:50%;width:0;height:2px;background:transparent;transition:width 0.2s ease,background 0.2s ease,left 0.2s ease;}", ";"], function (props) {
  return props.focus && "\n    box-shadow: none;\n    &:after {\n      left: 0;\n      width: 100%;\n      background: " + normalizeColor('brand', props.theme) + ";\n    }\n  ";
});
var boxBorderTheme = {
  box: {
    extend: function extend(props) {
      return props.searching ? searchingStyle : defaultStyle;
    }
  }
};
export var SearchBorderBox =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SearchBorderBox, _Component);

  function SearchBorderBox() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      focus: false
    });

    return _this;
  }

  var _proto = SearchBorderBox.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        children = _this$props.children,
        searching = _this$props.searching,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "searching"]);

    var focus = this.state.focus;
    return React.createElement(ThemeContext.Extend, {
      value: boxBorderTheme
    }, React.createElement(Box, _extends({
      focus: focus,
      searching: searching,
      onFocus: function onFocus() {
        return _this2.setState({
          focus: true
        });
      },
      onBlur: function onBlur() {
        return _this2.setState({
          focus: false
        });
      }
    }, rest), children));
  };

  return SearchBorderBox;
}(Component);