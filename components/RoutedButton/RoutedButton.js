"use strict";

exports.__esModule = true;
exports.RoutedButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = require("../Button");

var _excluded = ["href", "path", "method", "onClick"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RoutedButton = /*#__PURE__*/function (_Component) {
  _inheritsLoose(RoutedButton, _Component);

  function RoutedButton() {
    var _this;

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(_args)) || this;

    _this.onClick = function (event) {
      var _this$props = _this.props,
          method = _this$props.method,
          onClick = _this$props.onClick,
          path = _this$props.path;
      var router = _this.context.router;

      if (event) {
        var modifierKey = event.ctrlKey || event.metaKey; // if the user right-clicked in the button we should let it go

        if (modifierKey) {
          return;
        }
      }

      if (router) {
        event.preventDefault();
        (router.history || router)[method](path);
      }

      if (onClick) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        onClick.apply(void 0, [event].concat(args));
      }
    };

    return _this;
  }

  var _proto = RoutedButton.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        href = _this$props2.href,
        path = _this$props2.path,
        method = _this$props2.method,
        onClick = _this$props2.onClick,
        rest = _objectWithoutPropertiesLoose(_this$props2, _excluded);

    if (process.env.NODE_ENV !== 'production') {
      console.warn("This component will be deprecated in the upcoming releases.\n         Please refer to https://github.com/grommet/grommet/issues/2855\n         for more information.");
    }

    return /*#__PURE__*/_react["default"].createElement(_Button.Button, _extends({}, rest, {
      href: path || href,
      disabled: !path && !onClick,
      onClick: this.onClick
    }));
  };

  return RoutedButton;
}(_react.Component);

exports.RoutedButton = RoutedButton;
RoutedButton.contextTypes = {
  router: _propTypes["default"].shape({}).isRequired
};
RoutedButton.defaultProps = {
  method: 'push'
};