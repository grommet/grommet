// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var Layer = require('grommet/components/Layer');
var Search = require('grommet/components/Search');
var Menu = require('grommet/components/Menu');
var Link = require('react-router').Link;
var TourNav = React.createClass({

  propTypes: {
    onClose: React.PropTypes.func.isRequired
  },

  _onSearch: function (query) {
    console.log('!!! TourNav _onSearch', query);
  },

  _onSink: function (event) {
    event.stopPropagation();
  },

  render: function() {
    return (
      <Layer align="left" onClose={this.props.onClose}>
        <div onClick={this._onSink}>
          <Search inline={true} onChange={this._onSearch} />
        </div>
        <Menu>
          <Link to="tour">Dashboard</Link>
          <Link to="activity">Activity</Link>
          <Link to="tbd">Reports</Link>
          <Link to="settings">Settings</Link>
        </Menu>
        <h3>Suggestions</h3>
        <Menu>
          <Link to="tbd">resource 1</Link>
          <Link to="tbd">resource 2</Link>
        </Menu>
      </Layer>
    );
  }

});

module.exports = TourNav;
