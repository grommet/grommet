/* eslint-disable react/no-find-dom-node */
import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import { findScrollParents } from '../../utils';
import { Box } from '../Box';

// Wraps an item to ensure we can get a ref to it
class Ref extends Component {
  render() {
    const { children } = this.props;
    return children;
  }
}

const InfiniteScroll = ({
  children,
  items = [],
  onMore,
  renderMarker,
  replace,
  show,
  step = 50,
}) => {
  // the last page we have items for
  const lastPage = useMemo(() => Math.floor(items.length / step), [
    items.length,
    step,
  ]);
  // the first page we are displaying
  const [beginPage, setBeginPage] = useState(0);
  // the last page we are displaying
  const [endPage, setEndPage] = useState(
    show ? Math.floor((show + step) / step) - 1 : 0,
  );
  // how tall we've measured a page to be
  const [pageHeight, setPageHeight] = useState();
  // how much area a page requires
  const [pageArea, setPageArea] = useState();
  // whether the items are laid out in a grid instead of linearly
  const [multiColumn, setMultiColumn] = useState();
  // what we're waiting for onMore to give us
  const [pendingLength, setPendingLength] = useState(0);

  const belowMarkerRef = useRef();
  const firstPageItemRef = useRef();
  const lastPageItemRef = useRef();
  const showRef = useRef();

  // calculating space based on where the first and last items being displayed
  // are located
  useEffect(() => {
    if (firstPageItemRef.current && lastPageItemRef.current && !pageHeight) {
      /* eslint-disable react/no-find-dom-node */
      const beginRect = findDOMNode(
        firstPageItemRef.current,
      ).getBoundingClientRect();
      const endRect = findDOMNode(
        lastPageItemRef.current,
      ).getBoundingClientRect();

      const nextPageHeight = endRect.top + endRect.height - beginRect.top;
      // Check if the items are arranged in a single column or not.
      const nextMultiColumn = nextPageHeight / step < endRect.height;
      const nextPageArea = endRect.height * endRect.width * step;
      setPageHeight(nextPageHeight);
      setPageArea(nextPageArea);
      setMultiColumn(nextMultiColumn);
    }
  }, [pageHeight, step]);

  // scroll handling
  useEffect(() => {
    let scrollParents;

    const onScroll = () => {
      const scrollParent = scrollParents[0];

      // Determine the window into the first scroll parent
      let top;
      let height;
      let width;
      if (scrollParent === document) {
        top = document.documentElement.scrollTop || document.body.scrollTop;
        height = window.innerHeight;
        width = window.innerWidth;
      } else {
        top = scrollParent.scrollTop;
        const rect = scrollParent.getBoundingClientRect();
        ({ height, width } = rect);
      }

      // Figure out which pages we should make visible based on the scroll
      // window.
      const offset = height / 4;
      const nextBeginPage = replace
        ? Math.min(
            lastPage,
            Math.max(
              0,
              multiColumn
                ? Math.floor((Math.max(0, top - offset) * width) / pageArea)
                : Math.floor(Math.max(0, top - offset) / pageHeight),
            ),
          )
        : 0;
      const nextEndPage = Math.min(
        lastPage,
        Math.max(
          (!replace && endPage) || 0,
          multiColumn
            ? Math.ceil(((top + height + offset) * width) / pageArea)
            : Math.floor((top + height + offset) / pageHeight),
        ),
      );

      if (nextBeginPage !== beginPage) setBeginPage(nextBeginPage);
      if (nextEndPage !== endPage) setEndPage(nextEndPage);
    };

    if (pageHeight && belowMarkerRef.current) {
      scrollParents = findScrollParents(belowMarkerRef.current);
      scrollParents.forEach(scrollParent =>
        scrollParent.addEventListener('scroll', onScroll),
      );
      onScroll();
    }
    return () => {
      if (scrollParents) {
        scrollParents.forEach(scrollParent =>
          scrollParent.removeEventListener('scroll', onScroll),
        );
      }
    };
  }, [
    beginPage,
    endPage,
    lastPage,
    multiColumn,
    pageArea,
    pageHeight,
    replace,
  ]);

  // check if we need to ask for more
  useEffect(() => {
    if (onMore && endPage === lastPage && items.length >= pendingLength) {
      // remember we've asked for more, so we don't keep asking if it takes
      // a while
      setPendingLength(items.length + 1);
      onMore();
    }
  }, [endPage, items.length, lastPage, onMore, pendingLength, step]);

  // scroll to any 'show'
  useEffect(() => {
    // ride out any animation delays, 100ms empirically measured
    const timer = setTimeout(() => {
      if (show && showRef.current) {
        findDOMNode(showRef.current).scrollIntoView();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [show]);

  const firstIndex = beginPage * step;
  const lastIndex = Math.min((endPage + 1) * step, items.length) - 1;

  const result = [];

  if (replace && pageHeight && firstIndex) {
    let marker = (
      <Box key="above" flex={false} height={`${beginPage * pageHeight}px`} />
    );
    if (renderMarker) {
      // need to give it a key
      marker = React.cloneElement(renderMarker(marker), { key: 'above' });
    }
    result.push(marker);
  }

  items.slice(firstIndex, lastIndex + 1).forEach((item, index) => {
    const itemsIndex = firstIndex + index;
    let child = children(item, itemsIndex);
    // we only need the Refs if we don't know the pageHeight
    if (!pageHeight && itemsIndex === 0) {
      child = (
        <Ref key="first" ref={firstPageItemRef}>
          {child}
        </Ref>
      );
    } else if (
      !pageHeight &&
      (itemsIndex === step - 1 || itemsIndex === lastIndex)
    ) {
      child = (
        <Ref key="last" ref={lastPageItemRef}>
          {child}
        </Ref>
      );
    }
    if (show && show === itemsIndex) {
      child = (
        <Ref key="show" ref={showRef}>
          {child}
        </Ref>
      );
    }
    result.push(child);
  });

  if (endPage < lastPage || replace || onMore) {
    let marker = (
      <Box
        key="below"
        ref={belowMarkerRef}
        flex={false}
        height={`${replace ? (lastPage - endPage) * pageHeight : 0}px`}
      />
    );
    if (renderMarker) {
      // need to give it a key
      marker = React.cloneElement(renderMarker(marker), { key: 'below' });
    }
    result.push(marker);
  }

  return result;
};

let InfiniteScrollDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  InfiniteScrollDoc = require('./doc').doc(InfiniteScroll);
}
const InfiniteScrollWrapper = InfiniteScrollDoc || InfiniteScroll;

export { InfiniteScrollWrapper as InfiniteScroll };
