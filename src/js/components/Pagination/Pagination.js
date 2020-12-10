import React, { forwardRef, useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Nav } from '../Nav';
import { PageIndex } from './PageIndex';
import { normalizeShow, usePagination } from '../../utils/pagination';

const StyledPaginationContainer = styled(Box)`
  ${props =>
    props.theme.pagination.container && props.theme.pagination.container.extend}
`;

const Pagination = forwardRef(
  (
    {
      a11yTitle,
      numItems,
      numEdgePages = 1, // number of pages at each edge of page indices
      numMiddlePages = 1, // number of pages surrounding the active page
      onChange,
      page: pageProp,
      show: showProp,
      // ideating on prop to show a message like "Showing x-y of z items"
      // showSummary,
      step: stepProp,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;

    const [show, showItem] = normalizeShow(showProp, 'pagination');
    const [, , currentPage, step] = usePagination({
      data: numItems,
      paginationProps: { showItem, show, step: stepProp },
      theme,
    });

    const [activePage, setActivePage] = useState(currentPage);
    useEffect(() => {
      if (pageProp) setActivePage(pageProp);
    }, [pageProp, setActivePage]);

    const getPageIndices = (begin, end) => {
      const indices = [];
      for (let i = begin; i <= end; i += 1) {
        indices.push(i);
      }
      return indices;
    };

    /* Calculate total number pages */
    const totalPages = Math.ceil(numItems / step);

    /* Define page indices to display */
    const beginPages = getPageIndices(1, Math.min(numEdgePages, totalPages));
    const endPages = getPageIndices(
      Math.max(totalPages - numEdgePages + 1, numEdgePages + 1),
      totalPages,
    );

    const middlePagesBegin = Math.max(
      Math.min(
        activePage - numMiddlePages,
        totalPages - numEdgePages - numMiddlePages * 2 - 1,
      ),
      numEdgePages + 2,
    );

    const middlePagesEnd = Math.min(
      Math.max(
        activePage + numMiddlePages,
        numEdgePages + numMiddlePages * 2 + 2,
      ),
      endPages.length > 0 ? endPages[0] - 2 : totalPages - 1,
    );

    const middlePages = getPageIndices(middlePagesBegin, middlePagesEnd);

    let beginFlex = [];
    if (middlePagesBegin > numEdgePages + 2) beginFlex = ['more-prev'];
    else if (numEdgePages + 1 < totalPages - numEdgePages)
      beginFlex = [numEdgePages + 1];

    let endFlex = [];
    if (middlePagesEnd < totalPages - numEdgePages - 1) endFlex = ['more-next'];
    else if (totalPages - numEdgePages > numEdgePages)
      endFlex = [totalPages - numEdgePages];

    const navPages = [
      'previous',
      ...beginPages,
      ...beginFlex, // either "..." or single page to bridge start + middle
      ...middlePages,
      ...endFlex, // either "..." or single page to bridge middle + end
      ...endPages,
      'next',
    ];

    /* Set props for each page index. Each page index should display a
     * clickable index, control, or placeholder (e.g. ellipsis) indicating
     * more pages are available.
     */
    const handleClick = event => {
      if (!pageProp) {
        setActivePage(event.page);
      }
      if (onChange) {
        onChange(event);
      }
    };

    const NextIcon = theme.pagination.icons.next;
    const PreviousIcon = theme.pagination.icons.previous;
    const iconColor = theme.pagination.icons.color;

    const navProps = {
      next: {
        // https://a11y-style-guide.com/style-guide/section-navigation.html#kssref-navigation-pagination
        'aria-disabled': activePage === totalPages ? 'true' : undefined,
        disabled: activePage === totalPages,
        icon: <NextIcon color={iconColor} />,
        onClick: event => {
          event.persist();
          const adjustedEvent = event;
          adjustedEvent.page = activePage + 1;
          handleClick(adjustedEvent);
        },
        page: undefined,
      },
      previous: {
        'aria-disabled': activePage === 1 ? 'true' : undefined,
        disabled: activePage === 1,
        icon: <PreviousIcon color={iconColor} />,
        onClick: event => {
          event.persist();
          const adjustedEvent = event;
          adjustedEvent.page = activePage - 1;
          handleClick(adjustedEvent);
        },
        page: undefined,
      },
    };

    const pages = navPages.map(page => {
      return {
        active: page === activePage,
        a11yTitle:
          typeof page === 'number'
            ? `Go to page ${page}`
            : `Go to ${page} page`,
        // https://a11y-style-guide.com/style-guide/section-navigation.html#kssref-navigation-pagination
        // https://www.w3.org/TR/wai-aria-1.1/#aria-current
        'aria-current': page === activePage ? 'page' : undefined,
        page,
        onClick: event => {
          event.persist();
          const adjustedEvent = event;
          adjustedEvent.page = page;
          handleClick(adjustedEvent);
        },
        ...navProps[page],
      };
    });

    return (
      // Do we want pontential for internally displaying a "results summary"?
      // If so, applying the container props to this box now may leave better
      // flexibility moving forward
      <StyledPaginationContainer {...theme.pagination.container} {...rest}>
        {/* Ideation: internal control of some results summary, need to think 
          about what the default would be and how it may be customized
          */}
        {/* {showSummary && <Text>Showing 1-10 of 500 results</Text>} */}
        <Nav a11yTitle={a11yTitle || 'Pagination Navigation'} ref={ref}>
          <Box as="ul" {...theme.pagination.controls}>
            {pages.map(page => (
              <PageIndex key={page.page} {...page} />
            ))}
          </Box>
        </Nav>
      </StyledPaginationContainer>
    );
  },
);

Pagination.displayName = 'Pagination';

let PaginationDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  PaginationDoc = require('./doc').doc(Pagination);
}
const PaginationWrapper = PaginationDoc || Pagination;

export { PaginationWrapper as Pagination };
