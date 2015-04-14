// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Ligo = require('ligo');
var Form = Ligo.Form;
var FormField = Ligo.FormField;
var Header = Ligo.Header;
var Menu = Ligo.Menu;
var HelpIcon = Ligo.Icons.Help;
var Footer = Ligo.Footer;

var FormDoc = React.createClass({

  render: function() {
    var inline = [
      "<Form>",
      "  <Header>...</Header>",
      "  <fieldset>",
      "    <FormField>",
      "      <label htmlFor=\"item1\">Item 1</label>",
      "      <input id=\"item1\" />",
      "    </FormField>",
      "    ...",
      "  </fieldset>",
      "  <Footer>...</Footer>",
      "</Form>"].join("\n");
    return (
      <Ligo.Document>
        <header>
          <h1>Form</h1>
          <p>A web form.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Simple</h3>
          <div className="example">
            <Form>
              <Header>
                <h1>Edit</h1>
                <Menu direction="right">
                  <div className="control-icon">
                    <HelpIcon />
                  </div>
                </Menu>
              </Header>
              <fieldset>
                <FormField>
                  <label htmlFor="item1">Item 1</label>
                  <input id="item1" />
                </FormField>
              </fieldset>
              <Footer>
                <span></span>
                <input type="submit" value="OK" />
              </Footer>
            </Form>
          </div>
          <pre><code className="html">{"<Form> ..."}</code></pre>

        </section>
      </Ligo.Document>
    );
  }
});

module.exports = FormDoc;
