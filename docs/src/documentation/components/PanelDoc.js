var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Panel = require('grommet/components/Panel');

var inline =
      "<Panel>\n" +
      "  ...\n" +
      "</Panel>";

var PanelDoc = React.createClass({
  render: function() {
    return (
      <GrommetDocument>
        <header>
          <h1>Panel</h1>
          <p>A rectangular container with a set of related contents inside.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Examples</h2>

          <h3>Simple Panel</h3>
          <div className="example">
            <Panel title="Panel One">
              <p>Sample Content One</p>
            </Panel>
          </div>
          <pre><code className="html">
            {"<Panel title=\"Panel One\">\n  <p>\n    Sample Content One\n  </p>\n</Panel>"}
          </code></pre>
        </section>  
      </GrommetDocument>
    );
  }
});

module.exports = PanelDoc;