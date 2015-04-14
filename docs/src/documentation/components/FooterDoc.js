// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Ligo = require('ligo');
var Footer = Ligo.Footer;

var FooterDoc = React.createClass({

  render: function() {
    var inline =
    "<Footer>\n  ...\n</Footer>";
    return (
      <Ligo.Document>
        <header>
          <h1>Footer</h1>
          <p>Put things at the bottom.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>centerColumn  true|false</code></dt>
            <dd>Indicates that the contents should be constrained
              horizontally for a center column application.</dd>
            <dt><code>primary  true|false</code></dt>
            <dd>Whether this is the primary application footer or not.</dd>
            <dt><code>scrollTop  true|false</code></dt>
            <dd>Whether to include a "scroll back to the top" control.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Dialog footer</h3>
          <div className="example">
            <Footer>
              <span></span>
              <button>OK</button>
            </Footer>
          </div>
          <pre><code className="html">{"<Footer> ..."}</code></pre>

        </section>
      </Ligo.Document>
    );
  }
});

module.exports = FooterDoc;
