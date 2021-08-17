"use strict";

exports.__esModule = true;
exports.Distribution = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Box = require("../Box");

var _Text = require("../Text");

var _propTypes2 = require("./propTypes");

var _excluded = ["basis", "children", "direction", "fill", "gap", "values"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Value = function Value(_ref) {
  var basis = _ref.basis,
      children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    basis: basis,
    flex: "shrink",
    overflow: "hidden"
  }, children);
};

Value.propTypes = {
  basis: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].node.isRequired
};

var Distribution = function Distribution(_ref2) {
  var basis = _ref2.basis,
      children = _ref2.children,
      direction = _ref2.direction,
      fill = _ref2.fill,
      gap = _ref2.gap,
      values = _ref2.values,
      rest = _objectWithoutPropertiesLoose(_ref2, _excluded);

  if (values.length === 1) {
    var value = values[0];
    return /*#__PURE__*/_react["default"].createElement(Value, {
      value: value,
      basis: basis
    }, children(value));
  }

  if (values.length > 1) {
    var reducer = function reducer(accumulator, _ref3) {
      var value = _ref3.value;
      return accumulator + (value || 0);
    };

    var total = values.filter(function (v) {
      return Object.prototype.hasOwnProperty.call(v, 'value');
    }).reduce(reducer, 0); // figure out how many of the values area needed to represent half of the
    // total

    var subTotal = 0;
    var subIndex;
    values.some(function (v, index) {
      subTotal += Object.prototype.hasOwnProperty.call(v, 'value') ? v.value : 0;

      if (subTotal >= total * 0.4) {
        subIndex = index + 1;
        return true;
      }

      return false;
    });

    if (subIndex === values.length) {
      var _value = values[0];
      return /*#__PURE__*/_react["default"].createElement(Value, {
        value: _value,
        basis: basis
      }, children(_value));
    }

    var childBasis;

    if (subTotal === 0) {
      childBasis = ['0px', '0px'];
    } else if (subTotal === total) {
      childBasis = ['full', '0px'];
    } else if (subTotal > total * 0.7) {
      childBasis = ['3/4', '1/4'];
    } else if (subTotal > total * 0.6) {
      childBasis = ['2/3', '1/3'];
    } else {
      childBasis = ['1/2', '1/2'];
    }

    return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
      direction: direction,
      basis: basis,
      flex: basis ? 'shrink' : true,
      overflow: "hidden",
      gap: gap,
      fill: fill
    }, rest), /*#__PURE__*/_react["default"].createElement(Distribution, {
      values: values.slice(0, subIndex),
      basis: childBasis[0],
      direction: direction === 'row' ? 'column' : 'row',
      gap: gap
    }, children), /*#__PURE__*/_react["default"].createElement(Distribution, {
      values: values.slice(subIndex),
      basis: childBasis[1],
      direction: direction === 'row' ? 'column' : 'row',
      gap: gap
    }, children));
  }

  return null;
};

exports.Distribution = Distribution;
Distribution.defaultProps = {
  basis: undefined,
  children: function children(value) {
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      fill: true,
      border: true
    }, /*#__PURE__*/_react["default"].createElement(_Text.Text, null, value.value));
  },
  direction: 'row',
  gap: 'xsmall',
  values: []
};
Distribution.propTypes = _propTypes2.DistributionPropTypes;