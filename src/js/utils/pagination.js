import { useCallback, useEffect, useState } from 'react';

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

  const itemsBeginIndex = step * (activePage - 1);
  const itemsEndIndex = itemsBeginIndex + step;
  const getCurrentItems = useCallback(
    items => {
      if (Array.isArray(items)) {
        return items.length
          ? items.slice(itemsBeginIndex, itemsEndIndex)
          : undefined;
      }
      return items;
    },
    [itemsBeginIndex, itemsEndIndex],
  );
  const [currentItems, setCurrentItems] = useState(getCurrentItems(data));

  useEffect(() => {
    if (data) {
      setCurrentItems(getCurrentItems(data));
    }
  }, [data, getCurrentItems, setCurrentItems]);

  const paginationProps = {
    numberItems: data && data.length,
    onChange: event => setActivePage(event.page),
    page,
    step,
    ...rest, // let anything coming from paginate prop override component
  };

  return [currentItems, paginationProps];
};
