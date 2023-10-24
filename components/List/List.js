"use strict";

exports.__esModule = true;
exports.List = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _DataContext = require("../../contexts/DataContext");
var _Box = require("../Box");
var _Button = require("../Button");
var _InfiniteScroll = require("../InfiniteScroll");
var _Keyboard = require("../Keyboard");
var _Pagination = require("../Pagination");
var _Text = require("../Text");
var _utils = require("../../utils");
var _AnalyticsContext = require("../../contexts/AnalyticsContext");
var _propTypes = require("./propTypes");
var _excluded = ["a11yTitle", "aria-label", "action", "as", "background", "border", "children", "data", "defaultItemProps", "disabled", "focus", "itemKey", "itemProps", "onActive", "onClickItem", "onKeyDown", "onMore", "onOrder", "pad", "paginate", "pinned", "primaryKey", "secondaryKey", "show", "step"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var emptyData = [];
var StyledList = _styledComponents["default"].ul.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "List__StyledList",
  componentId: "sc-130gdqg-0"
})(["list-style:none;", " padding:0;", " &:focus{", "}", "}", "}"], function (props) {
  return !props.margin && 'margin: 0;';
}, _utils.genericStyles, function (props) {
  return props.tabIndex >= 0 && (0, _utils.focusStyle)({
    forceOutline: true,
    skipSvgChildren: true
  });
}, function (props) {
  return props.itemFocus && (0, _utils.focusStyle)({
    forceOutline: true,
    skipSvgChildren: true
  });
}, function (props) {
  return props.theme.list && props.theme.list.extend;
});
var StyledItem = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "List__StyledItem",
  componentId: "sc-130gdqg-1"
})(["", " ", " &:focus{", "}", " &:hover{", "}", ""], function (props) {
  return props.onClick && !props.isDisabled && "cursor: pointer;";
}, function (props) {
  return props.draggable && !props.isDisabled && "cursor: move;";
}, (0, _utils.unfocusStyle)({
  forceOutline: true,
  skipSvgChildren: true
}), function (props) {
  var _props$theme$list;
  var disabledStyle;
  if (props.isDisabled && (_props$theme$list = props.theme.list) != null && (_props$theme$list = _props$theme$list.item) != null && _props$theme$list.disabled) {
    var _props$theme$list$ite = props.theme.list.item.disabled,
      color = _props$theme$list$ite.color,
      cursor = _props$theme$list$ite.cursor;
    disabledStyle = {
      color: (0, _utils.normalizeColor)(color, props.theme),
      cursor: cursor
    };
  }
  return disabledStyle;
}, function (props) {
  return props.isDisabled && "background-color: unset;";
}, function (props) {
  return props.theme.list && props.theme.list.item && props.theme.list.item.extend;
});

// when paginated, this wraps the data table and pagination component
var StyledContainer = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "List__StyledContainer",
  componentId: "sc-130gdqg-2"
})(["", ";"], function (props) {
  return props.theme.list && props.theme.list.container && props.theme.list.container.extend;
});
var getValue = function getValue(item, index, key) {
  if (typeof key === 'function') return key(item, index);
  if (typeof item === 'string') return item;
  if (key !== undefined) return item == null ? void 0 : item[key];
  return undefined;
};
var reorder = function reorder(array, pinnedArray, source, target) {
  var result = array.slice(0);
  var tmp = result[source];
  if (source < target) for (var i = source; i < target; i += 1) result[i] = result[i + 1];else for (var _i = source; _i > target; _i -= 1) result[_i] = result[_i - 1];
  result[target] = tmp;

  // insert pinned items into their proper index within the orderable
  // data object to make the complete data set again
  if (pinnedArray.data.length > 0) {
    pinnedArray.data.forEach(function (pinnedItem, index) {
      result.splice(pinnedArray.indexes[index], 0, pinnedItem);
    });
  }
  return result;
};

// getItemId returns something appropriate to use as a unique DOM
// id for an item in the list
var getItemId = function getItemId(item, index, itemKey, primaryKey) {
  var _getValue;
  // we do primaryKey first to be backward compatible, even though
  // itemKey is probably technically the better choice for a DOM id.
  if (primaryKey) return getValue(item, index, primaryKey);
  if (itemKey) return getValue(item, index, itemKey);
  return (_getValue = getValue(item, index)) != null ? _getValue : index; // do our best w/o *key properties
};

