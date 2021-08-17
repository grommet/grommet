var _excluded = ["action", "as", "background", "border", "children", "data", "focus", "itemProps", "onOrder", "pad", "paginate", "primaryKey", "secondaryKey", "show", "step", "onClickItem", "onMore"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Fragment, useContext, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Button } from '../Button';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Pagination } from '../Pagination';
import { Text } from '../Text';
import { focusStyle, genericStyles, normalizeShow, unfocusStyle, useForwardedRef, usePagination } from '../../utils';
import { ListPropTypes } from './propTypes';
var StyledList = styled.ul.withConfig({
  displayName: "List__StyledList",
  componentId: "sc-130gdqg-0"
})(["list-style:none;", " padding:0;", " &:focus{", "}", "}", "}"], function (props) {
  return !props.margin && 'margin: 0;';
}, genericStyles, function (props) {
  return props.tabIndex >= 0 && focusStyle({
    forceOutline: true,
    skipSvgChildren: true
  });
}, function (props) {
  return props.itemFocus && focusStyle({
    forceOutline: true,
    skipSvgChildren: true
  });
}, function (props) {
  return props.theme.list && props.theme.list.extend;
});
var StyledItem = styled(Box).withConfig({
  displayName: "List__StyledItem",
  componentId: "sc-130gdqg-1"
})(["", " ", " &:focus{", "}", ""], function (props) {
  return props.onClick && "cursor: pointer;";
}, function (props) {
  return props.draggable && "cursor: move;";
}, unfocusStyle({
  forceOutline: true,
  skipSvgChildren: true
}), function (props) {
  return props.theme.list && props.theme.list.item && props.theme.list.item.extend;
}); // when paginated, this wraps the data table and pagination component

var StyledContainer = styled(Box).withConfig({
  displayName: "List__StyledContainer",
  componentId: "sc-130gdqg-2"
})(["", ";"], function (props) {
  return props.theme.list && props.theme.list.container && props.theme.list.container.extend;
});

var normalize = function normalize(item, index, property) {
  if (typeof property === 'function') {
    return property(item, index);
  }

  return item[property];
};

var reorder = function reorder(array, source, target) {
  var result = array.slice(0);
  var tmp = result[source];
  if (source < target) for (var i = source; i < target; i += 1) {
    result[i] = result[i + 1];
  } else for (var _i = source; _i > target; _i -= 1) {
    result[_i] = result[_i - 1];
  }
  result[target] = tmp;
  return result;
}; // Determine the primary content for a row. If the List
// has a primaryKey defined this returns the item data
// based on this primary key. If no primaryKey property
// is defined this will return unknown. The intent of
// the content from the primary key is that it is unique
// within the list.


var getPrimaryContent = function getPrimaryContent(item, index, primaryKey) {
  var primaryContent;

  if (primaryKey) {
    if (typeof primaryKey === 'function') {
      primaryContent = primaryKey(item, index);
    } else {
      primaryContent = normalize(item, index, primaryKey);
    }
  }

  return primaryContent;
};

var getKey = function getKey(item, index, primaryContent) {
  if (typeof primaryContent === 'string') {
    return primaryContent;
  }

  return typeof item === 'string' ? item : index;
};

var getItemId = function getItemId(item, index, primaryKey) {
  var primaryContent = getPrimaryContent(item, index, primaryKey);
  return getKey(item, index, primaryContent);
};

