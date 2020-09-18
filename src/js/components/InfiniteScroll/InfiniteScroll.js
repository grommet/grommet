/* eslint-disable react/no-find-dom-node */
import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import {
  findScrollParent,
  findScrollParents,
  isNodeAfterScroll,
  isNodeBeforeScroll,
} from '../../utils';
import { Box } from '../Box';

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
  show: showIndex,
  step = 50,
}) => {
  // item index to be made visible initially
  const [show, setShow] = useState(showIndex);
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
  // the heights of each page in our current result set
  const [pageHeights, setPageHeights] = useState([]);
  // track the areas of each page in our current result set
  const [pageAreas, setPageAreas] = useState([]);
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
    if (firstPageItemRef.current && lastPageItemRef.current) {
      /* eslint-disable react/no-find-dom-node */
      const beginRect = firstPageItemRef.current.getBoundingClientRect
        ? firstPageItemRef.current.getBoundingClientRect()
        : findDOMNode(firstPageItemRef.current).getBoundingClientRect();
      const endRect = lastPageItemRef.current.getBoundingClientRect
        ? lastPageItemRef.current.getBoundingClientRect()
        : findDOMNode(lastPageItemRef.current).getBoundingClientRect();

      // Need to adjust for cases such as show where first and last page item
      // refs can be much larger than the step.
      const initialPage = show ? Math.floor(show / step) : 0;
      const nextPageHeight =
        (endRect.top + endRect.height - beginRect.top) / (initialPage + 1);
      // Check if the items are arranged in a single column or not.
      const nextMultiColumn = nextPageHeight / step < endRect.height;
      const nextPageArea = endRect.height * endRect.width * step;
      setPageHeight(nextPageHeight);
      setPageArea(nextPageArea);
      setMultiColumn(nextMultiColumn);
    }
  }, [items, step, show]);

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

      // Scroll window buffers allow for triggering effects ahead of a
      // user's current scroll position and direction
      const offset = height / 4;
      const scrollBufferTop = top - offset;
      const scrollBufferBottom = top + height + offset;

      // Account for page steps containing items of varying heights.
      const avgPageHeight =
        pageHeights.reduce((totalPageHeights, page) => {
          return totalPageHeights + page;
        }, pageHeight) /
        (pageHeights.length + 1);
      const avgPageArea =
        pageAreas.reduce((totalPageAreas, page) => {
          return totalPageAreas + page;
        }, pageArea) /
        (pageAreas.length + 1);

      // nextBeginPage will increment/decrement when using replace, otherwise
      // the beginPage will be at 0.
      const nextBeginPage = replace
        ? Math.min(
            lastPage,
            Math.max(
              0,
              multiColumn
                ? Math.floor(
                    (Math.max(0, scrollBufferTop) * width) / avgPageArea,
                  )
                : Math.floor(Math.max(0, scrollBufferTop) / avgPageHeight),
            ),
          )
        : 0;

      // Increment/decrement nextEndPage when nearing bounds of current page.
      // Ensure nextEndPage contains show index initially.
      const nextEndPage = Math.min(
        lastPage,
        Math.max(
          (!replace && endPage) || 0,
          multiColumn
            ? Math.ceil((scrollBufferBottom * width) / avgPageArea)
            : Math.floor(scrollBufferBottom / avgPageHeight),
          show ? Math.floor(show / step) : 0,
        ),
      );
      if (nextBeginPage !== beginPage) setBeginPage(nextBeginPage);
      if (nextEndPage !== endPage) setEndPage(nextEndPage);

      // Keep track of page heights as begin/end pages increment/decrement
      const nextPageHeights = pageHeights;
      const nextPageAreas = pageAreas;

      if (nextBeginPage > beginPage) {
        nextPageHeights.shift();
        nextPageAreas.shift();
      } else if (nextBeginPage < beginPage) {
        nextPageHeights.slice(0, 1, pageHeight);
        nextPageAreas.slice(0, 1, pageArea);
      }

      if (nextEndPage > endPage) {
        nextPageHeights.push(pageHeight);
        nextPageAreas.push(pageArea);
      } else if (nextEndPage < endPage) {
        nextPageHeights.pop();
        nextPageAreas.pop();
      }

      if (nextPageHeights !== pageHeights) setPageHeights(nextPageHeights);
      if (nextPageAreas !== pageAreas) setPageAreas(nextPageAreas);

      console.log(
        '\n',
        'scrollBufferTop:',
        scrollBufferTop,
        '\n',
        'scrollBufferBottom:',
        scrollBufferBottom,
        '\n',
        'nextBeginPage',
        nextBeginPage,
        '\n',
        'nextEndPage',
        nextEndPage,
        '\n',
        'pageHeight:',
        pageHeight,
        '\n',
        'pageHeights',
        pageHeights,
        '\n',
        'avgPageHeight',
        avgPageHeight,
      );
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
    pageAreas,
    pageHeight,
    pageHeights,
    replace,
    show,
    step,
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
        const showNode = showRef.current.scrollIntoView
          ? showRef.current
          : findDOMNode(showRef.current);
        const scrollParent = findScrollParent(showNode);
        if (isNodeBeforeScroll(showNode, scrollParent)) {
          showNode.scrollIntoView(true);
        } else if (isNodeAfterScroll(showNode, scrollParent)) {
          showNode.scrollIntoView(false);
        }
        // clean up after having shown
        setShow(undefined);
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
    let ref;
    let child = children(item, itemsIndex, ref);

    // Set firstPageItemRef & lastPageItemRef
    if (itemsIndex === lastIndex + 1 - step) {
      // We pass the ref we want to the children render function.
      // If we don't see that our ref was set, wrap it ("the old way").
      child = children(item, itemsIndex, firstPageItemRef);
      if (child.ref !== firstPageItemRef) {
        child = (
          <Ref key="first" ref={firstPageItemRef}>
            {child}
          </Ref>
        );
      }
    }

    if (itemsIndex === lastIndex) {
      // If show && show > step, we only want a single lastPageItemRef and it
      // should be set at lastIndex. Ignore step - 1 scenario, otherwise will
      // create duplicates.
      child =
        show && show > step && itemsIndex === step - 1
          ? child
          : children(item, itemsIndex, lastPageItemRef);

      // We pass the ref we want to the children render function.
      // If we don't see that our ref was set, wrap it ("the old way").
      if (
        child.ref !== lastPageItemRef &&
        !(show && show > step && itemsIndex === step - 1)
      ) {
        child = (
          <Ref key="last" ref={lastPageItemRef}>
            {child}
          </Ref>
        );
      }
    }

    // Set showRef
    if (show && show === itemsIndex) {
      child = children(item, itemsIndex, showRef);
      if (child.ref !== showRef) {
        child = (
          <Ref key="show" ref={showRef}>
            {child}
          </Ref>
        );
      }
    }

    result.push(child);
  });

  if (endPage < lastPage || replace || onMore) {
    let marker = (
      <Box
        key="below"
        ref={belowMarkerRef}
        flex={false}
        height={`${
          replace && pageHeight ? (lastPage - endPage) * pageHeight : 0
        }px`}
      />
    );
    if (renderMarker) {
      // need to give it a key
      marker = React.cloneElement(renderMarker(marker), { key: 'below' });
    }
    result.push(marker);
  }

  console.log(
    '\n',
    'result.length: ',
    result.length,
    '\n',
    'beginPage: ',
    beginPage,
    '\n',
    'endPage: ',
    endPage,
    '\n',
    'pageHeight: ',
    pageHeight,
  );

  return result;
};

let InfiniteScrollDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  InfiniteScrollDoc = require('./doc').doc(InfiniteScroll);
}
const InfiniteScrollWrapper = InfiniteScrollDoc || InfiniteScroll;

export { InfiniteScrollWrapper as InfiniteScroll };
