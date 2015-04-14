// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Menu = require('ligo/components/Menu');
var LigoDocument = require('ligo/components/Document');
var Edit = require('ligo/components/icons/Edit');

var MenuDoc = React.createClass({

  render: function() {
    var inline =
    "<Menu>\n  <Link to={route}>{label}</Link>\n  ...\n</Menu>";
    return (
      <LigoDocument>
        <header>
          <h1>Menu</h1>
          <p>Presents a list of choices responsively.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>accent  true|false</code></dt>
            <dd>Whether the Menu is included in an accented layout.
              In these cases, the background is an accent color.</dd>
            <dt><code>accentIndex  {"{n}"}</code></dt>
            <dd>Which accent color to use for header text.</dd>
            <dt><code>collapse  true|false</code></dt>
            <dd>Indicates that the menu should be collapsed and
              the default collapsed icon should be shown as a
              control to open it.</dd>
            <dt><code>direction  right|left|down|up</code></dt>
            <dd>Which direction the options should be laid out in.</dd>
            <dt><code>icon  {"{icon}"}</code></dt>
            <dd>Indicates that the menu should be collapsed and this
              icon shown as a control top open it.</dd>
            <dt><code>label  {"{text}"}</code></dt>
            <dd>Indicates that the menu should be collapsed and this
              label shown as a control top open it.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>(down, inline)</h3>
          <Menu>
            <a href="#" className="active">First</a>
            <a href="#">Second</a>
            <a href="#">Third</a>
          </Menu>
          <pre><code className="html">{"<Menu> ..."}</code></pre>

          <h3>right, (inline)</h3>
          <Menu direction="right">
            <a href="#" className="active">First</a>
            <a href="#">Second</a>
            <a href="#">Third</a>
          </Menu>
          <pre><code className="html">{"<Menu direction=\"right\"> ..."}</code></pre>

          <h3>left, (inline)</h3>
          <Menu direction="left">
            <a href="#" className="active">First</a>
            <a href="#">Second</a>
            <a href="#">Third</a>
          </Menu>
          <pre><code className="html">{"<Menu direction=\"left\"> ..."}</code></pre>

          <h3>label, (collapsed, down)</h3>
          <Menu label="Label">
            <a href="#" className="active">First</a>
            <a href="#">Second</a>
            <a href="#">Third</a>
          </Menu>
          <pre><code className="html">{"<Menu label=\"Label\"> ..."}</code></pre>

          <h3>collapse, (icon, down)</h3>
          <Menu collapse={true}>
            <a href="#" className="active">First</a>
            <a href="#">Second</a>
            <a href="#">Third</a>
          </Menu>
          <pre><code className="html">{"<Menu collapse={true}> ..."}</code></pre>

          <h3>icon, (collapse, down)</h3>
          <Menu icon={<Edit />}>
            <a href="#" className="active">First</a>
            <a href="#">Second</a>
            <a href="#">Third</a>
          </Menu>
          <pre><code className="html">{"<Menu icon={<Ligo.Icons.Edit />}> ..."}</code></pre>

          <h3>collapse, up</h3>
          <Menu collapse={true} direction="up">
            <a href="#" className="active">First</a>
            <a href="#">Second</a>
            <a href="#">Third</a>
          </Menu>
          <pre><code className="html">{"<Menu collapse={true} direction=\"up\"> ..."}</code></pre>

        </section>
      </LigoDocument>
    );
  }
});

module.exports = MenuDoc;
