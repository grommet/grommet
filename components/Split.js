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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Responsive = require('../utils/Responsive');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SPLIT;

var Split = function (_Component) {
  _inherits(Split, _Component);

  function Split(props, context) {
    _classCallCheck(this, Split);

    var _this = _possibleConstructorReturn(this, (Split.__proto__ || Object.getPrototypeOf(Split)).call(this, props, context));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);

    _this.state = { responsive: undefined };
    return _this;
  }

  _createClass(Split, [{
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
        if (splitElement.offsetWidth <= (0, _Responsive.smallSize)() && this.props.showOnResponsive === 'priority') {
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
          props = _objectWithoutProperties(_props, ['children', 'className', 'fixed', 'flex', 'priority', 'separator']);

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
        var classes = (0, _classnames3.default)(CLASS_ROOT + '__column', (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '__column--fixed', fixed), _defineProperty(_classnames, CLASS_ROOT + '__column--hidden', hidden), _defineProperty(_classnames, CLASS_ROOT + '__column--flex', childFlex), _defineProperty(_classnames, CLASS_ROOT + '__column--separator', separator && !lastChild), _classnames));
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
        _extends({ ref: function ref(_ref) {
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
  children: _propTypes2.default.arrayOf(_propTypes2.default.node).isRequired,
  fixed: _propTypes2.default.bool,
  flex: _propTypes2.default.oneOf(['left', 'right', 'both']),
  onResponsive: _propTypes2.default.func,
  priority: _propTypes2.default.oneOf(['left', 'right']),
  separator: _propTypes2.default.bool,
  showOnResponsive: _propTypes2.default.oneOf(['priority', 'both'])
};

Split.defaultProps = {
  fixed: true,
  flex: 'both',
  priority: 'right',
  showOnResponsive: 'priority'
};
module.exports = exports['default'];