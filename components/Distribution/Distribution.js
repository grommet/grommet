"use strict";

exports.__esModule = true;
exports.Distribution = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Box = require("../Box");
var _Text = require("../Text");
var _propTypes2 = require("./propTypes");
var _excluded = ["basis", "children", "direction", "fill", "gap", "values"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
var defaultChildrenPropValue = function defaultChildrenPropValue(value) {
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    fill: true,
    border: true
  }, /*#__PURE__*/_react["default"].createElement(_Text.Text, null, value.value));
};
var defaultValues = [];
var _Distribution = exports.Distribution = function Distribution(_ref2) {
  var basis = _ref2.basis,
    _ref2$children = _ref2.children,
    children = _ref2$children === void 0 ? defaultChildrenPropValue : _ref2$children,
    _ref2$direction = _ref2.direction,
    direction = _ref2$direction === void 0 ? 'row' : _ref2$direction,
    fill = _ref2.fill,
    _ref2$gap = _ref2.gap,
    gap = _ref2$gap === void 0 ? 'xsmall' : _ref2$gap,
    _ref2$values = _ref2.values,
    values = _ref2$values === void 0 ? defaultValues : _ref2$values,
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
    }).reduce(reducer, 0);

    // figure out how many of the values area needed to represent half of the
    // total
    var subTotal = 0;
    var subIndex;
    values.some(function (v, index) {
      subTotal += Object.prototype.hasOwnProperty.call(v, 'value') && v.value || 0;
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
    }, rest), /*#__PURE__*/_react["default"].createElement(_Distribution, {
      values: values.slice(0, subIndex),
      basis: childBasis[0],
      direction: direction === 'row' ? 'column' : 'row',
      gap: gap
    }, children), /*#__PURE__*/_react["default"].createElement(_Distribution, {
      values: values.slice(subIndex),
      basis: childBasis[1],
      direction: direction === 'row' ? 'column' : 'row',
      gap: gap
    }, children));
  }
  return null;
};
_Distribution.propTypes = _propTypes2.DistributionPropTypes;