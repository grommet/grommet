'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _pick = require('lodash/object/pick');

var _pick2 = _interopRequireDefault(_pick);

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Drop = require('../utils/Drop');

var _Drop2 = _interopRequireDefault(_Drop);

var _Responsive = require('../utils/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _More = require('./icons/base/More');

var _More2 = _interopRequireDefault(_More);

var _Down = require('./icons/base/Down');

var _Down2 = _interopRequireDefault(_Down);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _DOM = require('../utils/DOM');

var _DOM2 = _interopRequireDefault(_DOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'menu';

// We have a separate module for the drop component
// so we can transfer the router context.

var MenuDrop = (function (_Component) {
  _inherits(MenuDrop, _Component);

  function MenuDrop() {
    _classCallCheck(this, MenuDrop);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuDrop).call(this));

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
        router: this.props.router
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

      var container = _reactDom2.default.findDOMNode(this.refs.navContainer);
      var menuItems = container.childNodes;
      for (var i = 0; i < menuItems.length; i++) {
        var classes = menuItems[i].className.toString();
        var tagName = menuItems[i].tagName.toLowerCase();
        // want to skip items of the menu that are not focusable.
        if (tagName !== 'button' && tagName !== 'a' && classes.indexOf('check-box') === -1) {
          continue;
        }
        menuItems[i].setAttribute('role', 'menuitem');

        if (!menuItems[i].getAttribute('id')) {
          menuItems[i].setAttribute('id', menuItems[i].getAttribute('data-reactid'));
        }
      }

      container.setAttribute('aria-activedescendant', menuItems[0].getAttribute('id'));

      var menuDrop = _reactDom2.default.findDOMNode(this.refs.menuDrop);
      var items = menuDrop.getElementsByTagName('*');
      var firstFocusable = _DOM2.default.getBestFirstFocusable(items);
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._originalFocusedElement.focus();
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: '_processTab',
    value: function _processTab(event) {
      var container = _reactDom2.default.findDOMNode(this.refs.menuDrop);
      var items = container.getElementsByTagName('*');
      items = _DOM2.default.filterByFocusable(items);

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
      var container = _reactDom2.default.findDOMNode(this.refs.navContainer);
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
      container.setAttribute('aria-activedescendant', this.activeMenuItem.getAttribute('id'));
      // Stops KeyboardAccelerators from calling the other listeners.
      // Works limilar to event.stopPropagation().
      return true;
    }
  }, {
    key: '_onDownKeyPress',
    value: function _onDownKeyPress(event) {
      event.preventDefault();
      var container = _reactDom2.default.findDOMNode(this.refs.navContainer);
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
      container.setAttribute('aria-activedescendant', this.activeMenuItem.getAttribute('id'));
      // Stops KeyboardAccelerators from calling the other listeners.
      // Works limilar to event.stopPropagation().
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT + '__drop'];
      var other = (0, _pick2.default)(this.props, (0, _keys2.default)(_Box2.default.propTypes));

      delete other.onClick;

      var contents = [_react2.default.cloneElement(this.props.control, { key: 'control' }), _react2.default.createElement(
        _Box2.default,
        _extends({ key: 'nav', ref: 'navContainer',
          role: 'menu', tag: 'nav' }, other, { className: CLASS_ROOT + '__contents' }),
        this.props.children
      )];
      if (this.props.dropAlign.bottom) {
        contents.reverse();
      }
      if (this.props.dropAlign.right) {
        classes.push(CLASS_ROOT + '__drop--align-right');
      }
      if (this.props.dropColorIndex) {
        classes.push('background-color-index-' + this.props.dropColorIndex);
      }
      if (this.props.size) {
        classes.push(CLASS_ROOT + '__drop--' + this.props.size);
      }

      return _react2.default.createElement(
        'div',
        { ref: 'menuDrop', id: this.props.id, className: classes.join(' '),
          onClick: this.props.onClick },
        contents
      );
    }
  }]);

  return MenuDrop;
})(_react.Component);

