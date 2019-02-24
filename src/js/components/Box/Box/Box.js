import React from 'react';
import PropTypes from 'prop-types';
import { Box as BoxM } from '../Box';

function Box(props) {
  return <BoxM {...props} />
}

/* PropTypes for UXPin Merge */
Box.propTypes = {
  children: PropTypes.node,
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf(["none", "xxsmall", "xsmall", "small", "medium", "large", "xlarge"]),
  align: PropTypes.oneOf(["start", "center", "end", "baseline", "stretch"]),
  alignContent: PropTypes.oneOf(["start", "center", "end", "between", "around", "stretch"]),
  animation: PropTypes.oneOf(["fadeIn", "fadeOut", "jiggle", "pulse", "slideUp", "slideDown", "slideLeft", "slideRight", "zoomIn", "zoomOut"]),
  background: PropTypes.string,
  basis: PropTypes.oneOf(["xxsmall", "xsmall", "small", "medium", "large", "xlarge", "xxlarge", "full", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "auto"]),
  border: PropTypes.oneOf([ "top", "left", "bottom", "right", "horizontal", "vertical",  "all"]),
  direction: PropTypes.oneOf(["row", "column", "row-responsive"]),
  elevation: PropTypes.oneOf(["none", "xsmall", "small", "medium", "large", "xlarge"]),
  flex: PropTypes.oneOf(["grow", "shrink"]),
  fill: PropTypes.oneOf(["horizontal", "vertical"]),
  gap: PropTypes.oneOf(["xxsmall", "xsmall", "small", "medium", "large", "xlarge"]),
  height: PropTypes.oneOf(["xxsmall", "xsmall", "small", "medium", "large", "xlarge", "xxlarge"]),
  justify: PropTypes.oneOf(["start", "center", "between", "around", "evenly", "end"]),
  overflow: PropTypes.oneOf(["auto", "hidden", "scroll", "visible"]),
  pad: PropTypes.oneOf(["none", "xxsmall", "xsmall", "small", "medium", "large", "xlarge"]),
  responsive: PropTypes.bool,
  round: PropTypes.bool,
  tag: PropTypes.string,
  as: PropTypes.string,
  width: PropTypes.oneOf(["xxsmall", "xsmall", "small", "medium", "large", "xlarge", "xxlarge"]),
  wrap: PropTypes.bool,
}

/* Export Default for UXPin Merge  */
export default Box;