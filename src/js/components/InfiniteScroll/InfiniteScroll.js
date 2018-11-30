import React, { PureComponent } from 'react';
import Waypoint from 'react-waypoint';

class InfiniteScroll extends PureComponent {
  static defaultProps = {
    items: [],
    step: 50,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { items, show, step } = nextProps;
    const pageCount = Math.ceil(items.length / step);
    if (
      prevState.firstPage === undefined ||
      ((show && show >= step * (prevState.lastPage + 1)) ||
        pageCount !== prevState.pageCount)
    ) {
      let lastPage = prevState.lastPage || 0;
      if (show && show >= step * (lastPage + 1)) {
        lastPage = Math.floor((show + step) / step) - 1;
      }
      return { firstPage: 0, lastPage, pageCount };
    }
    return null;
  }

  state = {};

  initialScroll = false;

  componentDidMount() {
    this.scrollShow();
    this.setPageHeight();
  }

  componentDidUpdate() {
    this.scrollShow();
    this.setPageHeight();
  }

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
    if (this.beginPageRef && this.endPageRef && !pageHeight) {
      const beginRect = this.beginPageRef.getBoundingClientRect();
      const endRect = this.endPageRef.getBoundingClientRect();
      const nextPageHeight = endRect.y + endRect.height - beginRect.y;
      this.setState({ pageHeight: nextPageHeight });
    }
  };

  nextPage = page => () => {
    // When scrolling very quickly, avoid queueing up repeated calls to change
    // the visible pages.
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const { items, onMore, replace, step } = this.props;
      const { firstPage } = this.state;
      this.setState(
        {
          firstPage: replace ? page - 1 : firstPage,
          lastPage: page,
        },
        // call onMore if we've reached the end of the items
        () => onMore && page * step >= items.length && onMore(),
      );
    }, 10); // 10ms was chosen empirically
  };

  previousPage = page => () => {
    // When scrolling very quickly, avoid queueing up repeated calls to change
    // the visible pages.
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const { replace } = this.props;
      const { lastPage } = this.state;
      this.setState({
        firstPage: page,
        lastPage: replace ? page + 1 : lastPage,
      });
    }, 10); // 10ms was chosen empirically
  };

  render() {
    const {
      children,
      items,
      renderMarker,
      replace,
      scrollableAncestor,
      show,
      step,
    } = this.props;
    const { firstPage, lastPage, pageCount, pageHeight } = this.state;

    const firstIndex = firstPage * step;
    const lastIndex = (lastPage + 1) * step - 1;
    const markerHeight = `${(replace && pageHeight) || 0}px`;

    const result = [];

    if (firstIndex) {
      for (let i = replace ? 0 : firstPage - 1; i < firstPage; i += 1) {
        const key = `top-marker-${i}`;
        let marker = (
          <Waypoint
            key={key}
            onEnter={this.previousPage(i)}
            topOffset={`-${pageHeight / 2 || 96}px`}
            scrollableAncestor={scrollableAncestor}
          >
            <div
              style={{ flex: `0 0 ${markerHeight}`, height: markerHeight }}
            />
          </Waypoint>
        );
        if (renderMarker) {
          // need to give it a key
          marker = React.cloneElement(renderMarker(marker), { key });
        }
        result.push(marker);
      }
    }

    items.slice(firstIndex, lastIndex + 1).forEach((item, index) => {
      let child = children(item, index);
      if (!pageHeight && index === 0) {
        const { ref } = child;
        child = React.cloneElement(child, {
          ref: node => {
            this.beginPageRef = node;
            if (typeof ref === 'function') {
              ref(node);
            }
          },
        });
      } else if (!pageHeight && index === step - 1) {
        const { ref } = child;
        child = React.cloneElement(child, {
          ref: node => {
            this.endPageRef = node;
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

    for (
      let i = lastPage + 1;
      i < (replace ? pageCount : Math.min(pageCount, lastPage + 2));
      i += 1
    ) {
      const key = `bottom-marker-${i}`;
      let marker = (
        <Waypoint
          key={key}
          onEnter={this.nextPage(i)}
          bottomOffset={`-${pageHeight / 2 || 96}px`}
          scrollableAncestor={scrollableAncestor}
        >
          <div style={{ flex: `0 0 ${markerHeight}`, height: markerHeight }} />
        </Waypoint>
      );
      if (renderMarker) {
        // need to give it a key
        marker = React.cloneElement(renderMarker(marker), { key });
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
