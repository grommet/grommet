// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Chart = require('grommet/components/Chart');
var GrommetDocument = require('grommet/components/Document');

var ChartDoc = React.createClass({

  render: function() {
    var inline =
      "<Chart ... />";
    return (
      <GrommetDocument>
        <header>
          <h1>Chart</h1>
          <p>Shows a graphical data chart.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>max         {"{number}"}</code></dt>
            <dd>The largest possible value. Defaults to 100.</dd>
            <dt><code>min         {"{number}"}</code></dt>
            <dd>The smallest possible value. Defaults to 0.</dd>
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
          <Chart />
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
