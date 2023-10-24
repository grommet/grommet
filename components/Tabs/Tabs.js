"use strict";

exports.__esModule = true;
exports.Tabs = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Previous = require("grommet-icons/icons/Previous");
var _Next = require("grommet-icons/icons/Next");
var _styledComponents = require("styled-components");
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _defaultProps = require("../../default-props");
var _Box = require("../Box");
var _Button = require("../Button");
var _TabsContext = require("./TabsContext");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _StyledTabs = require("./StyledTabs");
var _utils = require("../../utils");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _AnalyticsContext = require("../../contexts/AnalyticsContext/AnalyticsContext");
var _excluded = ["alignControls", "children", "flex", "justify", "messages", "responsive"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Tabs = exports.Tabs = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$tabs$header;
  var alignControls = _ref.alignControls,
    children = _ref.children,
    flex = _ref.flex,
    _ref$justify = _ref.justify,
    justify = _ref$justify === void 0 ? 'center' : _ref$justify,
    messages = _ref.messages,
    _ref$responsive = _ref.responsive,
    responsive = _ref$responsive === void 0 ? true : _ref$responsive,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var propsActiveIndex = rest.activeIndex,
    onActive = rest.onActive;
  var _useState = (0, _react.useState)(rest.activeIndex || 0),
    activeIndex = _useState[0],
    setActiveIndex = _useState[1];
  var _useState2 = (0, _react.useState)(),
    activeContent = _useState2[0],
    setActiveContent = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    activeTitle = _useState3[0],
    setActiveTitle = _useState3[1];
  var _useState4 = (0, _react.useState)(),
    disableLeftArrow = _useState4[0],
    setDisableLeftArrow = _useState4[1];
  var _useState5 = (0, _react.useState)(),
    disableRightArrow = _useState5[0],
    setDisableRightArrow = _useState5[1];
  var _useState6 = (0, _react.useState)(),
    overflow = _useState6[0],
    setOverflow = _useState6[1];
  var _useState7 = (0, _react.useState)(-1),
    focusIndex = _useState7[0],
    setFocusIndex = _useState7[1];
  var headerRef = (0, _react.useRef)();
  var size = (0, _react.useContext)(_ResponsiveContext.ResponsiveContext);
  var sendAnalytics = (0, _AnalyticsContext.useAnalytics)();
  if (activeIndex !== propsActiveIndex && propsActiveIndex !== undefined) {
    setActiveIndex(propsActiveIndex);
  }

  // Safari v15.5 has an issue with scrolling when overflow='hidden'
  // and scroll-behavior='smooth'. For now we are detecting if the browser
  // is safari to workaround this issue. The issue should be resolved soon
  // and we can remove this. https://github.com/WebKit/WebKit/pull/1387
  var isSafari = typeof window !== 'undefined' ? /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent) : true;

  /* eslint-disable no-param-reassign */
  delete rest.activeIndex;
  delete rest.onActive;
  /* eslint-enable no-param-reassign */

  var tabRefs = (0, _react.useMemo)(function () {
    return _react["default"].Children.map(children, function () {
      return /*#__PURE__*/_react["default"].createRef();
    });
  }, [children]);

  // check if tab is in view
  var isVisible = (0, _react.useCallback)(function (index) {
    if (tabRefs[index].current) {
      var _headerRef$current;
      var tabRect = tabRefs[index].current.getBoundingClientRect();
      var headerRect = (_headerRef$current = headerRef.current) == null ? void 0 : _headerRef$current.getBoundingClientRect();
      if (tabRect && headerRect) {
        // the -1 and +1 allow a little leniency when calculating if a tab
        // is in view. Without the -1 and +1 a tab could be fully in view
        // but isVisible will return false.
        return tabRect.left >= headerRect.left - 1 && tabRect.right <= headerRect.right + 1;
      }
    }
    return undefined;
  }, [headerRef, tabRefs]);
  var updateArrowState = (0, _react.useCallback)(function () {
    setDisableLeftArrow(isVisible(0));
    setDisableRightArrow(isVisible(tabRefs.length - 1));
  }, [tabRefs, isVisible]);
  var scrollTo = (0, _react.useCallback)(function (index, keyboard) {
    var tabRect = tabRefs[index].current.getBoundingClientRect();
    var headerRect = headerRef.current.getBoundingClientRect();
    var amountHidden = 0;
    if (tabRect.left >= headerRect.left && tabRect.left <= headerRect.right) {
      amountHidden = tabRect.width - (headerRect.right - tabRect.left);
    } else if (tabRect.right >= headerRect.left && tabRect.right <= headerRect.right) {
      amountHidden = tabRect.width - (tabRect.right - headerRect.left);
      amountHidden = 0 - amountHidden;
    } else if (tabRect.left >= headerRect.right) {
      amountHidden = tabRect.right - headerRect.right;
    } else if (tabRect.right <= headerRect.left) {
      amountHidden = headerRect.left - tabRect.left;
      amountHidden = 0 - amountHidden;
    }
    // We are adding or subtracting 2 from amountHidden to
    // ensure the focusIndicator is visible when navigating
    // by keyboard
    if (keyboard) {
      if (amountHidden < 0) amountHidden -= 2;
      if (amountHidden > 0) amountHidden += 2;
    }
    if (isSafari) {
      headerRef.current.scrollBy({
        left: amountHidden
      });
    } else {
      headerRef.current.scrollBy({
        left: amountHidden,
        behavior: 'smooth'
      });
    }

    // wait for scroll animation to finish
    // checks every 50 milliseconds for 1000 milliseconds
    // if the scroll animation has finished. Most scroll
    // animations will finish in 1000 milliseconds unless
    // the tab name is very long.
    if (isSafari) {
      updateArrowState();
    } else {
      var checkVisible = setInterval(function () {
        if (tabRefs[index].current && isVisible(index)) {
          updateArrowState();
          clearInterval(checkVisible);
        }
      }, 50);
      setTimeout(function () {
        updateArrowState();
        clearInterval(checkVisible);
      }, 1000);
    }
  }, [tabRefs, headerRef, isVisible, updateArrowState, isSafari]);
  var moveByArrowKey = function moveByArrowKey(direction) {
    var previous = direction === 'previous';
    var index = direction === 'previous' ? 0 : tabRefs.length - 1;
    var scrolledToIndex;
    var moveBy = theme.tabs.step[size] - 1 || 0;
    while (scrolledToIndex === undefined && (previous && index < tabRefs.length - 1 || !previous && index > 0)) {
      if (!isVisible(index) && (previous && isVisible(index + 1) || !previous && isVisible(index - 1))) {
        if (previous) {
          if (index - moveBy >= 0) {
            scrollTo(index - moveBy, false);
            scrolledToIndex = index - moveBy;
          } else {
            scrollTo(0, false);
            scrolledToIndex = 0;
          }
        } else if (index + moveBy < tabRefs.length) {
          scrollTo(index + moveBy, false);
          scrolledToIndex = index + moveBy;
        } else {
          scrollTo(tabRefs.length - 1, false);
          scrolledToIndex = tabRefs.length - 1;
        }
      }
      index = previous ? index + 1 : index - 1;
    }
  };
  (0, _react.useEffect)(function () {
    var _tabRefs$activeIndex;
    // if the active tab isn't visible scroll to it
    if (overflow && tabRefs && (_tabRefs$activeIndex = tabRefs[activeIndex]) != null && _tabRefs$activeIndex.current && !isVisible(activeIndex)) scrollTo(activeIndex, true);
  }, [overflow, activeIndex, tabRefs, isVisible, scrollTo]);
  (0, _react.useEffect)(function () {
    // scroll focus item into view if it is not already visible
    if (overflow && focusIndex !== -1 && !isVisible(focusIndex)) scrollTo(focusIndex, true);else if (overflow && focusIndex !== -1) {
      // If the browser scrolled the focused item into view and
      // the focusedTab is on the edge of the header container
      // scroll slightly further to show the focusIndicator
      var tabRect = tabRefs[focusIndex].current.getBoundingClientRect();
      var headerRect = headerRef.current.getBoundingClientRect();
      var amountHidden = 0;
      if (tabRect.left >= headerRect.left && tabRect.right <= headerRect.right && tabRect.right + 2 >= headerRect.right) amountHidden = 2;else if (tabRect.right <= headerRect.right && tabRect.left >= headerRect.left && tabRect.left - 2 <= headerRect.left) amountHidden = -2;
      headerRef.current.scrollBy({
        left: amountHidden
      });
    }
  }, [overflow, tabRefs, focusIndex, isVisible, scrollTo]);
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    var onResize = function onResize() {
      // check if tabs are overflowing
      if (headerRef.current.scrollWidth > headerRef.current.offsetWidth) {
        setOverflow(true);
      } else setOverflow(false);
      updateArrowState();
    };
    onResize();
    window.addEventListener('resize', onResize);
    return function () {
      return window.removeEventListener('resize', onResize);
    };
  }, [tabRefs, disableLeftArrow, disableRightArrow, activeIndex, headerRef, overflow, updateArrowState]);
  var getTabsContext = (0, _react.useCallback)(function (index) {
    var activateTab = function activateTab(nextIndex) {
      sendAnalytics({
        type: 'activateTab',
        element: tabRefs[nextIndex].current
      });
      if (propsActiveIndex === undefined) {
        setActiveIndex(nextIndex);
      }
      if (onActive) {
        onActive(nextIndex);
      }
    };
    return {
      activeIndex: activeIndex,
      active: activeIndex === index,
      index: index,
      ref: tabRefs[index],
      onActivate: function onActivate() {
        return activateTab(index);
      },
      setActiveContent: setActiveContent,
      setActiveTitle: setActiveTitle,
      setFocusIndex: setFocusIndex
    };
  }, [activeIndex, onActive, propsActiveIndex, sendAnalytics, tabRefs]);
  var tabs = _react["default"].Children.map(children, function (child, index) {
    return /*#__PURE__*/_react["default"].createElement(_TabsContext.TabsContext.Provider, {
      value: getTabsContext(index)
    }, child ?
    /*#__PURE__*/
    // cloneElement is needed for backward compatibility with custom
    // styled components that rely on props.active. We should reassess
    // if it is still necessary in our next major release.
    _react["default"].cloneElement(child, {
      active: activeIndex === index
    }) : child);
  });
  var tabsHeaderStyles = {};
  if (theme.tabs.header && theme.tabs.header.border) {
    var borderColor = theme.tabs.header.border.color || theme.global.control.border.color;
    borderColor = (0, _utils.normalizeColor)(borderColor, theme);
    tabsHeaderStyles.border = {
      side: theme.tabs.header.border.side,
      size: theme.tabs.header.border.size,
      style: theme.tabs.header.border.style,
      color: borderColor
    };
  }
  var tabContentTitle = (activeTitle || '') + " " + format({
    id: 'tabs.tabContents',
    messages: messages
  });
  return /*#__PURE__*/_react["default"].createElement(_StyledTabs.StyledTabs, _extends({
    ref: ref,
    flex: flex,
    responsive: responsive
  }, rest, {
    background: theme.tabs.background
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    alignSelf: alignControls || ((_theme$tabs$header = theme.tabs.header) == null ? void 0 : _theme$tabs$header.alignSelf),
    role: "tablist",
    flex: false,
    direction: overflow ? 'row' : 'column'
  }, tabsHeaderStyles), overflow && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    a11yTitle: "Previous Tab",
    disabled: disableLeftArrow
    // removed from tabIndex, button is redundant for keyboard users
    ,
    tabIndex: -1,
    onClick: function onClick() {
      return moveByArrowKey('previous');
    }
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: {
      vertical: 'xsmall',
      horizontal: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_Previous.Previous, {
    color: disableLeftArrow ? theme.button.disabled.color : theme.global.colors.text
  }))), /*#__PURE__*/_react["default"].createElement(_StyledTabs.StyledTabsHeader, {
    ref: headerRef,
    direction: "row",
    justify: overflow ? 'start' : justify,
    flex: !!overflow,
    wrap: false,
    overflow: overflow ? 'hidden' : 'visible',
    background: theme.tabs.header.background,
    gap: theme.tabs.gap,
    pad: overflow ? '2px' : undefined,
    margin: overflow ? '-2px' : undefined
  }, tabs), overflow && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    a11yTitle: "Next Tab",
    disabled: disableRightArrow
    // removed from tabIndex, button is redundant for keyboard users
    ,
    tabIndex: -1,
    onClick: function onClick() {
      return moveByArrowKey('next');
    }
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: {
      vertical: 'xsmall',
      horizontal: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_Next.Next, {
    color: disableRightArrow ? theme.button.disabled.color : theme.global.colors.text
  })))), /*#__PURE__*/_react["default"].createElement(_StyledTabs.StyledTabPanel, {
    flex: flex,
    "aria-label": tabContentTitle,
    role: "tabpanel"
  }, activeContent));
});
Tabs.displayName = 'Tabs';
Tabs.propTypes = _propTypes.TabsPropTypes;