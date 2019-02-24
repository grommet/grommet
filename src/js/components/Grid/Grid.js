import React from 'react';
import PropTypes from 'prop-types';
import { StyledGrid } from './StyledGrid';

const Grid = props => {
  const {
    fill, // munged to avoid styled-components putting it in the DOM
    rows, // munged to avoid styled-components putting it in the DOM
    tag,
    as,
    ...rest
  } = props;

  return (
    <StyledGrid
      as={!as && tag ? tag : as}
      fillContainer={fill}
      rowsProp={rows}
      {...rest}
    />
  );
};

let GridDoc;
if (process.env.NODE_ENV !== 'production') {
  GridDoc = require('./doc').doc(Grid); // eslint-disable-line global-require
}
const GridWrapper = GridDoc || Grid;

GridWrapper.available =
  typeof window !== 'undefined' &&
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports('display', 'grid');

export { GridWrapper as Grid };

/* PropTypes for UXPin Merge */

Grid.propTypes = {
  children: PropTypes.node,
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf(["none", "xxsmall", "xsmall", "small", "medium", "large", "xlarge"]),
  align: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  alignContent: PropTypes.oneOf(["start", "center", "end", "between", "around", "stretch"]),
  areas: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      start: PropTypes.arrayOf(PropTypes.number),
      end: PropTypes.arrayOf(PropTypes.number),
    }),
  ),
  columns: PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge", "full", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "flex", "auto", "xsmall", "small", "medium", "large", "xlarge", "full", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4"]),
  fill: PropTypes.oneOf(["horizontal", "vertical"]),
  gap: PropTypes.oneOf(["small", "medium", "large", "none"]),
  justify: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  justifyContent: PropTypes.oneOf(["start", "center", "end", "between", "around", "stretch"]),
  rows: PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge", "full", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "flex", "auto", "xsmall", "small", "medium", "large", "xlarge", "full", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4"]),
  tag: PropTypes.string,
  as: PropTypes.string,
}

/* Export for UXPin Merge */
export default Grid;