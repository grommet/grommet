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
      a11yTitleId: 'soa-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-soa'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "soa");

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
        { id: 'soa' },
        React.createElement('rect', { id: '_x2E_svg_223_', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M18,21.15c-1.6545,0-3-1.3458-3-3s1.3455-3,3-3 s3,1.3458,3,3S19.6545,21.15,18,21.15z M21,18.1501l3-0.0001 M22.2426,22.3926l-2.1214-2.1212 M18,24.15l-0.0001-3 M15.8786,20.2712l-2.1212,2.1214 M12,18.15h3 M13.7574,13.9074l2.1213,2.1213 M18,15.15v-3 M20.1213,16.0287l2.1213-2.1213 M34,23.15c0-1.6542-1.3455-3-3-3s-3,1.3458-3,3s1.3455,3,3,3S34,24.8042,34,23.15z M34,23.1501l3-0.0001 M33.1212,25.2714 l2.1214,2.1212 M30.9999,26.15l0.0001,3 M28.8786,25.2712l-2.1212,2.1214 M25,23.15h3 M23,31.15c0-1.6542-1.3455-3-3-3 s-3,1.3458-3,3s1.3455,3,3,3S23,32.8042,23,31.15z M26,31.15l-3,0.0001 M22.1212,33.2714l2.1214,2.1212 M20,37.15l-0.0001-3 M15.7574,35.3926l2.1212-2.1214 M14,31.15h3 M17.8787,29.0287l-2.1213-2.1213 M20,28.15v-3 M22.1213,29.0287l2.1213-2.1213 M28.8787,21.0287l-2.1213-2.1213 M31,20.15v-3 M33.1213,21.0287l2.1213-2.1213' })
      )
    );
  }

});

module.exports = Icon;