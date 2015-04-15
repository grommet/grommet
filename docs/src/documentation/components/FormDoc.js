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

  _clickRow: function (event) {
    var table = this.refs.table.getDOMNode();
    var rows = table.querySelectorAll('tr');
    for (var i = 0; i < rows.length; i++) {
      rows[i].classList.remove('selected');
    }
    event.currentTarget.classList.add('selected');
  },

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
                <FormField>
                  <label></label>
                  <input id="item2" type="checkbox"/>
                  <label htmlFor="item2">Item 2</label>
                </FormField>
                <FormField>
                  <label></label>
                  <input id="item3" type="radio"/>
                  <label htmlFor="item3">Item 3</label>
                </FormField>
                <FormField>
                  <label htmlFor="item4">Item 4</label>
                  <textarea id="item4"></textarea>
                </FormField>
                <FormField>
                  <label>Item 5</label>
                  <button className="primary">Access</button>
                </FormField>
                <FormField>
                  <label htmlFor="item6">Item 6</label>
                  <select id="item6">
                    <option>first</option>
                    <option>second</option>
                    <option>third</option>
                  </select>
                </FormField>
                <FormField>
                  <label htmlFor="item7">Item 7</label>
                  <table ref="table">
                    <tbody>
                      <tr className="selected" onClick={this._clickRow}>
                        <td>first</td>
                      </tr>
                      <tr onClick={this._clickRow}>
                        <td>second</td>
                      </tr>
                      <tr onClick={this._clickRow}>
                        <td>third</td>
                      </tr>
                    </tbody>
                  </table>
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
