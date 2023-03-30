import React, { Fragment, useContext, useMemo, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { Button } from '../Button';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Pagination } from '../Pagination';
import { Text } from '../Text';
import {
  focusStyle,
  genericStyles,
  normalizeColor,
  normalizeShow,
  unfocusStyle,
  useForwardedRef,
  usePagination,
} from '../../utils';
import { useAnalytics } from '../../contexts/AnalyticsContext';

import { ListPropTypes } from './propTypes';

const emptyData = [];

const StyledList = styled.ul`
  list-style: none;
  ${(props) => !props.margin && 'margin: 0;'}
  padding: 0;
  ${genericStyles}

  // Customizes to make list have a focus border color of green
  &:focus {
    ${(props) =>
      props.tabIndex >= 0 &&
      focusStyle({ forceOutline: true, skipSvgChildren: true })}
  }

  // during the interim state when a user is holding down a click,
  // the individual list item has focus in the DOM until the click
  // completes and focus is placed back on the list container.
  // for visual consistency, we want to keep the focus indicator on the
  // list container the whole time.
  ${(props) =>
    props.itemFocus &&
    focusStyle({ forceOutline: true, skipSvgChildren: true })}}
  ${(props) => props.theme.list && props.theme.list.extend}}
`;

const StyledItem = styled(Box)`
  ${(props) => props.onClick && !props.isDisabled && `cursor: pointer;`}
  ${(props) => props.draggable && !props.isDisabled && `cursor: move;`}
  // during the interim state when a user is holding down a click,
  // the individual list item has focus in the DOM until the click
  // completes and focus is placed back on the list container.
  // for visual consistency, we are showing focus on the list container
  // as opposed to the item itself.
  &:focus {
    ${unfocusStyle({ forceOutline: true, skipSvgChildren: true })}
  }
  ${(props) => {
    let disabledStyle;
    if (props.isDisabled && props.theme.list?.item?.disabled) {
      const { color, cursor } = props.theme.list.item.disabled;
      disabledStyle = {
        color: normalizeColor(color, props.theme),
        cursor,
      };
    }
    return disabledStyle;
  }}
  &:hover {
    ${(props) => props.isDisabled && `background-color: unset;`}
  }
  ${(props) =>
    props.theme.list && props.theme.list.item && props.theme.list.item.extend}
`;

// when paginated, this wraps the data table and pagination component
const StyledContainer = styled(Box)`
  ${(props) =>
    props.theme.list &&
    props.theme.list.container &&
    props.theme.list.container.extend};
`;

const getValue = (item, index, key) => {
  if (typeof key === 'function') return key(item, index);
  if (typeof item === 'string') return item;
  if (key !== undefined) return item?.[key];
  return undefined;
};

const reorder = (array, pinnedArray, source, target) => {
  const result = array.slice(0);
  const tmp = result[source];
  if (source < target)
    for (let i = source; i < target; i += 1) result[i] = result[i + 1];
  else for (let i = source; i > target; i -= 1) result[i] = result[i - 1];
  result[target] = tmp;

  // insert pinned items into their proper index within the orderable
  // data object to make the complete data set again
  if (pinnedArray.data.length > 0) {
    pinnedArray.data.forEach((pinnedItem, index) => {
      result.splice(pinnedArray.indexes[index], 0, pinnedItem);
    });
  }
  return result;
};

// getItemId returns something appropriate to use as a unique DOM
// id for an item in the list
const getItemId = (item, index, itemKey, primaryKey) => {
  // we do primaryKey first to be backward compatible, even though
  // itemKey is probably technically the better choice for a DOM id.
  if (primaryKey) return getValue(item, index, primaryKey);
  if (itemKey) return getValue(item, index, itemKey);
  return getValue(item, index) ?? index; // do our best w/o *key properties
};

