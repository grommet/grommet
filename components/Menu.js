'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

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

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.MENU;

function isFunction(obj) {
  return obj && obj.constructor && obj.call && obj.apply;
}

// We have a separate module for the drop component
// so we can transfer the router context.

var MenuDrop = function (_Component) {
  (0, _inherits3.default)(MenuDrop, _Component);

  function MenuDrop(props, context) {
    (0, _classCallCheck3.default)(this, MenuDrop);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MenuDrop.__proto__ || (0, _getPrototypeOf2.default)(MenuDrop)).call(this, props, context));

    _this._onUpKeyPress = _this._onUpKeyPress.bind(_this);
    _this._onDownKeyPress = _this._onDownKeyPress.bind(_this);
    _this._processTab = _this._processTab.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MenuDrop, [{
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
      var container = _reactDom2.default.findDOMNode(this.menuDropRef);
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
      var container = _reactDom2.default.findDOMNode(this.navContainerRef);
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
      var container = _reactDom2.default.findDOMNode(this.navContainerRef);
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
          props = (0, _objectWithoutProperties3.default)(_props, ['dropAlign', 'size', 'children', 'control', 'colorIndex', 'onClick']);

      var restProps = _Props2.default.omit(props, [].concat((0, _toConsumableArray3.default)((0, _keys2.default)(MenuDrop.childContextTypes)), (0, _toConsumableArray3.default)((0, _keys2.default)(MenuDrop.propTypes))));

      // Put nested Menus inline
      var menuDropChildren = _react2.default.Children.map(children, function (child) {
        var result = child;
        if (child && isFunction(child.type) && child.type.prototype._renderMenuDrop) {
          result = _react2.default.cloneElement(child, { inline: 'explode', direction: 'column' });
        }
        return result;
      });

      var contents = [_react2.default.cloneElement(control, { key: 'control', fill: true }), _react2.default.createElement(
        _Box2.default,
        (0, _extends3.default)({}, restProps, { key: 'nav', ref: function ref(_ref) {
            return _this2.navContainerRef = _ref;
          },
          tag: 'nav', className: CLASS_ROOT + '__contents',
          primary: false }),
        menuDropChildren
      )];

      if (dropAlign.bottom) {
        contents.reverse();
      }

      var classes = (0, _classnames4.default)(CLASS_ROOT + '__drop', (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__drop--align-right', dropAlign.right), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__drop--' + size, size), _classnames));

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


MenuDrop.propTypes = (0, _extends3.default)({
  control: _react.PropTypes.node,
  dropAlign: _Drop2.default.alignPropType,
  dropColorIndex: _react.PropTypes.string,
  onClick: _react.PropTypes.func.isRequired,
  router: _react.PropTypes.any,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  store: _react.PropTypes.any
}, _Box2.default.propTypes);

MenuDrop.childContextTypes = {
  history: _react.PropTypes.any,
  intl: _react.PropTypes.any,
  router: _react.PropTypes.any,
  store: _react.PropTypes.any
};

var Menu = function (_Component2) {
  (0, _inherits3.default)(Menu, _Component2);

  function Menu(props, context) {
    (0, _classCallCheck3.default)(this, Menu);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (Menu.__proto__ || (0, _getPrototypeOf2.default)(Menu)).call(this, props, context));

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

  (0, _createClass3.default)(Menu, [{
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
              this._drop.remove();
              this._drop = undefined;
            }
            break;
          case 'focused':
            _KeyboardAccelerators2.default.stopListeningToKeyboard(this, activeKeyboardHandlers);
            _KeyboardAccelerators2.default.startListeningToKeyboard(this, focusedKeyboardHandlers);
            break;
          case 'expanded':
            _KeyboardAccelerators2.default.stopListeningToKeyboard(this, focusedKeyboardHandlers);
            _KeyboardAccelerators2.default.startListeningToKeyboard(this, activeKeyboardHandlers);
            document.addEventListener('click', this._checkOnClose);
            document.addEventListener('touchstart', this._checkOnClose);
            this._drop = _Drop2.default.add(this.controlRef, this._renderMenuDrop(), {
              align: this.props.dropAlign,
              colorIndex: this.props.dropColorIndex,
              focusControl: true
            });
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
      this.setState({ state: 'expanded' });
    }
  }, {
    key: '_onClose',
    value: function _onClose() {
      this.setState({ state: 'collapsed' });
    }
  }, {
    key: '_checkOnClose',
    value: function _checkOnClose(event) {
      var drop = _reactDom2.default.findDOMNode(this._menuDrop);
      if (drop && !drop.contains(event.target)) {
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
      this.setState({ state: 'focused' });
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

      var buttonIcon = void 0,
          buttonLabel = void 0;

      // If this is a collapsed inline Menu, use any icon and/or label provided,
      // revert to default icon if neither.
      if (icon) {
        buttonIcon = icon;
      }
      if (label) {
        buttonLabel = label;
        buttonIcon = _react2.default.createElement(_Down2.default, { a11yTitle: 'menu-down' });
      }
      if (!buttonIcon && !buttonLabel) {
        buttonIcon = _react2.default.createElement(_More2.default, null);
      }
      return { icon: buttonIcon, label: buttonLabel };
    }
  }, {
    key: '_renderMenuDrop',
    value: function _renderMenuDrop() {
      var _this4 = this;

      var closeLabel = _Intl2.default.getMessage(this.context.intl, 'Close');
      var menuLabel = _Intl2.default.getMessage(this.context.intl, 'Menu');
      var menuTitle = closeLabel + ' ' + (this.props.a11yTitle || this.props.label || '') + ' ' + ('' + menuLabel);

      var control = _react2.default.createElement(_Button2.default, (0, _extends3.default)({ className: CLASS_ROOT + '__control', plain: true,
        a11yTitle: menuTitle, reverse: true
      }, this._renderButtonProps(), { onClick: this._onClose }));

      var boxProps = _Props2.default.pick(this.props, (0, _keys2.default)(_Box2.default.propTypes));
      var onClick = this.props.closeOnClick ? this._onClose : this._onSink;

      return _react2.default.createElement(
        MenuDrop,
        (0, _extends3.default)({}, boxProps, this.context, {
          dropAlign: this.props.dropAlign,
          size: this.props.size,
          onClick: onClick,
          control: control, ref: function ref(_ref3) {
            return _this4._menuDrop = _ref3;
          } }),
        this.props.children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames2,
          _this5 = this;

      var _props3 = this.props,
          a11yTitle = _props3.a11yTitle,
          children = _props3.children,
          className = _props3.className,
          direction = _props3.direction,
          label = _props3.label,
          primary = _props3.primary,
          size = _props3.size,
          pad = _props3.pad,
          props = (0, _objectWithoutProperties3.default)(_props3, ['a11yTitle', 'children', 'className', 'direction', 'label', 'primary', 'size', 'pad']);

      delete props.closeOnClick;
      delete props.dropColorIndex;
      delete props.dropAlign;
      delete props.icon;
      delete props.inline;
      var inline = this.state.inline;

      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames2 = {}, (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '--' + direction, direction), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '--primary', primary), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '--inline', inline), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '--controlled', !inline), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '__control', !inline), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '--labelled', !inline && label), _classnames2), className);

      if (inline) {
        var menuLabel = void 0;
        if ('explode' === inline) {
          menuLabel = _react2.default.createElement(
            'div',
            { className: CLASS_ROOT + '__label' },
            label
          );
        }

        return _react2.default.createElement(
          _Box2.default,
          (0, _extends3.default)({}, props, { pad: pad, direction: direction, tag: 'nav',
            className: classes, primary: false }),
          menuLabel,
          children
        );
      } else {
        var openLabel = _Intl2.default.getMessage(this.context.intl, 'Open');
        var _menuLabel = _Intl2.default.getMessage(this.context.intl, 'Menu');
        var menuTitle = openLabel + ' ' + (a11yTitle || label || '') + ' ' + ('' + _menuLabel);
        delete props.colorIndex;

        return _react2.default.createElement(
          'div',
          { ref: function ref(_ref4) {
              return _this5.controlRef = _ref4;
            } },
          _react2.default.createElement(_Button2.default, (0, _extends3.default)({}, props, { className: classes, plain: true, reverse: true,
            a11yTitle: menuTitle }, this._renderButtonProps(), {
            onClick: this._onOpen,
            onFocus: this._onFocusControl, onBlur: this._onBlurControl }))
        );
      }
    }
  }]);
  return Menu;
}(_react.Component);

Menu.displayName = 'Menu';
exports.default = Menu;


Menu.propTypes = (0, _extends3.default)({
  closeOnClick: _react.PropTypes.bool,
  dropAlign: _Drop2.default.alignPropType,
  dropColorIndex: _react.PropTypes.string,
  icon: _react.PropTypes.node,
  id: _react.PropTypes.string,
  inline: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.oneOf(['expand'])]),
  label: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
}, _Box2.default.propTypes);

Menu.contextTypes = {
  history: _react.PropTypes.any,
  intl: _react.PropTypes.any,
  router: _react.PropTypes.any,
  store: _react.PropTypes.any
};

Menu.defaultProps = {
  closeOnClick: true,
  direction: 'column',
  dropAlign: { top: 'top', left: 'left' },
  pad: 'none'
};
module.exports = exports['default'];