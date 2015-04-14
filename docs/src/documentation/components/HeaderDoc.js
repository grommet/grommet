// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var LigoDocument = require('ligo/components/Document');
var Menu = require('ligo/components/Menu');
var Header = require('ligo/components/Header');
var LigoTBD = require('ligo/components/TBD');

var HeaderDoc = React.createClass({

  render: function() {
    var inline =
    "<Header>\n  <Link to={route}>{label}</Link>\n  ...\n</Header>";
    return (
      <LigoDocument>
        <header>
          <h1>Header</h1>
          <p>Combines Title and Menu elements responsively.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>centerColumn  true|false</code></dt>
            <dd>Indicates that the contents should be constrained
              horizontally for a center column application.</dd>
            <dt><code>primary  true|false</code></dt>
            <dd>Whether this is the primary application header or not.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Title and inline Menu</h3>
          <Header>
            <h2>Title</h2>
            <Menu direction="left">
              <a href="#" className="active">First</a>
              <a href="#">Second</a>
              <a href="#">Third</a>
            </Menu>
          </Header>
          <pre><code className="html">{"<Header> ..."}</code></pre>

          <h3>Title and icon Menu</h3>
          <Header>
            <h2>Title</h2>
            <Menu collapse={true}>
              <a href="#" className="active">First</a>
              <a href="#">Second</a>
              <a href="#">Third</a>
            </Menu>
          </Header>
          <pre><code className="html">{"<Header> ..."}</code></pre>

          <h3>Title menu and icon Menu</h3>
          <LigoTBD />

        </section>
      </LigoDocument>
    );
  }
});

module.exports = HeaderDoc;
