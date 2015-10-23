// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlProvider = require('react-intl').IntlProvider;
var Locale = require('../utils/Locale');
var SkipLinks = require('./SkipLinks');

var Locale = require('../utils/Locale');

var App = React.createClass({

  propTypes: {
    centered: React.PropTypes.bool,
    locale: React.PropTypes.string,
    messages: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      centered: true
    };
  },

  render: function() {
    var classes = ["app"];
    if (this.props.centered) {
      classes.push("app--centered");
    }
    if (this.props.inline) {
      classes.push("app--inline");
    }

    if (this.props.className) {
      classes.push(this.props.className);
    }

    var localeData = Locale.getLocaleData(this.props.messages || {}, this.props.locale);

    return (
      <IntlProvider locale={localeData.locale} messages={localeData.messages}>
        <div lang={localeData.locale} className={classes.join(' ')}>
          <SkipLinks />
          {this.props.children}
        </div>
      </IntlProvider>
    );
  }
});

module.exports = App;
