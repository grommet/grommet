/*** @jsx React.DOM */
// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Logo = require('./Logo');
var Menu = require('./Menu');
var Link = require('react-router').Link;
var RouterState = require('react-router').State;

var Header = React.createClass({

  mixins: [RouterState],

  render: function() {
    var classes = ["header"];
    if (this.isActive('home')) {
      classes.push("header--home");
    }
    return (
      <div className={classes.join(' ')}>
        <div className={"header__container pack pack--auto"}>
          <div className={"header__brand pack__item"}>
            <Link to="/" className={"route"}>
              <Logo className={"header__logo"}/>
              <span className={"header__name"}>Application Style Guide</span>
            </Link>
          </div>
          <Menu className={"list-inline pack__item"} home={this.isActive('home')}/>
        </div>
      </div>
    );
  }
});

module.exports = Header;
