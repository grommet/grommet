// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');

var ActionsDoc = React.createClass({
  render: function() {
    return (
      <Article primary={true}>
        <header>
          <h1>Actions</h1>
          <p>TBD</p>
        </header>

        <section>
          <h2>Example</h2>

          <div className="example">
          </div>
        </section>

        <section>
          <h2>Details</h2>
          <div className="tbd">TBD</div>
        </section>

      </Article>
    );
  }
});

module.exports = ActionsDoc;
