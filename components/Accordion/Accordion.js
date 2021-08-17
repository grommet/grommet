"use strict";

exports.__esModule = true;
exports.Accordion = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("./propTypes");

var _Box = require("../Box");

var _AccordionContext = require("./AccordionContext");

var _excluded = ["activeIndex", "animate", "children", "multiple", "onActive"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var activeAsArray = function activeAsArray(active) {
  return typeof active === 'number' ? [active] : active;
};

var Accordion = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var activeIndex = _ref.activeIndex,
      _ref$animate = _ref.animate,
      animate = _ref$animate === void 0 ? true : _ref$animate,
      children = _ref.children,
      multiple = _ref.multiple,
      onActive = _ref.onActive,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useState = (0, _react.useState)([]),
      activeIndexes = _useState[0],
      setActiveIndexes = _useState[1];

  var _useState2 = (0, _react.useState)(),
      stateActiveIndex = _useState2[0],
      setStateActiveIndex = _useState2[1]; // Derived state from props
  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops


  var derivedActiveIndexes = activeAsArray(activeIndex) || [];

  if ((typeof activeIndex !== 'undefined' || activeIndex !== stateActiveIndex) && derivedActiveIndexes.join() !== activeIndexes.join()) {
    setActiveIndexes(derivedActiveIndexes);
    setStateActiveIndex(activeIndex);
  }

  var _onPanelChange = function onPanelChange(index) {
    var nextActiveIndexes = [].concat(activeIndexes || []);
    var nextActiveIndex = nextActiveIndexes.indexOf(index);

    if (nextActiveIndex > -1) {
      nextActiveIndexes.splice(nextActiveIndex, 1);
    } else if (multiple) {
      nextActiveIndexes.push(index);
    } else {
      nextActiveIndexes = [index];
    }

    setActiveIndexes(nextActiveIndexes);

    if (onActive) {
      onActive(nextActiveIndexes);
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    ref: ref,
    role: "tablist"
  }, rest), _react.Children.toArray(children).filter(function (child) {
    return child;
  }).map(function (child, index) {
    return /*#__PURE__*/_react["default"].createElement(_AccordionContext.AccordionContext.Provider, {
      // eslint-disable-next-line react/no-array-index-key
      key: index,
      value: {
        active: activeIndexes.indexOf(index) > -1,
        animate: animate,
        onPanelChange: function onPanelChange() {
          return _onPanelChange(index);
        }
      }
    }, child);
  }));
});
exports.Accordion = Accordion;
Accordion.propTypes = _propTypes.AccordionPropTypes;