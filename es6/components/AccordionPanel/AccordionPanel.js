function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { Collapsible } from '../Collapsible';
import { Heading } from '../Heading';
import { withForwardRef } from '../hocs';
import { AccordionContext } from '../Accordion/AccordionContext';

var AccordionPanel =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(AccordionPanel, _Component);

  function AccordionPanel() {
    var _this;

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(_args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      hover: undefined
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseOver", function () {
      var _this$props = _this.props,
          onMouseOver = _this$props.onMouseOver,
          dark = _this$props.theme.dark;

      _this.setState({
        hover: dark ? 'light-4' : 'dark-3'
      });

      if (onMouseOver) {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        onMouseOver(args);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseOut", function () {
      var onMouseOut = _this.props.onMouseOut;

      _this.setState({
        hover: undefined
      });

      if (onMouseOut) {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        onMouseOut(args);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      var _this$props2 = _this.props,
          onFocus = _this$props2.onFocus,
          dark = _this$props2.theme.dark;

      _this.setState({
        hover: dark ? 'light-4' : 'dark-3'
      });

      if (onFocus) {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        onFocus(args);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      var onBlur = _this.props.onBlur;

      _this.setState({
        hover: undefined
      });

      if (onBlur) {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        onBlur(args);
      }
    });

    return _this;
  }

  var _proto = AccordionPanel.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        children = _this$props3.children,
        header = _this$props3.header,
        label = _this$props3.label,
        theme = _this$props3.theme,
        onMouseOut = _this$props3.onMouseOut,
        onMouseOver = _this$props3.onMouseOver,
        onFocus = _this$props3.onFocus,
        onBlur = _this$props3.onBlur,
        rest = _objectWithoutPropertiesLoose(_this$props3, ["children", "header", "label", "theme", "onMouseOut", "onMouseOver", "onFocus", "onBlur"]);

    var hover = this.state.hover;
    var iconColor = normalizeColor(theme.accordion.icons.color || 'control', theme);
    return React.createElement(AccordionContext.Consumer, null, function (panelContext) {
      var active = panelContext.active,
          animate = panelContext.animate,
          onPanelChange = panelContext.onPanelChange;
      var AccordionIcon = active ? theme.accordion.icons.collapse : theme.accordion.icons.expand;
      return React.createElement(Box, {
        flex: false
      }, React.createElement(Button, {
        role: "tab",
        "aria-selected": active,
        "aria-expanded": active,
        onClick: onPanelChange,
        onMouseOver: _this2.onMouseOver,
        onMouseOut: _this2.onMouseOut,
        onFocus: _this2.onFocus,
        onBlur: _this2.onBlur
      }, header || React.createElement(Box, _extends({
        align: "center",
        direction: "row",
        justify: "between"
      }, rest), typeof label === 'string' ? React.createElement(Box, {
        pad: {
          horizontal: 'xsmall'
        }
      }, React.createElement(Heading, {
        level: theme.accordion.heading && theme.accordion.heading.level || 4,
        color: hover
      }, label)) : label, AccordionIcon && React.createElement(Box, {
        pad: {
          horizontal: 'small'
        }
      }, React.createElement(AccordionIcon, {
        color: iconColor
      })))), React.createElement(Box, {
        border: theme.accordion.border
      }, animate ? React.createElement(Collapsible, {
        open: active
      }, children) : active && children));
    });
  };

  return AccordionPanel;
}(Component);

AccordionPanel.defaultProps = {};
Object.setPrototypeOf(AccordionPanel.defaultProps, defaultProps);
var AccordionPanelDoc;

if (process.env.NODE_ENV !== 'production') {
  AccordionPanelDoc = require('./doc').doc(AccordionPanel); // eslint-disable-line global-require
}

var AccordionPanelWrapper = compose(withTheme, withForwardRef)(AccordionPanelDoc || AccordionPanel);
export { AccordionPanelWrapper as AccordionPanel };