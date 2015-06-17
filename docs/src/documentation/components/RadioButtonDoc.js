// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var RadioButton = require('grommet/components/RadioButton');

var RadioButtonDoc = React.createClass({

  render: function() {
    var inline = [
      "<RadioButton id=\"item2\" label=\"Item 1\">"
    ].join("\n");
    return (
      <GrommetDocument>
        <header>
          <h1>RadioButton</h1>
          <p>A radio button in a web form. We have a separate component from the
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
          </dl>
        </section>

        <section>
          <h2>Example</h2>

          <div className="example">
            <RadioButton id="choice1-1" name="choice1" label="Choice 1" />
            <RadioButton id="choice1-2" name="choice1" label="Choice 2" />
          </div>
          <pre><code className="html">{"<RadioButton id=\"\{choice1-1\}\" name=\"choice\" label=\"Choice 1\"/>"}</code></pre>

          <h3>Small (NOTE: under design discussion)</h3>
          <div className="example">
            <RadioButton id="choice2-1" name="choice2" label="Choice 3" small={true} />
            <RadioButton id="choice2-2" name="choice2" label="Choice 4" small={true} />
          </div>
          <pre><code className="html">{"<RadioButton id=\"\{choice2-1\}\" name=\"choice\" label=\"Choice 3\" small={true}/>"}</code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = RadioButtonDoc;
