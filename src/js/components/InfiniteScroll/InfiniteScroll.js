import React, { createRef, Component, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { findScrollParents } from '../../utils';
import { Box } from '../Box';

// Wraps an item to ensure we can get a ref to it
/* eslint-disable react/no-multi-comp, react/no-find-dom-node */
class Ref extends Component {
  render() {
    const { children } = this.props;
    return children;
  }
}

class InfiniteScroll extends PureComponent {
  static defaultProps = {
    items: [],
    step: 50,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { items, show, step } = nextProps;
    const lastPage = Math.ceil(items.length / step) - 1;
    if (
      prevState.beginPage === undefined ||
      ((show && show >= step * (prevState.lastPage + 1)) ||
        lastPage !== prevState.lastPage)
    ) {
      let endPage = prevState.endPage || 0;
      if (show && show >= step * (endPage + 1)) {
        endPage = Math.floor((show + step) / step) - 1;
      }
      return { beginPage: 0, endPage, lastPage, pageHeight: undefined };
    }
    return null;
  }

  state = {};

  initialScroll = false;

  belowMarkerRef = createRef();

  firstPageItemRef = createRef();

  lastPageItemRef = createRef();

  showRef = createRef();

  componentDidMount() {
    // ride out any animation, 100ms was chosen empirically
    clearTimeout(this.animationDelayTimer);
    this.animationDelayTimer = setTimeout(() => {
      this.setPageHeight();
      this.addScrollListener();
      this.scrollShow();
      this.onScroll();
    }, 100);
  }

  componentDidUpdate() {
    this.setPageHeight();
    this.removeScrollListener();
    this.addScrollListener();
    this.scrollShow();
  }

  componentWillUnmount() {
    this.removeScrollListener();
    clearTimeout(this.animationDelayTimer);
    clearTimeout(this.scrollTimer);
  }

  addScrollListener = () => {
    const { pageHeight } = this.state;
    if (pageHeight && this.belowMarkerRef.current && !this.scrollParents) {
      this.scrollParents = findScrollParents(this.belowMarkerRef.current);
      this.scrollParents.forEach(scrollParent =>
        scrollParent.addEventListener('scroll', this.onScroll),
      );
    }
  };

  removeScrollListener = () => {
    if (this.scrollParents) {
      this.scrollParents.forEach(scrollParent =>
        scrollParent.removeEventListener('scroll', this.place),
      );
      this.scrollParents = undefined;
    }
  };

  scrollShow = () => {
    const { show } = this.props;
    if (show && !this.initialScroll && this.showRef.current) {
      this.initialScroll = true;
      // on initial render, scroll to any 'show'
      findDOMNode(this.showRef.current).scrollIntoView();
    }
  };

  setPageHeight = () => {
    const { step } = this.props;
    const { pageHeight } = this.state;
    if (
      this.firstPageItemRef.current &&
      this.lastPageItemRef.current &&
      !pageHeight
    ) {
      /* eslint-disable react/no-find-dom-node */
      const beginRect = findDOMNode(
        this.firstPageItemRef.current,
      ).getBoundingClientRect();
      const endRect = findDOMNode(
        this.lastPageItemRef.current,
      ).getBoundingClientRect();

      const nextPageHeight = endRect.top + endRect.height - beginRect.top;
      // Check if the items are arranged in a single column or not.
      const multiColumn = nextPageHeight / step < endRect.height;
      const pageArea = endRect.height * endRect.width * step;
      // In case the pageHeight is smaller than the visible area,
      // we call onScroll to set the page boundaries appropriately.
      this.setState(
        { multiColumn, pageArea, pageHeight: nextPageHeight },
        this.onScroll,
      );
    }
  };

  onScroll = () => {
    const { onMore, replace } = this.props;
    const {
      beginPage,
      endPage,
      lastPage,
      multiColumn,
      pageArea,
      pageHeight,
    } = this.state;
    if (this.scrollParents && this.scrollParents[0] && pageHeight) {
      const scrollParent = this.scrollParents[0];
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
      if (nextBeginPage !== beginPage || nextEndPage !== endPage) {
        this.setState(
          { beginPage: nextBeginPage, endPage: nextEndPage },
          () => {
            if (onMore && nextEndPage === lastPage) {
              onMore();
            }
          },
        );
      }
    }
  };

  render() {
    const {
      children,
      items,
      onMore,
      renderMarker,
      replace,
      show,
      step,
    } = this.props;
    const { beginPage, endPage, lastPage, pageHeight } = this.state;

    const firstIndex = beginPage * step;
    const lastIndex = (endPage + 1) * step - 1;

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
      if (!pageHeight && itemsIndex === 0) {
        child = (
          <Ref key="first" ref={this.firstPageItemRef}>
            {child}
          </Ref>
        );
      } else if (!pageHeight && itemsIndex === step - 1) {
        child = (
          <Ref key="last" ref={this.lastPageItemRef}>
            {child}
          </Ref>
        );
      }
      if (show && show === itemsIndex) {
        child = (
          <Ref key="show" ref={this.showRef}>
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
          ref={this.belowMarkerRef}
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
  }
}

let InfiniteScrollDoc;
if (process.env.NODE_ENV !== 'production') {
  InfiniteScrollDoc = require('./doc').doc(InfiniteScroll); // eslint-disable-line global-require
}
const InfiniteScrollWrapper = InfiniteScrollDoc || InfiniteScroll;

export { InfiniteScrollWrapper as InfiniteScroll };
/* eslint-enable react/no-find-dom-node, react/no-multi-comp */
