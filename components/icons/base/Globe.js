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
      a11yTitleId: 'globe-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-globe'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "globe");

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
        { id: 'globe' },
        React.createElement('rect', { id: '_x2E_svg_146_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M35,24c0,6.0751-4.9249,11-11,11s-11-4.9249-11-11 s4.9249-11,11-11S35,17.9249,35,24z M14,21c0,0,4.125-0.25,5.4344,1.2308C20.4973,23.4327,20,24.7448,21,25l0,0 c0,0,1.7237,0.3779,1.3,1.5804c-1.425,4.0446,2.6809,2.248,2.6809,5.3569c0,3.1145,3.2905,3.3569,3.2905,0.8664 s2.2024-3.7329,2.2024-5.5993c0-1.8664-1.6845-2.1022-2.7988-2.7262C26.5606,23.8597,26.1589,23,24,23l0,0l0,0 c-1.1199-1-1.5349-1.8913-1-3c0.546-1.1199,2.4332-1.0625,2.4332-3.8015c0-1.6714-1.4238-3.1434-2.5381-3.1434' })
      )
    );
  }

});

module.exports = Icon;