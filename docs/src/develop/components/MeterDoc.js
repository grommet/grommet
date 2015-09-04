// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var stringify = require("json-stringify-pretty-compact");
var Article = require('grommet/components/Article');
var Meter = require('grommet/components/Meter');
var FormField = require('grommet/components/FormField');
var RadioButton = require('grommet/components/RadioButton');

var inline =
  "<Meter value={70} total={100} units=\"GB\" />";

var simpleValue = 40;
var simpleMin = {value: 0, label: '0 GB'};
var simpleMax = {value: 80, label: '80 GB'};
var simpleThreshold = 75;
var simpleUnits = 'GB';

var thresholds = [
  {label: 'OK', value: 0, colorIndex: 'ok'},
  {label: 'Warning', value: 60, colorIndex: 'warning'},
  {label: 'Error', value: 70, colorIndex: 'error'}
];

var series = [
  {label: 'Gen 7', value: 50},
  {label: 'Gen 8', value: 200},
  {label: 'Gen 9', value: 100},
  {label: 'Gen 10', value: 300},
  {label: 'Gen 11', value: 100}
];

var statusSeries = [
  {label: 'OK', value: 70, colorIndex: 'ok'},
  {label: 'Warning', value: 15, colorIndex: 'warning'},
  {label: 'Error', value: 5, colorIndex: 'error'}
];
var statusSeriesMax = 90;

var storageSeries = [
  {label: 'Physical', value: 700},
  {label: 'Subscribed', value: 1200},
  {label: 'Allocated', value: 500}
];

