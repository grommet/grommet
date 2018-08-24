import React, { Component } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';

import { withTheme } from '../hocs';

import doc from './doc';

const Value = ({ basis, children }) => (
  <Box basis={basis} flex='shrink' overflow='hidden'>
    {children}
  </Box>
);

class Distribution extends Component {
  static defaultProps = {
    direction: 'row',
    gap: 'xsmall',
  }

  render() {
    const { basis, children, direction, gap, theme, values, ...rest } = this.props;
    if (values.length === 1) {
      const value = values[0];
      return <Value value={value} basis={basis}>{children(value)}</Value>;
    } else if (values.length > 1) {
      // calculate total
      let total = 0;
      values.forEach((v) => { total += v.value; });

      // figure out how many of the values area needed to represent half of the total
      let subTotal = 0;
      let subIndex;
      values.some((v, index) => {
        subTotal += v.value;
        if (subTotal >= (total * 0.4)) {
          subIndex = index + 1;
          return true;
        }
        return false;
      });

      if (subIndex === values.length) {
        const value = values[0];
        return <Value value={value} basis={basis}>{children(value)}</Value>;
      }

      let childBasis;
      if (subTotal > (total * 0.7)) {
        childBasis = ['3/4', '1/4'];
      } else if (subTotal > (total * 0.6)) {
        childBasis = ['2/3', '1/3'];
      } else {
        childBasis = ['1/2', '1/2'];
      }

      return (
        <Box
          direction={direction}
          basis={basis}
          flex={basis ? 'shrink' : true}
          overflow='hidden'
          gap={gap}
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
  }
}

let DistributionWrapper = Distribution;
if (process.env.NODE_ENV !== 'production') {
  DistributionWrapper = doc(Distribution);
}

export default compose(
  withTheme,
)(DistributionWrapper);
