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
      a11yTitleId: 'social-facebook-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-social-facebook';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "social-facebook");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="social-facebook"><rect id="_x2E_svg_308_" x="0" y="0" fill="none" width="48" height="48"/><path id="f" d="M25.1218,34.399V24.3634h3.3689l0.504-3.9107h-3.8729v-2.4975c0-1.1321,0.3145-1.9037,1.9383-1.9037l2.0709-0.0006&#xA;&#x9;&#x9;v-3.4984c-0.3581-0.0472-1.5874-0.1534-3.0177-0.1534c-2.9857,0-5.03,1.822-5.03,5.1694v2.8843h-3.3772v3.9107h3.3772V34.399&#xA;&#x9;&#x9;H25.1218z"/></g></svg>
    );
  }

});

module.exports = Icon;
