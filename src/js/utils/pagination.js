import { useCallback, useEffect, useState } from 'react';

export const normalizeShow = (showProp, context) => {
  let page;
  let showItem;

  if (['dataTable', 'list'].includes(context)) {
    // by default, show refers to the index of an item in the List,
    // but if using pagination, show can take the form of { page: # },
    // where page refers to the page # to show or { index: # },
    // where index refers to the index of an item in the list
    if (typeof showProp === 'number') showItem = showProp;
    else if (typeof showProp === 'object') {
      // in this context, if user provides both page and index to showProp,
      // index should win
      if ('index' in showProp) {
        showItem = showProp.index;
      } else if ('page' in showProp) page = showProp.page;
    }
  }

  if (
    typeof showProp === 'object' &&
    'index' in showProp &&
    'page' in showProp
  ) {
    console.warn(
      // eslint-disable-next-line max-len
      `Property "show" should not have keys for both index and page. Remove one.`,
    );
  }

  return [page, showItem];
};

// getPaginatedItems
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
