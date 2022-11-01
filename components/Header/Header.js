"use strict";

exports.__esModule = true;
exports.Header = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _utils = require("../../utils");
var _Box = require("../Box");
var _excluded = ["sticky"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Header = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var _theme$header2, _theme$header2$sticky;
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
          var _theme$header, _theme$header$sticky;
          // ensure that header moves with the target
          header.style.position = 'sticky';
          header.style.top = '0px';
          header.style.zIndex = "" + ((_theme$header = theme.header) == null ? void 0 : (_theme$header$sticky = _theme$header.sticky) == null ? void 0 : _theme$header$sticky.zIndex);
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
  }, [headerRef, sticky, (_theme$header2 = theme.header) == null ? void 0 : (_theme$header2$sticky = _theme$header2.sticky) == null ? void 0 : _theme$header2$sticky.zIndex]);
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
exports.Header = Header;
Header.displayName = 'Header';