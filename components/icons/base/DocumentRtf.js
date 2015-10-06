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
      a11yTitleId: 'document-rtf-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-rtf';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-rtf");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-rtf"><rect id="_x2E_svg_280_" x="0" y="0" fill="none" width="48" height="48"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="16.5,21 16.5,13 29.5002,13 34.5,17.9999 &#xA;&#x9;&#x9;34.5,35 15.5,35 &#x9;"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="28.5,14 28.5,19 34.5,19 &#x9;"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M27.5,19"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="12.5001" y1="25.0004" x2="12.5001" y2="32.0004"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M14.5001,29.0004c1.1046,0,2-0.8954,2-2&#xA;&#x9;&#x9;s-0.8954-2-2-2h-2v4H14.5001z"/><polygon fill="#231F20" points="15.7461,32.0004 13.0438,28.2977 15.2342,28.2977 17.9562,32.0201 &#x9;"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="24.0558" y1="25" x2="18.0558" y2="25"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="21.0558" y1="24" x2="21.0558" y2="32"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="31.0558" y1="25" x2="25.0558" y2="25"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="26.0558" y1="24" x2="26.0558" y2="32"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="30.0558" y1="29" x2="25.0558" y2="29"/></g></svg>
    );
  }

});

module.exports = Icon;
