import React, { createRef, PureComponent } from 'react';
import { findScrollParents } from '../../utils';
import { Box } from '../Box';

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

  aboveMarkerRef = createRef();

  belowMarkerRef = createRef();

  componentDidMount() {
    // ride out any animation, 100ms was chosen empirically
    clearTimeout(this.animationDelayTimer);
    this.animationDelayTimer = setTimeout(() => {
      this.setPageHeight();
      this.addScrollListener();
      this.scrollShow();
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
    if (show && !this.initialScroll && this.showRef) {
      this.initialScroll = true;
      // on initial render, scroll to any 'show'
      this.showRef.scrollIntoView();
    }
  };

  setPageHeight = () => {
    const { pageHeight } = this.state;
    if (this.firstPageItemRef && this.lasrtPageItemRef && !pageHeight) {
      const beginRect = this.firstPageItemRef.getBoundingClientRect();
      const endRect = this.lasrtPageItemRef.getBoundingClientRect();
      const nextPageHeight = endRect.y + endRect.height - beginRect.y;
      this.setState({ pageHeight: nextPageHeight });
    }
  };

  onScroll = () => {
    // The timer keeps us from re-rendering too much and getting slow
    clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(() => {
      const { onMore, replace } = this.props;
      const { beginPage, endPage, lastPage, pageHeight } = this.state;
      if (this.scrollParents && this.scrollParents[0] && pageHeight) {
        const scrollParent = this.scrollParents[0];
        // Determine the window into the first scroll parent
        let top;
        let height;
        if (scrollParent === document) {
          top = document.documentElement.scrollTop || document.body.scrollTop;
          height = window.innerHeight;
        } else {
          top = scrollParent.scrollTop;
          const rect = scrollParent.getBoundingClientRect();
          ({ height } = rect);
        }
        // Figure out which pages we should make visible based on the scroll
        // window.
        const offset = height / 4;
        const nextBeginPage = replace
          ? Math.min(
              lastPage,
              Math.max(0, Math.floor(Math.max(0, top - offset) / pageHeight)),
            )
          : 0;
        const nextEndPage = Math.min(
          lastPage,
          Math.max(
            (!replace && endPage) || 0,
            Math.floor((top + height + offset) / pageHeight),
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
    }, 10); // 10ms was chosen empirically
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
        <Box
          key="above"
          ref={this.aboveMarkerRef}
          flex={false}
          height={`${beginPage * pageHeight}px`}
        />
      );
      if (renderMarker) {
        // need to give it a key
        marker = React.cloneElement(renderMarker(marker), { key: 'above' });
      }
      result.push(marker);
    }

    items.slice(firstIndex, lastIndex + 1).forEach((item, index) => {
      let child = children(item, index);
      if (!pageHeight && index === 0) {
        const { ref } = child;
        child = React.cloneElement(child, {
          ref: node => {
            this.firstPageItemRef = node;
            if (typeof ref === 'function') {
              ref(node);
            }
          },
        });
      } else if (!pageHeight && index === step - 1) {
        const { ref } = child;
        child = React.cloneElement(child, {
          ref: node => {
            this.lasrtPageItemRef = node;
            if (typeof ref === 'function') {
              ref(node);
            }
          },
        });
      }
      if (show && show === index) {
        const { ref } = child;
        child = React.cloneElement(child, {
          key: 'show',
          ref: node => {
            this.showRef = node;
            if (typeof ref === 'function') {
              ref(node);
            }
          },
        });
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
