function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, PureComponent } from 'react';
import { findScrollParents } from '../../utils';
import { Box } from '../Box';

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialScroll", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "aboveMarkerRef", createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "belowMarkerRef", createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "addScrollListener", function () {
      var pageHeight = _this.state.pageHeight;

      if (pageHeight && _this.belowMarkerRef.current && !_this.scrollParents) {
        _this.scrollParents = findScrollParents(_this.belowMarkerRef.current);

        _this.scrollParents.forEach(function (scrollParent) {
          return scrollParent.addEventListener('scroll', _this.onScroll);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeScrollListener", function () {
      if (_this.scrollParents) {
        _this.scrollParents.forEach(function (scrollParent) {
          return scrollParent.removeEventListener('scroll', _this.place);
        });

        _this.scrollParents = undefined;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollShow", function () {
      var show = _this.props.show;

      if (show && !_this.initialScroll && _this.showRef) {
        _this.initialScroll = true; // on initial render, scroll to any 'show'

        _this.showRef.scrollIntoView();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setPageHeight", function () {
      var pageHeight = _this.state.pageHeight;

      if (_this.firstPageItemRef && _this.lastPageItemRef && !pageHeight) {
        var beginRect = _this.firstPageItemRef.getBoundingClientRect();

        var endRect = _this.lastPageItemRef.getBoundingClientRect();

        var nextPageHeight = endRect.y + endRect.height - beginRect.y; // In case the pageHeight is smaller than the visible area,
        // we call onScroll to set the page boundaries appropriately.

        _this.setState({
          pageHeight: nextPageHeight
        }, _this.onScroll);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onScroll", function () {
      var _this$props = _this.props,
          onMore = _this$props.onMore,
          replace = _this$props.replace;
      var _this$state = _this.state,
          beginPage = _this$state.beginPage,
          endPage = _this$state.endPage,
          lastPage = _this$state.lastPage,
          pageHeight = _this$state.pageHeight;

      if (_this.scrollParents && _this.scrollParents[0] && pageHeight) {
        var scrollParent = _this.scrollParents[0]; // Determine the window into the first scroll parent

        var top;
        var height;

        if (scrollParent === document) {
          top = document.documentElement.scrollTop || document.body.scrollTop;
          height = window.innerHeight;
        } else {
          top = scrollParent.scrollTop;
          var rect = scrollParent.getBoundingClientRect();
          height = rect.height;
        } // Figure out which pages we should make visible based on the scroll
        // window.


        var offset = height / 4;
        var nextBeginPage = replace ? Math.min(lastPage, Math.max(0, Math.floor(Math.max(0, top - offset) / pageHeight))) : 0;
        var nextEndPage = Math.min(lastPage, Math.max(!replace && endPage || 0, Math.floor((top + height + offset) / pageHeight)));

        if (nextBeginPage !== beginPage || nextEndPage !== endPage) {
          _this.setState({
            beginPage: nextBeginPage,
            endPage: nextEndPage
          }, function () {
            if (onMore && nextEndPage === lastPage) {
              onMore();
            }
          });
        }
      }
    });

    return _this;
  }

  InfiniteScroll.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var items = nextProps.items,
        show = nextProps.show,
        step = nextProps.step;
    var lastPage = Math.ceil(items.length / step) - 1;

    if (prevState.beginPage === undefined || show && show >= step * (prevState.lastPage + 1) || lastPage !== prevState.lastPage) {
      var endPage = prevState.endPage || 0;

      if (show && show >= step * (endPage + 1)) {
        endPage = Math.floor((show + step) / step) - 1;
      }

      return {
        beginPage: 0,
        endPage: endPage,
        lastPage: lastPage,
        pageHeight: undefined
      };
    }

    return null;
  };

  var _proto = InfiniteScroll.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    // ride out any animation, 100ms was chosen empirically
    clearTimeout(this.animationDelayTimer);
    this.animationDelayTimer = setTimeout(function () {
      _this2.setPageHeight();

      _this2.addScrollListener();

      _this2.scrollShow();
    }, 100);
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.setPageHeight();
    this.removeScrollListener();
    this.addScrollListener();
    this.scrollShow();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.removeScrollListener();
    clearTimeout(this.animationDelayTimer);
    clearTimeout(this.scrollTimer);
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props2 = this.props,
        children = _this$props2.children,
        items = _this$props2.items,
        onMore = _this$props2.onMore,
        renderMarker = _this$props2.renderMarker,
        replace = _this$props2.replace,
        show = _this$props2.show,
        step = _this$props2.step;
    var _this$state2 = this.state,
        beginPage = _this$state2.beginPage,
        endPage = _this$state2.endPage,
        lastPage = _this$state2.lastPage,
        pageHeight = _this$state2.pageHeight;
    var firstIndex = beginPage * step;
    var lastIndex = (endPage + 1) * step - 1;
    var result = [];

    if (replace && pageHeight && firstIndex) {
      var marker = React.createElement(Box, {
        key: "above",
        ref: this.aboveMarkerRef,
        flex: false,
        height: beginPage * pageHeight + "px"
      });

      if (renderMarker) {
        // need to give it a key
        marker = React.cloneElement(renderMarker(marker), {
          key: 'above'
        });
      }

      result.push(marker);
    }

    items.slice(firstIndex, lastIndex + 1).forEach(function (item, index) {
      var itemsIndex = firstIndex + index;
      var child = children(item, itemsIndex);

      if (!pageHeight && itemsIndex === 0) {
        var _child = child,
            _ref = _child.ref;
        child = React.cloneElement(child, {
          ref: function ref(node) {
            _this3.firstPageItemRef = node;

            if (typeof _ref === 'function') {
              _ref(node);
            }
          }
        });
      } else if (!pageHeight && itemsIndex === step - 1) {
        var _child2 = child,
            _ref2 = _child2.ref;
        child = React.cloneElement(child, {
          ref: function ref(node) {
            _this3.lastPageItemRef = node;

            if (typeof _ref2 === 'function') {
              _ref2(node);
            }
          }
        });
      }

      if (show && show === itemsIndex) {
        var _child3 = child,
            _ref3 = _child3.ref;
        child = React.cloneElement(child, {
          key: 'show',
          ref: function ref(node) {
            _this3.showRef = node;

            if (typeof _ref3 === 'function') {
              _ref3(node);
            }
          }
        });
      }

      result.push(child);
    });

    if (endPage < lastPage || replace || onMore) {
      var _marker = React.createElement(Box, {
        key: "below",
        ref: this.belowMarkerRef,
        flex: false,
        height: (replace ? (lastPage - endPage) * pageHeight : 0) + "px"
      });

      if (renderMarker) {
        // need to give it a key
        _marker = React.cloneElement(renderMarker(_marker), {
          key: 'below'
        });
      }

      result.push(_marker);
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