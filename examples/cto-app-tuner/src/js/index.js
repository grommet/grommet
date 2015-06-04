require("../scss/index.scss");

var React = require('react');
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Meter = require('grommet/components/Meter');
var Sidebar = require('grommet/components/Sidebar');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var FormField = require('grommet/components/FormField');
var Split = require('grommet/components/Split');
var Chart = require('grommet/components/Chart');
var CtoOverride = require('./components/CtoOverride');
var EditIcon = require('grommet/components/icons/Edit');
var CloseIcon = require('grommet/components/icons/Clear');

var Main = React.createClass({

  getInitialState: function() {
    return {
      fast: 30,
      easy: 40,
      fun: 50,
      overrideActive: false
    };
  },

  _checkOverride: function() {
    if ( (this.state.fast + this.state.easy + this.state.fun) > 220 ) {
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

  _onShowTuner: function () {
    this.setState({showTuner: true});
  },

  _onHideTuner: function () {
    this.setState({showTuner: false});
  },

  _onResponsive: function (responsive) {
    this.setState({responsive: responsive});
    if ('multiple' === responsive) {
      this.setState({showTuner: true});
    }
    if ('single' === responsive) {
      this.setState({showTuner: false});
    }
  },

  render: function() {
    var delight = Math.round(this._getSatisfaction() / 10);
    var success = Math.round(this._getFriendliness() / 10);

    var series = [
      {label: 'Delight', values: [[5, delight], [4, 2], [3, 4], [2, 3], [1, 4]], colorIndex: "graph-1"},
      {label: 'Success', values: [[5, success], [4, 3], [3, 2], [2, 3], [1, 2]], colorIndex: "graph-2"}
    ];

    var editControl = null;
    var closeControl = null;
    if ('single' === this.state.responsive) {
      editControl = <div onClick={this._onShowTuner}><EditIcon /></div>;
      closeControl = <div onClick={this._onHideTuner}><CloseIcon /></div>;
    }

    var tuner = (
      <Sidebar primary={true}>
        <Form flush={false} fill={true}>
          <Header flush={false}>
            <h4>Tuner</h4>
            {closeControl}
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
      </Sidebar>
    );

    var dashboard = (
      <div>
        <Header primary={true} flush={false}>
          <Title>CTO Application</Title>
          {editControl}
        </Header>
        <Tiles flush={false} fill={true}>
          <Tile>
            <Header small={true}>
              <h4>User Friendliness</h4>
            </Header>
            <Meter type="arc" series={[
              {
                label: "Friendly",
                value: this._getFriendliness(),
                important: true
              },
              {
                label: "Unfriendly ",
                value: 100 - this._getFriendliness()
              }
            ]} units="%" small={true} />
          </Tile>
          <Tile>
            <Header small={true}>
              <h4>User Satisfaction</h4>
            </Header>
            <Meter type="arc" series={[
              {
                label: "Satisfied",
                value: this._getSatisfaction(),
                important: true
              },
              {
                label: "Unsatisfied",
                value: 100 - this._getSatisfaction()
              }
            ]} units="%" small={true} />
          </Tile>
          <Tile wide={true}>
            <Header small={true}>
              <h4>Fun Factor</h4>
            </Header>
              <Chart series={series} min={0} max={10} threshold={6} type="area" legend={true}
              xAxis={['Jun 3', 'Jun 2', 'Jun 1', 'May 31', 'May 30']}
              units="Fun" small={true} smooth={true} />
          </Tile>
        </Tiles>
      </div>
    );

    var pane1;
    var pane2;

    if ('single' === this.state.responsive) {
      if (this.state.showTuner) {
        pane1 = tuner;
      } else {
        pane1 = dashboard;
      }
    } else {
      pane1 = tuner;
      pane2 = dashboard;
    }

    var override = null;
    if (this.state.overrideActive) {
      override = (
        <CtoOverride onClose={this._onCloseOverride}
          onSubmit={this._onCloseOverride} />
      );
    }

    return (
      <App centered={false}>
        <Split flex="right" onResponsive={this._onResponsive}>
          {pane1}
          {pane2}
        </Split>
        {override}
      </App>
    );
  }
});

var element = document.getElementById('content');
React.render(React.createElement(Main), element);

document.body.classList.remove('loading');
