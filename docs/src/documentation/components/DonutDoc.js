// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Donut = require('grommet/components/Donut');
var GrommetDocument = require('grommet/components/Document');

var inline =
  "<Donut series={[\n  {label: <label>, value: <value>, colorIndex: <index>},\n  ...\n]} />";

var genericSeries = [
  {label: 'Used', value: 10},
  {label: 'Available', value: 20}
];

var statusSeries = [
  {label: 'OK', value: 70, colorIndex: 'ok'},
  {label: 'Warning', value: 20, colorIndex: 'warning'},
  {label: 'Error', value: 10, colorIndex: 'error', important: true}
];

var DonutDoc = React.createClass({

  render: function() {
    return (
      <GrommetDocument>
        <header>
          <h1>Donut</h1>
          <p>Shows a circular graphic.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>legend     true|false</code></dt>
            <dd>Whether to show a legend.</dd>
            <dt><code>series     {"[{value: , label: , colorIndex: , important: }, ...]"}</code></dt>
            <dd>An array of objects describing the data.</dd>
            <dt><code>units      {"{string}"}</code></dt>
            <dd>Optional units to include.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Single</h3>
          <div className="example">
            <Donut value={20} units="TB" />
          </div>
          <pre><code className="html">
            {"<Donut value={20} units=\"TB\" />"}
          </code></pre>

          <h3>Multiple</h3>
          <div className="example">
            <Donut series={genericSeries} units="TB" />
          </div>
          <pre><code className="html">
            {"<Donut series={" + JSON.stringify(genericSeries, null, '  ') + "} units=\"TB\" />"}
          </code></pre>

          <h3>Status</h3>
          <div className="example">
            <Donut series={statusSeries} />
          </div>
          <pre><code className="html">
            {"<Donut series={" + JSON.stringify(statusSeries, null, '  ') + "} />"}
          </code></pre>

          <h3>Legend</h3>
          <div className="example">
            <Donut series={statusSeries} legend={true} />
          </div>
          <pre><code className="html">
            {"<Donut series={" + JSON.stringify(statusSeries, null, '  ') + "} legend={true} />"}
          </code></pre>

          <h3>Partial</h3>
          <div className="example">
            <Donut series={genericSeries} partial={true} legend={true}
              min={{value: 0}} max={{value: 30}} units="TB"/>
          </div>
          <pre><code className="html">
            {"<Donut series={" + JSON.stringify(genericSeries, null, '  ') + "} partial={true} legend={true} min={{value: 0}} max={{value: 30}} />"}
          </code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = DonutDoc;
