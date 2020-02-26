function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';
import { Box } from '../Box';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { focusStyle, genericStyles } from '../../utils';
import { withFocus, withForwardRef } from '../hocs';
var StyledList = styled.ul.withConfig({
  displayName: "List__StyledList",
  componentId: "sc-130gdqg-0"
})(["list-style:none;", " padding:0;", " ", ""], function (props) {
  return !props.margin && 'margin: 0;';
}, genericStyles, function (props) {
  return props.focus && focusStyle;
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

var List = React.forwardRef(function (props, ref) {
  var action = props.action,
      as = props.as,
      background = props.background,
      border = props.border,
      children = props.children,
      data = props.data,
      focus = props.focus,
      itemProps = props.itemProps,
      pad = props.pad,
      primaryKey = props.primaryKey,
      secondaryKey = props.secondaryKey,
      step = props.step,
      theme = props.theme,
      onClickItem = props.onClickItem,
      onMore = props.onMore,
      rest = _objectWithoutPropertiesLoose(props, ["action", "as", "background", "border", "children", "data", "focus", "itemProps", "pad", "primaryKey", "secondaryKey", "step", "theme", "onClickItem", "onMore"]);

  var _React$useState = React.useState(),
      active = _React$useState[0],
      setActive = _React$useState[1];

  return React.createElement(Keyboard, {
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
  }, React.createElement(StyledList, _extends({
    ref: ref,
    as: as || 'ul',
    tabIndex: onClickItem ? 0 : undefined
  }, rest), React.createElement(InfiniteScroll, {
    items: data,
    onMore: onMore,
    scrollableAncestor: "window",
    step: step,
    renderMarker: function renderMarker(marker) {
      return React.createElement(Box, {
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
        content = React.createElement(Text, {
          key: "p",
          weight: "bold"
        }, normalize(item, index, primaryKey));
      }

      if (secondaryKey) {
        if (typeof secondaryKey === 'function') {
          content = [content, secondaryKey(item, index)];
        } else {
          content = [content, React.createElement(Text, {
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
      content = [React.createElement(Box, {
        align: "start"
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
      boxProps = _extends({}, boxProps, {}, itemProps[index]);
    }

    var clickProps;

    if (onClickItem) {
      clickProps = {
        tabIndex: -1,
        active: active === index,
        onClick: function onClick(event) {
          event.persist(); // extract from React's synthetic event pool

          var adjustedEvent = event;
          adjustedEvent.item = item;
          adjustedEvent.index = index;
          onClickItem(adjustedEvent);
        },
        onMouseOver: function onMouseOver() {
          return setActive(index);
        },
        onMouseOut: function onMouseOut() {
          return setActive(undefined);
        },
        onFocus: function onFocus() {
          return setActive(index);
        },
        onBlur: function onBlur() {
          return setActive(undefined);
        }
      };
    }

    return React.createElement(StyledItem, _extends({
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

var ListWrapper = compose(withTheme, withFocus(), withForwardRef)(ListDoc || List);
export { ListWrapper as List };