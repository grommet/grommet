// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var Split = require('grommet/components/Split');
var Article = require('grommet/components/Article');
var Sidebar = require('grommet/components/Sidebar');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Box = require('grommet/components/Box');
var Menu = require('grommet/components/Menu');
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

  getInitialState: function () {
    return {showMenu: true, responsive: 'multiple'};
  },

  componentDidMount: function () {
    this._scrollToAnchor();
  },

  componentDidUpdate: function () {
    this._scrollToAnchor();
  },

  _scrollToAnchor: function () {
    if (this.refs.doc) {
      var doc = this.refs.doc.getDOMNode();
      var hash = window.location.hash.slice(1);
      if (hash) {
        var anchor = document.querySelectorAll('[id=' + hash + ']')[0];
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

  _renderTitle: function () {
    return (
      <Title responsive={false}>
        <Link to="docs">
          <Box align="center" direction="row">
            <GrommetLogo a11yTitle=""/>
          </Box>
        </Link>
      </Title>
    );
  },

  _renderMenu: function () {
    var title = this._renderTitle();
    var closer;
    if ('single' === this.state.responsive) {
      closer = (
        <Menu direction="row">
          <span onClick={this._onMenuClick}><CloseIcon /></span>
        </Menu>
      );
    }
    return (
      <Sidebar size="small" primary={true} separator="right">
        <Header justify="between" large={true} pad={{horizontal: 'medium'}}>
          {title}
          {closer}
        </Header>
        <DocsMenu direction="column"
          title={this.props.title} contents={this.props.contents}
          onClick={this._onMenuClick} />
      </Sidebar>
    );
  },

  _renderDoc: function () {
    var header;
    if ('single' === this.state.responsive) {
      var title = this._renderTitle();
      header = (
        <Header justify="between" large={true} pad={{horizontal: 'large'}}>
          {title}
          <Menu direction="row" responsive={false}>
            <a onClick={this._onMenuOpen}>Contents</a>
          </Menu>
        </Header>
      );
    } else {
      //header = <Header large={true} />;
    }
    return (
      <Article primary={true}>
        <div ref="doc" className="docs-split__doc">
          {header}
          {this.props.children}
        </div>
      </Article>
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
      <Split flex="right" fixed={true} onResponsive={this._onResponsive}>
        {left}
        {right}
      </Split>
    );
  }
});

module.exports = DocsSplit;
