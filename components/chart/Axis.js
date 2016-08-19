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

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CHART_AXIS; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Axis = function (_Component) {
  (0, _inherits3.default)(Axis, _Component);

  function Axis(props, context) {
    (0, _classCallCheck3.default)(this, Axis);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Axis).call(this, props, context));

    _this.state = {
      items: _this._buildItems(props)
    };
    return _this;
  }

  (0, _createClass3.default)(Axis, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ items: this._buildItems(nextProps) });
    }
  }, {
    key: '_buildItems',
    value: function _buildItems(props) {
      var count = props.count;
      var labels = props.labels;

      var items = [];
      var basis = 100.0 / (count - 1);

      var _loop = function _loop(index) {
        var item = void 0;
        if (labels) {
          item = labels.filter(function (item) {
            return item.index === index;
          })[0];
        }
        if (!item) {
          item = { index: index };
        }
        if (0 === index) {
          item.basis = basis / 2;
          item.flip = true;
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
      var _props = this.props;
      var a11yTitle = _props.a11yTitle;
      var align = _props.align;
      var reverse = _props.reverse;
      var ticks = _props.ticks;
      var vertical = _props.vertical;
      var items = this.state.items;
      var intl = this.context.intl;


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
      if (ticks) {
        classes.push(CLASS_ROOT + '--ticks');
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var elements = items.map(function (item) {

        var classes = [CLASS_ROOT + '__slot'];
        if (item.flip) {
          classes.push(CLASS_ROOT + '__slot--flip');
        }
        if (item.placeholder) {
          classes.push(CLASS_ROOT + '__slot--placeholder');
        }
        if (item.colorIndex) {
          classes.push(COLOR_INDEX + '-' + item.colorIndex);
        }
        var role = item.label && item.label !== '' ? 'row' : undefined;
        return _react2.default.createElement(
          'div',
          { key: item.value || item.index,
            className: classes.join(' '), role: role,
            style: { flexBasis: item.basis + '%' } },
          item.label
        );
      });

      var axisLabel = a11yTitle || _Intl2.default.getMessage(intl, 'AxisLabel', {
        orientation: vertical ? 'y' : 'x'
      });

      return _react2.default.createElement(
        'div',
        { ref: 'axis', id: this.props.id, role: 'rowgroup', 'aria-label': axisLabel,
          className: classes.join(' '), style: this.props.style },
        elements
      );
    }
  }]);
  return Axis;
}(_react.Component);

Axis.displayName = 'Axis';
exports.default = Axis;
;

Axis.contextTypes = {
  intl: _react.PropTypes.object
};

Axis.propTypes = {
  a11yTitle: _react.PropTypes.string,
  align: _react.PropTypes.oneOf(['start', 'end']), // only from Chart
  count: _react.PropTypes.number.isRequired,
  labels: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    colorIndex: _react.PropTypes.string,
    index: _react.PropTypes.number.isRequired,
    label: _react.PropTypes.node.isRequired
  })),
  reverse: _react.PropTypes.bool,
  ticks: _react.PropTypes.bool,
  vertical: _react.PropTypes.bool
};
module.exports = exports['default'];