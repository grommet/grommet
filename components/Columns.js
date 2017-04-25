'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Responsive = require('../utils/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.COLUMNS;

var Columns = function (_Component) {
  _inherits(Columns, _Component);

  function Columns(props, context) {
    _classCallCheck(this, Columns);

    var _this = _possibleConstructorReturn(this, (Columns.__proto__ || Object.getPrototypeOf(Columns)).call(this, props, context));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this.state = {
      count: 1,
      maxCount: _this.props.maxCount,
      columnBreakpoints: undefined,
      initMobile: false,
      margin: _this.props.margin
    };
    return _this;
  }

  _createClass(Columns, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.masonry) {
        this._getColumnBreakpoints();
      }

      window.addEventListener('resize', this._onResize);
      setTimeout(this._layout, 10);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ relayout: true });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.relayout) {
        this.setState({ relayout: false });
        this._layout();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._onResize);
      clearTimeout(this._layoutTimer);
      clearTimeout(this._childStylesTimer);
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      var initMobile = this.state.initMobile;

      if (initMobile) {
        if (window.innerWidth > _Responsive2.default.smallSize()) {
          this._getColumnBreakpoints();
        }
      } else {
        clearTimeout(this._layoutTimer);
        this._layoutTimer = setTimeout(this._layout, 50);
      }
    }
  }, {
    key: '_getChildMarginSize',
    value: function _getChildMarginSize(childStyles) {
      var childMargin = void 0;

      if (childStyles) {
        var childLeftMargin = childStyles.marginLeft ? parseFloat(childStyles.marginLeft) : 0;
        var childRightMargin = childStyles.marginRight ? parseFloat(childStyles.marginRight) : 0;
        childMargin = childLeftMargin + childRightMargin;

        if (childMargin === 48) {
          return 'large';
        } else if (childMargin === 24) {
          return 'medium';
        } else if (childMargin === 12) {
          return 'small';
        }
      }

      return undefined;
    }
  }, {
    key: '_getColumnBreakpoints',
    value: function _getColumnBreakpoints() {
      var _this2 = this;

      var _state = this.state,
          initMobile = _state.initMobile,
          margin = _state.margin;
      // grab CSS styles from DOM after component mounted
      // default to small size ($size-small = 192px)

      var container = (0, _reactDom.findDOMNode)(this.containerRef);
      if (container) {
        var column = container.childNodes[0];
        var child = column.childNodes[0];
        var minColumnWidth = 192;
        var currentMobile = initMobile && window.innerWidth <= _Responsive2.default.smallSize();

        if (child) {
          clearTimeout(this._childStylesTimer);
          this._childStylesTimer = setTimeout(function () {
            var childStyles = window.getComputedStyle(child);

            if (childStyles && childStyles.width) {
              var childLeftMargin = childStyles.marginLeft ? parseFloat(childStyles.marginLeft) : 0;
              var childRightMargin = childStyles.marginRight ? parseFloat(childStyles.marginRight) : 0;
              minColumnWidth = parseFloat(childStyles.width) + childLeftMargin + childRightMargin;
            }

            var childMarginSize = margin || _this2._getChildMarginSize(childStyles);

            // create array of breakpoints for 1 through this.props.maxCount
            // number of columns of minColumnWidth width.
            var columnBreakpoints = Array.apply(undefined, Array(_this2.props.maxCount)).map(function (currentMaxCount, index) {
              return (index + 1) * minColumnWidth;
            });

            _this2.setState({
              columnBreakpoints: columnBreakpoints,
              margin: childMarginSize,
              initMobile: currentMobile
            }, function () {
              clearTimeout(_this2._layoutTimer);
              _this2._layoutTimer = setTimeout(_this2._layout, 50);
            });
          }, 200);
        }
      }
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
      var masonry = this.props.masonry;

      var children = _react2.default.Children.toArray(this.props.children);
      var groups = [];

      if (masonry) {
        // fill columns horizontally for masonry option
        var maxCount = this.state.maxCount;

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
        }, this);

        Object.keys(columnGroups).map(function (key, index) {
          if (columnGroups[index]) {
            groups.push(columnGroups[index]);
          }
        });
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
          _this3 = this;

      var _props = this.props,
          className = _props.className,
          justify = _props.justify,
          responsive = _props.responsive,
          size = _props.size;
      var margin = this.state.margin;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--justify-' + justify, justify), _defineProperty(_classnames, CLASS_ROOT + '--margin-' + margin, margin), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _classnames), className);
      var restProps = _Props2.default.omit(this.props, Object.keys(Columns.propTypes));

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
        _extends({ ref: function ref(_ref) {
            return _this3.containerRef = _ref;
          } }, restProps, {
          className: classes }),
        columns
      );
    }
  }]);

  return Columns;
}(_react.Component);

Columns.displayName = 'Columns';
exports.default = Columns;


Columns.propTypes = {
  justify: _propTypes2.default.oneOf(['start', 'center', 'between', 'end']),
  margin: _propTypes2.default.oneOf(['small', 'medium', 'large']),
  masonry: _propTypes2.default.bool,
  maxCount: _propTypes2.default.number,
  responsive: _propTypes2.default.bool,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large'])
};

Columns.defaultProps = {
  maxCount: 1,
  justify: 'start',
  responsive: true
};
module.exports = exports['default'];