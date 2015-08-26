// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var Section = require('grommet/components/Section');
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
      <Article primary={true}>
        <header>
          <h1>Button</h1>
          <p>A button. We have a separate component from the
          browser base so we can style it.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
          <dt><code>accent         true|false</code></dt>
          <dd>Whether this is an accent button.</dd>
          <dt><code>label          {"{text}"}</code></dt>
          <dd>Label text to place in the button.</dd>
          <dt><code>onClick        {"{func}"}</code></dt>
          <dd>Click handler. Not providing an onClick function causes the
            control to be disabled.</dd>
          <dt><code>primary        true|false</code></dt>
          <dd>Whether this is a primary button. There should be at most
            one per page or screen.</dd>
          <dt><code>large          true|false</code></dt>
          <dd>Whether this is a large button. Defaults to false.</dd>
          <dt><code>type           button|reset|submit</code></dt>
          <dd>The type of button. Set the type to <code>submit</code>
              for the default button on forms.  Defaults to <code>button</code>.</dd>
          </dl>
        </section>

        <section>
          <h2>Example</h2>

          <h3>Default</h3>
          <div className="example">
            <Button label="Action" onClick={this._onClick} />
          </div>
          <pre><code className="html">{"<Button label=\"Action\" onClick={...} />"}</code></pre>

          <h3>Primary</h3>
          <div className="example">
            <Button label="Action" primary={true} onClick={this._onClick} />
          </div>
          <pre><code className="html">{"<Button label=\"Action\" primary={true} onClick={...} />"}</code></pre>

          <h3>Accent</h3>
          <div className="example">
            <Button label="Action" accent={true} onClick={this._onClick} />
          </div>
          <pre><code className="html">{"<Button label=\"Action\" accent={true} onClick={...} />"}</code></pre>

          <h3>Large</h3>
          <div className="example">
            <Button label="Action" onClick={this._onClick} large={true} />
          </div>
          <pre><code className="html">{"<Button label=\"Action\" onClick={...} large={true} />"}</code></pre>

          <h3>Disabled</h3>
          <div className="example">
            <Button label="Action" />
          </div>
          <pre><code className="html">{"<Button label=\"Action\" />"}</code></pre>

        </section>

        <Section colorIndex="neutral-1" pad="medium">
          <h3>Colored context</h3>
          <div className="example">
            <Button label="Default" onClick={this._onClick} />
          </div>
          <div className="example">
            <Button label="Primary" primary={true} onClick={this._onClick} />
          </div>
          <div className="example">
            <Button label="Accent" accent={true} onClick={this._onClick} />
          </div>
        </Section>

      </Article>
    );
  }
});

module.exports = ButtonDoc;
