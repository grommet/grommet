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
      a11yTitleId: 'social-tumblr-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-social-tumblr'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-tumblr";
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
        { id: 'social-tumblr' },
        React.createElement('rect', { id: '_x2E_svg_288_', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { d: 'M28.6827,30.4573c-0.4091,0.1951-1.1914,0.3649-1.7748,0.3795c-1.7613,0.0471-2.1032-1.2372-2.1174-2.1682v-6.8487h4.4181 v-3.3311h-4.4029v-5.6042c0,0-3.1702,0-3.2219,0c-0.053,0-0.1456,0.0464-0.1587,0.1642c-0.1885,1.7152-0.991,4.7256-4.3287,5.9293 v2.8417h2.2266v7.1879c0,2.4613,1.8155,5.9579,6.6081,5.8754c1.6171-0.0277,3.413-0.7045,3.8095-1.2889L28.6827,30.4573' })
      )
    );
  }

});

module.exports = Icon;