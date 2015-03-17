// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Home = React.createClass({

  render: function() {
    return (
      <div className={"home"} onWheel={this._onWheel}>

      </div>
    );
  }

});

module.exports = Home;
