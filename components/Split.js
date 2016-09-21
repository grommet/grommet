'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SPLIT;
var BREAK_WIDTH = 720; //adds the breakpoint of single/multiple split

var Split = function (_Component) {
  (0, _inherits3.default)(Split, _Component);

  function Split(props, context) {
    (0, _classCallCheck3.default)(this, Split);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Split.__proto__ || (0, _getPrototypeOf2.default)(Split)).call(this, props, context));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);

    _this.state = { responsive: undefined };
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
        if (child) result += 1;
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
      var splitElement = this.splitRef;
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
      var _classnames,
          _this2 = this;

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var fixed = _props.fixed;
      var priority = _props.priority;
      var separator = _props.separator;
      var flex = this.props.flex;
      var responsive = this.state.responsive;

      var classes = (0, _classnames3.default)(CLASS_ROOT, className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--flex-' + this.props.flex, flex), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--fixed', fixed), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--separator', separator), _classnames));

      var elements = _react.Children.toArray(children).filter(function (element) {
        return element;
      });

      elements = elements.map(function (element, index) {
        var hasFlex = true;
        var className = '';
        // When we only have room to show one child, hide the appropriate one
        if ('single' === responsive && ('left' === priority && index > 0 || 'right' === priority && index === 0 && elements.length > 1)) {
          className += CLASS_ROOT + '--hidden';
          flex = 'both';
        } else if (elements.length > 1 && (flex === 'right' && index === 0 || flex === 'left' && index === elements.length - 1)) {
          hasFlex = false;
        } else {
          className = CLASS_ROOT + '--full';
        }
        return _react2.default.createElement(
          _Box2.default,
          { key: 'element_' + index, className: className, flex: hasFlex },
          element
        );
      });

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref) {
            return _this2.splitRef = _ref;
          }, className: classes },
        elements
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
  onResponsive: _react.PropTypes.func,
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