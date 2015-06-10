// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var stringify = require("json-stringify-pretty-compact");
var Distribution = require('grommet/components/Distribution');
var GrommetDocument = require('grommet/components/Document');

var inline =
  "<Distribution series={[...]} />";

var statusSeries = [
  {label: 'OK', value: 70, colorIndex: 'ok'},
  {label: 'Warning', value: 20, colorIndex: 'warning'},
  {label: 'Error', value: 10, colorIndex: 'error'}
];

var DistributionDoc = React.createClass({

  render: function() {
    return (
      <GrommetDocument>
        <header>
          <h1>Distribution</h1>
          <p>Shows a bar, arc, or circular meter graphic.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>large       true|false</code></dt>
            <dd>Larger sized version.</dd>
            <dt><code>legend      true|false</code></dt>
            <dd>Whether to show a legend.</dd>
            <dt><code>legendTotal true|false</code></dt>
            <dd>Whether to show a total in the legend.</dd>
            <dt><code>series     {"[{value: , label: , colorIndex: , onClick: }, ...]"}</code></dt>
            <dd>An array of objects describing the data.
              Either this or the <code>value</code> property must be provided.</dd>
            <dt><code>small        true|false</code></dt>
            <dd>Smaller sized version.</dd>
            <dt><code>units       {"{string}"}</code></dt>
            <dd>Optional units to display next to the value label.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Basic</h3>
          <div className="example">
            <Distribution series={statusSeries} />
          </div>
          <pre><code className="html">
            {"<Distribution\n " +
              "series={" + stringify(statusSeries, null, '  ') + "}  />"}
          </code></pre>

          <h3>Legend</h3>
          <div className="example">
            <Distribution legend={true} series={statusSeries} />
          </div>
          <pre><code className="html">
            {"<Distribution legend={true}\n " +
              "series={" + stringify(statusSeries, null, '  ') + "}  />"}
          </code></pre>

          <h3>Small</h3>
          <div className="example">
            <Distribution small={true} series={statusSeries} />
          </div>
          <pre><code className="html">
            {"<Distribution small={true}\n " +
              "series={" + stringify(statusSeries, null, '  ') + "}  />"}
          </code></pre>

          <h3>Large</h3>
          <div className="example">
            <Distribution large={true} series={statusSeries} />
          </div>
          <pre><code className="html">
            {"<Distribution large={true}\n " +
              "series={" + stringify(statusSeries, null, '  ') + "}  />"}
          </code></pre>

          <h3>Loading</h3>
          <div className="example">
            <Distribution />
          </div>
          <pre><code className="html">
            {"<Distribution />"}
          </code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = DistributionDoc;
