// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var NavControl = require('./NavControl');
var SessionControl = require('./SessionControl');
var NotificationsControl = require('./NotificationsControl');

var Header = React.createClass({

  render: function() {
    var classes = ['header'];
    if (this.props.active) {
      classes.push('header--active');
    }
    return (
      <div className={classes.join(' ')}>
        <div className={"header__background"} />
        <NavControl active={this.props.active} />
        <ol className={"header__controls list-inline"}>
          <li><NotificationsControl /></li>
          <li><SessionControl /></li>
        </ol>
      </div>
    );
  }

});

module.exports = Header;
