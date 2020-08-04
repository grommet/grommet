function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { focusStyle, genericStyles, useForwardedRef } from '../../utils';
var StyledList = styled.ul.withConfig({
  displayName: "List__StyledList",
  componentId: "sc-130gdqg-0"
})(["list-style:none;", " padding:0;", " &:focus{", "}"], function (props) {
  return !props.margin && 'margin: 0;';
}, genericStyles, function (props) {
  return props.tabIndex >= 0 && focusStyle({
    forceOutline: true,
    skipSvgChildren: true
  });
});
var StyledItem = styled(Box).withConfig({
  displayName: "List__StyledItem",
  componentId: "sc-130gdqg-1"
})(["", ""], function (props) {
  return props.onClick && "cursor: pointer;";
});

var normalize = function normalize(item, index, property) {
  if (typeof property === 'function') {
    return property(item, index);
  }

  return item[property];
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
      pad = _ref.pad,
      primaryKey = _ref.primaryKey,
      secondaryKey = _ref.secondaryKey,
      step = _ref.step,
      onClickItem = _ref.onClickItem,
      onMore = _ref.onMore,
      rest = _objectWithoutPropertiesLoose(_ref, ["action", "as", "background", "border", "children", "data", "focus", "itemProps", "pad", "primaryKey", "secondaryKey", "step", "onClickItem", "onMore"]);

  var listRef = useForwardedRef(ref);
  var theme = useContext(ThemeContext);

  var _useState = useState(),
      active = _useState[0],
      setActive = _useState[1];

  return /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: onClickItem && active >= 0 ? function (event) {
      event.persist();
      var adjustedEvent = event;
      adjustedEvent.item = data[active];
      adjustedEvent.index = active;
      onClickItem(adjustedEvent);
    } : undefined,
    onUp: onClickItem && active ? function () {
      setActive(active - 1);
    } : undefined,
    onDown: onClickItem && data && data.length ? function () {
      setActive(active >= 0 ? Math.min(active + 1, data.length - 1) : 0);
    } : undefined
  }, /*#__PURE__*/React.createElement(StyledList, _extends({
    ref: listRef,
    as: as || 'ul',
    tabIndex: onClickItem ? 0 : undefined
  }, rest), /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: data,
    onMore: onMore,
    scrollableAncestor: "window",
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

    if (children) {
      content = children(item, index, onClickItem ? {
        active: active === index
      } : undefined);
    } else if (primaryKey) {
      if (typeof primaryKey === 'function') {
        content = primaryKey(item, index);
      } else {
        content = /*#__PURE__*/React.createElement(Text, {
          key: "p",
          weight: "bold"
        }, normalize(item, index, primaryKey));
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

    if (active === index) {
      adjustedBackground = theme.global.hover.background;
    } else if (Array.isArray(adjustedBackground)) {
      adjustedBackground = adjustedBackground[index % adjustedBackground.length];
    }

    var adjustedBorder = border || theme.list.item.border;

    if (adjustedBorder === 'horizontal' && index) {
      adjustedBorder = 'bottom';
    }

    if (itemProps && itemProps[index]) {
      boxProps = _extends({}, boxProps, itemProps[index]);
    }

    var clickProps;

    if (onClickItem) {
      clickProps = {
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
          setActive(index); // when onmousedown fires, the list item is receiving focus
          // this puts focus back on the List container to meet WCAG
          // accessibility guidelines that focus remains on `ul`

          listRef.current.focus();
        },
        onBlur: function onBlur() {
          return setActive(undefined);
        }
      };
    }

    return /*#__PURE__*/React.createElement(StyledItem, _extends({
      key: index,
      tag: "li",
      flex: false,
      pad: pad || theme.list.item.pad,
      background: adjustedBackground,
      border: adjustedBorder
    }, boxProps, clickProps), content);
  })));
});
List.displayName = 'List';
var ListDoc;

if (process.env.NODE_ENV !== 'production') {
  ListDoc = require('./doc').doc(List); // eslint-disable-line global-require
}

var ListWrapper = ListDoc || List;
export { ListWrapper as List };