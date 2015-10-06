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
      a11yTitleId: 'user-add-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-user-add';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "user-add");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="user-add"><rect id="_x2E_svg_118_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M27,17.5c0,2.7614-2.2386,5-5,5s-5-2.2386-5-5&#xA;&#x9;&#x9;s2.2386-5,5-5S27,14.7386,27,17.5z M30,34.5v-4c0-4.4183-3.5817-8-8-8h0c-4.4183,0-8,3.5817-8,8v4 M33,17.5v8 M37,21.5h-8 M18,34.5&#xA;&#x9;&#x9;v-4 M26,34.5v-4"/></g></svg>
    );
  }

});

module.exports = Icon;
