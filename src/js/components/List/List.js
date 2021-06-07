import React, { Fragment, useContext, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { Button } from '../Button';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Pagination } from '../Pagination';
import { Text } from '../Text';
import {
  focusStyle,
  genericStyles,
  normalizeShow,
  unfocusStyle,
  useForwardedRef,
  usePagination,
} from '../../utils';

const StyledList = styled.ul`
  list-style: none;
  ${props => !props.margin && 'margin: 0;'}
  padding: 0;
  ${genericStyles}

  &:focus {
    ${props =>
      props.tabIndex >= 0 &&
      focusStyle({ forceOutline: true, skipSvgChildren: true })}
  }
  // during the interim state when a user is holding down a click,
  // the individual list item has focus in the DOM until the click
  // completes and focus is placed back on the list container.
  // for visual consistency, we want to keep the focus indicator on the
  // list container the whole time.
  ${props =>
    props.itemFocus &&
    focusStyle({ forceOutline: true, skipSvgChildren: true })}}
  ${props => props.theme.list && props.theme.list.extend}}
`;

const StyledItem = styled(Box)`
  ${props => props.onClick && `cursor: pointer;`}
  ${props =>
    props.draggable &&
    `cursor: move;`}
  // during the interim state when a user is holding down a click,
  // the individual list item has focus in the DOM until the click
  // completes and focus is placed back on the list container.
  // for visual consistency, we are showing focus on the list container
  // as opposed to the item itself.
  &:focus {
    ${unfocusStyle({ forceOutline: true, skipSvgChildren: true })}
  }
  ${props =>
    props.theme.list && props.theme.list.item && props.theme.list.item.extend}
`;

// when paginated, this wraps the data table and pagination component
const StyledContainer = styled(Box)`
  ${props =>
    props.theme.list &&
    props.theme.list.container &&
    props.theme.list.container.extend};
`;

const normalize = (item, index, property) => {
  if (typeof property === 'function') {
    return property(item, index);
  }
  return item[property];
};

const reorder = (array, source, target) => {
  const result = array.slice(0);
  const tmp = result[source];
  if (source < target)
    for (let i = source; i < target; i += 1) result[i] = result[i + 1];
  else for (let i = source; i > target; i -= 1) result[i] = result[i - 1];
  result[target] = tmp;
  return result;
};

// Determine the primary content for a row. If the List
// has a primaryKey defined this returns the item data
// based on this primary key. If no primaryKey property
// is defined this will return unknown. The intent of
// the content from the primary key is that it is unique
// within the list.
const getPrimaryContent = (item, index, primaryKey) => {
  let primaryContent;
  if (primaryKey) {
    if (typeof primaryKey === 'function') {
      primaryContent = primaryKey(item, index);
    } else {
      primaryContent = normalize(item, index, primaryKey);
    }
  }

  return primaryContent;
};


const getKey = (item, index, primaryContent) => {
  if (typeof primaryContent === 'string') {
    return primaryContent;
  } 
  return (typeof item === 'string') ? item : index;
};

const getItemId = (item, index, primaryKey) => {
  const primaryContent = getPrimaryContent(item, index, primaryKey);
  return getKey(item, index, primaryContent);
};


