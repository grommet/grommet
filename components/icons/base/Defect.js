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
      a11yTitleId: 'defect-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-defect'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "defect";
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
        { id: 'defect' },
        React.createElement('rect', { id: '_x2E_svg_196_', x: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M31.0004,28.0796c0,3.822-3.178,6.9204-7,6.9204 s-7-3.0984-7-6.9204v-6.7266c1-0.5968,3.3059-2.3646,7.0368-2.3529c3.6859,0.0115,5.9632,1.7526,6.9632,2.3529 C31.0004,25.7128,31.0004,23.7197,31.0004,28.0796z M24.0004,36V24 M12.8575,18c2.3571,3.25,5.1429,3,5.1429,3 M17.0804,29.08 c-1.01,0.19-2.7,0.83-4.22,2.92 M12.0004,25h6 M30.0004,21c0,0,2.7857,0.25,5.1429-3 M35.1404,32c-1.52-2.09-3.21-2.73-4.22-2.92 M30.0004,25h6 M28.5904,19.98c0.27-0.61,0.41-1.28,0.41-1.98c0-2.76-2.24-5-5-5s-5,2.24-5,5c0,0.71,0.15,1.38,0.41,1.99' })
      )
    );
  }

});

module.exports = Icon;