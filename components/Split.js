'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.SPLIT; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

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
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          fixed = _props.fixed,
          flex = _props.flex,
          priority = _props.priority,
          separator = _props.separator,
          props = (0, _objectWithoutProperties3.default)(_props, ['children', 'className', 'fixed', 'flex', 'priority', 'separator']);

      delete props.onResponsive;
      delete props.showOnResponsive;
      var responsive = this.state.responsive;

      var classes = (0, _classnames3.default)(CLASS_ROOT, className);

      var boxedChildren = !Array.isArray(children) ? children : children.map(function (child, index) {
        var _classnames;

        if (!child) {
          // skip the empty children but keep original index
          // this avoid the right element to remount
          return undefined;
        }
        var lastChild = index === children.length - 1;
        var hidden = void 0;
        var childFlex = true;
        // When we only have room to show one child, hide the appropriate one
        if ('single' === responsive && ('left' === priority && index > 0 || 'right' === priority && index === 0 && children.length > 1)) {
          hidden = true;
        } else if (children.length > 1 && (flex === 'right' && index === 0 || flex === 'left' && lastChild)) {
          childFlex = false;
        } else {
          childFlex = true;
        }
        var classes = (0, _classnames3.default)(CLASS_ROOT + '__column', (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__column--fixed', fixed), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__column--hidden', hidden), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__column--flex', childFlex), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__column--separator', separator && !lastChild), _classnames));
        // Don't use a Box here because we don't want to constrain the child
        // in a flexbox container.
        return _react2.default.createElement(
          'div',
          { key: index, className: classes },
          child
        );
      });

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ ref: function ref(_ref) {
            return _this2.splitRef = _ref;
          } }, props, { className: classes }),
        boxedChildren
      );
    }
  }]);
  return Split;
}(_react.Component);

Split.displayName = 'Split';
exports.default = Split;


Split.propTypes = {
  children: _react.PropTypes.arrayOf(_react2.default.PropTypes.node).isRequired,
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