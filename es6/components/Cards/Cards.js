var _excluded = ["as", "children", "data", "margin", "onMore", "pad", "paginate", "show", "size", "step"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { Fragment, useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { Card } from '../Card';
import { CardBody } from '../CardBody';
import { Grid } from '../Grid';
import { InfiniteScroll } from '../InfiniteScroll';
import { Pagination } from '../Pagination';
import { normalizeShow, usePagination } from '../../utils';
import { CardsPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var emptyData = [];
var Cards = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
    as = _ref$as === void 0 ? 'ul' : _ref$as,
    children = _ref.children,
    dataProp = _ref.data,
    margin = _ref.margin,
    onMore = _ref.onMore,
    pad = _ref.pad,
    paginate = _ref.paginate,
    showProp = _ref.show,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? paginate ? 50 : undefined : _ref$step,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _useContext = useContext(DataContext),
    contextData = _useContext.data;
  var data = dataProp || contextData || emptyData;
  var _usePagination = usePagination(_extends({
      data: data,
      page: normalizeShow(showProp, step),
      step: step
    }, paginate)),
    items = _usePagination[0],
    paginationProps = _usePagination[1];
  var Container = paginate ? Box : Fragment;
  var containerProps = paginate ? _extends({}, theme.cards.container, {
    pad: pad,
    margin: margin
  }) : undefined;
  return /*#__PURE__*/React.createElement(Container, containerProps, /*#__PURE__*/React.createElement(Grid, _extends({
    ref: ref,
    as: as,
    columns: size,
    gap: "medium",
    margin: !paginate && margin || 'none',
    pad: !paginate && pad || 'none'
  }, rest), /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: !paginate ? data : items,
    onMore: onMore,
    show: !paginate ? showProp : undefined,
    step: step,
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/React.createElement(Box, {
        as: "li",
        flex: false
      }, marker);
    }
  }, function (item, index) {
    var _ref2, _ref3;
    return children ? children(item, index) : /*#__PURE__*/React.createElement(Card, {
      key: index.toString(),
      as: as === 'ul' ? 'li' : undefined
    }, /*#__PURE__*/React.createElement(CardBody, null, (_ref2 = (_ref3 = typeof item === 'string' && item) != null ? _ref3 : typeof item === 'object' && Object.values(item)[0]) != null ? _ref2 : index));
  })), paginate && data.length > step && items && items.length ? /*#__PURE__*/React.createElement(Pagination, _extends({
    alignSelf: "end"
  }, paginationProps)) : null);
});
Cards.displayName = 'Cards';
Cards.propTypes = CardsPropTypes;
export { Cards };