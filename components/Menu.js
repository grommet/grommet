'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _DOM = require('../utils/DOM');

var _Drop = require('../utils/Drop');

var _Drop2 = _interopRequireDefault(_Drop);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Responsive = require('../utils/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Down = require('./icons/base/Down');

var _Down2 = _interopRequireDefault(_Down);

var _More = require('./icons/base/More');

var _More2 = _interopRequireDefault(_More);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.MENU;

function isFunction(obj) {
  return obj && obj.constructor && obj.call && obj.apply;
}

// We have a separate module for the drop component
// so we can transfer the router context.

var MenuDrop = function (_Component) {
  _inherits(MenuDrop, _Component);

  function MenuDrop(props, context) {
    _classCallCheck(this, MenuDrop);

    var _this = _possibleConstructorReturn(this, (MenuDrop.__proto__ || Object.getPrototypeOf(MenuDrop)).call(this, props, context));

    _this._onUpKeyPress = _this._onUpKeyPress.bind(_this);
    _this._onDownKeyPress = _this._onDownKeyPress.bind(_this);
    _this._processTab = _this._processTab.bind(_this);
    return _this;
  }

  _createClass(MenuDrop, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        intl: this.props.intl,
        history: this.props.history,
        router: this.props.router,
        store: this.props.store
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._originalFocusedElement = document.activeElement;
      this._keyboardHandlers = {
        tab: this._processTab,
        up: this._onUpKeyPress,
        left: this._onUpKeyPress,
        down: this._onDownKeyPress,
        right: this._onDownKeyPress
      };
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._originalFocusedElement.focus) {
        this._originalFocusedElement.focus();
      } else if (this._originalFocusedElement.parentNode && this._originalFocusedElement.parentNode.focus) {
        // required for IE11 and Edge
        this._originalFocusedElement.parentNode.focus();
      }
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: '_processTab',
    value: function _processTab(event) {
      var container = (0, _reactDom.findDOMNode)(this.menuDropRef);
      var items = container.getElementsByTagName('*');
      items = (0, _DOM.filterByFocusable)(items);

      if (!items || items.length === 0) {
        event.preventDefault();
      } else {
        if (event.shiftKey) {
          if (event.target === items[0]) {
            items[items.length - 1].focus();
            event.preventDefault();
          }
        } else if (event.target === items[items.length - 1]) {
          items[0].focus();
          event.preventDefault();
        }
      }
    }
  }, {
    key: '_onUpKeyPress',
    value: function _onUpKeyPress(event) {
      event.preventDefault();
      var container = (0, _reactDom.findDOMNode)(this.navContainerRef);
      var menuItems = container.childNodes;
      if (!this.activeMenuItem) {
        var lastMenuItem = menuItems[menuItems.length - 1];
        this.activeMenuItem = lastMenuItem;
      } else if (this.activeMenuItem.previousSibling) {
        this.activeMenuItem = this.activeMenuItem.previousSibling;
      }

      var classes = this.activeMenuItem.className.split(/\s+/);
      var tagName = this.activeMenuItem.tagName.toLowerCase();
      // want to skip items of the menu that are not focusable.
      if (tagName !== 'button' && tagName !== 'a' && classes.indexOf('check-box') === -1) {
        if (this.activeMenuItem === menuItems[0]) {
          return true;
        } else {
          // If this item is not focusable, check the next item.
          return this._onUpKeyPress(event);
        }
      }

      this.activeMenuItem.focus();
      // Stops KeyboardAccelerators from calling the other listeners.
      // Works limilar to event.stopPropagation().
      return true;
    }
  }, {
    key: '_onDownKeyPress',
    value: function _onDownKeyPress(event) {
      event.preventDefault();
      var container = (0, _reactDom.findDOMNode)(this.navContainerRef);
      var menuItems = container.childNodes;
      if (!this.activeMenuItem) {
        this.activeMenuItem = menuItems[0];
      } else if (this.activeMenuItem.nextSibling) {
        this.activeMenuItem = this.activeMenuItem.nextSibling;
      }

      var classes = this.activeMenuItem.className.split(/\s+/);
      var tagName = this.activeMenuItem.tagName.toLowerCase();
      // want to skip items of the menu that are not focusable.
      if (tagName !== 'button' && tagName !== 'a' && classes.indexOf('check-box') === -1) {
        if (this.activeMenuItem === menuItems[menuItems.length - 1]) {
          return true;
        } else {
          // If this item is not focusable, check the next item.
          return this._onDownKeyPress(event);
        }
      }

      this.activeMenuItem.focus();
      // Stops KeyboardAccelerators from calling the other listeners.
      // Works limilar to event.stopPropagation().
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this,
          _classnames;

      var _props = this.props,
          dropAlign = _props.dropAlign,
          size = _props.size,
          children = _props.children,
          control = _props.control,
          colorIndex = _props.colorIndex,
          onClick = _props.onClick,
          props = _objectWithoutProperties(_props, ['dropAlign', 'size', 'children', 'control', 'colorIndex', 'onClick']);

      var restProps = _Props2.default.omit(props, [].concat(_toConsumableArray(Object.keys(MenuDrop.childContextTypes)), _toConsumableArray(Object.keys(MenuDrop.propTypes))));

      // Put nested Menus inline
      var menuDropChildren = _react2.default.Children.map(children, function (child) {
        var result = child;
        if (child && isFunction(child.type) && child.type.prototype._renderMenuDrop) {
          result = _react2.default.cloneElement(child, { inline: 'expanded', direction: 'column' });
        }
        return result;
      });

      var contents = [_react2.default.createElement(
        _Box2.default,
        _extends({}, restProps, { key: 'nav', ref: function ref(_ref) {
            return _this2.navContainerRef = _ref;
          },
          tag: 'nav', className: CLASS_ROOT + '__contents',
          primary: false }),
        menuDropChildren
      )];

      // do not show the control if menu doesn't overlap with it when expanded
      var showControl = ('top' === dropAlign.top || 'bottom' === dropAlign.bottom) && ('left' === dropAlign.left || 'right' === dropAlign.right);

      if (showControl) {
        contents.unshift(_react2.default.cloneElement(control, { key: 'control', fill: true }));
      }

      if (dropAlign.bottom) {
        contents.reverse();
      }

      var classes = (0, _classnames4.default)(CLASS_ROOT + '__drop', (_classnames = {}, _defineProperty(_classnames, this.props.className + '__drop', this.props.className), _defineProperty(_classnames, CLASS_ROOT + '__drop--align-right', dropAlign.right), _defineProperty(_classnames, CLASS_ROOT + '__drop--' + size, size), _classnames));

      return _react2.default.createElement(
        _Box2.default,
        { ref: function ref(_ref2) {
            return _this2.menuDropRef = _ref2;
          }, className: classes,
          colorIndex: colorIndex, onClick: onClick, focusable: false },
        contents
      );
    }
  }]);

  return MenuDrop;
}(_react.Component);

