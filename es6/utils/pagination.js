var _excluded = ["data", "page", "step"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import { useMemo, useState } from 'react';
export var normalizeShow = function normalizeShow(showProp, step) {
  var page;
  // by default, show refers to the index of an item,
  // but if using pagination, show can take the form of { page: # },
  // where page refers to the page # to show
  if (typeof showProp === 'number') page = Math.ceil((showProp + 1) / step);else if (typeof showProp === 'object' && 'page' in showProp) page = showProp.page;
  return page;
};
export var usePagination = function usePagination(_ref) {
  var data = _ref.data,
    page = _ref.page,
    step = _ref.step,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var totalPages = data ? Math.ceil(data.length / step) : 0;
  var _useState = useState(Math.min(page, totalPages) || 1),
    activePage = _useState[0],
    setActivePage = _useState[1];

  // ensure activePage is never lower than 1 to ensure that itemsBeginIndex
  // and itemsEndIndex aren't negative
  if (activePage > totalPages && (data == null ? void 0 : data.length) > 0) setActivePage(Math.max(totalPages, 1));
  var itemsBeginIndex = step * (activePage - 1);
  var itemsEndIndex = itemsBeginIndex + step;
  var currentItems = useMemo(function () {
    if (Array.isArray(data)) return data.slice(itemsBeginIndex, itemsEndIndex);
    return [];
  }, [data, itemsBeginIndex, itemsEndIndex]);
  var paginationProps = _extends({
    numberItems: data && data.length,
    onChange: function onChange(event) {
      return setActivePage(event.page);
    },
    page: activePage,
    step: step
  }, rest);
  return [currentItems, paginationProps];
};