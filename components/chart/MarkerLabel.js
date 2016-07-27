'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _utils = require('./utils');

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CHART_MARKER_LABEL; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var MarkerLabel = function (_Component) {
  (0, _inherits3.default)(MarkerLabel, _Component);

  function MarkerLabel(props) {
    (0, _classCallCheck3.default)(this, MarkerLabel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(MarkerLabel).call(this, props));

    _this.state = {
      size: { width: 0, height: 0 },
      valueBasis: _this._valueBasis(props)
    };
    _this._size = new _utils.trackSize(_this.props, _this._onSize.bind(_this));
    return _this;
  }

  (0, _createClass3.default)(MarkerLabel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._size.start(this.refs.markerLabel);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ valueBasis: this._valueBasis(nextProps) });
      this._size.reset(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._size.stop();
    }
  }, {
    key: '_valueBasis',
    value: function _valueBasis(props) {
      var count = props.count;
      var index = props.index;
      var max = props.max;
      var min = props.min;
      var value = props.value;

      var valueBasis = void 0;
      if (count) {
        valueBasis = index / (count - 1) * 100.0;
      } else {
        valueBasis = (value - min) / (max - min) * 100.0;
      }
      return valueBasis;
    }
  }, {
    key: '_onSize',
    value: function _onSize(size) {
      this.setState({ size: size });
    }
  }, {
    key: '_renderPlaceholder',
    value: function _renderPlaceholder(basis) {
      var classes = [CLASS_ROOT + '__slot', CLASS_ROOT + '__slot--placeholder'];
      return _react2.default.createElement('div', { key: basis, className: classes.join(' '), style: { flexBasis: basis + '%' } });
    }
  }, {
    key: '_renderLabel',
    value: function _renderLabel(basis, flip) {
      var colorIndex = this.props.colorIndex;
      var label = this.props.label;

      var classes = [CLASS_ROOT + '__slot'];
      if (flip) {
        classes.push(CLASS_ROOT + '__slot--flip');
      }
      if (colorIndex) {
        classes.push(COLOR_INDEX + '-' + colorIndex);
      }
      if (typeof label === 'string' || typeof label === 'number') {
        label = _react2.default.createElement(
          'span',
          null,
          label
        );
      }
      return _react2.default.createElement(
        'div',
        { key: basis, className: classes.join(' '), style: { flexBasis: basis + '%' } },
        label
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var align = _props.align;
      var reverse = _props.reverse;
      var vertical = _props.vertical;
      var _state = this.state;
      var _state$size = _state.size;
      var height = _state$size.height;
      var width = _state$size.width;
      var valueBasis = _state.valueBasis;


      var classes = [CLASS_ROOT];
      if (reverse) {
        classes.push(CLASS_ROOT + '--reverse');
      }
      if (vertical) {
        classes.push(CLASS_ROOT + '--vertical');
      }
      if (align) {
        classes.push(CLASS_ROOT + '--align-' + align);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var style = (0, _extends3.default)({}, this.props.style);
      if (vertical && height) {
        style.height = height + 'px';
      }
      if (!vertical && width) {
        style.width = width + 'px';
      }

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
        { ref: 'markerLabel', className: classes.join(' '), style: style },
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
  height: _react.PropTypes.number, // only from Chart
  index: _react.PropTypes.number,
  label: _react.PropTypes.node.isRequired,
  max: _react.PropTypes.number,
  min: _react.PropTypes.number,
  reverse: _react.PropTypes.bool,
  value: _react.PropTypes.number,
  vertical: _react.PropTypes.bool,
  width: _react.PropTypes.number // only from Chart
};

MarkerLabel.defaultProps = {
  max: 100,
  min: 0
};
module.exports = exports['default'];