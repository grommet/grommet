"use strict";

exports.__esModule = true;
exports.TableCell = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");

var _defaultProps = require("../../default-props");

var _utils = require("../../utils");

var _Box = require("../Box");

var _TableContext = require("../Table/TableContext");

var _StyledTable = require("../Table/StyledTable");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var verticalAlignToJustify = {
  middle: 'center',
  top: 'start',
  bottom: 'end'
};
var TableCell = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var align = _ref.align,
      background = _ref.background,
      border = _ref.border,
      children = _ref.children,
      className = _ref.className,
      colSpan = _ref.colSpan,
      onWidth = _ref.onWidth,
      pad = _ref.pad,
      plain = _ref.plain,
      scope = _ref.scope,
      size = _ref.size,
      verticalAlign = _ref.verticalAlign,
      rest = _objectWithoutPropertiesLoose(_ref, ["align", "background", "border", "children", "className", "colSpan", "onWidth", "pad", "plain", "scope", "size", "verticalAlign"]);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var tableContext = (0, _react.useContext)(_TableContext.TableContext);
  var cellRef = (0, _utils.useForwardedRef)(ref);
  var containerRef = (0, _react.useRef)();
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    if (onWidth) {
      var _cellRef$current$getB = cellRef.current.getBoundingClientRect(),
          width = _cellRef$current$getB.width;

      onWidth(width);
    }
  }, [cellRef, onWidth]); // if window resizes, recalculate cell height so that content
  // will continue to fill the height if the dimensions of the cell
  // have changed

  (0, _react.useEffect)(function () {
    var updateHeight = function updateHeight() {
      if (plain === 'noPad') {
        var cell = cellRef.current;
        var container = containerRef.current;

        if (cell && container) {
          container.style.height = '';
          var cellRect = cell.getBoundingClientRect(); // height must match cell height otherwise table will apply some
          // margin around the cell content

          container.style.height = Math.max(cellRect.height - (border || theme.table[tableContext].border ? theme.global.borderSize.xsmall.replace('px', '') : 0), 0) + "px";
        }
      }
    };

    window.addEventListener('resize', updateHeight);
    updateHeight();
    return function () {
      window.removeEventListener('resize', updateHeight);
    };
  }, [border, cellRef, plain, tableContext, theme.global.borderSize, theme.table]);
  var tableContextTheme;

  if (tableContext === 'header') {
    tableContextTheme = theme.table && theme.table.header;
  } else if (tableContext === 'footer') {
    tableContextTheme = theme.table && theme.table.footer;
  } else {
    tableContextTheme = theme.table && theme.table.body;
  } // merge tabelContextTheme and rest


  var mergedProps = _extends({}, tableContextTheme, rest);

  Object.keys(mergedProps).forEach(function (key) {
    if (rest[key] === undefined) mergedProps[key] = tableContextTheme[key];
  }); // split out background, border, and pad

  var cellProps = {
    align: align || mergedProps.align || undefined,
    background: background || mergedProps.background || undefined,
    border: border || mergedProps.border || undefined,
    pad: plain !== 'noPad' ? pad || mergedProps.pad || undefined : undefined,
    verticalAlign: verticalAlign || mergedProps.verticalAlign || undefined
  };
  delete mergedProps.align;
  delete mergedProps.background;
  delete mergedProps.border;
  delete mergedProps.pad;
  delete mergedProps.verticalAlign;
  var content = children;

  if (plain === 'noPad' && children) {
    // a Box with explicitly set height is necessary
    // for the child contents to be able to fill the
    // TableCell
    content = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      ref: containerRef,
      justify: "center"
    }, children);
  }

  return /*#__PURE__*/_react["default"].createElement(_StyledTable.StyledTableCell, _extends({
    ref: cellRef,
    as: scope ? 'th' : undefined,
    scope: scope,
    size: size,
    colSpan: colSpan,
    tableContext: tableContext,
    tableContextTheme: tableContextTheme
  }, plain === true ? mergedProps : {}, cellProps, {
    className: className
  }), plain || !Object.keys(mergedProps).length ? content : /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, mergedProps, {
    align: align,
    justify: verticalAlignToJustify[verticalAlign]
  }), children));
});
TableCell.displayName = 'TableCell';
var TableCellDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableCellDoc = require('./doc').doc(TableCell);
}

var TableCellWrapper = TableCellDoc || TableCell;
exports.TableCell = TableCellWrapper;