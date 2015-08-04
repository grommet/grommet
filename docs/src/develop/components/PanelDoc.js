var React = require('react');
var Article = require('grommet/components/Article');

var PanelDoc = React.createClass({
  render: function() {
    return (
      <Article primary={true}>
        <header>
          <h1>Panel</h1>
        </header>

        <section>
          <p>NOTE: This component is deprecated and will be removed soon.</p>
          <p>A rectangular container with a set of related contents inside.</p>
        </section>

      </Article>
    );
  }
});

module.exports = PanelDoc;
