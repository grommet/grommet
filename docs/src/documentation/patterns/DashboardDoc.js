// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Search = require('grommet/components/Search');
var Gravatar = require('react-gravatar');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Chart = require('grommet/components/Chart');
var Meter = require('grommet/components/Meter');

var dateSeries = [
  {label: 'first', values: [
    [new Date(Date.parse("2015-05-22")), 4],
    [new Date(Date.parse("2015-05-21")), 2],
    [new Date(Date.parse("2015-05-20")), 3],
    [new Date(Date.parse("2015-05-19")), 3],
    [new Date(Date.parse("2015-05-18")), 2]
  ], colorIndex: "graph-4"}
];
var dateSeriesXAxis = [
  {label: 'May 22', value: dateSeries[0].values[0][0]},
  {label: 'May 21', value: dateSeries[0].values[1][0]},
  {label: 'May 20', value: dateSeries[0].values[2][0]},
  {label: 'May 19', value: dateSeries[0].values[3][0]},
  {label: 'May 18', value: dateSeries[0].values[4][0]}
];

var DashboardDoc = React.createClass({
  render: function() {
    return (
      <GrommetDocument>
        <header>
          <h1>Dashboard</h1>
          <p>The dashboard shows the most important information
          in the simplest way possible. Content on the dashboard
          provides direct navigation to further detail.</p>
          <p>Typically it is the initial content shown after logging in.
          And, because the content is navigable, the dashboard functions
          well as a home page.</p>
        </header>

        <section>
          <h2>Example</h2>

          <div className="example">
            <Header>
              <span>
                <Title>
                  <span>App</span>
                </Title>
                <Search inline={true} />
              </span>
              <Gravatar email="" default="mm" />
            </Header>
            <Tiles fill={true} flush={false}>
              <Tile wide={true}>
                <Chart series={dateSeries} min={0} max={5} threshold={2}
                type="area" smooth={true} legend={true} small={true}
                  xAxis={dateSeriesXAxis} />
              </Tile>
              <Tile>
                <Header small={true}><h4>Utilization</h4></Header>
                <Meter value={40} type="arc" units="TB" />
              </Tile>
              <Tile>
                <Header small={true}><h4>Throughput</h4></Header>
                <Meter value={80} type="arc" units="GB/s"/>
              </Tile>
            </Tiles>
          </div>
        </section>

        <section>
          <h2>Details</h2>
          <div className="tbd">TBD</div>
        </section>
      </GrommetDocument>
    );
  }
});

module.exports = DashboardDoc;
