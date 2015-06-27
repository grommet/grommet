var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Sidebar = require('grommet/components/Sidebar');

var inline =
      "<Sidebar>\n" +
      "  ...\n" +
      "</Sidebar>";

var SidebarDoc = React.createClass({
  render: function() {
    return (
      <GrommetDocument flush={false}>
        <header>
          <h1>Sidebar</h1>
          <p>A full height, fixed width container.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>primary  true|false</code></dt>
            <dd>Whether this is the primary application sidebar or not.</dd>
          </dl>
        </section>

        <section>
          <h2>Example</h2>

          <div className="example">
            <Sidebar primary={true}>
              <p>Sample Content</p>
            </Sidebar>
          </div>
          <pre><code className="html">
            {"<Sidebar primary={true}>\n  <p>\n    Sample Content One\n  </p>\n</Sidebar>"}
          </code></pre>

        </section>

      </GrommetDocument>
    );
  }
});

module.exports = SidebarDoc;
