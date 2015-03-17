// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var MenuControl = require('./MenuControl');
var RouterState = require('react-router').State;

var routes = [{route: 'design', label: 'Design'}, {route: 'resources', label: 'Resources'}];

var Menu = React.createClass({

  mixins: [RouterState],

  _onActivate: function () {
    this.setState({active: true});
  },

  _onClick: function () {
    if (this.state.active) {
      this.setState({active: false});
    }
  },

  getInitialState: function () {
    return {active: false};
  },

  render: function () {
    var classes = ["menu pack pack--auto"];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    if (this.props.home) {
      classes.push("menu--home");
    }
    if (this.state.active) {
      classes.push("menu--active");
    }
    var items = routes.map(function (route) {
      var classes = ["menu__item"];
      if (this.isActive(route.route)) {
        classes.push("menu__item--active");
      }
      return (
        <li key={route.route} className={classes.join(' ')}>
          <Link to={route.route}>{route.label}</Link>
        </li>
      );
    }, this);
    return (
      <div className={classes.join(' ')} onClick={this._onClick}>
        <MenuControl className={"menu__control"}
          active={this.state.active} primary={this.isActive('home')}
          onActivate={this._onActivate}/>
        <ol className={"menu__items list-bare pack__item"}>
          {items}
        </ol>
      </div>
    );
  }
});

module.exports = Menu;
