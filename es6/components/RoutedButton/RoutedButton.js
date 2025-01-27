var _excluded = ["href", "path", "method", "onClick"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
import React, { Component } from 'react';
import { RouterContext } from './RouterContext';
import { Button } from '../Button';
var RoutedButton = /*#__PURE__*/function (_Component) {
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
      var router = _this.context;
      if (event) {
        var modifierKey = event.ctrlKey || event.metaKey;

        // if the user right-clicked in the button we should let it go
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
  _inheritsLoose(RoutedButton, _Component);
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
    return /*#__PURE__*/React.createElement(Button, _extends({}, rest, {
      href: path || href,
      disabled: !path && !onClick,
      onClick: this.onClick
    }));
  };
  return RoutedButton;
}(Component);
RoutedButton.contextType = RouterContext;
RoutedButton.defaultProps = {
  method: 'push'
};
export { RoutedButton };