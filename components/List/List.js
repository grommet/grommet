"use strict";

exports.__esModule = true;
exports.List = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
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
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["a11yTitle", "aria-label", "action", "as", "background", "border", "children", "data", "defaultItemProps", "disabled", "focus", "itemKey", "itemProps", "onActive", "onClickItem", "onKeyDown", "onMore", "onOrder", "showIndex", "pad", "paginate", "pinned", "primaryKey", "secondaryKey", "show", "step"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var emptyData = [];
var StyledList = _styledComponents["default"].ul.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "List__StyledList",
  componentId: "sc-130gdqg-0"
})(["list-style:none;", " padding:0;", " &:focus{", "}", "}&:focus:not(:focus-visible){", "}"], function (props) {
  return !props.margin && 'margin: 0;';
}, _utils.genericStyles, function (props) {
  return props.tabIndex >= 0 && (0, _utils.focusStyle)({
    forceOutline: true,
    skipSvgChildren: true
  });
}, function (props) {
  return props.theme.list && props.theme.list.extend;
}, (0, _utils.unfocusStyle)());
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
    _ref$showIndex = _ref.showIndex,
    showIndex = _ref$showIndex === void 0 ? true : _ref$showIndex,
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
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
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
        var _pinned$items;
        var key = getValue(item, index, itemKey);
        var isPinned = Array.isArray(pinned) ? pinned.includes(key) : typeof pinned === 'object' && (pinned == null || (_pinned$items = pinned.items) == null ? void 0 : _pinned$items.includes(key));
        if (isPinned) {
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
  var containterProps = paginate ? _extends({}, theme.list.container, passThemeFlag) : undefined;
  var draggingRef = (0, _react.useRef)();
  var sendAnalytics = (0, _AnalyticsContext.useAnalytics)();
  var ariaProps = {
    role: onClickItem ? 'listbox' : 'list'
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
  var onSelectOption = function onSelectOption(event) {
    if ((onClickItem || onOrder) && active >= 0) {
      if (onOrder) {
        var index = Math.trunc(active / 2);
        // Call onOrder with the re-ordered data.
        // Update the active control index so that the
        // active control will stay on the same item
        // even though it moved up or down.
        var newIndex = active % 2 ? index + 1 : index - 1;
        onOrder(reorder(orderableData, pinnedInfo, index, newIndex));
        updateActive(active % 2 ? Math.min(active + 2, orderableData.length * 2 - 2) : Math.max(active - 2, 1));
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
    }
  };
  return /*#__PURE__*/_react["default"].createElement(Container, containterProps, /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEnter: onSelectOption,
    onSpace: function onSpace(event) {
      if (onClickItem || onOrder) {
        event.preventDefault();
      }
      onSelectOption(event);
    },
    onUp: function onUp(event) {
      if (onClickItem || onOrder) {
        event.preventDefault();
        if (active) {
          var min = onOrder ? 1 : 0;
          var activeElementIndex = Math.max(active - 1, min);
          updateActive(activeElementIndex);

          // Ensure the active item is in view
          // setTimeout for activeElement to be updated
          setTimeout(function () {
            var _listRef$current;
            // eslint-disable max-len
            (_listRef$current = listRef.current) == null || (_listRef$current = _listRef$current.children[activeElementIndex]) == null || _listRef$current.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            });
          }, 0);
        }
      }
    },
    onDown: function onDown(event) {
      if (onClickItem || onOrder) {
        event.preventDefault();
        if (orderableData && orderableData.length) {
          var min = onOrder ? 1 : 0;
          var max = onOrder ? orderableData.length * 2 - 2 : data.length - 1;
          var activeElementIndex = active >= min ? Math.min(active + 1, max) : min;
          updateActive(activeElementIndex);

          // Ensure the active item is in view
          // setTimeout for activeElement to be updated
          setTimeout(function () {
            var _listRef$current2;
            //  eslint-disable max-len
            (_listRef$current2 = listRef.current) == null || (_listRef$current2 = _listRef$current2.children[activeElementIndex]) == null || _listRef$current2.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            });
          }, 0);
        }
      }
    },
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
  }, ariaProps, passThemeFlag, rest), /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
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
    var _pinned$items2;
    var content;
    var boxProps = {};
    var key = getValue(item, index, itemKey) || index;
    var isPinned;
    if (Array.isArray(pinned) && pinned.length > 0 || Array.isArray(pinned == null ? void 0 : pinned.items) && (pinned == null || (_pinned$items2 = pinned.items) == null ? void 0 : _pinned$items2.length) > 0) {
      if (typeof item === 'object' && !itemKey) {
        console.error(// eslint-disable-next-line max-len
        "Warning: Missing prop itemKey. Prop pin requires itemKey to be specified when data is of type 'object'.");
      }
      isPinned = Array.isArray(pinned) ? pinned == null ? void 0 : pinned.includes(key) : pinned.items.some(function (pinnedItem) {
        return pinnedItem === key;
      });
    }
    var pinnedColor = isPinned ? pinned.color : undefined;
    if (children) {
      content = children(item, index, onClickItem ? {
        active: active === index
      } : undefined);
    } else if (primaryKey) {
      var primary = getValue(item, index, primaryKey);
      content = typeof primary === 'string' || typeof primary === 'number' ? /*#__PURE__*/_react["default"].createElement(_Text.Text, _extends({
        color: pinnedColor,
        key: "p"
      }, theme.list.primaryKey), primary) : primary;
      if (secondaryKey) {
        var secondary = getValue(item, index, secondaryKey);
        content = [content, typeof secondary === 'string' || typeof secondary === 'number' ? /*#__PURE__*/_react["default"].createElement(_Text.Text, {
          color: pinnedColor,
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
      var value = item[Object.keys(item)[0]];
      content =
      // for backwards compatibility, only wrap in Text if
      // pinned.color is defined
      pinnedColor && typeof value === 'string' ? /*#__PURE__*/_react["default"].createElement(_Text.Text, {
        color: pinnedColor
      }, value) : value;
    } else {
      // for backwards compatibility, only wrap in Text if
      // pinned.color is defined
      content = pinnedColor ? /*#__PURE__*/_react["default"].createElement(_Text.Text, {
        color: pinnedColor
      }, item) : item;
    }
    var orderableIndex = orderableData.findIndex(function (ordItem, ordIndex) {
      return getValue(ordItem, ordIndex, itemKey) === key;
    });
    var isDisabled;
    if (disabledItems) {
      if (typeof item === 'object' && !itemKey) {
        console.error(// eslint-disable-next-line max-len
        "Warning: Missing prop itemKey. Prop disabled requires itemKey to be specified when data is of type 'object'.");
      }
      isDisabled = disabledItems == null ? void 0 : disabledItems.includes(key);
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
      adjustedBackground = (pinned == null ? void 0 : pinned.background) || theme.list.item.pinned.background;
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
      var _pinIcon$props;
      var pinSize = theme.list.item.pinned.icon.size;
      var pinPad = theme.list.item.pinned.icon.pad;
      var Icon = (pinned == null ? void 0 : pinned.icon) || theme.list.icons.pin;
      var pinIcon = /*#__PURE__*/_react["default"].isValidElement(Icon) ? Icon : /*#__PURE__*/_react["default"].createElement(Icon, null);
      pinIcon = /*#__PURE__*/(0, _react.cloneElement)(pinIcon, _extends({}, !((_pinIcon$props = pinIcon.props) != null && _pinIcon$props.color) && pinnedColor ? {
        color: pinnedColor
      } : {}, {
        size: pinSize
      }));
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
      }, pinIcon);
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
    }, defaultItemProps, boxProps, clickProps, orderProps, itemAriaProps, passThemeFlag), showIndex && onOrder && /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      color: pinnedColor
    }, index + 1), content, displayPinned, orderControls);
  }))), paginate && data.length > step && items && items.length ? /*#__PURE__*/_react["default"].createElement(_Pagination.Pagination, _extends({
    alignSelf: "end"
  }, paginationProps)) : null);
});
List.displayName = 'List';
List.propTypes = _propTypes.ListPropTypes;