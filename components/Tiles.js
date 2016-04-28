'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Spinning = require('./icons/Spinning');

var _Spinning2 = _interopRequireDefault(_Spinning);

var _Scroll = require('../utils/Scroll');

var _Scroll2 = _interopRequireDefault(_Scroll);

var _InfiniteScroll = require('../utils/InfiniteScroll');

var _InfiniteScroll2 = _interopRequireDefault(_InfiniteScroll);

var _Selection = require('../utils/Selection');

var _Selection2 = _interopRequireDefault(_Selection);

var _LinkPrevious = require('./icons/base/LinkPrevious');

var _LinkPrevious2 = _interopRequireDefault(_LinkPrevious);

var _LinkNext = require('./icons/base/LinkNext');

var _LinkNext2 = _interopRequireDefault(_LinkNext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "tiles";
var SELECTED_CLASS = "tile--selected";

var Tiles = function (_Component) {
  _inherits(Tiles, _Component);

  function Tiles(props) {
    _classCallCheck(this, Tiles);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tiles).call(this, props));

    _this._onLeft = _this._onLeft.bind(_this);
    _this._onRight = _this._onRight.bind(_this);
    _this._onScrollHorizontal = _this._onScrollHorizontal.bind(_this);
    _this._onWheel = _this._onWheel.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this._onClick = _this._onClick.bind(_this);

    _this.state = {
      overflow: false,
      selected: _Selection2.default.normalizeIndexes(props.selected)
    };
    return _this;
  }

  _createClass(Tiles, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setSelection();
      if (this.props.onMore) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.refs.more, this.props.onMore);
      }
      if ('row' === this.props.direction) {
        window.addEventListener('resize', this._onResize);
        document.addEventListener('wheel', this._onWheel);
        this._trackHorizontalScroll();
        // give browser a chance to stabilize
        setTimeout(this._layout, 10);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selected) {
        this.setState({ selected: _Selection2.default.normalizeIndexes(nextProps.selected) });
      }
      if (this._scroll) {
        _InfiniteScroll2.default.stopListeningForScroll(this._scroll);
        this._scroll = null;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (JSON.stringify(this.state.selected) !== JSON.stringify(prevState.selected)) {
        this._setSelection();
      }
      if (this.props.onMore && !this._scroll) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.refs.more, this.props.onMore);
      }
      if ('row' === this.props.direction) {
        this._trackHorizontalScroll();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._scroll) {
        _InfiniteScroll2.default.stopListeningForScroll(this._scroll);
      }
      if ('row' === this.props.direction) {
        window.removeEventListener('resize', this._onResize);
        document.removeEventListener('wheel', this._onWheel);
        if (this._tracking) {
          var tiles = (0, _reactDom.findDOMNode)(this.refs.tiles);
          tiles.removeEventListener('scroll', this._onScrollHorizontal);
        }
      }
    }
  }, {
    key: '_onLeft',
    value: function _onLeft() {
      var tiles = (0, _reactDom.findDOMNode)(this.refs.tiles);
      _Scroll2.default.scrollBy(tiles, 'scrollLeft', -tiles.offsetWidth);
    }
  }, {
    key: '_onRight',
    value: function _onRight() {
      var tiles = (0, _reactDom.findDOMNode)(this.refs.tiles);
      _Scroll2.default.scrollBy(tiles, 'scrollLeft', tiles.offsetWidth);
    }
  }, {
    key: '_onScrollHorizontal',
    value: function _onScrollHorizontal() {
      // debounce
      clearTimeout(this._scrollTimer);
      this._scrollTimer = setTimeout(this._layout, 50);
    }
  }, {
    key: '_onWheel',
    value: function _onWheel(event) {
      if (Math.abs(event.deltaX) > 100) {
        clearInterval(this._scrollTimer);
      } else if (event.deltaX > 5) {
        this._onRight();
      } else if (event.deltaX < -5) {
        this._onLeft();
      }
    }
  }, {
    key: '_layout',
    value: function _layout() {
      if ('row' === this.props.direction) {
        // determine if we have more tiles than room to fit
        var tiles = (0, _reactDom.findDOMNode)(this.refs.tiles);
        // 20 is to allow some fuzziness as scrollbars come and go
        this.setState({
          overflow: tiles.scrollWidth > tiles.offsetWidth + 20,
          overflowStart: tiles.scrollLeft <= 20,
          overflowEnd: tiles.scrollLeft >= tiles.scrollWidth - tiles.offsetWidth
        });

        // mark any tiles that might be clipped
        var rect = tiles.getBoundingClientRect();
        var children = tiles.querySelectorAll('.tile');
        for (var i = 0; i < children.length; i += 1) {
          var child = children[i];
          var childRect = child.getBoundingClientRect();
          // 12 accounts for padding
          if (childRect.left + 12 < rect.left || childRect.right - 12 > rect.right) {
            child.classList.add('tile--eclipsed');
          } else {
            child.classList.remove('tile--eclipsed');
          }
        }
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      // debounce
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(this._layout, 50);
    }
  }, {
    key: '_trackHorizontalScroll',
    value: function _trackHorizontalScroll() {
      if (this.state.overflow && !this._tracking) {
        var tiles = (0, _reactDom.findDOMNode)(this.refs.tiles);
        tiles.addEventListener('scroll', this._onScrollHorizontal);
        this._tracking = true;
      }
    }
  }, {
    key: '_setSelection',
    value: function _setSelection() {
      _Selection2.default.setClassFromIndexes({
        containerElement: (0, _reactDom.findDOMNode)(this.refs.tiles),
        childSelector: '.tile',
        selectedClass: SELECTED_CLASS,
        selectedIndexes: this.state.selected
      });
    }
  }, {
    key: '_onClick',
    value: function _onClick(event) {
      var selected = _Selection2.default.onClick(event, {
        containerElement: (0, _reactDom.findDOMNode)(this.refs.tiles),
        childSelector: '.tile',
        selectedClass: SELECTED_CLASS,
        multiSelect: 'multiple' === this.props.selectable,
        priorSelectedIndexes: this.state.selected
      });
      // only set the selected state and classes if the caller isn't managing it.
      if (!this.props.selected) {
        this.setState({ selected: selected }, this._setSelection);
      }

      if (this.props.onSelect) {
        // notify caller that the selection has changed
        if (selected.length === 1) {
          selected = selected[0];
        }
        this.props.onSelect(selected);
      }
    }

    // children should be an array of Tile

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = [CLASS_ROOT];
      if (this.props.fill) {
        classes.push(CLASS_ROOT + "--fill");
      }
      if (this.props.flush) {
        classes.push(CLASS_ROOT + "--flush");
      }
      if (this.props.size) {
        classes.push(CLASS_ROOT + "--" + this.props.size);
      }
      if (this.props.selectable) {
        classes.push(CLASS_ROOT + "--selectable");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var other = _Props2.default.pick(this.props, Object.keys(_Box2.default.propTypes));

      var more = null;
      if (this.props.onMore) {
        classes.push(CLASS_ROOT + "--moreable");
        more = _react2.default.createElement(
          'div',
          { ref: 'more', className: CLASS_ROOT + "__more" },
          _react2.default.createElement(_Spinning2.default, null)
        );
      }

      var onClickHandler = void 0;
      if (this.props.selectable) {
        onClickHandler = this._onClick;
      }

      var children = this.props.children;
      children = _react.Children.map(this.props.children, function (element, index) {
        if (element) {
          var elementClone = _react2.default.cloneElement(element, {
            hoverBorder: !_this2.props.flush
          });

          return elementClone;
        }

        return undefined;
      }, this);

      var contents = _react2.default.createElement(
        _Box2.default,
        _extends({ ref: 'tiles' }, other, {
          wrap: this.props.direction ? false : true,
          direction: this.props.direction ? this.props.direction : 'row',
          className: classes.join(' '),
          onClick: onClickHandler,
          focusable: false }),
        children,
        more
      );

      if (this.state.overflow) {
        classes.push(CLASS_ROOT + "--overflowed");
        if (!this.state.overflowStart) {
          var left = _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + "__left", icon: _react2.default.createElement(_LinkPrevious2.default, null),
            onClick: this._onLeft });
        }
        if (!this.state.overflowEnd) {
          var right = _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + "__right", icon: _react2.default.createElement(_LinkNext2.default, null),
            onClick: this._onRight });
        }

        contents = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__container" },
          left,
          contents,
          right
        );
      }

      return contents;
    }
  }]);

  return Tiles;
}(_react.Component);

exports.default = Tiles;


Tiles.propTypes = _extends({
  fill: _react.PropTypes.bool,
  flush: _react.PropTypes.bool,
  onMore: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  selectable: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.oneOf(['multiple'])]),
  selected: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.arrayOf(_react.PropTypes.number)]),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
}, _Box2.default.propTypes);

Tiles.defaultProps = {
  flush: true,
  justify: 'start',
  pad: 'small'
};
module.exports = exports['default'];