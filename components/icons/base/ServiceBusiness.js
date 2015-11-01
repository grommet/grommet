// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var FormattedMessage = require('../../../components/FormattedMessage');

var CLASS_ROOT = "control-icon";

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'service-business-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-service-business'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "service-business";
    var a11yTitle = React.createElement(FormattedMessage, { id: titleLabel, defaultMessage: titleLabel });

    return React.createElement(
      'svg',
      { version: '1.1', viewBox: '0 0 48 48', width: '48px', height: '48px', className: classes.join(' '), 'aria-labelledby': this.props.a11yTitleId },
      React.createElement(
        'title',
        { id: this.props.a11yTitleId },
        a11yTitle
      ),
      React.createElement(
        'g',
        { id: 'service-business' },
        React.createElement('rect', { id: '_x2E_svg_222_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M16.1397,34.15h-3v-18h22v18h-5 M28.1397,16.15v-4 h-8v4 M19.7507,27.64c-0.665,0.686-1.071,1.624-1.071,2.66c0,2.128,1.722,3.85,3.85,3.85s3.85-1.638,3.85-3.766 c0-0.8423-0.196-1.302-0.196-1.302c-0.399-1.281-1.33-1.981-2.415-2.338c-0.014-0.007-0.035-0.021-0.049-0.035 c-0.021-0.014-0.042-0.035-0.063-0.042c-0.007-0.007-0.014-0.007-0.021-0.007 M24.5948,22.656 c-0.539-1.463-1.953-2.506-3.605-2.506c-2.128,0-3.85,1.722-3.85,3.85c0,1.694,1.092,3.129,2.611,3.64 c0.385,0.14,0.805,0.21,1.239,0.21c1.05,0,2.002-0.42,2.695-1.106c0.014-0.007,0.028-0.021,0.035-0.035 c0.693-0.693,1.12-1.652,1.12-2.709C24.8397,23.524,24.7557,23.069,24.5948,22.656z M23.6357,26.618 c0.007,0.014,0.014,0.035,0.021,0.049c0.007,0.028,0.014,0.049,0.028,0.077 M26.3796,29.1383 c0.2915,0.0745,0.5962,0.1117,0.9101,0.1117c2.128,0,3.85-1.722,3.85-3.85s-1.722-3.85-3.85-3.85c-1.05,0-2.002,0.42-2.695,1.106' })
      )
    );
  }

});

module.exports = Icon;