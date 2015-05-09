// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var FormField = require('grommet/components/FormField');
var CheckBox = require('grommet/components/CheckBox');
var RadioButton = require('grommet/components/RadioButton');

var FormFieldDoc = React.createClass({

  render: function() {
    var inline = [
      "<FormField label=\"Item 1\" htmlFor=\"item1\">",
      "  <input id=\"item1\" />",
      "</FormField>"].join("\n");
    return (
      <GrommetDocument>
        <header>
          <h1>FormField</h1>
          <p>A field in a web form.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
          <dt><code>error  {"{text}"}</code></dt>
          <dd>Validation errors.</dd>
          <dt><code>help   {"{text}"}</code></dt>
          <dd>Helpful text.</dd>
          <dt><code>htmlFor   {"{id}"}</code></dt>
          <dd>Id of the input element that the label should be associated with.</dd>
          <dt><code>label  {"{text}"}</code></dt>
          <dd>Label for the field.</dd>
          </dl>
        </section>

        <section>
          <h2>Example</h2>

          <h3>Text input</h3>
          <div className="example">
            <FormField label="Item 1" htmlFor="item1">
              <input id="item1" type="text" />
            </FormField>
          </div>
          <pre><code className="html">{"<FormField label=\"Item 1\" htmlFor=\"item1\">\n  <input id=\"\{id\}\" type=\"text\"/>\n</FormField>"}</code></pre>

          <h3>Text input with errors</h3>
          <div className="example">
            <FormField label="Item 1" htmlFor="item1" error="error text">
              <input id="item1" type="text" />
            </FormField>
          </div>
          <pre><code className="html">{"<FormField label=\"Item 1\" htmlFor=\"item1\" error=\"error text\">\n  <input id=\"\{id\}\" type=\"text\"/>\n</FormField>"}</code></pre>


          <h3>Checkbox</h3>
          <div className="example">
            <FormField label="">
              <CheckBox id="item2" label="Item 2" />
            </FormField>
          </div>
          <pre><code className="html">{"<FormField>\n  <CheckBox id=\"\{item2\}\" label=\"Item 2\"/>\n</FormField>"}</code></pre>

          <h3>RadioButton with help</h3>
          <div className="example">
            <FormField label="item 1" help="help text">
              <RadioButton id="item3-1" label="choice 1" name="choice"/>
              <RadioButton id="item3-2" label="choice 2" name="choice"/>
            </FormField>
          </div>
          <pre><code className="html">{"<FormField help=\"help text\">\n  <RadioButton id=\"\{item3-1\}\" label=\"choice 1\" name=\"choice\"/>\n  <RadioButton id=\"\{item3-2\}\" label=\"choice 2\" name=\"choice\"/>\n</FormField>"}</code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = FormFieldDoc;
