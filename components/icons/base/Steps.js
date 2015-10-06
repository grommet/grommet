// (C) Copyright 2014-2015 Hewlett-Packard Development Company

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var Icon = React.createClass({

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string
  },

  mixins: [IntlMixin],

  getDefaultProps: function () {
    return {
      a11yTitleId: 'steps-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-steps';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "steps");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="steps"><rect id="_x2E_svg_124_" x="0" y="0" fill="none" width="48" height="48"/><polygon fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="27.5,13.1 27.5,18.1 22.5,18.1 22.5,23.1 &#xA;&#x9;&#x9;17.5,23.1 17.5,28.1 12.5,28.1 12.5,35.1 17.5,35.1 22.5,35.1 27.5,35.1 34.5,35.1 34.5,13.1 &#x9;"/></g></svg>
    );
  }

});

module.exports = Icon;
