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
      a11yTitleId: 'social-github-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-social-github'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-github";
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
        { id: 'social-github' },
        React.createElement('rect', { id: '_x2E_svg_282_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { d: 'M35.0014,25.7187c0,4.5554-2.75,8.25-11,8.25s-11-3.696-11-8.25c0-1.9635,0.451-3.7647,1.6486-5.1824 c-0.3492-0.9446-1.0422-3.6135,0.7576-6.743c3.2739,0.8223,4.8661,2.8875,5.4615,3.8734c0.9405-0.1265,1.9759-0.198,3.1322-0.198 c1.1495,0,2.1807,0.0784,3.1226,0.2145c0.5871-0.9804,2.178-3.0621,5.4711-3.8899c1.8631,3.2409,1.056,5.9867,0.7219,6.8365 C34.5036,22.0324,35.0014,23.7965,35.0014,25.7187z M31.2188,25.0312C29.4808,24.1622,27.4375,24,24,24 s-5.4808,0.1623-7.2188,1.0312c-2.0625,1.0312-2.0625,4.4688,0,5.8438c1.5414,1.0271,3.5104,1.7188,7.2188,1.7188 c3.707,0,5.676-0.6916,7.2188-1.7188C33.2813,29.5,33.2813,26.0625,31.2188,25.0312z M27.4389,25.375 c-1.4355,0-2.0625,1.2306-2.0625,2.75c0,1.518,0.5775,2.75,2.0625,2.75c1.485,0,2.0625-1.232,2.0625-2.75 C29.5014,26.6056,28.8758,25.375,27.4389,25.375z M20.5639,25.375c-1.4355,0-2.0625,1.2306-2.0625,2.75 c0,1.518,0.5775,2.75,2.0625,2.75c1.485,0,2.0625-1.232,2.0625-2.75C22.6264,26.6056,22.0008,25.375,20.5639,25.375z' })
      )
    );
  }

});

module.exports = Icon;