MenuDrop.propTypes = _extends({
  control: _react.PropTypes.node,
  dropAlign: _Drop2.default.alignPropType,
  dropColorIndex: _react.PropTypes.string,
  id: _react.PropTypes.string.isRequired,
  onClick: _react.PropTypes.func.isRequired,
  router: _react.PropTypes.func,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
}, _Box2.default.propTypes);

MenuDrop.childContextTypes = {
  intl: _react.PropTypes.object,
  history: _react.PropTypes.object,
  router: _react.PropTypes.func
};

var Menu = (function (_Component2) {
  _inherits(Menu, _Component2);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this, props));

    _this2._onOpen = _this2._onOpen.bind(_this2);
    _this2._onClose = _this2._onClose.bind(_this2);
    _this2._onSink = _this2._onSink.bind(_this2);
    _this2._onResponsive = _this2._onResponsive.bind(_this2);
    _this2._onFocusControl = _this2._onFocusControl.bind(_this2);
    _this2._onBlurControl = _this2._onBlurControl.bind(_this2);

    var inline = undefined;
    if (props.hasOwnProperty('inline')) {
      inline = props.inline;
    } else {
      inline = !props.label && !props.icon;
    }
    var responsive = undefined;
    if (props.hasOwnProperty('responsive')) {
      responsive = props.responsive;
    } else {
      responsive = inline && 'row' === props.direction;
    }
    _this2.state = {
      // state may be 'collapsed', 'focused' or 'expanded' (active).
      state: 'collapsed',
      initialInline: inline,
      inline: inline,
      responsive: responsive,
      dropId: 'menuDrop'
    };
    return _this2;
  }

  _createClass(Menu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.refs.control) {
        var controlElement = _reactDom2.default.findDOMNode(this.refs.control);
        this.setState({
          dropId: 'menu-drop-' + controlElement.getAttribute('data-reactid'),
          controlHeight: controlElement.clientHeight
        });
      }

      if (this.state.responsive) {
        this._responsive = _Responsive2.default.start(this._onResponsive);
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
            document.removeEventListener('click', this._onClose);
            if (this._drop) {
              this._drop.remove();
              this._drop = null;
            }
            break;
          case 'focused':
            _KeyboardAccelerators2.default.stopListeningToKeyboard(this, activeKeyboardHandlers);
            _KeyboardAccelerators2.default.startListeningToKeyboard(this, focusedKeyboardHandlers);
            break;
          case 'expanded':
            _KeyboardAccelerators2.default.stopListeningToKeyboard(this, focusedKeyboardHandlers);
            _KeyboardAccelerators2.default.startListeningToKeyboard(this, activeKeyboardHandlers);
            document.addEventListener('click', this._onClose);
            this._drop = _Drop2.default.add(_reactDom2.default.findDOMNode(this.refs.control), this._renderDrop(), this.props.dropAlign);
            this._drop.render(this._renderDrop());
            break;
        }
      } else if (this.state.state === 'expanded') {
        this._drop.render(this._renderDrop());
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this._onClose);
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
    key: '_renderControlContents',
    value: function _renderControlContents(clickable) {
      var icon = undefined;
      var label = undefined;

      var controlClassName = CLASS_ROOT + '__control';

      if (this.props.icon) {
        icon = _react2.default.cloneElement(this.props.icon, { key: 'icon' });
        // icon = this.props.icon;
      }
      if (this.state.controlCollapsed) {
        if (!icon) {
          icon = _react2.default.createElement(_More2.default, { key: 'icon' });
        }
      } else if (this.props.label) {
        label = [_react2.default.createElement(
          'span',
          { key: 'label', className: controlClassName + "-label" },
          this.props.label
        ), _react2.default.createElement(_Down2.default, { key: 'caret' })];
      } else if (!icon) {
        icon = _react2.default.createElement(_More2.default, { key: 'icon' });
      }
      return [icon, label];
    }
  }, {
    key: '_renderDrop',
    value: function _renderDrop() {
      var other = (0, _pick2.default)(this.props, (0, _keys2.default)(_Box2.default.propTypes));

      var closeLabel = _Intl2.default.getMessage(this.context.intl, 'Close');
      var menuLabel = _Intl2.default.getMessage(this.context.intl, 'Menu');
      var menuTitle = closeLabel + ' ' + (this.props.a11yTitle || this.props.label || '') + ' ' + menuLabel;

      var control = _react2.default.createElement(
        _Button2.default,
        { type: 'icon', className: CLASS_ROOT + '__control',
          a11yTitle: menuTitle,
          style: { lineHeight: this.state.controlHeight + 'px' },
          onClick: this._onClose },
        this._renderControlContents()
      );

      var onClick = undefined;
      if (this.props.closeOnClick) {
        onClick = this._onClose;
      } else {
        onClick = this._onSink;
      }
      return _react2.default.createElement(
        MenuDrop,
        _extends({ intl: this.context.intl,
          history: this.context.history,
          router: this.context.router,
          dropAlign: this.props.dropAlign,
          dropColorIndex: this.props.dropColorIndex,
          size: this.state.size
        }, other, {
          onClick: onClick,
          id: this.state.dropId,
          control: control }),
        this.props.children
      );
    }
  }, {
    key: '_classes',
    value: function _classes(prefix) {
      var classes = [prefix];

      if (this.props.direction) {
        classes.push(prefix + "--" + this.props.direction);
      }
      if (this.state.size) {
        classes.push(prefix + "--" + this.state.size);
      }
      if (this.props.primary) {
        classes.push(prefix + "--primary");
      }

      return classes;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = this._classes(CLASS_ROOT);
      if (this.state.inline) {
        classes.push(CLASS_ROOT + '--inline');
      } else {
        classes.push(CLASS_ROOT + '--controlled');
        if (this.props.label) {
          classes.push(CLASS_ROOT + '--labelled');
        }
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      if (this.state.inline) {
        var other = (0, _pick2.default)(this.props, (0, _keys2.default)(_Box2.default.propTypes));

        return _react2.default.createElement(
          _Box2.default,
          _extends({ tag: 'nav', id: this.props.id }, other, {
            className: classes.join(' ') }),
          this.props.children
        );
      } else {
        classes.push(CLASS_ROOT + '__control');

        var controlContents = this._renderControlContents();
        var openLabel = _Intl2.default.getMessage(this.context.intl, 'Open');
        var menuLabel = _Intl2.default.getMessage(this.context.intl, 'Menu');
        var menuTitle = openLabel + ' ' + (this.props.a11yTitle || this.props.label || '') + ' ' + menuLabel;

        return _react2.default.createElement(
          _Button2.default,
          { ref: 'control', type: 'icon', id: this.props.id,
            className: classes.join(' '),
            tabIndex: '0',
            style: { lineHeight: this.state.controlHeight + 'px' },
            onClick: this._onOpen,
            a11yTitle: menuTitle,
            onFocus: this._onFocusControl,
            onBlur: this._onBlurControl },
          controlContents
        );
      }
    }
  }]);

  return Menu;
})(_react.Component);

exports.default = Menu;

Menu.propTypes = _extends({
  closeOnClick: _react.PropTypes.bool,
  dropAlign: _Drop2.default.alignPropType,
  dropColorIndex: _react.PropTypes.string,
  icon: _react.PropTypes.node,
  id: _react.PropTypes.string,
  inline: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  primary: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
}, _Box2.default.propTypes);

Menu.contextTypes = {
  intl: _react.PropTypes.object,
  history: _react.PropTypes.object,
  router: _react.PropTypes.func
};

Menu.defaultProps = {
  closeOnClick: true,
  direction: 'column',
  dropAlign: { top: 'top', left: 'left' },
  pad: 'none'
};
module.exports = exports['default'];