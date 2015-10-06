var React = require('react');
var Link = require('react-router').Link;
var DocsArticle = require('../../DocsArticle');
var Sidebar = require('grommet/components/Sidebar');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var Anchor = require('grommet/components/Anchor');

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
            <dd>Whether this is the primary application sidebar or not.
              Deprecated, use <Link to="develop_box">Box colorIndex</Link>.</dd>
            <dt><code>size       small|medium|large</code></dt>
            <dd>The size of the Sidebar. Defaults to <code>medium</code>.</dd>
            <dt><code>small      true|false</code></dt>
            <dd>Smaller sized version. Deprecated, use <code>size</code>.</dd>
          </dl>
          <p>Options for <Link to="develop_box">Box</Link> area also available.</p>
        </section>

        <section>
          <h2>Example</h2>

          <div className="example">
            <Sidebar colorIndex="light-1">
              <Header pad="medium">
                <Title>Title</Title>
              </Header>
              <Menu pad="medium">
                <Anchor>Sample Content One</Anchor>
              </Menu>
            </Sidebar>
          </div>
          <pre><code className="html hljs xml">
            {"<Sidebar colorIndex=\"light-1\">\n  <p>\n    Sample Content One\n  </p>\n</Sidebar>"}
          </code></pre>

        </section>

      </DocsArticle>
    );
  }
});

module.exports = SidebarDoc;
