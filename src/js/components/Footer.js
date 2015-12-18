// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import pick from 'lodash/object/pick';
import keys from 'lodash/object/keys';
import Box from './Box';
import SkipLinkAnchor from './SkipLinkAnchor';

const CLASS_ROOT = "footer";

class Footer extends Component {

  render () {
    var classes = [CLASS_ROOT];
    var containerClasses = [CLASS_ROOT + "__container"];
    var other = pick(this.props, keys(Box.propTypes));
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    } else if (this.props.large) { // Deprecated
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    if (this.props.float) {
      classes.push(CLASS_ROOT + "--float");
      containerClasses.push(CLASS_ROOT + "__container--float");
    }

    var footerSkipLink;
    if (this.props.primary) {
      footerSkipLink = (
        <SkipLinkAnchor label="Footer" />
      );
    }

    return (
      <Box tag="footer" {...other} className={classes.join(' ')}
        containerClassName={containerClasses.join(' ')}>
        {footerSkipLink}
        {this.props.children}
      </Box>
    );
  }

}

Footer.propTypes = {
  primary: React.PropTypes.bool,
  large: React.PropTypes.bool, // Deprecated
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  small: React.PropTypes.bool, // Deprecated
  float: React.PropTypes.bool,
  ...Box.propTypes
};

Footer.defaultProps = {
  pad: 'none',
  direction: 'row',
  responsive: false
};

module.exports = Footer;
