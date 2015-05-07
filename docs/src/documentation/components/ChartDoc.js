// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Chart = require('grommet/components/Chart');
var GrommetDocument = require('grommet/components/Document');

var ChartDoc = React.createClass({

  render: function() {
    var inline =
      "<Chart ... />";

    var series = [
      {label: 'first', values: [[5,2], [4,3], [3,3], [2,2], [1,1]], colorIndex: "graph-1"},
      {label: 'second', values: [[5,3], [4,2], [3,0], [2,0], [1,0]], colorIndex: "graph-2"}
    ];

    return (
      <GrommetDocument>
        <header>
          <h1>Chart</h1>
          <p>Shows a graphical data chart.</p>
          <p>This component needs attention and may be replaced by a
            separate graphing package.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>legend     true|false</code></dt>
            <dd>Whether to show a legend.</dd>
            <dt><code>max         {"{number}"}</code></dt>
            <dd>The largest possible value.
              Defaults to the largest y value in the series data.</dd>
            <dt><code>min         {"{number}"}</code></dt>
            <dd>The smallest possible value.
              Defaults to the smallest y value in the series data.</dd>
            <dt><code>series       {"[{...}]"}</code></dt>
            <dd>An array of: <code>
              {"{label: <string>, colorIndex: <string>, values: [[x,y], ...]}"}
              </code>.</dd>
            <dt><code>threshold   {"{number}"}</code></dt>
            <dd>Optional threshold value.</dd>
            <dt><code>type         line|bar|area</code></dt>
            <dd>Whether to draw a line graph, bar graph, or area graph.</dd>
            <dt><code>units      {"{string}"}</code></dt>
            <dd>Optional units to include.</dd>
            <dt><code>xAxis      {"[{string}, ...]"}</code></dt>
            <dd>Optional xAxis labels.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Line</h3>
          <div className="example">
          <Chart series={series} min={0} max={5} threshold={2} />
          </div>
          <pre><code className="html">
            {"<Chart threshold={2} />"}
          </code></pre>

          <h3>Bar</h3>
          <div className="example">
          <Chart series={series} min={0} max={5} threshold={2} type="bar" />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" threshold={2} />"}
          </code></pre>

          <h3>Area</h3>
          <div className="example">
          <Chart series={series} min={0} max={5} threshold={2} type="area" />
          </div>
          <pre><code className="html">
            {"<Chart type=\"area\" threshold={2} />"}
          </code></pre>

          <h3>Bar, Legend, xAxis, and Units</h3>
          <div className="example">
          <Chart series={series} min={0} max={5} threshold={2} type="bar" legend={true}
            xAxis={['Aug 8', 'Aug 7', 'Aug 6', 'Aug 5', 'Aug 4']}
            units="TB" />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" threshold={2} legend=(true) xAxis={[...]} units=\"TB\" />"}
          </code></pre>

          <h3>Area, Legend, xAxis, and Units</h3>
          <div className="example">
          <Chart series={series} min={0} max={5} threshold={2} type="area" legend={true}
            xAxis={['Aug 8', 'Aug 7', 'Aug 6', 'Aug 5', 'Aug 4']}
            units="TB" />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" threshold={2} legend=(true) xAxis={[...]} units=\"TB\" />"}
          </code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = ChartDoc;
