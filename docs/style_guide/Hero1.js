// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var World = require('./World');

var Hero1 = React.createClass({

  render: function() {
    return (
      <div className={"hero hero--1 layout layout--flush"}>
        <World className={"hero__world layout__item one-quarter pr"} />
        <div className={"hero__text layout__item three-quarters palm-one-whole"}>
          <h1>Good design makes a product useful</h1>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nunc odio.</h2>
        </div>
      </div>
    );
  }

});

module.exports = Hero1;
