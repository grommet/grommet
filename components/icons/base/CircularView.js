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
      a11yTitleId: 'circular-view-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-circular-view'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "circular-view";
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
        { id: 'circular-view' },
        React.createElement('rect', { id: '_x2E_svg_168_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M26.7574,15.5c0,1.3807-1.1193,2.5-2.5,2.5 c-1.3807,0-2.5-1.1193-2.5-2.5s1.1193-2.5,2.5-2.5C25.6381,13,26.7574,14.1193,26.7574,15.5z M32.2574,17 c-1.3807,0-2.5,1.1193-2.5,2.5s1.1193,2.5,2.5,2.5c1.3807,0,2.5-1.1193,2.5-2.5S33.6381,17,32.2574,17z M32.2574,26 c-1.3807,0-2.5,1.1193-2.5,2.5s1.1193,2.5,2.5,2.5c1.3807,0,2.5-1.1193,2.5-2.5S33.6381,26,32.2574,26z M16.2574,17 c-1.3807,0-2.5,1.1193-2.5,2.5s1.1193,2.5,2.5,2.5s2.5-1.1193,2.5-2.5S17.6381,17,16.2574,17z M16.2574,26 c-1.3807,0-2.5,1.1193-2.5,2.5s1.1193,2.5,2.5,2.5s2.5-1.1193,2.5-2.5S17.6381,26,16.2574,26z M24.2574,30 c-1.3807,0-2.5,1.1193-2.5,2.5c0,1.3807,1.1193,2.5,2.5,2.5c1.3807,0,2.5-1.1193,2.5-2.5C26.7574,31.1193,25.6381,30,24.2574,30z' })
      )
    );
  }

});

module.exports = Icon;