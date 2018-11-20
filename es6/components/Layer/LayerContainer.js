function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { ThemeContext as IconThemeContext } from "grommet-icons/es6/contexts/ThemeContext";
import { FocusedContainer } from '../FocusedContainer';
import { Keyboard } from '../Keyboard';
import { withTheme } from '../hocs';
import { backgroundIsDark } from '../../utils';
import { StyledLayer, StyledContainer, StyledOverlay } from './StyledLayer';

var LayerContainer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(LayerContainer, _Component);

  function LayerContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "containerRef", React.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "layerRef", React.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "makeLayerVisible", function () {
      /* eslint-disable-next-line react/no-find-dom-node */
      var node = findDOMNode(_this.layerRef.current || _this.containerRef.current);

      if (node && node.scrollIntoView) {
        node.scrollIntoView();
      }
    });

    return _this;
  }

  LayerContainer.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var theme = nextProps.theme;
    var stateTheme = prevState.theme; // set dark context based on layer background, not Layer's container.

    var dark = theme.dark;

    if (theme.layer.background) {
      dark = backgroundIsDark(theme.layer.background, theme);
    }

    if (!dark !== !theme.dark) {
      if (!stateTheme || dark !== stateTheme.dark) {
        return {
          theme: _extends({}, theme, {
            dark: dark,
            icon: dark ? theme.iconThemes.dark : theme.iconThemes.light
          })
        };
      }
    } else if (stateTheme) {
      return {
        theme: undefined
      };
    }

    return null;
  };

  var _proto = LayerContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var position = this.props.position;

    if (position !== 'hidden') {
      this.makeLayerVisible();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var position = this.props.position;

    if (prevProps.position !== position && position !== 'hidden') {
      this.makeLayerVisible();
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        id = _this$props.id,
        modal = _this$props.modal,
        onClickOutside = _this$props.onClickOutside,
        onEsc = _this$props.onEsc,
        plain = _this$props.plain,
        position = _this$props.position,
        responsive = _this$props.responsive,
        propsTheme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "id", "modal", "onClickOutside", "onEsc", "plain", "position", "responsive", "theme"]);

    var stateTheme = this.state.theme;
    var theme = stateTheme || propsTheme;
    var content = React.createElement(StyledContainer, _extends({
      id: id
    }, rest, {
      theme: theme,
      position: position,
      plain: plain,
      responsive: responsive,
      ref: this.containerRef
    }), children);

    if (modal) {
      content = React.createElement(StyledLayer, {
        id: id,
        plain: plain,
        position: position,
        theme: theme,
        responsive: responsive,
        tabIndex: "-1",
        ref: this.layerRef
      }, React.createElement(StyledOverlay, {
        plain: plain,
        onMouseDown: onClickOutside,
        responsive: responsive,
        theme: theme
      }), content);
    }

    if (onEsc) {
      content = React.createElement(Keyboard, {
        target: "document",
        onEsc: onEsc
      }, content);
    }

    if (modal) {
      content = React.createElement(FocusedContainer, {
        hidden: position === 'hidden',
        restrictScroll: true
      }, React.createElement(IconThemeContext.Provider, {
        value: theme.icon
      }, content));
    }

    return content;
  };

  return LayerContainer;
}(Component);

_defineProperty(LayerContainer, "defaultProps", {
  full: false,
  margin: 'none',
  modal: true,
  position: 'center'
});

var LayerContainerWrapper = withTheme(LayerContainer);
export { LayerContainerWrapper as LayerContainer };