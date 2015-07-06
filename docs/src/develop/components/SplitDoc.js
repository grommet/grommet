var React = require('react');
var Article = require('grommet/components/Article');
var Split = require('grommet/components/Split');

var inline =
      "<Split>\n" +
      "  ...\n" +
      "</Split>";

var SplitDoc = React.createClass({
  render: function() {
    return (
      <Article>
        <header>
          <h1>Split</h1>
          <p>A full height container with two children laid out horizontally.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>flex      both|left|right</code></dt>
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
              <p>Sample Content One</p>
              <p>Sample Content Two</p>
            </Split>
          </div>
          <pre><code className="html">
            {"<Split>\n  <p>\n    Sample Content One\n  </p>\n</Split>"}
          </code></pre>

        </section>

      </Article>
    );
  }
});

module.exports = SplitDoc;