const List = React.forwardRef(
  (
    {
      action,
      as,
      background,
      border,
      children,
      data,
      focus,
      itemProps,
      onOrder,
      pad,
      paginate,
      primaryKey,
      secondaryKey,
      show: showProp,
      step = paginate ? 50 : undefined,
      onClickItem,
      onMore,
      ...rest
    },
    ref,
  ) => {
    const listRef = useForwardedRef(ref);
    const theme = useContext(ThemeContext);

    // active will be the index of the current 'active'
    // control in the list. If the onOrder property is defined
    // this will be the index of up or down control for ordering
    // items in the list. In this case the item index of that
    // control would be the active index / 2.
    // If onOrder is not defined but onClickItem is (e.g. the
    // List items are likely selectable), active will be the
    // index of the item which is currently active.
    const [active, setActive] = useState();
    const [itemFocus, setItemFocus] = useState();
    const [dragging, setDragging] = useState();

    const [items, paginationProps] = usePagination({
      data,
      page: normalizeShow(showProp, step),
      step,
      // let any specifications from paginate prop override component
      ...paginate,
    });

    const Container = paginate ? StyledContainer : Fragment;
    const containterProps = paginate ? { ...theme.list.container } : undefined;

    const [orderingData, setOrderingData] = useState();

    const draggingRef = useRef();
    
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
        const buttonId = (active % 2) ? 'MoveDown' : 'MoveUp';
        const itemIndex = Math.trunc(active / 2);
        activeId = 
          `${getItemId(data[itemIndex], itemIndex, primaryKey)}${buttonId}`;
      } else if (onClickItem) {
        // The whole list item is active. Figure out an id
        activeId = getItemId(data[active], active, primaryKey);
      }
      ariaProps['aria-activedescendant'] = activeId;
    }

    return (
      <Container {...containterProps}>
        <Keyboard
          onEnter={
            (onClickItem || onOrder) && active >= 0
              ? event => {
                  if (onOrder) {
                    const index = Math.trunc(active / 2);
                    // Call onOrder with the re-ordered data.
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
                  }
                  else {
                    event.persist();
                    const adjustedEvent = event;
                    adjustedEvent.item = data[active];
                    adjustedEvent.index = active;
                    onClickItem(adjustedEvent);
                  }
                }
              : undefined
          }
          onUp={
            (onClickItem || onOrder) && active
              ? () => {
                  const min = onOrder ? 1 : 0;
                  setActive(Math.max(active - 1, min));
                }
              : undefined
          }
          onDown={
            (onClickItem || onOrder) && data && data.length
              ? () => {
                  const min = onOrder ? 1 : 0;
                  const max = onOrder ? (data.length * 2) - 2 : data.length - 1;
                  setActive(
                    active >= min ? Math.min(active + 1, max) : min,
                  );
                }
              : undefined
          }
        >
          <StyledList
            ref={listRef}
            as={as || 'ul'}
            itemFocus={itemFocus}
            tabIndex={onClickItem || onOrder ? 0 : undefined}
            onBlur={onOrder ? () => setActive(undefined) : undefined}
            {...ariaProps}
            {...rest}
          >
            <InfiniteScroll
              items={!paginate ? orderingData || data : items}
              onMore={onMore}
              scrollableAncestor="window"
              show={!paginate ? showProp : undefined}
              step={step}
              renderMarker={marker => (
                <Box as="li" flex={false}>
                  {marker}
                </Box>
              )}
            >
              {(item, index) => {
                let content;
                let boxProps = {};
                let itemId;

                if (children) {
                  content = children(
                    item,
                    index,
                    onClickItem ? { active: active === index } : undefined,
                  );
                } else if (primaryKey) {
                  if (typeof primaryKey === 'function') {
                    itemId = primaryKey(item, index);
                    content = itemId;
                  } else {
                    itemId = normalize(item, index, primaryKey);
                    content = (
                      <Text key="p" weight="bold">
                        {itemId}
                      </Text>
                    );
                  }
                  if (secondaryKey) {
                    if (typeof secondaryKey === 'function') {
                      content = [content, secondaryKey(item, index)];
                    } else {
                      content = [
                        content,
                        <Text key="s">
                          {normalize(item, index, secondaryKey)}
                        </Text>,
                      ];
                    }
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

                const key = getKey(item, index, itemId);

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
                    onClick: event => {
                      // extract from React's synthetic event pool
                      event.persist();
                      const adjustedEvent = event;
                      adjustedEvent.item = item;
                      adjustedEvent.index = index;
                      onClickItem(adjustedEvent);
                      // put focus on the List container to meet WCAG
                      // accessibility guidelines that focus remains on `ul`
                      listRef.current.focus();
                    },
                    onMouseOver: () => setActive(index),
                    onMouseOut: () => setActive(undefined),
                    onFocus: () => {
                      setActive(index);
                      setItemFocus(true);
                    },
                    onBlur: () => {
                      setActive(undefined);
                      setItemFocus(false);
                    },
                  };
                }

                let orderProps;
                let orderControls;
                if (onOrder) {
                  orderProps = {
                    draggable: true,
                    onDragStart: event => {
                      event.dataTransfer.setData('text/plain', '');
                      // allowed per
                      // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#define_the_drag_effect
                      // eslint-disable-next-line no-param-reassign
                      event.dataTransfer.effectAllowed = 'move';
                      setDragging(index);
                      setActive(undefined);
                    },
                    onDragEnd: () => {
                      setDragging(undefined);
                      setOrderingData(undefined);
                    },
                    onDragOver: event => {
                      if (dragging !== undefined) {
                        event.preventDefault();
                        if (dragging !== index) {
                          // eslint-disable-next-line no-param-reassign
                          event.dataTransfer.dropEffect = 'move';
                          setOrderingData(
                            reorder(orderingData || data, dragging, index),
                          );
                          setDragging(index);
                        }
                      }
                    },
                    onDrop: () => {
                      if (orderingData) {
                        onOrder(orderingData);
                      }
                    },
                    ref: dragging === index ? draggingRef : undefined,
                  };

                  const Up = theme.list.icons.up;
                  const Down = theme.list.icons.down;
                  orderControls = (
                    <Box direction="row" align="center" justify="end">
                      <Button
                        id={`${key}MoveUp`}
                        a11yTitle={`${index+1} ${key} move up`}
                        icon={<Up />}
                        hoverIndicator
                        focusIndicator={false}
                        disabled={!index}
                        active={active === index * 2}
                        onClick={event => {
                          event.stopPropagation();
                          onOrder(reorder(data, index, index - 1));
                        }}
                        tabIndex={-1}
                        onMouseOver={() => setActive(index*2)}
                        onMouseOut={() => setActive(undefined)}
                        onFocus={() => {
                          setActive(index*2);
                          setItemFocus(true);
                        }}
                        onBlur={() => {
                          setActive(undefined);
                          setItemFocus(false);
                        }}
                      />
                      <Button
                        id={`${key}MoveDown`}
                        a11yTitle={`${index+1} ${key} move down`}
                        icon={<Down />}
                        hoverIndicator
                        focusIndicator={false}
                        disabled={index >= data.length - 1}
                        active={active === (index * 2 + 1)}
                        onClick={event => {
                          event.stopPropagation();
                          onOrder(reorder(data, index, index + 1));
                        }}
                        tabIndex={-1}
                        onMouseOver={() => setActive(index*2+1)}
                        onMouseOut={() => setActive(undefined)}
                        onFocus={() => {
                          setActive(index*2+1);
                          setItemFocus(true);
                        }}
                        onBlur={() => {
                          setActive(undefined);
                          setItemFocus(false);
                        }}
                      />
                    </Box>
                  );  

                  boxProps = {
                    direction: 'row',
                    align: 'center',
                    gap: 'medium',
                  };

                  content = <Box flex>{content}</Box>;
                }

                if (itemProps && itemProps[index]) {
                  boxProps = { ...boxProps, ...itemProps[index] };
                }

                return (
                  <StyledItem
                    key={key}
                    tag="li"
                    flex={false}
                    pad={pad || theme.list.item.pad}
                    background={adjustedBackground}
                    border={adjustedBorder}
                    {...boxProps}
                    {...clickProps}
                    {...orderProps}
                  >
                    {onOrder && <Text>{index + 1}</Text>}
                    {content}
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

let ListDoc;
if (process.env.NODE_ENV !== 'production') {
  ListDoc = require('./doc').doc(List); // eslint-disable-line global-require
}
const ListWrapper = ListDoc || List;

export { ListWrapper as List };
