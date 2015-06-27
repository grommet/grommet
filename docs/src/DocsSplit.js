// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var Split = require('grommet/components/Split');
var Sidebar = require('grommet/components/Sidebar');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var DocsFooter = require('./DocsFooter');
var GrommetLogo = require('grommet/components/icons/Grommet');
var CloseIcon = require('grommet/components/icons/Clear');
var DocsMenu = require('./DocsMenu');
var DOM = require('grommet/utils/DOM');

var DocsSplit = React.createClass({

  propTypes: {
    contents: React.PropTypes.arrayOf(React.PropTypes.object),
    onChange: React.PropTypes.func,
    title: React.PropTypes.node.isRequired
  },

  _scrollToAnchor: function () {
    if (this.refs.doc) {
      var doc = this.refs.doc.getDOMNode();
      var hash = window.location.hash.slice(1);
      if (hash) {
        var anchor = doc.querySelectorAll('a.anchor[id=' + hash + ']')[0];
        var scrollParent = DOM.findScrollParents(anchor)[0];
        scrollParent.scrollTop = anchor.offsetTop;
      } else {
        doc.scrollTop = 0;
      }
    }
  },

  _onResponsive: function (responsive) {
    this.setState({responsive: responsive});
    if ('multiple' === responsive) {
      this.setState({showMenu: true});
    }
    if ('single' === responsive) {
      this.setState({showMenu: false});
    }
  },

  _onMenuOpen: function () {
    this.setState({showMenu: true});
  },

  _onMenuClick: function () {
    if ('single' === this.state.responsive) {
      this.setState({showMenu: false});
    }
    // allow time for hash to change
    setTimeout(this._scrollToAnchor, 1);
    if (this.props.onChange) {
      this.props.onChange();
    }
  },

  getInitialState: function () {
    return {showMenu: true};
  },

  componentDidMount: function () {
    this._scrollToAnchor();
  },

  componentDidUpdate: function () {
    this._scrollToAnchor();
  },

  _renderTitle: function () {
    return (
      <Title>
        <Link to="docs">
          <GrommetLogo small={true} />
        </Link>
        {this.props.title}
    </Title>
    );
  },

  _renderMenu: function () {
    var header;
    if ('single' === this.state.responsive) {
      var title = this._renderTitle();
      header = (
        <Header large={true} flush={false}>
          {title}
          <Menu direction="left">
            <span onClick={this._onMenuClick}><CloseIcon /></span>
          </Menu>
        </Header>
      );
    }
    return (
      <Sidebar small={true}>
        {header}
        <DocsMenu direction="down" contents={this.props.contents}
          onClick={this._onMenuClick} />
      </Sidebar>
    );
  },

  _renderDoc: function () {
    var title = this._renderTitle();
    var contents;
    if ('single' === this.state.responsive) {
      contents = (
        <Menu direction="left">
          <a onClick={this._onMenuOpen}>Contents</a>
        </Menu>
      );
    }
    return (
      <div ref="doc">
        <Header large={true} flush={false}>
          {title}
          {contents}
        </Header>

        {this.props.children}

        <DocsFooter />
      </div>
    );
  },

  render: function() {
    var left;
    var right;
    if (this.state.showMenu) {
      left = this._renderMenu();
      if ('multiple' === this.state.responsive) {
        right = this._renderDoc();
      }
    } else {
      left = this._renderDoc();
    }

    return (
      <Split flex="right" onResponsive={this._onResponsive}>
        {left}
        {right}
      </Split>
    );
  }
});

module.exports = DocsSplit;
