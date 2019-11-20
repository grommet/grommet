"use strict";

exports.__esModule = true;
exports.Body = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _InfiniteScroll = require("../InfiniteScroll");

var _TableRow = require("../TableRow");

var _TableCell = require("../TableCell");

var _Keyboard = require("../Keyboard");

var _hocs = require("../hocs");

var _Cell = require("./Cell");

var _StyledDataTable = require("./StyledDataTable");

var _buildState = require("./buildState");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Body = function Body(_ref) {
  var background = _ref.background,
      border = _ref.border,
      columns = _ref.columns,
      data = _ref.data,
      forwardRef = _ref.forwardRef,
      onMore = _ref.onMore,
      replace = _ref.replace,
      onClickRow = _ref.onClickRow,
      pad = _ref.pad,
      primaryProperty = _ref.primaryProperty,
      rowProps = _ref.rowProps,
      size = _ref.size,
      step = _ref.step,
      theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["background", "border", "columns", "data", "forwardRef", "onMore", "replace", "onClickRow", "pad", "primaryProperty", "rowProps", "size", "step", "theme"]);

  var _React$useState = _react["default"].useState(),
      active = _React$useState[0],
      setActive = _React$useState[1];

  return _react["default"].createElement(_Keyboard.Keyboard, {
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
  }, _react["default"].createElement(_StyledDataTable.StyledDataTableBody, _extends({
    ref: forwardRef,
    size: size,
    tabIndex: onClickRow ? 0 : undefined
  }, rest), _react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
    items: data,
    onMore: onMore,
    replace: replace,
    renderMarker: function renderMarker(marker) {
      return _react["default"].createElement(_TableRow.TableRow, null, _react["default"].createElement(_TableCell.TableCell, null, marker));
    },
    scrollableAncestor: "window",
    step: step
  }, function (datum, index) {
    var primaryValue = primaryProperty ? (0, _buildState.datumValue)(datum, primaryProperty) : undefined;
    return _react["default"].createElement(_StyledDataTable.StyledDataTableRow, {
      key: primaryValue || index,
      size: size,
      active: active >= 0 ? active === index : undefined,
      onClick: onClickRow ? function (event) {
        // extract from React's synthetic event pool
        event.persist();
        var adjustedEvent = event;
        adjustedEvent.datum = datum;
        adjustedEvent.index = index;
        onClickRow(adjustedEvent);
      } : undefined,
      onMouseOver: onClickRow ? function () {
        return setActive(index);
      } : undefined,
      onMouseOut: onClickRow ? function () {
        return setActive(undefined);
      } : undefined,
      onFocus: onClickRow ? function () {
        return setActive(index);
      } : undefined,
      onBlur: onClickRow ? function () {
        return setActive(undefined);
      } : undefined
    }, columns.map(function (column) {
      return _react["default"].createElement(_Cell.Cell, {
        key: column.property,
        background: background,
        border: border,
        context: "body",
        column: column,
        datum: datum,
        index: index,
        pad: pad,
        primaryProperty: primaryProperty,
        rowProp: rowProps && rowProps[primaryValue],
        scope: column.primary || column.property === primaryProperty ? 'row' : undefined
      });
    }));
  })));
};

var ButtonWrapper = (0, _recompose.compose)((0, _hocs.withFocus)(), _hocs.withForwardRef)(Body);
exports.Body = ButtonWrapper;