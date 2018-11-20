import React, { PureComponent } from 'react';
import Waypoint from 'react-waypoint';

class InfiniteScroll extends PureComponent {
  static defaultProps = {
    items: [],
    step: 50,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { show, step } = nextProps;
    if (
      prevState.firstPage === undefined ||
      (show && show >= step * (prevState.lastPage + 1))
    ) {
      let lastPage = prevState.lastPage || 0;
      if (show && show >= step * (lastPage + 1)) {
        lastPage = Math.floor((show + step) / step) - 1;
      }
      return { firstPage: 0, lastPage };
    }
    return null;
  }

  state = {};

  beginPageRef = React.createRef();

  endPageRef = React.createRef();

  showRef = React.createRef();

  initialScroll = false;

  componentDidMount() {
    this.scrollShow();
  }

  componentDidUpdate() {
    this.scrollShow();
  }

  scrollShow = () => {
    const { show } = this.props;
    if (show && !this.initialScroll && this.showRef.current) {
      this.initialScroll = true;
      // on initial render, scroll to any 'show'
      this.showRef.current.scrollIntoView();
    }
    if (
      this.beginPageRef.current &&
      this.endPageRef.current &&
      !this.pageHeight
    ) {
      const beginRect = this.beginPageRef.current.getBoundingClientRect();
      const endRect = this.endPageRef.current.getBoundingClientRect();
      this.pageHeight = endRect.y + endRect.height - beginRect.y;
    }
  };

  nextPage = () => {
    const { items, onMore, step } = this.props;
    const { firstPage, lastPage } = this.state;
    const nextLastPage = lastPage + 1;
    const nextFirstPage = lastPage === firstPage ? firstPage : nextLastPage - 1;
    this.setState(
      { firstPage: nextFirstPage, lastPage: nextLastPage },
      // call onMore if we've reached the end of the items
      () => onMore && nextLastPage * step >= items.length && onMore(),
    );
  };

  previousPage = () => {
    const { firstPage } = this.state;
    this.setState({
      firstPage: Math.max(0, firstPage - 1),
      lastPage: firstPage,
    });
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
    const { firstPage, lastPage } = this.state;

    const firstIndex = firstPage * step;
    const lastIndex = (lastPage + 1) * step - 1;
    const topWaypointIndex = firstIndex ? Math.round(step * 0.25) : undefined;
    const bottomWaypointIndex =
      lastIndex - firstIndex - Math.round(step * 0.25);

    let topMarker;
    if (replace && firstIndex) {
      topMarker = (
        <Waypoint
          key="topMarker"
          onEnter={this.previousPage}
          scrollableAncestor={scrollableAncestor}
        />
      );
      if (renderMarker) {
        // need to give it a key
        topMarker = React.cloneElement(renderMarker(topMarker), {
          key: 'topMarker',
        });
      }
    }

    let bottomMarker = (
      <Waypoint
        key="bottomMarker"
        onEnter={this.nextPage}
        bottomOffsetX="-96px"
        scrollableAncestor={scrollableAncestor}
      />
    );
    if (renderMarker) {
      // need to give it a key
      bottomMarker = React.cloneElement(renderMarker(bottomMarker), {
        key: 'bottomMarker',
      });
    }

    // add one big placeholder for the earlier steps
    const result = [];
    if (replace && firstPage && this.pageHeight) {
      let reservedSpace = (
        <div key="reserved" style={{ height: firstPage * this.pageHeight }} />
      );
      if (renderMarker) {
        reservedSpace = React.cloneElement(renderMarker(reservedSpace), {
          key: 'reserved',
        });
      }
      result.push(reservedSpace);
    }

    items.slice(firstIndex, lastIndex + 1).forEach((item, index) => {
      let child = children(item, index);
      if (replace && !this.pageHeight && index === 0) {
        child = React.cloneElement(child, { ref: this.beginPageRef });
      } else if (replace && !this.pageHeight && index === step - 1) {
        child = React.cloneElement(child, { ref: this.endPageRef });
      }
      if (show && show === index) {
        child = React.cloneElement(child, { key: 'show', ref: this.showRef });
      }
      if (topMarker && index === topWaypointIndex) {
        result.push(topMarker);
      } else if (bottomMarker && index === bottomWaypointIndex) {
        result.push(bottomMarker);
      }
      result.push(child);
    });

    return result;
  }
}

let InfiniteScrollDoc;
if (process.env.NODE_ENV !== 'production') {
  InfiniteScrollDoc = require('./doc').doc(InfiniteScroll); // eslint-disable-line global-require
}
const InfiniteScrollWrapper = InfiniteScrollDoc || InfiniteScroll;

export { InfiniteScrollWrapper as InfiniteScroll };
