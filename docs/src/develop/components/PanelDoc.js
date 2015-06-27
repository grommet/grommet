var React = require('react');
var GrommetDocument = require('grommet/components/Document');

var PanelDoc = React.createClass({
  render: function() {
    return (
      <GrommetDocument flush={false}>
        <header>
          <h1>Panel</h1>
        </header>

        <section>
          <p>NOTE: This component is deprecated and will be removed soon.</p>
          <p>A rectangular container with a set of related contents inside.</p>
        </section>

      </GrommetDocument>
    );
  }
});

module.exports = PanelDoc;
