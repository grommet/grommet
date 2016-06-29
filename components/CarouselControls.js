'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CAROUSEL_CONTROLS;

var CarouselControls = function (_Component) {
  _inherits(CarouselControls, _Component);

  function CarouselControls() {
    _classCallCheck(this, CarouselControls);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CarouselControls).call(this));

    _this._onClick = _this._onClick.bind(_this);
    return _this;
  }

  _createClass(CarouselControls, [{
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