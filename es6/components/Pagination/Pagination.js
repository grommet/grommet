var _excluded = ["a11yTitle", "aria-label", "numberItems", "numberEdgePages", "numberMiddlePages", "onChange", "messages", "page", "size", "step", "stepOptions", "summary"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { Nav } from '../Nav';
import { PageControl } from './PageControl';
import { PaginationStep } from './PaginationStep';
import { PaginationSummary } from './PaginationSummary';
import { PaginationPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var StyledPaginationContainer = styled(Box).withConfig({
  displayName: "Pagination__StyledPaginationContainer",
  componentId: "sc-rnlw6m-0"
})(["", ""], function (props) {
  return props.theme.pagination.container && props.theme.pagination.container.extend;
});
var getPageIndices = function getPageIndices(begin, end) {
  var indices = [];
  for (var i = begin; i <= end; i += 1) {
    indices.push(i);
  }
  return indices;
};
var Pagination = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref2;
  var a11yTitle = _ref.a11yTitle,
    ariaLabel = _ref['aria-label'],
    numberItems = _ref.numberItems,
    _ref$numberEdgePages = _ref.numberEdgePages,
    numberEdgePages = _ref$numberEdgePages === void 0 ? 1 : _ref$numberEdgePages,
    _ref$numberMiddlePage = _ref.numberMiddlePages,
    numberMiddlePagesProp = _ref$numberMiddlePage === void 0 ? 3 : _ref$numberMiddlePage,
    onChange = _ref.onChange,
    messages = _ref.messages,
    pageProp = _ref.page,
    size = _ref.size,
    stepProp = _ref.step,
    stepOptions = _ref.stepOptions,
    summary = _ref.summary,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useContext = useContext(DataContext),
    onView = _useContext.onView,
    filteredTotal = _useContext.filteredTotal,
    view = _useContext.view;
  var _useState = useState(stepProp || (view == null ? void 0 : view.step) || 10),
    step = _useState[0],
    setStep = _useState[1];
  var total = (_ref2 = numberItems != null ? numberItems : filteredTotal) != null ? _ref2 : 0;
  var page = pageProp || (view == null ? void 0 : view.page) || 1;

  /* Calculate total number pages */
  var totalPages = Math.ceil(total / step);
  var _useState2 = useState(Math.min(page, totalPages) || 1),
    activePage = _useState2[0],
    setActivePage = _useState2[1];
  useEffect(function () {
    if (stepProp) setStep(stepProp);
  }, [stepProp]);
  useEffect(function () {
    setActivePage(page);
    var pageEvent = new Event('pagechange');
    window.dispatchEvent(pageEvent);
  }, [page]);
  useEffect(function () {
    // if we are getting the step or page from outside the view,
    // update the Data's view in case it needs to filter.
    if (onView && ((view == null ? void 0 : view.step) !== step || (view == null ? void 0 : view.page) !== page)) onView(_extends({}, view, {
      page: page,
      step: step
    }));
  }, [onView, page, step, view]);

  /* Define page indices to display */
  var beginPages = getPageIndices(1, Math.min(numberEdgePages, totalPages));
  var endPages = getPageIndices(Math.max(totalPages - numberEdgePages + 1, numberEdgePages + 1), totalPages);
  var numberMiddlePages;
  if (numberMiddlePagesProp < 1) {
    numberMiddlePages = 1;
    console.warn(// eslint-disable-next-line max-len
    "Property \"numberMiddlePages\" should not be < 1. One middle page button will be shown. Set \"numberMiddlePages\" >= 1 to remove this warning.");
  } else numberMiddlePages = numberMiddlePagesProp;
  var startingMiddlePages;
  // odd
  if (numberMiddlePages % 2) startingMiddlePages = Math.min(activePage - Math.floor(numberMiddlePages / 2), totalPages - numberEdgePages - numberMiddlePages);
  // even, cannot split equally around active page
  // let extra page appear on middlePagesEnd instead
  else startingMiddlePages = Math.min(activePage - Math.floor(numberMiddlePages / 2) + 1, totalPages - numberEdgePages - numberMiddlePages);
  var middlePagesBegin = Math.max(startingMiddlePages, numberEdgePages + 2);
  var middlePagesEnd = Math.min(Math.max(activePage + Math.floor(numberMiddlePages / 2), numberEdgePages + numberMiddlePages + 1), endPages.length > 0 ? endPages[0] - 2 : totalPages - 1);
  var middlePages = getPageIndices(middlePagesBegin, middlePagesEnd);
  var beginFlex = [];
  if (middlePagesBegin > numberEdgePages + 2) beginFlex = ['more-prev'];else if (numberEdgePages + 1 < totalPages - numberEdgePages) beginFlex = [numberEdgePages + 1];
  var endFlex = [];
  if (middlePagesEnd < totalPages - numberEdgePages - 1) endFlex = ['more-next'];else if (totalPages - numberEdgePages > numberEdgePages) endFlex = [totalPages - numberEdgePages];
  var getItemIndices = function getItemIndices(nextPage) {
    var startIndex = step * (nextPage - 1);
    var endIndex = startIndex + step;
    return {
      startIndex: startIndex,
      endIndex: endIndex
    };
  };
  var handleClick = function handleClick(event, nextPage) {
    setActivePage(nextPage);
    if (onView) onView(_extends({}, view, {
      page: nextPage
    }));
    if (onChange) {
      event.persist();
      var adjustedEvent = event;
      adjustedEvent.page = nextPage;

      // for controlled use cases, provide user with info on
      // what range of indices should be displayed given the active page
      var _getItemIndices = getItemIndices(nextPage),
        startIndex = _getItemIndices.startIndex,
        endIndex = _getItemIndices.endIndex;
      adjustedEvent.startIndex = startIndex;
      adjustedEvent.endIndex = endIndex;
      onChange(adjustedEvent);
    }
  };
  var NextIcon = theme.pagination.icons.next;
  var PreviousIcon = theme.pagination.icons.previous;
  var iconColor = theme.pagination.icons.color;
  var navProps = {
    next: {
      // https://a11y-style-guide.com/style-guide/section-navigation.html#kssref-navigation-pagination
      'aria-disabled': activePage === totalPages ? 'true' : undefined,
      disabled: activePage === totalPages || !total,
      icon: /*#__PURE__*/React.createElement(NextIcon, {
        color: iconColor
      }),
      onClick: function onClick(event) {
        var nextPage = activePage + 1;
        handleClick(event, nextPage);
      },
      label: undefined
    },
    previous: {
      'aria-disabled': activePage === 1 ? 'true' : undefined,
      disabled: activePage === 1 || !total,
      icon: /*#__PURE__*/React.createElement(PreviousIcon, {
        color: iconColor
      }),
      onClick: function onClick(event) {
        var previousPage = activePage - 1;
        handleClick(event, previousPage);
      },
      label: undefined
    }
  };
  var controls = ['previous'].concat(beginPages, beginFlex, middlePages, endFlex, endPages, ['next']);

  /* Set props for each page index. Each page index should display a
   * clickable index, control, or placeholder (e.g. ellipsis) indicating
   * more pages are available.
   */
  controls = controls.map(function (control) {
    return _extends({
      active: control === activePage,
      a11yTitle: typeof control === 'number' ? "Go to page " + control : "Go to " + control + " page",
      // https://a11y-style-guide.com/style-guide/section-navigation.html#kssref-navigation-pagination
      // https://www.w3.org/TR/wai-aria-1.1/#aria-current
      'aria-current': control === activePage ? 'page' : undefined,
      control: control,
      onClick: function onClick(event) {
        handleClick(event, control);
      },
      separator: control === 'more-prev' || control === 'more-next'
    }, navProps[control]);
  });
  var paginationControls = /*#__PURE__*/React.createElement(Nav, {
    a11yTitle: ariaLabel || a11yTitle || 'Pagination Navigation',
    ref: ref
  }, /*#__PURE__*/React.createElement(Box, _extends({
    as: "ul"
  }, theme.pagination.controls, {
    cssGap: true
  }), controls.map(function (control, index) {
    return (
      /*#__PURE__*/
      /* Using index as key (as opposed to a unique id) seems to
       * help React prioritize rendering the updated controls as
       * desired. Whereas, using a unique id resulted in rendering
       * the active control with an undesired lag. */
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(PageControl, _extends({
        key: index,
        size: size
      }, control))
    );
  })));

  // for backwards compatibility
  if (!summary && !stepOptions) return /*#__PURE__*/React.createElement(StyledPaginationContainer, _extends({
    flex: false
  }, theme.pagination.container, passThemeFlag, rest), paginationControls);
  return /*#__PURE__*/React.createElement(StyledPaginationContainer, _extends({
    direction: "row",
    align: "center",
    gap: {
      column: 'xsmall',
      row: 'small'
    },
    wrap: true,
    flex: false
  }, theme.pagination.container, passThemeFlag, rest), /*#__PURE__*/React.createElement(Box, {
    flex: "grow"
  }, summary && /*#__PURE__*/React.createElement(PaginationSummary, {
    messages: messages,
    page: activePage,
    step: step,
    numberItems: total
  })), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: {
      column: 'xsmall',
      row: 'small'
    },
    wrap: true
  }, stepOptions && /*#__PURE__*/React.createElement(PaginationStep, {
    messages: messages,
    options: Array.isArray(stepOptions) ? stepOptions : undefined,
    step: step,
    onChange: function onChange(_ref3) {
      var value = _ref3.value;
      return setStep(value);
    }
  }), paginationControls));
});
Pagination.displayName = 'Pagination';
Pagination.propTypes = PaginationPropTypes;
export { Pagination };