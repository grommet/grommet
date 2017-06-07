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

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Props = require('../../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Announcer = require('../../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CHART_MARKER_LABEL;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var MarkerLabel = function (_Component) {
  _inherits(MarkerLabel, _Component);

  function MarkerLabel(props, context) {
    _classCallCheck(this, MarkerLabel);

    var _this = _possibleConstructorReturn(this, (MarkerLabel.__proto__ || Object.getPrototypeOf(MarkerLabel)).call(this, props, context));

    _this.state = {
      valueBasis: _this._valueBasis(props)
    };
    return _this;
  }

  _createClass(MarkerLabel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextValueBasis = this._valueBasis(nextProps);
      if (nextValueBasis !== this.state.valueBasis) {
        this.setState({
          valueBasis: nextValueBasis
        }, function () {
          if (typeof nextProps.label === 'string' || typeof nextProps.label === 'number') {
            (0, _Announcer.announce)(nextProps.label);
          }
        });
      }
    }
  }, {
    key: '_valueBasis',
    value: function _valueBasis(props) {
      var count = props.count,
          index = props.index,
          max = props.max,
          min = props.min,
          value = props.value;

      var valueBasis = void 0;
      if (count) {
        valueBasis = index / Math.max(1, count - 1) * 100.0;
      } else {
        valueBasis = (value - min) / Math.max(1, max - min) * 100.0;
      }
      return valueBasis;
    }
  }, {
    key: '_renderPlaceholder',
    value: function _renderPlaceholder(basis) {
      var classes = (0, _classnames4.default)(CLASS_ROOT + '__slot', CLASS_ROOT + '__slot--placeholder');
      return _react2.default.createElement('div', { key: 'placeholder', className: classes, 'aria-hidden': 'true',
        style: { flexBasis: basis + '%' } });
    }
  }, {
    key: '_renderLabel',
    value: function _renderLabel(basis, flip) {
      var _classnames;

      var colorIndex = this.props.colorIndex;
      var label = this.props.label;

      var classes = (0, _classnames4.default)(CLASS_ROOT + '__slot', (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '__slot--flip', flip), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));
      if (typeof label === 'string' || typeof label === 'number') {
        label = _react2.default.createElement(
          'span',
          null,
          label
        );
      } else if (label.propTypes && label.propTypes.announce) {
        // added for a11y to announce changes in the values
        label = _react2.default.cloneElement(label, {
          announce: true
        });
      }
      return _react2.default.createElement(
        'div',
        { key: 'label', className: classes,
          style: { flexBasis: basis + '%' } },
        label
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames2;

      var _props = this.props,
          align = _props.align,
          className = _props.className,
          reverse = _props.reverse,
          vertical = _props.vertical;
      var valueBasis = this.state.valueBasis;

      var restProps = _Props2.default.omit(this.props, Object.keys(MarkerLabel.propTypes));

      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames2 = {}, _defineProperty(_classnames2, CLASS_ROOT + '--reverse', reverse), _defineProperty(_classnames2, CLASS_ROOT + '--vertical', vertical), _defineProperty(_classnames2, CLASS_ROOT + '--align-' + align, align), _classnames2), className);

      var firstItem = void 0,
          secondItem = void 0;
      if (valueBasis < 50) {
        // marker value in first half, align it after
        firstItem = this._renderPlaceholder(valueBasis);
        secondItem = this._renderLabel(100.0 - valueBasis, true);
      } else {
        // marker value in second half, align it before
        firstItem = this._renderLabel(valueBasis);
        secondItem = this._renderPlaceholder(100.0 - valueBasis);
      }

      return _react2.default.createElement(
        'div',
        _extends({}, restProps, { className: classes }),
        firstItem,
        secondItem
      );
    }
  }]);

  return MarkerLabel;
}(_react.Component);

// Need either count and index or value, min, and max


MarkerLabel.displayName = 'MarkerLabel';
exports.default = MarkerLabel;
MarkerLabel.propTypes = {
  align: _propTypes2.default.oneOf(['start', 'end']), // only from Chart
  colorIndex: _propTypes2.default.string,
  count: _propTypes2.default.number,
  index: _propTypes2.default.number,
  label: _propTypes2.default.node,
  max: _propTypes2.default.number,
  min: _propTypes2.default.number,
  reverse: _propTypes2.default.bool,
  value: _propTypes2.default.number,
  vertical: _propTypes2.default.bool
};

MarkerLabel.defaultProps = {
  max: 100,
  min: 0
};
module.exports = exports['default'];