var React = require('react');
var DocsArticle = require('../../DocsArticle');
var Sidebar = require('grommet/components/Sidebar');

var inline =
      "<Sidebar>\n" +
      "  ...\n" +
      "</Sidebar>";

var SidebarDoc = React.createClass({
  render: function() {
    return (
      <DocsArticle title="Sidebar" colorIndex="neutral-3">

        <p>A full height, fixed width container.</p>
        <pre><code className="html hljs xml">{inline}</code></pre>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>fixed      true|false</code></dt>
            <dd>Whether any contained Header and Footer should be fixed to
              the top and bottom.</dd>
            <dt><code>primary    true|false</code></dt>
            <dd>Whether this is the primary application sidebar or not.</dd>
            <dt><code>size       small|medium|large</code></dt>
            <dd>The size of the Sidebar. Defaults to <code>medium</code>.</dd>
            <dt><code>small      true|false</code></dt>
            <dd>Smaller sized version. Deprecated, use <code>size</code>.</dd>
          </dl>
        </section>

        <section>
          <h2>Example</h2>

          <div className="example">
            <Sidebar primary={true}>
              <p>Sample Content One</p>
            </Sidebar>
          </div>
          <pre><code className="html hljs xml">
            {"<Sidebar primary={true}>\n  <p>\n    Sample Content One\n  </p>\n</Sidebar>"}
          </code></pre>

        </section>

      </DocsArticle>
    );
  }
});

module.exports = SidebarDoc;
