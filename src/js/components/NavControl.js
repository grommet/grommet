// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var AppStore = require('../stores/AppStore');
var NavStore = require('../stores/NavStore');
var Nav = require('./Nav');
var DropCaret = require('./icons/DropCaret');

var NavControl = React.createClass({

  mixins: [ReactLayeredComponent],

  _onChange: function() {
    this.setState({nav: NavStore.getAll()});
  },

  _onClick: function(e) {
    this.setState({active: !this.state.active});
  },

  getInitialState: function() {
    return {nav: NavStore.getAll(), app: AppStore.getAll(), active: false};
  },

  componentDidMount: function() {
    NavStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    NavStore.removeChangeListener(this._onChange);
  },

  renderLayer: function() {
    if (! this.state.active) {
      return <span />;
    } else {
      return (
        <Nav onRequestClose={this._onClick} />
      );
    }
  },

  render: function() {
    var classes = ['nav-control'];
    if (this.props.active) {
      classes.push('nav-control--active');
    }
    document.title = this.state.nav.documentTitle;
    var logo = React.createFactory(this.state.app.logo)();
    return (
      <div className={classes.join(' ')} onClick={this._onClick}>
        <div className={'nav-control__logo'}>
          {logo}
        </div>
        <h1 className={'nav-control__page'}>{this.state.nav.title}</h1>
        <DropCaret className={'nav-control__icon'} />
      </div>
    );
  }

});

module.exports = NavControl;
