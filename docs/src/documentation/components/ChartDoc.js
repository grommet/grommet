// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var stringify = require("json-stringify-pretty-compact");
var Chart = require('grommet/components/Chart');
var GrommetDocument = require('grommet/components/Document');

var inline =
  "<Chart ... />";

var series = [
  {label: 'first', values: [[5,2], [4,3], [3,3], [2,2], [1,4]],
    colorIndex: "graph-1"},
  {label: 'second', values: [[5,4], [4,3], [3,0], [2,1], [1,0]],
    colorIndex: "graph-2"}
];
var seriesXAxis = [
  {label: 'May 22', value: series[0].values[0][0]},
  {label: 'May 21', value: series[0].values[1][0]},
  {label: 'May 20', value: series[0].values[2][0]},
  {label: 'May 19', value: series[0].values[3][0]},
  {label: 'May 18', value: series[0].values[4][0]}
];

var dateSeries = [
  {label: 'first', values: [
    [new Date(Date.parse("2015-05-22")),4],
    [new Date(Date.parse("2015-05-21")),2],
    [new Date(Date.parse("2015-05-20")),3],
    [new Date(Date.parse("2015-05-19")),3],
    [new Date(Date.parse("2015-05-18")),2]
  ], colorIndex: "graph-4"},
];
var dateSeriesXAxis = [
  {label: 'May 22', value: dateSeries[0].values[0][0]},
  {label: 'May 21', value: dateSeries[0].values[1][0]},
  {label: 'May 20', value: dateSeries[0].values[2][0]},
  {label: 'May 19', value: dateSeries[0].values[3][0]},
  {label: 'May 18', value: dateSeries[0].values[4][0]}
];

var ChartDoc = React.createClass({

  render: function() {
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
            <dt><code>important   {"{number}"}</code></dt>
            <dd>The index of the series data that the legend should
              correspond to, if any.</dd>
            <dt><code>large       true|false</code></dt>
            <dd>Larger sized version.</dd>
            <dt><code>legend      true|false</code></dt>
            <dd>Whether to show a legend.</dd>
            <dt><code>legendTotal true|false</code></dt>
            <dd>Whether to show a total in the legend.</dd>
            <dt><code>max         {"{number}"}</code></dt>
            <dd>The largest possible value.
              Defaults to the largest y value in the series data.</dd>
            <dt><code>min         {"{number}"}</code></dt>
            <dd>The smallest possible value.
              Defaults to the smallest y value in the series data.</dd>
            <dt><code>series       {"[{...}]"}</code></dt>
            <dd>An array of: <code>
              {"{label: <string>, colorIndex: <string>, values: [[x,y], ...]}"}
              </code>. The x values can be either numbers or Date objects.
              The y values should be numbers.</dd>
            <dt><code>small        true|false</code></dt>
            <dd>Smaller sized version.</dd>
            <dt><code>smooth       true|false</code></dt>
            <dd>For line and area charts, smooth the drawing.</dd>
            <dt><code>threshold    {"{number}"}</code></dt>
            <dd>Optional threshold value.</dd>
            <dt><code>type         line|bar|area</code></dt>
            <dd>Whether to draw a line graph, bar graph, or area graph.</dd>
            <dt><code>units        {"{string}"}</code></dt>
            <dd>Optional units to include.</dd>
            <dt><code>xAxis        {"[{string}, ...]"}</code></dt>
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
            {"<Chart threshold={2} series={" + stringify(series) + "} />"}
          </code></pre>

          <h3>Bar</h3>
          <div className="example">
          <Chart series={series} min={0} threshold={2} type="bar" />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" threshold={2}\n" +
              " series={" + stringify(series) + "} />"}
          </code></pre>

          <h3>Area</h3>
          <div className="example">
          <Chart series={series} min={0} max={5} threshold={2} type="area" />
          </div>
          <pre><code className="html">
            {"<Chart type=\"area\" threshold={2}\n" +
              " series={" + stringify(series) + "} />"}
          </code></pre>

          <h3>Bar, Legend, xAxis, and Units</h3>
          <div className="example">
          <Chart series={series} min={0} threshold={2} type="bar" legend={true}
            xAxis={seriesXAxis}
            units="TB" />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" threshold={2} legend=(true) units=\"TB\"\n" +
              " xAxis={" + stringify(seriesXAxis) +  "}\n" +
              " series={" + stringify(series) + "} />"}
          </code></pre>

          <h3>Area, Legend, xAxis, and Units</h3>
          <div className="example">
          <Chart series={series} min={0} max={5} threshold={2}
            type="area" legend={true}
            xAxis={seriesXAxis}
            units="TB" />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" threshold={2}\n" +
              " legend=(true) units=\"TB\"\n" +
              " xAxis={" + stringify(seriesXAxis) +  "}\n" +
              " series={" + stringify(series) + "} />"}
          </code></pre>

          <h3>Small</h3>
          <div className="example">
          <Chart series={series} min={0} threshold={2} type="bar" legend={true}
            xAxis={seriesXAxis}
            units="TB" small={true} />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" small={true} threshold={2}\n" +
              " legend=(true) units=\"TB\"\n xAxis={" +
              stringify(seriesXAxis) +  "}\n" +
              " series={" + stringify(series) + "} />"}
          </code></pre>

          <h3>Large, Legend total</h3>
          <div className="example">
          <Chart series={series} min={0} threshold={2} type="bar"
              legend={true} legendTotal={true}
            xAxis={seriesXAxis}
            units="TB" large={true} />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" small={true} threshold={2}\n" +
              " legend=(true) legendTotal={true} units=\"TB\"\n" +
              " xAxis={" + stringify(seriesXAxis) +  "}\n" +
              " series={" + stringify(series) + "} />"}
          </code></pre>

          <h3>Dates, Smooth</h3>
          <div className="example">
          <Chart series={dateSeries} min={0} max={5} threshold={2}
            type="area" smooth={true} legend={true}
            xAxis={dateSeriesXAxis} />
          </div>
          <pre><code className="html">
            {"<Chart type=\"area\" smooth={true} threshold={2}\n" +
              " legend={true}\n" +
              " xAxis={" + stringify(dateSeriesXAxis) +  "}\n" +
              " series={" + stringify(dateSeries) + "} />"}
          </code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = ChartDoc;
