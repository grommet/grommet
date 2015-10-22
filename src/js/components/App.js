// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var SkipLinks = require('./SkipLinks');

var Locale = require('../utils/Locale');

var App = React.createClass({

  propTypes: {
    centered: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      centered: true
    };
  },

  getInitialState: function () {
    return {
      lang: 'en-US'
    };
  },

  componentDidMount: function () {
    var lang = Locale.getCurrentLocale();
    if (this.props.lang) {
      lang = this.props.lang;
    }

    if (!document.documentElement.getAttribute('lang')) {
      document.documentElement.setAttribute('lang', lang);
    }

    this.setState({lang: lang});
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

    return (
      <div lang={this.state.lang} className={classes.join(' ')}>
        <SkipLinks/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
