// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Table = require('grommet/components/Table');

var TableDoc = React.createClass({

  render: function() {
    var inline = [
      "<Table>",
      "  <thead>",
      "    <tr>",
      "      <th>...</th>",
      "      <th>...</th>",
      "    </tr>",
      "  </thead>",
      "  <tbody>",
      "    <tr>",
      "      <td>...</td>",
      "      <td>...</td>",
      "    </tr>",
      "  </tbody>",
      "</Table>"
    ].join('\n');

    return (
      <GrommetDocument flush={false}>
        <header>
          <h1>Table</h1>
          <p>Table using standard HTML5 markup.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>defaultSelection</code></dt>
            <dt><code>onSelection</code></dt>
            <dt><code>selectable</code></dt>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Simple</h3>
          <div className="example">
            <Table>
              <tbody>
                <tr>
                  <td>first</td>
                  <td>note 1</td>
                </tr>
                <tr>
                  <td>second</td>
                  <td>note 2</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <h3>Selectable</h3>
          <div className="example">
            <Table selectable={true} defaultSelection={0}>
              <thead>
                <tr>
                  <th>header 1</th>
                  <th>header 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>first</td>
                  <td>note 1</td>
                </tr>
                <tr>
                  <td>second</td>
                  <td>note 2</td>
                </tr>
              </tbody>
            </Table>
          </div>

        </section>

      </GrommetDocument>
    );
  }
});

module.exports = TableDoc;
