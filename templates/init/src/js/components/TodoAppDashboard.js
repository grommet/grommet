var React = require('react');
var Header = require('grommet/components/Header');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Section = require('grommet/components/Section');
var Donut = require('grommet/components/Donut');
var Table = require('grommet/components/Table');
var Status = require('grommet/components/icons/Status');

function getLabel(label, count, colorIndex) {
  return {
    "label": label,
    "value": count,
    "units": count > 1 ? "Tasks" : 'Task',
    "colorIndex": colorIndex
  };
}

var TodoAppDashboard = React.createClass({

  render: function () {

    var tasksMap = {
      error: 0,
      ok: 0,
      warning: 0
    };

    var items = this.props.tasks.map(function(task) {

      tasksMap[task.type] += 1;

      return (
        <tr>
          <td><Status value={task.type} small={true} /></td>
          <td>{task.item}</td>
        </tr>
      );
    });

    return (
      <Tiles>
        <Tile>
          <Section centered={true}>
            <Donut series={[
              getLabel('Fix Now', tasksMap.error, "error"),
              getLabel('Remember', tasksMap.warning, "warning"),
              getLabel('Enjoy', tasksMap.ok, "ok")
            ]} />
          </Section>
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
    );
  }
});

module.exports = TodoAppDashboard;
