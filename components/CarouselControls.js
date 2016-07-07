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

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CAROUSEL_CONTROLS; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CarouselControls = function (_Component) {
  (0, _inherits3.default)(CarouselControls, _Component);

  function CarouselControls() {
    (0, _classCallCheck3.default)(this, CarouselControls);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CarouselControls).call(this));

    _this._onClick = _this._onClick.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(CarouselControls, [{
    key: '_onClick',
    value: function _onClick(index) {
      if (this.props.onChange) {
        this.props.onChange(index);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.direction) {
        classes.push(CLASS_ROOT + "--" + this.props.direction);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var controls = [];
      for (var index = 1; index <= this.props.count; index++) {
        var controlClasses = [CLASS_ROOT + "__control"];
        if (index === this.props.selected) {
          controlClasses.push(CLASS_ROOT + "__control--active");
        }
        controls.push(_react2.default.createElement(
          'svg',
          { key: index, className: controlClasses.join(' '), version: '1.1',
            viewBox: '0 0 24 24', width: '24px', height: '24px',
            onClick: this._onClick.bind(this, index) },
          _react2.default.createElement('circle', { cx: 12, cy: 12, r: 6 })
        ));
      }

      return _react2.default.createElement(
        _Box2.default,
        { className: classes.join(' '), direction: this.props.direction,
          justify: 'center', responsive: false },
        controls
      );
    }
  }]);
  return CarouselControls;
}(_react.Component);

CarouselControls.displayName = 'CarouselControls';
exports.default = CarouselControls;


CarouselControls.propTypes = {
  count: _react.PropTypes.number.isRequired,
  direction: _react.PropTypes.oneOf(['row', 'column']),
  onChange: _react.PropTypes.func,
  selected: _react.PropTypes.number
};
module.exports = exports['default'];