var MeterDoc = React.createClass({

  getInitialState: function () {
    return {simpleValue: simpleValue};
  },

  _onChangeSimpleValue: function (event) {
    this.setState({simpleValue: parseInt(event.target.value)});
  },

  _onChangeSize: function (size) {
    this.setState({size: size});
  },

  render: function() {
    return (
      <Article primary={true}>
        <header>
          <h1>Meter</h1>
          <p>Shows a bar, arc, or circular meter graphic.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>important   {"{number}"}</code></dt>
            <dd>The index of the series data that the active label should
              correspond to, if any.</dd>
            <dt><code>large       true|false</code></dt>
            <dd>Larger sized version. Deprecated, use <code>size</code>.</dd>
            <dt><code>legend      {"{placement: right|bottom, total: true|false}"}</code></dt>
            <dd>Whether to show a legend. If showing, whether to include a total,
              and where to place it. If placement is not specified, it will be
              placed to match the aspect ratio of the window.</dd>
            <dt><code>max         {"{value: , label: }|{number}"}</code></dt>
            <dd>The largest possible value. Defaults to 100.</dd>
            <dt><code>min         {"{value: , label: }|{number}"}</code></dt>
            <dd>The smallest possible value. Defaults to 0.</dd>
            <dt><code>series     {"[{value: , label: , colorIndex: , important: , onClick: }, ...]"}</code></dt>
            <dd>An array of objects describing the data.
              Either this or the <code>value</code> property must be provided.</dd>
            <dt><code>size         small|medium|large</code></dt>
            <dd>The size of the Meter. Defaults to <code>medium</code>. Currently, the <code>spiral</code> type Meter does not respond to this property.</dd>
            <dt><code>small        true|false</code></dt>
            <dd>Smaller sized version. Deprecated, use <code>size</code>.</dd>
            <dt><code>threshold   {"{number}"}</code></dt>
            <dd>Optional threshold value.</dd>
            <dt><code>thresholds     {"[{value: , label: , colorIndex: }, ...]"}</code></dt>
            <dd>An array of objects describing thresholds.</dd>
            <dt><code>type         bar|arc|circle|spiral</code></dt>
            <dd>Whether to draw a bar, an arc, a circle, or a spiral.</dd>
            <dt><code>units       {"{string}"}</code></dt>
            <dd>Optional units to display next to the value label.</dd>
            <dt><code>value       {"{number}"}</code></dt>
            <dd>The current value.</dd>
            <dt><code>vertical       true|false</code></dt>
            <dd>Whether to orient a bar or arc Meter vertically.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Bar</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} size={this.state.size} />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "} />"}
          </code></pre>

          <h3>Bar, Vertical</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} size={this.state.size} vertical={true} />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "} vertical={true} />"}
          </code></pre>

          <h3>Arc</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} size={this.state.size} type="arc" />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "} type=\"arc\" />"}
          </code></pre>

          <h3>Arc, Vertical</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} size={this.state.size} type="arc" vertical={true} />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "} type=\"arc\" vertical={true} />"}
          </code></pre>

          <h3>Circle</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} size={this.state.size} type="circle" />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "} type=\"circle\" />"}
          </code></pre>

          <h3>Spiral</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} size={this.state.size} type="spiral" />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "} type=\"spiral\" />"}
          </code></pre>

          <h3>Bar, Min, Max, Units, Threshold</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} size={this.state.size}
              min={simpleMin} max={simpleMax} threshold={simpleThreshold}
              units={simpleUnits} />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "}\n" +
              " min={" + stringify(simpleMin) + "}\n" +
              " max={" + stringify(simpleMax) + "}\n" +
              " threshold={" + simpleThreshold + "}\n" +
              " units=\"" + simpleUnits + "\" />"}
          </code></pre>

          <h3>Bar, Min, Max, Units, Thresholds, Vertical</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} size={this.state.size}
              min={simpleMin} max={simpleMax} threshold={simpleThreshold}
              units={simpleUnits} vertical={true} />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "}\n" +
              " min={" + stringify(simpleMin) + "}\n" +
              " max={" + stringify(simpleMax) + "}\n" +
              " threshold={" + simpleThreshold + "}\n" +
              " units=\"" + simpleUnits + "\" vertical={true} />"}
          </code></pre>

          <h3>Arc, Min, Max, Units, Thresholds</h3>
          <div className="example">
            <Meter type="arc" value={this.state.simpleValue} size={this.state.size}
              min={simpleMin} max={simpleMax} thresholds={thresholds}
              units={simpleUnits} />
          </div>
          <pre><code className="html">
            {"<Meter type=\"arc\" value={" + this.state.simpleValue + "}\n" +
              " min={" + stringify(simpleMin) + "}\n" +
              " max={" + stringify(simpleMax) + "}\n" +
              " thresholds={" + stringify(thresholds) + "}\n" +
              " units=\"" + simpleUnits + "\" />"}
          </code></pre>

          <h3>Arc, Min, Max, Units, Thresholds, Vertical</h3>
          <div className="example">
            <Meter type="arc" value={this.state.simpleValue} size={this.state.size}
              min={simpleMin} max={simpleMax} threshold={simpleThreshold}
              units={simpleUnits} vertical={true} />
          </div>
          <pre><code className="html">
            {"<Meter type=\"arc\" value={" + this.state.simpleValue + "}\n" +
              " min={" + stringify(simpleMin) + "}\n" +
              " max={" + stringify(simpleMax) + "}\n" +
              " threshold={" + simpleThreshold + "}\n" +
              " units=\"" + simpleUnits + "\" vertical={true} />"}
          </code></pre>

          <h3>Circle, Min, Max, Units, Threshold</h3>
          <div className="example">
            <Meter type="circle" value={this.state.simpleValue} size={this.state.size}
              min={simpleMin} max={simpleMax} threshold={simpleThreshold}
              units={simpleUnits} />
          </div>
          <pre><code className="html">
            {"<Meter type=\"circle\" value={" + this.state.simpleValue + "}\n" +
              " min={" + stringify(simpleMin) + "}\n" +
              " max={" + stringify(simpleMax) + "}\n" +
              " threshold={" + simpleThreshold + "}\n" +
              " units=\"" + simpleUnits + "\" />"}
          </code></pre>

          <h3>Bar, Series, Legend</h3>
          <div className="example">
            <Meter legend={true} series={series} size={this.state.size} />
          </div>
          <pre><code className="html">
            {"<Meter legend={true}\n " +
              "series={" + stringify(series) + "}  />"}
          </code></pre>

          <h3>Bar, Series, Legend, Vertical</h3>
          <div className="example">
            <Meter legend={true} series={series} size={this.state.size} vertical={true} />
          </div>
          <pre><code className="html">
            {"<Meter legend={true}\n" +
              " series={" + stringify(series) + "}\n" +
              " vertical={true} />"}
          </code></pre>

          <h3>Arc, Series, Legend</h3>
          <div className="example">
            <Meter type="arc" legend={true} series={series} size={this.state.size} />
          </div>
          <pre><code className="html">
            {"<Meter type=\"arc\" legend={true}\n " +
              "series={" + stringify(series) + "} />"}
          </code></pre>

          <h3>Arc, Series, Legend, Vertical, Units</h3>
          <div className="example">
            <Meter type="arc" legend={true} series={storageSeries} size={this.state.size} vertical={true} units="TB" />
          </div>
          <pre><code className="html">
            {"<Meter type=\"arc\" legend={true} units=\"TB\"\n " +
              "series={" + stringify(storageSeries) + "}\n" +
              " vertical={true} />"}
          </code></pre>

          <h3>Circle, Series, Legend</h3>
          <div className="example">
            <Meter type="circle" legend={true} series={series} size={this.state.size} />
          </div>
          <pre><code className="html">
            {"<Meter type=\"circle\" legend={true}\n " +
              "series={" + stringify(series) + "} />"}
          </code></pre>

          <h3>Spiral, Series, Status</h3>
          <div className="example">
            <Meter type="spiral" series={statusSeries} size={this.state.size} max={statusSeriesMax} />
          </div>
          <pre><code className="html">
            {"<Meter type=\"spiral\" max={" + statusSeriesMax + "}\n " +
              "series={" + stringify(statusSeries) + "} />"}
          </code></pre>

          <h3>Spiral, Series, Storage</h3>
          <div className="example">
            <Meter type="spiral" series={storageSeries} size={this.state.size} units="TB"/>
          </div>
          <pre><code className="html">
            {"<Meter type=\"spiral\" units=\"TB\"\n " +
              "series={" + stringify(storageSeries) + "} />"}
          </code></pre>

          <h3>Bar, Small</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} size="small" />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "} size=\"small\" />"}
          </code></pre>

          <h3>Arc, Small</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} type="arc" size="small" />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "} type=\"arc\" size=\"small\" />"}
          </code></pre>

          <h3>Circle, Small</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} type="circle" size="small" />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "} type=\"circle\" size=\"small\" />"}
          </code></pre>

          <h3>Bar, Large</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} size="large" />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "} size=\"large\" />"}
          </code></pre>

          <h3>Arc, Large</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} type="arc" size="large" />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "} type=\"arc\" size=\"large\" />"}
          </code></pre>

          <h3>Circle, Large</h3>
          <div className="example">
            <Meter value={this.state.simpleValue} type="circle" size="large" />
          </div>
          <pre><code className="html">
            {"<Meter value={" + this.state.simpleValue + "} type=\"circle\" size=\"large\" />"}
          </code></pre>

          <h3>Bar, Loading</h3>
          <div className="example">
            <Meter value={undefined} size={this.state.size} />
          </div>
          <pre><code className="html">
            {"<Meter value={undefined} />"}
          </code></pre>

          <h3>Arc, Loading</h3>
          <div className="example">
            <Meter value={undefined} size={this.state.size} type="arc" />
          </div>
          <pre><code className="html">
            {"<Meter value={undefined} type=\"arc\" />"}
          </code></pre>

          <h3>Spiral, Loading</h3>
          <div className="example">
            <Meter value={undefined} size={this.state.size} type="spiral" />
          </div>
          <pre><code className="html">
            {"<Meter value={undefined} type=\"spiral\" />"}
          </code></pre>

        </section>

        <section>
          <FormField label="Value" htmlFor="value" help={this.state.simpleValue}>
            <input id="value" name="value" type="range"
              min="0" max="80" value={this.state.simpleValue}
              onChange={this._onChangeSimpleValue}/>
          </FormField>
          <FormField label="Size">
            <RadioButton id="size-small" name="size" label="Small"
              checked={'small' === this.state.size}
              onChange={this._onChangeSize.bind(this, 'small')} />
            <RadioButton id="size-medium" name="size" label="Medium"
              checked={'medium' === this.state.size}
              onChange={this._onChangeSize.bind(this, 'medium')} />
            <RadioButton id="size-large" name="size" label="Large"
              checked={'large' === this.state.size}
              onChange={this._onChangeSize.bind(this, 'large')} />
          </FormField>
        </section>

      </Article>
    );
  }
});

module.exports = MeterDoc;
