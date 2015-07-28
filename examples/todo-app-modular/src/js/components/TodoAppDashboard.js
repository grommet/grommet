// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Header = require('grommet/components/Header');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Meter = require('grommet/components/Meter');
var Table = require('grommet/components/Table');
var Button = require('grommet/components/Button');
var Status = require('grommet/components/icons/Status');
var TodoAddTaskForm = require('./TodoAddTaskForm');
var CloseIcon = require('grommet/components/icons/Clear');

function getLabel(label, count, colorIndex) {
  return {
    "label": label,
    "value": count,
    "units": count > 1 ? "Tasks" : 'Task',
    "colorIndex": colorIndex
  };
}

var TodoAppDashboard = React.createClass({

  getInitialState: function () {
    return {
      tasks: [],
      addTask: false
    };
  },

  _onRequestForAdd: function () {
    this.setState({addTask: true});
  },

  _onRequestForAddClose: function () {
    this.setState({addTask: false});
  },

  _onRequestForDelete: function (index) {
    var tasks = this.state.tasks;
    tasks.splice(index, 1);
    this.setState({tasks: tasks});
  },

  _onAddTask: function (task) {
    var tasks = this.state.tasks;
    tasks.push(task);
    this.setState({tasks: tasks, addTask: false});
  },

  render: function () {

    var tasksMap = {
      error: 0,
      ok: 0,
      warning: 0
    };

    var tasks = this.state.tasks.map(function(task, index) {

      tasksMap[task.type] += 1;

      return (
        <tr id={index} key={"task_" + index}>
          <td width="10%"><Status value={task.type} small={true} /></td>
          <td>{task.item}</td>
          <td width="10%">
            <div onClick={this._onRequestForDelete.bind(this, index)}>
              <CloseIcon small={true} />
            </div>
          </td>
        </tr>
      );
    }, this);

    var addTask = null;
    if (this.state.addTask) {
      addTask = (
        <TodoAddTaskForm onClose={this._onRequestForAddClose}
          onSubmit={this._onAddTask} />
      );
    }

    return (
      <div>
        <Tiles fill={true} flush={false}>
          <Tile align="center">
            <Meter series={[
              getLabel('Fix Now', tasksMap.error, 'error'),
              getLabel('Remember', tasksMap.warning, 'warning'),
              getLabel('Enjoy', tasksMap.ok, 'ok')
            ]} type="circle" />
          </Tile>
          <Tile align="start">
            <Header><h3>My Tasks:</h3></Header>
            <Table>
              <tbody>
                {tasks}
              </tbody>
            </Table>
            <Button label="Add Task" primary={true} strong={true}
              onClick={this._onRequestForAdd} />
          </Tile>
        </Tiles>
        {addTask}
      </div>
    );
  }
});

module.exports = TodoAppDashboard;
