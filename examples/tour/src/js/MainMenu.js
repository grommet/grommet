// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var Layer = require('grommet/components/Layer');
var Header = require('grommet/components/Header');
var Search = require('grommet/components/Search');
var Menu = require('grommet/components/Menu');
var Title = require('grommet/components/Title');
var Close = require('grommet/components/icons/Clear');
var Link = require('react-router').Link;

var MainMenu = React.createClass({

  propTypes: {
    onClose: React.PropTypes.func.isRequired,
    pages: React.PropTypes.arrayOf(React.PropTypes.shape({
      route: React.PropTypes.string,
      label: React.PropTypes.string
    })).isRequired
  },

  _onSearch: function (query) {
    var regexp = new RegExp('^' + query, 'i');
    var visiblePages = this.props.pages.filter(function (page) {
      return regexp.test(page.label);
    });
    this.setState({visiblePages: visiblePages});
  },

  getInitialState: function() {
    return {visiblePages: this.props.pages};
  },

  componentDidMount: function () {
    this.refs.search.focus();
  },

  render: function() {
    var pages = this.state.visiblePages.map(function (page) {
      return (
        <Link key={page.label} to={page.route} onClick={this.props.onClose}>
          {page.label}
        </Link>
      );
    }, this);

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
            {pages}
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

module.exports = MainMenu;
