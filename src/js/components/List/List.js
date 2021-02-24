import React, { Fragment, useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Box } from '../Box';
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
    const [active, setActive] = useState();
    const [itemFocus, setItemFocus] = useState();

    const [items, paginationProps] = usePagination({
      data,
      page: normalizeShow(showProp, step),
      step,
      // let any specifications from paginate prop override component
      ...paginate,
    });

    const Container = paginate ? StyledContainer : Fragment;
    const containterProps = paginate ? { ...theme.list.container } : undefined;

    return (
      <Container {...containterProps}>
        <Keyboard
          onEnter={
            onClickItem && active >= 0
              ? event => {
                  event.persist();
                  const adjustedEvent = event;
                  adjustedEvent.item = data[active];
                  adjustedEvent.index = active;
                  onClickItem(adjustedEvent);
                }
              : undefined
          }
          onUp={
            onClickItem && active
              ? () => {
                  setActive(active - 1);
                }
              : undefined
          }
          onDown={
            onClickItem && data && data.length
              ? () => {
                  setActive(
                    active >= 0 ? Math.min(active + 1, data.length - 1) : 0,
                  );
                }
              : undefined
          }
        >
          <StyledList
            ref={listRef}
            as={as || 'ul'}
            itemFocus={itemFocus}
            tabIndex={onClickItem ? 0 : undefined}
            {...rest}
          >
            <InfiniteScroll
              items={!paginate ? data : items}
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

                if (children) {
                  content = children(
                    item,
                    index,
                    onClickItem ? { active: active === index } : undefined,
                  );
                } else if (primaryKey) {
                  if (typeof primaryKey === 'function') {
                    content = primaryKey(item, index);
                  } else {
                    content = (
                      <Text key="p" weight="bold">
                        {normalize(item, index, primaryKey)}
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
                if (active === index) {
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

                if (itemProps && itemProps[index]) {
                  boxProps = { ...boxProps, ...itemProps[index] };
                }

                let clickProps;
                if (onClickItem) {
                  clickProps = {
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

                return (
                  <StyledItem
                    key={index}
                    tag="li"
                    flex={false}
                    pad={pad || theme.list.item.pad}
                    background={adjustedBackground}
                    border={adjustedBorder}
                    {...boxProps}
                    {...clickProps}
                  >
                    {content}
                  </StyledItem>
                );
              }}
            </InfiniteScroll>
          </StyledList>
        </Keyboard>
        {paginate && items && (
          <Pagination alignSelf="end" {...paginationProps} />
        )}
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
