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
      a11yTitleId: 'validation-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-validation';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "validation");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="validation"><rect id="_x2E_svg_90_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M35,24c0,1.3559-2.1936,2.2658-2.6825,3.4448&#xA;&#x9;&#x9;c-0.5068,1.2222,0.3817,3.4123-0.5394,4.3334c-0.9211,0.921-3.1111,0.0324-4.3333,0.5392C26.2657,32.8064,25.3559,35,24,35&#xA;&#x9;&#x9;c-1.3559,0-2.2658-2.1936-3.4448-2.6825c-1.2222-0.5068-3.4123,0.3817-4.3334-0.5394c-0.921-0.9211-0.0324-3.1111-0.5392-4.3333&#xA;&#x9;&#x9;C15.1936,26.2657,13,25.3559,13,24c0-1.3559,2.1936-2.2658,2.6825-3.4448c0.5068-1.2222-0.3817-3.4123,0.5394-4.3334&#xA;&#x9;&#x9;c0.9211-0.921,3.1111-0.0324,4.3333-0.5392C21.7343,15.1936,22.6441,13,24,13c1.3559,0,2.2658,2.1936,3.4448,2.6825&#xA;&#x9;&#x9;c1.2222,0.5068,3.4123-0.3817,4.3334,0.5394c0.921,0.9211,0.0324,3.1111,0.5392,4.3333C32.8064,21.7343,35,22.6441,35,24z M20,24&#xA;&#x9;&#x9;l3,3l6-6"/></g></svg>
    );
  }

});

module.exports = Icon;
