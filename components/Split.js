'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SPLIT;
var BREAK_WIDTH = 720; //adds the breakpoint of single/multiple split

var Split = function (_Component) {
  (0, _inherits3.default)(Split, _Component);

  function Split() {
    (0, _classCallCheck3.default)(this, Split);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Split).call(this));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);

    _this.state = { responsive: null };
    return _this;
  }

  (0, _createClass3.default)(Split, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);
      this._layout();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // If we change the number of visible children, trigger a resize event
      // so things like Table header can adjust. This will go away once
      // CSS supports per element media queries.
      // The 500ms delay is loosely tied to the CSS animation duration.
      // We want any animations to finish before triggering the resize.
      // TODO: consider using an animation end event instead of a timer.
      if (this._nonNullChildCount(nextProps) !== this._nonNullChildCount(this.props)) {
        clearTimeout(this._resizeTimer);
        this._resizeTimer = setTimeout(function () {
          var event = document.createEvent('HTMLEvents');
          event.initEvent('resize', true, false);
          window.dispatchEvent(event);
        }, 500);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._onResize);
    }

    // Support function for componentWillReceiveProps()

  }, {
    key: '_nonNullChildCount',
    value: function _nonNullChildCount(props) {
      var result = 0;
      _react2.default.Children.forEach(props.children, function (child) {
        if (child !== null) result += 1;
      });
      return result;
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      // debounce
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(this._layout, 50);
    }
  }, {
    key: '_setResponsive',
    value: function _setResponsive(responsive) {
      if (this.state.responsive !== responsive) {
        this.setState({ responsive: responsive });
        if (this.props.onResponsive) {
          this.props.onResponsive(responsive);
        }
      }
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var splitElement = this.refs.split;
      if (splitElement) {
        if (splitElement.offsetWidth < BREAK_WIDTH && this.props.showOnResponsive === 'priority') {
          this._setResponsive('single');
        } else {
          this._setResponsive('multiple');
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var priority = this.props.priority;
      var responsive = this.state.responsive;

      var classes = [CLASS_ROOT];
      if (this.props.flex) {
        classes.push(CLASS_ROOT + "--flex-" + this.props.flex);
      }
      if (this.props.fixed) {
        classes.push(CLASS_ROOT + "--fixed");
      }
      if (this.props.separator) {
        classes.push(CLASS_ROOT + "--separator");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var children = _react.Children.map(this.props.children, function (element, index) {
        // When we only have room to show one child, hide the appropriate one
        if ('single' === responsive && ('left' === priority && index > 0 || 'right' === priority && index === 0)) {
          element = _react2.default.cloneElement(element, { style: { display: 'none' } });
        }
        return element;
      });

      return _react2.default.createElement(
        'div',
        { ref: 'split', className: classes.join(' ') },
        children
      );
    }
  }]);
  return Split;
}(_react.Component);

Split.displayName = 'Split';
exports.default = Split;


Split.propTypes = {
  fixed: _react.PropTypes.bool,
  flex: _react.PropTypes.oneOf(['left', 'right', 'both']),
  priority: _react.PropTypes.oneOf(['left', 'right']),
  separator: _react.PropTypes.bool,
  showOnResponsive: _react.PropTypes.oneOf(['priority', 'both'])
};

Split.defaultProps = {
  fixed: true,
  flex: 'both',
  priority: 'right',
  showOnResponsive: 'priority'
};
module.exports = exports['default'];