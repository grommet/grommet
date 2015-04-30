// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Menu = require('grommet/components/Menu');
var Search = require('grommet/components/Search');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Edit = require('grommet/components/icons/Edit');
var Logo = require('../../img/Logo');

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
            <dt><code>colorIndex  {"{category}-{index}"}</code></dt>
            <dd>If specified, determines the background color.
              For example: <code>"neutral-1"</code></dd>
            <dt><code>flush       true|false</code></dt>
            <dd>Whether the contents are flush with the left and right edges or not.
              Defaults to true.</dd>
            <dt><code>primary     true|false</code></dt>
            <dd>Whether this is the primary application header or not.</dd>
            <dt><code>large       true|false</code></dt>
            <dd>Larger sized version.</dd>
            <dt><code>small       true|false</code></dt>
            <dd>Smaller sized version.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Title and Search</h3>
          <div className="example">
            <Header>
              <h2>Title</h2>
              <Search align="right" />
            </Header>
          </div>
          <pre><code className="html">{"<Header> ..."}</code></pre>

          <h3>Title, inline Menu, and Search</h3>
          <div className="example">
            <Header>
              <h3>Title</h3>
              <div>
                <Menu direction="left">
                  <a href="#" className="active">First</a>
                  <a href="#">Second</a>
                  <a href="#">Third</a>
                  <Search align="right" />
                </Menu>
              </div>
            </Header>
          </div>
          <pre><code className="html">{"<Header> ..."}</code></pre>

          <h3>Logo, title and icon Menu</h3>
          <div className="example">
            <Header>
              <h2><Logo /> Title</h2>
              <Menu icon={<Edit />} align="right">
                <a href="#" className="active">First</a>
                <a href="#">Second</a>
                <a href="#">Third</a>
              </Menu>
            </Header>
          </div>
          <pre><code className="html">{"<Header> ..."}</code></pre>

          <h3>Large</h3>
          <div className="example">
            <Header large={true}>
              <h1><Logo /> Title</h1>
              <Menu icon={<Edit />} align="right">
                <a href="#" className="active">First</a>
                <a href="#">Second</a>
                <a href="#">Third</a>
              </Menu>
            </Header>
          </div>
          <pre><code className="html">{"<Header large={true}> ..."}</code></pre>

          <h3>Small</h3>
          <div className="example">
            <Header small={true}>
              <h3><Logo /> Title</h3>
              <Menu icon={<Edit />} align="right">
                <a href="#" className="active">First</a>
                <a href="#">Second</a>
                <a href="#">Third</a>
              </Menu>
            </Header>
          </div>
          <pre><code className="html">{"<Header small={true}> ..."}</code></pre>

          <h3>Title menu and icon Menu</h3>
          <div className="example">
            <Header large={true}>
              <Title onClick={function () {}}><Logo /> Title</Title>
              <Menu icon={<Edit />} align="right">
                <a href="#" className="active">First</a>
                <a href="#">Second</a>
                <a href="#">Third</a>
              </Menu>
            </Header>
          </div>
          <pre><code className="html">{"<Header large={true}> ..."}</code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = HeaderDoc;
