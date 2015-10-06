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
      a11yTitleId: 'radial-selected-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-radial-selected';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "radial-selected");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="radial-selected"><rect id="_x2E_svg_35_" x="0" y="0" fill="none" width="48" height="48"/><circle fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" cx="24" cy="24" r="11"/><path fill="#231F20" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M24,28c-2.2055,0-4-1.7945-4-4s1.7945-4,4-4&#xA;&#x9;&#x9;s4,1.7945,4,4S26.2055,28,24,28z"/></g></svg>
    );
  }

});

module.exports = Icon;
