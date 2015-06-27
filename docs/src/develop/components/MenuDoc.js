// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Menu = require('grommet/components/Menu');
var Edit = require('grommet/components/icons/Edit');
var Filter = require('grommet/components/icons/Filter');
var CheckBox = require('grommet/components/CheckBox');

var MenuDoc = React.createClass({

  render: function() {
    var inline =
    "<Menu>\n  <Link to={route}>{label}</Link>\n  ...\n</Menu>";
    return (
      <GrommetDocument flush={false}>
        <header>
          <h1>Menu</h1>
          <p>Presents a list of choices responsively.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>align      right|left</code></dt>
            <dd>Where to align the overlay.</dd>
            <dt><code>closeOnClick  true|false</code></dt>
            <dd>Indicates whether the opened menu drop down should close
            when clicked. Default is true.</dd>
            <dt><code>collapse      true|false</code></dt>
            <dd>Indicates that the menu should be collapsed and
              the default collapsed icon should be shown as a
              control to open it.</dd>
            <dt><code>direction  right|left|down|up</code></dt>
            <dd>Which direction the options should be laid out in.</dd>
            <dt><code>icon       {"{icon}"}</code></dt>
            <dd>Indicates that the menu should be collapsed and the
              icon shown as a control top open it.</dd>
            <dt><code>label      {"{text}"}</code></dt>
            <dd>Indicates that the menu should be collapsed and the
              label shown as a control top open it.</dd>
            <dt><code>small      true|false</code></dt>
            <dd>Indicates that the menu should be rendered in a small size.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>(down, inline)</h3>
          <div className="example">
            <Menu>
              <a href="#" className="active">First</a>
              <a href="#">Second</a>
              <a href="#">Third</a>
            </Menu>
          </div>
          <pre><code className="html">{"<Menu> ..."}</code></pre>

          <h3>right, (inline)</h3>
          <div className="example">
            <Menu direction="right">
              <a href="#" className="active">First</a>
              <a href="#">Second</a>
              <a href="#">Third</a>
            </Menu>
          </div>
          <pre><code className="html">{"<Menu direction=\"right\"> ..."}</code></pre>

          <h3>left, (inline)</h3>
          <div className="example">
            <Menu direction="left">
              <a href="#" className="active">First</a>
              <a href="#">Second</a>
              <a href="#">Third</a>
            </Menu>
          </div>
          <pre><code className="html">{"<Menu direction=\"left\"> ..."}</code></pre>

          <h3>label, (collapsed, down)</h3>
          <div className="example">
            <Menu label="Label">
              <a href="#" className="active">First</a>
              <a href="#">Second</a>
              <a href="#">Third</a>
            </Menu>
          </div>
          <pre><code className="html">{"<Menu label=\"Label\"> ..."}</code></pre>

          <h3>collapse, (icon, down)</h3>
          <div className="example">
            <Menu collapse={true}>
              <a href="#" className="active">First</a>
              <a href="#">Second</a>
              <a href="#">Third</a>
            </Menu>
          </div>
          <pre><code className="html">{"<Menu collapse={true}> ..."}</code></pre>

          <h3>icon, (collapse, down)</h3>
          <div className="example">
            <Menu icon={<Edit />}>
              <a href="#" className="active">First</a>
              <a href="#">Second</a>
              <a href="#">Third</a>
            </Menu>
          </div>
          <pre><code className="html">{"<Menu icon={<Grommet.Icons.Edit />}> ..."}</code></pre>

          <h3>icon, (collapse, down), do not close on click</h3>
          <div className="example">
            <Menu icon={<Filter />} closeOnClick={false}>
              <CheckBox label="first" />
              <CheckBox label="second" />
              <CheckBox label="third" />
            </Menu>
          </div>
          <pre><code className="html">{"<Menu icon={<Grommet.Icons.Filter />} closeOnClick={false}> ..."}</code></pre>

          <h3>collapse, up</h3>
          <div className="example">
            <Menu collapse={true} direction="up">
              <a href="#" className="active">First</a>
              <a href="#">Second</a>
              <a href="#">Third</a>
            </Menu>
          </div>
          <pre><code className="html">{"<Menu collapse={true} direction=\"up\"> ..."}</code></pre>

          <h3>collapse, small</h3>
          <div className="example">
            <Menu collapse={true} small={true}>
              <a href="#" className="active">First</a>
              <a href="#">Second</a>
              <a href="#">Third</a>
            </Menu>
          </div>
          <pre><code className="html">{"<Menu collapse={true} small={true}> ..."}</code></pre>

        </section>

      </GrommetDocument>
    );
  }
});

module.exports = MenuDoc;
