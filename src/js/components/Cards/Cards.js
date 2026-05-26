import React, { Fragment, useContext, useState } from 'react';
import styled from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { Card } from '../Card';
import { CardBody } from '../CardBody';
import { Grid } from '../Grid';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Pagination } from '../Pagination';
import { normalizeShow, usePagination } from '../../utils';

import { CardsPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const emptyData = [];

// display: grid makes the single child fill the wrapper (stretch in both axes)
const StyledDraggableCell = styled.div`
  display: grid;
`;

const reorder = (array, source, target) => {
  const result = array.slice(0);
  const tmp = result[source];
  if (source < target)
    for (let i = source; i < target; i += 1) result[i] = result[i + 1];
  else for (let i = source; i > target; i -= 1) result[i] = result[i - 1];
  result[target] = tmp;
  return result;
};

const sizeStyles = (size) => {
  const result = {};
  if (typeof size === 'object') {
    if (size.columns) {
      result.gridColumn = `span ${size.columns}`;
    }
    if (size.rows) {
      result.gridRow = `span ${size.rows}`;
    }
  }
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
    const { data: contextData } = useContext(DataContext);
    const data = dataProp || contextData || emptyData;

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
    const currentItems = orderedData || (!paginate ? data : items);

    const renderItem = (item, index) => {
      const move = (count) => {
        const newIndex = index + count;
        onOrder(
          reorder(
            currentItems,
            index,
            Math.max(0, Math.min(newIndex, currentItems.length - 1)),
          ),
        );
      };

      const onOrderProps = onOrder
        ? {
            key: item?.id || index,
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
            },
            onDragEnter: (event) => {
              if (dragging !== undefined && dragging !== index) {
                // Ignore synthetic re-fires caused by entering
                // a child of this element
                if (event.currentTarget.contains(event.relatedTarget)) return;
                // eslint-disable-next-line no-param-reassign
                event.dataTransfer.dropEffect = 'move';
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
              if (orderedData) {
                onOrder(orderedData);
              }
            },
            tabIndex: 0,
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

      let content = children ? (
        children(item, index)
      ) : (
        <Card key={index.toString()} as={as === 'ul' ? 'li' : undefined}>
          <CardBody>
            {(typeof item === 'string' && item) ??
              (typeof item === 'object' && Object.values(item)[0]) ??
              index}
          </CardBody>
        </Card>
      );

      // If the items are orderable or sized by a property, wrap them in a
      // StyledDraggableCell to apply the drag and drop handlers and/or
      // size styles
      if (onOrder || sizeKey) {
        content = (
          <StyledDraggableCell
            {...wrapperProps}
            style={sizeKey ? sizeStyles(item[sizeKey]) : undefined}
          >
            {content}
          </StyledDraggableCell>
        );
      }

      return keyboard ? (
        <Keyboard key={index} {...keyboard}>
          {content}
        </Keyboard>
      ) : (
        content
      );
    };

    return (
      <Container {...containerProps}>
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
        {paginate &&
        data.length > step &&
        currentItems &&
        currentItems.length ? (
          <Pagination alignSelf="end" {...paginationProps} />
        ) : null}
      </Container>
    );
  },
);

Cards.displayName = 'Cards';
Cards.propTypes = CardsPropTypes;

export { Cards };
