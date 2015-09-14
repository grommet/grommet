// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var DocsArticle = require('../../DocsArticle');
var Article = require('grommet/components/Article');
var Header = require('grommet/components/Header');
var Section = require('grommet/components/Section');

var ArticleDoc = React.createClass({

  render: function() {
    var inline = [
      "<Article>",
      "  <Header>",
      "    <h1>{title}</h1>",
      "  </Header>",
      "  <Section>",
      "    <h2>{header}</h2>",
      "    <p>{content}</p>",
      "  </Section>",
      "</Article>"
    ].join('\n');

    return (
      <DocsArticle title="Article" colorIndex="neutral-3">

        <p>Styles standard HTML5 markup for use in articles.</p>
        <pre><code className="html hljs xml">{inline}</code></pre>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>primary      true|false</code></dt>
            <dd>Whether it should be treated as main content or not. Used for Accessibility.</dd>
          </dl>
          <p>Options for <Link to="develop_box">Box</Link> area also available.</p>
        </section>

        <section>
          <h2>Example</h2>

          <div className="example">
            <Article>
              <Header>
                <h1>Title</h1>
              </Header>
              <Section>
                <h2>Heading</h2>
                <p>Lorem ipsum ...</p>
              </Section>
            </Article>
          </div>

        </section>

      </DocsArticle>
    );
  }
});

module.exports = ArticleDoc;
