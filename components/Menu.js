// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodashObjectPick = require('lodash/object/pick');

var _lodashObjectPick2 = _interopRequireDefault(_lodashObjectPick);

var _lodashObjectKeys = require('lodash/object/keys');

var _lodashObjectKeys2 = _interopRequireDefault(_lodashObjectKeys);

var _utilsIntl = require('../utils/Intl');

var _utilsIntl2 = _interopRequireDefault(_utilsIntl);

var _utilsKeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _utilsKeyboardAccelerators2 = _interopRequireDefault(_utilsKeyboardAccelerators);

var _utilsDrop = require('../utils/Drop');

var _utilsDrop2 = _interopRequireDefault(_utilsDrop);

var _utilsResponsive = require('../utils/Responsive');

var _utilsResponsive2 = _interopRequireDefault(_utilsResponsive);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _iconsBaseMore = require('./icons/base/More');

var _iconsBaseMore2 = _interopRequireDefault(_iconsBaseMore);

var _iconsBaseDown = require('./icons/base/Down');

var _iconsBaseDown2 = _interopRequireDefault(_iconsBaseDown);

var CLASS_ROOT = "menu";

// We have a separate module for the drop component
// so we can transfer the router context.

var MenuDrop = (function (_Component) {
  _inherits(MenuDrop, _Component);

  function MenuDrop() {
    _classCallCheck(this, MenuDrop);

    _get(Object.getPrototypeOf(MenuDrop.prototype), 'constructor', this).call(this);

    this._onUpKeyPress = this._onUpKeyPress.bind(this);
    this._onDownKeyPress = this._onDownKeyPress.bind(this);
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
      this._keyboardHandlers = {
        up: this._onUpKeyPress,
        down: this._onDownKeyPress
      };
      _utilsKeyboardAccelerators2['default'].startListeningToKeyboard(this, this._keyboardHandlers);
      var menuItems = _reactDom2['default'].findDOMNode(this.refs.navContainer).childNodes;
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
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _utilsKeyboardAccelerators2['default'].stopListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: '_onUpKeyPress',
    value: function _onUpKeyPress(event) {
      event.preventDefault();
      var menuItems = _reactDom2['default'].findDOMNode(this.refs.navContainer).childNodes;
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
      this.refs.menuDrop.setAttribute('aria-activedescendant', this.activeMenuItem.getAttribute('id'));
      // Stops KeyboardAccelerators from calling the other listeners.
      // Works limilar to event.stopPropagation().
      return true;
    }
  }, {
    key: '_onDownKeyPress',
    value: function _onDownKeyPress(event) {
      event.preventDefault();
      var menuItems = _reactDom2['default'].findDOMNode(this.refs.navContainer).childNodes;
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
      this.refs.menuDrop.setAttribute('aria-activedescendant', this.activeMenuItem.getAttribute('id'));
      // Stops KeyboardAccelerators from calling the other listeners.
      // Works limilar to event.stopPropagation().
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT + "__drop"];
      var other = (0, _lodashObjectPick2['default'])(this.props, (0, _lodashObjectKeys2['default'])(_Box2['default'].propTypes));

      var contents = [_react2['default'].cloneElement(this.props.control, { key: 'control' }), _react2['default'].createElement(
        _Box2['default'],
        _extends({ key: 'nav', ref: 'navContainer', tag: 'nav' }, other, {
          className: CLASS_ROOT + '__contents' }),
        this.props.children
      )];
      if (this.props.dropAlign.bottom) {
        contents.reverse();
      }
      if (this.props.dropAlign.right) {
        classes.push(CLASS_ROOT + "__drop--align-right");
      }
      if (this.props.dropColorIndex) {
        classes.push("background-color-index-" + this.props.dropColorIndex);
      }
      if (this.props.size) {
        classes.push(CLASS_ROOT + "__drop--" + this.props.size);
      }

      return _react2['default'].createElement(
        'div',
        { ref: 'menuDrop', id: this.props.id, className: classes.join(' '),
          onClick: this.props.onClick },
        contents
      );
    }
  }]);

  return MenuDrop;
})(_react.Component);

