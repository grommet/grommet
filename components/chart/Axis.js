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

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CHART_AXIS;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Axis = function (_Component) {
  _inherits(Axis, _Component);

  function Axis(props, context) {
    _classCallCheck(this, Axis);

    var _this = _possibleConstructorReturn(this, (Axis.__proto__ || Object.getPrototypeOf(Axis)).call(this, props, context));

    _this.state = {
      items: _this._buildItems(props)
    };
    return _this;
  }

  _createClass(Axis, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ items: this._buildItems(nextProps) });
    }
  }, {
    key: '_buildItems',
    value: function _buildItems(props) {
      var count = props.count,
          labels = props.labels;

      var items = [];
      var basis = 100.0 / (count - 1);

      var _loop = function _loop(index) {
        var item = void 0;
        if (labels) {
          var labelItem = labels.filter(function (item) {
            return item.index === index;
          })[0];
          if (labelItem) {
            // clone since we're decorating something the user provided
            item = _extends({}, labelItem);
          }
        }
        if (!item) {
          item = { index: index };
        }
        if (0 === index) {
          item.basis = basis / 2;
        } else if (1 === index) {
          item.basis = basis / 2;
        } else {
          item.basis = basis;
        }
        items.push(item);
      };

      for (var index = 0; index < count; index += 1) {
        _loop(index);
      }
      return items;
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          align = _props.align,
          className = _props.className,
          reverse = _props.reverse,
          ticks = _props.ticks,
          vertical = _props.vertical,
          tickAlign = _props.tickAlign,
          props = _objectWithoutProperties(_props, ['a11yTitle', 'align', 'className', 'reverse', 'ticks', 'vertical', 'tickAlign']);

      delete props.count;
      delete props.labels;
      var items = this.state.items;
      var intl = this.context.intl;


      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--reverse', reverse), _defineProperty(_classnames, CLASS_ROOT + '--vertical', vertical), _defineProperty(_classnames, CLASS_ROOT + '--align-' + align, align), _defineProperty(_classnames, CLASS_ROOT + '--ticks', ticks), _defineProperty(_classnames, CLASS_ROOT + '--ticks--' + tickAlign, tickAlign), _classnames), className);

      var elements = items.map(function (item) {
        var _classnames2;

        var classes = (0, _classnames4.default)(CLASS_ROOT + '__slot', (_classnames2 = {}, _defineProperty(_classnames2, CLASS_ROOT + '__slot--placeholder', item.placeholder), _defineProperty(_classnames2, COLOR_INDEX + '-' + item.colorIndex, item.colorIndex), _classnames2));
        var role = item.label && item.label !== '' ? 'row' : undefined;
        var label = item.label ? _react2.default.createElement(
          'span',
          null,
          item.label
        ) : undefined;

        return _react2.default.createElement(
          'div',
          { key: item.value || item.index, className: classes, role: role,
            style: { flexBasis: item.basis + '%' } },
          label
        );
      });

      var axisLabel = a11yTitle || _Intl2.default.getMessage(intl, 'AxisLabel', {
        orientation: vertical ? 'y' : 'x'
      });

      return _react2.default.createElement(
        'div',
        _extends({}, props, { role: 'rowgroup', 'aria-label': axisLabel,
          className: classes }),
        elements
      );
    }
  }]);

  return Axis;
}(_react.Component);

Axis.displayName = 'Axis';
exports.default = Axis;


Axis.contextTypes = {
  intl: _propTypes2.default.object
};

Axis.propTypes = {
  a11yTitle: _propTypes2.default.string,
  align: _propTypes2.default.oneOf(['start', 'end']), // only from Chart
  count: _propTypes2.default.number.isRequired,
  labels: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    colorIndex: _propTypes2.default.string,
    index: _propTypes2.default.number.isRequired,
    label: _propTypes2.default.node.isRequired
  })),
  reverse: _propTypes2.default.bool,
  ticks: _propTypes2.default.bool,
  tickAlign: _propTypes2.default.oneOf(['start', 'end']),
  vertical: _propTypes2.default.bool
};
module.exports = exports['default'];