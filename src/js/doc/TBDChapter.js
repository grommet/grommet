// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Chapter = require('./Chapter');

var TBDChapter = React.createClass({

  render: function() {
    return (
      <Chapter>
        <section>
          <h1>TBD</h1>

          <p>Lorem ipsum...</p>

        </section>

      </Chapter>
    );
  }

});

module.exports = TBDChapter;
