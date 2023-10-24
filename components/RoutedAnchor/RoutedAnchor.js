"use strict";

exports.__esModule = true;
exports.RoutedAnchor = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Anchor = require("../Anchor");
var _excluded = ["path", "method"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var RoutedAnchor = exports.RoutedAnchor = /*#__PURE__*/function (_Component) {
  _inheritsLoose(RoutedAnchor, _Component);
  function RoutedAnchor() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = RoutedAnchor.prototype;
  _proto.render = function render() {
    var _this = this;
    var _this$props = this.props,
      path = _this$props.path,
      method = _this$props.method,
      rest = _objectWithoutPropertiesLoose(_this$props, _excluded);
    if (process.env.NODE_ENV !== 'production') {
      console.warn("This component will be deprecated in the upcoming releases. \n        Please refer to https://github.com/grommet/grommet/issues/2855 \n        for more information.");
    }
    return /*#__PURE__*/_react["default"].createElement(_Anchor.Anchor, _extends({}, rest, {
      href: path,
      onClick: function onClick(event) {
        var onClick = _this.props.onClick;
        var router = _this.context.router;
        if (event) {
          var modifierKey = event.ctrlKey || event.metaKey;

          // if the user right-clicked in the Anchor we should let it go
          if (modifierKey) {
            return;
          }
        }
        if (router) {
          event.preventDefault();
          (router.history || router)[method](path);
        }
        if (onClick) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          onClick.apply(void 0, [event].concat(args));
        }
      }
    }));
  };
  return RoutedAnchor;
}(_react.Component);
RoutedAnchor.contextTypes = {
  router: _propTypes["default"].shape({}).isRequired
};
RoutedAnchor.defaultProps = {
  method: 'push'
};