// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var stringify = require("json-stringify-pretty-compact");
var Article = require('grommet/components/Article');
var Distribution = require('grommet/components/Distribution');

var inline =
  "<Distribution series={[...]} />";

var series = [
  {label: 'First', value: 40},
  {label: 'Second', value: 30},
  {label: 'Third', value: 20},
  {label: 'Fourth', value: 10}
];

var DistributionDoc = React.createClass({

  render: function() {
    return (
      <Article>
        <header>
          <h1>Distribution</h1>
          <p>Shows a graphic of relatively sized items.</p>
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
            <Distribution series={series} />
          </div>
          <pre><code className="html">
            {"<Distribution\n " +
              "series={" + stringify(series, null, '  ') + "}  />"}
          </code></pre>

          <h3>Legend</h3>
          <div className="example">
            <Distribution legend={true} series={series} />
          </div>
          <pre><code className="html">
            {"<Distribution legend={true}\n " +
              "series={" + stringify(series, null, '  ') + "}  />"}
          </code></pre>

          <h3>Small</h3>
          <div className="example">
            <Distribution small={true} series={series} />
          </div>
          <pre><code className="html">
            {"<Distribution small={true}\n " +
              "series={" + stringify(series, null, '  ') + "}  />"}
          </code></pre>

          <h3>Large</h3>
          <div className="example">
            <Distribution large={true} series={series} />
          </div>
          <pre><code className="html">
            {"<Distribution large={true}\n " +
              "series={" + stringify(series, null, '  ') + "}  />"}
          </code></pre>

          <h3>Loading</h3>
          <div className="example">
            <Distribution />
          </div>
          <pre><code className="html">
            {"<Distribution />"}
          </code></pre>

        </section>

      </Article>
    );
  }
});

module.exports = DistributionDoc;
