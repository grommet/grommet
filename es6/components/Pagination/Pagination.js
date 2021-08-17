var _excluded = ["a11yTitle", "aria-label", "numberItems", "numberEdgePages", "numberMiddlePages", "onChange", "page", "size", "step"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Nav } from '../Nav';
import { PageControl } from './PageControl';
import { PaginationPropTypes } from './propTypes';
var StyledPaginationContainer = styled(Box).withConfig({
  displayName: "Pagination__StyledPaginationContainer",
  componentId: "rnlw6m-0"
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
  var a11yTitle = _ref.a11yTitle,
      ariaLabel = _ref['aria-label'],
      numberItems = _ref.numberItems,
      _ref$numberEdgePages = _ref.numberEdgePages,
      numberEdgePages = _ref$numberEdgePages === void 0 ? 1 : _ref$numberEdgePages,
      _ref$numberMiddlePage = _ref.numberMiddlePages,
      numberMiddlePagesProp = _ref$numberMiddlePage === void 0 ? 3 : _ref$numberMiddlePage,
      onChange = _ref.onChange,
      pageProp = _ref.page,
      size = _ref.size,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 10 : _ref$step,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  /* Calculate total number pages */

  var totalPages = Math.ceil(numberItems / step);

  var _useState = useState(Math.min(pageProp, totalPages) || 1),
      activePage = _useState[0],
      setActivePage = _useState[1];

  useEffect(function () {
    setActivePage(pageProp || 1);
  }, [pageProp]);
  /* Define page indices to display */

  var beginPages = getPageIndices(1, Math.min(numberEdgePages, totalPages));
  var endPages = getPageIndices(Math.max(totalPages - numberEdgePages + 1, numberEdgePages + 1), totalPages);
  var numberMiddlePages;

  if (numberMiddlePagesProp < 1) {
    numberMiddlePages = 1;
    console.warn( // eslint-disable-next-line max-len
    "Property \"numberMiddlePages\" should not be < 1. One middle page button will be shown. Set \"numberMiddlePages\" >= 1 to remove this warning.");
  } else numberMiddlePages = numberMiddlePagesProp;

  var startingMiddlePages; // odd

  if (numberMiddlePages % 2) startingMiddlePages = Math.min(activePage - Math.floor(numberMiddlePages / 2), totalPages - numberEdgePages - numberMiddlePages); // even, cannot split equally around active page
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

    if (onChange) {
      event.persist();
      var adjustedEvent = event;
      adjustedEvent.page = nextPage; // for controlled use cases, provide user with info on
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
      disabled: activePage === totalPages || !numberItems,
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
      disabled: activePage === 1 || !numberItems,
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
  return /*#__PURE__*/React.createElement(StyledPaginationContainer, _extends({}, theme.pagination.container, rest), /*#__PURE__*/React.createElement(Nav, {
    a11yTitle: ariaLabel || a11yTitle || 'Pagination Navigation',
    ref: ref
  }, /*#__PURE__*/React.createElement(Box, _extends({
    as: "ul"
  }, theme.pagination.controls), controls.map(function (control, index) {
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
  }))));
});
Pagination.displayName = 'Pagination';
Pagination.propTypes = PaginationPropTypes;
export { Pagination };