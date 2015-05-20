var React = require('react');
var Header = require('grommet/components/Header');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Section = require('grommet/components/Section');
var Donut = require('grommet/components/Donut');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var FormField = require('grommet/components/FormField');
var Split = require('grommet/components/Split');
var Chart = require('grommet/components/Chart');
var CtoOverride = require('./CtoOverride');

var CtoAppDashboard = React.createClass({

  getInitialState: function() {
    return {
      fast: 30,
      easy: 40,
      fun: 50,
      overrideActive: false
    };
  },

  _checkOverride: function() {
    if( (this.state.fast + this.state.easy + this.state.fun) > 220 ) {
      this.setState({overrideActive: true});
    }
  },

  _getFriendliness: function() {
    return Math.round(((this.state.fast + this.state.easy) / 200) * 100);
  },

  _getSatisfaction: function() {
    return Math.round(((this.state.easy + this.state.fun) / 200) * 100);
  },

  _onChange: function(e) {
    var data = {};
    data[e.currentTarget.id] = parseInt(e.currentTarget.value);
    this.setState(data);
    this._checkOverride();
  },

  _onCloseOverride: function(event) {
    event.preventDefault();
    this.setState({overrideActive: false});
  },

  render: function () {

    var delight = Math.round(this._getSatisfaction() / 10);
    var success = Math.round(this._getFriendliness() / 10);

    var series = [
      {label: 'Delight', values: [[5,delight], [4,2], [3,4], [2,3], [1,4]], colorIndex: "graph-1"},
      {label: 'Success', values: [[5,success], [4,3], [3,2], [2,3], [1,2]], colorIndex: "graph-2"}
    ];

    var override = null;
    if (this.state.overrideActive) {
      override = <CtoOverride onClose={this._onCloseOverride} 
                              onSubmit={this._onCloseOverride} />;
    }

    return (
      <Section>
        <Split flex="left">
          <Tiles flush={false}>
            <Tile>
              <Header>
                <h3>User Friendliness</h3>
              </Header>
              <Donut series={[
                {
                  "label": "Friendly",
                  "value": this._getFriendliness(),
                  "units": "%"
                },
                {
                  "label": "Unfriendly",
                  "value": 100 - this._getFriendliness(),
                  "units": "%"
                }
              ]} />
            </Tile>
            <Tile>
              <Header>
                <h3>User Satisfaction</h3>
              </Header>
              <Donut series={[
                {
                  "label": "Satisfied",
                  "value": this._getSatisfaction(),
                  "units": "%"
                },
                {
                  "label": "Unsatisfied",
                  "value": 100 - this._getSatisfaction(),
                  "units": "%"
                }
              ]} />
            </Tile>
            <Tile wide={true}>
              <Header>
                <h3>Fun Factor</h3>
              </Header>
                <Chart series={series} min={0} max={10} threshold={6} type="area" legend={true}
                xAxis={['Jun 3', 'Jun 2', 'Jun 1', 'May 31', 'May 30']}
                units="Fun" />
            </Tile>
          </Tiles>
          <Form compact={true}>
            <Header>
                <h3>User Experience Tuner</h3>
            </Header>
            <FormFields>
              <fieldset>
                <FormField label="Fast" htmlFor="fast">
                  <input id="fast" name="fast" type="range"
                    min="1" max="100" defaultValue={this.state.fast}
                    onChange={this._onChange}/>
                </FormField>
                <FormField label="Easy" htmlFor="easy">
                  <input id="easy" name="easy" type="range"
                    min="1" max="100" defaultValue={this.state.easy}
                    onChange={this._onChange}/>
                </FormField>
                <FormField label="Fun" htmlFor="fun">
                  <input id="fun" name="fun" type="range"
                    min="1" max="100" defaultValue={this.state.fun}
                    onChange={this._onChange}/>
                </FormField>
              </fieldset>
             </FormFields> 
          </Form>
        </Split>
        {override}
      </Section>
    );
  }
});

module.exports = CtoAppDashboard;