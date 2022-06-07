var _excluded = ["actions", "gridProps", "parent", "responsive", "subtitle", "title"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Header } from '../Header';
import { Heading } from '../Heading';
import { Grid } from '../Grid';
import { Paragraph } from '../Paragraph';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
var PageHeader = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var actions = _ref.actions,
      gridPropsProp = _ref.gridProps,
      parent = _ref.parent,
      responsive = _ref.responsive,
      subtitle = _ref.subtitle,
      title = _ref.title,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = useContext(ThemeContext);
  var breakpoint = useContext(ResponsiveContext);

  var actionsProps = _extends({}, theme.pageHeader.actions);

  var gridProps = theme.pageHeader[breakpoint] || theme.pageHeader.medium;

  if (responsive && theme.pageHeader.responsive.breakpoints.includes(breakpoint)) {
    gridProps = _extends({}, gridProps, theme.pageHeader.responsive);
    actionsProps = _extends({}, actionsProps, theme.pageHeader.responsive.actions);
  }

  var _gridProps = gridProps,
      areas = _gridProps.areas,
      columns = _gridProps.columns,
      gap = _gridProps.gap,
      rows = _gridProps.rows;
  return /*#__PURE__*/React.createElement(Header, _extends({
    ref: ref,
    direction: "column",
    gap: "none",
    pad: theme.pageHeader.pad
  }, rest), /*#__PURE__*/React.createElement(Grid, _extends({
    columns: columns,
    rows: rows,
    areas: areas,
    gap: gap,
    fill: "horizontal"
  }, gridPropsProp), /*#__PURE__*/React.createElement(Box, _extends({
    gridArea: "parent"
  }, theme.pageHeader.parent), parent), /*#__PURE__*/React.createElement(Box, {
    gridArea: "title"
  }, typeof title === 'string' ? /*#__PURE__*/React.createElement(Heading, theme.pageHeader.title, title) : title), /*#__PURE__*/React.createElement(Box, {
    gridArea: "subtitle"
  }, typeof subtitle === 'string' ? /*#__PURE__*/React.createElement(Paragraph, theme.pageHeader.subtitle, subtitle) : subtitle), /*#__PURE__*/React.createElement(Box, _extends({
    gridArea: "actions"
  }, actionsProps), actions)));
});
PageHeader.displayName = 'PageHeader';
export { PageHeader };