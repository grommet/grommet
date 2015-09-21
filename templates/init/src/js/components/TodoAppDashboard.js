var React = require('react');
var Header = require('grommet/components/Header');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Meter = require('grommet/components/Meter');
var Table = require('grommet/components/Table');
var Section = require('grommet/components/Section');
var Status = require('grommet/components/icons/Status');

function getLabel(label, count, colorIndex) {
  return {
    "label": label,
    "value": count,
    "colorIndex": colorIndex
  };
}

var TodoAppDashboard = React.createClass({

  getInitialState: function() {
    return {
      tasks: [
        {
          status: 'error',
          item: 'Pay my rent.'
        },
        {
          status: 'ok',
          item: 'Walk with my dog this morning.'
        },
        {
          status: 'warning',
          item: 'Don\'t forget your anniversary in two weeks.'
        },
        {
          status: 'warning',
          item: 'San Jose Earthquakes game is tomorrow.'
        },
        {
          status: 'ok',
          item: 'Review Pull Request #45.'
        }
      ]
    };
  },

  render: function () {

    var tasksMap = {
      error: 0,
      ok: 0,
      warning: 0
    };

    var items = this.state.tasks.map(function(task) {

      tasksMap[task.status] += 1;

      return (
        <tr>
          <td><Status value={task.status} small={true} /></td>
          <td>{task.item}</td>
        </tr>
      );
    });

    return (
      <Section primary={true}>
        <Tiles fill={true} flush={false}>
          <Tile align="center">
            <Meter series={[
              getLabel('Past Due', tasksMap.error, "error"),
              getLabel('Due Soon', tasksMap.warning, "warning"),
              getLabel('Done', tasksMap.ok, "ok")
            ]} type="circle" units="Tasks" />
          </Tile>
          <Tile>
            <Header><h3>My Tasks:</h3></Header>
            <Table>
              <tbody>
                {items}
              </tbody>
            </Table>
          </Tile>
        </Tiles>
      </Section>
    );
  }
});

module.exports = TodoAppDashboard;
