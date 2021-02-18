function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Fragment, useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Pagination } from '../Pagination';
import { Text } from '../Text';
import { focusStyle, genericStyles, normalizeShow, unfocusStyle, useForwardedRef, usePagination } from '../../utils';
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
})(["", " &:focus{", "}", ""], function (props) {
  return props.onClick && "cursor: pointer;";
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
      paginate = _ref.paginate,
      primaryKey = _ref.primaryKey,
      secondaryKey = _ref.secondaryKey,
      showProp = _ref.show,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? paginate ? 50 : undefined : _ref$step,
      onClickItem = _ref.onClickItem,
      onMore = _ref.onMore,
      rest = _objectWithoutPropertiesLoose(_ref, ["action", "as", "background", "border", "children", "data", "focus", "itemProps", "pad", "paginate", "primaryKey", "secondaryKey", "show", "step", "onClickItem", "onMore"]);

  var listRef = useForwardedRef(ref);
  var theme = useContext(ThemeContext);

  var _useState = useState(),
      active = _useState[0],
      setActive = _useState[1];

  var _useState2 = useState(),
      itemFocus = _useState2[0],
      setItemFocus = _useState2[1];

  var _usePagination = usePagination(_extends({
    data: data,
    page: normalizeShow(showProp, step),
    step: step
  }, paginate)),
      items = _usePagination[0],
      paginationProps = _usePagination[1];

  var Container = paginate ? StyledContainer : Fragment;
  var containterProps = paginate ? _extends({}, theme.list.container) : undefined;
  return /*#__PURE__*/React.createElement(Container, containterProps, /*#__PURE__*/React.createElement(Keyboard, {
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
    itemFocus: itemFocus,
    tabIndex: onClickItem ? 0 : undefined
  }, rest), /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: !paginate ? data : items,
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

    var adjustedBorder = border !== undefined ? border : theme.list.item.border;

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
          setActive(index);
          setItemFocus(true);
        },
        onBlur: function onBlur() {
          setActive(undefined);
          setItemFocus(false);
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
  }))), paginate && items && /*#__PURE__*/React.createElement(Pagination, _extends({
    alignSelf: "end"
  }, paginationProps)));
});
List.displayName = 'List';
var ListDoc;

if (process.env.NODE_ENV !== 'production') {
  ListDoc = require('./doc').doc(List); // eslint-disable-line global-require
}

var ListWrapper = ListDoc || List;
export { ListWrapper as List };