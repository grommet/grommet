// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var StatusIcon = require('./icons/Status');
var Menu = require('./Menu');
var MoreIcon = require('./icons/More');
var Link = require('./Link');

var Tile = React.createClass({

  propTypes: {
    contents: React.PropTypes.node,
    href: React.PropTypes.string,
    status: React.PropTypes.string,
    name: React.PropTypes.string,
    image: React.PropTypes.node,
    actions: React.PropTypes.array
  },

  render: function() {
    var classes = ["tile"];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var name = '';
    if (this.props.name) {
      name = (<div className="tile__name">{this.props.name}</div>);
    }

    var status = '';
    if (this.props.status) {
      status = (
        <StatusIcon className="tile--status"
          value={this.props.status.toLowerCase()} small={true} />
      );

      classes.push("tile--status-" + this.props.status.toLowerCase());
    }

    var contents;
    if (this.props.href) {
      contents = (
        <Link href={this.props.href}>
          {status}
          {name}
          {this.props.children}
        </Link>
      );
    } else {
      contents = [status, name, this.props.children];
    }

    var menu;
    if (this.props.actions) {
      menu = (<Menu items={this.props.actions} iconClass={MoreIcon} direction="up" />);
    }

    return (
      <div className={classes.join(' ')}>
        {contents}
        {menu}
      </div>
    );
  }

});

module.exports = Tile;
