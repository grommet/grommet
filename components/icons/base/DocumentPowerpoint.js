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
      a11yTitleId: 'document-powerpoint-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-document-powerpoint'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "document-powerpoint");

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
        { id: 'document-powerpoint' },
        React.createElement('rect', { id: '_x2E_svg_277_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '16.5,21 16.5,13 29.5002,13 34.5,17.9999  34.5,35 15.5,35 \t' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '28.5,14 28.5,19 34.5,19 \t' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M27.5,19' }),
        React.createElement(
          'g',
          null,
          React.createElement('path', { fill: '#231F20', d: 'M15.2898,22.9497h3.6772c2.1474,0,3.4459,1.2729,3.4459,3.1117v0.0261 c0,2.0822-1.6201,3.1619-3.6385,3.1619h-1.5042v2.7003h-1.9803V22.9497z M18.8385,27.4888c0.9899,0,1.5684-0.592,1.5684-1.3637 V26.1c0-0.8875-0.6171-1.3627-1.607-1.3627h-1.5298v2.7515H18.8385z' })
        )
      )
    );
  }

});

module.exports = Icon;