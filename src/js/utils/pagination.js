import { useCallback, useEffect, useState } from 'react';

// getPaginatedItems
export const usePagination = ({ data, paginationProps }) => {
  const itemsPerPage = (paginationProps && paginationProps.step) || 10;
  const [page, setPage] = useState(
    (paginationProps && paginationProps.show) || 1,
  );
  const itemsBeginIndex = itemsPerPage * (page - 1);
  const itemsEndIndex = itemsBeginIndex + itemsPerPage;
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

  return [setPage, currentItems];
};
