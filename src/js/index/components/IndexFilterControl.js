// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IndexStore = require('../stores/IndexStore');
var SearchPlusIcon = require('../../components/icons/SearchPlus');

var CLASS_ROOT = "index-filter-control";

var IndexFilterControl = React.createClass({

  _onChange: function() {
    this.setState({search: IndexStore.getAll().params.search});
  },

  getInitialState: function() {
    return {search: IndexStore.getAll().params.search};
  },

  componentDidMount: function() {
    IndexStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    IndexStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var classes = [CLASS_ROOT, "control-icon"];
    var search = this.state.search;
    var badge = '';
    var count = search.filterCount();
    if (count > 0) {
      badge = (<div className={"control-badge"}>{count}</div>);
      classes.push(CLASS_ROOT + "--active");
      classes.push("control-icon--active");
    }

    return (
      <div className={classes.join(' ')} onClick={this.props.onOpen}>
        <SearchPlusIcon />
      {badge}
      </div>
    );
  }

});

module.exports = IndexFilterControl;
