// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var Article = require('grommet/components/Article');
var Menu = require('grommet/components/Menu');
var Edit = require('grommet/components/icons/Edit');
var Filter = require('grommet/components/icons/Filter');
var CheckBox = require('grommet/components/CheckBox');

var MenuDoc = React.createClass({

  render: function() {
    var inline =
    "<Menu>\n  <Link to={route}>{label}</Link>\n  ...\n</Menu>";
    return (
      <Article>
        <header>
          <h1>Menu</h1>
          <p>Presents a list of choices responsively.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>closeOnClick  true|false</code></dt>
            <dd>Indicates whether the opened menu drop down should close
            when clicked. Default is true.</dd>
            <dt><code>collapse      true|false</code></dt>
            <dd>Indicates that the menu should be collapsed and
              the default collapsed icon should be shown as a
              control to open it.</dd>
            <dt><code>dropAlign     {"{left: left|right, right: left|right, top: top|bottom, bottom: top|bottom}"}</code></dt>
            <dd>Where to place the drop down.
              At most one of left or right and one of top or bottom should be specified.</dd>
            <dt><code>icon          {"{icon}"}</code></dt>
            <dd>Indicates that the menu should be collapsed and the
              icon shown as a control top open it.</dd>
            <dt><code>label         {"{text}"}</code></dt>
            <dd>Indicates that the menu should be collapsed and the
              label shown as a control top open it.</dd>
            <dt><code>small         true|false</code></dt>
            <dd>Indicates that the menu should be rendered in a small size.</dd>
          </dl>
          <p>Options for <Link to="develop_box">Box</Link> area also available.</p>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>(column, inline)</h3>
          <div className="example">
            <Menu>
              <a href="#" className="active">First</a>
              <a href="#">Second</a>
              <a href="#">Third</a>
            </Menu>
          </div>
          <pre><code className="html">{"<Menu> ..."}</code></pre>

          <h3>row, (inline)</h3>
          <div className="example">
            <Menu direction="row">
              <a href="#" className="active">First</a>
              <a href="#">Second</a>
              <a href="#">Third</a>
            </Menu>
          </div>
          <pre><code className="html">{"<Menu direction=\"right\"> ..."}</code></pre>

          <h3>row, end, (inline)</h3>
          <div className="example">
            <Menu direction="row" justify="end">
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
              <CheckBox id="check-1" label="first" />
              <CheckBox id="check-2" label="second" />
              <CheckBox id="check-3" label="third" />
            </Menu>
          </div>
          <pre><code className="html">{"<Menu icon={<Grommet.Icons.Filter />} closeOnClick={false}> ..."}</code></pre>

          <h3>collapse, up</h3>
          <div className="example">
            <Menu collapse={true} dropAlign={{bottom: "bottom"}}>
              <a href="#" className="active">First</a>
              <a href="#">Second</a>
              <a href="#">Third</a>
            </Menu>
          </div>
          <pre><code className="html">{"<Menu collapse={true} dropAlign={{bottom: \"bottom\"}}> ..."}</code></pre>

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

      </Article>
    );
  }
});

module.exports = MenuDoc;
