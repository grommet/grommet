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
      a11yTitleId: 'assistant-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-assistant';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "assistant");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="assistant"><rect id="_x2E_svg_246_" x="0" y="0" fill="none" width="48" height="48"/><path fill="#231F20" d="M21.1397,25.5h-1c-0.5523,0-1-0.4477-1-1v-1c0-0.5523,0.4477-1,1-1h1c0.5523,0,1,0.4477,1,1v1&#xA;&#x9;&#x9;C22.1397,25.0523,21.692,25.5,21.1397,25.5z"/><path fill="#231F20" d="M28.1397,25.5h-1c-0.5523,0-1-0.4477-1-1v-1c0-0.5523,0.4477-1,1-1h1c0.5523,0,1,0.4477,1,1v1&#xA;&#x9;&#x9;C29.1397,25.0523,28.692,25.5,28.1397,25.5z"/><circle fill="#231F20" cx="24.0981" cy="14.5417" r="2.0417"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M32.1397,30.5c-1.3553,0.71-4.1967,1.9688-8,1.9688&#xA;&#x9;&#x9;c-1.53,0-4.631-0.2037-8-1.9688c0-2.3333,0-1.6667,0-4c0-4.4183,3.5817-8,8-8h0c4.4183,0,8,3.5817,8,8V30.5z M24.1397,18.5v-4&#xA;&#x9;&#x9; M16.1702,25.7989c0,2.15,4.4695,2.7011,7.9695,2.7011 M24.1397,28.5c3.5,0,7.9677-0.5633,7.9677-2.7133 M20.1397,32.5&#xA;&#x9;&#x9;c0,2.21,1.79,4,4,4s4-1.79,4-4"/></g></svg>
    );
  }

});

module.exports = Icon;
