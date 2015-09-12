var React = require('react');
var DocsArticle = require('../../DocsArticle');
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');

var inline =
      "<App>\n" +
      "  ...\n" +
      "</App>";

var AppDoc = React.createClass({
  render: function() {
    return (
      <DocsArticle title="App" colorIndex="neutral-3">

        <p>Grommet main container, usually containing Header and Footer.</p>
        <pre><code className="html hljs xml">{inline}</code></pre>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>centered  true|false</code></dt>
            <dd>Whether to centralize or not the content inside the container. Default is true.</dd>
            <dt><code>inline  true|false</code></dt>
            <dd>Whether to render the app relative to the container (inline) or to the browser window. Default is false.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>App, header with title</h3>
          <div className="example">
            <App inline={true}>
              <Header>
                <Title>My App</Title>
              </Header>
            </App>
          </div>
          <pre><code className="html hljs xml">
            {"<App>\n  <Header>\n    <Title>\n      My App\n    </Title>\n  </Header>\n  ...\n</App>"}
          </code></pre>
        </section>

      </DocsArticle>
    );
  }
});

module.exports = AppDoc;
