import { useCallback, useEffect, useState } from 'react';

export const normalizeShow = (showProp, context) => {
  let show;
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
      } else if ('page' in showProp) show = showProp.page;
    }
  } else if (context === 'pagination') {
    if (typeof showProp === 'number') show = showProp;
    // if children are provided, show can take form of { index: # },
    // where index refers to the index of a child to show or { page: # },
    // where page refers to the page # to show
    else if (typeof showProp === 'object') {
      if ('page' in showProp) {
        // in this context, if user provides both page and item to showProp,
        // page should win
        show = showProp.page;
      } else if ('index' in showProp) showItem = showProp.index;
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

  return [show, showItem];
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
