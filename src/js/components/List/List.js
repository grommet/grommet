import React, {
  Fragment,
  cloneElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { Button } from '../Button';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { MessageContext } from '../../contexts/MessageContext';
import { Pagination } from '../Pagination';
import { Text } from '../Text';
import {
  genericStyles,
  normalizeColor,
  normalizeShow,
  useForwardedRef,
  usePagination,
  styledComponentsConfig,
} from '../../utils';
import { useAnalytics } from '../../contexts/AnalyticsContext';

import { ListPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const emptyData = [];

const StyledList = styled.ul.withConfig(styledComponentsConfig)`
  list-style: none;
  ${(props) => !props.margin && 'margin: 0;'}
  padding: 0;
  ${genericStyles}

  ${(props) => props.theme.list && props.theme.list.extend}}
`;

const StyledItem = styled(Box)`
  ${(props) => props.onClick && !props.isDisabled && `cursor: pointer;`}
  ${(props) => props.draggable && !props.isDisabled && `cursor: move;`}
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

/** Calculate tabIndex for order control buttons. */
const calculateTabIndex = (buttonIndex, focused, lastFocused, disabled) => {
  if (disabled) return -1;
  // is currently focused
  return (focused !== undefined && focused === buttonIndex) ||
    // was last focused
    (focused === undefined && lastFocused === buttonIndex) ||
    // first "move down" button when entering the list for first time
    (focused === undefined && lastFocused === undefined && buttonIndex === 1)
    ? 0
    : -1;
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
      messages,
      onActive,
      onClickItem,
      onKeyDown,
      onMore,
      onOrder,
      showIndex = true,
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
    const { theme, passThemeFlag } = useThemeValue();
    const { data: contextData } = useContext(DataContext);
    const data = dataProp || contextData || emptyData;
    const { format } = useContext(MessageContext);

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
    /** The item or order control that is most recently interacted with by
     * mouse over or keyboard  */
    const updateActive = (nextActive) => {
      setActive(nextActive);
      // we occasionally call updateActive with undefined when it already is so,
      // no need to call onActive in that case
      if (onActive && onClickItem && nextActive !== active)
        onActive(nextActive);
    };

    const [focused, setFocused] = useState();
    const [lastFocused, setLastFocused] = useState();
    /** Update the item or move up/move down button that is focused
     * in the DOM  */
    const updateFocused = (nextFocused) => {
      setFocused(nextFocused);
    };

    const handleFocus = (nextFocused) => {
      updateActive(nextFocused);
      updateFocused(nextFocused);
    };

    // roving tab index, ensure focused item (when onClickItem)
    // or move up / move down button (when onOrder) has DOM focus
    const focusedRef = useRef();
    useEffect(() => {
      if (focused !== undefined) {
        focusedRef.current?.focus();
      }
    }, [focused, data]);

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
        const isPinned = Array.isArray(pinned)
          ? pinned.includes(key)
          : typeof pinned === 'object' && pinned?.items?.includes(key);

        if (isPinned) {
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
    const containterProps = paginate
      ? {
          ...theme.list.container,
          ...passThemeFlag,
        }
      : undefined;
    const draggingRef = useRef();

    const sendAnalytics = useAnalytics();

    const ariaProps = {
      role: onClickItem ? 'listbox' : 'list',
    };

    const onSelectOption = (event, nextFocused) => {
      if ((onClickItem || onOrder) && nextFocused >= 0) {
        if (onOrder) {
          const index = Math.trunc(nextFocused / 2);
          // Call onOrder with the re-ordered data.
          // Update the focused control index so that the
          // focused control will stay on the same item
          // even though it moved up or down.
          const newIndex = nextFocused % 2 ? index + 1 : index - 1;
          onOrder(reorder(orderableData, pinnedInfo, index, newIndex));

          // distinguish keyboard "click" from mouse "click" event
          // when keyboard, event.detail is always 0
          // https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event#usage_notes
          // when keyboard, move focus with the moving item
          if (event.detail === 0)
            updateFocused(
              focused % 2
                ? Math.min(focused + 2, orderableData.length * 2 - 2)
                : Math.max(focused - 2, 1),
            );
          // when mouse, keep focused on the same control
          else {
            updateFocused(nextFocused);
          }
        } else if (
          disabledItems?.includes(
            getValue(data[nextFocused], nextFocused, itemKey),
          )
        ) {
          event.preventDefault();
        } else if (onClickItem) {
          event.persist();
          updateFocused(nextFocused);
          const adjustedEvent = event;
          adjustedEvent.item = data[nextFocused];
          adjustedEvent.index = nextFocused;
          onClickItem(adjustedEvent);
          sendAnalytics({
            type: 'listItemClick',
            element: listRef.current,
            event: adjustedEvent,
            item: data[nextFocused],
            index: nextFocused,
          });
        }
      }
    };

    return (
      <Container {...containterProps}>
        <Keyboard
          onUp={(event) => {
            if (onClickItem || onOrder) {
              event.preventDefault();
              if (focused >= 0) {
                const min = onOrder ? 1 : 0;
                const focusedElementIndex = Math.max(focused - 1, min);
                handleFocus(focusedElementIndex);

                // Ensure the focused item is in view
                // setTimeout for focusedElement to be updated
                setTimeout(() => {
                  // eslint-disable max-len
                  listRef.current?.children[
                    focusedElementIndex
                  ]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                  });
                }, 0);
              }
            }
          }}
          onDown={(event) => {
            if (onClickItem || onOrder) {
              event.preventDefault();
              if (orderableData && orderableData.length) {
                const min = onOrder ? 1 : 0;
                const max = onOrder
                  ? orderableData.length * 2 - 2
                  : data.length - 1;
                const focusedElementIndex =
                  focused >= min ? Math.min(focused + 1, max) : min;
                handleFocus(focusedElementIndex);

                // Ensure the focused item is in view
                // setTimeout for focusedElement to be updated
                setTimeout(() => {
                  //  eslint-disable max-len
                  listRef.current?.children[
                    focusedElementIndex
                  ]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                  });
                }, 0);
              }
            }
          }}
          onKeyDown={onKeyDown}
        >
          <StyledList
            aria-label={ariaLabel || a11yTitle}
            ref={listRef}
            as={as || 'ul'}
            onBlur={(event) => {
              setLastFocused(focused);
              // only reset focused if the focus is leaving the list
              // and not moving to a child element of the list
              if (
                listRef.current &&
                !listRef.current.contains(event.relatedTarget)
              ) {
                updateFocused(undefined);
              }
            }}
            onMouseOut={() => updateActive(undefined)}
            {...ariaProps}
            {...passThemeFlag}
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

                const key = getValue(item, index, itemKey) || index;
                let isPinned;
                if (
                  (Array.isArray(pinned) && pinned.length > 0) ||
                  (Array.isArray(pinned?.items) && pinned?.items?.length > 0)
                ) {
                  if (typeof item === 'object' && !itemKey) {
                    console.error(
                      // eslint-disable-next-line max-len
                      `Warning: Missing prop itemKey. Prop pin requires itemKey to be specified when data is of type 'object'.`,
                    );
                  }
                  isPinned = Array.isArray(pinned)
                    ? pinned?.includes(key)
                    : pinned.items.some((pinnedItem) => pinnedItem === key);
                }

                const pinnedColor = isPinned ? pinned.color : undefined;

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
                      <Text
                        color={pinnedColor}
                        key="p"
                        {...theme.list.primaryKey}
                      >
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
                        <Text color={pinnedColor} key="s">
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
                      // TO DO theme object
                      gap: 'medium',
                    };
                  }
                } else if (typeof item === 'object') {
                  const value = item[Object.keys(item)[0]];
                  content =
                    // for backwards compatibility, only wrap in Text if
                    // pinned.color is defined
                    pinnedColor && typeof value === 'string' ? (
                      <Text color={pinnedColor}>{value}</Text>
                    ) : (
                      value
                    );
                } else {
                  // for backwards compatibility, only wrap in Text if
                  // pinned.color is defined
                  content = pinnedColor ? (
                    <Text color={pinnedColor}>{item}</Text>
                  ) : (
                    item
                  );
                }

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
                    // TO DO theme object
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
                  adjustedBackground =
                    pinned?.background || theme.list.item.pinned.background;
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
                    tabIndex:
                      // entering list for first time
                      (focused === undefined &&
                        lastFocused === undefined &&
                        index === 0) ||
                      // returning to list after already using keyboard
                      (focused === undefined &&
                        lastFocused !== undefined &&
                        lastFocused === index) ||
                      // actively using keyboard
                      focused === index
                        ? 0
                        : -1,
                    active: active === index,
                    focus: focused === index,
                    hoverIndicator: !isDisabled,
                    ref: (node) => {
                      if (focused === index) {
                        focusedRef.current = node;
                      }
                    },
                    onClick: (event) => {
                      // Only prevent event when disabled. We still want screen
                      // readers to be aware that an option exists, but is in a
                      // disabled state.
                      if (isDisabled) {
                        event.preventDefault();
                      } else {
                        onSelectOption(event, index);
                      }
                    },
                    onFocus: () => {
                      handleFocus(index);
                    },
                    onMouseOver: () => updateActive(index),
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
                      updateFocused(undefined);
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

                  const moveUpIndex = orderableIndex * 2;
                  const moveUpTabIndex = calculateTabIndex(
                    moveUpIndex,
                    focused,
                    lastFocused,
                    !orderableIndex, // first item can't move up
                  );

                  const moveDownIndex = orderableIndex * 2 + 1;
                  const moveDownTabIndex = calculateTabIndex(
                    moveDownIndex,
                    focused,
                    lastFocused,
                    // last item can't move down
                    orderableIndex >= orderableData.length - 1,
                  );

                  orderControls = !isPinned && (
                    <Box direction="row" align="center" justify="end">
                      <Button
                        id={`${key}MoveUp`}
                        a11yTitle={`${orderableIndex + 1} ${key} move up`}
                        icon={<Up />}
                        hoverIndicator
                        disabled={!orderableIndex}
                        active={focused === moveUpIndex}
                        onClick={(event) => {
                          event.stopPropagation();
                          onSelectOption(event, moveUpIndex);
                        }}
                        tabIndex={moveUpTabIndex}
                        ref={(node) => {
                          if (focused === moveUpIndex) {
                            focusedRef.current = node;
                          }
                        }}
                      />
                      <Button
                        id={`${key}MoveDown`}
                        a11yTitle={`${orderableIndex + 1} ${key} move down`}
                        icon={<Down />}
                        hoverIndicator
                        disabled={orderableIndex >= orderableData.length - 1}
                        active={focused === moveDownIndex}
                        onClick={(event) => {
                          event.stopPropagation();
                          onSelectOption(event, moveDownIndex);
                        }}
                        tabIndex={moveDownTabIndex}
                        ref={(node) => {
                          if (focused === moveDownIndex) {
                            focusedRef.current = node;
                          }
                        }}
                        onFocus={() => {
                          // make sure first "MoveDown" is focusable
                          if (
                            focused === undefined &&
                            lastFocused === undefined
                          ) {
                            handleFocus(moveDownIndex);
                          }
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
                    // TO DO theme object
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
                  const pinSize = theme.list.item.pinned.icon.size;
                  const pinPad = theme.list.item.pinned.icon.pad;
                  const Icon = pinned?.icon || theme.list.icons.pin;
                  let pinIcon = React.isValidElement(Icon) ? Icon : <Icon />;
                  pinIcon = cloneElement(pinIcon, {
                    // icon color prop should win over pinned.color
                    ...(!pinIcon.props?.color && pinnedColor
                      ? { color: pinnedColor }
                      : {}),
                    a11yTitle: format({
                      id: 'list.pinned',
                      messages,
                    }),
                    size: pinSize,
                  });

                  boxProps = {
                    direction: 'row',
                    align:
                      (defaultItemProps && defaultItemProps.align) || 'center',
                    // TO DO theme object
                    gap: 'medium',
                  };
                  displayPinned = (
                    <Box
                      direction="row"
                      align="center"
                      justify="end"
                      pad={pinPad}
                    >
                      {pinIcon}
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
                    {...passThemeFlag}
                  >
                    {showIndex && onOrder && (
                      <Text color={pinnedColor}>{index + 1}</Text>
                    )}
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
