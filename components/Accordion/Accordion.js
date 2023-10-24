"use strict";

exports.__esModule = true;
exports.Accordion = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = require("./propTypes");
var _Box = require("../Box");
var _AccordionContext = require("./AccordionContext");
var _excluded = ["activeIndex", "animate", "children", "level", "multiple", "onActive"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var activeAsArray = function activeAsArray(active) {
  return typeof active === 'number' ? [active] : active;
};
var Accordion = exports.Accordion = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var activeIndex = _ref.activeIndex,
    _ref$animate = _ref.animate,
    animate = _ref$animate === void 0 ? true : _ref$animate,
    children = _ref.children,
    level = _ref.level,
    multiple = _ref.multiple,
    onActive = _ref.onActive,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = (0, _react.useState)([]),
    activeIndexes = _useState[0],
    setActiveIndexes = _useState[1];
  var _useState2 = (0, _react.useState)(),
    stateActiveIndex = _useState2[0],
    setStateActiveIndex = _useState2[1];

  // Derived state from props
  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  var derivedActiveIndexes = activeAsArray(activeIndex) || [];
  if ((typeof activeIndex !== 'undefined' || activeIndex !== stateActiveIndex) && derivedActiveIndexes.join() !== activeIndexes.join()) {
    setActiveIndexes(derivedActiveIndexes);
    setStateActiveIndex(activeIndex);
  }
  var getAccordionContext = (0, _react.useCallback)(function (index) {
    var _onPanelChange = function onPanelChange(nextIndex) {
      var nextActiveIndexes = [].concat(activeIndexes || []);
      var nextActiveIndex = nextActiveIndexes.indexOf(nextIndex);
      if (nextActiveIndex > -1) {
        nextActiveIndexes.splice(nextActiveIndex, 1);
      } else if (multiple) {
        nextActiveIndexes.push(nextIndex);
      } else {
        nextActiveIndexes = [nextIndex];
      }
      setActiveIndexes(nextActiveIndexes);
      if (onActive) {
        onActive(nextActiveIndexes);
      }
    };
    return {
      active: activeIndexes.indexOf(index) > -1,
      animate: animate,
      level: level,
      onPanelChange: function onPanelChange() {
        return _onPanelChange(index);
      }
    };
  }, [activeIndexes, animate, level, multiple, onActive]);
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    ref: ref
  }, rest), _react.Children.toArray(children).filter(function (child) {
    return child;
  }).map(function (child, index) {
    return /*#__PURE__*/_react["default"].createElement(_AccordionContext.AccordionContext.Provider, {
      // eslint-disable-next-line react/no-array-index-key
      key: index,
      value: getAccordionContext(index)
    }, child);
  }));
});
Accordion.propTypes = _propTypes.AccordionPropTypes;