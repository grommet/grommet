function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import Waypoint from 'react-waypoint';

var InfiniteScroll =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(InfiniteScroll, _PureComponent);

  function InfiniteScroll() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "beginPageRef", React.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "endPageRef", React.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "showRef", React.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialScroll", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollShow", function () {
      var show = _this.props.show;

      if (show && !_this.initialScroll && _this.showRef.current) {
        _this.initialScroll = true; // on initial render, scroll to any 'show'

        _this.showRef.current.scrollIntoView();
      }

      if (_this.beginPageRef.current && _this.endPageRef.current && !_this.pageHeight) {
        var beginRect = _this.beginPageRef.current.getBoundingClientRect();

        var endRect = _this.endPageRef.current.getBoundingClientRect();

        _this.pageHeight = endRect.y + endRect.height - beginRect.y;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "nextPage", function () {
      var _this$props = _this.props,
          items = _this$props.items,
          onMore = _this$props.onMore,
          step = _this$props.step;
      var _this$state = _this.state,
          firstPage = _this$state.firstPage,
          lastPage = _this$state.lastPage;
      var nextLastPage = lastPage + 1;
      var nextFirstPage = lastPage === firstPage ? firstPage : nextLastPage - 1;

      _this.setState({
        firstPage: nextFirstPage,
        lastPage: nextLastPage
      }, // call onMore if we've reached the end of the items
      function () {
        return onMore && nextLastPage * step >= items.length && onMore();
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "previousPage", function () {
      var firstPage = _this.state.firstPage;

      _this.setState({
        firstPage: Math.max(0, firstPage - 1),
        lastPage: firstPage
      });
    });

    return _this;
  }

  InfiniteScroll.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var show = nextProps.show,
        step = nextProps.step;

    if (prevState.firstPage === undefined || show && show >= step * (prevState.lastPage + 1)) {
      var lastPage = prevState.lastPage || 0;

      if (show && show >= step * (lastPage + 1)) {
        lastPage = Math.floor((show + step) / step) - 1;
      }

      return {
        firstPage: 0,
        lastPage: lastPage
      };
    }

    return null;
  };

  var _proto = InfiniteScroll.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.scrollShow();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.scrollShow();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        children = _this$props2.children,
        items = _this$props2.items,
        onMore = _this$props2.onMore,
        renderMarker = _this$props2.renderMarker,
        replace = _this$props2.replace,
        scrollableAncestor = _this$props2.scrollableAncestor,
        show = _this$props2.show,
        step = _this$props2.step;
    var _this$state2 = this.state,
        firstPage = _this$state2.firstPage,
        lastPage = _this$state2.lastPage;
    var firstIndex = firstPage * step;
    var lastIndex = (lastPage + 1) * step - 1;
    var topMarker;

    if (replace && firstIndex) {
      var content;

      if (replace && firstPage && this.pageHeight) {
        // make it a placeholder for the earlier steps to preserve scroll position
        content = React.createElement("div", {
          style: {
            height: firstPage * this.pageHeight
          }
        });
      }

      topMarker = React.createElement(Waypoint, {
        key: "topMarker",
        fireOnRapidScroll: true,
        onEnter: this.previousPage,
        topOffsetX: "-96px",
        scrollableAncestor: scrollableAncestor
      }, content);

      if (renderMarker) {
        // need to give it a key
        topMarker = React.cloneElement(renderMarker(topMarker), {
          key: 'topMarker'
        });
      }
    }

    var bottomMarker;

    if (onMore || lastIndex < items.length - 1) {
      bottomMarker = React.createElement(Waypoint, {
        key: "bottomMarker",
        fireOnRapidScroll: true,
        onEnter: this.nextPage,
        bottomOffsetX: "-96px",
        scrollableAncestor: scrollableAncestor
      });

      if (renderMarker) {
        // need to give it a key
        bottomMarker = React.cloneElement(renderMarker(bottomMarker), {
          key: 'bottomMarker'
        });
      }
    }

    var result = [];

    if (topMarker) {
      result.push(topMarker);
    }

    items.slice(firstIndex, lastIndex + 1).forEach(function (item, index) {
      var child = children(item, index);

      if (replace && !_this2.pageHeight && index === 0) {
        child = React.cloneElement(child, {
          ref: _this2.beginPageRef
        });
      } else if (replace && !_this2.pageHeight && index === step - 1) {
        child = React.cloneElement(child, {
          ref: _this2.endPageRef
        });
      }

      if (show && show === index) {
        child = React.cloneElement(child, {
          key: 'show',
          ref: _this2.showRef
        });
      }

      result.push(child);
    });

    if (bottomMarker) {
      result.push(bottomMarker);
    }

    return result;
  };

  return InfiniteScroll;
}(PureComponent);

_defineProperty(InfiniteScroll, "defaultProps", {
  items: [],
  step: 50
});

var InfiniteScrollDoc;

if (process.env.NODE_ENV !== 'production') {
  InfiniteScrollDoc = require('./doc').doc(InfiniteScroll); // eslint-disable-line global-require
}

var InfiniteScrollWrapper = InfiniteScrollDoc || InfiniteScroll;
export { InfiniteScrollWrapper as InfiniteScroll };