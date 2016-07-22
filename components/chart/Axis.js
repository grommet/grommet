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

var CLASS_ROOT = _CSSClassnames2.default.CHART_AXIS; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Axis = function (_Component) {
  (0, _inherits3.default)(Axis, _Component);

  function Axis(props) {
    (0, _classCallCheck3.default)(this, Axis);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Axis).call(this, props));

    _this.state = {
      size: { width: 0, height: 0 },
      items: _this._buildItems(props)
    };
    _this._size = new _utils.trackSize(_this.props, _this._onSize.bind(_this));
    return _this;
  }

  (0, _createClass3.default)(Axis, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._size.start(this.refs.axis);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ items: this._buildItems(nextProps) });
      this._size.reset(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._size.stop();
    }
  }, {
    key: '_onSize',
    value: function _onSize(size) {
      this.setState({ size: size });
    }
  }, {
    key: '_buildItems',
    value: function _buildItems(props) {
      var count = props.count;
      var values = props.values;
      var min = props.min;
      var max = props.max;

      var items = [];
      if (count) {
        var delta = (max - min) / (count - 1 || 1);

        var _loop = function _loop(index) {
          var value = delta * index;
          var item = void 0;
          if (values) {
            item = values.filter(function (item) {
              return item.value === value;
            })[0];
          }
          if (!item) {
            item = { value: value };
          }
          if (0 === index) {
            item.value = delta / 2;
            item.flip = true;
          }
          items.push(item);
        };

        for (var index = 0; index <= count; index += 1) {
          _loop(index);
        }
      } else if (values && values.length > 0) {
        if (values[0].value < min + (max - min) / 2) {
          if (values[0].value > min) {
            items.push({ value: values[0].value, placeholder: true });
          }
          if (values.length > 1) {
            // take up half of the next item
            items.push((0, _extends3.default)({}, values[0], {
              value: values[0].value + (values[1].value - values[0].value) / 2,
              flip: true
            }));
            items = items.concat(values.slice(1));
          } else {
            items.push((0, _extends3.default)({}, values[0], { value: max, flip: true }));
          }
        } else {
          items = values.slice(0);
        }
        if (items[items.length - 1].value < max) {
          items.push({ value: max, placeholder: true });
        }
      }
      return items;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var vertical = _props.vertical;
      var reverse = _props.reverse;
      var align = _props.align;
      var min = _props.min;
      var max = _props.max;
      var highlight = _props.highlight;
      var ticks = _props.ticks;
      var _state = this.state;
      var _state$size = _state.size;
      var height = _state$size.height;
      var width = _state$size.width;
      var items = _state.items;


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

      var style = (0, _extends3.default)({}, this.props.style);
      if (vertical && height) {
        style.height = height + 'px';
      }
      if (!vertical && width) {
        style.width = width + 'px';
      }

      var graphItems = items.map(function (item) {
        return (0, _extends3.default)({}, item, {
          graphValue: (0, _utils.graphValue)(item.value, min, max, vertical ? height : width)
        });
      });

      var priorItem = void 0;
      var basisItems = graphItems.map(function (item, index) {

        var classes = [CLASS_ROOT + '__slot'];
        if (index === highlight) {
          classes.push(CLASS_ROOT + '__slot--highlight');
        }
        if (item.flip) {
          classes.push(CLASS_ROOT + '__slot--flip');
        }
        if (item.placeholder) {
          classes.push(CLASS_ROOT + '__slot--placeholder');
        }
        if (item.colorIndex) {
          classes.push(COLOR_INDEX + '-' + item.colorIndex);
        }
        var label = item.label;
        if (typeof contents === 'string' || typeof contents === 'number') {
          label = _react2.default.createElement(
            'span',
            null,
            label
          );
        }

        var delta = item.graphValue - (priorItem ? priorItem.graphValue : 0);
        var basis = delta / ((vertical ? height : width) || 1) * 100;
        var style = { flexBasis: basis + '%' };
        priorItem = item;

        return _react2.default.createElement(
          'div',
          { key: item.value, className: classes.join(' '), style: style },
          label
        );
      });

      return _react2.default.createElement(
        'div',
        { ref: 'axis', className: classes.join(' '), style: style },
        basisItems
      );
    }
  }]);
  return Axis;
}(_react.Component);

Axis.displayName = 'Axis';
exports.default = Axis;
;

Axis.propTypes = {
  align: _react.PropTypes.oneOf(['start', 'end']),
  count: _react.PropTypes.number,
  height: _react.PropTypes.number,
  highlight: _react.PropTypes.number,
  max: _react.PropTypes.number,
  min: _react.PropTypes.number,
  reverse: _react.PropTypes.bool,
  ticks: _react.PropTypes.bool,
  values: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    colorIndex: _react.PropTypes.string,
    label: _react.PropTypes.node,
    value: _react.PropTypes.number.isRequired
  })),
  vertical: _react.PropTypes.bool,
  width: _react.PropTypes.number
};

Axis.defaultProps = {
  align: 'start',
  max: 100,
  min: 0
};
module.exports = exports['default'];