var List = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var action = _ref.action,
      as = _ref.as,
      background = _ref.background,
      border = _ref.border,
      children = _ref.children,
      data = _ref.data,
      focus = _ref.focus,
      itemProps = _ref.itemProps,
      onOrder = _ref.onOrder,
      pad = _ref.pad,
      paginate = _ref.paginate,
      primaryKey = _ref.primaryKey,
      secondaryKey = _ref.secondaryKey,
      showProp = _ref.show,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? paginate ? 50 : undefined : _ref$step,
      onClickItem = _ref.onClickItem,
      onMore = _ref.onMore,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var listRef = useForwardedRef(ref);
  var theme = useContext(ThemeContext); // active will be the index of the current 'active'
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

  var _useState2 = useState(),
      lastActive = _useState2[0],
      setLastActive = _useState2[1];

  var _useState3 = useState(),
      itemFocus = _useState3[0],
      setItemFocus = _useState3[1];

  var _useState4 = useState(),
      dragging = _useState4[0],
      setDragging = _useState4[1];

  var _usePagination = usePagination(_extends({
    data: data,
    page: normalizeShow(showProp, step),
    step: step
  }, paginate)),
      items = _usePagination[0],
      paginationProps = _usePagination[1];

  var Container = paginate ? StyledContainer : Fragment;
  var containterProps = paginate ? _extends({}, theme.list.container) : undefined;

  var _useState5 = useState(),
      orderingData = _useState5[0],
      setOrderingData = _useState5[1];

  var draggingRef = useRef();
  var ariaProps = {
    role: onClickItem || onOrder ? 'listbox' : 'list'
  };

  if (active >= 0) {
    var activeId; // We have an item that is 'focused' within the list. This could
    // be the list item or one of the up/down ordering buttons.
    // We need to figure out an id of the thing that will be shown as active

    if (onOrder) {
      // figure out which arrow button will be the active one.
      var buttonId = active % 2 ? 'MoveDown' : 'MoveUp';
      var itemIndex = Math.trunc(active / 2);
      activeId = "" + getItemId(data[itemIndex], itemIndex, primaryKey) + buttonId;
    } else if (onClickItem) {
      // The whole list item is active. Figure out an id
      activeId = getItemId(data[active], active, primaryKey);
    }

    ariaProps['aria-activedescendant'] = activeId;
  }

  return /*#__PURE__*/React.createElement(Container, containterProps, /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: (onClickItem || onOrder) && active >= 0 ? function (event) {
      if (onOrder) {
        var index = Math.trunc(active / 2); // Call onOrder with the re-ordered data.
        // Update the active control index so that the
        // active control will stay on the same item
        // even though it moved up or down.

        if (active % 2) {
          onOrder(reorder(data, index, index + 1));
          setActive(Math.min(active + 2, data.length * 2 - 2));
        } else {
          onOrder(reorder(data, index, index - 1));
          setActive(Math.max(active - 2, 1));
        }
      } else {
        event.persist();
        var adjustedEvent = event;
        adjustedEvent.item = data[active];
        adjustedEvent.index = active;
        onClickItem(adjustedEvent);
      }
    } : undefined,
    onUp: (onClickItem || onOrder) && active ? function () {
      var min = onOrder ? 1 : 0;
      setActive(Math.max(active - 1, min));
    } : undefined,
    onDown: (onClickItem || onOrder) && data && data.length ? function () {
      var min = onOrder ? 1 : 0;
      var max = onOrder ? data.length * 2 - 2 : data.length - 1;
      setActive(active >= min ? Math.min(active + 1, max) : min);
    } : undefined
  }, /*#__PURE__*/React.createElement(StyledList, _extends({
    ref: listRef,
    as: as || 'ul',
    itemFocus: itemFocus,
    tabIndex: onClickItem || onOrder ? 0 : undefined,
    onFocus: function onFocus() {
      return (// Fixes zero-th index showing undefined.
        // Checks for active variable to stop bug where activeStyle
        // gets applied to lastActive instead of the item the user
        // is currently clicking on
        !active && active !== 0 ? setActive(lastActive) : setActive(active)
      );
    },
    onBlur: function onBlur() {
      setLastActive(active);
      setActive(undefined);
    }
  }, ariaProps, rest), /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: !paginate ? orderingData || data : items,
    onMore: onMore,
    scrollableAncestor: "window",
    show: !paginate ? showProp : undefined,
    step: step,
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/React.createElement(Box, {
        as: "li",
        flex: false
      }, marker);
    }
  }, function (item, index) {
    var content;
    var boxProps = {};
    var itemId;

    if (children) {
      content = children(item, index, onClickItem ? {
        active: active === index
      } : undefined);
    } else if (primaryKey) {
      if (typeof primaryKey === 'function') {
        itemId = primaryKey(item, index);
        content = itemId;
      } else {
        itemId = normalize(item, index, primaryKey);
        content = /*#__PURE__*/React.createElement(Text, {
          key: "p",
          weight: "bold"
        }, itemId);
      }

      if (secondaryKey) {
        if (typeof secondaryKey === 'function') {
          content = [content, secondaryKey(item, index)];
        } else {
          content = [content, /*#__PURE__*/React.createElement(Text, {
            key: "s"
          }, normalize(item, index, secondaryKey))];
        }

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

    var key = getKey(item, index, itemId);

    if (action) {
      content = [/*#__PURE__*/React.createElement(Box, {
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
          // extract from React's synthetic event pool
          event.persist();
          var adjustedEvent = event;
          adjustedEvent.item = item;
          adjustedEvent.index = index;
          onClickItem(adjustedEvent); // put focus on the List container to meet WCAG
          // accessibility guidelines that focus remains on `ul`

          listRef.current.focus();
        },
        onMouseOver: function onMouseOver() {
          return setActive(index);
        },
        onMouseOut: function onMouseOut() {
          return setActive(undefined);
        },
        onFocus: function onFocus() {
          setActive(index);
          setItemFocus(true);
        },
        onBlur: function onBlur() {
          setActive(undefined);
          setItemFocus(false);
        }
      };
    }

    var orderProps;
    var orderControls;

    if (onOrder) {
      orderProps = {
        draggable: true,
        onDragStart: function onDragStart(event) {
          event.dataTransfer.setData('text/plain', ''); // allowed per
          // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#define_the_drag_effect
          // eslint-disable-next-line no-param-reassign

          event.dataTransfer.effectAllowed = 'move';
          setDragging(index);
          setActive(undefined);
        },
        onDragEnd: function onDragEnd() {
          setDragging(undefined);
          setOrderingData(undefined);
        },
        onDragOver: function onDragOver(event) {
          if (dragging !== undefined) {
            event.preventDefault();

            if (dragging !== index) {
              // eslint-disable-next-line no-param-reassign
              event.dataTransfer.dropEffect = 'move';
              setOrderingData(reorder(orderingData || data, dragging, index));
              setDragging(index);
            }
          }
        },
        onDrop: function onDrop() {
          if (orderingData) {
            onOrder(orderingData);
          }
        },
        ref: dragging === index ? draggingRef : undefined
      };
      var Up = theme.list.icons.up;
      var Down = theme.list.icons.down;
      orderControls = /*#__PURE__*/React.createElement(Box, {
        direction: "row",
        align: "center",
        justify: "end"
      }, /*#__PURE__*/React.createElement(Button, {
        id: key + "MoveUp",
        a11yTitle: index + 1 + " " + key + " move up",
        icon: /*#__PURE__*/React.createElement(Up, null),
        hoverIndicator: true,
        focusIndicator: false,
        disabled: !index,
        active: active === index * 2,
        onClick: function onClick(event) {
          event.stopPropagation();
          onOrder(reorder(data, index, index - 1));
        },
        tabIndex: -1,
        onMouseOver: function onMouseOver() {
          return setActive(index * 2);
        },
        onMouseOut: function onMouseOut() {
          return setActive(undefined);
        },
        onFocus: function onFocus() {
          setActive(index * 2);
          setItemFocus(true);
        },
        onBlur: function onBlur() {
          setActive(undefined);
          setItemFocus(false);
        }
      }), /*#__PURE__*/React.createElement(Button, {
        id: key + "MoveDown",
        a11yTitle: index + 1 + " " + key + " move down",
        icon: /*#__PURE__*/React.createElement(Down, null),
        hoverIndicator: true,
        focusIndicator: false,
        disabled: index >= data.length - 1,
        active: active === index * 2 + 1,
        onClick: function onClick(event) {
          event.stopPropagation();
          onOrder(reorder(data, index, index + 1));
        },
        tabIndex: -1,
        onMouseOver: function onMouseOver() {
          return setActive(index * 2 + 1);
        },
        onMouseOut: function onMouseOut() {
          return setActive(undefined);
        },
        onFocus: function onFocus() {
          setActive(index * 2 + 1);
          setItemFocus(true);
        },
        onBlur: function onBlur() {
          setActive(undefined);
          setItemFocus(false);
        }
      }));
      boxProps = {
        direction: 'row',
        align: 'center',
        gap: 'medium'
      };
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
      flex: false,
      pad: pad || theme.list.item.pad,
      background: adjustedBackground,
      border: adjustedBorder
    }, boxProps, clickProps, orderProps), onOrder && /*#__PURE__*/React.createElement(Text, null, index + 1), content, orderControls);
  }))), paginate && data.length > step && items && items.length ? /*#__PURE__*/React.createElement(Pagination, _extends({
    alignSelf: "end"
  }, paginationProps)) : null);
});
List.displayName = 'List';
List.propTypes = ListPropTypes;
export { List };