exports['default'] = MenuDrop;

MenuDrop.propTypes = _extends({
  control: _react.PropTypes.node,
  dropAlign: _utilsDrop2['default'].alignPropType,
  dropColorIndex: _react.PropTypes.string,
  id: _react.PropTypes.string.isRequired,
  onClick: _react.PropTypes.func.isRequired,
  router: _react.PropTypes.func,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
}, _Box2['default'].propTypes);

MenuDrop.childContextTypes = {
  intl: _react.PropTypes.object,
  history: _react.PropTypes.object,
  router: _react.PropTypes.func
};

var Menu = (function (_Component2) {
  _inherits(Menu, _Component2);

  function Menu(props) {
    _classCallCheck(this, Menu);

    _get(Object.getPrototypeOf(Menu.prototype), 'constructor', this).call(this, props);

    this._onOpen = this._onOpen.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onSink = this._onSink.bind(this);
    this._onResponsive = this._onResponsive.bind(this);
    this._onFocusControl = this._onFocusControl.bind(this);
    this._onBlurControl = this._onBlurControl.bind(this);

    var inline;
    if (props.hasOwnProperty('inline')) {
      inline = props.inline;
    } else {
      inline = !props.label && !props.icon;
    }
    var responsive;
    if (props.hasOwnProperty('responsive')) {
      responsive = props.responsive;
    } else {
      responsive = inline && 'row' === props.direction;
    }
    this.state = {
      // state may be 'collapsed', 'focused' or 'expanded' (active).
      state: 'collapsed',
      initialInline: inline,
      inline: inline,
      responsive: responsive,
      dropId: 'menuDrop'
    };
  }

  _createClass(Menu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.refs.control) {
        var controlElement = _reactDom2['default'].findDOMNode(this.refs.control);
        this.setState({
          dropId: 'menu-drop-' + controlElement.getAttribute('data-reactid'),
          controlHeight: controlElement.clientHeight
        });
      }

      if (this.state.responsive) {
        this._responsive = _utilsResponsive2['default'].start(this._onResponsive);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.state !== prevState.state) {
        var activeKeyboardHandlers = {
          esc: this._onClose,
          tab: this._onClose
        };
        var focusedKeyboardHandlers = {
          space: this._onOpen,
          down: this._onOpen,
          enter: this._onOpen
        };

        switch (this.state.state) {
          case 'collapsed':
            _utilsKeyboardAccelerators2['default'].stopListeningToKeyboard(this, focusedKeyboardHandlers);
            _utilsKeyboardAccelerators2['default'].stopListeningToKeyboard(this, activeKeyboardHandlers);
            document.removeEventListener('click', this._onClose);
            if (this._drop) {
              this._drop.remove();
              this._drop = null;
            }
            break;
          case 'focused':
            _utilsKeyboardAccelerators2['default'].stopListeningToKeyboard(this, activeKeyboardHandlers);
            _utilsKeyboardAccelerators2['default'].startListeningToKeyboard(this, focusedKeyboardHandlers);
            break;
          case 'expanded':
            _utilsKeyboardAccelerators2['default'].stopListeningToKeyboard(this, focusedKeyboardHandlers);
            _utilsKeyboardAccelerators2['default'].startListeningToKeyboard(this, activeKeyboardHandlers);
            document.addEventListener('click', this._onClose);
            this._drop = _utilsDrop2['default'].add(_reactDom2['default'].findDOMNode(this.refs.control), this._renderDrop(), this.props.dropAlign);
            this._drop.container.focus();
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
      _utilsKeyboardAccelerators2['default'].stopListeningToKeyboard(this);
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
      var element = _reactDom2['default'].findDOMNode(this);
      if (document.activeElement === element) {
        this.setState({ state: 'focused' });
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
    key: '_renderControlContents',
    value: function _renderControlContents(clickable) {
      var icon;
      var label;

      var controlClassName = CLASS_ROOT + "__control";

      if (this.props.icon) {
        icon = _react2['default'].cloneElement(this.props.icon, { key: 'icon' });
        // icon = this.props.icon;
      }
      if (this.state.controlCollapsed) {
        if (!icon) {
          icon = _react2['default'].createElement(_iconsBaseMore2['default'], { key: 'icon' });
        }
      } else if (this.props.label) {
        label = [_react2['default'].createElement(
          'span',
          { key: 'label', className: controlClassName + "-label" },
          this.props.label
        ), _react2['default'].createElement(_iconsBaseDown2['default'], { key: 'caret' })];
      } else if (!icon) {
        icon = _react2['default'].createElement(_iconsBaseMore2['default'], { key: 'icon' });
      }
      return [icon, label];
    }
  }, {
    key: '_renderDrop',
    value: function _renderDrop() {
      var other = (0, _lodashObjectPick2['default'])(this.props, (0, _lodashObjectKeys2['default'])(_Box2['default'].propTypes));

      var control = _react2['default'].createElement(
        _Button2['default'],
        { type: 'icon', className: CLASS_ROOT + "__control",
          style: { lineHeight: this.state.controlHeight + 'px' },
          onClick: this._onClose },
        this._renderControlContents()
      );

      var onClick;
      if (this.props.closeOnClick) {
        onClick = this._onClose;
      } else {
        onClick = this._onSink;
      }
      return _react2['default'].createElement(
        MenuDrop,
        _extends({ tabIndex: '-1',
          intl: this.context.intl,
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
        classes.push(CLASS_ROOT + "--inline");
      } else {
        classes.push(CLASS_ROOT + "--controlled");
        if (this.props.label) {
          classes.push(CLASS_ROOT + "--labelled");
        }
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      if (this.state.inline) {
        var other = (0, _lodashObjectPick2['default'])(this.props, (0, _lodashObjectKeys2['default'])(_Box2['default'].propTypes));

        return _react2['default'].createElement(
          _Box2['default'],
          _extends({ tag: 'nav', id: this.props.id }, other, {
            className: classes.join(' ') }),
          this.props.children
        );
      } else {
        classes.push(CLASS_ROOT + "__control");

        var controlContents = this._renderControlContents();
        var menuTitle = _utilsIntl2['default'].getMessage(this.context.intl, this.props.label || this.props.a11yTitle);

        return _react2['default'].createElement(
          _Button2['default'],
          { ref: 'control', type: 'icon', id: this.props.id,
            className: classes.join(' '),
            tabIndex: '0',
            style: { lineHeight: this.state.controlHeight + 'px' },
            onClick: this._onOpen,
            role: 'link', 'aria-label': menuTitle,
            onFocus: this._onFocusControl,
            onBlur: this._onBlurControl },
          controlContents
        );
      }
    }
  }]);

  return Menu;
})(_react.Component);

Menu.propTypes = _extends({
  a11yTitle: _react.PropTypes.string,
  closeOnClick: _react.PropTypes.bool,
  collapse: _react.PropTypes.bool, // deprecated, remove in 0.5
  dropAlign: _utilsDrop2['default'].alignPropType,
  dropColorIndex: _react.PropTypes.string,
  icon: _react.PropTypes.node,
  id: _react.PropTypes.string,
  inline: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  primary: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
}, _Box2['default'].propTypes);

Menu.contextTypes = {
  intl: _react.PropTypes.object,
  history: _react.PropTypes.object,
  router: _react.PropTypes.func
};

Menu.defaultProps = {
  a11yTitle: 'Menu',
  closeOnClick: true,
  direction: 'column',
  dropAlign: { top: 'top', left: 'left' },
  pad: 'none'
};
module.exports = exports['default'];