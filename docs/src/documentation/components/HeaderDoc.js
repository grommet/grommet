// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Menu = require('grommet/components/Menu');
var Search = require('grommet/components/Search');
var Header = require('grommet/components/Header');
var TBD = require('grommet/components/TBD');
var Logo = require('../../Logo');

var HeaderDoc = React.createClass({

  render: function() {
    var inline =
    "<Header>\n  <Link to={route}>{label}</Link>\n  ...\n</Header>";
    return (
      <GrommetDocument>
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

          <h3>Title, inline Menu, and Search</h3>
          <div className="example">
            <Header>
              <h2>Title</h2>
              <div>
                <Menu direction="left">
                  <a href="#" className="active">First</a>
                  <a href="#">Second</a>
                  <a href="#">Third</a>
                </Menu>
                <Search direction="left" />
              </div>
            </Header>
          </div>
          <pre><code className="html">{"<Header> ..."}</code></pre>

          <h3>Logo, title and icon Menu</h3>
          <div className="example">
            <Header>
              <h2><Logo /> Title</h2>
              <Menu collapse={true}>
                <a href="#" className="active">First</a>
                <a href="#">Second</a>
                <a href="#">Third</a>
              </Menu>
            </Header>
          </div>
          <pre><code className="html">{"<Header> ..."}</code></pre>

          <h3>Title menu and icon Menu</h3>
          <TBD />

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = HeaderDoc;
