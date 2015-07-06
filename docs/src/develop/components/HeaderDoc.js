// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var Article = require('grommet/components/Article');
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var Search = require('grommet/components/Search');
var Title = require('grommet/components/Title');
var Edit = require('grommet/components/icons/Edit');
var Logo = require('../../img/Logo');

var HeaderDoc = React.createClass({

  render: function() {
    var inline =
    "<Header>\n  <Link to={route}>{label}</Link>\n  ...\n</Header>";
    return (
      <Article>
        <header>
          <h1>Header</h1>
          <p>Combines Title and Menu elements responsively.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>fixed       true|false</code></dt>
            <dd>Whether the header is fixed on the page, typically so content
              below it will scroll under it.</dd>
            <dt><code>float       true|false</code></dt>
            <dd>Whether the header floats above content underneath it.</dd>
            <dt><code>large       true|false</code></dt>
            <dd>Larger sized version.</dd>
            <dt><code>small       true|false</code></dt>
            <dd>Smaller sized version.</dd>
            <dt><code>splash      true|false</code></dt>
            <dd>Whether to render it in a style suitable for a splash screen.</dd>
          </dl>
          <p>Options for <Link to="develop_box">Box</Link> area also available.</p>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Title and Search</h3>
          <div className="example">
            <Header>
              <Title>Title</Title>
              <Search inline={true} />
            </Header>
          </div>
          <pre><code className="html">{"<Header> ..."}</code></pre>

          <h3>Title, inline Menu, and Search</h3>
          <div className="example">
            <Header justify="between">
              <Title>Title</Title>
              <Menu direction="row" align="center" responsive={false}>
                <a href="#" className="active">First</a>
                <a href="#">Second</a>
                <a href="#">Third</a>
                <Search dropAlign={{right: "right"}} />
              </Menu>
            </Header>
          </div>
          <pre><code className="html">{"<Header> ..."}</code></pre>

          <h3>Logo, title and icon Menu</h3>
          <div className="example">
            <Header justify="between">
              <Title><Logo /> Title</Title>
              <Menu icon={<Edit />} dropAlign={{right: "right"}}>
                <a href="#" className="active">First</a>
                <a href="#">Second</a>
                <a href="#">Third</a>
              </Menu>
            </Header>
          </div>
          <pre><code className="html">{"<Header> ..."}</code></pre>

          <h3>Large</h3>
          <div className="example">
            <Header large={true} justify="between">
              <Title><Logo /> Title</Title>
              <Menu icon={<Edit />} dropAlign={{right: "right"}}>
                <a href="#" className="active">First</a>
                <a href="#">Second</a>
                <a href="#">Third</a>
              </Menu>
            </Header>
          </div>
          <pre><code className="html">{"<Header large={true}> ..."}</code></pre>

          <h3>Small</h3>
          <div className="example">
            <Header small={true} justify="between">
              <Title><Logo /> Title</Title>
              <Menu icon={<Edit />} dropAlign={{right: "right"}}>
                <a href="#" className="active">First</a>
                <a href="#">Second</a>
                <a href="#">Third</a>
              </Menu>
            </Header>
          </div>
          <pre><code className="html">{"<Header small={true}> ..."}</code></pre>

          <h3>Title menu and icon Menu</h3>
          <div className="example">
            <Header large={true} justify="between">
              <Title onClick={function () {}}><Logo /> Title</Title>
              <Menu icon={<Edit />} dropAlign={{right: "right"}}>
                <a href="#" className="active">First</a>
                <a href="#">Second</a>
                <a href="#">Third</a>
              </Menu>
            </Header>
          </div>
          <pre><code className="html">{"<Header large={true}> ..."}</code></pre>

        </section>

      </Article>
    );
  }
});

module.exports = HeaderDoc;
