// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Close = require('./Close');

var Details = React.createClass({

  render: function() {
    return (
      <div className={"details"}>
        <div className={"details__header"}>
          <div className={"details__close"} onClick={this.props.onClose}>
            <Close />
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Details;
