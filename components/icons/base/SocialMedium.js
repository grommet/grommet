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
      a11yTitleId: 'social-medium-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-social-medium'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-medium");

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
        { id: 'social-medium', transform: 'matrix(1.3333333,0,0,-1.3333333,0,126.66667)' },
        React.createElement('rect', { id: '_x2E_svg_296_', x: '-6', y: '53', fill: 'none', width: '48', height: '48' }),
        React.createElement(
          'g',
          { id: 'g12', transform: 'scale(0.1)' },
          React.createElement('path', { id: 'path14', d: 'M270,816.9011h-7.119c-2.643,0-6.381-3.8127-6.381-6.2537V722.176c0-2.4439,3.738-5.775,6.381-5.775H270 V695.401h-64.5v21.0001H219v93h-0.6615L186.8133,695.401H162.406l-31.1186,114.0001H130.5v-93H144V695.401H90v21.0001h6.9147 c2.8476,0,6.5853,3.3311,6.5853,5.775v88.4714c0,2.441-3.7377,6.2537-6.5853,6.2537H90v21h67.5246l22.1696-82.5h0.6099 l22.3746,82.5H270V816.9011' })
        )
      )
    );
  }

});

module.exports = Icon;