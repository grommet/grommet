"use strict";

exports.__esModule = true;
exports.Cards = void 0;
var _react = _interopRequireWildcard(require("react"));
var _DataContext = require("../../contexts/DataContext");
var _Box = require("../Box");
var _Card = require("../Card");
var _CardBody = require("../CardBody");
var _Grid = require("../Grid");
var _InfiniteScroll = require("../InfiniteScroll");
var _Pagination = require("../Pagination");
var _utils = require("../../utils");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["as", "children", "data", "margin", "onMore", "pad", "paginate", "show", "size", "step"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var emptyData = [];
var Cards = exports.Cards = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
    as = _ref$as === void 0 ? 'ul' : _ref$as,
    children = _ref.children,
    dataProp = _ref.data,
    margin = _ref.margin,
    onMore = _ref.onMore,
    pad = _ref.pad,
    paginate = _ref.paginate,
    showProp = _ref.show,
    size = _ref.size,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? paginate ? 50 : undefined : _ref$step,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    contextData = _useContext.data;
  var data = dataProp || contextData || emptyData;
  var _usePagination = (0, _utils.usePagination)(_extends({
      data: data,
      page: (0, _utils.normalizeShow)(showProp, step),
      step: step
    }, paginate)),
    items = _usePagination[0],
    paginationProps = _usePagination[1];
  var Container = paginate ? _Box.Box : _react.Fragment;
  var containerProps = paginate ? _extends({}, theme.cards.container, {
    pad: pad,
    margin: margin
  }) : undefined;
  return /*#__PURE__*/_react["default"].createElement(Container, containerProps, /*#__PURE__*/_react["default"].createElement(_Grid.Grid, _extends({
    ref: ref,
    as: as,
    gap: theme.cards.grid.gap,
    columns: size || theme.cards.grid.columns,
    margin: !paginate && margin || 'none',
    pad: !paginate && pad || 'none'
  }, rest), /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
    items: !paginate ? data : items,
    onMore: onMore,
    show: !paginate ? showProp : undefined,
    step: step,
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        as: "li",
        flex: false
      }, marker);
    }
  }, function (item, index) {
    var _ref2, _ref3;
    return children ? children(item, index) : /*#__PURE__*/_react["default"].createElement(_Card.Card, {
      key: index.toString(),
      as: as === 'ul' ? 'li' : undefined
    }, /*#__PURE__*/_react["default"].createElement(_CardBody.CardBody, null, (_ref2 = (_ref3 = typeof item === 'string' && item) != null ? _ref3 : typeof item === 'object' && Object.values(item)[0]) != null ? _ref2 : index));
  })), paginate && data.length > step && items && items.length ? /*#__PURE__*/_react["default"].createElement(_Pagination.Pagination, _extends({
    alignSelf: "end"
  }, paginationProps)) : null);
});
Cards.displayName = 'Cards';
Cards.propTypes = _propTypes.CardsPropTypes;