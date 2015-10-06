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
      a11yTitleId: 'compasss-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-compasss';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "compasss");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="compasss"><rect id="_x2E_svg_128_" x="0" y="0" fill="none" width="48" height="48"/><circle fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" cx="24.0208" cy="24" r="11"/><path fill="#231F20" d="M20.4853,20.4645L18.0208,30l9.5355-2.4645L30.0208,18L20.4853,20.4645z M24.0208,26&#xA;&#x9;&#x9;c-1.1046,0-2-0.8954-2-2s0.8954-2,2-2s2,0.8954,2,2S25.1254,26,24.0208,26z"/></g></svg>
    );
  }

});

module.exports = Icon;
