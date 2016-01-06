import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Meter from 'grommet/components/Meter';
import Table from 'grommet/components/Table';
import Section from 'grommet/components/Section';
import Status from 'grommet/components/icons/Status';

function getLabel(label, count, colorIndex) {
  return {
    "label": label,
    "value": count,
    "colorIndex": colorIndex
  };
}

export default class TodoAppDashboard extends Component {

  constructor () {
    super();
    this.state = {
      tasks: [
        {
          status: 'critical',
          item: 'Pay my rent.'
        },
        {
          status: 'ok',
          item: 'Walk with my dog this morning.'
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
  }

  render () {

    let tasksMap = {
      critical: 0,
      ok: 0,
      warning: 0
    };

    let items = this.state.tasks.map((task, index) => {

      tasksMap[task.status] += 1;

      return (
        <tr key={index}>
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
              getLabel('Past Due', tasksMap.critical, "critical"),
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
};
