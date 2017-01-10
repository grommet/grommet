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

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Props = require('../../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Announcer = require('../../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CHART_MARKER_LABEL; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var MarkerLabel = function (_Component) {
  (0, _inherits3.default)(MarkerLabel, _Component);

  function MarkerLabel(props, context) {
    (0, _classCallCheck3.default)(this, MarkerLabel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MarkerLabel.__proto__ || (0, _getPrototypeOf2.default)(MarkerLabel)).call(this, props, context));

    _this.state = {
      valueBasis: _this._valueBasis(props)
    };
    return _this;
  }

  (0, _createClass3.default)(MarkerLabel, [{
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

      var classes = (0, _classnames4.default)(CLASS_ROOT + '__slot', (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__slot--flip', flip), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));
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

      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(MarkerLabel.propTypes));

      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames2 = {}, (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '--reverse', reverse), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '--vertical', vertical), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '--align-' + align, align), _classnames2), className);

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
        (0, _extends3.default)({}, restProps, { className: classes }),
        firstItem,
        secondItem
      );
    }
  }]);
  return MarkerLabel;
}(_react.Component);

MarkerLabel.displayName = 'MarkerLabel';
exports.default = MarkerLabel;
;

// Need either count and index or value, min, and max
MarkerLabel.propTypes = {
  align: _react.PropTypes.oneOf(['start', 'end']), // only from Chart
  colorIndex: _react.PropTypes.string,
  count: _react.PropTypes.number,
  index: _react.PropTypes.number,
  label: _react.PropTypes.node,
  max: _react.PropTypes.number,
  min: _react.PropTypes.number,
  reverse: _react.PropTypes.bool,
  value: _react.PropTypes.number,
  vertical: _react.PropTypes.bool
};

MarkerLabel.defaultProps = {
  max: 100,
  min: 0
};
module.exports = exports['default'];