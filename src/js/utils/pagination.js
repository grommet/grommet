import { useCallback, useEffect, useState } from 'react';

// getPaginatedItems
export const usePagination = ({ data, paginationProps }) => {
  // step specifies the number of items per page of results
  const step = (paginationProps && paginationProps.step) || 10;
  let defaultPage;
  if (paginationProps) {
    if (paginationProps.showItem)
      defaultPage = Math.ceil(paginationProps.showItem / step);
    if (paginationProps.show) defaultPage = paginationProps.show;
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
