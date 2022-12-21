var _excluded = ["as", "children", "data", "margin", "onMore", "pad", "paginate", "show", "size", "step"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { Fragment, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { Card } from '../Card';
import { CardBody } from '../CardBody';
import { Grid } from '../Grid';
import { InfiniteScroll } from '../InfiniteScroll';
import { Pagination } from '../Pagination';
import { normalizeShow, usePagination } from '../../utils';
import { CardsPropTypes } from './propTypes';
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
  var theme = useContext(ThemeContext);
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