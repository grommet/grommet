// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var RouterState = require('react-router').State;

var Book = React.createClass({

  mixins: [RouterState],

  _selfOrChildActive: function (item) {
    var result = this.isActive(item.route);
    if (! result && item.hasOwnProperty('contents')) {
      result = item.contents.some(function (item) {
        return this._selfOrChildActive(item);
      }, this);
    }
    return result;
  },

  _renderContents: function (contents) {
    var items = contents.map(function (item) {
      var classes = ["book__outline-item"];
      if (this._selfOrChildActive(item)) {
        classes.push("book__outline-item--active");
      }
      var itemContents = '';
      if (item.hasOwnProperty('contents')) {
        itemContents = this._renderContents(item.contents);
      }
      return (
        <li key={item.route} className={classes.join(' ')}>
          <Link to={item.route}>{item.label}</Link>
          {itemContents}
        </li>
      );
    }, this);

    return (
      <ol className={"book__outline-items list-bare"}>
        {items}
      </ol>
    );
  },

  render: function() {
    return (
      <div className={"book"}>
        <div className={"book__outline"}>
          {this._renderContents(this.props.contents)}
        </div>
        <div className={"book__content"}>
          <RouteHandler />
        </div>
      </div>
    );
  }

});

module.exports = Book;
