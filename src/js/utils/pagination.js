import { useMemo, useState } from 'react';

export const normalizeShow = (showProp, step) => {
  let page;
  // by default, show refers to the index of an item,
  // but if using pagination, show can take the form of { page: # },
  // where page refers to the page # to show
  if (typeof showProp === 'number') page = Math.ceil((showProp + 1) / step);
  else if (typeof showProp === 'object' && 'page' in showProp)
    page = showProp.page;

  return page;
};

export const usePagination = ({ data, page, step, ...rest }) => {
  const totalPages = data ? Math.ceil(data.length / step) : 0;
  const [activePage, setActivePage] = useState(Math.min(page, totalPages) || 1);

  // ensure activePage is never lower than 1 to ensure that itemsBeginIndex
  // and itemsEndIndex aren't negative
  if (activePage > totalPages && data?.length > 0)
    setActivePage(Math.max(totalPages, 1));

  const itemsBeginIndex = step * (activePage - 1);
  const itemsEndIndex = itemsBeginIndex + step;

  const currentItems = useMemo(() => {
    if (Array.isArray(data)) return data.slice(itemsBeginIndex, itemsEndIndex);
    return [];
  }, [data, itemsBeginIndex, itemsEndIndex]);

  const paginationProps = {
    numberItems: data && data.length,
    onChange: (event) => setActivePage(event.page),
    page: activePage,
    step,
    ...rest, // let anything coming from paginate prop override component
  };

  return [currentItems, paginationProps];
};
