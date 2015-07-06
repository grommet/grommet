var React = require('react');
var Article = require('grommet/components/Article');
var Title = require('grommet/components/Title');

var inline =
      "<Title>\n" +
      "  ...\n" +
      "</Title>";

var TitleDoc = React.createClass({
  render: function() {
    return (
      <Article>
        <header>
          <h1>Title</h1>
          <p>Title component usually rendered inside the Header.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>nav  component</code></dt>
            <dd>Optionally add a Nav component that will render the Menu for the app.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Title, simple</h3>
          <div className="example">
            <Title>Sample Title</Title>
          </div>
          <pre><code className="html">
            {"<Title>\n  Sample Title\n</Title>"}
          </code></pre>
        </section>

      </Article>
    );
  }
});

module.exports = TitleDoc;
