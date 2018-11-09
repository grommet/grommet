"use strict";

exports.__esModule = true;
exports.InfiniteScroll = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _reactWaypoint = _interopRequireDefault(require("react-waypoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "showRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialScroll", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollShow", function () {
      /* eslint-disable-next-line react/prop-types */
      var show = _this.props.show;

      if (show && !_this.initialScroll && _this.showRef.current) {
        _this.initialScroll = true; // on initial render, scroll to any 'show'

        /* eslint-disable react/no-find-dom-node */

        var element = (0, _reactDom.findDOMNode)(_this.showRef.current);
        element.scrollIntoView();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "increaseOffset", function () {
      /* eslint-disable-next-line react/prop-types */
      var _this$props = _this.props,
          items = _this$props.items,
          onMore = _this$props.onMore,
          step = _this$props.step;
      var count = _this.state.count;

      _this.setState({
        count: count + 1
      }, // call onMore if we've reached the end of the items
      function () {
        return onMore && (count + 1) * step >= items.length && onMore();
      });
    });

    return _this;
  }

  InfiniteScroll.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var show = nextProps.show,
        step = nextProps.step;

    if (!prevState.count || show && show < step * prevState.count) {
      var count = prevState.count || 1;

      if (show && show > step * count) {
        count = (show + step) / step;
      }

      return {
        count: count
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
        renderMarker = _this$props2.renderMarker,
        scrollableAncestor = _this$props2.scrollableAncestor,
        show = _this$props2.show,
        step = _this$props2.step;
    var count = this.state.count;
    var displayCount = step * count;
    var waypointAt = displayCount - step / 2;

    var marker = _react.default.createElement(_reactWaypoint.default, {
      key: "marker",
      onEnter: this.increaseOffset,
      bottomOffsetX: "-96px",
      scrollableAncestor: scrollableAncestor
    });

    if (renderMarker) {
      // need to give it a key
      marker = _react.default.cloneElement(renderMarker(marker), {
        key: 'marker'
      });
    }

    return items.slice(0, displayCount).map(function (item, index) {
      var child = children(item, index);

      if (show && show === index) {
        child = _react.default.cloneElement(child, {
          key: 'show',
          ref: _this2.showRef
        });
      }

      if (index === waypointAt) {
        return [child, marker];
      }

      return child;
    });
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
exports.InfiniteScroll = InfiniteScrollWrapper;