MenuDrop.displayName = 'MenuDrop';


MenuDrop.propTypes = _extends({
  control: _propTypes2.default.node,
  dropAlign: _Drop.dropAlignPropType,
  dropColorIndex: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired,
  router: _propTypes2.default.any,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large']),
  store: _propTypes2.default.any
}, _Box2.default.propTypes);

MenuDrop.childContextTypes = {
  history: _propTypes2.default.any,
  intl: _propTypes2.default.any,
  router: _propTypes2.default.any,
  store: _propTypes2.default.any
};

var Menu = function (_Component2) {
  _inherits(Menu, _Component2);

  function Menu(props, context) {
    _classCallCheck(this, Menu);

    var _this3 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props, context));

    _this3._onOpen = _this3._onOpen.bind(_this3);
    _this3._onClose = _this3._onClose.bind(_this3);
    _this3._checkOnClose = _this3._checkOnClose.bind(_this3);
    _this3._onSink = _this3._onSink.bind(_this3);
    _this3._onResponsive = _this3._onResponsive.bind(_this3);
    _this3._onFocusControl = _this3._onFocusControl.bind(_this3);
    _this3._onBlurControl = _this3._onBlurControl.bind(_this3);

    var inline = void 0;
    if (props.hasOwnProperty('inline')) {
      inline = props.inline;
    } else {
      inline = !props.label && !props.icon;
    }
    var responsive = void 0;
    if (props.hasOwnProperty('responsive')) {
      responsive = props.responsive;
    } else {
      responsive = inline && 'row' === props.direction;
    }
    _this3.state = {
      // state may be 'collapsed', 'focused' or 'expanded' (active).
      state: 'collapsed',
      initialInline: inline,
      inline: inline,
      responsive: responsive
    };
    return _this3;
  }

  _createClass(Menu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.responsive) {
        this._responsive = _Responsive2.default.start(this._onResponsive);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.inline !== nextProps.inline || this.props.icon !== nextProps.icon) {
        this.setState({
          inline: nextProps.hasOwnProperty('inline') ? nextProps.inline : !nextProps.label && !nextProps.icon
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this4 = this;

      if (this.state.state !== prevState.state) {
        var activeKeyboardHandlers = {
          esc: this._onClose
        };
        var focusedKeyboardHandlers = {
          space: this._onOpen,
          down: this._onOpen,
          enter: this._onOpen
        };

        switch (this.state.state) {
          case 'collapsed':
            _KeyboardAccelerators2.default.stopListeningToKeyboard(this, focusedKeyboardHandlers);
            _KeyboardAccelerators2.default.stopListeningToKeyboard(this, activeKeyboardHandlers);
            document.removeEventListener('click', this._checkOnClose);
            document.removeEventListener('touchstart', this._checkOnClose);
            if (this._drop) {
              // When Menu is used with Anchor/paths the Drop removes too quickly
              // and react looks for a DOM element which is gone. Adding a
              // slight delay resolves this issue.
              setTimeout(function () {
                _this4._drop.remove();
                _this4._drop = undefined;
              }, 5);
            }
            break;
          case 'focused':
            _KeyboardAccelerators2.default.stopListeningToKeyboard(this, activeKeyboardHandlers);
            _KeyboardAccelerators2.default.startListeningToKeyboard(this, focusedKeyboardHandlers);
            break;
          case 'expanded':
            // only add the drop again if the instance is not defined
            // see https://github.com/grommet/grommet/issues/1431
            if (!this._drop) {
              _KeyboardAccelerators2.default.stopListeningToKeyboard(this, focusedKeyboardHandlers);
              _KeyboardAccelerators2.default.startListeningToKeyboard(this, activeKeyboardHandlers);
              document.addEventListener('click', this._checkOnClose);
              document.addEventListener('touchstart', this._checkOnClose);
              this._drop = new _Drop2.default((0, _reactDom.findDOMNode)(this._controlRef), this._renderMenuDrop(), {
                align: this.props.dropAlign,
                colorIndex: this.props.dropColorIndex,
                className: this.props.className && this.props.className + '__drop--container',
                focusControl: true
              });
            }
            break;
        }
      } else if (this.state.state === 'expanded') {
        this._drop.render(this._renderMenuDrop());
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this._checkOnClose);
      document.removeEventListener('touchstart', this._checkOnClose);
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this);
      if (this._drop) {
        this._drop.remove();
      }
      if (this._responsive) {
        this._responsive.stop();
      }
    }
  }, {
    key: '_onOpen',
    value: function _onOpen() {
      if ((0, _reactDom.findDOMNode)(this._controlRef).contains(document.activeElement)) {
        this.setState({ state: 'expanded' });
      }
    }
  }, {
    key: '_onClose',
    value: function _onClose() {
      this.setState({ state: 'collapsed' });
    }
  }, {
    key: '_checkOnClose',
    value: function _checkOnClose(event) {
      var drop = (0, _reactDom.findDOMNode)(this._menuDrop);
      var control = (0, _reactDom.findDOMNode)(this._controlRef);
      if (drop && !drop.contains(event.target) && !control.contains(event.target)) {
        this._onClose();
      }
    }
  }, {
    key: '_onSink',
    value: function _onSink(event) {
      event.stopPropagation();
      // need to go native to prevent closing via document
      event.nativeEvent.stopImmediatePropagation();
    }
  }, {
    key: '_onResponsive',
    value: function _onResponsive(small) {
      // deactivate if we change resolutions
      var newState = this.state.state;
      if (this.state.state === 'expanded') {
        newState = 'focused';
      }
      if (small) {
        this.setState({ inline: false, active: newState, controlCollapsed: true });
      } else {
        this.setState({
          inline: this.state.initialInline,
          active: newState,
          state: 'collapsed',
          controlCollapsed: false
        });
      }
    }
  }, {
    key: '_onFocusControl',
    value: function _onFocusControl() {
      if (this.state.state !== 'focused') {
        this.setState({ state: 'focused' });
      }
    }
  }, {
    key: '_onBlurControl',
    value: function _onBlurControl() {
      if (this.state.state === 'focused') {
        this.setState({ state: 'collapsed' });
      }
    }
  }, {
    key: '_renderButtonProps',
    value: function _renderButtonProps() {
      var _props2 = this.props,
          icon = _props2.icon,
          label = _props2.label;
      // Use default icon if no label or icon is provided

      if (!label && !icon) {
        return { icon: _react2.default.createElement(_More2.default, null) };
      }

      // Return provided label(if any) and provided icon, or default
      // to DropCaretIcon
      return {
        label: label,
        icon: icon || _react2.default.createElement(_Down2.default, { a11yTitle: 'menu-down' })
      };
    }
  }, {
    key: '_renderMenuDrop',
    value: function _renderMenuDrop() {
      var _this5 = this;

      var closeLabel = _Intl2.default.getMessage(this.context.intl, 'Close');
      var menuLabel = _Intl2.default.getMessage(this.context.intl, 'Menu');
      var menuTitle = closeLabel + ' ' + (this.props.a11yTitle || this.props.label || '') + ' ' + ('' + menuLabel);

      var control = _react2.default.createElement(_Button2.default, _extends({ className: CLASS_ROOT + '__control', plain: true,
        a11yTitle: menuTitle, reverse: true
      }, this._renderButtonProps(), { onClick: this._onClose }));

      var boxProps = _Props2.default.pick(this.props, Object.keys(_Box2.default.propTypes));
      var onClick = this.props.closeOnClick ? this._onClose : this._onSink;

      return _react2.default.createElement(
        MenuDrop,
        _extends({}, boxProps, this.context, {
          className: this.props.className,
          dropAlign: this.props.dropAlign,
          size: this.props.size,
          onClick: onClick,
          control: control, ref: function ref(_ref3) {
            return _this5._menuDrop = _ref3;
          } }),
        this.props.children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames2,
          _this6 = this;

      var _props3 = this.props,
          a11yTitle = _props3.a11yTitle,
          children = _props3.children,
          className = _props3.className,
          direction = _props3.direction,
          fill = _props3.fill,
          label = _props3.label,
          primary = _props3.primary,
          size = _props3.size,
          pad = _props3.pad,
          props = _objectWithoutProperties(_props3, ['a11yTitle', 'children', 'className', 'direction', 'fill', 'label', 'primary', 'size', 'pad']);

      delete props.closeOnClick;
      delete props.dropColorIndex;
      delete props.dropAlign;
      delete props.icon;
      delete props.inline;
      var inline = this.state.inline;

      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames2 = {}, _defineProperty(_classnames2, CLASS_ROOT + '--' + direction, direction), _defineProperty(_classnames2, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames2, CLASS_ROOT + '--primary', primary), _defineProperty(_classnames2, CLASS_ROOT + '--inline', inline), _defineProperty(_classnames2, CLASS_ROOT + '--controlled', !inline), _defineProperty(_classnames2, CLASS_ROOT + '__control', !inline), _defineProperty(_classnames2, CLASS_ROOT + '--labelled', !inline && label), _defineProperty(_classnames2, CLASS_ROOT + '--fill', fill), _classnames2), className);

      if (inline) {
        var menuLabel = void 0;
        if ('expanded' === inline) {
          menuLabel = _react2.default.createElement(
            'div',
            { className: CLASS_ROOT + '__label' },
            label
          );
        }

        return _react2.default.createElement(
          _Box2.default,
          _extends({}, props, { pad: pad, direction: direction, tag: 'nav',
            className: classes, primary: false }),
          menuLabel,
          children
        );
      } else {
        var openLabel = _Intl2.default.getMessage(this.context.intl, 'Open');
        var _menuLabel = _Intl2.default.getMessage(this.context.intl, 'Menu');
        var menuTitle = openLabel + ' ' + (a11yTitle || label || '') + ' ' + ('' + _menuLabel);

        return _react2.default.createElement(
          _Box2.default,
          _extends({ ref: function ref(_ref4) {
              return _this6._controlRef = _ref4;
            } }, props, { className: classes }),
          _react2.default.createElement(_Button2.default, _extends({ plain: true, reverse: true,
            a11yTitle: menuTitle }, this._renderButtonProps(), {
            onClick: function onClick() {
              return _this6.setState({
                state: _this6.state.state !== 'expanded' ? 'expanded' : 'collapsed'
              });
            },
            onFocus: this._onFocusControl, onBlur: this._onBlurControl }))
        );
      }
    }
  }]);

  return Menu;
}(_react.Component);

Menu.displayName = 'Menu';
exports.default = Menu;


Menu.propTypes = _extends({
  closeOnClick: _propTypes2.default.bool,
  dropAlign: _Drop.dropAlignPropType,
  dropColorIndex: _propTypes2.default.string,
  icon: _propTypes2.default.node,
  id: _propTypes2.default.string,
  inline: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.oneOf(['expand'])]),
  fill: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large'])
}, _Box2.default.propTypes);

Menu.contextTypes = {
  history: _propTypes2.default.any,
  intl: _propTypes2.default.any,
  router: _propTypes2.default.any,
  store: _propTypes2.default.any
};

Menu.defaultProps = {
  closeOnClick: true,
  direction: 'column',
  dropAlign: { top: 'top', left: 'left' },
  pad: 'none'
};
module.exports = exports['default'];