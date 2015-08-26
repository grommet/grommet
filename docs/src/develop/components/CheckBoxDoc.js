// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var CheckBox = require('grommet/components/CheckBox');

var CheckBoxDoc = React.createClass({

  getInitialState: function () {
    return {checked: false};
  },

  _onChange: function () {
    this.setState({checked: ! this.state.checked});
  },

  render: function() {
    var inline = [
      "<CheckBox id=\"item2\" label=\"Item 1\">"
    ].join("\n");
    return (
      <Article primary={true}>
        <header>
          <h1>CheckBox</h1>
          <p>A check box in a web form. We have a separate component from the
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
          <dt><code>disabled        true|false</code></dt>
          <dd>Same as React {"<input disabled= >"}.
            Also adds a hidden input element with the same name so
            form submissions work.</dd>
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
          <dt><code>ariaDescribedby {"{text}"}</code></dt>
          <dd>Optional attribute to enhance accessibility in case the checkbox is used inside a context.</dd>
          </dl>
        </section>

        <section>
          <h2>Example</h2>

          <h3>Basic</h3>
          <div className="example">
            <CheckBox id="item2" name="item2" label="Item 2"
              checked={this.state.checked} onChange={this._onChange} />
          </div>
          <pre><code className="html">{"<CheckBox id=\"item2\" name=\"item2\" label=\"Item 2\" />"}</code></pre>

          <h3>Toggle</h3>
          <div className="example">
            <CheckBox id="item3" name="item3" label="Item 3" toggle={true} />
          </div>
          <pre><code className="html">{"<CheckBox id=\"item3\" name=\"item3\" label=\"Item 3\" toggle={true} />"}</code></pre>

          <h3>Disabled</h3>
          <div className="example">
            <CheckBox id="item4" name="item4" label="Item 4" disabled={true} checked={this.state.checked} />
          </div>
          <pre><code className="html">{"<CheckBox id=\"item4\" name=\"item4\" label=\"Item 4\" disabled=\{true\} />"}</code></pre>

          <h3>Disabled Toggle</h3>
          <div className="example">
            <CheckBox id="item5" name="item5" label="Item 5" toggle={true}
              disabled={true} checked={this.state.checked} />
          </div>
          <pre><code className="html">{"<CheckBox id=\"item5\" name=\"item5\" label=\"Item 5\" toggle={true} disabled={true} />"}</code></pre>

        </section>

      </Article>
    );
  }
});

module.exports = CheckBoxDoc;
