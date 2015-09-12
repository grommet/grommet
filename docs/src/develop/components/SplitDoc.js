var React = require('react');
var DocsArticle = require('../../DocsArticle');
var Split = require('grommet/components/Split');
var Header = require('grommet/components/Header');
var Section = require('grommet/components/Section');

var inline =
      "<Split>\n" +
      "  ...\n" +
      "</Split>";

var SplitDoc = React.createClass({
  render: function() {
    return (
      <DocsArticle title="Split" colorIndex="neutral-3">

        <p>A full height container with two children laid out horizontally.</p>
        <pre><code className="html hljs xml">{inline}</code></pre>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>fixed      true|false</code></dt>
            <dd>Whether each side should scroll independently.</dd>
            <dt><code>flex       both|left|right</code></dt>
            <dd>Which side to give flexible space to.
              The default value is 'both'.</dd>
            <dt><code>separator  true|false</code></dt>
            <dd>Whether to include a separator between the children.</dd>
          </dl>
        </section>

        <section>
          <h2>Example</h2>

          <div className="example">
            <Split>
              <div>
                <Header colorIndex="neutral-1" pad={{horizontal: 'medium'}}>Header One</Header>
                <Section>Content</Section>
              </div>
              <div>
                <Header colorIndex="neutral-2" pad={{horizontal: 'medium'}}>Header Two</Header>
                <Section>Content</Section>
              </div>
            </Split>
          </div>
          <pre><code className="html hljs xml">
            {"<Split>\n  <p>\n    Sample Content One\n  </p>\n</Split>"}
          </code></pre>

        </section>

      </DocsArticle>
    );
  }
});

module.exports = SplitDoc;
