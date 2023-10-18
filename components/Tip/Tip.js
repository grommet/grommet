"use strict";

exports.__esModule = true;
exports.Tip = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _Box = require("../Box");
var _Drop = require("../Drop");
var _utils = require("../../utils");
var _propTypes = require("./propTypes");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var Tip = exports.Tip = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, tipRef) {
  var children = _ref.children,
    content = _ref.content,
    dropProps = _ref.dropProps,
    plain = _ref.plain;
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  var _useState = (0, _react.useState)(false),
    over = _useState[0],
    setOver = _useState[1];
  var _useState2 = (0, _react.useState)(false),
    tooltipOver = _useState2[0],
    setTooltipOver = _useState2[1];
  var usingKeyboard = (0, _utils.useKeyboard)();
  var componentRef = (0, _utils.useForwardedRef)(tipRef);

  // Three use case for children
  // 1. Tip has a single child + it is a React Element => Great!
  // 2. Tip has a single child +  not React Element =>
  // span will wrap the child so we can use ref and events.
  // 3. Tip has more than one child => Abort, display Children.only error
  var child = _react.Children.count(children) <= 1 && ! /*#__PURE__*/_react["default"].isValidElement(children) && /*#__PURE__*/_react["default"].createElement("span", null, children) || _react.Children.only(children);
  var clonedChild = /*#__PURE__*/(0, _react.cloneElement)(child, {
    onMouseEnter: function onMouseEnter(event) {
      var _child$props;
      setOver(true);
      if ((_child$props = child.props) != null && _child$props.onMouseEnter) child.props.onMouseEnter(event);
    },
    onMouseLeave: function onMouseLeave(event) {
      var _child$props2;
      setOver(false);
      if ((_child$props2 = child.props) != null && _child$props2.onMouseLeave) child.props.onMouseLeave(event);
    },
    onFocus: function onFocus(event) {
      var _child$props3;
      if (usingKeyboard) setOver(true);
      if ((_child$props3 = child.props) != null && _child$props3.onFocus) child.props.onFocus(event);
    },
    onBlur: function onBlur(event) {
      var _child$props4;
      if (usingKeyboard) setOver(false);
      if ((_child$props4 = child.props) != null && _child$props4.onBlur) child.props.onBlur(event);
    },
    key: 'tip-child',
    ref: function ref(node) {
      // https://github.com/facebook/react/issues/8873#issuecomment-287873307
      if (typeof componentRef === 'function') {
        componentRef(node);
      } else if (componentRef) {
        // eslint-disable-next-line no-param-reassign
        componentRef.current = node;
      }
      // Call the original ref, if any
      var callerRef = child.ref;
      if (typeof callerRef === 'function') {
        callerRef(node);
      } else if (callerRef) {
        callerRef.current = node;
      }
    }
  });
  return [clonedChild, (over || tooltipOver) && /*#__PURE__*/_react["default"].createElement(_Drop.Drop, _extends({
    target: componentRef.current,
    trapFocus: false,
    key: "tip-drop"
  }, theme.tip.drop, dropProps, {
    onMouseEnter: function onMouseEnter() {
      return setTooltipOver(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setTooltipOver(false);
    }
  }), plain ? content : /*#__PURE__*/_react["default"].createElement(_Box.Box, theme.tip.content, content))];
});
Tip.displayName = 'Tip';
Tip.propTypes = _propTypes.TipPropTypes;