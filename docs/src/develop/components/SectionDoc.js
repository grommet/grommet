var React = require('react');
var Link = require('react-router').Link;
var DocsArticle = require('../../DocsArticle');
var Section = require('grommet/components/Section');
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');

var inline =
      "<Section>\n" +
      "  ...\n" +
      "</Section>";

var SectionDoc = React.createClass({
  render: function() {
    return (
      <DocsArticle title="Section" colorIndex="neutral-3">

        <p>Responsively grouping related contents inside a page.</p>
        <pre><code className="html hljs xml">{inline}</code></pre>

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

          <div className="example">
            <Section>
              <Header>
                <h3>Sample Content</h3>
                <Menu direction="row">
                  <span>Link 1</span>
                  <span>Link 2</span>
                </Menu>
              </Header>
              <p>Lorem ipsum ...
              </p>
            </Section>
          </div>
          <pre><code className="html hljs xml">
            {"<Section>\n  <Header>\n    <h3>Sample Content</h3>\n    <Menu direction=\"row\">\n      ...\n    </Menu>\n  </Header>\n  <p>\n    Lorem ipsum ...\n  </p>\n</Section>"}
          </code></pre>
        </section>

      </DocsArticle>
    );
  }
});

module.exports = SectionDoc;
