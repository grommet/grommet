var React = require('react');
var Link = require('react-router').Link;
var Article = require('grommet/components/Article');
var Section = require('grommet/components/Section');
var Menu = require('grommet/components/Menu');

var inline =
      "<Section>\n" +
      "  ...\n" +
      "</Section>";

var SectionDoc = React.createClass({
  render: function() {
    return (
      <Article primary={true}>
        <header>
          <h1>Section</h1>
          <p>Responsively grouping related contents inside a page.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>primary      true|false</code></dt>
            <dd>Whether it should be treated as main content or not. Used for Accessibility.</dd>
          </dl>
          <p>Options for <Link to="develop_box">Box</Link> are also available.</p>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Menu and Document</h3>
          <div className="example">
            <Section direction="right">
              <Menu>
                <span>Link 1</span>
                <span>Link 2</span>
              </Menu>
              <Article>
                <h2>Sample Content</h2>
              </Article>
            </Section>
          </div>
          <pre><code className="html">
            {"<Section direction=\"right\">\n  <Menu>\n    ...\n  </Menu>\n  <Document>\n    <h2>\n      Sample Content\n    </h2>\n  </Document>\n</Section>"}
          </code></pre>
        </section>

      </Article>
    );
  }
});

module.exports = SectionDoc;
