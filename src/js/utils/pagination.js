import { useCallback, useEffect, useState } from 'react';

export const normalizeShow = (showProp, context) => {
  let page;
  let showItem;

  if (['dataTable', 'list'].includes(context)) {
    // by default, show refers to the index of an item,
    // but if using pagination, show can take the form of { page: # },
    // where page refers to the page # to show
    if (typeof showProp === 'number') showItem = showProp;
    else if (typeof showProp === 'object' && 'page' in showProp)
      page = showProp.page;
  }

  return [page, showItem];
};

export const usePagination = ({ data, paginationProps }) => {
  // step specifies the number of items per page of results
  const step = (paginationProps && paginationProps.step) || 10;
  let defaultPage;
  if (paginationProps) {
    if (paginationProps.showItem)
      // showItem is an array index, so we add one
      defaultPage = Math.ceil((paginationProps.showItem + 1) / step);
    if (paginationProps.page) defaultPage = paginationProps.page;
  }

  const [page, setPage] = useState(defaultPage || 1);
  const itemsBeginIndex = step * (page - 1);
  const itemsEndIndex = itemsBeginIndex + step;
  const getCurrentItems = useCallback(
    items => {
      if (Array.isArray(items)) {
        return items.slice(itemsBeginIndex, itemsEndIndex);
      }
      return items;
    },
    [itemsBeginIndex, itemsEndIndex],
  );
  const [currentItems, setCurrentItems] = useState(getCurrentItems(data));

  useEffect(() => {
    setCurrentItems(getCurrentItems(data));
  }, [data, getCurrentItems, setCurrentItems]);

  return [setPage, currentItems, page, step];
};
