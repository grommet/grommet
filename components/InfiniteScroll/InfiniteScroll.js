"use strict";

exports.__esModule = true;
exports.InfiniteScroll = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _utils = require("../../utils");

var _Box = require("../Box");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

// Wraps an item to ensure we can get a ref to it

/* eslint-disable react/no-multi-comp, react/no-find-dom-node */
var Ref =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Ref, _Component);

  function Ref() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Ref.prototype;

  _proto.render = function render() {
    var children = this.props.children;
    return children;
  };

  return Ref;
}(_react.Component);

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

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "initialScroll", false);

    _defineProperty(_assertThisInitialized(_this), "belowMarkerRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "firstPageItemRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "lastPageItemRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "showRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "addScrollListener", function () {
      var pageHeight = _this.state.pageHeight;

      if (pageHeight && _this.belowMarkerRef.current && !_this.scrollParents) {
        _this.scrollParents = (0, _utils.findScrollParents)(_this.belowMarkerRef.current);

        _this.scrollParents.forEach(function (scrollParent) {
          return scrollParent.addEventListener('scroll', _this.onScroll);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "removeScrollListener", function () {
      if (_this.scrollParents) {
        _this.scrollParents.forEach(function (scrollParent) {
          return scrollParent.removeEventListener('scroll', _this.place);
        });

        _this.scrollParents = undefined;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "scrollShow", function () {
      var show = _this.props.show;

      if (show && !_this.initialScroll && _this.showRef.current) {
        _this.initialScroll = true; // on initial render, scroll to any 'show'

        (0, _reactDom.findDOMNode)(_this.showRef.current).scrollIntoView();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setPageHeight", function () {
      var step = _this.props.step;
      var pageHeight = _this.state.pageHeight;

      if (_this.firstPageItemRef.current && _this.lastPageItemRef.current && !pageHeight) {
        /* eslint-disable react/no-find-dom-node */
        var beginRect = (0, _reactDom.findDOMNode)(_this.firstPageItemRef.current).getBoundingClientRect();
        var endRect = (0, _reactDom.findDOMNode)(_this.lastPageItemRef.current).getBoundingClientRect();
        var nextPageHeight = endRect.top + endRect.height - beginRect.top; // Check if the items are arranged in a single column or not.

        var multiColumn = nextPageHeight / step < endRect.height;
        var pageArea = endRect.height * endRect.width * step; // In case the pageHeight is smaller than the visible area,
        // we call onScroll to set the page boundaries appropriately.

        _this.setState({
          multiColumn: multiColumn,
          pageArea: pageArea,
          pageHeight: nextPageHeight
        }, _this.onScroll);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onScroll", function () {
      var _this$props = _this.props,
          onMore = _this$props.onMore,
          replace = _this$props.replace;
      var _this$state = _this.state,
          beginPage = _this$state.beginPage,
          endPage = _this$state.endPage,
          lastPage = _this$state.lastPage,
          multiColumn = _this$state.multiColumn,
          pageArea = _this$state.pageArea,
          pageHeight = _this$state.pageHeight;

      if (_this.scrollParents && _this.scrollParents[0] && pageHeight) {
        var scrollParent = _this.scrollParents[0]; // Determine the window into the first scroll parent

        var top;
        var height;
        var width;

        if (scrollParent === document) {
          top = document.documentElement.scrollTop || document.body.scrollTop;
          height = window.innerHeight;
          width = window.innerWidth;
        } else {
          top = scrollParent.scrollTop;
          var rect = scrollParent.getBoundingClientRect();
          height = rect.height;
          width = rect.width;
        } // Figure out which pages we should make visible based on the scroll
        // window.


        var offset = height / 4;
        var nextBeginPage = replace ? Math.min(lastPage, Math.max(0, multiColumn ? Math.floor(Math.max(0, top - offset) * width / pageArea) : Math.floor(Math.max(0, top - offset) / pageHeight))) : 0;
        var nextEndPage = Math.min(lastPage, Math.max(!replace && endPage || 0, multiColumn ? Math.ceil((top + height + offset) * width / pageArea) : Math.floor((top + height + offset) / pageHeight)));

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

  var _proto2 = InfiniteScroll.prototype;

  _proto2.componentDidMount = function componentDidMount() {
    var _this2 = this;

    // ride out any animation, 100ms was chosen empirically
    clearTimeout(this.animationDelayTimer);
    this.animationDelayTimer = setTimeout(function () {
      _this2.setPageHeight();

      _this2.addScrollListener();

      _this2.scrollShow();

      _this2.onScroll();
    }, 100);
  };

  _proto2.componentDidUpdate = function componentDidUpdate() {
    this.setPageHeight();
    this.removeScrollListener();
    this.addScrollListener();
    this.scrollShow();
  };

  _proto2.componentWillUnmount = function componentWillUnmount() {
    this.removeScrollListener();
    clearTimeout(this.animationDelayTimer);
    clearTimeout(this.scrollTimer);
  };

  _proto2.render = function render() {
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
      var marker = _react.default.createElement(_Box.Box, {
        key: "above",
        flex: false,
        height: beginPage * pageHeight + "px"
      });

      if (renderMarker) {
        // need to give it a key
        marker = _react.default.cloneElement(renderMarker(marker), {
          key: 'above'
        });
      }

      result.push(marker);
    }

    items.slice(firstIndex, lastIndex + 1).forEach(function (item, index) {
      var itemsIndex = firstIndex + index;
      var child = children(item, itemsIndex);

      if (!pageHeight && itemsIndex === 0) {
        child = _react.default.createElement(Ref, {
          key: "first",
          ref: _this3.firstPageItemRef
        }, child);
      } else if (!pageHeight && itemsIndex === step - 1) {
        child = _react.default.createElement(Ref, {
          key: "last",
          ref: _this3.lastPageItemRef
        }, child);
      }

      if (show && show === itemsIndex) {
        child = _react.default.createElement(Ref, {
          key: "show",
          ref: _this3.showRef
        }, child);
      }

      result.push(child);
    });

    if (endPage < lastPage || replace || onMore) {
      var _marker = _react.default.createElement(_Box.Box, {
        key: "below",
        ref: this.belowMarkerRef,
        flex: false,
        height: (replace ? (lastPage - endPage) * pageHeight : 0) + "px"
      });

      if (renderMarker) {
        // need to give it a key
        _marker = _react.default.cloneElement(renderMarker(_marker), {
          key: 'below'
        });
      }

      result.push(_marker);
    }

    return result;
  };

  return InfiniteScroll;
}(_react.PureComponent);

_defineProperty(InfiniteScroll, "defaultProps", {
  items: [],
  step: 50
});

var InfiniteScrollDoc;

if (process.env.NODE_ENV !== 'production') {
  InfiniteScrollDoc = require('./doc').doc(InfiniteScroll); // eslint-disable-line global-require
}

var InfiniteScrollWrapper = InfiniteScrollDoc || InfiniteScroll;
/* eslint-enable react/no-find-dom-node, react/no-multi-comp */

exports.InfiniteScroll = InfiniteScrollWrapper;