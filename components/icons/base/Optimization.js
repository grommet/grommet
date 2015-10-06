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
      a11yTitleId: 'optimization-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-optimization';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "optimization");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="optimization"><rect id="_x2E_svg_98_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M30.5834,14.0315&#xA;&#x9;&#x9;C27.0001,23.2815,21.2542,26.9899,13,26.9899l0,0 M33.5621,19.5986l-2.5944-6.3875l-6.5513,2.661 M18,30.9899h-4v4h4V30.9899z&#xA;&#x9;&#x9; M26,28.9899h-4v6h4V28.9899z M34,23.9899l-4,0.1v11l4-0.1V23.9899z"/></g></svg>
    );
  }

});

module.exports = Icon;
