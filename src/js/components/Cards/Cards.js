import React, { Fragment, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { Card } from '../Card';
import { CardBody } from '../CardBody';
import { Grid } from '../Grid';
import { InfiniteScroll } from '../InfiniteScroll';
import { Pagination } from '../Pagination';
import { normalizeShow, usePagination } from '../../utils';

import { CardsPropTypes } from './propTypes';

const emptyData = [];

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
      size = 'small',
      step = paginate ? 50 : undefined,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext);
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

    return (
      <Container {...containerProps}>
        <Grid
          ref={ref}
          as={as}
          columns={size}
          gap="medium"
          margin={(!paginate && margin) || 'none'}
          pad={(!paginate && pad) || 'none'}
          {...rest}
        >
          <InfiniteScroll
            items={!paginate ? data : items}
            onMore={onMore}
            show={!paginate ? showProp : undefined}
            step={step}
            renderMarker={(marker) => (
              <Box as="li" flex={false}>
                {marker}
              </Box>
            )}
          >
            {(item, index) =>
              children ? (
                children(item, index)
              ) : (
                <Card
                  key={index.toString()}
                  as={as === 'ul' ? 'li' : undefined}
                >
                  <CardBody>
                    {(typeof item === 'string' && item) ??
                      (typeof item === 'object' && Object.values(item)[0]) ??
                      index}
                  </CardBody>
                </Card>
              )
            }
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
