// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var Layer = require('grommet/components/Layer');
var Header = require('grommet/components/Header');
var Search = require('grommet/components/Search');
var Menu = require('grommet/components/Menu');
var Title = require('grommet/components/Title');
var Close = require('grommet/components/icons/Clear');
var Link = require('react-router').Link;
var TourNav = React.createClass({

  propTypes: {
    onClose: React.PropTypes.func.isRequired
  },

  _onSearch: function (query) {
    console.log('!!! TourMainMenu _onSearch', query);
  },

  componentDidMount: function () {
    this.refs.search.focus();
  },

  render: function() {
    return (
      <Layer align="top" onClose={this.props.onClose}>
        <Menu primary={true}>
          <Header large={true}>
            <Title>
              {"Grommet Tour"}
            </Title>
            <Search ref="search" inline={true} onChange={this._onSearch} />
            <Menu>
              <div onClick={this.props.onClose}>
                <Close />
              </div>
            </Menu>
          </Header>
          <Menu>
            <Link to="tour">Dashboard</Link>
            <Link to="activity">Activity</Link>
            <Link to="tbd">Reports</Link>
            <Link to="settings">Settings</Link>
          </Menu>
          <h4>Suggestions</h4>
          <Menu>
            <Link to="tbd">resource 1</Link>
            <Link to="tbd">resource 2</Link>
          </Menu>
          <h4>Recent</h4>
          <Menu>
            <Link to="tbd">resource 1</Link>
            <Link to="tbd">resource 2</Link>
          </Menu>
        </Menu>
      </Layer>
    );
  }

});

module.exports = TourNav;
