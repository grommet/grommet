var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Status = require('grommet/components/icons/Status');

var inline =
      "<Status value=\"...\" />";

var StatusDoc = React.createClass({
  render: function() {
    return (
      <GrommetDocument>
        <header>
          <h1>Status</h1>
          <p>A status icon.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>large       true|false</code></dt>
            <dd>Larger sized version.</dd>
            <dt><code>small       true|false</code></dt>
            <dd>Smaller sized version.</dd>
            <dt><code>value       error|warning|ok|disabled|unknown</code></dt>
            <dd>Which status to indicate.</dd>
          </dl>
        </section>

        <section>
          <h2>Example</h2>

          <h3>OK</h3>
          <div className="example">
            <Status value="ok"/>
          </div>
          <pre><code className="html">
            {"<Status value=\"ok\">"}
          </code></pre>

          <h3>Error</h3>
          <div className="example">
            <Status value="error"/>
          </div>
          <pre><code className="html">
            {"<Status value=\"error\">"}
          </code></pre>

          <h3>Warning</h3>
          <div className="example">
            <Status value="warning"/>
          </div>
          <pre><code className="html">
            {"<Status value=\"warning\">"}
          </code></pre>

          <h3>Disabled</h3>
          <div className="example">
            <Status value="disabled"/>
          </div>
          <pre><code className="html">
            {"<Status value=\"disabled\">"}
          </code></pre>

          <h3>Unknown</h3>
          <div className="example">
            <Status value="unknown"/>
          </div>
          <pre><code className="html">
            {"<Status value=\"unknown\">"}
          </code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = StatusDoc;
