// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
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

    var tableHeader = (
      <thead>
        <tr>
          <th>header 1</th>
          <th>header 2</th>
        </tr>
      </thead>
    );

    var tableBody = (
      <tbody>
        <tr>
          <td>first</td>
          <td>note 1</td>
        </tr>
        <tr>
          <td>second</td>
          <td>note 2</td>
        </tr>
        <tr>
          <td>third</td>
          <td>note 3</td>
        </tr>
      </tbody>
    );

    return (
      <Article primary={true}>
        <header>
          <h1>Table</h1>
          <p>Table using standard HTML5 markup.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>onMore        {"function () {...}"}</code></dt>
            <dd>Function that will be called when more data is needed.</dd>
            <dt><code>onSelect      {"function (selection) {...}"}</code></dt>
            <dd>Function that will be called when the user selects a row.</dd>
            <dt><code>scrollable    true|false</code></dt>
            <dt><code>selectable    true|false|multiple</code></dt>
            <dd>Whether rows are selectable. <code>multiple</code> indicates
              that multiple rows may be selected</dd>
            <dt><code>selection     number|[number, ...]</code></dt>
            <dd>The currently selected item(s).</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Simple</h3>
          <div className="example">
            <Table>{tableBody}</Table>
          </div>

          <h3>Selectable</h3>
          <div className="example">
            <Table selectable={true} selection={0}>
              {tableHeader}
              {tableBody}
            </Table>
          </div>

          <h3>Multi-select</h3>
          <div className="example">
              <Table selectable="multiple" selection={[0, 2]}>
              {tableHeader}
              {tableBody}
            </Table>
          </div>

        </section>

      </Article>
    );
  }
});

module.exports = TableDoc;
