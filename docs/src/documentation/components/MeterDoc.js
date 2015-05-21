// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Meter = require('grommet/components/Meter');
var GrommetDocument = require('grommet/components/Document');

var inline =
  "<Meter value={70} total={100} units=\"GB\" />";

var statusSeries = [
  {label: 'OK', value: 60, colorIndex: 'ok'},
  {label: 'Warning', value: 20, colorIndex: 'warning'},
  {label: 'Error', value: 10, colorIndex: 'error'}
];

var MeterDoc = React.createClass({

  render: function() {
    return (
      <GrommetDocument>
        <header>
          <h1>Meter</h1>
          <p>Shows a linear meter graphic.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>max         {"{number}"}</code></dt>
            <dd>The largest possible value. Defaults to 100.</dd>
            <dt><code>min         {"{number}"}</code></dt>
            <dd>The smallest possible value. Defaults to 0.</dd>
            <dt><code>series     {"[{value: , label: , colorIndex: , important: }, ...]"}</code></dt>
            <dd>An array of objects describing the data.
              Either this or the <code>value</code> property must be provided.</dd>
            <dt><code>threshold   {"{number}"}</code></dt>
            <dd>Optional threshold value.</dd>
            <dt><code>units       {"{string}"}</code></dt>
            <dd>Optional units to display next to the value label.</dd>
            <dt><code>value       {"{number}"}</code></dt>
            <dd>The current value.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Simple</h3>
          <div className="example">
            <Meter value={70} />
          </div>
          <pre><code className="html">
            {"<Meter value={70} />"}
          </code></pre>

          <h3>Min, Max, Units, Threshold</h3>
          <div className="example">
            <Meter value={45} min={20} max={80} threshold={70} units="GB" />
          </div>
          <pre><code className="html">
            {"<Meter value={45} min={20} max={80} threshold={70} units=\"GB\" />"}
          </code></pre>

          <h3>Series, Legend</h3>
          <div className="example">
            <Meter series={statusSeries} max={90} legend={true} />
          </div>
          <pre><code className="html">
            {"<Meter series={" + JSON.stringify(statusSeries, null, '  ') + "} max={90} legend={true} />"}
          </code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = MeterDoc;
