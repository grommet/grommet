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
      a11yTitleId: 'sheild-configure-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-sheild-configure'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "sheild-configure";
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
        { id: 'sheild-configure' },
        React.createElement('rect', { id: '_x2E_svg_221_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M24.0002,26.15c-1.6545,0-3-1.3458-3-3 s1.3455-3,3-3s3,1.3458,3,3S25.6547,26.15,24.0002,26.15z M30.0002,23.15l-3,0.0001 M28.2428,27.3926l-2.1214-2.1212 M24,26.15 l0.0001,3 M21.8787,25.2712l-2.1212,2.1214 M18.0002,23.15h3 M21.8788,21.0287l-2.1213-2.1213 M24.0002,20.15v-3 M26.1215,21.0287 l2.1213-2.1213 M24.0002,13.15l-9,4.4v2.864c0,4.2846,1.8322,8.3646,5.0345,11.2111l3.9655,3.2249l3.9655-3.2249 c3.2023-2.8465,5.0345-6.9266,5.0345-11.2111V17.55L24.0002,13.15z' })
      )
    );
  }

});

module.exports = Icon;