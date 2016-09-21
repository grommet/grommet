'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Responsive = require('../utils/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.COLUMNS; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Columns = function (_Component) {
  (0, _inherits3.default)(Columns, _Component);

  function Columns(props, context) {
    (0, _classCallCheck3.default)(this, Columns);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Columns.__proto__ || (0, _getPrototypeOf2.default)(Columns)).call(this, props, context));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this.state = {
      count: 1,
      maxCount: _this.props.maxCount,
      columnBreakpoints: null,
      initMobile: false
    };
    return _this;
  }

  (0, _createClass3.default)(Columns, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.masonry) {
        var columnBreakpoints = this._getColumnBreakpoints();
        var initialState = { columnBreakpoints: columnBreakpoints };

        // make sure to recalculate columnBreakpoints if starting
        // with smaller screen width and resizing
        if (window.innerWidth <= _Responsive2.default.smallSize()) {
          initialState.initMobile = true;
        }
        this.setState(initialState);
      }

      window.addEventListener('resize', this._onResize);
      setTimeout(this._layout, 10);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._onResize);
      clearTimeout(this._layoutTimer);
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      var _this2 = this;

      var initMobile = this.state.initMobile;

      if (initMobile) {
        if (window.innerWidth > _Responsive2.default.smallSize()) {
          var columnBreakpoints = this._getColumnBreakpoints();
          this.setState({
            initMobile: false,
            columnBreakpoints: columnBreakpoints
          }, function () {
            clearTimeout(_this2._layoutTimer);
            _this2._layoutTimer = setTimeout(_this2._layout, 50);
          });
        }
      } else {
        clearTimeout(this._layoutTimer);
        this._layoutTimer = setTimeout(this._layout, 50);
      }
    }
  }, {
    key: '_getColumnBreakpoints',
    value: function _getColumnBreakpoints() {
      // grab CSS styles from DOM after component mounted
      // default to small size ($size-small = 192px)
      var minColumnWidth = 192;
      var container = (0, _reactDom.findDOMNode)(this.containerRef);
      var column = container.childNodes[0];
      var child = column.childNodes[0];

      if (child) {
        var childStyles = window.getComputedStyle(child);
        if (childStyles && childStyles.width) {
          minColumnWidth = parseFloat(childStyles.width);
        }
      }

      // create array of breakpoints for 1 through this.props.maxCount
      // number of columns of minColumnWidth width.
      var columnBreakpoints = Array.apply(null, Array(this.props.maxCount)).map(function (currentMaxCount, index) {
        return (index + 1) * minColumnWidth;
      });
      return columnBreakpoints;
    }
  }, {
    key: '_calculateMaxCount',
    value: function _calculateMaxCount() {
      var columnBreakpoints = this.state.columnBreakpoints;

      var container = (0, _reactDom.findDOMNode)(this.containerRef);
      var maxColumnWidthIndex = void 0;

      if (container && columnBreakpoints) {
        maxColumnWidthIndex = columnBreakpoints.filter(function (currentMin) {
          return currentMin <= container.offsetWidth;
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
      var masonry = this.props.masonry;

      var container = this.containerRef;

      if (container && !masonry) {
        // fills columns top to bottom, then left to right
        var children = _react2.default.Children.toArray(this.props.children);
        var count = 1;
        var child = container.childNodes[0];
        if (child) {
          var rect = container.getBoundingClientRect();
          var childRect = child.getBoundingClientRect();
          var widestCount = Math.floor(rect.width / childRect.width);
          var childrenPerColumn = Math.ceil(children.length / widestCount);
          count = Math.ceil(children.length / childrenPerColumn);
        }

        if (count === 0) {
          count = 1;
        }

        this.setState({ count: count });
      } else {
        // fills columns left to right, then top to bottom
        // by determining max number of columns (maxCount)
        var maxCount = this.state.maxCount;

        var newMaxCount = this._calculateMaxCount();
        if (newMaxCount && maxCount !== newMaxCount) {
          this.setState({ maxCount: newMaxCount });
        }
      }
    }
  }, {
    key: '_renderColumns',
    value: function _renderColumns() {
      var _this3 = this;

      var masonry = this.props.masonry;

      var children = _react2.default.Children.toArray(this.props.children);
      var groups = [];

      if (masonry) {
        (function () {
          // fill columns horizontally for masonry option
          var maxCount = _this3.state.maxCount;

          var columnGroups = {};

          _react2.default.Children.map(children, function (child, index) {
            var currentColumn = index % maxCount;

            if (!columnGroups[currentColumn]) {
              columnGroups[currentColumn] = [];
            }

            // place children into appropriate column
            if (child) {
              columnGroups[currentColumn].push(child);
            }
          }, _this3);

          (0, _keys2.default)(columnGroups).map(function (key, index) {
            if (columnGroups[index]) {
              groups.push(columnGroups[index]);
            }
          });
        })();
      } else {
        // fill columns vertically
        var count = this.state.count;

        var childrenPerColumn = Math.ceil(children.length / count);
        var offset = 0;
        while (groups.length < count) {
          groups.push(children.slice(offset, offset + childrenPerColumn));
          offset += childrenPerColumn;
        }
      }

      return groups;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this4 = this;

      var _props = this.props;
      var justify = _props.justify;
      var responsive = _props.responsive;
      var size = _props.size;

      var classes = (0, _classnames3.default)(CLASS_ROOT, this.props.className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--justify-' + justify, justify), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), _classnames));

      var groups = this._renderColumns();
      var columns = groups.map(function (group, index) {
        return _react2.default.createElement(
          'div',
          { key: index, className: CLASS_ROOT + '__column' },
          group
        );
      });

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref) {
            return _this4.containerRef = _ref;
          }, className: classes },
        columns
      );
    }
  }]);
  return Columns;
}(_react.Component);

Columns.displayName = 'Columns';
exports.default = Columns;


Columns.propTypes = {
  justify: _react.PropTypes.oneOf(['start', 'center', 'between', 'end']),
  masonry: _react.PropTypes.bool,
  maxCount: _react.PropTypes.number,
  responsive: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
};

Columns.defaultProps = {
  maxCount: 1,
  justify: 'start',
  responsive: true
};
module.exports = exports['default'];