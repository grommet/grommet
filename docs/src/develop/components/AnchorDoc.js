// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var Section = require('grommet/components/Section');
var Anchor = require('grommet/components/Anchor');

var AnchorDoc = React.createClass({

  _onClick: function () {
    // no-op
  },

  render: function() {
    var inline = [
      "<Anchor href=\"...\">label</Anchor"
    ].join("\n");
    return (
      <Article primary={true}>
        <header>
          <h1>Anchor</h1>
          <p>A button. We have a separate component from the
          browser base so we can style it.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
          <dt><code>href           {"{location}"}</code></dt>
          <dd>Hyperlink reference to place in the anchor.</dd>
          <dt><code>target         {"{location}"}</code></dt>
          <dd>Target of the link, examples targets=_blank|_self|_parent|_top|framename.</dd>
          <dt><code>onClick        {"{func}"}</code></dt>
          <dd>Click handler.</dd>
          <dt><code>primary        true|false</code></dt>
          <dd>Whether this is a primary anchor.</dd>
          </dl>
        </section>

        <section>
          <h2>Example</h2>

          <h3>Default</h3>
          <div className="example">
            <Anchor href="" onClick={this._onClick}>Text</Anchor>
          </div>
          <pre><code className="html">{"<Anchor href=\"\" onClick={this._onClick}>Text</Anchor>"}</code></pre>

          <h3>Primary</h3>
          <div className="example">
            <Anchor href="" primary={true} onClick={this._onClick}>Text</Anchor>
          </div>
          <pre><code className="html">{"<Anchor href=\"\" primary={true} onClick={this._onClick}>Text</Anchor>"}</code></pre>

          <h3>Target</h3>
          <div className="example">
            <Anchor href="" target="_blank" onClick={this._onClick}>Text</Anchor>
          </div>
          <pre><code className="html">{"<Anchor href=\"\" target=\"_blank\" onClick={this._onClick}>Text</Anchor>"}</code></pre>

        </section>

        <Section colorIndex="neutral-1" pad="medium">
          <h3>Colored context</h3>
          <div className="example">
            <Anchor href="" onClick={this._onClick}>Text</Anchor>
          </div>
          <div className="example">
            <Anchor href="" primary={true} onClick={this._onClick}>Text</Anchor>
          </div>
        </Section>

      </Article>
    );
  }
});

module.exports = AnchorDoc;
