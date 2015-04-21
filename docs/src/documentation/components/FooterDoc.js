// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Footer = require('grommet/components/Footer');
var Menu = require('grommet/components/Menu');

var FooterDoc = React.createClass({

  render: function() {
    var inline =
    "<Footer>\n  ...\n</Footer>";
    return (
      <GrommetDocument>
        <header>
          <h1>Footer</h1>
          <p>Put things at the bottom.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>centered    true|false</code></dt>
            <dd>Whether to center the content.</dd>
            <dt><code>colorIndex  {"{category}-{index}"}</code></dt>
            <dd>If specified, determines the background color.
              For example: <code>"neutral-1"</code></dd>
            <dt><code>primary     true|false</code></dt>
            <dd>Whether this is the primary application footer or not.</dd>
            <dt><code>scrollTop   true|false</code></dt>
            <dd>Whether to include a "scroll back to the top" control.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Dialog footer</h3>
          <div className="example">
            <Footer>
              <span></span>
              <Menu direction="right">
                <a>Cancel</a>
                <button className="primary">OK</button>
              </Menu>
            </Footer>
          </div>
          <pre><code className="html">{"<Footer> ..."}</code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = FooterDoc;