var List = exports.List = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
    ariaLabel = _ref['aria-label'],
    action = _ref.action,
    as = _ref.as,
    background = _ref.background,
    border = _ref.border,
    children = _ref.children,
    dataProp = _ref.data,
    defaultItemProps = _ref.defaultItemProps,
    disabledItems = _ref.disabled,
    focus = _ref.focus,
    defaultItemKey = _ref.itemKey,
    itemProps = _ref.itemProps,
    onActive = _ref.onActive,
    onClickItem = _ref.onClickItem,
    onKeyDown = _ref.onKeyDown,
    onMore = _ref.onMore,
    onOrder = _ref.onOrder,
    pad = _ref.pad,
    paginate = _ref.paginate,
    _ref$pinned = _ref.pinned,
    pinned = _ref$pinned === void 0 ? [] : _ref$pinned,
    primaryKey = _ref.primaryKey,
    secondaryKey = _ref.secondaryKey,
    showProp = _ref.show,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? paginate ? 50 : undefined : _ref$step,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var listRef = (0, _utils.useForwardedRef)(ref);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    contextData = _useContext.data;
  var data = dataProp || contextData || emptyData;

  // fixes issue where itemKey is undefined when only primaryKey is provided
  var itemKey = defaultItemKey || primaryKey || null;

  // active will be the index of the current 'active'
  // control in the list. If the onOrder property is defined
  // this will be the index of up or down control for ordering
  // items in the list. In this case the item index of that
  // control would be the active index / 2.
  // If onOrder is not defined but onClickItem is (e.g. the
  // List items are likely selectable), active will be the
  // index of the item which is currently active.
  var _useState = (0, _react.useState)(),
    active = _useState[0],
    setActive = _useState[1];
  var _useState2 = (0, _react.useState)(),
    lastActive = _useState2[0],
    setLastActive = _useState2[1];
  var updateActive = function updateActive(nextActive) {
    setActive(nextActive);
    // we occasionally call updateActive with undefined when it already is so,
    // no need to call onActive in that case
    if (onActive && onClickItem && nextActive !== active) onActive(nextActive);
  };
  var _useState3 = (0, _react.useState)(),
    itemFocus = _useState3[0],
    setItemFocus = _useState3[1];
  var _useState4 = (0, _react.useState)(),
    dragging = _useState4[0],
    setDragging = _useState4[1];
  var _useState5 = (0, _react.useState)(),
    orderingData = _useState5[0],
    setOrderingData = _useState5[1];

  // store a reference to the pinned and the data that is orderable
  var _useMemo = (0, _react.useMemo)(function () {
      var orderable = [];
      var pinnedData = [];
      var pinnedIndexes = [];
      var currentData = orderingData || data;
      if (pinned.length === 0) return [currentData, {
        data: pinnedData,
        indexes: pinnedIndexes
      }];
      currentData.forEach(function (item, index) {
        var key = getValue(item, index, itemKey);
        if (pinned.includes(key)) {
          pinnedData.push(item);
          pinnedIndexes.push(index);
        } else {
          orderable.push(item);
        }
      });
      return [orderable, {
        data: pinnedData,
        indexes: pinnedIndexes
      }];
    }, [data, orderingData, itemKey, pinned]),
    orderableData = _useMemo[0],
    pinnedInfo = _useMemo[1];
  var _usePagination = (0, _utils.usePagination)(_extends({
      data: data,
      page: (0, _utils.normalizeShow)(showProp, step),
      step: step
    }, paginate)),
    items = _usePagination[0],
    paginationProps = _usePagination[1];
  var Container = paginate ? StyledContainer : _react.Fragment;
  var containterProps = paginate ? _extends({}, theme.list.container) : undefined;
  var draggingRef = (0, _react.useRef)();
  var sendAnalytics = (0, _AnalyticsContext.useAnalytics)();
  var ariaProps = {
    role: onClickItem || onOrder ? 'listbox' : 'list'
  };
  if (active >= 0) {
    var activeId;
    // We have an item that is 'focused' within the list. This could
    // be the list item or one of the up/down ordering buttons.
    // We need to figure out an id of the thing that will be shown as active
    if (onOrder) {
      // figure out which arrow button will be the active one.
      var buttonId = active % 2 ? 'MoveDown' : 'MoveUp';
      var itemIndex = Math.trunc(active / 2);
      activeId = "" + getItemId(orderableData[itemIndex], itemIndex, itemKey, primaryKey) + buttonId;
    } else if (onClickItem) {
      // The whole list item is active. Figure out an id
      activeId = getItemId(orderableData[active], active, itemKey, primaryKey);
    }
    ariaProps['aria-activedescendant'] = activeId;
  }
  return /*#__PURE__*/_react["default"].createElement(Container, containterProps, /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEnter: (onClickItem || onOrder) && active >= 0 ? function (event) {
      if (onOrder) {
        var index = Math.trunc(active / 2);
        // Call onOrder with the re-ordered data.
        // Update the active control index so that the
        // active control will stay on the same item
        // even though it moved up or down.
        if (active % 2) {
          onOrder(reorder(orderableData, pinnedInfo, index, index + 1));
          updateActive(Math.min(active + 2, orderableData.length * 2 - 2));
        } else {
          onOrder(reorder(orderableData, pinnedInfo, index, index - 1));
          updateActive(Math.max(active - 2, 1));
        }
      } else if (disabledItems != null && disabledItems.includes(getValue(data[active], active, itemKey))) {
        event.preventDefault();
      } else if (onClickItem) {
        event.persist();
        var adjustedEvent = event;
        adjustedEvent.item = data[active];
        adjustedEvent.index = active;
        onClickItem(adjustedEvent);
        sendAnalytics({
          type: 'listItemClick',
          element: listRef.current,
          event: adjustedEvent,
          item: data[active],
          index: active
        });
      }
    } : undefined,
    onUp: (onClickItem || onOrder) && active ? function () {
      var min = onOrder ? 1 : 0;
      updateActive(Math.max(active - 1, min));
    } : undefined,
    onDown: (onClickItem || onOrder) && orderableData && orderableData.length ? function () {
      var min = onOrder ? 1 : 0;
      var max = onOrder ? orderableData.length * 2 - 2 : data.length - 1;
      updateActive(active >= min ? Math.min(active + 1, max) : min);
    } : undefined,
    onKeyDown: onKeyDown
  }, /*#__PURE__*/_react["default"].createElement(StyledList, _extends({
    "aria-label": ariaLabel || a11yTitle,
    ref: listRef,
    as: as || 'ul',
    itemFocus: itemFocus,
    tabIndex: onClickItem || onOrder ? 0 : undefined,
    onFocus: function onFocus() {
      return (
        // Fixes zero-th index showing undefined.
        // Checks for active variable to stop bug where activeStyle
        // gets applied to lastActive instead of the item the user
        // is currently clicking on
        !active && active !== 0 ? updateActive(lastActive) : updateActive(active)
      );
    },
    onBlur: function onBlur() {
      setLastActive(active);
      updateActive(undefined);
    }
  }, ariaProps, rest), /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
    items: !paginate ? orderingData || data : items,
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
    var content;
    var boxProps = {};
    if (children) {
      content = children(item, index, onClickItem ? {
        active: active === index
      } : undefined);
    } else if (primaryKey) {
      var primary = getValue(item, index, primaryKey);
      content = typeof primary === 'string' || typeof primary === 'number' ? /*#__PURE__*/_react["default"].createElement(_Text.Text, {
        key: "p",
        weight: "bold"
      }, primary) : primary;
      if (secondaryKey) {
        var secondary = getValue(item, index, secondaryKey);
        content = [content, typeof secondary === 'string' || typeof secondary === 'number' ? /*#__PURE__*/_react["default"].createElement(_Text.Text, {
          key: "s"
        }, getValue(item, index, secondaryKey)) : secondary];
        boxProps = {
          direction: 'row',
          align: 'center',
          justify: 'between',
          gap: 'medium'
        };
      }
    } else if (typeof item === 'object') {
      content = item[Object.keys(item)[0]];
    } else {
      content = item;
    }
    var key = getValue(item, index, itemKey) || index;
    var orderableIndex = orderableData.findIndex(function (ordItem, ordIndex) {
      return getValue(ordItem, ordIndex, itemKey) === key;
    });
    var isDisabled;
    if (disabledItems) {
      if (typeof item === 'object' && !itemKey) {
        console.error( // eslint-disable-next-line max-len
        "Warning: Missing prop itemKey. Prop disabled requires itemKey to be specified when data is of type 'object'.");
      }
      isDisabled = disabledItems == null ? void 0 : disabledItems.includes(key);
    }
    var isPinned;
    if (pinned.length > 0) {
      if (typeof item === 'object' && !itemKey) {
        console.error( // eslint-disable-next-line max-len
        "Warning: Missing prop itemKey. Prop pin requires itemKey to be specified when data is of type 'object'.");
      }
      isPinned = pinned == null ? void 0 : pinned.includes(key);
    }
    if (action) {
      content = [/*#__PURE__*/_react["default"].createElement(_Box.Box, {
        align: "start",
        key: "actionContainer" + index
      }, content), action(item, index)];
      boxProps = {
        direction: 'row',
        align: secondaryKey ? 'start' : 'center',
        justify: 'between',
        gap: 'medium'
      };
    }
    var adjustedBackground = background || theme.list.item.background;
    if (!onOrder && active === index || dragging === index) {
      adjustedBackground = theme.global.hover.background;
    } else if (Array.isArray(adjustedBackground)) {
      adjustedBackground = adjustedBackground[index % adjustedBackground.length];
    } else if (isPinned) {
      adjustedBackground = theme.list.item.pinned.background;
    }
    var adjustedBorder = border !== undefined ? border : theme.list.item.border;
    if (adjustedBorder === 'horizontal' && index) {
      adjustedBorder = 'bottom';
    }
    var clickProps;
    if (onClickItem && !onOrder) {
      clickProps = {
        role: 'option',
        tabIndex: -1,
        active: active === index,
        onClick: function onClick(event) {
          // Only prevent event when disabled. We still want screen
          // readers to be aware that an option exists, but is in a
          // disabled state.
          if (isDisabled) {
            event.preventDefault();
          } else {
            // extract from React's synthetic event pool
            event.persist();
            var adjustedEvent = event;
            adjustedEvent.item = item;
            adjustedEvent.index = index;
            onClickItem(adjustedEvent);
            sendAnalytics({
              type: 'listItemClick',
              element: listRef.current,
              event: adjustedEvent,
              item: item,
              index: index
            });
          }
        },
        onMouseOver: function onMouseOver() {
          return updateActive(index);
        },
        onMouseOut: function onMouseOut() {
          return updateActive(undefined);
        },
        onFocus: function onFocus() {
          updateActive(index);
          setItemFocus(true);
        },
        onBlur: function onBlur() {
          updateActive(undefined);
          setItemFocus(false);
        }
      };
    }
    var orderProps;
    var orderControls;
    if (onOrder && !isPinned) {
      orderProps = {
        draggable: true,
        onDragStart: function onDragStart(event) {
          event.dataTransfer.setData('text/plain', '');
          // allowed per
          // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#define_the_drag_effect
          // eslint-disable-next-line no-param-reassign
          event.dataTransfer.effectAllowed = 'move';
          setDragging(orderableIndex);
          updateActive(undefined);
        },
        onDragEnd: function onDragEnd() {
          setDragging(undefined);
          setOrderingData(undefined);
        },
        onDragOver: function onDragOver(event) {
          if (dragging !== undefined) {
            event.preventDefault();
            if (dragging !== orderableIndex) {
              // eslint-disable-next-line no-param-reassign
              event.dataTransfer.dropEffect = 'move';
              setOrderingData(reorder(orderableData, pinnedInfo, dragging, orderableIndex));
              setDragging(orderableIndex);
            }
          }
        },
        onDrop: function onDrop() {
          if (orderingData) {
            onOrder(orderingData);
          }
        },
        ref: dragging === orderableIndex ? draggingRef : undefined
      };
      var Up = theme.list.icons.up;
      var Down = theme.list.icons.down;
      orderControls = !isPinned && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        direction: "row",
        align: "center",
        justify: "end"
      }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        id: key + "MoveUp",
        a11yTitle: orderableIndex + 1 + " " + key + " move up",
        icon: /*#__PURE__*/_react["default"].createElement(Up, null),
        hoverIndicator: true,
        focusIndicator: false,
        disabled: !orderableIndex,
        active: active === orderableIndex * 2,
        onClick: function onClick(event) {
          event.stopPropagation();
          onOrder(reorder(orderableData, pinnedInfo, orderableIndex, orderableIndex - 1));
        },
        tabIndex: -1,
        onMouseOver: function onMouseOver() {
          return updateActive(orderableIndex * 2);
        },
        onMouseOut: function onMouseOut() {
          return updateActive(undefined);
        },
        onFocus: function onFocus() {
          updateActive(orderableIndex * 2);
          setItemFocus(true);
        },
        onBlur: function onBlur() {
          updateActive(undefined);
          setItemFocus(false);
        }
      }), /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        id: key + "MoveDown",
        a11yTitle: orderableIndex + 1 + " " + key + " move down",
        icon: /*#__PURE__*/_react["default"].createElement(Down, null),
        hoverIndicator: true,
        focusIndicator: false,
        disabled: orderableIndex >= orderableData.length - 1,
        active: active === orderableIndex * 2 + 1,
        onClick: function onClick(event) {
          event.stopPropagation();
          onOrder(reorder(orderableData, pinnedInfo, orderableIndex, orderableIndex + 1));
        },
        tabIndex: -1,
        onMouseOver: function onMouseOver() {
          return updateActive(orderableIndex * 2 + 1);
        },
        onMouseOut: function onMouseOut() {
          return updateActive(undefined);
        },
        onFocus: function onFocus() {
          updateActive(orderableIndex * 2 + 1);
          setItemFocus(true);
        },
        onBlur: function onBlur() {
          updateActive(undefined);
          setItemFocus(false);
        }
      }));

      // wrap the main content and use
      // the boxProps defined for the content
      content = /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
        flex: true
      }, boxProps), content);

      // Adjust the boxProps to account for the order controls
      boxProps = {
        direction: 'row',
        align: defaultItemProps && defaultItemProps.align || 'center',
        gap: 'medium'
      };
    }
    var itemAriaProps;
    if (isDisabled) {
      itemAriaProps = {
        'aria-disabled': true
      };
      if (onClickItem) {
        itemAriaProps = _extends({}, itemAriaProps, {
          'aria-selected': false
        });
      }
    }
    var displayPinned;
    if (isPinned) {
      // Pinned icon and settings
      var Pin = theme.list.icons.pin;
      var pinSize = theme.list.item.pinned.icon.size;
      var pinPad = theme.list.item.pinned.icon.pad;
      boxProps = {
        direction: 'row',
        align: defaultItemProps && defaultItemProps.align || 'center',
        gap: 'medium'
      };
      displayPinned = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        direction: "row",
        align: "center",
        justify: "end",
        pad: pinPad
      }, /*#__PURE__*/_react["default"].createElement(Pin, {
        size: pinSize
      }));
      content = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        flex: true
      }, content);
    }
    if (itemProps && itemProps[index]) {
      boxProps = _extends({}, boxProps, itemProps[index]);
    }
    return /*#__PURE__*/_react["default"].createElement(StyledItem, _extends({
      key: key,
      tag: "li",
      background: adjustedBackground,
      border: adjustedBorder,
      isDisabled: isDisabled,
      flex: false,
      pad: pad || theme.list.item.pad
    }, defaultItemProps, boxProps, clickProps, orderProps, itemAriaProps), onOrder && /*#__PURE__*/_react["default"].createElement(_Text.Text, null, index + 1), content, displayPinned, orderControls);
  }))), paginate && data.length > step && items && items.length ? /*#__PURE__*/_react["default"].createElement(_Pagination.Pagination, _extends({
    alignSelf: "end"
  }, paginationProps)) : null);
});
List.displayName = 'List';
List.propTypes = _propTypes.ListPropTypes;