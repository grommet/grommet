function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { compose } from 'recompose';
import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { Keyboard } from '../Keyboard';
import { withFocus, withForwardRef } from '../hocs';
import { Cell } from './Cell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';

var Body = function Body(_ref) {
  var columns = _ref.columns,
      data = _ref.data,
      forwardRef = _ref.forwardRef,
      onMore = _ref.onMore,
      onClickRow = _ref.onClickRow,
      primaryProperty = _ref.primaryProperty,
      size = _ref.size,
      step = _ref.step,
      theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["columns", "data", "forwardRef", "onMore", "onClickRow", "primaryProperty", "size", "step", "theme"]);

  var _React$useState = React.useState(),
      active = _React$useState[0],
      setActive = _React$useState[1];

  return React.createElement(Keyboard, {
    onEnter: onClickRow && active >= 0 ? function (event) {
      event.persist();
      var adjustedEvent = event;
      adjustedEvent.datum = data[active];
      onClickRow(adjustedEvent);
    } : undefined,
    onUp: onClickRow && active ? function () {
      setActive(active - 1);
    } : undefined,
    onDown: onClickRow && data.length ? function () {
      setActive(active >= 0 ? Math.min(active + 1, data.length - 1) : 0);
    } : undefined
  }, React.createElement(StyledDataTableBody, _extends({
    ref: forwardRef,
    size: size,
    tabIndex: onClickRow ? 0 : undefined
  }, rest), React.createElement(InfiniteScroll, {
    items: data,
    onMore: onMore,
    renderMarker: function renderMarker(marker) {
      return React.createElement(TableRow, null, React.createElement(TableCell, null, marker));
    },
    scrollableAncestor: "window",
    step: step
  }, function (datum, index) {
    return React.createElement(StyledDataTableRow, {
      key: datum[primaryProperty],
      size: size,
      active: active >= 0 ? active === index : undefined,
      onClick: onClickRow ? function (event) {
        event.persist(); // extract from React's synthetic event pool

        var adjustedEvent = event;
        adjustedEvent.datum = datum;
        onClickRow(adjustedEvent);
      } : undefined,
      onMouseOver: onClickRow ? function () {
        return setActive(undefined);
      } : undefined,
      onFocus: onClickRow ? function () {} : undefined
    }, columns.map(function (column) {
      return React.createElement(Cell, {
        key: column.property,
        context: "body",
        column: column,
        datum: datum,
        primaryProperty: primaryProperty,
        scope: column.primary || column.property === primaryProperty ? 'row' : undefined
      });
    }));
  })));
};

var ButtonWrapper = compose(withFocus(), withForwardRef)(Body);
export { ButtonWrapper as Body };