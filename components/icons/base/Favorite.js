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
      a11yTitleId: 'favorite-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-favorite'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "favorite");

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
        { id: 'favorite_1_' },
        React.createElement('rect', { id: '_x2E_svg_13_', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { id: 'favorite', fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M24.001,33.9448 C21.6279,32.1148,13,25.0635,13,19.2505c0-2.9256,2.4678-5.3057,5.5-5.3057c1.9014,0,3.6406,0.9275,4.6533,2.4814L24,17.7253 l0.8467-1.2991c1.0127-1.5539,2.752-2.4814,4.6533-2.4814c3.0322,0,5.5,2.3801,5.5,5.3057C35,25.096,26.376,32.1214,24.001,33.9448 z' })
      )
    );
  }

});

module.exports = Icon;