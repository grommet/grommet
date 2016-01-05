'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormattedMessage = require('./FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "legend";

var Legend = (function (_Component) {
  _inherits(Legend, _Component);

  function Legend(props) {
    _classCallCheck(this, Legend);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Legend).call(this, props));

    _this._onActive = _this._onActive.bind(_this);

    _this.state = { activeIndex: _this.props.activeIndex };
    return _this;
  }

  _createClass(Legend, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState({ activeIndex: newProps.activeIndex });
    }
  }, {
    key: '_onActive',
    value: function _onActive(index) {
      this.setState({ activeIndex: index });
      if (this.props.onActive) {
        this.props.onActive(index);
      }
    }
  }, {
    key: '_itemColorIndex',
    value: function _itemColorIndex(item, index) {
      return item.colorIndex || 'graph-' + (index + 1);
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.series.length === 1) {
        classes.push(CLASS_ROOT + "--single");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var totalValue = 0;
      var items = this.props.series.map(function (item, index) {
        var legendClasses = [CLASS_ROOT + "__item"];
        if (index === this.state.activeIndex) {
          legendClasses.push(CLASS_ROOT + "__item--active");
        }
        var colorIndex = this._itemColorIndex(item, index);
        totalValue += item.value;

        var valueClasses = [CLASS_ROOT + "__item-value"];
        if (1 === this.props.series.length) {
          valueClasses.push("large-number-font");
        }

        var swatch;
        if (item.hasOwnProperty('colorIndex')) {
          swatch = _react2.default.createElement(
            'svg',
            { className: CLASS_ROOT + "__item-swatch color-index-" + colorIndex,
              viewBox: '0 0 12 12' },
            _react2.default.createElement('path', { className: item.className, d: 'M 5 0 l 0 12' })
          );
        }

        var label;
        if (item.hasOwnProperty('label')) {
          label = _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + "__item-label" },
            item.label
          );
        }

        var value;
        if (item.hasOwnProperty('value')) {
          value = _react2.default.createElement(
            'span',
            { className: valueClasses.join(' ') },
            item.value,
            _react2.default.createElement(
              'span',
              { className: CLASS_ROOT + "__item-units" },
              this.props.units
            )
          );
        }

        return _react2.default.createElement(
          'li',
          { key: item.label || index, className: legendClasses.join(' '),
            onClick: item.onClick,
            onMouseOver: this._onActive.bind(this, index),
            onMouseOut: this._onActive.bind(this, null) },
          swatch,
          label,
          value
        );
      }, this);

      var total = null;
      if (this.props.total && this.props.series.length > 1) {
        total = _react2.default.createElement(
          'li',
          { className: CLASS_ROOT + "__total" },
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + "__total-label" },
            _react2.default.createElement(_FormattedMessage2.default, { id: 'Total', defaultMessage: 'Total' })
          ),
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + "__total-value" },
            totalValue,
            _react2.default.createElement(
              'span',
              { className: CLASS_ROOT + "__total-units" },
              this.props.units
            )
          )
        );
      }

      return _react2.default.createElement(
        'ol',
        { className: classes.join(' '), role: 'presentation' },
        items.reverse(),
        total
      );
    }
  }]);

  return Legend;
})(_react.Component);

exports.default = Legend;

Legend.propTypes = {
  activeIndex: _react.PropTypes.number,
  onActive: _react.PropTypes.func,
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.number,
    units: _react.PropTypes.string,
    colorIndex: _react.PropTypes.oneOfType([_react.PropTypes.number, // 1-6
    _react.PropTypes.string // status
    ]),
    onClick: _react.PropTypes.func
  })).isRequired,
  total: _react.PropTypes.bool,
  units: _react.PropTypes.string,
  value: _react.PropTypes.number
};