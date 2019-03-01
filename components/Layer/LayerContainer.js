"use strict";

exports.__esModule = true;
exports.LayerContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _defaultProps = require("../../default-props");

var _contexts = require("../../contexts");

var _FocusedContainer = require("../FocusedContainer");

var _Keyboard = require("../Keyboard");

var _utils = require("../../utils");

var _StyledLayer = require("./StyledLayer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HiddenAnchor = _styledComponents.default.a.withConfig({
  displayName: "LayerContainer__HiddenAnchor",
  componentId: "sc-1srj14c-0"
})(["width:0;height:0;overflow:hidden;position:absolute;"]);

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

    _defineProperty(_assertThisInitialized(_this), "anchorRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "containerRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "layerRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "makeLayerVisible", function () {
      var node = _this.layerRef.current || _this.containerRef.current;

      if (node && node.scrollIntoView) {
        node.scrollIntoView();
      }
    });

    return _this;
  }

  var _proto = LayerContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var position = this.props.position;

    if (position !== 'hidden') {
      this.makeLayerVisible(); // once layer is open we set the focus in the hidden
      // anchor so that you can start tabbing inside the layer

      if (this.anchorRef.current) {
        this.anchorRef.current.focus();
      }
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

    var theme = this.context || propsTheme;

    var content = _react.default.createElement(_StyledLayer.StyledContainer, _extends({
      id: id
    }, rest, {
      position: position,
      plain: plain,
      responsive: responsive,
      ref: this.containerRef
    }), _react.default.createElement(HiddenAnchor, {
      ref: this.anchorRef,
      tabIndex: "-1",
      "aria-hidden": "true"
    }), children);

    if (modal) {
      content = _react.default.createElement(_StyledLayer.StyledLayer, {
        id: id,
        plain: plain,
        position: position,
        responsive: responsive,
        tabIndex: "-1",
        ref: this.layerRef
      }, _react.default.createElement(_StyledLayer.StyledOverlay, {
        plain: plain,
        onMouseDown: onClickOutside,
        responsive: responsive
      }), content);
      /* eslint-enable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */
    }

    if (onEsc) {
      content = _react.default.createElement(_Keyboard.Keyboard, {
        onEsc: onEsc
      }, content);
    }

    if (theme.layer.background) {
      var dark = (0, _utils.backgroundIsDark)(theme.layer.background, theme);

      if (dark !== theme.dark) {
        content = _react.default.createElement(_contexts.ThemeContext.Provider, {
          value: _extends({}, theme, {
            dark: dark
          })
        }, content);
      }
    }

    if (modal) {
      content = _react.default.createElement(_FocusedContainer.FocusedContainer, {
        hidden: position === 'hidden',
        restrictScroll: true
      }, content);
    }

    return content;
  };

  return LayerContainer;
}(_react.Component);

exports.LayerContainer = LayerContainer;

_defineProperty(LayerContainer, "contextType", _contexts.ThemeContext);

_defineProperty(LayerContainer, "defaultProps", {
  full: false,
  margin: 'none',
  modal: true,
  position: 'center'
});

Object.setPrototypeOf(LayerContainer.defaultProps, _defaultProps.defaultProps);