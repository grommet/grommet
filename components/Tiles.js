'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.TILES; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var TILE = _CSSClassnames2.default.TILE;
var SELECTED_CLASS = TILE + '--selected';

var Tiles = function (_Component) {
  (0, _inherits3.default)(Tiles, _Component);

  function Tiles(props, context) {
    (0, _classCallCheck3.default)(this, Tiles);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Tiles.__proto__ || (0, _getPrototypeOf2.default)(Tiles)).call(this, props, context));

    _this._onLeft = _this._onLeft.bind(_this);
    _this._onRight = _this._onRight.bind(_this);
    _this._onScrollHorizontal = _this._onScrollHorizontal.bind(_this);
    _this._onWheel = _this._onWheel.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this._onClick = _this._onClick.bind(_this);

    _this.state = {
      overflow: false,
      selected: _Selection2.default.normalizeIndexes(props.selected),
      numColumns: _this.props.numColumns,
      columnBreakpoints: null
    };
    return _this;
  }

  (0, _createClass3.default)(Tiles, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this._setSelection();
      if (this.props.onMore) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.moreRef, this.props.onMore);
      }
      if ('row' === this.props.direction) {
        window.addEventListener('resize', this._onResize);
        document.addEventListener('wheel', this._onWheel);
        this._trackHorizontalScroll();
        // give browser a chance to stabilize
        setTimeout(this._layout, 10);
      } else if (this.props.masonry) {
        (function () {
          var tiles = (0, _reactDom.findDOMNode)(_this2.tilesRef);
          var tile = tiles.querySelectorAll('.' + CLASS_ROOT + '__masonry-column .' + TILE);
          // default to medium tile size ($tile-size = 192px)
          var minColumnWidth = 192;

          if (!_this2.props.fill) {
            // grab CSS styles from DOM after component mounted
            minColumnWidth = _this2._getPropertyFromTile('width', tile);
          } else {
            var tileColumn = tiles.querySelectorAll('.' + CLASS_ROOT + '__masonry-column');
            var tileFlexBasis = _this2._getPropertyFromTile('minWidth', tileColumn);
            var tilePad = _this2._getPropertyFromTile('padding', tile) || _this2._getPropertyFromTile('padding-right', tile);

            // take horizontal padding into account for column breakpoints
            minColumnWidth = tilePad ? tileFlexBasis + tilePad * 2 : tileFlexBasis;
          }

          // create array of breakpoints for 1 through this.props.numColumns
          // number of columns of minColumnWidth width.
          var columnBreakpoints = Array.apply(null, Array(_this2.props.numColumns)).map(function (currentNumColumns, index) {
            return (index + 1) * minColumnWidth;
          });
          _this2.setState({ columnBreakpoints: columnBreakpoints });
          window.addEventListener('resize', _this2._onResize);
          setTimeout(_this2._layout, 10);
        })();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selected) {
        this.setState({
          selected: _Selection2.default.normalizeIndexes(nextProps.selected)
        });
      }
      if (this._scroll) {
        _InfiniteScroll2.default.stopListeningForScroll(this._scroll);
        this._scroll = null;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if ((0, _stringify2.default)(this.state.selected) !== (0, _stringify2.default)(prevState.selected)) {
        this._setSelection();
      }
      if (this.props.onMore && !this._scroll) {
        this._scroll = _InfiniteScroll2.default.startListeningForScroll(this.moreRef, this.props.onMore);
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
          var tiles = (0, _reactDom.findDOMNode)(this.tilesRef);
          tiles.removeEventListener('scroll', this._onScrollHorizontal);
        }
      } else if (this.props.masonry) {
        window.removeEventListener('resize', this._onResize);
      }
    }
  }, {
    key: '_onLeft',
    value: function _onLeft() {
      var tiles = (0, _reactDom.findDOMNode)(this.tilesRef);
      _Scroll2.default.scrollBy(tiles, 'scrollLeft', -tiles.offsetWidth);
    }
  }, {
    key: '_onRight',
    value: function _onRight() {
      var tiles = (0, _reactDom.findDOMNode)(this.tilesRef);
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
    key: '_getPropertyFromTile',
    value: function _getPropertyFromTile(propertyName, tile) {
      if (tile && tile.length > 0) {
        var columnTile = window.getComputedStyle(tile[0]);
        if (columnTile && columnTile[propertyName]) {
          return parseFloat(columnTile[propertyName]);
        }
      }
    }
  }, {
    key: '_getNumberColumns',
    value: function _getNumberColumns() {
      var columnBreakpoints = this.state.columnBreakpoints;

      var tiles = (0, _reactDom.findDOMNode)(this.tilesRef);
      var maxColumnWidthIndex = void 0;

      if (tiles) {
        maxColumnWidthIndex = columnBreakpoints.filter(function (currentMin) {
          return currentMin <= tiles.offsetWidth;
        }).reduce(function (maxIndex, currentMin, index, columnWidths) {
          return currentMin > columnWidths[maxIndex] ? index : maxIndex;
        }, 0);

        return maxColumnWidthIndex + 1; // return appropriate number of columns
      }

      return maxColumnWidthIndex;
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var _this3 = this;

      var _props = this.props;
      var direction = _props.direction;
      var masonry = _props.masonry;

      if ('row' === direction) {
        (function () {
          // determine if we have more tiles than room to fit
          var tiles = (0, _reactDom.findDOMNode)(_this3.tilesRef);
          // 20 is to allow some fuzziness as scrollbars come and go
          _this3.setState({
            overflow: tiles.scrollWidth > tiles.offsetWidth + 20,
            overflowStart: tiles.scrollLeft <= 20,
            overflowEnd: tiles.scrollLeft >= tiles.scrollWidth - tiles.offsetWidth
          });

          // mark any tiles that might be clipped
          var rect = tiles.getBoundingClientRect();
          var children = tiles.querySelectorAll('.' + TILE);

          (0, _from2.default)(children).map(function (child, index) {
            var childRect = child.getBoundingClientRect();
            // 12 accounts for padding
            if (childRect.left + 12 < rect.left || childRect.right - 12 > rect.right) {
              child.classList.add(TILE + '--eclipsed');
            } else {
              child.classList.remove(TILE + '--eclipsed');
            }
          });
        })();
      } else if (masonry) {
        // check for appropriate number of columns, if using masonry option
        var numColumns = this.state.numColumns;

        var newNumColumns = this._getNumberColumns();
        if (newNumColumns && numColumns !== newNumColumns) {
          this.setState({ numColumns: newNumColumns });
        }
      }
    }
  }, {
    key: '_renderChild',
    value: function _renderChild(element) {
      var flush = this.props.flush;


      if (element) {
        var elementClone = _react2.default.cloneElement(element, {
          hoverBorder: !flush
        });

        return elementClone;
      }

      return undefined;
    }
  }, {
    key: '_renderMasonryColumns',
    value: function _renderMasonryColumns() {
      var _this4 = this;

      var children = this.props.children;
      var numColumns = this.state.numColumns;

      var columnContents = {};

      _react.Children.map(children, function (element, index) {
        var currentColumn = index % numColumns;

        if (!columnContents['column-' + currentColumn]) {
          columnContents['column-' + currentColumn] = [];
        }

        // place children into appropriate column
        var child = _this4._renderChild(element);
        if (child) {
          columnContents['column-' + currentColumn].push(child);
        }
      }, this);

      var columnsArray = Array.apply(null, Array(numColumns));
      var columns = columnsArray.map(function (current, i) {
        return _react2.default.createElement(
          _Box2.default,
          { className: CLASS_ROOT + '__masonry-column',
            key: 'column-' + numColumns + '-' + i },
          columnContents['column-' + i]
        );
      });

      return columns;
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
        var tiles = (0, _reactDom.findDOMNode)(this.tilesRef);
        tiles.addEventListener('scroll', this._onScrollHorizontal);
        this._tracking = true;
      }
    }
  }, {
    key: '_setSelection',
    value: function _setSelection() {
      _Selection2.default.setClassFromIndexes({
        containerElement: (0, _reactDom.findDOMNode)(this.tilesRef),
        childSelector: '.' + TILE,
        selectedClass: SELECTED_CLASS,
        selectedIndexes: this.state.selected
      });
    }
  }, {
    key: '_onClick',
    value: function _onClick(event) {
      var selected = _Selection2.default.onClick(event, {
        containerElement: (0, _reactDom.findDOMNode)(this.tilesRef),
        childSelector: '.' + TILE,
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
      var _classnames,
          _this5 = this;

      var _props2 = this.props;
      var onMore = _props2.onMore;
      var selectable = _props2.selectable;
      var masonry = _props2.masonry;
      var direction = _props2.direction;
      var overflow = this.state.overflow;


      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--fill', this.props.fill), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--flush', this.props.flush), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + this.props.size, this.props.size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--selectable', this.props.selectable), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--moreable', this.props.onMore), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--overflowed', this.state.overflow), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--masonry', this.props.masonry), _classnames), this.props.className);

      var other = _Props2.default.pick(this.props, (0, _keys2.default)(_Box2.default.propTypes));

      var more = null;
      if (onMore) {
        more = _react2.default.createElement(
          'div',
          { ref: function ref(_ref) {
              return _this5.moreRef = _ref;
            }, className: CLASS_ROOT + '__more' },
          _react2.default.createElement(_Spinning2.default, null)
        );
      }

      var onClickHandler = void 0;
      if (selectable) {
        onClickHandler = this._onClick;
      }

      var children = this.props.children;
      if (masonry) {
        console.warn('Tiles: masonry prop has been deprecated. ' + 'Use a Columns instead.');
        children = this._renderMasonryColumns();
      } else {
        children = _react.Children.map(this.props.children, function (element) {
          return _this5._renderChild(element);
        }, this);
      }

      var contents = _react2.default.createElement(
        _Box2.default,
        (0, _extends3.default)({ ref: function ref(_ref2) {
            return _this5.tilesRef = _ref2;
          } }, other, {
          wrap: direction ? false : true,
          direction: direction ? direction : 'row',
          className: classes,
          onClick: onClickHandler,
          focusable: false }),
        children,
        more
      );

      if (overflow) {
        var left = void 0;
        var right = void 0;

        if (!this.state.overflowStart) {
          left = _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__left', icon: _react2.default.createElement(_LinkPrevious2.default, null),
            onClick: this._onLeft });
        }
        if (!this.state.overflowEnd) {
          right = _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__right', icon: _react2.default.createElement(_LinkNext2.default, null),
            onClick: this._onRight });
        }

        contents = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__container' },
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

Tiles.displayName = 'Tiles';
exports.default = Tiles;


Tiles.propTypes = (0, _extends3.default)({
  fill: _react.PropTypes.bool, // remove in 1.0, rely on Box props
  flush: _react.PropTypes.bool, // remove in 1.0, already in Box
  onMore: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  selectable: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.oneOf(['multiple'])]),
  selected: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.arrayOf(_react.PropTypes.number)]),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']), // remove in 1.0
  // already in Box
  numColumns: _react.PropTypes.number, // remove in 1.0
  masonry: _react.PropTypes.bool }, _Box2.default.propTypes);

Tiles.defaultProps = {
  flush: true,
  justify: 'start',
  pad: 'small',
  numColumns: 1
};
module.exports = exports['default'];