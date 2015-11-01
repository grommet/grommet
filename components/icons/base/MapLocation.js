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
      a11yTitleId: 'map-location-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-map-location'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "map-location";
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
        { id: 'map-location' },
        React.createElement('rect', { id: '_x2E_svg_145_', x: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('line', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', x1: '20.025', y1: '18.9467', x2: '20.025', y2: '18.9467' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M29.705,16.7667l5.32,2.28v15l-7-3l-8,3l-7-3v-15 l5.27,2.26 M20.025,33.9467v-11 M28.025,30.9467v-8 M24.025,11.9467c-3.1861,0-5.769,2.5829-5.769,5.769 c0,4.3989,5.769,9.2304,5.769,9.2304c2.2529-2.2529,5.769-4.7594,5.769-9.2304C29.794,14.5296,27.2111,11.9467,24.025,11.9467z' }),
        React.createElement('circle', { fill: '#231F20', cx: '24.025', cy: '17.9467', r: '2' })
      )
    );
  }

});

module.exports = Icon;