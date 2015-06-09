// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Button = require('grommet/components/Button');

var ButtonDoc = React.createClass({

  _onClick: function () {
    // no-op
  },

  render: function() {
    var inline = [
      "<Button label=\"Item 1\">"
    ].join("\n");
    return (
      <GrommetDocument>
        <header>
          <h1>Button</h1>
          <p>A button. We have a separate component from the
          browser base so we can style it.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
          <dt><code>checked         true|false</code></dt>
          <dd>Same as React {"<input checked= >"}.</dd>
          <dt><code>defaultChecked  true|false</code></dt>
          <dd>Same as React {"<input defaultChecked= >"}.</dd>
          <dt><code>id              {"{text}"}</code></dt>
          <dd>The DOM id attribute value to use for the underlying
            {"<input>"} element.</dd>
          <dt><code>label           {"{text}"}</code></dt>
          <dd>Label text to place next to the control.</dd>
          <dt><code>name            {"{text}"}</code></dt>
          <dd>The DOM name attribute value to use for the underlying
            {"<input>"} element.</dd>
          <dt><code>onChange        {"{func}"}</code></dt>
          <dd>Same as React {"<input onChange= >"}.</dd>
          <dt><code>toggle         true|false</code></dt>
          <dd>Whether to visualize it as a toggle switch.</dd>
          </dl>
        </section>

        <section>
          <h2>Example</h2>

          <h3>Basic</h3>
          <div className="example">
            <Button label="Action" onClick={this._onClick} />
          </div>
          <pre><code className="html">{"<Button label=\"Action\" onClick={...} />"}</code></pre>

          <h3>Primary</h3>
          <div className="example">
            <Button label="Action" primary={true} onClick={this._onClick} />
          </div>
          <pre><code className="html">{"<Button label=\"Action\" primary={true} onClick={...} />"}</code></pre>

          <h3>Alternate</h3>
          <div className="example">
            <Button label="Action" alternate={true} onClick={this._onClick} />
          </div>
          <pre><code className="html">{"<Button label=\"Action\" alternate={true} onClick={...} />"}</code></pre>

          <h3>Primary, Strong</h3>
          <div className="example">
            <Button label="Action" primary={true} strong={true} onClick={this._onClick} />
          </div>
          <pre><code className="html">{"<Button label=\"Action\" primary={true} strong={true} onClick={...} />"}</code></pre>

          <h3>Small</h3>
          <div className="example">
            <Button label="Action" small={true} onClick={this._onClick} />
          </div>
          <pre><code className="html">{"<Button label=\"Action\" small={true} onClick={...} />"}</code></pre>

          <h3>Large</h3>
          <div className="example">
            <Button label="Action" large={true} onClick={this._onClick} />
          </div>
          <pre><code className="html">{"<Button label=\"Action\" large={true} onClick={...} />"}</code></pre>

          <h3>Disabled</h3>
          <div className="example">
            <Button label="Action" />
          </div>
          <pre><code className="html">{"<Button label=\"Action\" />"}</code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = ButtonDoc;
