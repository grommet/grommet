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

var iconSeries = [
  {label: 'Female', value: 60, icon: {
    width: 36, height: 36,
    svgElement: (
      <g fill="none" strokeWidth={1}>
        <circle strokeMiterlimit="10" cx="18.1" cy="13.7" r="5"/>
        <path strokeMiterlimit="10" d="M26.1,26.7c0-4.4-3.6-8-8-8h0c-4.4,0-8,3.6-8,8"/>
        <path strokeMiterlimit="10" d="M24.3,21.5c1.8-0.4,2.9-2.2,2.9-2.2c-4-1.7-4-4.2-4-5.6c-1.3,0.5-3,0-4-1c-1.7,1.8-4.2,2-6,1c0,1.4,0,3.9-4,5.6c0,0,1.1,1.8,2.9,2.2"/>
      </g>
    )}
  },
  {label: 'Male', value: 40, icon: {
    width: 36, height: 36,
    svgElement: (
      <g fill="none" strokeWidth={1}>
        <circle strokeMiterlimit="10" cx="18.1" cy="13.7" r="5"/>
        <path strokeMiterlimit="10" d="M26.1,26.7c0-4.4-3.6-8-8-8h0c-4.4,0-8,3.6-8,8"/>
      </g>
    )}
  }
];
var iconSeriesDoc = iconSeries.map(function (item) {
  return {
    label: item.label,
    value: item.value,
    icon: {
      width: item.icon.width,
      height: item.icon.height,
      svgElement: "<JSX SVG element>"
    }
  };
});

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
            <dt><code>series     {"[{value: , label: , colorIndex: , onClick: , icon: }, ...]"}</code></dt>
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

          <h3>Icon</h3>
          <div className="example">
            <Distribution series={iconSeries} units="%"/>
          </div>
          <pre><code className="html">
            {"<Distribution\n " +
              "series={" + stringify(iconSeriesDoc, null, '  ') + "}  />"}
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
