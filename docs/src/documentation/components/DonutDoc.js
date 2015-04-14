// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Donut = require('ligo/components/Donut');
var LigoDocument = require('ligo/components/Document');

var DonutDoc = React.createClass({

  render: function() {
    var inline =
      "<Donut series={[\n  {label: <label>, value: <value>, accentIndex: <index>},\n  ...\n]} />";
    var seriesStructure =
      "{\n  label: <label>,\n  value: <value>,\n  accentIndex: (1-6|<status>)\n}";

    var genericSeries = [
      {label: 'First', value: 10},
      {label: 'Second', value: 20}
    ];

    var statusSeries = [
      {label: 'Critical', value: 10, accentIndex: 'critical'},
      {label: 'Warning', value: 20, accentIndex: 'warning'},
      {label: 'OK', value: 70, accentIndex: 'ok'}
    ];

    return (
      <LigoDocument>
        <header>
          <h1>Donut</h1>
          <p>Shows a circular graphic.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>series  {"[{}, ...]"}</code></dt>
            <dd>An array of objects describing the data:
              <pre><code>{seriesStructure}</code></pre>
            </dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Generic</h3>

          <Donut series={genericSeries} />
          <pre><code className="html">
            {"<Donut series={" + JSON.stringify(genericSeries, null, '  ') + "} />"}
          </code></pre>

          <h3>Status</h3>

          <Donut series={statusSeries} key={true} />
          <pre><code className="html">
            {"<Donut series={" + JSON.stringify(statusSeries, null, '  ') + "} />"}
          </code></pre>

        </section>
      </LigoDocument>
    );
  }
});

module.exports = DonutDoc;
