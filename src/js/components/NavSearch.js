// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var NavStore = require('../stores/NavStore');
var navActions = require('../actions/NavActions');

var NavSearch = React.createClass({

  _onChange: function() {
    this.setState(NavStore.getAll());
  },

  _onClick: function(e) {
    e.stopPropagation();
  },

  _onInputChange: function(e) {
    var text = e.target.value;
    navActions.search(text);
  },

  getInitialState: function() {
    return NavStore.getAll();
  },

  componentDidMount: function() {
    NavStore.addChangeListener(this._onChange);
    navActions.search('');
    //this.getDOMNode().focus(); // disconcerting on a phone
  },

  componentWillUnmount: function() {
    NavStore.removeChangeListener(this._onChange);
  },

  componentDidUpdate: function() {
    //this.getDOMNode().focus(); // disconcerting on a phone
  },

  render: function() {
    return (
      <input ref="search" className={'nav-search alpha'} placeholder="Type to search"
        value={this.state.search} onClick={this._onClick}
        onChange={this._onInputChange}/>
    );
  }

});

module.exports = NavSearch;
