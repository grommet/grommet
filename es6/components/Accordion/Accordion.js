var _excluded = ["activeIndex", "animate", "children", "multiple", "onActive"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Children, forwardRef, useState } from 'react';
import { AccordionPropTypes } from './propTypes';
import { Box } from '../Box';
import { AccordionContext } from './AccordionContext';

var activeAsArray = function activeAsArray(active) {
  return typeof active === 'number' ? [active] : active;
};

var Accordion = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var activeIndex = _ref.activeIndex,
      _ref$animate = _ref.animate,
      animate = _ref$animate === void 0 ? true : _ref$animate,
      children = _ref.children,
      multiple = _ref.multiple,
      onActive = _ref.onActive,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useState = useState([]),
      activeIndexes = _useState[0],
      setActiveIndexes = _useState[1];

  var _useState2 = useState(),
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

  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    role: "tablist"
  }, rest), Children.toArray(children).filter(function (child) {
    return child;
  }).map(function (child, index) {
    return /*#__PURE__*/React.createElement(AccordionContext.Provider, {
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
Accordion.propTypes = AccordionPropTypes;
export { Accordion };