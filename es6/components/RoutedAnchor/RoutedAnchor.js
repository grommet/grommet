var _excluded = ["path", "method"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
import React, { Component } from 'react';
import { RouterContext } from './RouterContext';
import { Anchor } from '../Anchor';
var RoutedAnchor = /*#__PURE__*/function (_Component) {
  function RoutedAnchor() {
    return _Component.apply(this, arguments) || this;
  }
  _inheritsLoose(RoutedAnchor, _Component);
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
    return /*#__PURE__*/React.createElement(Anchor, _extends({}, rest, {
      href: path,
      onClick: function onClick(event) {
        var onClick = _this.props.onClick;
        var router = _this.context;
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
}(Component);
RoutedAnchor.contextType = RouterContext;
RoutedAnchor.defaultProps = {
  method: 'push'
};
export { RoutedAnchor };