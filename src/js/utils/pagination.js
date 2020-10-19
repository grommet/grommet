import { useEffect, useState } from 'react';

export const usePagination = ({ data, itemsPerPage, paginationProps }) => {
  const defaultPage = (paginationProps && paginationProps.defaultPage) || 1;
  const [page, setPage] = useState(defaultPage);

  const pageStart = itemsPerPage * (page - 1);
  const [currentItems, setCurrentItems] = useState(
    data.slice(pageStart, pageStart + itemsPerPage),
  );
  useEffect(() => {
    setCurrentItems(data.slice(pageStart, pageStart + itemsPerPage));
  }, [itemsPerPage, setCurrentItems, pageStart, data]);

  return [page, setPage, currentItems];
};
