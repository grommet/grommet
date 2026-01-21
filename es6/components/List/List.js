var _excluded = ["a11yTitle", "aria-label", "action", "as", "background", "border", "children", "data", "defaultItemProps", "disabled", "focus", "itemKey", "itemProps", "messages", "onActive", "onClickItem", "onKeyDown", "onMore", "onOrder", "showIndex", "pad", "paginate", "pinned", "primaryKey", "secondaryKey", "show", "step"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { Fragment, cloneElement, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { Button } from '../Button';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { MessageContext } from '../../contexts/MessageContext';
import { Pagination } from '../Pagination';
import { Text } from '../Text';
import { genericStyles, normalizeColor, normalizeShow, useForwardedRef, usePagination, styledComponentsConfig } from '../../utils';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { ListPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var emptyData = [];
var StyledList = styled.ul.withConfig(styledComponentsConfig).withConfig({
  displayName: "List__StyledList",
  componentId: "sc-130gdqg-0"
})(["list-style:none;", " padding:0;", " ", "}"], function (props) {
  return !props.margin && 'margin: 0;';
}, genericStyles, function (props) {
  return props.theme.list && props.theme.list.extend;
});
var StyledItem = styled(Box).withConfig({
  displayName: "List__StyledItem",
  componentId: "sc-130gdqg-1"
})(["", " ", " ", " &:hover{", "}", ""], function (props) {
  return props.onClick && !props.isDisabled && "cursor: pointer;";
}, function (props) {
  return props.draggable && !props.isDisabled && "cursor: move;";
}, function (props) {
  var _props$theme$list;
  var disabledStyle;
  if (props.isDisabled && (_props$theme$list = props.theme.list) != null && (_props$theme$list = _props$theme$list.item) != null && _props$theme$list.disabled) {
    var _props$theme$list$ite = props.theme.list.item.disabled,
      color = _props$theme$list$ite.color,
      cursor = _props$theme$list$ite.cursor;
    disabledStyle = {
      color: normalizeColor(color, props.theme),
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
var StyledContainer = styled(Box).withConfig({
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

/** Calculate tabIndex for order control buttons. */
var calculateTabIndex = function calculateTabIndex(buttonIndex, focused, lastFocused, disabled) {
  if (disabled) return -1;
  // is currently focused
  return focused !== undefined && focused === buttonIndex ||
  // was last focused
  focused === undefined && lastFocused === buttonIndex ||
  // first "move down" button when entering the list for first time
  focused === undefined && lastFocused === undefined && buttonIndex === 1 ? 0 : -1;
};
var List = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
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
    messages = _ref.messages,
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
  var listRef = useForwardedRef(ref);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useContext = useContext(DataContext),
    contextData = _useContext.data;
  var data = dataProp || contextData || emptyData;
  var _useContext2 = useContext(MessageContext),
    format = _useContext2.format;

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
  var _useState = useState(),
    active = _useState[0],
    setActive = _useState[1];
  /** The item or order control that is most recently interacted with by
   * mouse over or keyboard  */
  var updateActive = function updateActive(nextActive) {
    setActive(nextActive);
    // we occasionally call updateActive with undefined when it already is so,
    // no need to call onActive in that case
    if (onActive && onClickItem && nextActive !== active) onActive(nextActive);
  };
  var _useState2 = useState(),
    focused = _useState2[0],
    setFocused = _useState2[1];
  var _useState3 = useState(),
    lastFocused = _useState3[0],
    setLastFocused = _useState3[1];
  /** Update the item or move up/move down button that is focused
   * in the DOM  */
  var updateFocused = function updateFocused(nextFocused) {
    setFocused(nextFocused);
  };
  var handleFocus = function handleFocus(nextFocused) {
    updateActive(nextFocused);
    updateFocused(nextFocused);
  };

  // roving tab index, ensure focused item (when onClickItem)
  // or move up / move down button (when onOrder) has DOM focus
  var focusedRef = useRef();
  useEffect(function () {
    if (focused !== undefined) {
      var _focusedRef$current;
      (_focusedRef$current = focusedRef.current) == null || _focusedRef$current.focus();
    }
  }, [focused, data]);
  var _useState4 = useState(),
    dragging = _useState4[0],
    setDragging = _useState4[1];
  var _useState5 = useState(),
    orderingData = _useState5[0],
    setOrderingData = _useState5[1];

  // store a reference to the pinned and the data that is orderable
  var _useMemo = useMemo(function () {
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
  var _usePagination = usePagination(_extends({
      data: data,
      page: normalizeShow(showProp, step),
      step: step
    }, paginate)),
    items = _usePagination[0],
    paginationProps = _usePagination[1];
  var Container = paginate ? StyledContainer : Fragment;
  var containterProps = paginate ? _extends({}, theme.list.container, passThemeFlag) : undefined;
  var draggingRef = useRef();
  var sendAnalytics = useAnalytics();
  var ariaProps = {
    role: onClickItem ? 'listbox' : 'list'
  };
  var onSelectOption = function onSelectOption(event, nextFocused) {
    if ((onClickItem || onOrder) && nextFocused >= 0) {
      if (onOrder) {
        var index = Math.trunc(nextFocused / 2);
        // Call onOrder with the re-ordered data.
        // Update the focused control index so that the
        // focused control will stay on the same item
        // even though it moved up or down.
        var newIndex = nextFocused % 2 ? index + 1 : index - 1;
        onOrder(reorder(orderableData, pinnedInfo, index, newIndex));

        // distinguish keyboard "click" from mouse "click" event
        // when keyboard, event.detail is always 0
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event#usage_notes
        // when keyboard, move focus with the moving item
        if (event.detail === 0) updateFocused(focused % 2 ? Math.min(focused + 2, orderableData.length * 2 - 2) : Math.max(focused - 2, 1));
        // when mouse, keep focused on the same control
        else {
          updateFocused(nextFocused);
        }
      } else if (disabledItems != null && disabledItems.includes(getValue(data[nextFocused], nextFocused, itemKey))) {
        event.preventDefault();
      } else if (onClickItem) {
        event.persist();
        updateFocused(nextFocused);
        var adjustedEvent = event;
        // When paginated, use 'items'
        var currentItems = !paginate ? orderingData || data : items;
        adjustedEvent.item = currentItems[nextFocused];
        adjustedEvent.index = !paginate ? nextFocused : (paginationProps.page - 1) * step + nextFocused;
        onClickItem(adjustedEvent);
        sendAnalytics({
          type: 'listItemClick',
          element: listRef.current,
          event: adjustedEvent,
          item: adjustedEvent.item,
          index: adjustedEvent.index
        });
      }
    }
  };
  return /*#__PURE__*/React.createElement(Container, containterProps, /*#__PURE__*/React.createElement(Keyboard, {
    onUp: function onUp(event) {
      if (onClickItem || onOrder) {
        event.preventDefault();
        if (focused >= 0) {
          var min = onOrder ? 1 : 0;
          var focusedElementIndex = Math.max(focused - 1, min);
          handleFocus(focusedElementIndex);

          // Ensure the focused item is in view
          // setTimeout for focusedElement to be updated
          setTimeout(function () {
            var _listRef$current;
            // eslint-disable max-len
            (_listRef$current = listRef.current) == null || (_listRef$current = _listRef$current.children[focusedElementIndex]) == null || _listRef$current.scrollIntoView({
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
          var focusedElementIndex = focused >= min ? Math.min(focused + 1, max) : min;
          handleFocus(focusedElementIndex);

          // Ensure the focused item is in view
          // setTimeout for focusedElement to be updated
          setTimeout(function () {
            var _listRef$current2;
            //  eslint-disable max-len
            (_listRef$current2 = listRef.current) == null || (_listRef$current2 = _listRef$current2.children[focusedElementIndex]) == null || _listRef$current2.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            });
          }, 0);
        }
      }
    },
    onKeyDown: onKeyDown
  }, /*#__PURE__*/React.createElement(StyledList, _extends({
    "aria-label": ariaLabel || a11yTitle,
    ref: listRef,
    as: as || 'ul',
    onBlur: function onBlur(event) {
      setLastFocused(focused);
      // only reset focused if the focus is leaving the list
      // and not moving to a child element of the list
      if (listRef.current && !listRef.current.contains(event.relatedTarget)) {
        updateFocused(undefined);
      }
    },
    onMouseOut: function onMouseOut() {
      return updateActive(undefined);
    }
  }, ariaProps, passThemeFlag, rest), /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: !paginate ? orderingData || data : items,
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
      content = typeof primary === 'string' || typeof primary === 'number' ? /*#__PURE__*/React.createElement(Text, _extends({
        color: pinnedColor,
        key: "p"
      }, theme.list.primaryKey), primary) : primary;
      if (secondaryKey) {
        var _theme$list;
        var secondary = getValue(item, index, secondaryKey);
        content = [content, typeof secondary === 'string' || typeof secondary === 'number' ? /*#__PURE__*/React.createElement(Text, {
          color: pinnedColor,
          key: "s"
        }, getValue(item, index, secondaryKey)) : secondary];
        boxProps = {
          direction: 'row',
          align: 'center',
          justify: 'between',
          gap: (_theme$list = theme.list) == null || (_theme$list = _theme$list.item) == null ? void 0 : _theme$list.gap
        };
      }
    } else if (typeof item === 'object') {
      var value = item[Object.keys(item)[0]];
      content =
      // for backwards compatibility, only wrap in Text if
      // pinned.color is defined
      pinnedColor && typeof value === 'string' ? /*#__PURE__*/React.createElement(Text, {
        color: pinnedColor
      }, value) : value;
    } else {
      // for backwards compatibility, only wrap in Text if
      // pinned.color is defined
      content = pinnedColor ? /*#__PURE__*/React.createElement(Text, {
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
      var _theme$list2;
      content = [/*#__PURE__*/React.createElement(Box, {
        align: "start",
        key: "actionContainer" + index
      }, content), action(item, index)];
      boxProps = {
        direction: 'row',
        align: secondaryKey ? 'start' : 'center',
        justify: 'between',
        gap: (_theme$list2 = theme.list) == null || (_theme$list2 = _theme$list2.item) == null ? void 0 : _theme$list2.gap
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
        tabIndex:
        // entering list for first time
        focused === undefined && lastFocused === undefined && index === 0 ||
        // returning to list after already using keyboard
        focused === undefined && lastFocused !== undefined && lastFocused === index ||
        // actively using keyboard
        focused === index ? 0 : -1,
        active: active === index,
        focus: focused === index,
        hoverIndicator: !isDisabled,
        ref: function ref(node) {
          if (focused === index) {
            focusedRef.current = node;
          }
        },
        onClick: function onClick(event) {
          // Only prevent event when disabled. We still want screen
          // readers to be aware that an option exists, but is in a
          // disabled state.
          if (isDisabled) {
            event.preventDefault();
          } else {
            onSelectOption(event, index);
          }
        },
        onFocus: function onFocus() {
          handleFocus(index);
        },
        onMouseOver: function onMouseOver() {
          return updateActive(index);
        }
      };
    }
    var orderProps;
    var orderControls;
    if (onOrder && !isPinned) {
      var _theme$list3;
      orderProps = {
        draggable: true,
        onDragStart: function onDragStart(event) {
          event.dataTransfer.setData('text/plain', '');
          // allowed per
          // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#define_the_drag_effect
          // eslint-disable-next-line no-param-reassign
          event.dataTransfer.effectAllowed = 'move';
          setDragging(orderableIndex);
          updateFocused(undefined);
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
      var moveUpIndex = orderableIndex * 2;
      var moveUpTabIndex = calculateTabIndex(moveUpIndex, focused, lastFocused, !orderableIndex // first item can't move up
      );
      var moveDownIndex = orderableIndex * 2 + 1;
      var moveDownTabIndex = calculateTabIndex(moveDownIndex, focused, lastFocused,
      // last item can't move down
      orderableIndex >= orderableData.length - 1);
      orderControls = !isPinned && /*#__PURE__*/React.createElement(Box, {
        direction: "row",
        align: "center",
        justify: "end"
      }, /*#__PURE__*/React.createElement(Button, {
        id: key + "MoveUp",
        a11yTitle: orderableIndex + 1 + " " + key + " move up",
        icon: /*#__PURE__*/React.createElement(Up, null),
        hoverIndicator: true,
        disabled: !orderableIndex,
        active: focused === moveUpIndex,
        onClick: function onClick(event) {
          event.stopPropagation();
          onSelectOption(event, moveUpIndex);
        },
        tabIndex: moveUpTabIndex,
        ref: function ref(node) {
          if (focused === moveUpIndex) {
            focusedRef.current = node;
          }
        }
      }), /*#__PURE__*/React.createElement(Button, {
        id: key + "MoveDown",
        a11yTitle: orderableIndex + 1 + " " + key + " move down",
        icon: /*#__PURE__*/React.createElement(Down, null),
        hoverIndicator: true,
        disabled: orderableIndex >= orderableData.length - 1,
        active: focused === moveDownIndex,
        onClick: function onClick(event) {
          event.stopPropagation();
          onSelectOption(event, moveDownIndex);
        },
        tabIndex: moveDownTabIndex,
        ref: function ref(node) {
          if (focused === moveDownIndex) {
            focusedRef.current = node;
          }
        },
        onFocus: function onFocus() {
          // make sure first "MoveDown" is focusable
          if (focused === undefined && lastFocused === undefined) {
            handleFocus(moveDownIndex);
          }
        }
      }));

      // wrap the main content and use
      // the boxProps defined for the content
      content = /*#__PURE__*/React.createElement(Box, _extends({
        flex: true
      }, boxProps), content);

      // Adjust the boxProps to account for the order controls
      boxProps = {
        direction: 'row',
        align: defaultItemProps && defaultItemProps.align || 'center',
        gap: (_theme$list3 = theme.list) == null || (_theme$list3 = _theme$list3.item) == null ? void 0 : _theme$list3.gap
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
      var _pinIcon$props, _theme$list4;
      var pinSize = theme.list.item.pinned.icon.size;
      var pinPad = theme.list.item.pinned.icon.pad;
      var Icon = (pinned == null ? void 0 : pinned.icon) || theme.list.icons.pin;
      var pinIcon = /*#__PURE__*/React.isValidElement(Icon) ? Icon : /*#__PURE__*/React.createElement(Icon, null);
      pinIcon = /*#__PURE__*/cloneElement(pinIcon, _extends({}, !((_pinIcon$props = pinIcon.props) != null && _pinIcon$props.color) && pinnedColor ? {
        color: pinnedColor
      } : {}, {
        a11yTitle: format({
          id: 'list.pinned',
          messages: messages
        }),
        size: pinSize
      }));
      boxProps = {
        direction: 'row',
        align: defaultItemProps && defaultItemProps.align || 'center',
        gap: (_theme$list4 = theme.list) == null || (_theme$list4 = _theme$list4.item) == null ? void 0 : _theme$list4.gap
      };
      displayPinned = /*#__PURE__*/React.createElement(Box, {
        direction: "row",
        align: "center",
        justify: "end",
        pad: pinPad
      }, pinIcon);
      content = /*#__PURE__*/React.createElement(Box, {
        flex: true
      }, content);
    }
    if (itemProps && itemProps[index]) {
      boxProps = _extends({}, boxProps, itemProps[index]);
    }
    return /*#__PURE__*/React.createElement(StyledItem, _extends({
      key: key,
      tag: "li",
      background: adjustedBackground,
      border: adjustedBorder,
      isDisabled: isDisabled,
      flex: false,
      pad: pad || theme.list.item.pad
    }, defaultItemProps, boxProps, clickProps, orderProps, itemAriaProps, passThemeFlag), showIndex && onOrder && /*#__PURE__*/React.createElement(Text, {
      color: pinnedColor
    }, index + 1), content, displayPinned, orderControls);
  }))), paginate && data.length > step && items && items.length ? /*#__PURE__*/React.createElement(Pagination, _extends({
    alignSelf: "end"
  }, paginationProps)) : null);
});
List.displayName = 'List';
List.propTypes = ListPropTypes;
export { List };