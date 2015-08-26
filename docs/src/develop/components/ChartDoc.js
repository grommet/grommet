// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var stringify = require("json-stringify-pretty-compact");
var moment = require('moment');
var Article = require('grommet/components/Article');
var Chart = require('grommet/components/Chart');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');

var inline =
  "<Chart ... />";

var series = [
  {label: 'first', values: [[8, 1], [7, 2], [6, 3], [5, 2], [4, 3], [3, 3], [2, 2], [1, 4]],
    colorIndex: "graph-1"},
  {label: 'second', values: [[8, 4], [7, 2], [6, 3], [5, 4], [4, 3], [3, 0], [2, 1], [1, 0]],
    colorIndex: "graph-2"}
];

var singleSeries = [
  {values: [[8, 1], [7, 2], [6, 3], [5, 2], [4, 3], [3, 3], [2, 2], [1, 4]],
    colorIndex: "graph-1"}
];

var seriesXAxis = [
  {label: 'May 22', value: series[0].values[0][0]},
  {label: 'May 21', value: series[0].values[1][0]},
  {label: 'May 20', value: series[0].values[2][0]},
  {label: 'May 19', value: series[0].values[3][0]},
  {label: 'May 18', value: series[0].values[4][0]},
  {label: 'May 17', value: series[0].values[5][0]},
  {label: 'May 16', value: series[0].values[6][0]},
  {label: 'May 15', value: series[0].values[7][0]}
];

var dateSeries = [
  {label: 'first', values: [
    [new Date(Date.parse("2015-05-22")), 4],
    [new Date(Date.parse("2015-05-21")), 2],
    [new Date(Date.parse("2015-05-20")), 3],
    [new Date(Date.parse("2015-05-19")), 3],
    [new Date(Date.parse("2015-05-18")), 2],
    [new Date(Date.parse("2015-05-17")), 1],
    [new Date(Date.parse("2015-05-16")), 4],
    [new Date(Date.parse("2015-05-15")), 2]
  ], colorIndex: "graph-1"}
];

var dateSeriesXAxis = [
  {label: 'May 22', value: dateSeries[0].values[0][0]},
  {label: 'May 21', value: dateSeries[0].values[1][0]},
  {label: 'May 20', value: dateSeries[0].values[2][0]},
  {label: 'May 19', value: dateSeries[0].values[3][0]},
  {label: 'May 18', value: dateSeries[0].values[4][0]},
  {label: 'May 17', value: dateSeries[0].values[5][0]},
  {label: 'May 16', value: dateSeries[0].values[6][0]},
  {label: 'May 15', value: dateSeries[0].values[7][0]}
];

var thresholds = [
  {label: 'OK', value: 0, colorIndex: 'ok'},
  {label: 'Warning', value: 3, colorIndex: 'warning'},
  {label: 'Error', value: 4, colorIndex: 'error'}
];

var secondsSeries = [
  {label: 'first', values: [], colorIndex: "graph-1"}
];

function buildSecondsSeries () {
  let now = moment();
  for (let i = 0; i < 90; i += 5) {
    secondsSeries[0].values.push([
      moment(now).subtract(i, 'seconds').unix(),
      Math.ceil(Math.random() * 5)
    ]);
  }
}

