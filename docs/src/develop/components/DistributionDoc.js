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

var seriesEmpty = [
  {label: 'First', value: 4},
  {label: 'Second', value: 3},
  {label: 'Third', value: 1},
  {label: 'Fourth', value: 0}
];

var iconSeries = [
  {label: 'Female', value: 60, icon: {
    width: 36, height: 36,
    svgElement: (
      <g fill="none" strokeWidth={1}>
        <path d="M20,36 L20,32"></path>
        <path d="M24,13 C21.2,13 19,15.2 19,18 C19,22 15.9,23.9 15.9,23.9 C15.9,23.9 16.6,26 20,26 L21,26 C18.2,26 16,28.2 16,31 L16,36"></path>
        <path d="M28,32 L28,36"></path>
        <path d="M32,36 L32,31 C32,28.2 29.9,26 27.1,26 L27,26 C30.4,26 32.1,23.9 32.1,23.9 C32.1,23.9 29,22 29,18 C29,15.2 26.7,13 24,13"></path>
      </g>
    )}
  },
  {label: 'Male', value: 40, icon: {
    width: 36, height: 36,
    svgElement: (
      <g fill="none" strokeWidth={1}>
        <circle cx="24" cy="18" r="5"></circle>
        <path d="M33,36 L33,31 C33,26.6 29.4,23 25,23 L23,23 C18.6,23 15,26.6 15,31 L15,36"></path>
        <path d="M20,36 L20,31"></path>
        <path d="M28,36 L28,31"></path>
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
      <Article primary={true}>
        <header>
          <h1>Distribution</h1>
          <p>Shows a graphic of relatively sized items.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>large       true|false</code></dt>
            <dd>Larger sized version. Deprecated, use <code>size</code>.</dd>
            <dt><code>legend      true|false</code></dt>
            <dd>Whether to show a legend.</dd>
            <dt><code>legendTotal true|false</code></dt>
            <dd>Whether to show a total in the legend.</dd>
            <dt><code>series     {"[{value: , label: , colorIndex: , onClick: , icon: }, ...]"}</code></dt>
            <dd>An array of objects describing the data.</dd>
            <dt><code>size         small|medium|large</code></dt>
            <dd>The height of the Distribution. Defaults to <code>medium</code>.</dd>
            <dt><code>small        true|false</code></dt>
            <dd>Smaller sized version. Deprecated, use <code>size</code>.</dd>
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

          <h3>Empty series</h3>
          <div className="example">
            <Distribution series={seriesEmpty} />
          </div>
          <pre><code className="html">
            {"<Distribution large={true}\n " +
              "series={" + stringify(seriesEmpty, null, '  ') + "}  />"}
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
