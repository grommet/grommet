function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { TabsContext } from './TabsContext';
import { StyledTabPanel, StyledTabs, StyledTabsHeader } from './StyledTabs';
import { normalizeColor } from '../../utils';
var Tabs = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var alignControls = _ref.alignControls,
      children = _ref.children,
      flex = _ref.flex,
      _ref$justify = _ref.justify,
      justify = _ref$justify === void 0 ? 'center' : _ref$justify,
      _ref$messages = _ref.messages,
      messages = _ref$messages === void 0 ? {
    tabContents: 'Tab Contents'
  } : _ref$messages,
      _ref$responsive = _ref.responsive,
      responsive = _ref$responsive === void 0 ? true : _ref$responsive,
      rest = _objectWithoutPropertiesLoose(_ref, ["alignControls", "children", "flex", "justify", "messages", "responsive"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var propsActiveIndex = rest.activeIndex,
      onActive = rest.onActive;

  var _useState = useState(rest.activeIndex || 0),
      activeIndex = _useState[0],
      setActiveIndex = _useState[1];

  var _useState2 = useState(),
      activeContent = _useState2[0],
      setActiveContent = _useState2[1];

  var _useState3 = useState(),
      activeTitle = _useState3[0],
      setActiveTitle = _useState3[1];

  if (activeIndex !== propsActiveIndex && propsActiveIndex !== undefined) {
    setActiveIndex(propsActiveIndex);
  }

  var activateTab = function activateTab(index) {
    if (propsActiveIndex === undefined) {
      setActiveIndex(index);
    }

    if (onActive) {
      onActive(index);
    }
  };
  /* eslint-disable no-param-reassign */


  delete rest.activeIndex;
  delete rest.onActive;
  /* eslint-enable no-param-reassign */

  var tabs = React.Children.map(children, function (child, index) {
    return /*#__PURE__*/React.createElement(TabsContext.Provider, {
      value: {
        activeIndex: activeIndex,
        active: activeIndex === index,
        onActivate: function onActivate() {
          return activateTab(index);
        },
        setActiveContent: setActiveContent,
        setActiveTitle: setActiveTitle
      }
    }, child ?
    /*#__PURE__*/
    // cloneElement is needed for backward compatibility with custom
    // styled components that rely on props.active. We should reassess
    // if it is still necessary in our next major release.
    React.cloneElement(child, {
      active: activeIndex === index
    }) : child);
  });
  var tabsHeaderStyles = {};

  if (theme.tabs.header && theme.tabs.header.border) {
    var borderColor = theme.tabs.header.border.color || theme.global.control.border.color;
    borderColor = normalizeColor(borderColor, theme);
    tabsHeaderStyles.border = {
      side: theme.tabs.header.border.side,
      size: theme.tabs.header.border.size,
      style: theme.tabs.header.border.style,
      color: borderColor
    };
  }

  var tabContentTitle = (activeTitle || '') + " " + messages.tabContents;
  return /*#__PURE__*/React.createElement(StyledTabs, _extends({
    ref: ref,
    as: Box,
    role: "tablist",
    flex: flex,
    responsive: responsive
  }, rest, {
    background: theme.tabs.background
  }), /*#__PURE__*/React.createElement(StyledTabsHeader, _extends({
    as: Box,
    direction: "row",
    justify: justify,
    alignSelf: alignControls,
    flex: false,
    wrap: true,
    background: theme.tabs.header.background,
    gap: theme.tabs.gap
  }, tabsHeaderStyles), tabs), /*#__PURE__*/React.createElement(StyledTabPanel, {
    flex: flex,
    "aria-label": tabContentTitle,
    role: "tabpanel"
  }, activeContent));
});
Tabs.displayName = 'Tabs';
var TabsDoc;

if (process.env.NODE_ENV !== 'production') {
  TabsDoc = require('./doc').doc(Tabs); // eslint-disable-line global-require
}

var TabsWrapper = TabsDoc || Tabs;
export { TabsWrapper as Tabs };