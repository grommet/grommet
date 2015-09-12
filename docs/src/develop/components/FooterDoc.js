// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var DocsArticle = require('../../DocsArticle');
var Footer = require('grommet/components/Footer');
var Menu = require('grommet/components/Menu');
var Button = require('grommet/components/Button');

var FooterDoc = React.createClass({

  _onClick: function () {
    // no-op
  },

  render: function() {
    var inline =
    "<Footer>\n  ...\n</Footer>";
    return (
      <DocsArticle title="Footer" colorIndex="neutral-3">

        <p>Put things at the bottom.</p>
        <pre><code className="html hljs xml">{inline}</code></pre>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>large       true|false</code></dt>
            <dd>Larger sized version.</dd>
            <dt><code>small       true|false</code></dt>
            <dd>Smaller sized version.</dd>
          </dl>
          <p>Options for <Link to="develop_box">Box</Link> area also available.</p>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Form footer</h3>
          <div className="example">
            <Footer>
              <Menu direction="row">
                <Button label="OK" primary={true} onClick={this._onClick} />
                <Button label="Cancel" onClick={this._onClick} />
              </Menu>
            </Footer>
          </div>
          <pre><code className="html hljs xml">{"<Footer> ..."}</code></pre>

          <h3>Form footer right</h3>
          <div className="example">
            <Footer justify="end">
              <Menu direction="row" justify="end">
                <Button label="Cancel" onClick={this._onClick} />
                <Button label="OK" primary={true} onClick={this._onClick} />
              </Menu>
            </Footer>
          </div>
          <pre><code className="html hljs xml">{"<Footer justify=\"end\"> ..."}</code></pre>

        </section>

      </DocsArticle>
    );
  }
});

module.exports = FooterDoc;
