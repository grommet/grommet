// (C) Copyright 2014-2015 Hewlett-Packard Development Company

'use strict';

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var CLASS_ROOT = "control-icon";

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool
  },

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'platform-windows-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-platform-windows'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "platform-windows");

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
        { id: 'platform-windows' },
        React.createElement('rect', { id: '_x2E_svg_299_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { id: 'path13_1_', d: 'M12.0755,15.8445 l9.778-1.3317l0.0043,9.4315L12.0846,24L12.0755,15.8445z M21.8488,25.0311l0.0076,9.4398l-9.7732-1.3437l-0.0006-8.1593 L21.8488,25.0311z M23.0341,14.3387l12.9647-1.8922v11.378l-12.9647,0.1029L23.0341,14.3387z M36.0018,25.1199l-0.003,11.3267 l-12.9647-1.8298l-0.0182-9.518L36.0018,25.1199z' })
      )
    );
  }

});

module.exports = Icon;