var ChartDoc = React.createClass({

  componentDidMount: function () {
    buildSecondsSeries();
    this._timer = setInterval(function () {
      secondsSeries[0].values.unshift([
        moment().unix(),
        Math.ceil(Math.random() * 5)
      ]);
      secondsSeries[0].values.pop();
      this.forceUpdate();
    }.bind(this), 5000);
  },

  componentWillUnmount: function () {
    clearInterval(this._timer);
    secondsSeries[0].values = [];
  },

  render: function() {
    return (
      <Article primary={true}>
        <header>
          <h1>Chart</h1>
          <p>Shows a graphical data chart.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>important   {"{number}"}</code></dt>
            <dd>The index of the series data that the legend should
              correspond to, if any.</dd>
            <dt><code>large       true|false</code></dt>
            <dd>Larger sized version. Deprecated, use <code>size</code>.</dd>
            <dt><code>legend      {"{position: overlay|after, total: true|false}"}</code></dt>
            <dd>Whether to show a legend, where to place it,
              and whether to show a total value.</dd>
            <dt><code>max         {"{number}"}</code></dt>
            <dd>The largest possible value.
              Defaults to the largest y value in the series data.</dd>
            <dt><code>min         {"{number}"}</code></dt>
            <dd>The smallest possible value.
              Defaults to the smallest y value in the series data.</dd>
            <dt><code>points      true|false</code></dt>
            <dd>For line and area charts, whether to draw individual data points.</dd>
            <dt><code>series       {"[{...}]"}</code></dt>
            <dd>An array of: <code>
              {"{label: <string>, colorIndex: <string>, values: [[x,y], ...]}"}
              </code>. The x values can be either numbers or Date objects.
              The y values should be numbers.</dd>
            <dt><code>size         small|medium|large</code></dt>
            <dd>The height of the Chart. Defaults to <code>medium</code>.</dd>
            <dt><code>small        true|false</code></dt>
            <dd>Smaller sized version. Deprecated, use <code>size</code>.</dd>
            <dt><code>smooth       true|false</code></dt>
            <dd>For line and area charts, smooth the drawing.</dd>
            <dt><code>sparkline    true|false</code></dt>
            <dd>Sparkline sized version.</dd>
            <dt><code>threshold    {"{number}"}</code></dt>
            <dd>Optional threshold value.</dd>
            <dt><code>type         line|bar|area</code></dt>
            <dt><code>thresholds   {"[{value: , label: , colorIndex: }, ...]"}</code></dt>
            <dd>An array of objects describing thresholds.</dd>
            <dd>Whether to draw a line graph, bar graph, or area graph.</dd>
            <dt><code>units        {"{string}"}</code></dt>
            <dd>Optional units to include.</dd>
            <dt><code>xAxis        {"{placement: top|bottom: data: [{string}, ...]}"}</code></dt>
            <dd>Optional xAxis placement and labels.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Line</h3>
          <div className="example">
          <Chart series={singleSeries} min={0} max={5} threshold={3} />
          </div>
          <pre><code className="html">
            {"<Chart threshold={2} series={" + stringify(singleSeries) + "} />"}
          </code></pre>

          <h3>Bar</h3>
          <div className="example">
          <Chart series={singleSeries} min={0} threshold={3} type="bar" />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" threshold={2}\n" +
              " series={" + stringify(singleSeries) + "} />"}
          </code></pre>

          <h3>Area</h3>
          <div className="example">
          <Chart series={singleSeries} min={0} max={5} threshold={3} type="area" />
          </div>
          <pre><code className="html">
            {"<Chart type=\"area\" threshold={3}\n" +
              " series={" + stringify(singleSeries) + "} />"}
          </code></pre>

          <h3>Bar, Legend, xAxis, and Units</h3>
          <div className="example">
          <Chart series={series} min={0} threshold={3} type="bar" legend={{}}
            xAxis={seriesXAxis}
            units="TB" />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" threshold={3} legend={{}} units=\"TB\"\n" +
              " xAxis={" + stringify(seriesXAxis) +  "}\n" +
              " series={" + stringify(series) + "} />"}
          </code></pre>

          <h3>Area, Legend, xAxis, Units, Points, and Thresholds</h3>
          <div className="example">
          <Chart series={series} min={0} max={5} threshold={3}
            type="area" legend={{}} points={true}
            xAxis={{placement: 'bottom', data: seriesXAxis}}
            units="TB"
            thresholds={thresholds} />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" threshold={3}\n" +
              " legend={{}} points={true} units=\"TB\"\n" +
              " xAxis={{placement: \"bottom\",\n" +
              "   data:" + stringify(seriesXAxis) +  "}}\n" +
              " series={" + stringify(series) + "}\n" +
              " thresholds={" + stringify(thresholds) + "} />"}
          </code></pre>

          <h3>Small</h3>
          <div className="example">
          <Chart series={series} min={0} threshold={3} type="bar" legend={{}}
            xAxis={seriesXAxis}
            units="TB" small={true} />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" small={true} threshold={3}\n" +
              " legend={{}} units=\"TB\"\n xAxis={" +
              stringify(seriesXAxis) +  "}\n" +
              " series={" + stringify(series) + "} />"}
          </code></pre>

          <h3>Large, Legend total</h3>
          <div className="example">
          <Chart series={series} min={0} threshold={3} type="bar"
            legend={{total: true}}
            xAxis={seriesXAxis}
            units="TB" large={true} />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" small={true} threshold={3}\n" +
              " legend={{total: true}} units=\"TB\"\n" +
              " xAxis={" + stringify(seriesXAxis) +  "}\n" +
              " series={" + stringify(series) + "} />"}
          </code></pre>

          <h3>Sparkline, Bar</h3>
          <div className="example">
          <Chart series={singleSeries} min={0} type="bar" sparkline={true} />
          {singleSeries[0].values[0][0]}
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" sparkline={true}\n" +
              " series={" + stringify(singleSeries) + "} />"}
          </code></pre>

          <h3>Sparkline, Area</h3>
          <div className="example">
          <Chart series={singleSeries} min={0} type="area" sparkline={true} />
          {singleSeries[0].values[0][0]}
          </div>
          <pre><code className="html">
            {"<Chart type=\"area\" sparkline={true}\n" +
              " series={" + stringify(singleSeries) + "} />"}
          </code></pre>

          <h3>Dates, Smooth</h3>
          <div className="example">
          <Chart series={dateSeries} min={0} max={5} threshold={3}
            type="area" smooth={true} legend={{}}
            xAxis={dateSeriesXAxis} />
          </div>
          <pre><code className="html">
            {"<Chart type=\"area\" smooth={true} threshold={3}\n" +
              " legend={{}}\n" +
              " xAxis={" + stringify(dateSeriesXAxis) +  "}\n" +
              " series={" + stringify(dateSeries) + "} />"}
          </code></pre>

          <h3>Ticker</h3>
          <div className="example">
          <Chart series={secondsSeries} min={0} max={5} threshold={3}
            type="bar" legend={{}} />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" threshold={3}\n" +
              " legend={{}} series={...} />"}
          </code></pre>

          <h3>Tiles</h3>
          <div className="example">
          <Tiles>
            <Tile>
              <Chart series={singleSeries} min={0} threshold={3} type="bar"
                xAxis={seriesXAxis} units="TB" max={6}
                legend={{position: 'after'}} />
            </Tile>
            <Tile>
              <Chart series={series} min={0} threshold={3} type="bar"
                xAxis={seriesXAxis} units="TB"
                legend={{position: 'after'}} />
            </Tile>
            <Tile>
              <Chart series={series} min={0} threshold={3} type="area"
                xAxis={seriesXAxis} units="TB"
                legend={{position: 'after'}} />
            </Tile>
            <Tile>
              <Chart series={series} min={0} threshold={3} type="line"
                xAxis={seriesXAxis} units="TB"
                legend={{position: 'after'}} />
            </Tile>
          </Tiles>
          </div>
          <pre><code className="html">
            {"<Tile>\n<Chart type=\"...\" threshold={3} legend={{position: after}} units=\"TB\"\n" +
              " xAxis={" + stringify(seriesXAxis) +  "}\n" +
              " series={" + stringify(series) + "} />\n</Tile>"}
          </code></pre>

          <h3>Small, Loading</h3>
          <div className="example">
          <Chart series={[]} min={0} threshold={3} type="bar" legend={{}}
            xAxis={[]}
            units="TB" small={true} />
          </div>
          <pre><code className="html">
            {"<Chart type=\"bar\" small={true} threshold={3}\n" +
              " legend={{}} units=\"TB\"\n xAxis={[]}\n" +
              " series={[]} />"}
          </code></pre>

        </section>

      </Article>
    );
  }
});

module.exports = ChartDoc;
