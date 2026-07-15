"use strict";

exports.__esModule = true;
exports.Cards = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _AnnounceContext = require("../../contexts/AnnounceContext");
var _DataContext = require("../../contexts/DataContext");
var _MessageContext = require("../../contexts/MessageContext");
var _Box = require("../Box");
var _Card = require("../Card");
var _CardBody = require("../CardBody");
var _Grid = require("../Grid");
var _InfiniteScroll = require("../InfiniteScroll");
var _Keyboard = require("../Keyboard");
var _Pagination = require("../Pagination");
var _utils = require("../../utils");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _StyledCellContainer = require("./StyledCellContainer");
var _excluded = ["as", "children", "data", "margin", "onMore", "pad", "paginate", "show", "size", "step", "sizeKey", "onOrder"],
  _excluded2 = ["keyboard"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var emptyData = [];
var HiddenText = _styledComponents["default"].span.withConfig({
  displayName: "Cards__HiddenText",
  componentId: "sc-1f9ilr5-0"
})(["position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;"]);
var indexForItem = function indexForItem(data, item) {
  var index = data.indexOf(item);
  if (index === -1) {
    // If the item isn't in the data, try to find it by id. This allows for
    // reordering to work when the items provided to Cards are different objects
    // than those in the data array, as long as they share an id.
    return data.findIndex(function (d) {
      return d.id === item.id;
    });
  }
  return index;
};
var reorder = function reorder(array, source, target) {
  var result = array.slice(0);
  var tmp = result[source];
  if (source < target) for (var i = source; i < target; i += 1) result[i] = result[i + 1];else for (var _i = source; _i > target; _i -= 1) result[_i] = result[_i - 1];
  result[target] = tmp;
  return result;
};
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
    sizeKey = _ref.sizeKey,
    onOrder = _ref.onOrder,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var announce = (0, _react.useContext)(_AnnounceContext.AnnounceContext);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var _useContext2 = (0, _react.useContext)(_DataContext.DataContext),
    contextData = _useContext2.data,
    unfilteredData = _useContext2.unfilteredData;
  var data = dataProp || contextData || emptyData;
  var unfiltered = unfilteredData || data;
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
  var _useState = (0, _react.useState)(),
    dragging = _useState[0],
    setDragging = _useState[1];
  var _useState2 = (0, _react.useState)(),
    orderedData = _useState2[0],
    setOrderedData = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    unfilteredOrder = _useState3[0],
    setUnfilteredOrder = _useState3[1];
  var hintId = (0, _utils.useId)();
  var currentItems = orderedData || (!paginate ? data : items);
  var renderItem = function renderItem(item, index) {
    var move = function move(count) {
      var newIndex = Math.max(0, Math.min(index + count, currentItems.length - 1));
      onOrder(reorder(unfiltered, indexForItem(unfiltered, item), indexForItem(unfiltered, currentItems[newIndex])));
      announce(format({
        id: 'cards.moved',
        values: {
          source: newIndex + 1,
          target: currentItems.length
        }
      }));
    };
    var onOrderProps = onOrder ? {
      tabIndex: 0,
      'aria-roledescription': format({
        id: 'cards.description'
      }),
      'aria-describedby': hintId,
      draggable: true,
      onDragStart: function onDragStart(event) {
        event.dataTransfer.setData('text/plain', '');
        // allowed per
        // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#define_the_drag_effect
        // eslint-disable-next-line no-param-reassign
        event.dataTransfer.effectAllowed = 'move';
        setDragging(index);
      },
      onDragEnd: function onDragEnd() {
        setDragging(undefined);
        setOrderedData(undefined);
        setUnfilteredOrder(undefined);
      },
      onDragEnter: function onDragEnter(event) {
        if (dragging !== undefined && dragging !== index) {
          // Ignore synthetic re-fires caused by entering
          // a child of this element
          if (event.currentTarget.contains(event.relatedTarget)) return;
          // eslint-disable-next-line no-param-reassign
          event.dataTransfer.dropEffect = 'move';
          setUnfilteredOrder(reorder(unfiltered, indexForItem(unfiltered, currentItems[dragging]), indexForItem(unfiltered, item)));
          setOrderedData(reorder(currentItems, dragging, index));
          setDragging(index);
        }
      },
      onDragOver: function onDragOver(event) {
        if (dragging !== undefined) {
          // preventDefault is required to allow the drop to occur
          event.preventDefault();
        }
      },
      onDrop: function onDrop() {
        if (unfilteredOrder) {
          onOrder(unfilteredOrder);
        }
      },
      keyboard: {
        onUp: function onUp(event) {
          event.preventDefault();
          move(-1);
        },
        onDown: function onDown(event) {
          event.preventDefault();
          move(1);
        },
        onLeft: function onLeft(event) {
          event.preventDefault();
          move(-1);
        },
        onRight: function onRight(event) {
          event.preventDefault();
          move(1);
        }
      }
    } : {};
    var keyboard = onOrderProps.keyboard,
      wrapperProps = _objectWithoutPropertiesLoose(onOrderProps, _excluded2);
    var content;
    if (children) {
      content = children(item, index);
    } else {
      var _ref2, _ref3;
      content = /*#__PURE__*/_react["default"].createElement(_Card.Card, {
        key: item.id || index.toString(),
        as: !(onOrder || sizeKey) && as === 'ul' ? 'li' : undefined
      }, /*#__PURE__*/_react["default"].createElement(_CardBody.CardBody, null, (_ref2 = (_ref3 = typeof item === 'string' && item) != null ? _ref3 : typeof item === 'object' && Object.values(item)[0]) != null ? _ref2 : index));
    }

    // If the items are orderable or sized by a property, wrap them in a
    // StyledCellContainer to apply the drag and drop handlers and/or
    // size styles
    if (onOrder || sizeKey) {
      var round = theme.card.container.round;
      content = /*#__PURE__*/_react["default"].createElement(_StyledCellContainer.StyledCellContainer, _extends({
        key: "_container_" + ((item == null ? void 0 : item.id) || index),
        as: as === 'ul' ? 'li' : undefined
      }, wrapperProps, {
        size: sizeKey ? item[sizeKey] : undefined,
        round: round
      }), content);
    }

    // Keyboard is only applied if onOrder is provided
    return keyboard ? /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, _extends({
      key: "_keyboard_" + ((item == null ? void 0 : item.id) || index)
    }, keyboard), content) : content;
  };
  return /*#__PURE__*/_react["default"].createElement(Container, containerProps, onOrder && /*#__PURE__*/_react["default"].createElement(HiddenText, {
    id: hintId
  }, format({
    id: 'cards.reorderHint'
  })), /*#__PURE__*/_react["default"].createElement(_Grid.Grid, _extends({
    ref: ref,
    as: as,
    gap: theme.cards.grid.gap,
    columns: size || theme.cards.grid.columns,
    margin: !paginate && margin || 'none',
    pad: !paginate && pad || 'none'
  }, rest), /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
    items: currentItems,
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
    return renderItem(item, index);
  })), paginate && data.length > step && items && items.length ? /*#__PURE__*/_react["default"].createElement(_Pagination.Pagination, _extends({
    alignSelf: "end"
  }, paginationProps)) : null);
});
Cards.displayName = 'Cards';
Cards.propTypes = _propTypes.CardsPropTypes;