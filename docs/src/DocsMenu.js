// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var Menu = require('grommet/components/Menu');
var Header = require('grommet/components/Header');

var DocsMenu = React.createClass({

  propTypes: {
    contents: React.PropTypes.arrayOf(React.PropTypes.object),
    direction: React.PropTypes.oneOf(['column', 'row']),
    onClick: React.PropTypes.func,
    title: React.PropTypes.object
  },

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _renderMenuItems: function (contents, router, context) {
    var items = contents.map(function (content, index) {
      var item;

      if (content.route || context) {
        var routeName = content.route || context.route;
        var href = router.makeHref(routeName);
        if (content.id) {
          href += '#' + content.id;
        }
        item = (
          <Link key={content.label} to={href} onClick={this.props.onClick}>
            {content.label}
          </Link>
        );
        //item = <a key={content.label} href={href}>{content.label}</a>;
      } else {
        item = content.label;
      }

      if (! context) {
        item = (
          <Header tag="h3" key={content.label} pad={{horizontal: 'medium'}}>
            <strong>{item}</strong>
          </Header>
        );
      }

      var subItems;
      if (content.hasOwnProperty('contents')) {
        subItems = this._renderMenuItems(content.contents, router, content);
      }

      if (!context || subItems) {
        return (
          <Menu key={content.label} direction="column" align="start" primary={true}>
            {item}
            {subItems}
          </Menu>
        );
      } else {
        return item;
      }
    }.bind(this));

    return items;
  },

  render: function() {
    var menuItems = this._renderMenuItems(this.props.contents, this.context.router, null);
    return (
      <Menu direction={this.props.direction} align="start" justify="between" primary={true}>
        <Header tag="h2" pad={{horizontal: 'medium'}}>{this.props.title}</Header>
        {menuItems}
      </Menu>
    );
  }
});

module.exports = DocsMenu;
