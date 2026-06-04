var _excluded = ["as", "children", "data", "margin", "onMore", "pad", "paginate", "show", "size", "step", "sizeKey", "onOrder"],
  _excluded2 = ["keyboard"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { Fragment, useContext, useState } from 'react';
import styled from 'styled-components';
import { AnnounceContext } from '../../contexts/AnnounceContext';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';
import { Box } from '../Box';
import { Card } from '../Card';
import { CardBody } from '../CardBody';
import { Grid } from '../Grid';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Pagination } from '../Pagination';
import { normalizeShow, useId, usePagination } from '../../utils';
import { CardsPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
import { StyledCellContainer } from './StyledCellContainer';
var emptyData = [];
var HiddenText = styled.span.withConfig({
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
    size = _ref.size,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? paginate ? 50 : undefined : _ref$step,
    sizeKey = _ref.sizeKey,
    onOrder = _ref.onOrder,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var announce = useContext(AnnounceContext);
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var _useContext2 = useContext(DataContext),
    contextData = _useContext2.data,
    unfilteredData = _useContext2.unfilteredData;
  var data = dataProp || contextData || emptyData;
  var unfiltered = unfilteredData || data;
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
  var _useState = useState(),
    dragging = _useState[0],
    setDragging = _useState[1];
  var _useState2 = useState(),
    orderedData = _useState2[0],
    setOrderedData = _useState2[1];
  var _useState3 = useState(),
    unfilteredOrder = _useState3[0],
    setUnfilteredOrder = _useState3[1];
  var hintId = useId();
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
      content = /*#__PURE__*/React.createElement(Card, {
        key: item.id || index.toString(),
        as: !(onOrder || sizeKey) && as === 'ul' ? 'li' : undefined
      }, /*#__PURE__*/React.createElement(CardBody, null, (_ref2 = (_ref3 = typeof item === 'string' && item) != null ? _ref3 : typeof item === 'object' && Object.values(item)[0]) != null ? _ref2 : index));
    }

    // If the items are orderable or sized by a property, wrap them in a
    // StyledCellContainer to apply the drag and drop handlers and/or
    // size styles
    if (onOrder || sizeKey) {
      var round = theme.card.container.round;
      content = /*#__PURE__*/React.createElement(StyledCellContainer, _extends({
        key: "_container_" + ((item == null ? void 0 : item.id) || index),
        as: as === 'ul' ? 'li' : undefined
      }, wrapperProps, {
        size: sizeKey ? item[sizeKey] : undefined,
        round: round
      }), content);
    }

    // Keyboard is only applied if onOrder is provided
    return keyboard ? /*#__PURE__*/React.createElement(Keyboard, _extends({
      key: "_keyboard_" + ((item == null ? void 0 : item.id) || index)
    }, keyboard), content) : content;
  };
  return /*#__PURE__*/React.createElement(Container, containerProps, onOrder && /*#__PURE__*/React.createElement(HiddenText, {
    id: hintId
  }, format({
    id: 'cards.reorderHint'
  })), /*#__PURE__*/React.createElement(Grid, _extends({
    ref: ref,
    as: as,
    gap: theme.cards.grid.gap,
    columns: size || theme.cards.grid.columns,
    margin: !paginate && margin || 'none',
    pad: !paginate && pad || 'none'
  }, rest), /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: currentItems,
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
    return renderItem(item, index);
  })), paginate && data.length > step && items && items.length ? /*#__PURE__*/React.createElement(Pagination, _extends({
    alignSelf: "end"
  }, paginationProps)) : null);
});
Cards.displayName = 'Cards';
Cards.propTypes = CardsPropTypes;
export { Cards };