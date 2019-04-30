"use strict";

exports.__esModule = true;
exports.Menu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _DropButton = require("../DropButton");

var _Keyboard = require("../Keyboard");

var _Text = require("../Text");

var _hocs = require("../hocs");

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ContainerBox = (0, _styledComponents.default)(_Box.Box).withConfig({
  displayName: "Menu__ContainerBox",
  componentId: "sc-17fcys9-0"
})(["max-height:inherit;@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}", ";"], function (props) {
  return props.theme.menu.extend;
});

var Menu =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Menu, _Component);

  function Menu(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "buttonRefs", {});

    _defineProperty(_assertThisInitialized(_this), "onDropClose", function () {
      _this.setState({
        activeItemIndex: -1,
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectMenuItem", function (event) {
      var activeItemIndex = _this.state.activeItemIndex;

      if (activeItemIndex >= 0) {
        event.preventDefault();
        event.stopPropagation();

        _this.buttonRefs[activeItemIndex].click();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNextMenuItem", function (event) {
      event.preventDefault();
      var _this$state = _this.state,
          activeItemIndex = _this$state.activeItemIndex,
          open = _this$state.open;

      if (!open) {
        _this.setState({
          open: true,
          activeItemIndex: -1
        });
      } else {
        var items = _this.props.items;
        var index = Math.min(activeItemIndex + 1, items.length - 1);

        _this.setState({
          activeItemIndex: index
        }); // this.setState({ activeSuggestionIndex: index },
        //   this._announceSuggestion.bind(this, index));

      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPreviousMenuItem", function (event) {
      event.preventDefault();
      var _this$state2 = _this.state,
          activeItemIndex = _this$state2.activeItemIndex,
          open = _this$state2.open;

      if (!open) {
        _this.setState({
          open: true,
          activeItemIndex: -1
        });
      } else {
        var items = _this.props.items;
        var index = activeItemIndex === -1 ? items.length - 1 : Math.max(activeItemIndex - 1, 0);

        _this.setState({
          activeItemIndex: index
        }); // this.setState({ activeSuggestionIndex: index },
        //   this._announceSuggestion.bind(this, index));

      }
    });

    _this.state = {
      activeItemIndex: -1,
      open: props.open || false
    };
    return _this;
  }

  var _proto = Menu.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        children = _this$props.children,
        disabled = _this$props.disabled,
        dropAlign = _this$props.dropAlign,
        dropBackground = _this$props.dropBackground,
        dropProps = _this$props.dropProps,
        dropTarget = _this$props.dropTarget,
        forwardRef = _this$props.forwardRef,
        justifyContent = _this$props.justifyContent,
        icon = _this$props.icon,
        items = _this$props.items,
        label = _this$props.label,
        messages = _this$props.messages,
        onKeyDown = _this$props.onKeyDown,
        plain = _this$props.plain,
        size = _this$props.size,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "disabled", "dropAlign", "dropBackground", "dropProps", "dropTarget", "forwardRef", "justifyContent", "icon", "items", "label", "messages", "onKeyDown", "plain", "size", "theme"]);

    var _this$state3 = this.state,
        activeItemIndex = _this$state3.activeItemIndex,
        open = _this$state3.open;
    var MenuIcon = theme.menu.icons.down;
    var iconColor = (0, _utils.normalizeColor)('control', theme);

    var content = children || _react.default.createElement(_Box.Box, {
      direction: "row",
      justify: justifyContent,
      align: "center",
      pad: "small",
      gap: label && icon !== false ? 'small' : undefined
    }, _react.default.createElement(_Text.Text, {
      size: size
    }, label), icon !== false ? icon !== true && icon || _react.default.createElement(MenuIcon, {
      color: iconColor,
      size: size
    }) : null);

    var controlMirror = _react.default.createElement(_Box.Box, {
      flex: false
    }, _react.default.createElement(_Button.Button, {
      a11yTitle: messages.closeMenu || 'Close Menu',
      plain: plain,
      onClick: this.onDropClose
    }, typeof content === 'function' ? function (props) {
      return content(_extends({}, props, {
        drop: true
      }));
    } : content));

    var align = dropProps.align || dropAlign;
    return _react.default.createElement(_Keyboard.Keyboard, {
      onEnter: this.onSelectMenuItem,
      onSpace: this.onSelectMenuItem,
      onDown: this.onNextMenuItem,
      onUp: this.onPreviousMenuItem,
      onEsc: this.onDropClose,
      onTab: this.onDropClose,
      onKeyDown: onKeyDown
    }, _react.default.createElement(_DropButton.DropButton, _extends({
      ref: forwardRef
    }, rest, {
      a11yTitle: messages.openMenu || 'Open Menu',
      disabled: disabled,
      dropAlign: align,
      dropTarget: dropTarget,
      plain: plain,
      open: open,
      onOpen: function onOpen() {
        return _this2.setState({
          open: true
        });
      },
      onClose: function onClose() {
        return _this2.setState({
          open: false
        });
      },
      dropContent: _react.default.createElement(ContainerBox, {
        background: dropBackground || theme.menu.background
      }, align.top === 'top' ? controlMirror : undefined, _react.default.createElement(_Box.Box, {
        overflow: "auto"
      }, items.map(function (item, index) {
        return (// eslint-disable-next-line react/no-array-index-key
          _react.default.createElement(_Box.Box, {
            key: index,
            flex: false
          }, _react.default.createElement(_Button.Button, {
            ref: function ref(_ref) {
              _this2.buttonRefs[index] = _ref;
            },
            active: activeItemIndex === index,
            hoverIndicator: "background",
            disabled: item.disabled,
            onClick: function onClick() {
              item.onClick.apply(item, arguments);

              if (item.close !== false) {
                _this2.onDropClose();
              }
            },
            href: item.href
          }, _react.default.createElement(_Box.Box, {
            align: "start",
            pad: "small",
            direction: "row"
          }, item.icon, item.label)))
        );
      })), align.bottom === 'bottom' ? controlMirror : undefined)
    }), content));
  };

  return Menu;
}(_react.Component);

_defineProperty(Menu, "defaultProps", {
  dropAlign: {
    top: 'top',
    left: 'left'
  },
  dropProps: {},
  items: [],
  messages: {
    openMenu: 'Open Menu',
    closeMenu: 'Close Menu'
  },
  justifyContent: 'start'
});

Object.setPrototypeOf(Menu.defaultProps, _defaultProps.defaultProps);
var MenuDoc;

if (process.env.NODE_ENV !== 'production') {
  MenuDoc = require('./doc').doc(Menu); // eslint-disable-line global-require
}

var MenuWrapper = (0, _recompose.compose)(_styledComponents.withTheme, _hocs.withForwardRef)(MenuDoc || Menu);
exports.Menu = MenuWrapper;