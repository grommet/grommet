import React, { forwardRef, useState } from 'react';
import { Previous, Next } from 'grommet-icons';
import { Box } from '../Box';
import { Button } from '../Button';
import { Nav } from '../Nav';
import { PaginationItem } from './PaginationItem';

const Pagination = forwardRef(
  (
    {
      a11yTitle,
      edgeCount = 1, // number of pages on start/end edge outside "..."
      defaultPage = 1,
      middleCount = 1, // number of pages surround middle page
      onChange,
      page: pageProp,
      totalPages,
    },
    ref,
  ) => {
    const [activePage, setActivePage] = useState(defaultPage);

    React.useEffect(() => {
      if (pageProp) setActivePage(pageProp);
    }, [pageProp, setActivePage]);

    const range = (start, end) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, i) => start + i);
    };

    const startPages = range(1, Math.min(edgeCount, totalPages));
    const endPages = range(
      Math.max(totalPages - edgeCount + 1, edgeCount + 1),
      totalPages,
    );

    const middleStart = Math.max(
      Math.min(
        // Natural start
        activePage - middleCount,
        // Lower boundary when page is high
        totalPages - edgeCount - middleCount * 2 - 1,
      ),
      // Greater than startPages
      edgeCount + 2,
    );

    const middleEnd = Math.min(
      Math.max(
        // Natural end
        activePage + middleCount,
        // Upper boundary when page is low
        edgeCount + middleCount * 2 + 2,
      ),
      // Less than endPages
      endPages.length > 0 ? endPages[0] - 2 : totalPages - 1,
    );

    const middlePages = range(middleStart, middleEnd);

    let startFlexPage;
    if (middleStart > edgeCount + 2) startFlexPage = ['start-ellipsis'];
    else if (edgeCount + 1 < totalPages - edgeCount)
      startFlexPage = [edgeCount + 1];
    else startFlexPage = [];

    let endFlexPage;
    if (middleEnd < totalPages - edgeCount - 1) endFlexPage = ['end-ellipsis'];
    else if (totalPages - edgeCount > edgeCount)
      endFlexPage = [totalPages - edgeCount];
    else endFlexPage = [];

    const pagesList = [
      ...startPages,
      ...startFlexPage, // either "..." or single page to bridge start + middle
      ...middlePages,
      ...endFlexPage, // either "..." or single page to bridge middle + end
      ...endPages,
    ];

    const handleClick = event => {
      if (!pageProp) {
        setActivePage(event.page);
      }
      if (onChange) {
        onChange(event);
      }
    };

    // pass proper props to PaginationItem
    const pages = pagesList.map(page => {
      return typeof page === 'number'
        ? {
            active: page === activePage,
            'aria-current': page === activePage ? 'true' : undefined,
            page,
            onClick: event => {
              event.persist();
              const adjustedEvent = event;
              adjustedEvent.page = page;
              handleClick(adjustedEvent);
            },
          }
        : // otherwise, ellipsis
          {
            page,
          };
    });

    return (
      <Nav a11yTitle={a11yTitle || 'Pagination Navigation'} ref={ref}>
        <Box
          as="ul"
          align="center"
          direction="row"
          gap="xxsmall"
          pad="none"
          margin="none"
        >
          <Box as="li">
            <Button
              a11yTitle="Go to previous page"
              disabled={activePage === 1}
              icon={<Previous />}
              onClick={event => {
                event.persist();
                const adjustedEvent = event;
                adjustedEvent.page = activePage - 1;
                handleClick(adjustedEvent);
              }}
            />
          </Box>
          {pages.map(page => (
            <Box as="li" key={page.page}>
              <PaginationItem {...page} />
            </Box>
          ))}
          <Box as="li">
            <Button
              a11yTitle="Go to next page"
              disabled={activePage === totalPages}
              icon={<Next />}
              onClick={event => {
                event.persist();
                const adjustedEvent = event;
                adjustedEvent.page = activePage + 1;
                handleClick(adjustedEvent);
              }}
            />
          </Box>
        </Box>
      </Nav>
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
