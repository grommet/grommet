function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Text } from '../Text';

var Value = function Value(_ref) {
  var basis = _ref.basis,
      children = _ref.children;
  return React.createElement(Box, {
    basis: basis,
    flex: "shrink",
    overflow: "hidden"
  }, children);
};

Value.propTypes = {
  basis: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

var Distribution =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Distribution, _Component);

  function Distribution() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Distribution.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        basis = _this$props.basis,
        children = _this$props.children,
        direction = _this$props.direction,
        fill = _this$props.fill,
        gap = _this$props.gap,
        values = _this$props.values,
        rest = _objectWithoutPropertiesLoose(_this$props, ["basis", "children", "direction", "fill", "gap", "values"]);

    if (values.length === 1) {
      var value = values[0];
      return React.createElement(Value, {
        value: value,
        basis: basis
      }, children(value));
    }

    if (values.length > 1) {
      // calculate total
      var total = 0;
      values.forEach(function (v) {
        total += v.value;
      }); // figure out how many of the values area needed to represent half of the total

      var subTotal = 0;
      var subIndex;
      values.some(function (v, index) {
        subTotal += v.value;

        if (subTotal >= total * 0.4) {
          subIndex = index + 1;
          return true;
        }

        return false;
      });

      if (subIndex === values.length) {
        var _value = values[0];
        return React.createElement(Value, {
          value: _value,
          basis: basis
        }, children(_value));
      }

      var childBasis;

      if (subTotal > total * 0.7) {
        childBasis = ['3/4', '1/4'];
      } else if (subTotal > total * 0.6) {
        childBasis = ['2/3', '1/3'];
      } else {
        childBasis = ['1/2', '1/2'];
      }

      return React.createElement(Box, _extends({
        direction: direction,
        basis: basis,
        flex: basis ? 'shrink' : true,
        overflow: "hidden",
        gap: gap,
        fill: fill
      }, rest), React.createElement(Distribution, {
        values: values.slice(0, subIndex),
        basis: childBasis[0],
        direction: direction === 'row' ? 'column' : 'row',
        gap: gap
      }, children), React.createElement(Distribution, {
        values: values.slice(subIndex),
        basis: childBasis[1],
        direction: direction === 'row' ? 'column' : 'row',
        gap: gap
      }, children));
    }

    return null;
  };

  return Distribution;
}(Component);

_defineProperty(Distribution, "defaultProps", {
  basis: undefined,
  children: function children(value) {
    return React.createElement(Box, {
      fill: true,
      border: true
    }, React.createElement(Text, null, value.value));
  },
  direction: 'row',
  gap: 'xsmall',
  values: []
});

var DistributionDoc;

if (process.env.NODE_ENV !== 'production') {
  DistributionDoc = require('./doc').doc(Distribution); // eslint-disable-line global-require
}

var DistributionWrapper = DistributionDoc || Distribution;
export { DistributionWrapper as Distribution };