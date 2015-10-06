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
      a11yTitleId: 'cubes-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-cubes';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "cubes");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="cubes"><rect id="_x2E_svg_153_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M12,23.9545L18,21l6,2.9545v7.0909L18,34l-6-2.9545&#xA;&#x9;&#x9;V23.9545z M12,23.9545l6,2.9545l6-2.9545 M18,27v7 M24,31.0455L30,34l6-2.9545v-7.0909L30,21l-6,2.9545V31.0455z M24,23.9545&#xA;&#x9;&#x9;l6,2.9545l6-2.9545 M30,27v7 M18,21.0455L24,24l6-2.9545v-7.0909L24,11l-6,2.9545V21.0455z M18,13.9545l6,2.9545l6-2.9545 M24,17v7&#xA;&#x9;&#x9;"/></g></svg>
    );
  }

});

module.exports = Icon;
