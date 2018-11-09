"use strict";

exports.__esModule = true;
exports.LayerContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _contexts = require("grommet-icons/contexts");

var _FocusedContainer = require("../FocusedContainer");

var _Keyboard = require("../Keyboard");

var _hocs = require("../hocs");

var _utils = require("../../utils");

var _StyledLayer = require("./StyledLayer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "containerRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "layerRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "makeLayerVisible", function () {
      /* eslint-disable-next-line react/no-find-dom-node */
      var node = (0, _reactDom.findDOMNode)(_this.layerRef.current || _this.containerRef.current);

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
      dark = (0, _utils.backgroundIsDark)(theme.layer.background, theme);
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

    var content = _react.default.createElement(_StyledLayer.StyledContainer, _extends({
      id: id
    }, rest, {
      theme: theme,
      position: position,
      plain: plain,
      responsive: responsive,
      ref: this.containerRef
    }), children);

    if (modal) {
      content = _react.default.createElement(_StyledLayer.StyledLayer, {
        id: id,
        plain: plain,
        position: position,
        theme: theme,
        responsive: responsive,
        tabIndex: "-1",
        ref: this.layerRef
      }, _react.default.createElement(_StyledLayer.StyledOverlay, {
        plain: plain,
        onMouseDown: onClickOutside,
        responsive: responsive,
        theme: theme
      }), content);
    }

    if (onEsc) {
      content = _react.default.createElement(_Keyboard.Keyboard, {
        target: "document",
        onEsc: onEsc
      }, content);
    }

    if (modal) {
      content = _react.default.createElement(_FocusedContainer.FocusedContainer, {
        hidden: position === 'hidden',
        restrictScroll: true
      }, _react.default.createElement(_contexts.ThemeContext.Provider, {
        value: theme.icon
      }, content));
    }

    return content;
  };

  return LayerContainer;
}(_react.Component);

_defineProperty(LayerContainer, "defaultProps", {
  full: false,
  margin: 'none',
  modal: true,
  position: 'center'
});

var LayerContainerWrapper = (0, _hocs.withTheme)(LayerContainer);
exports.LayerContainer = LayerContainerWrapper;