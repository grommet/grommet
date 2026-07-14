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

const emptyData = [];

const HiddenText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const indexForItem = (data, item) => {
  const index = data.indexOf(item);
  if (index === -1) {
    // If the item isn't in the data, try to find it by id. This allows for
    // reordering to work when the items provided to Cards are different objects
    // than those in the data array, as long as they share an id.
    return data.findIndex((d) => d.id === item.id);
  }
  return index;
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

const Cards = React.forwardRef(
  (
    {
      as = 'ul',
      children,
      data: dataProp,
      margin,
      onMore,
      pad,
      paginate,
      show: showProp,
      size,
      step = paginate ? 50 : undefined,
      sizeKey,
      onOrder,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useThemeValue();
    const announce = useContext(AnnounceContext);
    const { format } = useContext(MessageContext);

    const { data: contextData, unfilteredData } = useContext(DataContext);
    const data = dataProp || contextData || emptyData;
    const unfiltered = unfilteredData || data;

    const [items, paginationProps] = usePagination({
      data,
      page: normalizeShow(showProp, step),
      step,
      // let any specifications from paginate prop override component
      ...paginate,
    });

    const Container = paginate ? Box : Fragment;
    const containerProps = paginate
      ? { ...theme.cards.container, pad, margin }
      : undefined;

    const [dragging, setDragging] = useState();
    const [orderedData, setOrderedData] = useState();
    const [unfilteredOrder, setUnfilteredOrder] = useState();
    const hintId = useId();

    const currentItems = orderedData || (!paginate ? data : items);

    const renderItem = (item, index) => {
      const move = (count) => {
        const newIndex = Math.max(
          0,
          Math.min(index + count, currentItems.length - 1),
        );
        onOrder(
          reorder(
            unfiltered,
            indexForItem(unfiltered, item),
            indexForItem(unfiltered, currentItems[newIndex]),
          ),
        );
        announce(
          format({
            id: 'cards.moved',
            values: {
              source: newIndex + 1,
              target: currentItems.length,
            },
          }),
        );
      };

      const onOrderProps = onOrder
        ? {
            tabIndex: 0,
            'aria-roledescription': format({ id: 'cards.description' }),
            'aria-describedby': hintId,
            draggable: true,
            onDragStart: (event) => {
              event.dataTransfer.setData('text/plain', '');
              // allowed per
              // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#define_the_drag_effect
              // eslint-disable-next-line no-param-reassign
              event.dataTransfer.effectAllowed = 'move';
              setDragging(index);
            },
            onDragEnd: () => {
              setDragging(undefined);
              setOrderedData(undefined);
              setUnfilteredOrder(undefined);
            },
            onDragEnter: (event) => {
              if (dragging !== undefined && dragging !== index) {
                // Ignore synthetic re-fires caused by entering
                // a child of this element
                if (event.currentTarget.contains(event.relatedTarget)) return;
                // eslint-disable-next-line no-param-reassign
                event.dataTransfer.dropEffect = 'move';
                setUnfilteredOrder(
                  reorder(
                    unfiltered,
                    indexForItem(unfiltered, currentItems[dragging]),
                    indexForItem(unfiltered, item),
                  ),
                );
                setOrderedData(reorder(currentItems, dragging, index));
                setDragging(index);
              }
            },
            onDragOver: (event) => {
              if (dragging !== undefined) {
                // preventDefault is required to allow the drop to occur
                event.preventDefault();
              }
            },
            onDrop: () => {
              if (unfilteredOrder) {
                onOrder(unfilteredOrder);
              }
            },
            keyboard: {
              onUp: (event) => {
                event.preventDefault();
                move(-1);
              },
              onDown: (event) => {
                event.preventDefault();
                move(1);
              },
              onLeft: (event) => {
                event.preventDefault();
                move(-1);
              },
              onRight: (event) => {
                event.preventDefault();
                move(1);
              },
            },
          }
        : {};

      const { keyboard, ...wrapperProps } = onOrderProps;

      let content;
      if (children) {
        content = children(item, index);
      } else {
        content = (
          <Card
            key={item.id || index.toString()}
            as={!(onOrder || sizeKey) && as === 'ul' ? 'li' : undefined}
          >
            <CardBody>
              {(typeof item === 'string' && item) ??
                (typeof item === 'object' && Object.values(item)[0]) ??
                index}
            </CardBody>
          </Card>
        );
      }

      // If the items are orderable or sized by a property, wrap them in a
      // StyledCellContainer to apply the drag and drop handlers and/or
      // size styles
      if (onOrder || sizeKey) {
        const { round } = theme.card.container;
        content = (
          <StyledCellContainer
            key={`_container_${item?.id || index}`}
            as={as === 'ul' ? 'li' : undefined}
            {...wrapperProps}
            size={sizeKey ? item[sizeKey] : undefined}
            round={round}
          >
            {content}
          </StyledCellContainer>
        );
      }

      // Keyboard is only applied if onOrder is provided
      return keyboard ? (
        <Keyboard key={`_keyboard_${item?.id || index}`} {...keyboard}>
          {content}
        </Keyboard>
      ) : (
        content
      );
    };

    return (
      <Container {...containerProps}>
        {onOrder && (
          <HiddenText id={hintId}>
            {format({ id: 'cards.reorderHint' })}
          </HiddenText>
        )}
        <Grid
          ref={ref}
          as={as}
          gap={theme.cards.grid.gap}
          columns={size || theme.cards.grid.columns}
          margin={(!paginate && margin) || 'none'}
          pad={(!paginate && pad) || 'none'}
          {...rest}
        >
          <InfiniteScroll
            items={currentItems}
            onMore={onMore}
            show={!paginate ? showProp : undefined}
            step={step}
            renderMarker={(marker) => (
              <Box as="li" flex={false}>
                {marker}
              </Box>
            )}
          >
            {(item, index) => renderItem(item, index)}
          </InfiniteScroll>
        </Grid>
        {paginate && data.length > step && items && items.length ? (
          <Pagination alignSelf="end" {...paginationProps} />
        ) : null}
      </Container>
    );
  },
);

Cards.displayName = 'Cards';
Cards.propTypes = CardsPropTypes;

export { Cards };
