// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var CLASS_ROOT = "carousel-controls";

var CarouselControls = (function (_Component) {
  _inherits(CarouselControls, _Component);

  function CarouselControls() {
    _classCallCheck(this, CarouselControls);

    _get(Object.getPrototypeOf(CarouselControls.prototype), 'constructor', this).call(this);

    this._onClick = this._onClick.bind(this);
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
        controls.push(_react2['default'].createElement(
          'svg',
          { key: index, className: controlClasses.join(' '), version: '1.1',
            viewBox: '0 0 24 24', width: '24px', height: '24px',
            onClick: this._onClick.bind(this, index) },
          _react2['default'].createElement('circle', { cx: 12, cy: 12, r: 6 })
        ));
      }

      return _react2['default'].createElement(
        _Box2['default'],
        { className: classes.join(' '), direction: this.props.direction,
          justify: 'center', responsive: false },
        controls
      );
    }
  }]);

  return CarouselControls;
})(_react.Component);

exports['default'] = CarouselControls;

CarouselControls.propTypes = {
  count: _react.PropTypes.number.isRequired,
  direction: _react.PropTypes.oneOf(['row', 'column']),
  onChange: _react.PropTypes.func,
  selected: _react.PropTypes.number
};
module.exports = exports['default'];