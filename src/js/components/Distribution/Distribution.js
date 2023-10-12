import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '../Box';
import { Text } from '../Text';
import { DistributionPropTypes } from './propTypes';

const Value = ({ basis, children }) => (
  <Box basis={basis} flex="shrink" overflow="hidden">
    {children}
  </Box>
);

Value.propTypes = {
  basis: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Distribution = ({
  basis,
  children,
  direction,
  fill,
  gap,
  values,
  ...rest
}) => {
  if (values.length === 1) {
    const value = values[0];
    return (
      <Value value={value} basis={basis}>
        {children(value)}
      </Value>
    );
  }
  if (values.length > 1) {
    const reducer = (accumulator, { value }) => accumulator + (value || 0);
    const total = values
      .filter((v) => Object.prototype.hasOwnProperty.call(v, 'value'))
      .reduce(reducer, 0);

    // figure out how many of the values area needed to represent half of the
    // total
    let subTotal = 0;
    let subIndex;
    values.some((v, index) => {
      subTotal +=
        (Object.prototype.hasOwnProperty.call(v, 'value') && v.value) || 0;
      if (subTotal >= total * 0.4) {
        subIndex = index + 1;
        return true;
      }
      return false;
    });

    if (subIndex === values.length) {
      const value = values[0];
      return (
        <Value value={value} basis={basis}>
          {children(value)}
        </Value>
      );
    }

    let childBasis;
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

    return (
      <Box
        direction={direction}
        basis={basis}
        flex={basis ? 'shrink' : true}
        overflow="hidden"
        gap={gap}
        fill={fill}
        {...rest}
      >
        <Distribution
          values={values.slice(0, subIndex)}
          basis={childBasis[0]}
          direction={direction === 'row' ? 'column' : 'row'}
          gap={gap}
        >
          {children}
        </Distribution>
        <Distribution
          values={values.slice(subIndex)}
          basis={childBasis[1]}
          direction={direction === 'row' ? 'column' : 'row'}
          gap={gap}
        >
          {children}
        </Distribution>
      </Box>
    );
  }
  return null;
};

Distribution.defaultProps = {
  basis: undefined,
  children: (value) => (
    <Box fill border>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      <Text>{value.value}</Text>
    </Box>
  ),
  direction: 'row',
  gap: 'xsmall',
  values: [],
};

Distribution.propTypes = DistributionPropTypes;

export { Distribution };
