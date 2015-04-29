// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Chart = require('grommet/components/Chart');
var GrommetDocument = require('grommet/components/Document');

var ChartDoc = React.createClass({

  render: function() {
    var inline =
      "<Chart ... />";

    var series = [
      {label: 'first', values: [[1,1], [2,2], [3,3], [4, 3], [5, 2]], colorIndex: "accent-1"},
      {label: 'second', values: [[1,0], [2,0], [3,0], [4, 2], [5,3]], colorIndex: "accent-2"}
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
            <dt><code>max         {"{number}"}</code></dt>
            <dd>The largest possible value.
              Defaults to the largest x value in the series data.</dd>
            <dt><code>min         {"{number}"}</code></dt>
            <dd>The smallest possible value.
              Defaults to the smallest x value in the series data.</dd>
            <dt><code>threshold   {"{number}"}</code></dt>
            <dd>Optional threshold value.</dd>
            <dt><code>series       {"[{...}]"}</code></dt>
            <dd>An array of: <code>
              {"{label: <string>, colorIndex: <string>, values: [[x,y], ...]}"}
              </code>.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Simple</h3>
          <div className="example">
          <Chart series={series} min={0} max={5} threshold={2}/>
          </div>
          <pre><code className="html">
            {"<Chart />"}
          </code></pre>


        </section>
      </GrommetDocument>
    );
  }
});

module.exports = ChartDoc;