const List = React.forwardRef(
  (
    {
      a11yTitle,
      'aria-label': ariaLabel,
      action,
      as,
      background,
      border,
      children,
      data: dataProp,
      defaultItemProps,
      disabled: disabledItems,
      focus,
      itemKey: defaultItemKey,
      itemProps,
      onActive,
      onClickItem,
      onKeyDown,
      onMore,
      onOrder,
      pad,
      paginate,
      pinned = [],
      primaryKey,
      secondaryKey,
      show: showProp,
      step = paginate ? 50 : undefined,
      ...rest
    },
    ref,
  ) => {
    const listRef = useForwardedRef(ref);
    const theme = useContext(ThemeContext);
    const { data: contextData } = useContext(DataContext);
    const data = dataProp || contextData || emptyData;

    // fixes issue where itemKey is undefined when only primaryKey is provided
    const itemKey = defaultItemKey || primaryKey || null;

    // active will be the index of the current 'active'
    // control in the list. If the onOrder property is defined
    // this will be the index of up or down control for ordering
    // items in the list. In this case the item index of that
    // control would be the active index / 2.
    // If onOrder is not defined but onClickItem is (e.g. the
    // List items are likely selectable), active will be the
    // index of the item which is currently active.
    const [active, setActive] = useState();
    const [lastActive, setLastActive] = useState();
    const updateActive = (nextActive) => {
      setActive(nextActive);
      // we occasionally call updateActive with undefined when it already is so,
      // no need to call onActive in that case
      if (onActive && onClickItem && nextActive !== active)
        onActive(nextActive);
    };
    const [itemFocus, setItemFocus] = useState();
    const [dragging, setDragging] = useState();
    const [orderingData, setOrderingData] = useState();

    // store a reference to the pinned and the data that is orderable
    const [orderableData, pinnedInfo] = useMemo(() => {
      const orderable = [];
      const pinnedData = [];
      const pinnedIndexes = [];

      const currentData = orderingData || data;

      if (pinned.length === 0)
        return [currentData, { data: pinnedData, indexes: pinnedIndexes }];

      currentData.forEach((item, index) => {
        const key = getValue(item, index, itemKey);
        if (pinned.includes(key)) {
          pinnedData.push(item);
          pinnedIndexes.push(index);
        } else {
          orderable.push(item);
        }
      });

      return [orderable, { data: pinnedData, indexes: pinnedIndexes }];
    }, [data, orderingData, itemKey, pinned]);

    const [items, paginationProps] = usePagination({
      data,
      page: normalizeShow(showProp, step),
      step,
      // let any specifications from paginate prop override component
      ...paginate,
    });

    const Container = paginate ? StyledContainer : Fragment;
    const containterProps = paginate ? { ...theme.list.container } : undefined;
    const draggingRef = useRef();

    const sendAnalytics = useAnalytics();

    const ariaProps = {
      role: onClickItem || onOrder ? 'listbox' : 'list',
    };

    if (active >= 0) {
      let activeId;
      // We have an item that is 'focused' within the list. This could
      // be the list item or one of the up/down ordering buttons.
      // We need to figure out an id of the thing that will be shown as active
      if (onOrder) {
        // figure out which arrow button will be the active one.
        const buttonId = active % 2 ? 'MoveDown' : 'MoveUp';
        const itemIndex = Math.trunc(active / 2);
        activeId = `${getItemId(
          orderableData[itemIndex],
          itemIndex,
          itemKey,
          primaryKey,
        )}${buttonId}`;
      } else if (onClickItem) {
        // The whole list item is active. Figure out an id
        activeId = getItemId(
          orderableData[active],
          active,
          itemKey,
          primaryKey,
        );
      }
      ariaProps['aria-activedescendant'] = activeId;
    }

    return (
      <Container {...containterProps}>
        <Keyboard
          onEnter={
            (onClickItem || onOrder) && active >= 0
              ? (event) => {
                  if (onOrder) {
                    const index = Math.trunc(active / 2);
                    // Call onOrder with the re-ordered data.
                    // Update the active control index so that the
                    // active control will stay on the same item
                    // even though it moved up or down.
                    if (active % 2) {
                      onOrder(
                        reorder(orderableData, pinnedInfo, index, index + 1),
                      );
                      updateActive(
                        Math.min(active + 2, orderableData.length * 2 - 2),
                      );
                    } else {
                      onOrder(
                        reorder(orderableData, pinnedInfo, index, index - 1),
                      );
                      updateActive(Math.max(active - 2, 1));
                    }
                  } else if (
                    disabledItems?.includes(
                      getValue(data[active], active, itemKey),
                    )
                  ) {
                    event.preventDefault();
                  } else if (onClickItem) {
                    event.persist();
                    const adjustedEvent = event;
                    adjustedEvent.item = data[active];
                    adjustedEvent.index = active;
                    onClickItem(adjustedEvent);
                    sendAnalytics({
                      type: 'listItemClick',
                      element: listRef.current,
                      event: adjustedEvent,
                      item: data[active],
                      index: active,
                    });
                  }
                }
              : undefined
          }
          onUp={
            (onClickItem || onOrder) && active
              ? () => {
                  const min = onOrder ? 1 : 0;
                  updateActive(Math.max(active - 1, min));
                }
              : undefined
          }
          onDown={
            (onClickItem || onOrder) && orderableData && orderableData.length
              ? () => {
                  const min = onOrder ? 1 : 0;
                  const max = onOrder
                    ? orderableData.length * 2 - 2
                    : data.length - 1;
                  updateActive(active >= min ? Math.min(active + 1, max) : min);
                }
              : undefined
          }
          onKeyDown={onKeyDown}
        >
          <StyledList
            aria-label={ariaLabel || a11yTitle}
            ref={listRef}
            as={as || 'ul'}
            itemFocus={itemFocus}
            tabIndex={onClickItem || onOrder ? 0 : undefined}
            onFocus={() =>
              // Fixes zero-th index showing undefined.
              // Checks for active variable to stop bug where activeStyle
              // gets applied to lastActive instead of the item the user
              // is currently clicking on
              !active && active !== 0
                ? updateActive(lastActive)
                : updateActive(active)
            }
            onBlur={() => {
              setLastActive(active);
              updateActive(undefined);
            }}
            {...ariaProps}
            {...rest}
          >
            <InfiniteScroll
              items={!paginate ? orderingData || data : items}
              onMore={onMore}
              show={!paginate ? showProp : undefined}
              step={step}
              renderMarker={(marker) => (
                <Box as="li" flex={false}>
                  {marker}
                </Box>
              )}
            >
              {(item, index) => {
                let content;
                let boxProps = {};

                if (children) {
                  content = children(
                    item,
                    index,
                    onClickItem ? { active: active === index } : undefined,
                  );
                } else if (primaryKey) {
                  const primary = getValue(item, index, primaryKey);
                  content =
                    typeof primary === 'string' ||
                    typeof primary === 'number' ? (
                      <Text key="p" weight="bold">
                        {primary}
                      </Text>
                    ) : (
                      primary
                    );
                  if (secondaryKey) {
                    const secondary = getValue(item, index, secondaryKey);
                    content = [
                      content,
                      typeof secondary === 'string' ||
                      typeof secondary === 'number' ? (
                        <Text key="s">
                          {getValue(item, index, secondaryKey)}
                        </Text>
                      ) : (
                        secondary
                      ),
                    ];
                    boxProps = {
                      direction: 'row',
                      align: 'center',
                      justify: 'between',
                      gap: 'medium',
                    };
                  }
                } else if (typeof item === 'object') {
                  content = item[Object.keys(item)[0]];
                } else {
                  content = item;
                }

                const key = getValue(item, index, itemKey) || index;

                const orderableIndex = orderableData.findIndex(
                  (ordItem, ordIndex) =>
                    getValue(ordItem, ordIndex, itemKey) === key,
                );

                let isDisabled;
                if (disabledItems) {
                  if (typeof item === 'object' && !itemKey) {
                    console.error(
                      // eslint-disable-next-line max-len
                      `Warning: Missing prop itemKey. Prop disabled requires itemKey to be specified when data is of type 'object'.`,
                    );
                  }
                  isDisabled = disabledItems?.includes(key);
                }

                let isPinned;
                if (pinned.length > 0) {
                  if (typeof item === 'object' && !itemKey) {
                    console.error(
                      // eslint-disable-next-line max-len
                      `Warning: Missing prop itemKey. Prop pin requires itemKey to be specified when data is of type 'object'.`,
                    );
                  }
                  isPinned = pinned?.includes(key);
                }

                if (action) {
                  content = [
                    <Box align="start" key={`actionContainer${index}`}>
                      {content}
                    </Box>,
                    action(item, index),
                  ];
                  boxProps = {
                    direction: 'row',
                    align: secondaryKey ? 'start' : 'center',
                    justify: 'between',
                    gap: 'medium',
                  };
                }

                let adjustedBackground =
                  background || theme.list.item.background;
                if ((!onOrder && active === index) || dragging === index) {
                  adjustedBackground = theme.global.hover.background;
                } else if (Array.isArray(adjustedBackground)) {
                  adjustedBackground =
                    adjustedBackground[index % adjustedBackground.length];
                } else if (isPinned) {
                  adjustedBackground = theme.list.item.pinned.background;
                }

                let adjustedBorder =
                  border !== undefined ? border : theme.list.item.border;
                if (adjustedBorder === 'horizontal' && index) {
                  adjustedBorder = 'bottom';
                }

                let clickProps;
                if (onClickItem && !onOrder) {
                  clickProps = {
                    role: 'option',
                    tabIndex: -1,
                    active: active === index,
                    onClick: (event) => {
                      // Only prevent event when disabled. We still want screen
                      // readers to be aware that an option exists, but is in a
                      // disabled state.
                      if (isDisabled) {
                        event.preventDefault();
                      } else {
                        // extract from React's synthetic event pool
                        event.persist();
                        const adjustedEvent = event;
                        adjustedEvent.item = item;
                        adjustedEvent.index = index;
                        onClickItem(adjustedEvent);
                        sendAnalytics({
                          type: 'listItemClick',
                          element: listRef.current,
                          event: adjustedEvent,
                          item,
                          index,
                        });
                      }
                    },
                    onMouseOver: () => updateActive(index),
                    onMouseOut: () => updateActive(undefined),
                    onFocus: () => {
                      updateActive(index);
                      setItemFocus(true);
                    },
                    onBlur: () => {
                      updateActive(undefined);
                      setItemFocus(false);
                    },
                  };
                }

                let orderProps;
                let orderControls;
                if (onOrder && !isPinned) {
                  orderProps = {
                    draggable: true,
                    onDragStart: (event) => {
                      event.dataTransfer.setData('text/plain', '');
                      // allowed per
                      // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#define_the_drag_effect
                      // eslint-disable-next-line no-param-reassign
                      event.dataTransfer.effectAllowed = 'move';
                      setDragging(orderableIndex);
                      updateActive(undefined);
                    },
                    onDragEnd: () => {
                      setDragging(undefined);
                      setOrderingData(undefined);
                    },
                    onDragOver: (event) => {
                      if (dragging !== undefined) {
                        event.preventDefault();
                        if (dragging !== orderableIndex) {
                          // eslint-disable-next-line no-param-reassign
                          event.dataTransfer.dropEffect = 'move';
                          setOrderingData(
                            reorder(
                              orderableData,
                              pinnedInfo,
                              dragging,
                              orderableIndex,
                            ),
                          );
                          setDragging(orderableIndex);
                        }
                      }
                    },
                    onDrop: () => {
                      if (orderingData) {
                        onOrder(orderingData);
                      }
                    },
                    ref: dragging === orderableIndex ? draggingRef : undefined,
                  };

                  const Up = theme.list.icons.up;
                  const Down = theme.list.icons.down;
                  orderControls = !isPinned && (
                    <Box direction="row" align="center" justify="end">
                      <Button
                        id={`${key}MoveUp`}
                        a11yTitle={`${orderableIndex + 1} ${key} move up`}
                        icon={<Up />}
                        hoverIndicator
                        focusIndicator={false}
                        disabled={!orderableIndex}
                        active={active === orderableIndex * 2}
                        onClick={(event) => {
                          event.stopPropagation();
                          onOrder(
                            reorder(
                              orderableData,
                              pinnedInfo,
                              orderableIndex,
                              orderableIndex - 1,
                            ),
                          );
                        }}
                        tabIndex={-1}
                        onMouseOver={() => updateActive(orderableIndex * 2)}
                        onMouseOut={() => updateActive(undefined)}
                        onFocus={() => {
                          updateActive(orderableIndex * 2);
                          setItemFocus(true);
                        }}
                        onBlur={() => {
                          updateActive(undefined);
                          setItemFocus(false);
                        }}
                      />
                      <Button
                        id={`${key}MoveDown`}
                        a11yTitle={`${orderableIndex + 1} ${key} move down`}
                        icon={<Down />}
                        hoverIndicator
                        focusIndicator={false}
                        disabled={orderableIndex >= orderableData.length - 1}
                        active={active === orderableIndex * 2 + 1}
                        onClick={(event) => {
                          event.stopPropagation();
                          onOrder(
                            reorder(
                              orderableData,
                              pinnedInfo,
                              orderableIndex,
                              orderableIndex + 1,
                            ),
                          );
                        }}
                        tabIndex={-1}
                        onMouseOver={() => updateActive(orderableIndex * 2 + 1)}
                        onMouseOut={() => updateActive(undefined)}
                        onFocus={() => {
                          updateActive(orderableIndex * 2 + 1);
                          setItemFocus(true);
                        }}
                        onBlur={() => {
                          updateActive(undefined);
                          setItemFocus(false);
                        }}
                      />
                    </Box>
                  );

                  // wrap the main content and use
                  // the boxProps defined for the content
                  content = (
                    <Box flex {...boxProps}>
                      {content}
                    </Box>
                  );

                  // Adjust the boxProps to account for the order controls
                  boxProps = {
                    direction: 'row',
                    align:
                      (defaultItemProps && defaultItemProps.align) || 'center',
                    gap: 'medium',
                  };
                }

                let itemAriaProps;
                if (isDisabled) {
                  itemAriaProps = {
                    'aria-disabled': true,
                  };
                  if (onClickItem) {
                    itemAriaProps = {
                      ...itemAriaProps,
                      'aria-selected': false,
                    };
                  }
                }

                let displayPinned;
                if (isPinned) {
                  // Pinned icon and settings
                  const Pin = theme.list.icons.pin;
                  const pinSize = theme.list.item.pinned.icon.size;
                  const pinPad = theme.list.item.pinned.icon.pad;

                  boxProps = {
                    direction: 'row',
                    align:
                      (defaultItemProps && defaultItemProps.align) || 'center',
                    gap: 'medium',
                  };
                  displayPinned = (
                    <Box
                      direction="row"
                      align="center"
                      justify="end"
                      pad={pinPad}
                    >
                      <Pin size={pinSize} />
                    </Box>
                  );
                  content = <Box flex>{content}</Box>;
                }

                if (itemProps && itemProps[index]) {
                  boxProps = { ...boxProps, ...itemProps[index] };
                }

                return (
                  <StyledItem
                    key={key}
                    tag="li"
                    background={adjustedBackground}
                    border={adjustedBorder}
                    isDisabled={isDisabled}
                    flex={false}
                    pad={pad || theme.list.item.pad}
                    {...defaultItemProps}
                    {...boxProps}
                    {...clickProps}
                    {...orderProps}
                    {...itemAriaProps}
                  >
                    {onOrder && <Text>{index + 1}</Text>}
                    {content}
                    {displayPinned}
                    {orderControls}
                  </StyledItem>
                );
              }}
            </InfiniteScroll>
          </StyledList>
        </Keyboard>
        {paginate && data.length > step && items && items.length ? (
          <Pagination alignSelf="end" {...paginationProps} />
        ) : null}
      </Container>
    );
  },
);

List.displayName = 'List';
List.propTypes = ListPropTypes;

export { List };
