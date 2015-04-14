// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var LigoDocument = require('ligo/components/Document');
var Form = require('ligo/components/Form');
var FormField = require('ligo/components/FormField');
var Header = require('ligo/components/Header');
var Menu = require('ligo/components/Menu');
var HelpIcon = require('ligo/components/icons/Help');
var Footer = require('ligo/components/Footer');

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
      <LigoDocument>
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
      </LigoDocument>
    );
  }
});

module.exports = FormDoc;
