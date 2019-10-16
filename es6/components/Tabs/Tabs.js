var _this = this;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { cloneElement, Children, useState } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { StyledTabPanel, StyledTabs, StyledTabsHeader } from './StyledTabs';

var Tabs = function Tabs(_ref) {
  var children = _ref.children,
      flex = _ref.flex,
      _ref$justify = _ref.justify,
      justify = _ref$justify === void 0 ? 'center' : _ref$justify,
      _ref$messages = _ref.messages,
      messages = _ref$messages === void 0 ? {
    tabContents: 'Tab Contents'
  } : _ref$messages,
      theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "flex", "justify", "messages", "theme"]);

  var propsActiveIndex = rest.activeIndex,
      onActive = rest.onActive;

  var _useState = useState(rest.activeIndex || 0),
      activeIndex = _useState[0],
      setActiveIndex = _useState[1];

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

  var activeContent;
  var activeTitle;
  var tabs = Children.map(children, function (tab, index) {
    if (!tab) return undefined;
    var tabProps = tab.props || {};
    var isTabActive = index === activeIndex;

    if (isTabActive) {
      activeContent = tabProps.children;

      if (typeof tabProps.title === 'string') {
        activeTitle = tabProps.title;
      } else {
        activeTitle = index + 1;
      }
    }

    return cloneElement(tab, {
      active: isTabActive,
      onActivate: function onActivate() {
        return activateTab(index);
      }
    });
  }, _this);
  var tabContentTitle = (activeTitle || '') + " " + messages.tabContents;
  return React.createElement(StyledTabs, _extends({
    as: Box,
    role: "tablist",
    flex: flex
  }, rest, {
    background: theme.tabs.background
  }), React.createElement(StyledTabsHeader, {
    as: Box,
    direction: "row",
    justify: justify,
    flex: false,
    wrap: true,
    background: theme.tabs.header.background,
    gap: theme.tabs.gap
  }, tabs), React.createElement(StyledTabPanel, {
    flex: flex,
    "aria-label": tabContentTitle,
    role: "tabpanel"
  }, activeContent));
};

Tabs.defaultProps = {};
Object.setPrototypeOf(Tabs.defaultProps, defaultProps);
var TabsDoc;

if (process.env.NODE_ENV !== 'production') {
  TabsDoc = require('./doc').doc(Tabs); // eslint-disable-line global-require
}

var TabsWrapper = compose(withTheme)(TabsDoc || Tabs);
export { TabsWrapper as Tabs };