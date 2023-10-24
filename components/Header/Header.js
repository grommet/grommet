"use strict";

exports.__esModule = true;
exports.Header = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _utils = require("../../utils");
var _Box = require("../Box");
var _excluded = ["sticky"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Header = exports.Header = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var _theme$header2;
  var sticky = _ref.sticky,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  var headerRef = (0, _utils.useForwardedRef)(ref);
  (0, _react.useEffect)(function () {
    var scrollTop = 0;
    var updateScrollDir = function updateScrollDir() {
      // target is its scroll parent
      var target = (0, _utils.findScrollParent)(headerRef.current);
      var header = headerRef.current;
      if (target && sticky === 'scrollup') {
        var nextScrollTop = target === document ? window.pageYOffset : target.scrollTop;
        if (scrollTop - nextScrollTop <= 0) {
          header.style.top = "-" + header.getBoundingClientRect().height + "px";
          header.style.zIndex = '';
        } else if (scrollTop - nextScrollTop > 0) {
          var _theme$header;
          // ensure that header moves with the target
          header.style.position = 'sticky';
          header.style.top = '0px';
          header.style.zIndex = "" + ((_theme$header = theme.header) == null || (_theme$header = _theme$header.sticky) == null ? void 0 : _theme$header.zIndex);
          header.style.transition = 'top 0.6s';
        }
        scrollTop = nextScrollTop;
      }
    };
    if (sticky === 'scrollup') {
      updateScrollDir();
      window.addEventListener('resize', updateScrollDir);
      window.addEventListener('scroll', updateScrollDir, true);
    }
    return function () {
      if (sticky === 'scrollup') {
        window.removeEventListener('resize', updateScrollDir);
        window.removeEventListener('scroll', updateScrollDir, true);
      }
    };
  }, [headerRef, sticky, (_theme$header2 = theme.header) == null || (_theme$header2 = _theme$header2.sticky) == null ? void 0 : _theme$header2.zIndex]);
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    align: "center",
    as: "header",
    direction: "row",
    flex: false,
    justify: "between",
    gap: "medium",
    ref: headerRef
  }, rest));
});
Header.displayName = 'Header';