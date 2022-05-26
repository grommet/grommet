var _excluded = ["actions", "children", "gridProps", "parent", "subtitle", "title"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
      children = _ref.children,
      gridProps = _ref.gridProps,
      parent = _ref.parent,
      subtitle = _ref.subtitle,
      title = _ref.title,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = useContext(ThemeContext);
  var breakpoint = useContext(ResponsiveContext);

  var _ref2 = theme.pageHeader[breakpoint] || theme.pageHeader.medium,
      areas = _ref2.areas,
      columns = _ref2.columns,
      gap = _ref2.gap,
      rows = _ref2.rows;

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
  }, gridProps), /*#__PURE__*/React.createElement(Box, _extends({
    gridArea: "parent"
  }, theme.pageHeader.parent), parent), /*#__PURE__*/React.createElement(Box, {
    gridArea: "title"
  }, typeof title === 'string' ? /*#__PURE__*/React.createElement(Heading, theme.pageHeader.title, title) : title), /*#__PURE__*/React.createElement(Box, {
    gridArea: "subtitle"
  }, typeof subtitle === 'string' ? /*#__PURE__*/React.createElement(Paragraph, theme.pageHeader.subtitle, subtitle) : subtitle), /*#__PURE__*/React.createElement(Box, _extends({
    gridArea: "actions"
  }, theme.pageHeader.actions), actions)), children);
});
PageHeader.displayName = 'PageHeader';
export { PageHeader };