// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var FormField = require('grommet/components/FormField');

var FormFieldDoc = React.createClass({

  render: function() {
    var inline = [
      "<FormField>",
      "  <label htmlFor=\"item1\">Item 1</label>",
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
          </dl>
        </section>

        <section>
          <h2>Example</h2>

          <h3>Text input</h3>
          <div className="example">
            <FormField>
              <label htmlFor="item1">Item 1</label>
              <input id="item1" type="text" />
            </FormField>
          </div>
          <pre><code className="html">{"<FormField>\n  <label htmlFor=\"\{id\}\">...</label>\n  <input id=\"\{id\}\" type=\"text\"/>\n</FormField>"}</code></pre>

          <h3>Checkbox</h3>
          <div className="example">
            <FormField>
              <label></label>
              <input id="item2" type="checkbox" />
              <label htmlFor="item2" className="checkbox">Item 2</label>
            </FormField>
          </div>
          <pre><code className="html">{"<FormField>\n  <label></label>\n  <input id=\"\{id\}\" type=\"checkbox\"/>\n  <label htmlFor=\"\{id\}\ className=\"checkbox\">...</label>\n</FormField>"}</code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = FormFieldDoc;
