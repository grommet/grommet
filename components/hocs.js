"use strict";

exports.__esModule = true;
exports.withIconTheme = exports.withAnnounce = exports.withForwardRef = exports.withTheme = exports.withFocus = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _getDisplayName = _interopRequireDefault(require("recompose/getDisplayName"));

var _contexts = require("grommet-icons/contexts");

var _contexts2 = require("../contexts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withFocus = function withFocus(WrappedComponent) {
  var FocusableComponent =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(FocusableComponent, _Component);

    function FocusableComponent() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _Component.call.apply(_Component, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mouseActive", false);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        focus: false,
        wrappedRef: _react.default.createRef()
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
        var wrappedRef = _this.state.wrappedRef;
        window.addEventListener('mousedown', _this.handleActiveMouse); // we could be using onFocus in the wrapper node itself
        // but react does not invoke it if you programically
        // call wrapperNode.focus() inside componentWillUnmount
        // see Drop "this.originalFocusedElement.focus();" for reference

        /* eslint-disable-next-line react/no-find-dom-node */

        var wrapperNode = (0, _reactDom.findDOMNode)(wrappedRef.current);

        if (wrapperNode && wrapperNode.addEventListener) {
          wrapperNode.addEventListener('focus', _this.setFocus);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillUnmount", function () {
        var wrappedRef = _this.state.wrappedRef;
        window.removeEventListener('mousedown', _this.handleActiveMouse);
        /* eslint-disable-next-line react/no-find-dom-node */

        var wrapperNode = (0, _reactDom.findDOMNode)(wrappedRef.current);

        if (wrapperNode && wrapperNode.addEventListener) {
          wrapperNode.removeEventListener('focus', _this.setFocus);
        }

        clearTimeout(_this.focusTimer);
        clearTimeout(_this.mouseTimer);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleActiveMouse", function () {
        // from https://marcysutton.com/button-focus-hell/
        _this.mouseActive = true; // this avoids showing focus when clicking around

        clearTimeout(_this.mouseTimer); // empirical number to reset mouseActive after
        // some time has passed without mousedown

        _this.mouseTimer = setTimeout(function () {
          _this.mouseActive = false;
        }, 150);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setFocus", function () {
        // delay setting focus to avoid interupting events,
        // 1ms was chosen empirically based on ie11 using Select and TextInput
        // with and without a FormField.
        clearTimeout(_this.focusTimer);
        _this.focusTimer = setTimeout(function () {
          var focus = _this.state.focus;

          if (!focus && !_this.mouseActive) {
            _this.setState({
              focus: true
            });
          }
        }, 1);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "resetFocus", function () {
        clearTimeout(_this.focusTimer);
        _this.focusTimer = setTimeout(function () {
          var focus = _this.state.focus;

          if (focus) {
            _this.setState({
              focus: false
            });
          }
        }, 1);
      });

      return _this;
    }

    FocusableComponent.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
      var withFocusRef = nextProps.withFocusRef;
      var wrappedRef = prevState.wrappedRef;
      var nextWrappedRef = withFocusRef || wrappedRef;

      if (nextWrappedRef !== wrappedRef) {
        return {
          wrappedRef: nextWrappedRef
        };
      }

      return null;
    };

    var _proto = FocusableComponent.prototype;

    _proto.render = function render() {
      var _this2 = this;

      var _this$props = this.props,
          _onFocus = _this$props.onFocus,
          _onBlur = _this$props.onBlur,
          withFocusRef = _this$props.withFocusRef,
          rest = _objectWithoutPropertiesLoose(_this$props, ["onFocus", "onBlur", "withFocusRef"]);

      var _this$state = this.state,
          focus = _this$state.focus,
          wrappedRef = _this$state.wrappedRef;
      return _react.default.createElement(WrappedComponent, _extends({
        ref: wrappedRef,
        focus: focus
      }, rest, {
        onFocus: function onFocus(event) {
          _this2.setFocus();

          if (_onFocus) {
            _onFocus(event);
          }
        },
        onBlur: function onBlur(event) {
          _this2.resetFocus();

          if (_onBlur) {
            _onBlur(event);
          }
        }
      }));
    };

    return FocusableComponent;
  }(_react.Component);

  var ForwardRef = _react.default.forwardRef(function (props, ref) {
    return _react.default.createElement(FocusableComponent, _extends({}, props, {
      withFocusRef: ref
    }));
  });

  ForwardRef.displayName = (0, _getDisplayName.default)(WrappedComponent);
  ForwardRef.name = ForwardRef.displayName;
  return ForwardRef;
};

exports.withFocus = withFocus;

var withTheme = function withTheme(WrappedComponent) {
  var ThemedComponent =
  /*#__PURE__*/
  function (_Component2) {
    _inheritsLoose(ThemedComponent, _Component2);

    function ThemedComponent() {
      return _Component2.apply(this, arguments) || this;
    }

    var _proto2 = ThemedComponent.prototype;

    _proto2.render = function render() {
      var _this$props2 = this.props,
          withThemeRef = _this$props2.withThemeRef,
          theme = _this$props2.theme,
          rest = _objectWithoutPropertiesLoose(_this$props2, ["withThemeRef", "theme"]);

      return _react.default.createElement(WrappedComponent, _extends({
        ref: withThemeRef
      }, rest, {
        theme: theme
      }));
    };

    return ThemedComponent;
  }(_react.Component);

  var ForwardRef = _react.default.forwardRef(function (props, ref) {
    return _react.default.createElement(_contexts2.ThemeContext.Consumer, null, function (theme) {
      return _react.default.createElement(ThemedComponent, _extends({}, props, {
        theme: theme,
        withThemeRef: ref
      }));
    });
  });

  ForwardRef.displayName = (0, _getDisplayName.default)(WrappedComponent);
  ForwardRef.name = ForwardRef.displayName;
  return ForwardRef;
};

exports.withTheme = withTheme;

var withForwardRef = function withForwardRef(WrappedComponent) {
  var ForwardRefComponent = _react.default.forwardRef(function (props, ref) {
    return _react.default.createElement(WrappedComponent, _extends({
      forwardRef: ref
    }, props));
  });

  ForwardRefComponent.displayName = (0, _getDisplayName.default)(WrappedComponent);
  ForwardRefComponent.name = ForwardRefComponent.displayName;
  return ForwardRefComponent;
};

exports.withForwardRef = withForwardRef;

var withAnnounce = function withAnnounce(WrappedComponent) {
  var ForwardRef = _react.default.forwardRef(function (props, ref) {
    return _react.default.createElement(_contexts2.AnnounceContext.Consumer, null, function (announce) {
      return _react.default.createElement(WrappedComponent, _extends({}, props, {
        announce: announce,
        ref: ref
      }));
    });
  });

  ForwardRef.displayName = (0, _getDisplayName.default)(WrappedComponent);
  ForwardRef.name = ForwardRef.displayName;
  return ForwardRef;
};

exports.withAnnounce = withAnnounce;

var withIconTheme = function withIconTheme(WrappedComponent) {
  var IconThemeComponent = function IconThemeComponent(props) {
    return _react.default.createElement(_contexts.ThemeContext.Consumer, null, function (iconTheme) {
      return _react.default.createElement(WrappedComponent, _extends({}, props, {
        iconTheme: iconTheme
      }));
    });
  };

  IconThemeComponent.displayName = (0, _getDisplayName.default)(WrappedComponent);
  return IconThemeComponent;
};

exports.withIconTheme = withIconTheme;