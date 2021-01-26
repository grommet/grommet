function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Text } from '../Text';

var Value = function Value(_ref) {
  var basis = _ref.basis,
      children = _ref.children;
  return /*#__PURE__*/React.createElement(Box, {
    basis: basis,
    flex: "shrink",
    overflow: "hidden"
  }, children);
};

Value.propTypes = {
  basis: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

var Distribution = function Distribution(_ref2) {
  var basis = _ref2.basis,
      children = _ref2.children,
      direction = _ref2.direction,
      fill = _ref2.fill,
      gap = _ref2.gap,
      values = _ref2.values,
      rest = _objectWithoutPropertiesLoose(_ref2, ["basis", "children", "direction", "fill", "gap", "values"]);

  if (values.length === 1) {
    var value = values[0];
    return /*#__PURE__*/React.createElement(Value, {
      value: value,
      basis: basis
    }, children(value));
  }

  if (values.length > 1) {
    var reducer = function reducer(accumulator, _ref3) {
      var value = _ref3.value;
      return accumulator + (value || 0);
    };

    var total = values.reduce(reducer, 0); // figure out how many of the values area needed to represent half of the
    // total

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
      return /*#__PURE__*/React.createElement(Value, {
        value: _value,
        basis: basis
      }, children(_value));
    }

    var childBasis;

    if (subTotal === total) {
      childBasis = ['full', '0px'];
    } else if (subTotal > total * 0.7) {
      childBasis = ['3/4', '1/4'];
    } else if (subTotal > total * 0.6) {
      childBasis = ['2/3', '1/3'];
    } else {
      childBasis = ['1/2', '1/2'];
    }

    return /*#__PURE__*/React.createElement(Box, _extends({
      direction: direction,
      basis: basis,
      flex: basis ? 'shrink' : true,
      overflow: "hidden",
      gap: gap,
      fill: fill
    }, rest), /*#__PURE__*/React.createElement(Distribution, {
      values: values.slice(0, subIndex),
      basis: childBasis[0],
      direction: direction === 'row' ? 'column' : 'row',
      gap: gap
    }, children), /*#__PURE__*/React.createElement(Distribution, {
      values: values.slice(subIndex),
      basis: childBasis[1],
      direction: direction === 'row' ? 'column' : 'row',
      gap: gap
    }, children));
  }

  return null;
};

Distribution.defaultProps = {
  basis: undefined,
  children: function children(value) {
    return /*#__PURE__*/React.createElement(Box, {
      fill: true,
      border: true
    }, /*#__PURE__*/React.createElement(Text, null, value.value));
  },
  direction: 'row',
  gap: 'xsmall',
  values: []
};
var DistributionDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DistributionDoc = require('./doc').doc(Distribution);
}

var DistributionWrapper = DistributionDoc || Distribution;
export { DistributionWrapper as Distribution };